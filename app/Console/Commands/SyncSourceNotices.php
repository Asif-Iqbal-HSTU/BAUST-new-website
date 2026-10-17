<?php

namespace App\Console\Commands;

use App\Models\Notice;
use App\Models\NoticeCategory;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Keeps our notices in step with baust.edu.bd until the old site is retired:
 *
 *  - adds posts from the main site and every department sub-site that we do
 *    not have yet (existing notices are never modified), with their PDF/image
 *    attachment stored on the public disk;
 *  - makes the top-scroll ticker match the main site's "Top Scroll Notice"
 *    category exactly.
 *
 *   php artisan notices:sync-source [--dry-run] [--site=general|cse|...]
 *
 * Scheduled hourly in routes/console.php.
 */
class SyncSourceNotices extends Command
{
    protected $signature = 'notices:sync-source
                            {--site=* : Only these sites (general, cse, ict, eee, me, ipe, ce, dba, ais, eng, as, mba)}
                            {--dry-run : Report what would change without writing}';

    protected $description = 'Add missing notices from baust.edu.bd and sync the top-scroll ticker';

    private const SITES = [
        'general' => 'https://www.baust.edu.bd',
        'cse' => 'https://baust.edu.bd/cse',
        'ict' => 'https://baust.edu.bd/ict',
        'eee' => 'https://baust.edu.bd/eee',
        'me' => 'https://baust.edu.bd/me',
        'ipe' => 'https://baust.edu.bd/ipe',
        'ce' => 'https://baust.edu.bd/ce',
        'dba' => 'https://baust.edu.bd/dba',
        'ais' => 'https://baust.edu.bd/ais',
        'eng' => 'https://baust.edu.bd/eng',
        'as' => 'https://baust.edu.bd/as',
        'mba' => 'https://baust.edu.bd/mba',
    ];

    /** Main-site WordPress category feeding the top ticker. */
    private const TOP_SCROLL_SLUG = 'top-scroll-notice';

    /** Posts on a sub-site copied from another department's template (e.g. CSE results on the MBA site). */
    private const FOREIGN = ['mba' => '/\bcse\b|thesis-project-supervisor/i'];

    private bool $dry;

    public function handle(): int
    {
        $this->dry = (bool) $this->option('dry-run');
        $sites = $this->option('site') ?: array_keys(self::SITES);
        $added = 0;

        foreach ($sites as $site) {
            if (! isset(self::SITES[$site])) {
                $this->warn("Unknown site: {$site}");
                continue;
            }
            [$posts, $cats] = $this->fetchSite($site);
            if ($posts === null) {
                $this->warn("[{$site}] source unreachable, skipped");
                continue;
            }
            $added += $this->addMissing($site, $posts, $cats);

            if ($site === 'general') {
                $this->syncTopScroll($posts, $cats);
            }
        }

        $this->info(($this->dry ? '[dry run] ' : '')."Done: {$added} notice(s) added.");

        return self::SUCCESS;
    }

    // ---------------------------------------------------------------------

    private function fetchSite(string $site): array
    {
        $base = self::SITES[$site].'/wp-json/wp/v2';
        $cats = collect($this->json("{$base}/categories?per_page=100") ?? [])->pluck('slug', 'id')->all();
        $posts = [];
        for ($page = 1; $page <= 50; $page++) {
            $chunk = $this->json("{$base}/posts?per_page=100&page={$page}&_fields=id,slug,link,date,title,content,excerpt,categories,featured_media");
            if ($chunk === null) {
                return $page === 1 ? [null, $cats] : [$posts, $cats];
            }
            if (! $chunk || isset($chunk['code'])) {
                break;
            }
            $posts = array_merge($posts, $chunk);
            if (count($chunk) < 100) {
                break;
            }
        }

        return [$posts, $cats];
    }

