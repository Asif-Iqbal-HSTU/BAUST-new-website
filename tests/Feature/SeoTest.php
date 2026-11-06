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

test('robots.txt lets crawlers reach the noindexed sign-in pages and never blocks assets', function () {
    $robots = file_get_contents(public_path('robots.txt'));

    expect($robots)->not->toMatch('#^Disallow: /(login|forgot-password|build|css|js)\b#m');
    expect($this->get('/forgot-password')->getContent())->toContain('<meta name="robots" content="noindex, nofollow">');
});

// (/archive/notices takes the same path through Seo, but its category query uses a
// MySQL-only HAVING clause that the SQLite test database rejects.)
test('filtered and paginated lists are noindexed with a canonical to the plain list', function () {
    foreach (['/public-relations?department=cse', '/public-relations?search=convocation', '/public-relations?page=3', '/?p=123'] as $url) {
        $html = $this->get($url)->assertOk()->getContent();
        $path = parse_url($url, PHP_URL_PATH);

        expect($html)->toContain('<meta name="robots" content="noindex, follow">')
            ->toContain('<link rel="canonical" href="https://baust.edu.bd'.$path.'">');
    }

    expect($this->get('/public-relations')->getContent())->toContain('<meta name="robots" content="index, follow">');
    expect($this->get('/public-relations?utm_source=facebook&fbclid=x')->getContent())->toContain('<meta name="robots" content="index, follow">');
});

test('key pages use the hand-written title and description from config/seo.php', function () {
    foreach (config('seo.pages') as $path => $meta) {
        $html = $this->get($path)->assertOk()->getContent();

        expect(substr_count($html, '<title'))->toBe(1, $path);
        expect($html)->toContain('<title inertia>'.e($meta['title']).'</title>')
            ->toContain('<meta name="description" content="'.e($meta['description']).'">')
            ->toContain('<meta property="og:title" content="'.e($meta['title']).'">');
        expect(mb_strlen($meta['title']))->toBeLessThanOrEqual(60, $path);
        expect(mb_strlen($meta['description']))->toBeLessThanOrEqual(155, $path);
    }

    expect($this->get('/')->getContent())->toContain('"email":"info@baust.edu.bd"')->toContain('"addressLocality":"Saidpur"');
});

test('a page reachable at two paths has one canonical and only it is in the sitemap', function () {
    expect($this->get('/about/academic-calendar')->assertOk()->getContent())
        ->toContain('<link rel="canonical" href="https://baust.edu.bd/admission/academic-calendar">');

    Notice::create(['title' => 'No slug', 'slug' => '', 'published_at' => now()->subDay(), 'is_active' => true]);
    $xml = $this->get('/sitemap.xml')->getContent();

    expect($xml)->toContain('<loc>https://baust.edu.bd/admission/academic-calendar</loc>')
        ->toContain('<loc>https://baust.edu.bd/admission/admission-requirements</loc>')
        ->not->toContain('/about/academic-calendar<')
        ->not->toContain('admission-requirment')
        ->not->toContain('/archive/notices/<')
        ->not->toContain('/ce/gallery<')
        ->not->toContain('/ce/ce-society<');
});

test('moved pages 301 to their new URL and WordPress-only URLs are gone', function () {
    foreach (config('legacy-redirects.paths') as $old => $new) {
        $this->get('/'.$old)->assertStatus(301)->assertRedirect($new);
    }
    $this->get('/admission/admission-requirements')->assertOk();
    foreach (['/journal', '/journal/category/research', '/journal/2021/05/some-paper'] as $url) {
        $this->get($url)->assertStatus(301)->assertRedirect('https://journal.baust.edu.bd');
    }

    foreach (['/wp-login.php', '/wp-admin/', '/feed', '/cse/feed', '/tag/admission', '/author/admin', '/2021/05/10/some-post', '/wp-content/plugins/x/y.js'] as $url) {
        $this->get($url)->assertStatus(410);
    }
    $this->get('/no-such-page-at-all')->assertNotFound();
});
