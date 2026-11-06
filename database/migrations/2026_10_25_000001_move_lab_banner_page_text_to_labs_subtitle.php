<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Laboratories pages now share one layout: the banner subtitle is `labs_subtitle`
 * and `labs_intro` is the paragraph above the lab list. These departments used
 * `labs_intro` for the banner, so move any saved override over to keep it there.
 */
return new class extends Migration
{
    private const DEPARTMENTS = ['cse', 'ipe', 'ce', 'dba', 'ais', 'eng', 'as', 'mba'];

    public function up(): void
    {
        DB::table('departments')->whereIn('slug', self::DEPARTMENTS)->whereNotNull('page_texts')->get(['id', 'page_texts'])
            ->each(function ($dept) {
                $texts = json_decode($dept->page_texts, true) ?: [];
                if (! isset($texts['labs_intro']) || isset($texts['labs_subtitle'])) {
                    return;
                }
                $texts['labs_subtitle'] = $texts['labs_intro'];
                unset($texts['labs_intro']);
                DB::table('departments')->where('id', $dept->id)->update(['page_texts' => json_encode($texts)]);
            });
    }

    public function down(): void
    {
        // Content move; nothing to undo.
    }
};