    private function addMissing(string $site, array $posts, array $cats): int
    {
        $dept = $site === 'general' ? null : $site;
        $ours = Notice::query()->when($dept, fn ($q) => $q->where('department', $dept), fn ($q) => $q->whereNull('department'))
            ->get(['wp_id', 'original_url']);
        $haveWp = $ours->pluck('wp_id')->filter()->flip();
        $haveUrl = $ours->pluck('original_url')->filter()->map(fn ($u) => $this->urlKey($u))->flip();

        $added = 0;
        foreach ($posts as $p) {
            if (isset($haveWp[$p['id']]) || isset($haveUrl[$this->urlKey($p['link'])])) {
                continue;
            }
            if (isset(self::FOREIGN[$site]) && preg_match(self::FOREIGN[$site], $p['slug'])) {
                continue;
            }
            $title = html_entity_decode($p['title']['rendered'], ENT_QUOTES | ENT_HTML5);
            $catSlugs = collect($p['categories'])->map(fn ($id) => $cats[$id] ?? null)->filter()->values();
            $this->line("  [{$site}] + {$p['id']} ".Str::limit($title, 80));
            $added++;
            if ($this->dry) {
                continue;
            }

            $content = trim($p['content']['rendered'] ?? '');
            $notice = Notice::create([
                'wp_id' => $p['id'],
                'title' => $title,
                'slug' => $this->uniqueSlug($p['slug'] ?: Str::slug($title), $site, $p['id']),
                'content' => strip_tags($content) !== '' && ! str_contains($content, 'pdfjs-viewer') ? $content : null,
                'excerpt' => Str::limit(trim(html_entity_decode(strip_tags($p['excerpt']['rendered'] ?? ''))), 300) ?: null,
                'original_url' => $p['link'],
                'author' => 'BAUST',
                'department' => $dept,
                'is_active' => true,
                'is_pinned' => false,
                'published_at' => Carbon::parse($p['date']),
            ]);
            $notice->categories()->sync($this->categoryIds($catSlugs, $site));
            $this->attach($notice, $p, $site);
        }

        if ($added && ! $this->dry) {
            foreach (NoticeCategory::all() as $cat) {
                $cat->update(['post_count' => $cat->notices()->count()]);
            }
        }

        return $added;
    }

    /** Map WordPress category slugs onto ours; department posts always land in notice / news-events. */
    private function categoryIds($slugs, string $site): array
    {
        $slugs = $slugs->reject(fn ($s) => $s === self::TOP_SCROLL_SLUG); // ticker membership is synced separately
        if ($site !== 'general') {
            $slugs = $slugs->map(fn ($s) => match (true) {
                in_array($s, ['news-events', 'achievement', 'achievements', 'success-story', 'campus-life-gallery', 'upcoming-events']) => 'news-events',
                default => 'notice',
            })->unique();
        }
        $ids = NoticeCategory::whereIn('slug', $slugs)->pluck('id')->all();

        return $ids ?: NoticeCategory::where('slug', 'notice')->pluck('id')->all();
    }

