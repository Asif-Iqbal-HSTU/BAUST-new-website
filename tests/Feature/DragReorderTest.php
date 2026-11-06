<?php

use App\Models\Department;
use App\Models\DepartmentLaboratory;
use App\Models\DepartmentMember;
use App\Models\Faculty;
use App\Models\IqacStat;
use App\Models\OfficeMember;
use App\Models\User;

function deptAdmin(string $dept): User
{
    return User::factory()->create(['role' => 'dept_admin', 'department' => $dept]);
}

test('department items are reordered by drag and drop, scoped to the department', function () {
    $cse = Department::where('slug', 'cse')->firstOrFail();
    $eee = Department::where('slug', 'eee')->firstOrFail();
    DepartmentLaboratory::where('department_id', $cse->id)->delete();
    $a = DepartmentLaboratory::create(['department_id' => $cse->id, 'name' => 'A', 'slug' => 'a', 'order' => 1]);
    $b = DepartmentLaboratory::create(['department_id' => $cse->id, 'name' => 'B', 'slug' => 'b', 'order' => 2]);
    $eeeLab = DepartmentLaboratory::create(['department_id' => $eee->id, 'name' => 'E', 'slug' => 'e', 'order' => 7]);

    $this->actingAs(deptAdmin('cse'))
        ->post('/admin/departments/cse/collection/laboratories/reorder', ['ordered_ids' => [$b->id, $eeeLab->id, $a->id]])
        ->assertRedirect();

    expect($b->fresh()->order)->toBe(1)
        ->and($a->fresh()->order)->toBe(3)
        ->and($eeeLab->fresh()->order)->toBe(7); // another department's item is untouched

    $this->actingAs(deptAdmin('cse'))
        ->post('/admin/departments/eee/collection/laboratories/reorder', ['ordered_ids' => [$eeeLab->id]])
        ->assertForbidden();
});

test('new department items go to the end and editing keeps their position', function () {
    $cse = Department::where('slug', 'cse')->firstOrFail();
    $max = (int) DepartmentLaboratory::where('department_id', $cse->id)->max('order');
    $admin = deptAdmin('cse');

    $this->actingAs($admin)->post('/admin/departments/cse/collection/laboratories', ['name' => 'Newest Lab'])->assertRedirect();
    $lab = DepartmentLaboratory::where('department_id', $cse->id)->where('name', 'Newest Lab')->firstOrFail();
    expect($lab->order)->toBe($max + 1);

    $this->actingAs($admin)->post("/admin/departments/cse/collection/laboratories/{$lab->id}", ['name' => 'Newest Lab (renamed)'])->assertRedirect();
    expect($lab->fresh()->order)->toBe($max + 1);
});

test('iqac, office and faculty lists can be reordered', function () {
    IqacStat::query()->delete();
    $s1 = IqacStat::create(['value' => '1', 'label' => 'One', 'order' => 1]);
    $s2 = IqacStat::create(['value' => '2', 'label' => 'Two', 'order' => 2]);
    $this->actingAs(User::factory()->create(['role' => 'iqac_admin']))
        ->post('/admin/iqac/collection/stats/reorder', ['ordered_ids' => [$s2->id, $s1->id]])->assertRedirect();
    expect($s2->fresh()->order)->toBe(1)->and($s1->fresh()->order)->toBe(2);

    $super = User::factory()->create(['role' => 'super_admin']);
    $m1 = OfficeMember::create(['office' => 'registrar', 'name' => 'M1', 'tier' => 4, 'order' => 1, 'education' => []]);
    $m2 = OfficeMember::create(['office' => 'registrar', 'name' => 'M2', 'tier' => 4, 'order' => 2, 'education' => []]);
    $this->actingAs($super)->post('/admin/offices/registrar/members/reorder', ['ordered_ids' => [$m2->id, $m1->id]])->assertRedirect();
    expect($m2->fresh()->order)->toBe(1)->and($m1->fresh()->order)->toBe(2);

    $ids = Faculty::orderBy('order')->pluck('id')->reverse()->values()->all();
    if (count($ids) > 1) {
        $this->actingAs($super)->post('/admin/faculties/reorder', ['ordered_ids' => $ids])->assertRedirect();
        expect(Faculty::orderBy('order')->pluck('id')->all())->toBe($ids);
    }
    $this->actingAs(deptAdmin('cse'))->post('/admin/faculties/reorder', ['ordered_ids' => $ids])->assertForbidden();
});

test('a new member without an order is placed at the end of the department list', function () {
    $max = (int) DepartmentMember::where('department', 'cse')->max('order');

    $this->actingAs(deptAdmin('cse'))->post('/admin/members', [
        'name' => 'New Lecturer', 'designation' => 'Lecturer', 'type' => 'permanent',
        'employment_type' => 'faculty', 'status' => 'active', 'category' => 'lecturer',
    ])->assertRedirect();

    expect(DepartmentMember::where('name', 'New Lecturer')->value('order'))->toBe($max + 1);
});
