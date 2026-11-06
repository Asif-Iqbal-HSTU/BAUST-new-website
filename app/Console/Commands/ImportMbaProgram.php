<?php

namespace App\Console\Commands;

use App\Models\Department;
use App\Models\DepartmentMember;
use App\Models\DepartmentCurriculum;
use App\Models\DepartmentHighlight;
use App\Models\DepartmentSlide;
use App\Models\Faculty;
use App\Models\Notice;
use App\Models\NoticeCategory;
use Carbon\Carbon;
use DOMDocument;
use DOMXPath;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

/**
 * Imports the MBA program sub-site (https://baust.edu.bd/mba/) as a DB-driven
 * "department" (slug: mba) so it renders with the same pages as every other
 * department: home slider, head's message, why-MBA highlights, about,
 * curriculum PDFs and notices / news & events.
 *
 *   php artisan programs:import-mba --fetch    # scrape + refresh snapshot + import
 *   php artisan programs:import-mba            # import the committed snapshot
 *
 * Faculty profiles come from departments:sync-faculty-profiles mba.
 * Files are mirrored into public/ so they ship with the image.
 */
class ImportMbaProgram extends Command
{
    protected $signature = 'programs:import-mba {--fetch : Scrape baust.edu.bd/mba and refresh the snapshot first}';

    protected $description = 'Import the MBA program site (baust.edu.bd/mba) into the departments tables';

    private const SOURCE = 'https://baust.edu.bd/mba';

    private const SNAPSHOT = 'data/mba/source.json';

    /** Leftovers on the MBA site copied from the CSE sub-site template. */
    private const FOREIGN_POST = '/\bcse\b|thesis-project-supervisor/i';