    /** First PDF or image the post shows: featured image, linked/embedded PDF, or a media item attached to it. */
    private function attach(Notice $notice, array $post, string $site): void
    {
        $base = self::SITES[$site];
        $url = null;
        $html = ($post['content']['rendered'] ?? '');
        if (! preg_match('/\.pdf/i', $html)) {
            // Rendered pages embed PDFs via pdf.js; some answer HTTP 500 but still render.
            $html .= $this->get($post['link'], anyStatus: true) ?? '';
        }
        if (preg_match('#viewer\.php\?file=(https?://[^"\'&\s]+\.pdf)#i', $html, $m)
            || preg_match('#https?://[^"\'\s<>]+/wp-content/uploads/[^"\'\s<>]+\.pdf#i', $html, $m)) {
            $url = $m[1] ?? $m[0];
        }
        if (! $url && ! empty($post['featured_media'])) {
            $url = $this->json("{$base}/wp-json/wp/v2/media/{$post['featured_media']}")['source_url'] ?? null;
        }
        if (! $url) {
            $media = $this->json("{$base}/wp-json/wp/v2/media?parent={$post['id']}&per_page=5") ?? [];
            $url = $media[0]['source_url'] ?? null;
        }
        if (! $url) {
            return;
        }

        $res = $this->download($url);
        if (! $res) {
            return;
        }
        $ext = strtolower(pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION)) ?: 'bin';
        $folder = $site === 'general' ? 'general' : $site;
        $path = "notices/{$folder}/{$notice->wp_id}_".Str::limit($notice->slug, 80, '').".{$ext}";
        Storage::disk('public')->put($path, $res);
        $notice->update([
            'attachment' => "/storage/{$path}",
            'attachment_type' => in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp'], true) ? 'image' : ($ext === 'pdf' ? 'pdf' : 'file'),
        ]);
    }

    /** The ticker shows exactly the main site's "Top Scroll Notice" posts. */
    private function syncTopScroll(array $posts, array $cats): void
    {
        $catId = array_search(self::TOP_SCROLL_SLUG, $cats, true);
        if ($catId === false) {
            return;
        }
        $sourceIds = collect($posts)->filter(fn ($p) => in_array($catId, $p['categories']))->pluck('id');
        $want = Notice::whereNull('department')->whereIn('wp_id', $sourceIds)->pluck('id');

        $category = NoticeCategory::firstOrCreate(['slug' => self::TOP_SCROLL_SLUG], ['name' => 'Top Scroll Notice', 'color' => '#dc2626', 'order' => 0]);
        $current = $category->notices()->pluck('notices.id');
        $toAdd = $want->diff($current);
        $toRemove = $current->diff($want);
        $pinned = Notice::where('is_pinned', true)->whereNotIn('id', $want)->pluck('id');

        $this->info(sprintf('Top scroll: source %d, ours %d -> +%d / -%d, unpin %d', $sourceIds->count(), $current->count(), $toAdd->count(), $toRemove->count(), $pinned->count()));
        if ($this->dry) {
            return;
        }
        $category->notices()->syncWithoutDetaching($toAdd->all());
        $category->notices()->detach($toRemove->all());
        Notice::whereIn('id', $pinned)->update(['is_pinned' => false]);
        $category->update(['post_count' => $category->notices()->count()]);
    }

    // ---------------------------------------------------------------------

    private function urlKey(string $url): string
    {
        return rtrim(preg_replace('#^https?://(www\.)?#', '', $url), '/');
    }

    private function uniqueSlug(string $slug, string $site, int $wpId): string
    {
        $slug = Str::limit(Str::slug(urldecode($slug)), 180, '') ?: ($site.'-notice-'.$wpId);
        $candidate = $slug;
        for ($i = 1; Notice::where('slug', $candidate)->exists(); $i++) {
            $candidate = "{$slug}-{$i}";
        }

        return $candidate;
    }

    private function get(string $url, bool $anyStatus = false): ?string
    {
        try {
            $res = Http::withUserAgent('Mozilla/5.0 (BAUST website notice sync)')->timeout(60)->retry($anyStatus ? 1 : 3, 1500, throw: false)->get($url);
        } catch (\Throwable $e) {
            $this->warn("  ! {$url}: {$e->getMessage()}");

            return null;
        }

        return ($res->successful() || ($anyStatus && $res->body() !== '')) ? $res->body() : null;
    }

    private function json(string $url): ?array
    {
        $body = $this->get($url);

        return $body === null ? null : (json_decode($body, true) ?? []);
    }

    private function download(string $url): ?string
    {
        try {
            $res = Http::withUserAgent('Mozilla/5.0 (BAUST website notice sync)')->timeout(120)->get($url);
        } catch (\Throwable) {
            return null;
        }

        return ($res->successful() && ! str_starts_with((string) $res->header('Content-Type'), 'text/html')) ? $res->body() : null;
    }
}
