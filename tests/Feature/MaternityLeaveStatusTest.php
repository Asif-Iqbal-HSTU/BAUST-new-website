<?php

use App\Models\DepartmentMember;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

test('admins can set a member to maternity leave without it falling back to active', function () {
    $admin = User::factory()->create(['role' => 'super_admin']);
    $member = DepartmentMember::create([
        'name' => 'Leave Test Member',
        'designation' => 'Lecturer',
        'department' => 'cse',
        'category' => 'lecturer',
        'type' => 'permanent',
        'status' => 'active',
        'education' => [],
    ]);

    $this->actingAs($admin)->put("/admin/members/{$member->id}", [
        'name' => $member->name,
        'designation' => $member->designation,
        'department' => $member->department,
        'category' => $member->category,
        'type' => $member->type,
        'status' => 'maternity_leave',
        'employment_type' => 'faculty',
        'education' => [],
    ])->assertSessionHasNoErrors();

    expect($member->fresh()->status)->toBe('maternity_leave');
});

test('members on maternity leave stay listed on the public faculty page', function () {
    $member = DepartmentMember::create([
        'name' => 'Listed Leave Member',
        'designation' => 'Lecturer',
        'department' => 'eng',
        'category' => 'lecturer',
        'type' => 'permanent',
        'status' => 'maternity_leave',
        'education' => [],
    ]);

    $this->get('/eng/faculty')->assertOk()->assertInertia(fn (AssertableInertia $page) => $page
        ->where('members', fn ($members) => collect($members)->contains(
            fn ($m) => $m['id'] === $member->id && $m['status'] === 'maternity_leave'
        ))
    );
});
