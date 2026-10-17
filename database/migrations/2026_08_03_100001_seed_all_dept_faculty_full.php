<?php

use App\Models\DepartmentMember;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Str;

/**
 * Re-seed DBA, AIS, English (eng) and A&S (as) faculty from the freshly
 * scraped source roster, now including phone numbers, email and educational
 * qualifications. Idempotent: updates existing rows by (department, name),
 * inserts new ones, and prunes any member no longer present at the source.
 */
return new class extends Migration
{
    public function up(): void
    {
        $path = base_path('database/data/dept_faculty.json');
        if (! is_file($path)) {
            return;
        }

        $staffWords = [
            'office assistant', 'office attendant', 'computer operator', 'messenger', 'peon',
            'lab assistant', 'lab technician', 'lab technologist', 'lab attendant',
            'accountant', 'store keeper', 'storekeeper', 'steno', 'attendant',
            'cleaner', 'driver', 'runner', 'officer',
        ];

        foreach (json_decode(file_get_contents($path), true) as $dept => $members) {
            $keep = [];
            $order = 1;

            foreach ($members as $m) {
                $keep[] = $m['name'];
                $d = Str::lower($m['designation'] ?? '');

                $isStaff = false;
                foreach ($staffWords as $w) {
                    if (str_contains($d, $w)) {
                        $isStaff = true;
                        break;
                    }
                }

                if ($isStaff) {
                    $type = 'staff';
                    $category = 'staff';
                } else {
                    $type = str_contains($d, 'adjunct') ? 'adjunct' : 'permanent';
                    if (str_contains($d, 'associate professor')) {
                        $category = 'associate_professor';
                    } elseif (str_contains($d, 'assistant professor')) {
                        $category = 'assistant_professor';
                    } elseif (str_contains($d, 'professor')) {
                        $category = 'professor';
                    } elseif (str_contains($d, 'lecturer')) {
                        $category = 'lecturer';
                    } else {
                        $category = null;
                    }
                }

                $status = (str_contains($d, 'study leave') || str_contains($d, 'study-leave')) ? 'study_leave' : 'active';

                DepartmentMember::updateOrCreate(
                    ['department' => $dept, 'name' => $m['name']],
                    [
                        'designation' => $m['designation'] ?? null,
                        'photo' => $m['photo'] ?? null,
                        'email' => $m['email'] ?? null,
                        'phone' => $m['phone'] ?? null,
                        'education' => $m['education'] ?? [],
                        'type' => $type,
                        'status' => $status,
                        'category' => $category,
                        'order' => $order++,
                    ]
                );
            }

            // Prune members that no longer exist at the source.
            DepartmentMember::where('department', $dept)
                ->whereNotIn('name', $keep)
                ->delete();
        }
    }

    public function down(): void
    {
        // Data migration; roster is left in place on rollback.
    }
};
