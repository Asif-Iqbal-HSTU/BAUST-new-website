<?php

use App\Models\Notice;
use App\Models\NoticeCategory;
use App\Models\SitePage;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

function sectionAdmin(string $section): User
{
    return User::factory()->create(['role' => SitePage::SECTIONS[$section]['role']]);
}

/** Public URL => content key for every page under the four menus. */
function sectionPages(): array
{
    return [
        '/administration/regulatory-bodies/board-of-trustees' => 'administration.board-of-trustees',
        '/administration/regulatory-bodies/syndicate-members' => 'administration.syndicate-members',
        '/administration/regulatory-bodies/academic-council' => 'administration.academic-council',
        '/administration/regulatory-bodies/finance-committee' => 'administration.finance-committee',
        '/administration/regulatory-bodies/discipline-committee' => 'administration.discipline-committee',
        '/facilities/library' => 'library.central-library',
        '/research' => 'research.research-publication',
        '/admission/apply-online-instruction' => 'admission.apply-online-instruction',
        '/admission/program-offering' => 'admission.offered-programs',
        '/admission/admission-requirment' => 'admission.admission-requirements',
        '/admission/admission-procedure' => 'admission.admission-procedure',
        '/admission/tuition-fees' => 'admission.tuition-fees',
        '/admission/waiver-and-financial-aid' => 'admission.waiver-and-financial-aid',
        '/admission/tuition-fee-payment-procedure' => 'admission.payment-procedure',
        '/admission/dress-code' => 'admission.dress-code',
        '/admission/credit-transfer-policy' => 'admission.credit-transfer-policy',
        '/admission/cancel-policy' => 'admission.cancel-policy',
        '/admission/academic-calendar' => 'admission.academic-calendar',
        '/about/academic-calendar' => 'admission.academic-calendar',
    ];
}

test('every page under the four menus ships content and renders it', function () {
    foreach (sectionPages() as $url => $key) {
        $defaults = SitePage::defaults($key);
        expect($defaults)->not->toBeNull("missing database/data/site_pages/{$key}.json")
            ->and($defaults['content'] ?? [])->not->toBeEmpty();

        $this->get($url)->assertOk()->assertInertia(fn ($page) => $page->where('content', $defaults['content']));
    }
    expect(SitePage::count())->toBe(count(array_unique(sectionPages())));
});

test('each section admin edits only their own section\'s pages', function () {
    $expected = ['administration' => 5, 'library' => 1, 'research' => 1, 'admission' => 11];

    foreach ($expected as $section => $count) {
        $admin = sectionAdmin($section);
        $this->actingAs($admin)->get('/admin/site-pages')->assertOk()
            ->assertInertia(fn ($page) => $page->has('pages', $count)
                ->where('pages', fn ($pages) => collect($pages)->every(fn ($p) => $p['section'] === $section)));
    }

    $this->actingAs(sectionAdmin('library'))->get('/admin/site-pages/admission.tuition-fees')->assertForbidden();
    $this->actingAs(sectionAdmin('admission'))->post('/admin/site-pages/library.central-library', ['content' => '{}'])->assertForbidden();
    $this->actingAs(User::factory()->create(['role' => 'dept_admin', 'department' => 'cse']))->get('/admin/site-pages')->assertForbidden();
    $this->actingAs(User::factory()->create(['role' => 'super_admin']))->get('/admin/site-pages')->assertOk()
        ->assertInertia(fn ($page) => $page->has('pages', 18));
});

test('saving changes the live page and restore brings back the original', function () {
    $admin = sectionAdmin('administration');
    $key = 'administration.finance-committee';
    $content = SitePage::contentFor($key);
    $content['hero']['title'] = 'Finance Committee (edited)';

    $this->actingAs($admin)->get("/admin/site-pages/{$key}")->assertOk()
        ->assertInertia(fn ($page) => $page->where('page.key', $key)->has('defaults')->where('publicUrl', '/administration/regulatory-bodies/finance-committee'));

    $this->actingAs($admin)->post("/admin/site-pages/{$key}", ['content' => json_encode($content)])->assertRedirect();
    $this->get('/administration/regulatory-bodies/finance-committee')
        ->assertInertia(fn ($page) => $page->where('content.hero.title', 'Finance Committee (edited)'));
    expect(SitePage::where('key', $key)->value('updated_by'))->toBe($admin->id);

    $this->actingAs($admin)->post("/admin/site-pages/{$key}", ['content' => 'not json'])->assertSessionHasErrors('content');

    $this->actingAs($admin)->post("/admin/site-pages/{$key}/reset")->assertRedirect();
    expect(SitePage::contentFor($key))->toBe(SitePage::defaults($key)['content']);
});

