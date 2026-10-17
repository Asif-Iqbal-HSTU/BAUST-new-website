<?php

namespace App\Console\Commands;

use App\Models\Notice;
use App\Models\NoticeCategory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImportWordPressNotices extends Command
{
    protected $signature = 'wp:import-notices
                            {--fresh : Delete all existing imported data before importing}
                            {--skip-media : Skip downloading media attachments}
                            {--limit= : Limit the number of posts to import (for testing)}
                            {--department= : Import only a specific department (cse, eee, etc.)}';

    protected $description = 'Import notices from the WordPress site (baust.edu.bd) via REST API';

    private string $baseUrl = 'https://www.baust.edu.bd/wp-json/wp/v2';

    // List of department sites to import from
    private array $departments = [
        'general'    => 'https://www.baust.edu.bd/wp-json/wp/v2',
        'cse'        => 'https://www.baust.edu.bd/cse/wp-json/wp/v2',
        'eee'        => 'https://www.baust.edu.bd/eee/wp-json/wp/v2',
        'me'         => 'https://www.baust.edu.bd/me/wp-json/wp/v2',
        'ce'         => 'https://www.baust.edu.bd/ce/wp-json/wp/v2',
        'ipe'        => 'https://www.baust.edu.bd/ipe/wp-json/wp/v2',
        'ict'        => 'https://www.baust.edu.bd/ict/wp-json/wp/v2',
        'dba'        => 'https://www.baust.edu.bd/dba/wp-json/wp/v2',
        'mba'        => 'https://www.baust.edu.bd/mba/wp-json/wp/v2',
        'ais'        => 'https://www.baust.edu.bd/ais/wp-json/wp/v2',
        'as'         => 'https://www.baust.edu.bd/as/wp-json/wp/v2',
        'english'    => 'https://www.baust.edu.bd/english/wp-json/wp/v2',
        'coe'        => 'https://www.baust.edu.bd/coe/wp-json/wp/v2',
        'iqac'       => 'https://www.baust.edu.bd/iqac/wp-json/wp/v2',
        'journal'    => 'https://www.baust.edu.bd/journal/wp-json/wp/v2',
        'conference' => 'https://www.baust.edu.bd/conference/wp-json/wp/v2',
    ];

    // Category color mapping for UI badges
    private array $categoryColors = [
        'notice' => '#059669',          // emerald
        'top-scroll-notice' => '#dc2626', // red
        'hot-notice' => '#dc2626',      // red (CSE slug for top scroll)
        'exam-notice' => '#2563eb',     // blue
        'job-notice' => '#7c3aed',      // purple
        'tender-notice' => '#d97706',   // amber
        'admission-notice' => '#0891b2',// cyan
        'news-events' => '#4f46e5',     // indigo
        'upcoming-events' => '#e11d48', // rose
        'achievements' => '#16a34a',    // green
        'conference-workshops' => '#9333ea', // violet
        'home-university-highlights' => '#ea580c', // orange
        'academic-council-meeting' => '#64748b', // slate
        'syndicate-meeting' => '#64748b',
        'finance-committee-meeting' => '#64748b',
        'bot-meeting' => '#64748b',
        'research' => '#0d9488',        // teal
    ];

    public function handle(): int
    {
        $this->info('🚀 Starting WordPress Notice Import from baust.edu.bd');
        $this->newLine();

        if ($this->option('fresh')) {
            $this->warn('🗑️  Clearing existing imported data...');
            Notice::whereNotNull('wp_id')->delete();
            NoticeCategory::whereNotNull('wp_id')->delete();
            $this->info('   Done.');
            $this->newLine();
        }

        $targetDept = $this->option('department');
        $deptsToProcess = $targetDept ? [$targetDept => $this->departments[$targetDept] ?? null] : $this->departments;

        foreach ($deptsToProcess as $dept => $apiUrl) {
            if (!$apiUrl) {
                $this->error("   Unknown department: {$dept}");
                continue;
            }

            $this->info("📍 Processing Department: " . strtoupper($dept));

            // Step 1: Import Categories for this site
            $categoryMap = $this->importCategories($apiUrl);

            // Step 2: Import Posts for this site
            $this->importPosts($apiUrl, $dept, $categoryMap);
            
            $this->newLine();
        }

        $this->newLine();
        $this->info('✅ Import complete!');
        $this->table(
            ['Metric', 'Count'],
            [
                ['Categories', NoticeCategory::whereNotNull('wp_id')->count()],
                ['Notices', Notice::whereNotNull('wp_id')->count()],
                ['Pinned (Top Scroll)', Notice::whereNotNull('wp_id')->where('is_pinned', true)->count()],
                ['With Attachments', Notice::whereNotNull('wp_id')->whereNotNull('attachment')->count()],
            ]
        );

        return Command::SUCCESS;
    }

    private function importCategories(string $apiUrl): array
    {
        $this->info('   📂 Syncing categories...');
        $categoryMap = [];

        try {
            $response = Http::withoutVerifying()->timeout(30)->get("{$apiUrl}/categories", [
                'per_page' => 100,
            ]);

            if (!$response->successful()) {
                $this->error('      Failed to fetch categories: ' . $response->status());
                return [];
            }

            $categories = $response->json();

            foreach ($categories as $cat) {
                $slug = $cat['slug'];

                // We unify categories by slug across all sites
                $localCategory = NoticeCategory::updateOrCreate(
                    ['slug' => $slug],
                    [
                        'name' => html_entity_decode($cat['name'], ENT_QUOTES, 'UTF-8'),
                        'description' => $cat['description'] ?? null,
                        'color' => $this->categoryColors[$slug] ?? '#6b7280',
                        'order' => $this->getCategoryOrder($slug),
                    ]
                );

                // Map WP category ID to our local ID for this specific site run
                $categoryMap[$cat['id']] = $localCategory->id;
            }

            $this->info("      Synced " . count($categories) . " categories.");
        } catch (\Exception $e) {
            $this->error("      Error syncing categories: " . $e->getMessage());
        }

        return $categoryMap;
    }

    private function importPosts(string $apiUrl, string $department, array $categoryMap): void
    {
        $this->info('   📝 Importing notices...');

        $page = 1;
        $perPage = 100;
        $totalImported = 0;
        $limit = $this->option('limit') ? (int) $this->option('limit') : null;

        try {
            // First request to get total count
            $response = Http::withoutVerifying()->timeout(30)->get("{$apiUrl}/posts", [
                'per_page' => $perPage,
                'page' => 1,
                '_fields' => 'id,title,content,excerpt,date,slug,link,categories,featured_media,author',
            ]);

            if (!$response->successful()) {
                $this->error('      Failed to fetch posts: ' . $response->status());
                return;
            }

            $totalPosts = (int) $response->header('X-WP-Total', 0);
            $totalPages = (int) $response->header('X-WP-TotalPages', 1);

            if ($limit) {
                $totalPosts = min($totalPosts, $limit);
            }

            $this->info("      Found {$totalPosts} total posts across {$totalPages} pages.");
            $bar = $this->output->createProgressBar($totalPosts);
            $bar->start();

            // Process first page
            $posts = $response->json();
            if (is_array($posts)) {
                $totalImported += $this->processPosts($posts, $bar, $limit, $totalImported, $apiUrl, $department, $categoryMap);
            }

            // Process remaining pages
            for ($page = 2; $page <= $totalPages; $page++) {
                if ($limit && $totalImported >= $limit) break;

                sleep(1); // Be polite

                $response = Http::withoutVerifying()->timeout(30)->get("{$apiUrl}/posts", [
                    'per_page' => $perPage,
                    'page' => $page,
                    '_fields' => 'id,title,content,excerpt,date,slug,link,categories,featured_media,author',
                ]);

                if (!$response->successful()) {
                    $this->warn("      Warning: Failed to fetch page {$page}, skipping...");
                    continue;
                }

                $posts = $response->json();
                if (is_array($posts)) {
                    $totalImported += $this->processPosts($posts, $bar, $limit, $totalImported, $apiUrl, $department, $categoryMap);
                }
            }

            $bar->finish();
            $this->newLine();
            $this->info("      Imported {$totalImported} notices for " . strtoupper($department));
        } catch (\Exception $e) {
            $this->error("      Error importing posts: " . $e->getMessage());
        }
    }

    private function processPosts(array $posts, $bar, ?int $limit, int $alreadyImported, string $apiUrl, string $department, array $categoryMap): int
    {
        $count = 0;
        $deptVal = $department === 'general' ? null : $department;

        foreach ($posts as $post) {
            if ($limit && ($alreadyImported + $count) >= $limit) break;

            $title = html_entity_decode($post['title']['rendered'] ?? '', ENT_QUOTES, 'UTF-8');
            $content = $post['content']['rendered'] ?? '';
            $excerpt = $post['excerpt']['rendered'] ?? '';
            $wpCategories = $post['categories'] ?? [];

            // Check if this is a "Top Scroll Notice" (category ID 9 in main site, 30 in CSE)
            // We'll check if any of the categories map to the local 'top-scroll-notice' or 'hot-notice' slug
            $isPinned = false;
            foreach ($wpCategories as $wpCatId) {
                $localCatId = $categoryMap[$wpCatId] ?? null;
                if ($localCatId) {
                    $slug = NoticeCategory::find($localCatId)->slug ?? '';
                    if (in_array($slug, ['top-scroll-notice', 'hot-notice'])) {
                        $isPinned = true;
                        break;
                    }
                }
            }

            // Ensure unique slug
            $slug = $post['slug'];
            $existingNotice = Notice::where('wp_id', $post['id'])->where('department', $deptVal)->first();

            if (!$existingNotice) {
                // Check for slug collision globally
                $baseSlug = $slug;
                $suffix = 1;
                while (Notice::where('slug', $slug)->exists()) {
                    $slug = $baseSlug . '-' . $suffix++;
                }
            }

            $notice = Notice::updateOrCreate(
                ['wp_id' => $post['id'], 'department' => $deptVal],
                [
                    'title' => $title,
                    'slug' => $slug,
                    'content' => !empty(trim(strip_tags($content))) ? $content : null,
                    'excerpt' => !empty(trim(strip_tags($excerpt))) ? strip_tags($excerpt) : null,
                    'original_url' => $post['link'] ?? null,
                    'is_pinned' => $isPinned,
                    'published_at' => $post['date'] ?? now(),
                ]
            );

            // Sync categories via pivot
            $localCategoryIds = [];
            foreach ($wpCategories as $wpCatId) {
                if (isset($categoryMap[$wpCatId])) {
                    $localCategoryIds[] = $categoryMap[$wpCatId];
                }
            }
            $notice->categories()->sync($localCategoryIds);

            // 1. Try to get media from featured_media
            if (!$this->option('skip-media') && ($post['featured_media'] ?? 0) > 0) {
                $this->downloadMedia($notice, $post['featured_media'], $apiUrl, $department);
            }

            // 2. If no attachment yet, scan content for PDF links
            if (!$this->option('skip-media') && !$notice->attachment) {
                $this->extractAndDownloadPdfFromContent($notice, $content, $department);
            }

            // 3. Last resort: check for any media attached to this post (media?parent=POST_ID)
            if (!$this->option('skip-media') && !$notice->attachment) {
                $this->downloadFirstMediaAttachment($notice, $post['id'], $apiUrl, $department);
            }

            $count++;
            $bar->advance();
        }

        return $count;
    }

    /**
     * Finds any media attached to the specific post ID (parent) and downloads the first PDF/file found.
     */
    private function downloadFirstMediaAttachment(Notice $notice, int $postId, string $apiUrl, string $department): void
    {
        try {
            $response = Http::withoutVerifying()->timeout(15)->get("{$apiUrl}/media", [
                'parent' => $postId,
                'per_page' => 1,
                '_fields' => 'id,source_url,mime_type',
            ]);

            if ($response->successful() && !empty($response->json())) {
                $media = $response->json()[0]; // Take the first attached file
                $sourceUrl = $media['source_url'] ?? null;
                $mimeType = $media['mime_type'] ?? '';

                if ($sourceUrl) {
                    $attachmentType = Str::contains($mimeType, 'pdf') ? 'pdf' : (Str::contains($mimeType, 'image') ? 'image' : 'file');
                    
                    $extension = pathinfo(parse_url($sourceUrl, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'pdf';
                    $filename = "notices/{$department}/{$notice->wp_id}_{$notice->slug}.{$extension}";

                    $fileResponse = Http::withoutVerifying()->timeout(60)->get($sourceUrl);
                    if ($fileResponse->successful()) {
                        Storage::disk('public')->put($filename, $fileResponse->body());
                        $notice->update(['attachment' => "/storage/{$filename}", 'attachment_type' => $attachmentType]);
                    }
                }
            }
        } catch (\Exception $e) { }
    }

    /**
     * Scans HTML content for PDF links and downloads the first one found.
     */
    private function extractAndDownloadPdfFromContent(Notice $notice, string $content, string $department): void
    {
        // Regex to find PDF links from the BAUST uploads directory
        $pattern = '/https?:\/\/www\.baust\.edu\.bd\/[^\s"\'>]+\.pdf/i';
        
        if (preg_match($pattern, $content, $matches)) {
            $sourceUrl = $matches[0];
            
            try {
                $extension = 'pdf';
                $filename = "notices/{$department}/{$notice->wp_id}_{$notice->slug}.{$extension}";

                // Download the file
                $fileResponse = Http::withoutVerifying()->timeout(60)->get($sourceUrl);
                if ($fileResponse->successful()) {
                    Storage::disk('public')->put($filename, $fileResponse->body());

                    $notice->update([
                        'attachment' => "/storage/{$filename}",
                        'attachment_type' => 'pdf',
                    ]);
                }
            } catch (\Exception $e) {
                // Skip failed downloads
            }
        }
    }

    private function downloadMedia(Notice $notice, int $mediaId, string $apiUrl, string $department): void
    {
        try {
            $response = Http::withoutVerifying()->timeout(15)->get("{$apiUrl}/media/{$mediaId}", [
                '_fields' => 'id,source_url,mime_type,media_details',
            ]);

            if (!$response->successful()) return;

            $media = $response->json();
            $sourceUrl = $media['source_url'] ?? null;
            $mimeType = $media['mime_type'] ?? '';

            if (!$sourceUrl) return;

            // Determine attachment type
            $attachmentType = 'file';
            if (Str::contains($mimeType, 'pdf')) {
                $attachmentType = 'pdf';
            } elseif (Str::contains($mimeType, 'image')) {
                $attachmentType = 'image';
            }

            // Build local filename
            $extension = pathinfo(parse_url($sourceUrl, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'pdf';
            $filename = "notices/{$department}/{$notice->wp_id}_{$notice->slug}.{$extension}";

            // Download the file
            $fileResponse = Http::withoutVerifying()->timeout(60)->get($sourceUrl);
            if ($fileResponse->successful()) {
                Storage::disk('public')->put($filename, $fileResponse->body());

                $notice->update([
                    'attachment' => "/storage/{$filename}",
                    'attachment_type' => $attachmentType,
                ]);
            }
        } catch (\Exception $e) {
            // Silently skip failed media downloads
        }
    }

    private function getCategoryOrder(string $slug): int
    {
        $order = [
            'top-scroll-notice' => 1,
            'notice' => 2,
            'exam-notice' => 3,
            'admission-notice' => 4,
            'job-notice' => 5,
            'tender-notice' => 6,
            'news-events' => 7,
            'upcoming-events' => 8,
            'home-university-highlights' => 9,
            'achievements' => 10,
            'conference-workshops' => 11,
            'research' => 12,
            'academic-council-meeting' => 13,
            'syndicate-meeting' => 14,
            'finance-committee-meeting' => 15,
            'bot-meeting' => 16,
            'disciplinary-committee-meeting' => 17,
        ];

        return $order[$slug] ?? 99;
    }
}
