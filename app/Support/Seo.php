<?php

namespace App\Support;

use App\Models\SitePage;
use Illuminate\Support\Str;

/**
 * Search/social metadata for a public page, worked out on the server from the
 * Inertia page (component + props) so crawlers and link previews get a real
 * title, description, image and structured data without running JavaScript.
 */
class Seo
{
    public const SITE_NAME = 'BAUST';

    public const UNIVERSITY = 'Bangladesh Army University of Science and Technology (BAUST)';

    public const DEFAULT_DESCRIPTION = 'Bangladesh Army University of Science and Technology (BAUST), Saidpur Cantonment: undergraduate and graduate programs in engineering, business, English and sciences, with admission, notices, faculty and research information.';

    public const DEFAULT_IMAGE = '/images/BAUST%20logo.png';

    /** Readable page names for department sub-pages, by component name. */
    private const PAGE_LABELS = [
        'About' => 'About',
        'VisionMission' => 'Vision & Mission',
        'Faculty' => 'Faculty Members',
        'AcademicStaff' => 'Academic Staff',
        'Curriculum' => 'Curriculum',
        'Laboratory' => 'Laboratories',
        'Laboratories' => 'Laboratories',
        'Facilities' => 'Facilities',
        'Events' => 'News & Events',
        'Achievements' => 'Achievements',
        'Alumni' => 'Alumni',
        'AlumniInfo' => 'Alumni',
        'AlumniAssoc' => 'Alumni Association',
        'Research' => 'Research',
        'ResearchPublications' => 'Research Publications',
        'ResearchProjects' => 'Research Projects',
        'Publications' => 'Research Publications',
        'ThesisProjects' => 'Thesis Projects',
        'OnlineResources' => 'Online Resources',
        'StudentVoice' => 'Student Voice',
        'Photos' => 'Photo Gallery',
        'Videos' => 'Video Gallery',
        'Clubs' => 'Clubs & Societies',
    ];

