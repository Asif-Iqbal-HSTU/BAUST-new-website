<?php

use App\Models\DepartmentMember;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        $members = [
            ['Iqramul Islam', 'Lecturer', 'permanent', '/images/departments/cse/faculty/iqramul-islam.jpeg'],
            ['Khandker Moniruzzaman', 'Lecturer', 'permanent', '/images/departments/cse/faculty/khandker-moniruzzaman.jpeg'],
            ['Gourab Chandra Biswas', 'Lecturer', 'permanent', '/images/departments/cse/faculty/gourab-chandra-biswas.jpeg'],
            ['MD. Rabby Hossain', 'Lecturer', 'permanent', '/images/departments/cse/faculty/md-rabby-hossain.jpeg'],
            ['Naimur Rahman', 'Lecturer (Contractual)', 'adjunct', '/images/departments/cse/faculty/naimur-rahman.jpeg'],
        ];

        $order = 200;
        foreach ($members as [$name, $designation, $type, $photo]) {
            DepartmentMember::updateOrCreate(
                ['department' => 'cse', 'name' => $name],
                [
                    'designation' => $designation,
                    'photo' => $photo,
                    'education' => [],
                    'type' => $type,
                    'status' => 'active',
                    'category' => 'lecturer',
                    'order' => $order++,
                ]
            );
        }
    }

    public function down(): void
    {
        DepartmentMember::where('department', 'cse')->whereIn('name', [
            'Iqramul Islam', 'Khandker Moniruzzaman', 'Gourab Chandra Biswas', 'MD. Rabby Hossain', 'Naimur Rahman',
        ])->delete();
    }
};
