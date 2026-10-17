<?php

namespace App\Console\Commands;

use App\Models\Notice;
use App\Models\NoticeCategory;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class ImportNotices extends Command
{
    protected $signature = 'notices:import {file=database/data/notices.json}';
    protected $description = 'Import scraped baust.edu.bd notices (categories, dates, attachments) into the database';

    /** Category slug => [name, color, icon, order] */
    private array $catMeta = [
        'notice' => ['Notice', '#059669', 'bell', 1],
        'admission-notice' => ['Admission Notice', '#2563eb', 'user-plus', 2],
        'exam-notice' => ['Exam Notice', '#dc2626', 'file-text', 3],
        'job-notice' => ['Job Notice', '#7c3aed', 'briefcase', 4],
        'tender-notice' => ['Tender Notice', '#ea580c', 'gavel', 5],
        'news-events' => ['News & Events', '#0891b2', 'newspaper', 6],
        'upcoming-events' => ['Upcoming Events', '#16a34a', 'calendar', 7],
        'achievements' => ['Achievements', '#ca8a04', 'award', 8],
        'conference-workshops' => ['Conferences & Workshops', '#4f46e5', 'presentation', 9],
        'bot-meeting' => ['Board of Trustees Meeting', '#64748b', 'users', 10],
        'syndicate-meeting' => ['Syndicate Meeting', '#0d9488', 'users', 11],
        'finance-committee-meeting' => ['Finance Committee Meeting', '#9333ea', 'users', 12],
        'academic-council-meeting' => ['Academic Council Meeting', '#be185d', 'users', 13],
        'disciplinary-committee-meeting' => ['Disciplinary Committee Meeting', '#e11d48', 'shield', 14],
    ];

    public function handle(): int
    {
        $path = $this->argument('file');
        if (! str_starts_with($path, '/')) {
            $path = base_path($path);
        }
        if (! is_file($path)) {
            $this->error("File not found: {$path}");
            return self::FAILURE;
        }
        $rows = json_decode(file_get_contents($path), true);
        if (! is_array($rows)) {
            $this->error('Invalid JSON.');
            return self::FAILURE;
        }

        // Ensure categories exist
        $catIds = [];
        foreach ($this->catMeta as $slug => [$name, $color, $icon, $order]) {
            $cat = NoticeCategory::updateOrCreate(
                ['slug' => $slug],
                ['name' => $name, 'color' => $color, 'icon' => $icon, 'order' => $order]
            );
            $catIds[$slug] = $cat->id;
        }

        // Map wp_id => committed filename in public/storage/notices (files are
        // named "<wp_id>..." so we resolve attachments from what is on disk).
        $noticesDir = public_path('storage/notices');
        $fileByWpId = [];
        if (is_dir($noticesDir)) {
            foreach (scandir($noticesDir) as $fn) {
                if (preg_match('/^(\d+)/', $fn, $mm)) {
                    $fileByWpId[$mm[1]] ??= $fn;
                }
            }
        }
        $imgExt = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

        $created = 0; $updated = 0; $withAtt = 0;
        foreach ($rows as $r) {
            if (empty($r['title'])) {
                continue;
            }
            $slug = Str::slug($r['title']);
            if ($slug === '') {
                $slug = 'notice-'.($r['wp_id'] ?? Str::random(6));
            }

            $attachment = null; $attType = null;
            $file = $fileByWpId[(string) ($r['wp_id'] ?? '')] ?? null;
            if ($file) {
                $attachment = '/storage/notices/'.$file;
                $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                $attType = in_array($ext, $imgExt, true) ? 'image' : $ext;
            } elseif (! empty($r['attachment_url'])) {
                $attachment = $r['attachment_url'];
                $attType = $r['attachment_type'] ?? 'url';
            }

            $publishedAt = null;
            if (! empty($r['published_at'])) {
                try { $publishedAt = Carbon::parse($r['published_at']); } catch (\Throwable) {}
            }

            // Idempotent on original_url (unique per notice)
            $notice = Notice::where('original_url', $r['url'])->first();
            $payload = [
                'wp_id' => $r['wp_id'] ?? null,
                'title' => $r['title'],
                'slug' => $notice ? $notice->slug : $this->uniqueSlug($slug),
                'attachment' => $attachment,
                'attachment_type' => $attType,
                'original_url' => $r['url'] ?? null,
                'author' => 'BAUST',
                'is_active' => true,
                'published_at' => $publishedAt,
            ];
            if ($notice) {
                $notice->update($payload);
                $updated++;
            } else {
                $notice = Notice::create($payload);
                $created++;
            }
            if ($attachment) {
                $withAtt++;
            }

            $ids = collect($r['cats'] ?? [])->map(fn ($c) => $catIds[$c] ?? null)->filter()->values()->all();
            $notice->categories()->sync($ids);
        }

        // Refresh post_count per category
        foreach (NoticeCategory::all() as $cat) {
            $cat->update(['post_count' => $cat->notices()->count()]);
        }

        $this->info("Imported. created={$created} updated={$updated} with_attachment={$withAtt} categories=".count($catIds));
        return self::SUCCESS;
    }

    private function uniqueSlug(string $slug): string
    {
        $base = $slug; $i = 1;
        while (Notice::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$i++;
        }
        return $slug;
    }
}