    /**
     * @param  array{component: string, props: array, url: string}  $page
     * @return array{title: string, description: string, image: string, url: string, type: string, robots: string, jsonLd: list<array>}
     */
    public static function forPage(array $page): array
    {
        $props = $page['props'] ?? [];
        $component = (string) ($page['component'] ?? '');
        $leaf = Str::afterLast($component, '/');
        $request = request();

        $seo = [
            'title' => null,
            'description' => null,
            'image' => null,
            'type' => 'website',
            'robots' => 'index, follow',
            'jsonLd' => [self::universityJsonLd()],
        ];

        // Admin, settings and auth screens are not for search engines.
        if (Str::startsWith($component, ['Admin/', 'auth/', 'settings/', 'dashboard']) || $request->is('admin*', 'dashboard', 'settings*', 'login', 'register', 'forgot-password', 'reset-password*')) {
            $seo['robots'] = 'noindex, nofollow';
        }

        $notice = $props['event'] ?? $props['notice'] ?? null;
        $dept = $props['department'] ?? null;

        if ($component === 'Home') {
            $seo['title'] = self::UNIVERSITY.' – Saidpur Cantonment';
            $seo['description'] = self::DEFAULT_DESCRIPTION;
        } elseif (is_array($notice) || is_object($notice)) {
            $notice = (array) (is_object($notice) && method_exists($notice, 'toArray') ? $notice->toArray() : $notice);
            $seo['title'] = self::clean($notice['title'] ?? '');
            $seo['description'] = self::excerpt($notice['excerpt'] ?? null) ?: self::excerpt($notice['content'] ?? null);
            if (in_array($notice['attachment_type'] ?? null, ['image', 'jpg', 'png'], true) && ! empty($notice['attachment'])) {
                $seo['image'] = $notice['attachment'];
            }
            $seo['type'] = 'article';
            $seo['jsonLd'][] = array_filter([
                '@context' => 'https://schema.org',
                '@type' => 'NewsArticle',
                'headline' => Str::limit($seo['title'], 110, ''),
                'datePublished' => $notice['published_at'] ?? null,
                'dateModified' => $notice['updated_at'] ?? ($notice['published_at'] ?? null),
                'image' => $seo['image'] ? [self::absolute($seo['image'])] : null,
                'publisher' => ['@type' => 'CollegeOrUniversity', 'name' => self::UNIVERSITY, 'logo' => self::absolute(self::DEFAULT_IMAGE)],
                'mainEntityOfPage' => self::absolute('/'.ltrim($request->path(), '/')),
            ]);
        } elseif (is_array($props['faculty'] ?? null) && isset($props['faculty']['code'])) {
            $faculty = $props['faculty'];
            $seo['title'] = trim(($faculty['name'] ?? '').' – Dean\'s Office');
            $seo['description'] = self::excerpt($faculty['about'] ?? null) ?: self::excerpt($faculty['tagline'] ?? null);
        } elseif (is_array($dept) || is_object($dept)) {
            $dept = (array) (is_object($dept) && method_exists($dept, 'toArray') ? $dept->toArray() : $dept);
            $name = $dept['name'] ?? '';
            $label = $leaf === 'Index' || $leaf === 'Show' ? null : (self::PAGE_LABELS[$leaf] ?? Str::headline($leaf));
            $lab = $props['lab'] ?? null;
            if (is_array($lab) && ! empty($lab['name']) && in_array($leaf, ['Laboratory', 'Laboratories', 'Facilities'], true)) {
                $label = $lab['name'];
                $seo['description'] = self::excerpt($lab['description'] ?? null);
                $seo['image'] = $lab['images'][0] ?? null;
            }
            $seo['title'] = $label ? "{$label} – {$name}" : $name;
            $seo['description'] ??= self::excerpt($dept['page_texts']['home_hero_subtitle'] ?? null)
                ?: self::excerpt($dept['about'] ?? null)
                ?: self::excerpt($dept['tagline'] ?? null);
            $seo['image'] ??= $props['slides'][0]['image'] ?? ($dept['slides'][0]['image'] ?? null);
            $seo['jsonLd'][] = array_filter([
                '@context' => 'https://schema.org',
                '@type' => 'EducationalOrganization',
                'name' => $name,
                'url' => self::absolute('/'.($dept['slug'] ?? '')),
                'description' => self::excerpt($dept['about'] ?? null),
                'parentOrganization' => ['@type' => 'CollegeOrUniversity', 'name' => self::UNIVERSITY, 'url' => self::absolute('/')],
            ]);
        } elseif (isset($props['content']) && is_array($props['content'])) {
            $key = $request->route()?->defaults['key'] ?? null;
            $content = $props['content'];
            $seo['title'] = ($key ? SitePage::where('key', $key)->value('title') : null)
                ?? self::clean($content['hero']['title'] ?? '');
            $seo['description'] = self::excerpt($content['hero']['subtitle'] ?? null) ?: self::excerpt(self::firstText($content));
        } elseif (is_array($props['office'] ?? null)) {
            $seo['title'] = $props['office']['name'] ?? null;
            $seo['description'] = self::excerpt($props['office']['subtitle'] ?? null);
        }

        $title = $seo['title'] ?: Str::headline(str_replace('/', ' ', $component));
        $seo['title'] = Str::contains($title, 'BAUST') ? $title : "{$title} – ".self::SITE_NAME;
        $seo['description'] = $seo['description'] ?: self::DEFAULT_DESCRIPTION;
        $seo['image'] = self::absolute($seo['image'] ?: self::DEFAULT_IMAGE);
        $seo['url'] = self::absolute('/'.ltrim($request->path(), '/'));

        return $seo;
    }

    /** The university itself, on every page. */
    public static function universityJsonLd(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'CollegeOrUniversity',
            'name' => self::UNIVERSITY,
            'alternateName' => 'BAUST',
            'url' => self::absolute('/'),
            'logo' => self::absolute(self::DEFAULT_IMAGE),
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => 'Saidpur Cantonment',
                'addressLocality' => 'Saidpur',
                'addressRegion' => 'Nilphamari',
                'addressCountry' => 'BD',
            ],
            'telephone' => '+8801769675588',
        ];
    }

    /** Absolute URL on the public site address (APP_URL), whatever host the request came through. */
    public static function absolute(?string $path): string
    {
        if ($path && Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }
        $path = '/'.ltrim((string) $path, '/');

        return rtrim((string) config('app.url'), '/').($path === '/' ? '/' : $path);
    }

    private static function clean(?string $text): string
    {
        return trim(preg_replace('/\s+/', ' ', html_entity_decode(strip_tags((string) $text), ENT_QUOTES | ENT_HTML5, 'UTF-8')));
    }

    /** A plain-text summary of at most ~160 characters, for meta descriptions. */
    private static function excerpt(mixed $text): ?string
    {
        if (is_array($text)) {
            $text = implode(' ', array_filter($text, 'is_string'));
        }
        $clean = self::clean(is_string($text) ? str_replace(['\n', '**'], [' ', ''], $text) : '');

        return $clean === '' ? null : Str::limit($clean, 160, '…');
    }

    /** First reasonably long text anywhere in a content document. */
    private static function firstText(array $content): ?string
    {
        foreach ($content as $key => $value) {
            if (is_string($value) && mb_strlen($value) > 60 && ! Str::endsWith((string) $key, ['image', 'photo', 'pdf', 'url', 'link'])) {
                return $value;
            }
            if (is_array($value) && ($found = self::firstText($value))) {
                return $found;
            }
        }

        return null;
    }
}
