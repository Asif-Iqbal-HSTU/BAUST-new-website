<?php

use App\Models\Department;
use App\Models\DepartmentLaboratory;
use App\Models\DepartmentSociety;
use App\Models\Notice;
use App\Models\User;

function focalPoint(string $dept): User
{
    return User::factory()->create(['role' => 'dept_admin', 'department' => $dept]);
}

test('a dept_admin with no department has no admin rights', function () {
    $user = User::factory()->create(['role' => 'dept_admin', 'department' => null]);
    $notice = Notice::create(['title' => 'University notice', 'slug' => 'university-notice', 'published_at' => now(), 'is_active' => true]);

    expect($user->isDeptAdmin())->toBeFalse()
        ->and($user->canManageNotice($notice))->toBeFalse();

    $this->actingAs($user)->get('/admin/notices')->assertForbidden();
    $this->actingAs($user)->post('/admin/notices', ['title' => 'Spam', 'published_at' => now()->toDateString()])->assertForbidden();
    $this->actingAs($user)->get('/admin/members')->assertForbidden();
    $this->actingAs($user)->get('/admin/departments')->assertForbidden();
});

test('a focal point cannot edit or delete another department\'s items through their own url', function () {
    $eee = Department::where('slug', 'eee')->firstOrFail();
    $lab = DepartmentLaboratory::create(['department_id' => $eee->id, 'name' => 'EEE Lab', 'slug' => 'eee-lab']);

    $this->actingAs(focalPoint('cse'))
        ->post("/admin/departments/cse/collection/laboratories/{$lab->id}", ['name' => 'Hijacked'])
        ->assertNotFound();
    $this->actingAs(focalPoint('cse'))
        ->delete("/admin/departments/cse/collection/laboratories/{$lab->id}")
        ->assertNotFound();

    expect($lab->fresh()->name)->toBe('EEE Lab');
});

test('a focal point can hide and show their own items', function () {
    $cse = Department::where('slug', 'cse')->firstOrFail();
    $lab = DepartmentLaboratory::create(['department_id' => $cse->id, 'name' => 'Networks Lab', 'slug' => 'networks']);
    $admin = focalPoint('cse');

    $this->actingAs($admin)
        ->post("/admin/departments/cse/collection/laboratories/{$lab->id}", ['name' => 'Networks Lab', 'slug' => 'networks', 'is_active' => '0'])
        ->assertRedirect();
    expect($lab->fresh()->is_active)->toBeFalse();

    $this->actingAs($admin)
        ->post("/admin/departments/cse/collection/laboratories/{$lab->id}", ['name' => 'Networks Lab', 'slug' => 'networks', 'is_active' => '1'])
        ->assertRedirect();
    expect($lab->fresh()->is_active)->toBeTrue();
});

test('society committee and activities are saved as structured rows', function () {
    $this->actingAs(focalPoint('cse'))
        ->post('/admin/departments/cse/collection/societies', [
            'name' => 'Robotics Club',
            'type' => 'club',
            'activities' => "Workshops | Cpu | Hands-on sessions\nCompetitions",
            'committee' => "President | Dr. A. Rahman | Professor\n".json_encode(['role' => 'Treasurer', 'name' => 'B. Karim', 'designation' => null, 'image' => '/x.jpg']),
        ])
        ->assertRedirect();

    $club = DepartmentSociety::where('name', 'Robotics Club')->firstOrFail();
    expect($club->activities)->toBe([
        ['title' => 'Workshops', 'icon' => 'Cpu', 'description' => 'Hands-on sessions'],
        ['title' => 'Competitions', 'icon' => null, 'description' => null],
    ])->and($club->committee)->toBe([
        ['role' => 'President', 'name' => 'Dr. A. Rahman', 'designation' => 'Professor', 'image' => null],
        ['role' => 'Treasurer', 'name' => 'B. Karim', 'designation' => null, 'image' => '/x.jpg'],
    ]);
});

test('a focal point can override page texts for their department only', function () {
    $this->actingAs(focalPoint('cse'))
        ->post('/admin/departments/cse/profile', [
            'name' => 'Computer Science & Engineering',
            'short_name' => 'CSE',
            'page_texts' => ['curriculum_intro' => 'Our new intro', 'staff_intro' => '', 'not_a_key' => 'x'],
        ])
        ->assertRedirect();

    expect(Department::where('slug', 'cse')->first()->page_texts)->toBe(['curriculum_intro' => 'Our new intro']);

    $this->actingAs(focalPoint('cse'))
        ->post('/admin/departments/eee/profile', ['name' => 'X', 'short_name' => 'X'])
        ->assertForbidden();
});

test('roles outside departments cannot use the members or notices admin', function () {
    $iqac = User::factory()->create(['role' => 'iqac_admin']);
    $pro = User::factory()->create(['role' => 'pro']);

    $this->actingAs($iqac)->get('/admin/members')->assertForbidden();
    $this->actingAs($iqac)->get('/admin/notices')->assertForbidden();
    $this->actingAs($pro)->get('/admin/members')->assertForbidden();
    $this->actingAs($pro)->get('/admin/notices')->assertOk();
});

