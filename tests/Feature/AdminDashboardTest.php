<?php

use App\Models\Department;
use App\Models\User;

test('every role gets a dashboard with its own numbers and shortcuts', function () {
    $roles = [
        ['role' => 'super_admin'],
        ['role' => 'dept_admin', 'department' => 'cse'],
        ['role' => 'pro'],
        ['role' => 'iqac_admin'],
        ['role' => 'administration_admin'],
        ['role' => 'library_admin'],
        ['role' => 'research_admin'],
        ['role' => 'admission_admin'],
    ];

    foreach ($roles as $attributes) {
        $user = User::factory()->create($attributes);
        $this->actingAs($user)->get('/dashboard')->assertOk()
            ->assertInertia(fn ($page) => $page->component('dashboard')
                ->has('roleLabel')
                ->where('scope', fn ($scope) => is_string($scope) && $scope !== '')
                ->has('stats')
                ->where('actions', fn ($actions) => count($actions) > 0));
    }
});

test('the dashboard warns accounts still on the default password', function () {
    $weak = User::factory()->create(['role' => 'library_admin', 'password' => 'password']);
    $strong = User::factory()->create(['role' => 'library_admin', 'password' => 'a-much-better-passphrase']);

    $this->actingAs($weak)->get('/dashboard')->assertInertia(fn ($page) => $page->where('usesDefaultPassword', true));
    $this->actingAs($strong)->get('/dashboard')->assertInertia(fn ($page) => $page->where('usesDefaultPassword', false));

    $super = User::factory()->create(['role' => 'super_admin', 'password' => 'another-strong-passphrase']);
    $this->actingAs($super)->get('/dashboard')->assertInertia(fn ($page) => $page
        ->where('defaultPasswordAccounts', fn ($list) => collect($list)->pluck('email')->contains($weak->email)
            && ! collect($list)->pluck('email')->contains($strong->email)));
});

test('a focal point sees what is missing on their department site', function () {
    Department::where('slug', 'ict')->update(['vision' => null]);

    $this->actingAs(User::factory()->create(['role' => 'dept_admin', 'department' => 'ict']))
        ->get('/dashboard')
        ->assertInertia(fn ($page) => $page
            ->where('attention', fn ($items) => collect($items)->contains(fn ($i) => str_contains($i['text'], 'Vision')))
            ->where('actions', fn ($actions) => collect($actions)->pluck('href')->contains('/admin/departments/ict')));
});

test('the psychologist still goes straight to counseling sessions', function () {
    $this->actingAs(User::factory()->create(['role' => 'psychologist']))
        ->get('/dashboard')->assertRedirect(route('admin.counseling.index'));
});
