<?php

namespace App\Console\Commands;

use App\Models\Notice;
use App\Models\NoticeCategory;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class ImportDepartmentNotices extends Command
{
    protected $signature = 'notices:import-departments {file=database/data/department_notices.json}';
    protected $description = 'Import department-wise notices scraped from the BAUST department subsites';

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
        $rows = json_decode(file_get_contents($path), true) ?: [];

        // Categories already seeded by notices:import; ensure the two used here exist.
        $catId = [];
        foreach ([['notice', 'Notice', '#059669', 1], ['news-events', 'News & Events', '#0891b2', 6]] as [$slug, $name, $color, $order]) {
            $catId[$slug] = NoticeCategory::firstOrCreate(['slug' => $slug], ['name' => $name, 'color' => $color, 'order' => $order])->id;
        }

        $imgExt = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        $created = 0; $updated = 0; $withAtt = 0;
        foreach ($rows as $r) {
            if (empty($r['title']) || empty($r['dept'])) {
                continue;
            }

            // Prefer the resolved, self-hosted attachment path (content-deduped
            // against the main notices); fall back to the source URL if absent.
            $attachment = null; $attType = null;
            $src = $r['attachment'] ?? $r['attachment_url'] ?? null;
            if (! empty($src)) {
                $attachment = $src;
                $ext = strtolower(pathinfo(parse_url($src, PHP_URL_PATH) ?? $src, PATHINFO_EXTENSION));
                $attType = in_array($ext, $imgExt, true) ? 'image' : ($ext ?: 'url');
                $withAtt++;
            }

            $publishedAt = null;
            if (! empty($r['published_at'])) {
                try { $publishedAt = Carbon::parse($r['published_at']); } catch (\Throwable) {}
            }

            $notice = Notice::where('original_url', $r['url'])->first();
            $payload = [
                'wp_id' => $r['wp_id'] ?? null,
                'title' => $r['title'],
                'slug' => $notice ? $notice->slug : $this->uniqueSlug($r, $r['dept']),
                'attachment' => $attachment,
                'attachment_type' => $attType,
                'original_url' => $r['url'] ?? null,
                'author' => 'BAUST',
                'department' => $r['dept'],
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

            $ids = collect($r['cats'] ?? ['notice'])->map(fn ($c) => $catId[$c] ?? null)->filter()->values()->all();
            $notice->categories()->sync($ids);
        }

        foreach (NoticeCategory::all() as $cat) {
            $cat->update(['post_count' => $cat->notices()->count()]);
        }

        $this->info("Department notices imported. created={$created} updated={$updated} with_attachment={$withAtt}");
        return self::SUCCESS;
    }

    private function uniqueSlug(array $r, string $dept): string
    {
        $slug = Str::slug($r['title']);
        if ($slug === '') {
            $slug = $dept.'-notice-'.($r['wp_id'] ?? Str::random(6));
        }
        $base = $slug; $i = 1;
        while (Notice::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$i++;
        }
        return $slug;
    }
}
