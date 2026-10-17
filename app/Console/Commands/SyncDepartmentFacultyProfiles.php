<?php

namespace App\Console\Commands;

use App\Models\DepartmentMember;
use DOMDocument;
use DOMElement;
use DOMNode;
use DOMXPath;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

/**
 * Imports full faculty profiles (overview, experience, publications, research
 * interests, achievements, seminars, training, others) from the legacy
 * baust.edu.bd department sub-sites into department_members.
 *
 *   php artisan departments:sync-faculty-profiles dba ais eng as --fetch
 *
 * --fetch scrapes the source site and refreshes the JSON snapshot in
 * database/data/faculty_profiles/{dept}.json; without it the snapshot is
 * imported as-is (used by the data migration so deploys never hit the network).
 */
class SyncDepartmentFacultyProfiles extends Command
{
    protected $signature = 'departments:sync-faculty-profiles
                            {departments* : Department slugs, e.g. dba ais eng as}
                            {--fetch : Scrape baust.edu.bd and refresh the JSON snapshot first}
                            {--create-missing : Add source members that are not in the database yet}
                            {--only-missing : Only add members that are not in the database yet; leave existing ones untouched}
                            {--dry-run : Show matches without writing to the database}';

    protected $description = 'Import faculty profile tabs from the legacy baust.edu.bd department sites';

    private const SOURCE = 'https://baust.edu.bd';

    /** Source profile tab id => department_members column. */
    private const TABS = [
        'tab-1' => 'experience',
        'tab-2' => 'publications',
        'tab-3' => 'research',
        'tab-4' => 'achievements',
        'tab-5' => 'seminars',
        'tab-6' => 'training',
        'tab-8' => 'others',
    ];

    /** Tab bodies that only repeat the tab heading (or say nothing). */
    private const PLACEHOLDERS = [
        'experience', 'teaching experience', 'publications', 'publication', 'research interests', 'research interest',
        'achievement, awards and grants', 'achievements', 'seminar workshop', 'seminar/workshop', 'seminar & workshop',
        'training', 'others', 'none', 'n/a', 'na', 'nil', '-',
    ];

    public function handle(): int
    {
        foreach ($this->argument('departments') as $dept) {
            $dept = strtolower(trim($dept));
            $path = database_path("data/faculty_profiles/{$dept}.json");

            if ($this->option('fetch')) {
                $records = $this->scrapeDepartment($dept);
                if (! $records) {
                    $this->error("[{$dept}] nothing scraped, snapshot left untouched.");
                    continue;
                }
                // Mirror photos only for people we do not have yet; existing members keep theirs.
                $members = DepartmentMember::where('department', $dept)->get();
                foreach ($records as &$rec) {
                    $rec['local_photo'] = $this->downloadPhoto($dept, $rec, download: ! $this->findMember($members, $rec, []));
                }
                unset($rec);
                if (! is_dir(dirname($path))) {
                    mkdir(dirname($path), 0755, true);
                }
                file_put_contents($path, json_encode($records, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)."\n");
                $this->info("[{$dept}] saved ".count($records)." profiles to {$path}");
            }

            if (! file_exists($path)) {
                $this->error("[{$dept}] snapshot not found: {$path} (run with --fetch)");
                continue;
            }

            $this->importDepartment($dept, json_decode(file_get_contents($path), true) ?: []);
        }

        return self::SUCCESS;
    }

    // ---------------------------------------------------------------------
    // Import
    // ---------------------------------------------------------------------

