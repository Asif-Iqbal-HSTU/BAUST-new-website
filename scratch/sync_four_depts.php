<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\DepartmentMember;
use Illuminate\Support\Str;

$jsonFile = __DIR__ . '/four_depts_faculty_scraped.json';
if (!file_exists($jsonFile)) {
    echo "Error: {$jsonFile} not found!\n";
    exit(1);
}

$data = json_decode(file_get_contents($jsonFile), true);
if (!$data) {
    echo "Error decoding JSON!\n";
    exit(1);
}

$cleanName = function($name) {
    $n = preg_replace('/^(prof\.|dr\.|engr\.|md\.|mr\.|ms\.|mrs\.|mst\.|lt\s+col\s+prof\.\s+dr\.|brig\s+gen\s+|air\s+cdre\s+)\s+/i', '', trim($name));
    $n = preg_replace('/,\s*psc$/i', '', $n);
    $n = preg_replace('/\(.*\)/', '', $n);
    return strtolower(trim(preg_replace('/\s+/', ' ', $n)));
};

// First reset ID 56 tabs since it got erroneously updated earlier
$m56 = DepartmentMember::find(56);
if ($m56 && str_contains($m56->name, 'Mobarak')) {
    $m56->update([
        'experience' => null,
        'publications' => null,
        'research' => null,
        'achievements' => null,
        'seminars' => null,
        'training' => null,
        'others' => null,
        'areas_of_interest' => null,
    ]);
    echo "Reset ID 56 (Brig Gen Mobarak) tabs.\n";
}

$report = [];

foreach (['ict', 'eee', 'me', 'ipe'] as $dept) {
    $items = $data[$dept] ?? [];
    echo "\n==============================================\n";
    echo "PROCESSING DEPARTMENT: " . strtoupper($dept) . " (" . count($items) . " members)\n";
    echo "==============================================\n";
    
    $report[$dept] = [];

    foreach ($items as $item) {
        $name = trim($item['name'] ?? '');
        if (!$name) continue;

        $slug = $item['slug'] ?? '';
        $profileUrl = $item['wp_profile_url'] ?? '';

        // 1. Try matching by exact name
        $member = DepartmentMember::where('department', $dept)
            ->where('name', $name)
            ->first();

        // 2. Try matching by slug
        if (!$member && $slug) {
            $member = DepartmentMember::where('department', $dept)
                ->where(function($q) use ($slug) {
                    $q->where('wp_profile_url', 'like', "%/{$slug}/")
                      ->orWhere('wp_profile_url', 'like', "%/{$slug}");
                })
                ->first();
        }

        // 3. Try matching by cleaned normalized name
        if (!$member) {
            $cleaned = $cleanName($name);
            $candidates = DepartmentMember::where('department', $dept)->get();
            foreach ($candidates as $cand) {
                if ($cleanName($cand->name) === $cleaned) {
                    $member = $cand;
                    break;
                }
            }
        }

        // 4. Try matching exact profile URL
        if (!$member && $profileUrl) {
            $member = DepartmentMember::where('department', $dept)
                ->where('wp_profile_url', $profileUrl)
                ->first();
        }

        // List active tabs in scraped data
        $foundTabs = [];
        if (!empty($item['experience'])) $foundTabs[] = 'Experience';
        if (!empty($item['publications'])) $foundTabs[] = 'Publications';
        if (!empty($item['research'])) $foundTabs[] = 'Research';
        if (!empty($item['achievements'])) $foundTabs[] = 'Achievements';
        if (!empty($item['seminars'])) $foundTabs[] = 'Seminars';
        if (!empty($item['training'])) $foundTabs[] = 'Training';
        if (!empty($item['others'])) $foundTabs[] = 'Others';
        if (!empty($item['education'])) $foundTabs[] = 'Education (' . count($item['education']) . ')';
        if (!empty($item['areas_of_interest'])) $foundTabs[] = 'Areas of Interest (' . count($item['areas_of_interest']) . ')';

        $report[$dept][] = [
            'name' => $name,
            'designation' => $item['designation'],
            'tabs' => $foundTabs,
            'matched_id' => $member ? $member->id : null,
            'matched_name' => $member ? $member->name : null,
        ];

        // Prepare updates
        $updateData = [];

        if (!empty($item['experience'])) $updateData['experience'] = $item['experience'];
        if (!empty($item['publications'])) $updateData['publications'] = $item['publications'];
        if (!empty($item['research'])) $updateData['research'] = $item['research'];
        if (!empty($item['achievements'])) $updateData['achievements'] = $item['achievements'];
        if (!empty($item['seminars'])) $updateData['seminars'] = $item['seminars'];
        if (!empty($item['training'])) $updateData['training'] = $item['training'];
        if (!empty($item['others'])) $updateData['others'] = $item['others'];

        if (!empty($item['education'])) $updateData['education'] = $item['education'];
        if (!empty($item['areas_of_interest'])) $updateData['areas_of_interest'] = $item['areas_of_interest'];
        if (!empty($item['specialization'])) $updateData['specialization'] = $item['specialization'];
        if (!empty($item['phone'])) $updateData['phone'] = $item['phone'];
        if (!empty($item['email'])) $updateData['email'] = $item['email'];
        if (!empty($item['personal_email'])) $updateData['personal_email'] = $item['personal_email'];
        if (!empty($item['photo']) && (!$member || empty($member->photo) || str_contains($member->photo, 'ui-avatars'))) {
            $updateData['photo'] = $item['photo'];
        }
        if ($profileUrl && (!$member || empty($member->wp_profile_url))) {
            $updateData['wp_profile_url'] = $profileUrl;
        }
        if ($item['status'] === 'study_leave') {
            $updateData['status'] = 'study_leave';
        }

        if ($member) {
            $member->update($updateData);
            echo "Updated [ID: {$member->id}] {$member->name} (Matched for {$name}) -> " . (count($foundTabs) ? implode(', ', $foundTabs) : 'No tabs') . "\n";
        } else {
            $insertData = array_merge([
                'name' => $name,
                'designation' => $item['designation'],
                'department' => $dept,
                'type' => $item['type'] ?? 'permanent',
                'category' => $item['category'] ?? 'lecturer',
                'status' => $item['status'] ?? 'active',
                'order' => $item['order'] ?? 99,
                'wp_profile_url' => $profileUrl,
                'photo' => $item['photo'] ?? null,
            ], $updateData);

            $newMember = DepartmentMember::create($insertData);
            echo "Created [ID: {$newMember->id}] {$newMember->name} -> " . (count($foundTabs) ? implode(', ', $foundTabs) : 'No tabs') . "\n";
        }
    }
}

file_put_contents(__DIR__ . '/four_depts_sync_report.json', json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
echo "\nSync finished! Report saved to scratch/four_depts_sync_report.json\n";
