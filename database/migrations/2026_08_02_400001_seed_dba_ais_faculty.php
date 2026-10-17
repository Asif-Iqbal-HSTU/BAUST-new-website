<?php

use App\Models\DepartmentMember;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        $path = base_path('database/data/dba_ais_faculty.json');
        if (! is_file($path)) {
            return;
        }
        $staffWords = ['office assistant', 'computer operator', 'messenger', 'peon', 'lab assistant', 'lab technician', 'accountant', 'store', 'steno', 'secretary', 'attendant', 'cleaner', 'driver', 'runner'];

        foreach (json_decode(file_get_contents($path), true) as $dept => $members) {
            $order = 1;
            foreach ($members as $m) {
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

                DepartmentMember::updateOrCreate(
                    ['department' => $dept, 'name' => $m['name']],
                    [
                        'designation' => $m['designation'] ?? null,
                        'photo' => $m['photo'] ?? null,
                        'email' => $m['email'] ?? null,
                        'education' => $m['education'] ?? [],
                        'type' => $type,
                        'status' => 'active',
                        'category' => $category,
                        'order' => $order++,
                    ]
                );
            }
        }
    }

    public function down(): void
    {
        // Keep the originally-seeded department heads; remove only the rest is
        // non-trivial, so this down() intentionally leaves the roster in place.
    }
};