    private function importDepartment(string $dept, array $records): void
    {
        $members = DepartmentMember::where('department', $dept)->get();
        $claimed = [];
        $updated = 0;
        $unmatched = [];

        foreach ($records as $rec) {
            $member = $this->findMember($members, $rec, $claimed);
            if ($member && $this->option('only-missing')) {
                $claimed[] = $member->id;
                continue;
            }
            if (! $member && ($this->option('create-missing') || $this->option('only-missing'))) {
                $member = $this->newMember($dept, $rec, $members);
            }
            if (! $member) {
                $unmatched[] = $rec['name'].' ('.$rec['designation'].')';
                continue;
            }
            $claimed[] = $member->id;

            $areas = array_values(array_filter($rec['areas_of_interest'] ?? []));

            // Profile content is owned by the source site; identity fields the
            // admins curate here (name, designation, rank, status, order) are kept.
            $fields = [
                'wp_profile_url' => $rec['profile_url'] ?: $member->wp_profile_url,
                'education' => $rec['education'] ?: ($member->education ?: []),
                'areas_of_interest' => $areas ?: $member->areas_of_interest,
                'specialization' => $member->specialization ?: ($areas ? implode(', ', array_slice($areas, 0, 2)) : null),
                'phone' => $member->phone ?: ($rec['phone'] ?: null),
                'email' => $member->email ?: ($rec['email'] ?: null),
                'personal_email' => $member->personal_email ?: ($rec['personal_email'] ?: null),
                'photo' => $member->photo ?: ($rec['local_photo'] ?? null ?: ($rec['photo'] ?: null)),
            ];
            foreach (self::TABS as $column) {
                $fields[$column] = $rec[$column] ?? $member->{$column};
            }

            $member->fill($fields);
            $dirty = array_keys($member->getDirty());
            if (! $this->option('dry-run')) {
                $member->save();
            }
            $updated++;

            $tabs = collect(self::TABS)->filter(fn ($c) => ! empty($rec[$c]))->map(fn ($c) => ucfirst($c))->implode(', ');
            $this->line(sprintf(' <comment>[%s]</comment> #%d %s -> %s%s', $dept, $member->id, $member->name, $tabs ?: 'no tabs', $dirty ? '' : ' (unchanged)'));
        }

        $this->info("[{$dept}] matched {$updated}/".count($records).' source profiles'.($this->option('dry-run') ? ' (dry run)' : ''));
        foreach ($unmatched as $u) {
            $this->warn("   not in DB: {$u}");
        }
        foreach ($members->whereNotIn('id', $claimed) as $m) {
            $this->warn("   no source profile: #{$m->id} {$m->name}");
        }
    }

    private function newMember(string $dept, array $rec, $members): DepartmentMember
    {
        $designation = $rec['designation'];
        $d = strtolower($designation);
        $isStaff = ! Str::contains($d, ['professor', 'lecturer', 'teaching assistant', 'adjunct']);

        $member = new DepartmentMember([
            'department' => $dept,
            'name' => $rec['name'],
            'designation' => $designation,
            'employment_type' => $isStaff ? 'staff' : 'faculty',
            'category' => $isStaff
                ? (Str::contains($d, ['officer', 'operator']) ? 'academic_officer' : 'academic_staff')
                : self::rankFromDesignation($d),
            'type' => Str::contains($d, 'adjunct') ? 'adjunct' : 'permanent',
            'status' => Str::contains($d, 'study leave') ? 'study_leave' : 'active',
            'is_head' => false,
            'order' => (int) $members->max('order') + $rec['order'],
        ]);
        $this->line(" <info>[{$dept}] new member</info> {$rec['name']} ({$designation})");

        return $member;
    }

    private static function rankFromDesignation(string $d): string
    {
        return match (true) {
            Str::contains($d, 'associate professor') => 'associate_professor',
            Str::contains($d, 'assistant professor') => 'assistant_professor',
            Str::contains($d, 'professor') => 'professor',
            Str::contains($d, 'teaching assistant') => 'teaching_assistant',
            default => 'lecturer',
        };
    }

    /** Mirror the source photo into public/ (same naming as the original seed) unless it is already there. */
    private function downloadPhoto(string $dept, array $rec, bool $download = true): ?string
    {
        $relative = "/images/departments/{$dept}/faculty/{$dept}-".Str::slug($rec['name']).'.jpg';
        $absolute = public_path(ltrim($relative, '/'));
        if (file_exists($absolute)) {
            return $relative;
        }
        if (! $download || ! $rec['photo']) {
            return null;
        }
        try {
            $res = Http::withUserAgent('Mozilla/5.0 (BAUST website profile sync)')->timeout(30)->get($rec['photo']);
        } catch (\Throwable) {
            return null;
        }
        if (! $res->successful() || ! Str::startsWith((string) $res->header('Content-Type'), 'image/')) {
            return null;
        }
        if (! is_dir(dirname($absolute))) {
            mkdir(dirname($absolute), 0755, true);
        }
        file_put_contents($absolute, $res->body());
        $this->line("    photo saved: {$relative}");

        return $relative;
    }
    private function findMember($members, array $rec, array $claimed): ?DepartmentMember
    {
        $pool = $members->whereNotIn('id', $claimed);

        if ($rec['profile_url'] && ($m = $pool->firstWhere('wp_profile_url', $rec['profile_url']))) {
            return $m;
        }

        $target = self::normalizeName($rec['name']);
        foreach ($pool as $m) {
            if (self::normalizeName($m->name) === $target) {
                return $m;
            }
        }

        // Tolerate spelling drift (e.g. "Ummey" vs "Ummy") but never across short names.
        $best = null;
        $bestDist = PHP_INT_MAX;
        foreach ($pool as $m) {
            $d = levenshtein(self::normalizeName($m->name), $target);
            if ($d < $bestDist) {
                [$best, $bestDist] = [$m, $d];
            }
        }

        return ($best && strlen($target) >= 8 && $bestDist <= 2) ? $best : null;
    }

