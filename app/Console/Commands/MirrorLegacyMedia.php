<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

/**
 * Copies the old WordPress media (…/wp-content/uploads/…) that our data still links
 * to into storage/app/public/legacy-wp/, at the same path. nginx serves
 * /wp-content/uploads/* and /{dept}/wp-content/uploads/* from there, so both our
 * stored links and old links shared elsewhere keep working after the switch-over.
 *
 * baust.edu.bd now points at this app, so the old server must be reached by IP:
 *   php artisan media:mirror-legacy --ip=203.0.113.10 [--dry-run]
 */
class MirrorLegacyMedia extends Command
{
    protected $signature = 'media:mirror-legacy
                            {--ip= : IP address of the old WordPress server}
                            {--dry-run : List the files without downloading}';

    protected $description = 'Mirror old WordPress uploads referenced in the database into storage';

    public function handle(): int
    {
        $urls = $this->referencedUrls();
        $root = storage_path('app/public/legacy-wp');
        $this->info(count($urls).' referenced WordPress files.');

        $ip = $this->option('ip');
        if (! $ip && ! $this->option('dry-run')) {
            $this->error('Pass --ip=<old server IP> (baust.edu.bd now resolves to this app).');

            return self::FAILURE;
        }

        $ok = $skip = $fail = 0;
        foreach ($urls as $url) {
            $path = parse_url($url, PHP_URL_PATH);
            $target = $root.rawurldecode($path);
            if (is_file($target)) {
                $skip++;
                continue;
            }
            if ($this->option('dry-run')) {
                $this->line("  {$url}");
                continue;
            }

            $host = parse_url($url, PHP_URL_HOST);
            try {
                $res = Http::withOptions([
                    'verify' => false, // the old server's certificate may no longer match
                    'curl' => [CURLOPT_RESOLVE => ["{$host}:443:{$ip}", "{$host}:80:{$ip}"]],
                ])->withUserAgent('Mozilla/5.0 (BAUST media mirror)')->timeout(120)->get($url);
            } catch (\Throwable $e) {
                $fail++;
                $this->warn("  ! {$url}: {$e->getMessage()}");
                continue;
            }
            if (! $res->successful() || str_starts_with((string) $res->header('Content-Type'), 'text/html')) {
                $fail++;
                $this->warn("  ! {$url}: HTTP {$res->status()}");
                continue;
            }
            if (! is_dir(dirname($target))) {
                mkdir(dirname($target), 0755, true);
            }
            file_put_contents($target, $res->body());
            $ok++;
        }

        $this->info("Downloaded {$ok}, already present {$skip}, failed {$fail}.");

        return self::SUCCESS;
    }

    /** Every …baust.edu.bd/…/wp-content/uploads/… URL in any text column. */
    private function referencedUrls(): array
    {
        $db = DB::connection();
        $columns = $db->select(
            'select table_name t, column_name c from information_schema.columns where table_schema = ? and data_type in ("varchar","text","mediumtext","longtext","json")',
            [$db->getDatabaseName()]
        );

        $urls = [];
        foreach ($columns as $col) {
            $rows = $db->table($col->t)->where($col->c, 'like', '%baust.edu.bd%/wp-content/uploads/%')->pluck($col->c);
            foreach ($rows as $value) {
                preg_match_all('#https?://(?:www\.)?baust\.edu\.bd(?:/[a-z]+)?/wp-content/uploads/[^"\'\s<>()]+?\.(?:jpe?g|png|gif|webp|pdf|docx?|xlsx?|pptx?|zip|mp4)#i', stripslashes((string) $value), $m);
                foreach ($m[0] as $u) {
                    $urls[preg_replace('#^http://#', 'https://', $u)] = true;
                }
            }
        }

        return array_keys($urls);
    }
}