test('focal points cannot manage university offices', function () {
    $this->actingAs(focalPoint('cse'))->get('/admin/offices')->assertForbidden();
});

test('the page texts tab shows each department\'s current texts', function () {
    $this->actingAs(focalPoint('cse'))
        ->get('/admin/departments/cse')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('pageTextDefaults.curriculum_intro', fn ($text) => str_contains($text, Department::where('slug', 'cse')->value('name')))
            ->where('pageTextDefaults.curriculum_subtitle', 'Designed for Excellence, Built for the Future')
            ->missing('pageTextDefaults.gallery_subtitle')
        );

    $this->actingAs(focalPoint('ce'))
        ->get('/admin/departments/ce')
        ->assertInertia(fn ($page) => $page
            ->has('pageTextDefaults.gallery_subtitle')
            ->has('pageTextDefaults.video_gallery_subtitle')
            ->has('pageTextDefaults.thesis_intro')
        );
});

test('saving a page text unchanged keeps following the default', function () {
    $cse = Department::where('slug', 'cse')->firstOrFail();
    $defaults = $cse->pageTextDefaults();

    $this->actingAs(focalPoint('cse'))
        ->post('/admin/departments/cse/profile', [
            'name' => $cse->name,
            'short_name' => $cse->short_name,
            'page_texts' => [
                'curriculum_intro' => $defaults['curriculum_intro'],
                'curriculum_subtitle' => 'A new subtitle',
            ],
        ])
        ->assertRedirect();

    expect($cse->fresh()->page_texts)->toBe(['curriculum_subtitle' => 'A new subtitle']);
});

test('saving one tab\'s page texts keeps the other tabs\' texts', function () {
    $cse = Department::where('slug', 'cse')->firstOrFail();
    $cse->update(['page_texts' => ['curriculum_intro' => 'Custom curriculum intro']]);

    $this->actingAs(focalPoint('cse'))
        ->post('/admin/departments/cse/profile', [
            'name' => $cse->name,
            'short_name' => $cse->short_name,
            'page_texts' => ['labs_subtitle' => 'Our labs', 'labs_intro' => ''],
        ])
        ->assertRedirect();

    expect($cse->fresh()->page_texts)->toBe(['curriculum_intro' => 'Custom curriculum intro', 'labs_subtitle' => 'Our labs']);
});

test('a focal point can add, edit, hide and delete a lab and the labs page follows', function () {
    $admin = focalPoint('eee');
    $eee = Department::where('slug', 'eee')->firstOrFail();

    $this->actingAs($admin)->post('/admin/departments/eee/collection/laboratories', [
        'name' => 'Smart Grid Lab', 'description' => 'Grid testing', 'equipment' => "PMU\nRelay test set", 'order' => 99, 'is_active' => '1',
    ])->assertRedirect();
    $lab = \App\Models\DepartmentLaboratory::where('department_id', $eee->id)->where('name', 'Smart Grid Lab')->firstOrFail();
    expect($lab->slug)->toBe('smart-grid-lab')->and($lab->equipment)->toBe(['PMU', 'Relay test set']);

    $this->get('/eee/laboratories/smart-grid-lab')->assertOk()
        ->assertInertia(fn ($page) => $page->component('Academic/Eee/Laboratory')->where('lab.name', 'Smart Grid Lab'));

    $this->actingAs($admin)->post("/admin/departments/eee/collection/laboratories/{$lab->id}", [
        'name' => 'Smart Grid Lab', 'slug' => 'smart-grid-lab', 'description' => 'Updated', 'order' => 99, 'is_active' => '0',
    ])->assertRedirect();
    $this->get('/eee/laboratories/smart-grid-lab')->assertNotFound();

    $this->actingAs($admin)->delete("/admin/departments/eee/collection/laboratories/{$lab->id}")->assertRedirect();
    expect(\App\Models\DepartmentLaboratory::find($lab->id))->toBeNull();
});

test('every department labs page lists its labs like the CE page', function () {
    foreach (['cse' => 'Academic/Cse/Laboratory', 'ict' => 'Academic/Ict/Laboratory', 'eee' => 'Academic/Eee/Laboratory',
        'me' => 'Academic/Me/Laboratory', 'ipe' => 'Academic/Ipe/Laboratory', 'ce' => 'Academic/Ce/Laboratories'] as $slug => $component) {
        $this->get("/{$slug}/laboratories")->assertOk()
            ->assertInertia(fn ($page) => $page->component($component)->has('allLabs')->has('lab'));
    }
    foreach (['dba', 'ais', 'eng', 'as'] as $slug) {
        $this->get("/{$slug}/facilities")->assertOk()
            ->assertInertia(fn ($page) => $page->component('Department/Facilities')->has('allLabs'));
        $this->get("/{$slug}/facilities/no-such-lab")->assertNotFound();
    }
});