    public static function normalizeName(string $name): string
    {
        $n = strtolower(html_entity_decode($name));
        $n = preg_replace('/\(.*?\)/', ' ', $n);
        $n = preg_replace('/,\s*(psc|peng|itp|ndc|te)\b.*$/', ' ', $n);
        $n = preg_replace('/\b(lt|col|brig|gen|prof|professor|dr|engr|md|mohammad|mst|most|mr|ms|mrs|retd)\b\.?/', ' ', $n);
        $n = preg_replace('/[^a-z]+/', ' ', $n);

        return trim(preg_replace('/\s+/', ' ', $n));
    }

    // ---------------------------------------------------------------------
    // Scraping
    // ---------------------------------------------------------------------

    private function scrapeDepartment(string $dept): array
    {
        $listUrl = self::SOURCE."/{$dept}/faculty-members/";
        $this->info("[{$dept}] fetching {$listUrl}");
        $xp = $this->load($listUrl);
        if (! $xp) {
            return [];
        }

        $records = [];
        foreach ($xp->query("//div[contains(concat(' ', normalize-space(@class), ' '), ' card-area ')]") as $i => $card) {
            $link = $xp->query(".//a[contains(@href, '/employees/')]", $card)->item(0);
            $img = $xp->query(".//div[contains(@class, 'image')]", $card)->item(0);

            $rec = [
                'order' => $i + 1,
                'name' => $this->text($xp->query(".//*[contains(@class, 'title')]", $card)->item(0)),
                'designation' => $this->text($xp->query(".//*[contains(@class, 'designation-title')]", $card)->item(0)),
                'profile_url' => $link ? trim($link->getAttribute('href')) : '',
                'photo' => $img ? $this->backgroundUrl($img->getAttribute('style')) : '',
                'phone' => '',
                'email' => '',
                'personal_email' => '',
                'education' => [],
                'areas_of_interest' => [],
            ];
            foreach (self::TABS as $column) {
                $rec[$column] = null;
            }

            foreach ($xp->query(".//*[contains(@class, 'profile-contact-info')]/span", $card) as $span) {
                $email = $this->emailsIn($xp, $span);
                if ($email) {
                    $rec['email'] = $email[0];
                } elseif (preg_match('/\d{6,}/', str_replace(['-', ' '], '', $span->textContent))) {
                    $rec['phone'] = $this->text($span);
                }
            }
            $qual = $this->text($xp->query(".//*[contains(@class, 'qualification')]", $card)->item(0));
            if ($qual) {
                $rec['education'] = $this->splitQualification($qual);
            }

            if ($rec['profile_url']) {
                $this->scrapeProfile($rec);
                usleep(150000);
            }

            $found = collect(self::TABS)->filter(fn ($c) => $rec[$c])->keys()->count();
            $this->line(sprintf('  [%d] %s -> %d tab(s), %d interest(s)', $i + 1, $rec['name'], $found, count($rec['areas_of_interest'])));
            $records[] = $rec;
        }

        return $records;
    }

    private function scrapeProfile(array &$rec): void
    {
        $xp = $this->load($rec['profile_url']);
        if (! $xp) {
            return;
        }

        if ($pic = $xp->query("//div[contains(@class, 'pImg')]")->item(0)) {
            $rec['photo'] = $this->backgroundUrl($pic->getAttribute('style')) ?: $rec['photo'];
        }

        if ($info = $xp->query("//div[contains(@class, 'profile-info')]")->item(0)) {
            $h4 = $this->text($xp->query('.//h4', $info)->item(0));
            if (strlen($h4) > 2) {
                $rec['name'] = $h4;
            }
            foreach ($xp->query('.//p', $info) as $p) {
                $t = $this->text($p);
                if (Str::startsWith($t, 'Designation:') && ($v = trim(Str::after($t, 'Designation:')))) {
                    $rec['designation'] = $v;
                } elseif (Str::startsWith($t, 'Qualification:') && ($v = trim(Str::after($t, 'Qualification:')))) {
                    $rec['education'] = $this->splitQualification($v);
                }
            }
        }

        if ($contact = $xp->query("//div[contains(@class, 'profile-contact')]")->item(0)) {
            foreach ($xp->query('.//p', $contact) as $p) {
                $t = $this->text($p);
                if (preg_match('/^(Mobile|Phone):/i', $t)) {
                    $v = trim(preg_replace('/^(Mobile|Phone):/i', '', $t));
                    if ($v && ! preg_match('/^no\b/i', $v)) {
                        $rec['phone'] = $v;
                    }
                } elseif (preg_match('/^E-?mail:/i', $t)) {
                    $emails = $this->emailsIn($xp, $p);
                    if ($emails) {
                        $rec['email'] = array_shift($emails);
                        $rec['personal_email'] = implode(', ', $emails);
                    }
                }
            }
        }

        $areas = [];
        foreach ($xp->query("//div[contains(@class, 'interestSpanDiv')]//p") as $p) {
            $t = $this->text($p);
            if ($t && ! in_array($t, $areas, true)) {
                $areas[] = $t;
            }
        }
        $rec['areas_of_interest'] = $areas;

        // The theme ships a second, commented-out tab template; DOMDocument
        // skips comments, so the first match is always the live tab.
        foreach (self::TABS as $id => $column) {
            $node = $xp->query("//*[@id='{$id}']")->item(0);
            $rec[$column] = $node ? $this->cleanTabHtml($xp, $node) : null;
        }
    }

