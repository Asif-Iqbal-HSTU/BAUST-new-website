<?php

namespace App\Console\Commands;

use App\Models\DepartmentMember;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class SyncCseFacultyProfiles extends Command
{
    protected $signature = 'cse:sync-faculty-profiles';
    protected $description = 'Sync comprehensive teacher profiles and tabs for CSE department from scraped source data';

    public function handle(): int
    {
        $jsonPath = base_path('database/data/cse_faculty_scraped.json');
        if (!file_exists($jsonPath)) {
            $this->error("Scraped data file not found at: {$jsonPath}");
            return 1;
        }

        $items = json_decode(file_get_contents($jsonPath), true);
        if (!is_array($items)) {
            $this->error("Invalid JSON format in {$jsonPath}");
            return 1;
        }

        $this->info("Loaded " . count($items) . " scraped CSE faculty profiles. Beginning sync...");

        $created = 0;
        $updated = 0;

        foreach ($items as $item) {
            $name = trim($item['name'] ?? '');
            if (!$name) continue;

            $slug = $item['slug'] ?? '';
            $profileUrl = $item['wp_profile_url'] ?? '';

            // Attempt to find existing CSE member
            $member = null;

            if ($profileUrl) {
                $member = DepartmentMember::where('department', 'cse')
                    ->where('wp_profile_url', $profileUrl)
                    ->first();
            }

            if (!$member && $slug) {
                // Try matching by slug on wp_profile_url
                $member = DepartmentMember::where('department', 'cse')
                    ->where('wp_profile_url', 'like', "%/employees/{$slug}%")
                    ->first();
            }

            if (!$member) {
                // Try matching by exact name
                $member = DepartmentMember::where('department', 'cse')
                    ->where('name', $name)
                    ->first();
            }

            if (!$member) {
                // Try matching by cleaned names
                $cleanName = preg_replace('/^(prof\.|dr\.|engr\.|md\.|mr\.|ms\.|mrs\.)\s+/i', '', $name);
                $cleanName = trim($cleanName);

                $candidates = DepartmentMember::where('department', 'cse')->get();
                foreach ($candidates as $cand) {
                    $candClean = preg_replace('/^(prof\.|dr\.|engr\.|md\.|mr\.|ms\.|mrs\.)\s+/i', '', $cand->name);
                    $candClean = trim($candClean);
                    if (strcasecmp($cleanName, $candClean) === 0 || levenshtein(strtolower($cleanName), strtolower($candClean)) <= 3) {
                        $member = $cand;
                        break;
                    }
                }
            }

            $isNew = false;
            if (!$member) {
                $member = new DepartmentMember();
                $member->department = 'cse';
                $isNew = true;
            }

            // Head of Department gets order 1
            $designation = trim($item['designation'] ?? $member->designation ?? 'Lecturer');
            $isHead = Str::contains(strtolower($designation), 'head');

            $order = $isHead ? 1 : (($item['order'] ?? 10) + 1);

            $lowerDes = strtolower($designation);
            $lowerName = strtolower($name);

            $type = 'permanent';
            $status = 'active';

            // Adjunct check (explicitly matches Dr. M. Kaykobad, Dr. Md. Saidur Rahman, Prof. Dr. Md. Mahbubur Rahman, Lt Col Dr. Muhammad Nazrul Islam)
            $adjunctNames = [
                'kaykobad',
                'saidur rahman',
                'mahbubur rahman',
                'nazrul islam'
            ];
            foreach ($adjunctNames as $an) {
                if (Str::contains($lowerName, $an)) {
                    $type = 'adjunct';
                    break;
                }
            }
            if (Str::contains($lowerDes, ['adjunct', 'guest'])) {
                $type = 'adjunct';
            }
            if (($item['type'] ?? '') === 'adjunct') {
                $type = 'adjunct';
            }

            // Study leave check
            $studyLeaveNames = [
                'al-hasan',
                'khalid syfullah',
                'moazzem hossain',
                'hasan muhammad kafi',
                'urmi saha'
            ];
            foreach ($studyLeaveNames as $sln) {
                if (Str::contains($lowerName, $sln)) {
                    $status = 'study_leave';
                    break;
                }
            }
            if (Str::contains($lowerDes, 'study leave') || Str::contains($lowerName, 'study leave')) {
                $status = 'study_leave';
            }

            // Ex-faculty check
            $exFacultyNames = [
                'alifa shanzidah',
                'zahid hassan',
                'nahid anam opu',
                'abu saleh musa',
                'naimur rahman'
            ];
            foreach ($exFacultyNames as $efn) {
                if (Str::contains($lowerName, $efn)) {
                    $status = 'ex_faculty';
                    break;
                }
            }

            // Academic staff check
            if (Str::contains($lowerDes, ['technician', 'operator', 'messenger', 'staff']) || Str::contains($lowerName, 'rahmat khan') || (Str::contains($lowerDes, 'assistant') && !Str::contains($lowerDes, 'professor'))) {
                $type = 'staff';
            }

            // Clean areas of interest: remove brackets, quotes, trim
            $cleanAreas = [];
            $rawAreas = $item['areas_of_interest'] ?? [];
            if (is_string($rawAreas)) {
                $trimmed = trim($rawAreas);
                if (Str::startsWith($trimmed, '[') && Str::endsWith($trimmed, ']')) {
                    $decoded = json_decode($trimmed, true);
                    $rawAreas = is_array($decoded) ? $decoded : explode(',', str_replace(['[', ']', '"', "'"], '', $trimmed));
                } else {
                    $rawAreas = explode(',', $trimmed);
                }
            }
            if (is_array($rawAreas)) {
                foreach ($rawAreas as $a) {
                    $cleaned = trim(str_replace(['[', ']', '"', "'"], '', (string)$a));
                    if ($cleaned && !in_array($cleaned, $cleanAreas)) {
                        $cleanAreas[] = $cleaned;
                    }
                }
            }

            // Determine photo: keep local storage upload if exists, otherwise use scraped photo
            $photo = $member->photo;
            if (!$photo || !Str::startsWith($photo, '/storage/')) {
                if (!empty($item['photo'])) {
                    $photo = $item['photo'];
                }
            }

            $fields = [
                'name' => $name,
                'designation' => $designation,
                'category' => $item['category'] ?? $member->category ?? 'lecturer',
                'type' => $type,
                'status' => $member->status === 'maternity_leave' ? 'maternity_leave' : $status,
                'order' => $order,
                'photo' => $photo,
                'phone' => !empty($item['phone']) ? $item['phone'] : $member->phone,
                'email' => !empty($item['email']) ? $item['email'] : $member->email,
                'personal_email' => !empty($item['personal_email']) ? $item['personal_email'] : $member->personal_email,
                'education' => (!empty($item['education']) && is_array($item['education'])) ? $item['education'] : ($member->education ?? []),
                'specialization' => !empty($cleanAreas) ? implode(', ', array_slice($cleanAreas, 0, 2)) : $member->specialization,
                'areas_of_interest' => $cleanAreas,
                'experience' => !empty($item['experience']) ? $item['experience'] : $member->experience,
                'publications' => !empty($item['publications']) ? $item['publications'] : $member->publications,
                'research' => !empty($item['research']) ? $item['research'] : $member->research,
                'achievements' => !empty($item['achievements']) ? $item['achievements'] : $member->achievements,
                'seminars' => !empty($item['seminars']) ? $item['seminars'] : $member->seminars,
                'training' => !empty($item['training']) ? $item['training'] : $member->training,
                'others' => !empty($item['others']) ? $item['others'] : $member->others,
                'wp_profile_url' => $profileUrl ?: $member->wp_profile_url,
            ];

            $member->fill($fields);
            $member->save();

            if ($isNew) {
                $created++;
                $this->line(" <info>[CREATED]</info> {$name} ({$designation})");
            } else {
                $updated++;
                $this->line(" <comment>[UPDATED]</comment> {$name} ({$designation})");
            }
        }

        $this->info("\nSync finished successfully!");
        $this->info("Total Created: {$created}");
        $this->info("Total Updated: {$updated}");
        $this->info("Total CSE Members now in DB: " . DepartmentMember::where('department', 'cse')->count());

        return 0;
    }
}
