<?php

use App\Models\Department;
use App\Models\DepartmentLaboratory;
use App\Models\DepartmentSociety;
use Illuminate\Support\Facades\Route;

test('every department menu page renders without a server error', function () {
    $this->withoutVite();
    $prefixes = ['cse', 'ict', 'eee', 'me', 'ipe', 'ce', 'dba', 'ais', 'eng', 'as', 'mba'];

    $uris = collect(Route::getRoutes()->getRoutes())
        ->filter(fn ($route) => in_array('GET', $route->methods()))
        ->map(fn ($route) => $route->uri())
        ->filter(fn ($uri) => in_array(explode('/', $uri)[0], $prefixes) && ! str_contains($uri, '{'))
        ->values();

    expect($uris)->not->toBeEmpty();

    foreach ($uris as $uri) {
        $status = $this->get('/'.$uri)->status();
        expect($status)->toBeLessThan(500, "/{$uri} returned {$status}");
    }
});

test('lab and club pages render database content and 404 for unknown slugs', function () {
    foreach (['cse', 'ict', 'eee', 'me', 'ipe', 'ce'] as $slug) {
        $lab = DepartmentLaboratory::where('department_id', Department::where('slug', $slug)->value('id'))
            ->where('is_active', true)->orderBy('order')->first();
        if ($lab) {
            $path = $slug === 'cse' ? "/cse/laboratories/{$lab->slug}" : "/{$slug}/laboratories/{$lab->slug}";
            $this->get($path)->assertOk();
        }
        $this->get("/{$slug}/laboratories/no-such-lab")->assertNotFound();
    }

    $club = DepartmentSociety::where('slug', 'esc')->first();
    $this->get('/ce/clubs/esc')->assertOk()->assertInertia(fn ($page) => $page->where('club.name', $club->name));
    $this->get('/ce/clubs/no-such-club')->assertNotFound();
});

test('page defaults removed from the pages were copied into empty database fields', function () {
    $esc = DepartmentSociety::where('slug', 'esc')->firstOrFail();
    expect($esc->committee)->not->toBeEmpty()
        ->and($esc->activities)->not->toBeEmpty();

    $ipe = Department::where('slug', 'ipe')->firstOrFail();
    $lab = DepartmentLaboratory::where('department_id', $ipe->id)->where('slug', 'production-process-lab')->first();
    if ($lab) {
        expect($lab->images)->not->toBeEmpty();
    }
});

test('event detail pages only show the department\'s own notices', function () {
    \App\Models\Notice::create([
        'title' => 'EEE only event', 'slug' => 'eee-only-event', 'department' => 'eee',
        'published_at' => now()->subDay(), 'is_active' => true,
    ]);

    $this->get('/eee/events/eee-only-event')->assertOk();
    foreach (['cse', 'ict', 'me', 'ipe', 'ce', 'ais'] as $slug) {
        $this->get("/{$slug}/events/eee-only-event")->assertNotFound();
    }
});
