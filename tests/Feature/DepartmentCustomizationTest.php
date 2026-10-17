<?php

use App\Models\Department;
use App\Models\User;

test('guests cannot access department admin manage page', function () {
    $this->get('/admin/departments/cse')->assertRedirect('/login');
});

test('cse admin can access cse department manage page', function () {
    $admin = User::where('email', 'cseadmin@baust.edu.bd')->first();
    $this->actingAs($admin)
        ->get('/admin/departments/cse')
        ->assertOk();
});

test('cse admin visiting /admin/departments is redirected to /admin/departments/cse', function () {
    $admin = User::where('email', 'cseadmin@baust.edu.bd')->first();
    $this->actingAs($admin)
        ->get('/admin/departments')
        ->assertRedirect('/admin/departments/cse');
});

test('cse admin cannot access eee department manage page', function () {
    $admin = User::where('email', 'cseadmin@baust.edu.bd')->first();
    $this->actingAs($admin)
        ->get('/admin/departments/eee')
        ->assertForbidden();
});

test('super admin can access all department manage pages', function () {
    $superAdmin = User::where('email', 'superadmin@baust.edu.bd')->first();
    $this->actingAs($superAdmin)
        ->get('/admin/departments')
        ->assertOk();

    $this->actingAs($superAdmin)
        ->get('/admin/departments/cse')
        ->assertOk();

    $this->actingAs($superAdmin)
        ->get('/admin/departments/eee')
        ->assertOk();
});

test('public can visit cse department pages with dynamic content', function () {
    $this->get('/cse')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Academic/Cse/Index')
            ->has('department')
            ->has('slides')
            ->has('highlights')
            ->has('stats')
        );

    $this->get('/cse/about')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Academic/Cse/About')
            ->has('department')
            ->has('stats')
        );

    $this->get('/cse/vision-mission')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Academic/Cse/VisionMission')
            ->has('department')
        );
});

test('public can visit cse event detail page with departmental menu', function () {
    $event = \App\Models\Notice::active()->forDepartment('cse')->firstOrFail();

    $this->get("/cse/events/{$event->slug}")
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Academic/Cse/EventDetail')
            ->has('event')
            ->has('relatedEvents')
            ->has('department')
        );
});

test('visiting cse notice with dept=cse redirects to cse event page', function () {
    $event = \App\Models\Notice::active()->forDepartment('cse')->firstOrFail();

    $this->get("/archive/notices/{$event->slug}?dept=cse")
        ->assertRedirect("/cse/events/{$event->slug}");
});
