<?php

use App\Models\UpdateRequest;
use App\Models\UpdateRequestAttachment;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

function requester(): User
{
    return User::factory()->create(['role' => 'dept_admin', 'department' => 'cse']);
}

function submitRequest(User $user, array $overrides = []): UpdateRequest
{
    test()->actingAs($user)->post('/admin/update-requests', $overrides + [
        'type' => 'content',
        'priority' => 'high',
        'title' => 'Replace the HOD photo',
        'page_url' => 'https://baust.edu.bd/cse',
        'location_detail' => 'Message from Head box',
        'current_state' => 'Old photo from 2022',
        'requested_change' => 'Use the attached new photo',
        'attachments' => [UploadedFile::fake()->create('new-hod.jpg', 120, 'image/jpeg')],
    ])->assertRedirect();

    return UpdateRequest::latest('id')->firstOrFail();
}

beforeEach(fn () => Storage::fake('local'));

test('any admin can send an update request with files', function () {
    foreach (['library_admin', 'pro', 'iqac_admin', 'admission_admin'] as $role) {
        $this->actingAs(User::factory()->create(['role' => $role]))->get('/admin/update-requests/create')->assertOk();
    }

    $user = requester();
    $request = submitRequest($user);

    expect($request->reference)->toMatch('/^UR-\d{4}-\d{4}$/')
        ->and($request->status)->toBe('submitted')
        ->and($request->user_id)->toBe($user->id)
        ->and($request->location_detail)->toBe('Message from Head box')
        ->and($request->attachments)->toHaveCount(1);
    Storage::disk('local')->assertExists($request->attachments->first()->path);

    $this->actingAs($user)->get("/admin/update-requests/{$request->id}")->assertOk()
        ->assertInertia(fn ($page) => $page->component('Admin/UpdateRequests/Show')->where('request.reference', $request->reference)->where('isDeveloper', false));
});

test('requests and their files are private to the requester and the developer', function () {
    $owner = requester();
    $request = submitRequest($owner);
    $file = $request->attachments->first();
    $other = User::factory()->create(['role' => 'dept_admin', 'department' => 'eee']);
    $developer = User::factory()->create(['role' => 'super_admin']);

    $this->actingAs($other)->get("/admin/update-requests/{$request->id}")->assertForbidden();
    $this->actingAs($other)->get("/admin/update-requests/attachments/{$file->id}")->assertForbidden();
    $this->actingAs($other)->get('/admin/update-requests')->assertInertia(fn ($page) => $page->has('requests.data', 0));

    $this->actingAs($owner)->get("/admin/update-requests/attachments/{$file->id}")->assertOk();
    $this->actingAs($developer)->get("/admin/update-requests/attachments/{$file->id}")->assertOk();
    $this->actingAs($developer)->get('/admin/update-requests?status=open')->assertInertia(fn ($page) => $page->has('requests.data', 1)->where('isDeveloper', true));
    auth()->guard('web')->logout();
    $this->get("/admin/update-requests/attachments/{$file->id}")->assertRedirect('/login');
});

test('the developer and the requester work through a request', function () {
    $owner = requester();
    $developer = User::factory()->create(['role' => 'super_admin']);
    $request = submitRequest($owner);

    $this->actingAs($owner)->post("/admin/update-requests/{$request->id}/status", ['status' => 'done'])->assertForbidden();

    $this->actingAs($developer)->post("/admin/update-requests/{$request->id}/status", [
        'status' => 'needs_info', 'developer_note' => 'Which size should the photo be?',
    ])->assertRedirect();
    expect($request->fresh()->status)->toBe('needs_info');

    $this->actingAs($owner)->post("/admin/update-requests/{$request->id}/comments", [
        'body' => 'Square, please. Here is a better crop.',
        'attachments' => [UploadedFile::fake()->create('crop.png', 80, 'image/png')],
    ])->assertRedirect();
    $request->refresh();
    expect($request->status)->toBe('in_review')
        ->and($request->comments)->toHaveCount(2)
        ->and(UpdateRequestAttachment::where('update_request_id', $request->id)->whereNotNull('update_request_comment_id')->count())->toBe(1);

    $this->actingAs($developer)->post("/admin/update-requests/{$request->id}/status", ['status' => 'done', 'developer_note' => 'Done, it is live.'])->assertRedirect();
    $request->refresh();
    expect($request->status)->toBe('done')->and($request->resolved_at)->not->toBeNull()->and($request->developer_note)->toBe('Done, it is live.');
});

test('a request can be withdrawn only before work starts, and bad files are refused', function () {
    $owner = requester();
    $request = submitRequest($owner);
    $this->actingAs($owner)->delete("/admin/update-requests/{$request->id}")->assertRedirect('/admin/update-requests');
    expect(UpdateRequest::find($request->id))->toBeNull();

    $started = submitRequest($owner);
    $started->update(['status' => 'in_progress']);
    $this->actingAs($owner)->delete("/admin/update-requests/{$started->id}")->assertForbidden();

    $this->actingAs($owner)->post('/admin/update-requests', [
        'type' => 'bug', 'priority' => 'urgent', 'title' => 'x', 'requested_change' => 'y',
        'attachments' => [UploadedFile::fake()->create('evil.php', 1, 'application/x-php')],
    ])->assertSessionHasErrors('attachments.0');

    $this->actingAs($owner)->post('/admin/update-requests', ['type' => 'nope', 'priority' => 'normal', 'title' => 'x', 'requested_change' => ''])
        ->assertSessionHasErrors(['type', 'requested_change']);
});

test('the developer sees open requests on the dashboard', function () {
    submitRequest(requester(), ['priority' => 'urgent']);

    $this->actingAs(User::factory()->create(['role' => 'super_admin']))->get('/dashboard')
        ->assertInertia(fn ($page) => $page->where('attention.0.level', 'danger')
            ->where('attention.0.text', fn ($t) => str_contains($t, '1 open update requests')));
});
