<?php

use App\Models\DepartmentMember;

test('teaching assistants are listed with faculty members, not academic staff', function () {
    foreach (['cse' => ['/cse/faculty', '/cse/academic-staff'], 'dba' => ['/dba/faculty', '/dba/academic-staff']] as $dept => [$facultyUrl, $staffUrl]) {
        // Filed as staff on purpose: the Teaching Assistant rank alone decides the listing.
        $ta = DepartmentMember::create([
            'department' => $dept, 'name' => "TA of {$dept}", 'designation' => 'Teaching Assistant',
            'category' => 'teaching_assistant', 'employment_type' => 'staff', 'type' => 'permanent',
            'status' => 'active', 'order' => 1, 'education' => [],
        ]);
        $officer = DepartmentMember::create([
            'department' => $dept, 'name' => "Officer of {$dept}", 'designation' => 'Academic Officer',
            'category' => 'academic_officer', 'employment_type' => 'staff', 'type' => 'permanent',
            'status' => 'active', 'order' => 2, 'education' => [],
        ]);

        $this->get($facultyUrl)->assertOk()->assertInertia(fn ($page) => $page
            ->where('members', fn ($m) => collect($m)->pluck('id')->contains($ta->id) && ! collect($m)->pluck('id')->contains($officer->id)));
        $this->get($staffUrl)->assertOk()->assertInertia(fn ($page) => $page
            ->where('staff', fn ($s) => collect($s)->pluck('id')->contains($officer->id) && ! collect($s)->pluck('id')->contains($ta->id)));
    }
});
