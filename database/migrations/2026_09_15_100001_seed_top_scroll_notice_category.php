<?php

use App\Models\Notice;
use App\Models\NoticeCategory;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Create or update the Top Scroll Notice category
        $category = NoticeCategory::updateOrCreate(
            ['slug' => 'top-scroll-notice'],
            [
                'name' => 'Top Scroll Notice',
                'description' => 'Notices displayed in the top scrolling ticker on the website',
                'color' => '#dc2626',
                'icon' => 'bell',
                'order' => 0,
            ]
        );

        // 2. Identify top scroll notices from WP Category 9 and any pinned notices
        $wpCategory9Ids = [
            16439, 16436, 16428, 16425, 16420, 16406, 16402, 16398, 16390, 16385,
            16364, 16361, 16352, 16341, 16338, 16323, 16313, 16309, 16306, 16303,
            16299, 16296, 16293, 16287, 16281, 16268, 16264, 16256, 16250, 16243,
            16240, 16231, 16228, 16221, 16218, 16214, 16206, 16201, 16192, 16182,
            16110, 16092, 16089, 16083, 16079, 16074, 16069, 16064, 16030, 16024,
            16017, 16007, 16002, 15997, 15987, 15984, 15920, 15916, 15911, 15900,
            15897, 15890, 15884, 15881, 15876, 15870, 15866, 15863, 15859, 15856,
            15849, 15846, 15843, 15833, 15827, 15817, 15803, 15800, 15786, 15783,
            15772, 15766, 15756, 15751, 15748, 15740, 15737, 15729, 15726, 15713,
            15688, 15685, 15669, 15661, 15658, 15653, 15632, 15629, 15549, 14790,
        ];

        // Find notices in DB matching WP Category 9 IDs or marked as pinned
        $noticeIds = Notice::whereIn('wp_id', $wpCategory9Ids)
            ->orWhere('is_pinned', true)
            ->pluck('id')
            ->all();

        // 3. Attach notices to the category
        if (! empty($noticeIds)) {
            $category->notices()->syncWithoutDetaching($noticeIds);
        }

        // 4. Update the category post_count
        $category->update([
            'post_count' => $category->notices()->count(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $category = NoticeCategory::where('slug', 'top-scroll-notice')->first();
        if ($category) {
            $category->notices()->detach();
            $category->delete();
        }
    }
};
