<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * One public page's editable content document (Administration, Library,
 * Research and Admission menus). The original content of each page ships in
 * database/data/site_pages/{key}.json and seeds the table.
 */
class SitePage extends Model
{
    /** Section => label, and the admin role that manages it. */
    public const SECTIONS = [
        'administration' => ['label' => 'Administration', 'role' => 'administration_admin'],
        'library' => ['label' => 'Library', 'role' => 'library_admin'],
        'research' => ['label' => 'Research', 'role' => 'research_admin'],
        'admission' => ['label' => 'Admission', 'role' => 'admission_admin'],
    ];

    /** Office staff lists (OfficeMember offices) each section admin also maintains. */
    public const SECTION_OFFICES = [
        'library' => ['librarian'],
        'admission' => ['admission-office'],
    ];

    /**
     * Admins of an office rather than a whole menu: role => the individual
     * pages and office staff lists they maintain.
     */
    public const PAGE_ADMINS = [
        'treasurer_admin' => [
            'label' => 'Treasurer Office',
            'pages' => ['administration.finance-committee'],
            'offices' => ['treasurer'],
        ],
    ];

    protected $fillable = ['key', 'section', 'title', 'content', 'updated_by'];

    protected $casts = ['content' => 'array'];

    public static function defaultsPath(?string $key = null): string
    {
        return database_path('data/site_pages'.($key ? "/{$key}.json" : ''));
    }

    /** The original content shipped with the code, or null if there is none. */
    public static function defaults(string $key): ?array
    {
        $path = self::defaultsPath($key);

        return is_file($path) ? json_decode(file_get_contents($path), true) : null;
    }

    /** Content for rendering a page: the edited version, else the shipped original. */
    public static function contentFor(string $key): array
    {
        return self::where('key', $key)->value('content') ?? (self::defaults($key)['content'] ?? []);
    }

    public static function sectionOf(string $key): string
    {
        return explode('.', $key, 2)[0];
    }

    /** Insert pages that ship a default document but have no row yet (never overwrites edits). */
    public static function seedMissingFromDefaults(): void
    {
        foreach (glob(self::defaultsPath().'/*.json') ?: [] as $file) {
            $key = basename($file, '.json');
            $data = json_decode(file_get_contents($file), true);
            if (! is_array($data) || ! isset(self::SECTIONS[self::sectionOf($key)]) || self::where('key', $key)->exists()) {
                continue;
            }
            self::create([
                'key' => $key,
                'section' => self::sectionOf($key),
                'title' => $data['title'] ?? $key,
                'content' => $data['content'] ?? [],
            ]);
        }
    }
}