    private function cleanTabHtml(DOMXPath $xp, DOMElement $tab): ?string
    {
        // Cloudflare-obfuscated emails -> plain text.
        foreach (iterator_to_array($xp->query('.//*[@data-cfemail]', $tab)) as $el) {
            $el->parentNode->replaceChild($tab->ownerDocument->createTextNode($this->cfDecode($el->getAttribute('data-cfemail'))), $el);
        }
        foreach (iterator_to_array($xp->query('.//script|.//style|.//noscript', $tab)) as $el) {
            $el->parentNode->removeChild($el);
        }
        // Drop presentational attributes so our own table/prose styles apply.
        foreach ($xp->query('.//*[@style or @width or @class or @align or @border or @cellpadding or @cellspacing]', $tab) as $el) {
            foreach (['style', 'width', 'class', 'align', 'border', 'cellpadding', 'cellspacing', 'height'] as $attr) {
                $el->removeAttribute($attr);
            }
        }

        $text = trim(preg_replace('/\s+/u', ' ', str_replace("\u{a0}", ' ', $tab->textContent)));
        if ($text === '' || in_array(strtolower(trim($text, " :.\t")), self::PLACEHOLDERS, true)) {
            return null;
        }

        $html = '';
        foreach ($tab->childNodes as $child) {
            $html .= $tab->ownerDocument->saveHTML($child);
        }
        $html = preg_replace('#<p>(\s|&nbsp;|\x{a0})*</p>#u', '', $html);
        $html = preg_replace("/\n{2,}/", "\n", $html);

        return trim($html) ?: null;
    }

    // ---------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------

    private function load(string $url): ?DOMXPath
    {
        try {
            $res = Http::withUserAgent('Mozilla/5.0 (BAUST website profile sync)')
                ->timeout(30)->retry(3, 1000, throw: false)->get($url);
        } catch (\Throwable $e) {
            $this->warn("  ! {$url}: {$e->getMessage()}");

            return null;
        }
        if (! $res->successful()) {
            $this->warn("  ! {$url}: HTTP {$res->status()}");

            return null;
        }

        $doc = new DOMDocument;
        libxml_use_internal_errors(true);
        $doc->loadHTML('<?xml encoding="utf-8"?>'.$res->body(), LIBXML_NOERROR | LIBXML_NOWARNING);
        libxml_clear_errors();

        return new DOMXPath($doc);
    }

    private function text(?DOMNode $node): string
    {
        if (! $node) {
            return '';
        }

        return trim(preg_replace('/\s+/u', ' ', str_replace("\u{a0}", ' ', html_entity_decode($node->textContent))));
    }

    private function backgroundUrl(string $style): string
    {
        if (! preg_match('/url\((.*?)\)/', $style, $m)) {
            return '';
        }
        $url = trim($m[1], " '\"");

        return Str::contains($url, 'no-profile-pic') ? '' : $url;
    }

    private function emailsIn(DOMXPath $xp, DOMNode $node): array
    {
        $emails = [];
        foreach ($xp->query('.//*[@data-cfemail]', $node) as $el) {
            $emails[] = $this->cfDecode($el->getAttribute('data-cfemail'));
        }
        preg_match_all('/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/', $node->textContent, $m);
        $emails = array_merge($emails, $m[0]);

        return array_values(array_unique(array_filter(array_map('trim', $emails))));
    }

    private function cfDecode(string $hex): string
    {
        if (strlen($hex) < 4) {
            return '';
        }
        $key = hexdec(substr($hex, 0, 2));
        $out = '';
        for ($i = 2; $i < strlen($hex); $i += 2) {
            $out .= chr(hexdec(substr($hex, $i, 2)) ^ $key);
        }

        return trim($out);
    }

    private function splitQualification(string $q): array
    {
        $parts = preg_split('/\s*[;\n]\s*/', $q);

        return array_values(array_filter(array_map('trim', $parts)));
    }
}
