<?php

use App\Models\Notice;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

beforeEach(function () {
    config(['app.url' => 'https://baust.edu.bd', 'inertia.ssr.enabled' => false]);
    Cache::flush();
});

test('the sitemap lists public pages, labs and notices on the public address', function () {
    Notice::create(['title' => 'Convocation 2026', 'slug' => 'convocation-2026', 'published_at' => now()->subDay(), 'is_active' => true]);
    Notice::create(['title' => 'Draft', 'slug' => 'hidden-draft', 'published_at' => now()->subDay(), 'is_active' => false]);

    $xml = $this->get('/sitemap.xml')->assertOk()->assertHeader('Content-Type', 'application/xml; charset=UTF-8')->getContent();

    foreach (['/', '/cse', '/cse/faculty', '/admission/tuition-fees', '/facilities/library', '/research', '/ma-elt', '/archive/notices/convocation-2026'] as $path) {
        expect($xml)->toContain('<loc>https://baust.edu.bd'.($path === '/' ? '/' : $path).'</loc>');
    }
    expect($xml)->toMatch('#<loc>https://baust\.edu\.bd/(cse|eee)/laboratories/[a-z0-9-]+</loc>#')
        ->not->toContain('hidden-draft')
        ->not->toContain('/admin')
        ->not->toContain('/dashboard')
        ->not->toContain('/login');
    expect(simplexml_load_string($xml))->not->toBeFalse();
});

test('public pages carry a title, description, canonical, share tags and structured data', function () {
    $html = $this->get('/cse')->assertOk()->getContent();

    expect($html)->toContain('<meta name="description" content="')
        ->toContain('<link rel="canonical" href="https://baust.edu.bd/cse">')
        ->toContain('<meta property="og:title" content="')
        ->toContain('<meta name="robots" content="index, follow">')
        ->toContain('"@type":"CollegeOrUniversity"')
        ->toContain('"@type":"EducationalOrganization"')
        ->toMatch('#<title inertia>[^<]*Computer Science[^<]*BAUST</title>#');

    $notice = Notice::create(['title' => 'Annual Sports Week', 'slug' => 'annual-sports-week', 'excerpt' => 'Sports week opens on Sunday.', 'published_at' => now()->subDay(), 'is_active' => true]);
    $html = $this->get("/archive/notices/{$notice->slug}")->assertOk()->getContent();
    expect($html)->toContain('"@type":"NewsArticle"')
        ->toContain('<meta property="og:type" content="article">')
        ->toContain('Sports week opens on Sunday.');
});

test('admin and login screens are kept out of search engines', function () {
    expect($this->get('/login')->getContent())->toContain('<meta name="robots" content="noindex, nofollow">');
    $html = $this->actingAs(User::factory()->create(['role' => 'super_admin']))->get('/dashboard')->getContent();
    expect($html)->toContain('<meta name="robots" content="noindex, nofollow">');
    expect(file_get_contents(public_path('robots.txt')))->toContain('Disallow: /admin')->toContain('Sitemap: https://baust.edu.bd/sitemap.xml');
});
