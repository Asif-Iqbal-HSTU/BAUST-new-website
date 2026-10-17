<?php

namespace App\Console\Commands;

use App\Models\Notice;
use Illuminate\Console\Command;

class CleanNoticeCoversAndEmojis extends Command
{
    protected $signature = 'notices:clean-covers-and-emojis';
    protected $description = 'Replace pin icons and emojis in notice content and attachments with authentic images and text emojis';

    public function handle(): int
    {
        $this->info('Starting cleaning of notice attachments and content emojis...');

        $emojiMap = [
            '1f4cc' => '📌',
            '1f4de' => '📞',
            '1f4c5' => '📅',
            '1f4cd' => '📍',
            '23f0'  => '⏰',
            '1f534' => '🔴',
            '1f449' => '👉',
            '1f499' => '💙',
            '1f31f' => '🌟',
            '1f3a4' => '🎤',
            '1f399' => '🎙️',
            '1f539' => '🔹',
            '1f517' => '🔗',
            '1f6a8' => '🚨',
            '1f514' => '🔔',
            '2764'  => '❤️',
            '25aa'  => '▪️',
        ];

        $notices = Notice::all();
        $updatedAttachments = 0;
        $cleanedContents = 0;

        foreach ($notices as $notice) {
            $contentChanged = false;
            $content = $notice->content ?? '';

            // 1. Clean content emojis
            if (!empty($content) && (str_contains($content, 'emoji.php') || str_contains($content, 'static.xx.fbcdn.net'))) {
                // Replace fbcdn emoji img tags with their alt character or emojiMap character
                $content = preg_replace_callback('/<img[^>]+src=[\'"]https?:\/\/[^\'"]*(?:emoji\.php|static\.xx\.fbcdn\.net)[^\'"]*[\'"][^>]*>/i', function ($matches) use ($emojiMap) {
                    $imgTag = $matches[0];
                    if (preg_match('/alt=[\'"]([^\'"]+)[\'"]/i', $imgTag, $altMatches)) {
                        return $altMatches[1];
                    }
                    foreach ($emojiMap as $code => $char) {
                        if (str_contains($imgTag, $code)) {
                            return $char;
                        }
                    }
                    return '';
                }, $content);

                // Clean empty wrapper spans if any
                $content = preg_replace('/<span class="html-span[^"]*">\s*(📌|📞|📅|📍|⏰|🔴|👉|💙|🌟|🎤|🎙️|🔹|🔗|🚨|🔔|❤️|▪️|\S)\s*<\/span>/u', '$1 ', $content);
                $contentChanged = true;
            }

            // 2. Resolve authentic cover photo if attachment is missing or suspicious
            $needsAttachment = empty($notice->attachment) ||
                str_contains($notice->attachment, 'pin') ||
                str_contains($notice->attachment, '1f4') ||
                str_contains($notice->attachment, 'emoji') ||
                str_contains($notice->attachment, 'static.xx.fbcdn.net');

            $newAttachment = $notice->attachment;

            if ($needsAttachment && !empty($content)) {
                // Extract all image tags from content
                if (preg_match_all('/<img[^>]+src=[\'"]([^\'"]+)[\'"]/i', $content, $imgMatches)) {
                    foreach ($imgMatches[1] as $candidate) {
                        $c = strtolower($candidate);
                        // Skip emojis, icons, avatars, and SVGs
                        if (
                            str_contains($c, 'emoji') ||
                            str_contains($c, 'static.xx') ||
                            str_contains($c, '1f4') ||
                            str_contains($c, '1f3') ||
                            str_contains($c, '1f5') ||
                            str_contains($c, 'icon') ||
                            str_contains($c, 'avatar') ||
                            str_contains($c, '16x16') ||
                            str_contains($c, '/16/') ||
                            str_ends_with($c, '.svg')
                        ) {
                            continue;
                        }

                        // Must be a photo extension
                        if (str_contains($c, '.jpg') || str_contains($c, '.jpeg') || str_contains($c, '.png') || str_contains($c, '.webp')) {
                            $newAttachment = $candidate;
                            break;
                        }
                    }
                }
            }

            $updateData = [];
            if ($contentChanged && $content !== $notice->content) {
                $updateData['content'] = $content;
                $cleanedContents++;
            }

            if ($newAttachment !== $notice->attachment && !empty($newAttachment)) {
                $updateData['attachment'] = $newAttachment;
                $updateData['attachment_type'] = 'image';
                $updatedAttachments++;
                $this->line("Notice [{$notice->id}] '{$notice->title}': Updated cover -> {$newAttachment}");
            }

            if (!empty($updateData)) {
                $notice->update($updateData);
            }
        }

        $this->info("Completed! Cleaned content emojis in {$cleanedContents} notices. Updated authentic covers in {$updatedAttachments} notices.");
        return 0;
    }
}
