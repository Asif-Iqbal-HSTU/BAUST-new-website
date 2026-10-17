<?php

namespace App\Console\Commands;

use App\Models\Notice;
use Illuminate\Console\Command;

class UpdateCeCovers extends Command
{
    protected $signature = 'ce:update-covers';
    protected $description = 'Replace placeholder pin icons and emojis with authentic event cover photos';

    public function handle(): int
    {
        $this->info('Updating CE notice cover images...');

        $coversFile = base_path('scratch/ce_covers_map.json');
        if (!file_exists($coversFile)) {
            $this->error('scratch/ce_covers_map.json not found!');
            return 1;
        }

        $covers = json_decode(file_get_contents($coversFile), true);
        $notices = Notice::where('department', 'ce')->get();

        $updatedCount = 0;
        $clearedCount = 0;

        foreach ($notices as $notice) {
            $cover = $covers[$notice->slug] ?? null;
            if (!$cover) {
                // Try without 'ce-' prefix or with 'ce-' prefix
                $altSlug = str_starts_with($notice->slug, 'ce-')
                    ? substr($notice->slug, 3)
                    : 'ce-' . $notice->slug;
                $cover = $covers[$altSlug] ?? null;
            }

            if ($cover) {
                $notice->update([
                    'attachment' => $cover,
                    'attachment_type' => 'image',
                ]);
                $updatedCount++;
            } else {
                // If the current attachment is an emoji or pin icon, clear it
                if ($notice->attachment && (
                    str_contains($notice->attachment, 'emoji') ||
                    str_contains($notice->attachment, 'static.xx.fbcdn.net') ||
                    str_contains($notice->attachment, '1f4')
                )) {
                    $notice->update([
                        'attachment' => null,
                        'attachment_type' => null,
                    ]);
                    $clearedCount++;
                }
            }
        }

        $this->info("Updated {$updatedCount} notice covers with authentic photos.");
        $this->info("Cleared {$clearedCount} pin/emoji placeholder attachments.");
        return 0;
    }
}
