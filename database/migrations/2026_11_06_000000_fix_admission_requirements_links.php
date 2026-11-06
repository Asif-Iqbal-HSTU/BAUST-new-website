<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * /admission/admission-requirment (misspelled) became /admission/admission-requirements.
 * The old URL keeps working as a 301 (config/legacy-redirects.php); this points the links
 * stored in page content straight at the new one.
 */
return new class extends Migration
{
    private const OLD = '/admission/admission-requirment';

    private const NEW = '/admission/admission-requirements';

    public function up(): void
    {
        $this->swap(self::OLD, self::NEW);
    }

    public function down(): void
    {
        $this->swap(self::NEW, self::OLD);
    }

    private function swap(string $from, string $to): void
    {
        // The JSON may hold the path with plain or escaped ("\/") slashes.
        $esc = fn (string $s) => str_replace('/', '\\/', $s);
        $search = [$from.'/', $from, $esc($from.'/'), $esc($from)];
        $replace = [$to, $to, $esc($to), $esc($to)];

        DB::table('site_pages')->where('content', 'like', '%'.basename($from).'%')->orderBy('id')
            ->each(function ($page) use ($search, $replace) {
                DB::table('site_pages')->where('id', $page->id)->update([
                    // Trailing-slash links ("/admission/admission-requirment/") lose the slash too.
                    'content' => str_replace($search, $replace, $page->content),
                ]);
            });
    }
};
