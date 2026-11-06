<?php

use App\Models\Department;
use App\Models\DepartmentLaboratory;
use App\Models\DepartmentLabPerson;
use App\Models\DepartmentMember;
use App\Models\User;

function labAdmin(string $dept): User
{
    return User::factory()->create(['role' => 'dept_admin', 'department' => $dept]);
}

function freshLab(string $dept, string $slug): DepartmentLaboratory
{
    return DepartmentLaboratory::create([
        'department_id' => Department::where('slug', $dept)->value('id'),
        'name' => ucfirst($slug).' Lab', 'slug' => $slug, 'order' => 0, 'is_active' => true,
    ]);
}

test('a focal point manages the team of each laboratory', function () {
    $admin = labAdmin('eee');
    $lab = freshLab('eee', 'power-team-test');
    $member = DepartmentMember::create([
        'department' => 'eee', 'name' => 'Dr. Lab Head', 'designation' => 'Associate Professor', 'phone' => '01700000000',
        'email' => 'head@baust.edu.bd', 'photo' => '/storage/members/head.jpg', 'category' => 'associate_professor',
        'employment_type' => 'faculty', 'type' => 'permanent', 'status' => 'active', 'order' => 1, 'education' => [],
    ]);

    // Picking a member fills in their details
    $this->actingAs($admin)->post('/admin/departments/eee/collection/lab_people', [
        'laboratory_id' => $lab->id, 'role' => 'Lab In-charge', 'member_id' => $member->id, 'is_active' => '1',
    ])->assertRedirect()->assertSessionHasNoErrors();
    $incharge = DepartmentLabPerson::where('laboratory_id', $lab->id)->where('role', 'Lab In-charge')->firstOrFail();
    expect($incharge->name)->toBe('Dr. Lab Head')
        ->and($incharge->designation)->toBe('Associate Professor')
        ->and($incharge->email)->toBe('head@baust.edu.bd')
        ->and($incharge->photo)->toBe('/storage/members/head.jpg');

    // Someone who is not a listed member, typed in
    $this->actingAs($admin)->post('/admin/departments/eee/collection/lab_people', [
        'laboratory_id' => $lab->id, 'role' => 'Lab Technician', 'name' => 'Mr. Technician', 'designation' => 'Senior Technician', 'is_active' => '1',
    ])->assertRedirect()->assertSessionHasNoErrors();
    $tech = DepartmentLabPerson::where('name', 'Mr. Technician')->firstOrFail();
    expect($tech->order)->toBeGreaterThan($incharge->order);

    // Reorder, then the public page shows the team in that order
    $this->actingAs($admin)->post('/admin/departments/eee/collection/lab_people/reorder', ['ordered_ids' => [$tech->id, $incharge->id]])->assertRedirect();
    $this->get('/eee/laboratories/power-team-test')->assertOk()
        ->assertInertia(fn ($page) => $page->where('lab.people.0.name', 'Mr. Technician')->where('lab.people.1.role', 'Lab In-charge'));

    // Edit and hide
    $this->actingAs($admin)->post("/admin/departments/eee/collection/lab_people/{$tech->id}", [
        'laboratory_id' => $lab->id, 'role' => 'Senior Lab Technician', 'name' => 'Mr. Technician', 'is_active' => '0',
    ])->assertRedirect();
    expect($tech->fresh()->role)->toBe('Senior Lab Technician');
    $this->get('/eee/laboratories/power-team-test')
        ->assertInertia(fn ($page) => $page->has('lab.people', 1)->where('lab.people.0.name', 'Dr. Lab Head'));

    // Delete
    $this->actingAs($admin)->delete("/admin/departments/eee/collection/lab_people/{$incharge->id}")->assertRedirect();
    expect(DepartmentLabPerson::find($incharge->id))->toBeNull();

    $this->actingAs($admin)->get('/admin/departments/eee')->assertOk()
        ->assertInertia(fn ($page) => $page->has('labPeople', 1)->where('memberOptions', fn ($m) => collect($m)->pluck('id')->contains($member->id)));
});

test('lab team entries stay within the focal point\'s own department', function () {
    $admin = labAdmin('cse');
    $cseLab = freshLab('cse', 'team-scope-test');
    $eeeLab = freshLab('eee', 'team-scope-other');
    $eeeMember = DepartmentMember::create([
        'department' => 'eee', 'name' => 'EEE Person', 'designation' => 'Lecturer', 'category' => 'lecturer',
        'employment_type' => 'faculty', 'type' => 'permanent', 'status' => 'active', 'order' => 1, 'education' => [],
    ]);

    $this->actingAs($admin)->post('/admin/departments/cse/collection/lab_people', ['laboratory_id' => $eeeLab->id, 'role' => 'Lab In-charge', 'name' => 'X'])
        ->assertSessionHasErrors('laboratory_id');
    $this->actingAs($admin)->post('/admin/departments/cse/collection/lab_people', ['laboratory_id' => $cseLab->id, 'role' => 'Lab In-charge', 'member_id' => $eeeMember->id])
        ->assertSessionHasErrors('member_id');
    $this->actingAs($admin)->post('/admin/departments/cse/collection/lab_people', ['laboratory_id' => $cseLab->id, 'role' => 'Lab In-charge'])
        ->assertSessionHasErrors('name');
    expect(DepartmentLabPerson::count())->toBe(0);

    // Deleting a lab removes its team
    $person = DepartmentLabPerson::create(['department_id' => $cseLab->department_id, 'laboratory_id' => $cseLab->id, 'role' => 'Lab Assistant', 'name' => 'Y']);
    $this->actingAs($admin)->delete("/admin/departments/cse/collection/laboratories/{$cseLab->id}")->assertRedirect();
    expect(DepartmentLabPerson::find($person->id))->toBeNull();
});