    public function handle(): int
    {
        $path = database_path(self::SNAPSHOT);

        if ($this->option('fetch')) {
            $data = $this->scrape();
            if (! $data) {
                $this->error('Scrape failed; snapshot left untouched.');

                return self::FAILURE;
            }
            if (! is_dir(dirname($path))) {
                mkdir(dirname($path), 0755, true);
            }
            file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)."\n");
            $this->info("Snapshot saved to {$path}");
        }

        if (! file_exists($path)) {
            $this->error("Snapshot not found: {$path} (run with --fetch)");

            return self::FAILURE;
        }

        $this->import(json_decode(file_get_contents($path), true));

        return self::SUCCESS;
    }

    // ---------------------------------------------------------------------
    // Import
    // ---------------------------------------------------------------------

    private function import(array $data): void
    {
        $dept = Department::firstOrNew(['slug' => 'mba']);
        // The snapshot carries keys (e.g. degree_name) the departments table doesn't have.
        $columns = array_flip(Schema::getColumnListing('departments'));
        $dept->forceFill(array_merge(array_intersect_key($data['department'], $columns), [
            'is_active' => true,
            'order' => $dept->order ?: ((int) Department::where('slug', '!=', 'mba')->max('order') + 1),
        ]))->save();

        // Small, source-owned collections: replace wholesale so re-imports stay in sync.
        $dept->slides()->delete();
        foreach ($data['slides'] as $i => $s) {
            DepartmentSlide::create(['department_id' => $dept->id, 'image' => $s['image'], 'title' => $s['title'], 'caption' => null, 'order' => $i + 1]);
        }
        $dept->highlights()->delete();
        foreach ($data['highlights'] as $i => $h) {
            DepartmentHighlight::create(['department_id' => $dept->id, 'icon' => $h['icon'], 'title' => $h['title'], 'text' => $h['text'], 'order' => $i + 1]);
        }
        $dept->curricula()->delete();
        foreach ($data['curricula'] as $i => $c) {
            DepartmentCurriculum::create(array_merge($c, ['department_id' => $dept->id, 'order' => $i + 1, 'is_active' => true]));
        }

        $this->importNotices($data['notices']);
        $this->linkFacultyToHomeDepartments($dept);

        // List MBA under the Faculty of Business Studies dean's office.
        if ($fbs = Faculty::where('slug', 'fbs')->first()) {
            $slugs = $fbs->department_slugs ?? [];
            if (! in_array('mba', $slugs, true)) {
                $fbs->update(['department_slugs' => array_values(array_merge($slugs, ['mba']))]);
            }
        }

        $this->info(sprintf('MBA imported: %d slides, %d highlights, %d curricula, %d notices.',
            count($data['slides']), count($data['highlights']), count($data['curricula']), count($data['notices'])));
    }

    /**
     * MBA is taught by DBA/AIS faculty. The MBA site's own profiles are sparse
     * and partly outdated, so each MBA member takes rank, designation, photo,
     * contacts and any profile tab it lacks from the same person's DBA/AIS
     * record. The program coordinator keeps the MBA title and leads the page.
     */
    private function linkFacultyToHomeDepartments(Department $dept): void
    {
        $home = DepartmentMember::whereIn('department', ['dba', 'ais'])->get()
            ->groupBy(fn ($m) => SyncDepartmentFacultyProfiles::normalizeName($m->name));
        $tabs = ['experience', 'publications', 'research', 'achievements', 'seminars', 'training', 'others', 'biography'];

        foreach (DepartmentMember::where('department', 'mba')->get() as $m) {
            $isHead = SyncDepartmentFacultyProfiles::normalizeName($m->name) === SyncDepartmentFacultyProfiles::normalizeName((string) $dept->hod_name);
            $src = $home->get(SyncDepartmentFacultyProfiles::normalizeName($m->name))?->sortBy(fn ($r) => $r->department === 'dba' ? 0 : 1)->first();

            if ($src) {
                foreach ($tabs as $col) {
                    if (blank(strip_tags((string) $m->{$col})) && filled($src->{$col})) {
                        $m->{$col} = $src->{$col};
                    }
                }
                foreach (['education', 'areas_of_interest'] as $col) {
                    if (empty($m->{$col}) && ! empty($src->{$col})) {
                        $m->{$col} = $src->{$col};
                    }
                }
                $m->fill([
                    'photo' => $src->photo ?: $m->photo,
                    'phone' => $src->phone ?: $m->phone,
                    'email' => $src->email ?: $m->email,
                    'personal_email' => $src->personal_email ?: $m->personal_email,
                    'specialization' => $m->specialization ?: $src->specialization,
                    'category' => $src->category,
                    'employment_type' => $src->employment_type,
                    'status' => $src->status,
                    'type' => $src->type,
                ]);
                if (! $isHead) {
                    // Drop their own department's headship ("... and Head", "& Head of the Dept.").
                    $m->designation = trim(preg_replace('/\s*(and|&)\s*Head(\s+of\s+the\s+Dept\.?)?\s*$/i', '', $src->designation));
                }
            }
            $m->is_head = $isHead;
            if ($isHead) {
                $m->order = 1;
            }
            $m->save();
        }
    }

    private function importNotices(array $rows): void
    {
        $catId = [];
        foreach ([['notice', 'Notice', '#059669', 1], ['news-events', 'News & Events', '#0891b2', 6]] as [$slug, $name, $color, $order]) {
            $catId[$slug] = NoticeCategory::firstOrCreate(['slug' => $slug], ['name' => $name, 'color' => $color, 'order' => $order])->id;
        }

        foreach ($rows as $r) {
            $notice = Notice::where('original_url', $r['url'])->first();
            $payload = [
                'wp_id' => $r['wp_id'],
                'title' => $r['title'],
                'slug' => $notice ? $notice->slug : $this->uniqueSlug($r['title'], $r['wp_id']),
                'content' => $r['content'],
                'attachment' => $r['attachment'],
                'attachment_type' => $r['attachment'] ? (preg_match('/\.(jpe?g|png|gif|webp)$/i', $r['attachment']) ? 'image' : 'pdf') : null,
                'original_url' => $r['url'],
                'author' => 'BAUST',
                'department' => 'mba',
                'is_active' => true,
                'published_at' => Carbon::parse($r['published_at']),
            ];
            $notice ? $notice->update($payload) : ($notice = Notice::create($payload));
            $notice->categories()->sync(collect($r['cats'])->map(fn ($c) => $catId[$c] ?? null)->filter()->values()->all());
        }

        foreach (NoticeCategory::all() as $cat) {
            $cat->update(['post_count' => $cat->notices()->count()]);
        }
    }

    private function uniqueSlug(string $title, int $wpId): string
    {
        $base = Str::slug($title) ?: "mba-notice-{$wpId}";
        $slug = $base;
        for ($i = 1; Notice::where('slug', $slug)->exists(); $i++) {
            $slug = "{$base}-{$i}";
        }

        return $slug;
    }

    // ---------------------------------------------------------------------
    // Scrape
    // ---------------------------------------------------------------------

    private function scrape(): ?array
    {
        $home = $this->xpath(self::SOURCE.'/');
        $pages = $this->json(self::SOURCE.'/wp-json/wp/v2/pages?per_page=100');
        $posts = $this->json(self::SOURCE.'/wp-json/wp/v2/posts?per_page=100');
        $cats = collect($this->json(self::SOURCE.'/wp-json/wp/v2/categories?per_page=100') ?? [])->pluck('slug', 'id');
        if (! $home || ! $pages || ! $posts) {
            return null;
        }
        $page = fn (string $slug) => collect($pages)->firstWhere('slug', $slug);

        // About
        $about = $this->paragraphs($page('about')['content']['rendered'] ?? '');

        // Head of program (homepage "Message from Head" block)
        $headBlock = $home->query("//h2[contains(normalize-space(.), 'Message from Head')]/ancestor::div[.//h3][1]")->item(0);
        $headName = $headBlock ? $this->text($home->query('.//h3', $headBlock)->item(0)) : 'Md. Zaber Hossain';
        $headDesignation = $headBlock ? $this->text($home->query('.//h6', $headBlock)->item(0)) : '';
        $headPhoto = null;
        if ($headBlock && ($bg = $home->query(".//*[contains(@style, 'url(')]", $headBlock)->item(0))) {
            $headPhoto = $this->download($this->fullSize($this->bgUrl($bg->getAttribute('style'))), 'images/departments/mba/head-'.Str::slug($headName));
        }

        // Slider
        $slides = [];
        foreach ($home->query("//div[contains(@class, 'carousel-inner')]/div[contains(@class, 'item')]") as $i => $item) {
            $fill = $home->query(".//div[contains(@class, 'fill')]", $item)->item(0);
            $url = $fill ? $this->bgUrl($fill->getAttribute('style')) : null;
            if (! $url) {
                continue;
            }
            $local = $this->download($this->fullSize($url), 'images/departments/mba/slider/slide'.($i + 1)) ?? $this->download($url, 'images/departments/mba/slider/slide'.($i + 1));
            if ($local) {
                $slides[] = ['image' => $local, 'title' => $this->tidyCaption($this->text($home->query('.//h2', $item)->item(0)))];
            }
        }

        // Why MBA at BAUST? -> highlights
        $whyText = null;
        $highlights = [];
        $icons = ['Qualified Teacher' => 'GraduationCap', 'Modern Hall' => 'Building2', 'Green Campus' => 'Globe'];
        foreach (preg_split('/\n+/', html_entity_decode(strip_tags(str_replace(['</p>', '<br />', '<br>'], "\n", $page('why-mba-at-baust')['content']['rendered'] ?? '')))) as $line) {
            $line = trim(preg_replace('/\s+/u', ' ', str_replace("\u{a0}", ' ', $line)));
            if (isset($icons[$line])) {
                $highlights[] = ['icon' => $icons[$line], 'title' => $line, 'text' => null];
            } elseif (Str::startsWith($line, 'Master of Business Administration')) {
                $whyText = $line;
            }
        }

        // Curricula: syllabus PDFs published as posts
        $curricula = [];
        foreach ($posts as $p) {
            if (! preg_match('/^mba-syllabus-(\d{4})-(.+)$/', $p['slug'], $m)) {
                continue;
            }
            $pdf = $this->postAttachment($p);
            $curricula[] = [
                'title' => html_entity_decode($p['title']['rendered']),
                'year' => $m[1],
                'description' => str_contains($m[2], 'non') ? 'Earlier MBA curriculum (non-OBE).' : 'Current Outcome-Based Education (OBE) curriculum for the MBA program.',
                'highlights' => null,
                'file' => $pdf ? $this->download($pdf, "files/departments/mba/curriculum/MBA-Syllabus-{$m[1]}-".Str::slug($m[2])) : null,
                'duration' => null,
                'credits' => null,
                'degree' => 'Master of Business Administration (MBA)',
            ];
        }
        usort($curricula, fn ($a, $b) => $b['year'] <=> $a['year']);

        // Notices / news & events
        $notices = [];
        foreach ($posts as $p) {
            if (preg_match(self::FOREIGN_POST, $p['slug'])) {
                continue;
            }
            $slugs = collect($p['categories'])->map(fn ($id) => $cats[$id] ?? null)->filter();
            $att = $this->postAttachment($p);
            $local = $att ? $this->download($att, "files/departments/mba/notices/{$p['id']}") : null;
            $content = trim($p['content']['rendered']);
            $notices[] = [
                'wp_id' => $p['id'],
                'url' => $p['link'],
                'title' => html_entity_decode($p['title']['rendered']),
                'published_at' => str_replace('T', ' ', $p['date']),
                'cats' => array_values(array_unique(array_merge(
                    $slugs->contains(fn ($s) => in_array($s, ['notice', 'exam-notice', 'hot-notice'])) ? ['notice'] : [],
                    $slugs->contains('news-events') ? ['news-events'] : [],
                ))) ?: ['notice'],
                'attachment' => $local,
                'content' => strip_tags($content) !== '' && ! str_contains($content, 'pdfjs-viewer') ? $content : null,
            ];
            $this->line("  notice: {$notices[array_key_last($notices)]['title']}".($local ? " [{$local}]" : ''));
        }

        return [
            'department' => [
                'name' => 'Master of Business Administration (MBA) Program',
                'short_name' => 'MBA',
                'faculty' => 'Faculty of Business Studies (FBS)',
                'tagline' => 'Modern Business Education for Tomorrow\'s Leaders',
                'degree_name' => 'Master of Business Administration (MBA)',
                'accreditation_badge' => 'UGC Approved',
                'accreditation_title' => 'UGC and Government Approved',
                'accreditation_text' => $whyText,
                'about' => implode("\n\n", $about),
                'hod_name' => $headName,
                'hod_designation' => $headDesignation ?: 'MBA Program Coordinator',
                'hod_photo' => $headPhoto,
                // The source's message page is gone; its homepage teaser is the opening of the About text.
                'hod_message' => $about[0] ?? null,
            ],
            'slides' => $slides,
            'highlights' => $highlights,
            'curricula' => $curricula,
            'notices' => $notices,
        ];
    }

    /** First PDF/image the rendered post shows: pdf.js viewer, linked file, inline image or featured image. */
    private function postAttachment(array $post): ?string
    {
        // Post pages render fully but answer HTTP 500 (a plugin error is appended at the end).
        $html = ($this->fetch($post['link'], anyStatus: true) ?? '').$post['content']['rendered'];
        if (preg_match('#viewer\.php\?file=(https?://[^"\'&\s]+\.pdf)#i', $html, $m)) {
            return $m[1];
        }
        if (preg_match('#https?://[^"\'\s]*/mba/wp-content/uploads/[^"\'\s]+\.pdf#i', $html, $m)) {
            return $m[0];
        }
        if (preg_match('#https?://[^"\'\s]*/mba/wp-content/uploads/[^"\'\s]+?(?:-\d+x\d+)?\.(?:jpe?g|png)#i', $post['content']['rendered'], $m)) {
            return $this->fullSize($m[0]);
        }
        if (! empty($post['featured_media']) && ($media = $this->json(self::SOURCE."/wp-json/wp/v2/media/{$post['featured_media']}"))) {
            return $media['source_url'] ?? null;
        }

        return null;
    }

    // ---------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------

    private function fetch(string $url, bool $anyStatus = false): ?string
    {
        try {
            $res = Http::withUserAgent('Mozilla/5.0 (BAUST website MBA sync)')->timeout(40)->retry($anyStatus ? 1 : 3, 1000, throw: false)->get($url);
        } catch (\Throwable $e) {
            $this->warn("  ! {$url}: {$e->getMessage()}");

            return null;
        }

        return ($res->successful() || ($anyStatus && $res->body() !== '')) ? $res->body() : null;
    }

    private function json(string $url): ?array
    {
        $body = $this->fetch($url);

        return $body ? json_decode($body, true) : null;
    }

    private function xpath(string $url): ?DOMXPath
    {
        $body = $this->fetch($url);
        if (! $body) {
            return null;
        }
        $doc = new DOMDocument;
        libxml_use_internal_errors(true);
        $doc->loadHTML('<?xml encoding="utf-8"?>'.$body);
        libxml_clear_errors();

        return new DOMXPath($doc);
    }

    /** Mirror a remote file into public/{$base}.{ext}; returns its public path. */
    private function download(?string $url, string $base): ?string
    {
        if (! $url) {
            return null;
        }
        $ext = strtolower(pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION)) ?: 'bin';
        $relative = "/{$base}.{$ext}";
        $absolute = public_path(ltrim($relative, '/'));
        if (file_exists($absolute)) {
            return $relative;
        }
        try {
            $res = Http::withUserAgent('Mozilla/5.0 (BAUST website MBA sync)')->timeout(60)->get($url);
        } catch (\Throwable) {
            return null;
        }
        if (! $res->successful() || str_starts_with((string) $res->header('Content-Type'), 'text/html')) {
            return null;
        }
        if (! is_dir(dirname($absolute))) {
            mkdir(dirname($absolute), 0755, true);
        }
        file_put_contents($absolute, $res->body());

        return $relative;
    }

    private function fullSize(?string $url): ?string
    {
        return $url ? preg_replace('/-\d+x\d+(\.\w+)$/', '$1', $url) : null;
    }

    private function bgUrl(string $style): ?string
    {
        return preg_match('/url\((.*?)\)/', $style, $m) ? trim($m[1], " '\"") : null;
    }

    private function text($node): string
    {
        return $node ? trim(preg_replace('/\s+/u', ' ', html_entity_decode($node->textContent))) : '';
    }

    private function paragraphs(string $html): array
    {
        $text = html_entity_decode(strip_tags(str_replace(['</p>', '<br />', '<br>'], "\n\n", $html)));

        return array_values(array_filter(array_map(fn ($p) => trim(preg_replace('/\s+/u', ' ', $p)), explode("\n\n", $text))));
    }

    /** Slider captions are raw upload names ("BA_INDUSTRIAL TOUR", "BA_Saminer"). */
    private function tidyCaption(string $t): string
    {
        $t = preg_replace('/^BA_/', '', $t);
        $t = str_ireplace('Saminer', 'Seminar', $t);

        return $t === strtoupper($t) ? Str::title(strtolower($t)) : $t;
    }
}
