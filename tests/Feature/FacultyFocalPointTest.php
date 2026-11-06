<?php

use App\Models\Department;
use App\Models\DepartmentMember;
use App\Models\Faculty;
use App\Models\Notice;
use App\Models\OfficeMember;
use App\Models\User;

/**
 * routes/web.php registers /{faculty} from the faculties table at boot, which in
 * tests runs before the database is migrated; register the ones these tests visit.
 */
function registerFacultyRoutes(string ...$slugs): void
{
    foreach ($slugs as $slug) {
        \Illuminate\Support\Facades\Route::get('/'.$slug, [\App\Http\Controllers\OfficeController::class, 'show'])->defaults('office', $slug);
    }
    app('router')->getRoutes()->refreshNameLookups();
}

function focal(string $dept): User
{
    return User::factory()->create(['role' => 'dept_admin', 'department' => $dept]);
}

test('each faculty is managed by the focal points of its departments', function () {
    $expected = ['fece' => ['cse', 'ict', 'eee'], 'fme' => ['me', 'ipe'], 'fce' => ['ce'], 'fbs' => ['dba', 'ais'], 'fsh' => ['eng', 'as']];

    foreach ($expected as $faculty => $depts) {
        foreach ($depts as $dept) {
            expect(focal($dept)->managedFaculty()?->slug)->toBe($faculty, "{$dept} should run {$faculty}");
        }
    }
});

test('a focal point edits their faculty Dean\'s page but not its URL, departments, or other faculties', function () {
    $fece = Faculty::where('slug', 'fece')->firstOrFail();
    $fme = Faculty::where('slug', 'fme')->firstOrFail();
    $cse = focal('cse');

    $this->actingAs($cse)->get("/admin/faculties/{$fece->id}/edit")->assertOk()
        ->assertInertia(fn ($page) => $page->where('canEditStructure', false));
    $this->actingAs($cse)->get("/admin/faculties/{$fme->id}/edit")->assertForbidden();
    $this->actingAs($cse)->get('/admin/faculties')->assertForbidden();
    $this->actingAs($cse)->get('/admin/faculties/create')->assertForbidden();
    $this->actingAs($cse)->delete("/admin/faculties/{$fece->id}")->assertForbidden();

    $this->actingAs($cse)->put("/admin/faculties/{$fece->id}", [
        'office_name' => $fece->office_name, 'code' => $fece->code, 'name' => $fece->name,
        'about' => 'Updated by the CSE focal point',
        'slug' => 'hijacked', 'department_slugs' => ['cse'],
    ])->assertRedirect();

    $fece->refresh();
    expect($fece->about)->toBe('Updated by the CSE focal point')
        ->and($fece->slug)->toBe('fece')
        ->and($fece->department_slugs)->toContain('ict', 'eee');

    registerFacultyRoutes('fece');
    $this->get('/fece')->assertOk()->assertInertia(fn ($page) => $page->where('faculty.about', 'Updated by the CSE focal point'));
});

test('a focal point manages their faculty Dean\'s office staff only', function () {
    $ict = focal('ict');

    $this->actingAs($ict)->get('/admin/offices/fece')->assertOk();
    $this->actingAs($ict)->post('/admin/offices/fece/members', ['name' => 'New Coordinator', 'tier' => 2])->assertRedirect();
    $member = OfficeMember::where('office', 'fece')->where('name', 'New Coordinator')->firstOrFail();
    $this->actingAs($ict)->post("/admin/offices/fece/members/{$member->id}", ['name' => 'Renamed', 'tier' => 2])->assertRedirect();
    expect($member->fresh()->name)->toBe('Renamed');
    $this->actingAs($ict)->delete("/admin/offices/fece/members/{$member->id}")->assertRedirect();

    $this->actingAs($ict)->get('/admin/offices/fme')->assertForbidden();
    $this->actingAs($ict)->get('/admin/offices/registrar')->assertForbidden();
    $this->actingAs($ict)->get('/admin/offices')->assertForbidden();
});

test('faculty programs are managed by the faculty\'s focal points', function () {
    expect(focal('dba')->manageableDepartmentSlugs())->toContain('dba', 'mba')
        ->and(focal('ais')->manageableDepartmentSlugs())->toContain('mba')
        ->and(focal('eng')->manageableDepartmentSlugs())->toContain('ma-elt')
        ->and(focal('as')->manageableDepartmentSlugs())->toContain('ma-elt')
        ->and(focal('cse')->manageableDepartmentSlugs())->toBe(['cse']);

    $this->actingAs(focal('ais'))->get('/admin/departments/mba')->assertOk();
    $this->actingAs(focal('eng'))->get('/admin/departments/ma-elt')->assertOk();
    $this->actingAs(focal('cse'))->get('/admin/departments/mba')->assertForbidden();
    $this->actingAs(focal('dba'))->get('/admin/departments/ma-elt')->assertForbidden();
});

test('program members and notices are handled by the faculty\'s focal points', function () {
    $member = [
        'designation' => 'Lecturer', 'type' => 'permanent', 'employment_type' => 'faculty',
        'status' => 'active', 'category' => 'lecturer', 'department' => 'mba',
    ];

    $this->actingAs(focal('dba'))->post('/admin/members', ['name' => 'MBA Teacher'] + $member)->assertRedirect();
    expect(DepartmentMember::where('name', 'MBA Teacher')->value('department'))->toBe('mba');

    $this->actingAs(focal('cse'))->post('/admin/members', ['name' => 'Sneaky Teacher'] + $member)->assertRedirect();
    expect(DepartmentMember::where('name', 'Sneaky Teacher')->value('department'))->toBe('cse');

    $this->actingAs(focal('ais'))->get('/admin/members?department=mba')->assertOk()
        ->assertInertia(fn ($page) => $page->where('members.data', fn ($rows) => collect($rows)->every(fn ($r) => $r['department'] === 'mba')));

    $this->actingAs(focal('dba'))->post('/admin/notices', [
        'title' => 'MBA admission seminar', 'published_at' => now()->toDateTimeString(), 'department' => 'mba',
    ])->assertRedirect();
    $notice = Notice::where('title', 'MBA admission seminar')->firstOrFail();
    expect($notice->department)->toBe('mba')
        ->and(focal('ais')->canManageNotice($notice))->toBeTrue()
        ->and(focal('cse')->canManageNotice($notice))->toBeFalse();
});

test('the MA in English (ELT) program has its own site under FSH', function () {
    $ma = Department::where('slug', 'ma-elt')->firstOrFail();
    expect(Faculty::where('slug', 'fsh')->first()->department_slugs)->toContain('ma-elt');

    $this->get('/ma-elt')->assertOk()->assertInertia(fn ($page) => $page->where('department.slug', 'ma-elt'));
    $this->get('/ma-elt/curriculum')->assertOk();
    registerFacultyRoutes('fsh');
    $this->get('/fsh')->assertOk()->assertInertia(fn ($page) => $page->where('departments', fn ($d) => collect($d)->pluck('slug')->contains('ma-elt')));
});