test('section admins upload images and documents for their pages', function () {
    Storage::fake('public');

    $this->actingAs(sectionAdmin('research'))
        ->post('/admin/site-pages/research.research-publication/upload', ['file' => UploadedFile::fake()->create('newsletter.pdf', 200, 'application/pdf')])
        ->assertOk()->assertJsonPath('path', fn ($path) => str_starts_with($path, '/storage/site-pages/research/'));

    $this->actingAs(sectionAdmin('research'))
        ->post('/admin/site-pages/research.research-publication/upload', ['file' => UploadedFile::fake()->create('script.php', 1, 'text/x-php')])
        ->assertSessionHasErrors('file');
});

test('section admins manage their offices\' staff lists', function () {
    $administration = sectionAdmin('administration');
    $this->actingAs($administration)->get('/admin/offices')->assertOk()
        ->assertInertia(fn ($page) => $page->where('offices', fn ($o) => collect($o)->pluck('slug')->contains('registrar') && ! collect($o)->pluck('slug')->contains('fece')));
    $this->actingAs($administration)->get('/admin/offices/registrar')->assertOk();
    $this->actingAs($administration)->get('/admin/offices/fece')->assertForbidden();

    $this->actingAs(sectionAdmin('library'))->get('/admin/offices/librarian')->assertOk();
    $this->actingAs(sectionAdmin('library'))->get('/admin/offices/registrar')->assertForbidden();
    $this->actingAs(sectionAdmin('admission'))->get('/admin/offices/admission-office')->assertOk();
    $this->actingAs(sectionAdmin('research'))->get('/admin/offices')->assertForbidden();
});

test('the admission admin publishes admission notices only', function () {
    $category = NoticeCategory::firstOrCreate(['slug' => 'admission-notice'], ['name' => 'Admission Notice', 'order' => 1]);
    $other = NoticeCategory::firstOrCreate(['slug' => 'job-notice'], ['name' => 'Job Notice', 'order' => 2]);
    $admin = sectionAdmin('admission');

    $this->actingAs($admin)->post('/admin/notices', [
        'title' => 'Spring admission circular', 'published_at' => now()->toDateTimeString(),
        'category_ids' => [$other->id], 'department' => 'cse',
    ])->assertRedirect();

    $notice = Notice::where('title', 'Spring admission circular')->firstOrFail();
    expect($notice->department)->toBeNull()
        ->and($notice->categories()->pluck('slug')->all())->toBe(['admission-notice'])
        ->and($admin->canManageNotice($notice))->toBeTrue();

    $jobNotice = Notice::create(['title' => 'Job', 'slug' => 'job', 'published_at' => now(), 'is_active' => true]);
    $jobNotice->categories()->sync([$other->id]);
    expect($admin->canManageNotice($jobNotice))->toBeFalse();
    $this->actingAs($admin)->get("/admin/notices/{$jobNotice->id}/edit")->assertForbidden();
});

test('the section admin accounts are created with passwords shown once', function () {
    $this->artisan('admins:create-section-admins')->assertSuccessful();

    foreach (['administration', 'library', 'research', 'admission'] as $section) {
        $user = User::where('email', "{$section}.admin@baust.edu.bd")->firstOrFail();
        expect($user->role)->toBe(SitePage::SECTIONS[$section]['role'])->and($user->managedSections())->toBe([$section]);
    }

    $hash = User::where('email', 'library.admin@baust.edu.bd')->value('password');
    $this->artisan('admins:create-section-admins')->assertSuccessful();
    expect(User::where('email', 'library.admin@baust.edu.bd')->value('password'))->toBe($hash);
});
