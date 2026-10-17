<?php

use App\Models\Notice;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Clean the 25 CSE notices containing legacy WordPress pdfjs viewer markup
        $cseNotices = Notice::where('content', 'like', '%baust.edu.bd%')->get();
        foreach ($cseNotices as $notice) {
            if ($notice->attachment) {
                // Replace all baust.edu.bd viewer urls with the local attachment
                $cleanContent = '<div class="articleContent"><div class="pdfjs-fullscreen"><a aria-label="Open PDF in fullscreen mode" href="' . e($notice->attachment) . '" target="_blank">View Document</a></div></div>';
                $notice->update(['content' => $cleanContent]);
            } else {
                // Remove the external links
                $cleanContent = preg_replace('/href=[\'"][^\'"]*baust\.edu\.bd[^\'"]*[\'"]/i', 'href="#"', $notice->content);
                $notice->update(['content' => $cleanContent]);
            }
        }

        // 2. Download and localize the 5 external general notice attachments
        $remoteNotices = Notice::where('attachment', 'like', '%baust.edu.bd%')->get();
        foreach ($remoteNotices as $notice) {
            $url = $notice->attachment;
            try {
                $ctx = stream_context_create([
                    'http' => [
                        'timeout' => 10,
                        'header' => 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                    ],
                    'ssl' => [
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                    ],
                ]);
                $fileData = @file_get_contents($url, false, $ctx);
                if ($fileData && strlen($fileData) > 500) {
                    $ext = pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'pdf';
                    $filename = 'notices/' . $notice->id . '_' . Str::slug(Str::limit($notice->title, 40)) . '.' . $ext;
                    Storage::disk('public')->put($filename, $fileData);
                    $notice->update([
                        'attachment' => '/storage/' . $filename,
                        'attachment_type' => $ext,
                    ]);
                }
            } catch (\Throwable $e) {
                // Ignore download failure
            }
        }
    }

    public function down(): void
    {
        // Safe no-op
    }
};
