<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\UpdateRequestNotification;
use App\Models\UpdateRequest;
use App\Models\UpdateRequestAttachment;
use App\Models\UpdateRequestComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

/**
 * Admins send update requests (what to change, where, why, with files) to the
 * developer; the super admin triages them and replies in a comment thread.
 */
class UpdateRequestController extends Controller
{
    /** Screenshots, photos, short videos and documents; files stay private. */
    private const FILE_RULE = 'file|max:51200|mimes:jpg,jpeg,png,gif,webp,svg,heic,mp4,mov,webm,avi,mkv,pdf,doc,docx,xls,xlsx,ppt,pptx,txt,csv,zip';

    public function index(Request $request)
    {
        $user = auth()->user();
        $base = UpdateRequest::query()->when(! $user->isSuperAdmin(), fn ($q) => $q->where('user_id', $user->id));

        $requests = (clone $base)
            ->with('user:id,name,email,role,department')
            ->withCount(['attachments', 'comments'])
            ->when($request->query('status') === 'open', fn ($q) => $q->open())
            ->when($request->query('status') && $request->query('status') !== 'open', fn ($q) => $q->where('status', $request->query('status')))
            ->when($request->query('type'), fn ($q) => $q->where('type', $request->query('type')))
            ->when($request->query('search'), fn ($q, $s) => $q->where(fn ($w) => $w->where('title', 'like', "%{$s}%")->orWhere('reference', 'like', "%{$s}%")->orWhere('page_url', 'like', "%{$s}%")))
            ->orderByRaw("CASE WHEN status IN ('".implode("','", UpdateRequest::OPEN_STATUSES)."') THEN 0 ELSE 1 END")
            ->orderByRaw("CASE priority WHEN 'urgent' THEN 0 WHEN 'high' THEN 1 WHEN 'normal' THEN 2 ELSE 3 END")
            ->latest()
            ->paginate(20)->withQueryString();

        return Inertia::render('Admin/UpdateRequests/Index', [
            'requests' => $requests,
            'counts' => (clone $base)->selectRaw('status, count(*) as total')->groupBy('status')->pluck('total', 'status'),
            'filters' => $request->only(['status', 'type', 'search']),
            'isDeveloper' => $user->isSuperAdmin(),
            ...$this->options(),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Admin/UpdateRequests/Create', [
            'prefill' => ['page_url' => (string) $request->query('page', '')],
            ...$this->options(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => ['required', Rule::in(array_keys(UpdateRequest::TYPES))],
            'priority' => ['required', Rule::in(array_keys(UpdateRequest::PRIORITIES))],
            'title' => 'required|string|max:255',
            'page_url' => 'nullable|string|max:1000',
            'location_detail' => 'nullable|string|max:500',
            'current_state' => 'nullable|string|max:20000',
            'requested_change' => 'required|string|max:20000',
            'reason' => 'nullable|string|max:20000',
            'needed_by' => 'nullable|date|after_or_equal:today',
            'attachments' => 'nullable|array|max:10',
            'attachments.*' => self::FILE_RULE,
        ], [
            'requested_change.required' => 'Please describe what should be changed.',
            'attachments.*.max' => 'Each file can be at most 50 MB.',
            'attachments.*.mimes' => 'Files can be images, videos, PDFs, Office documents, text/CSV or ZIP.',
        ]);

        $updateRequest = UpdateRequest::create(collect($data)->except('attachments')->all() + [
            'user_id' => auth()->id(),
            'status' => 'submitted',
        ]);
        $this->storeFiles($request->file('attachments', []), $updateRequest);
        $this->notify($updateRequest);

        return redirect()->route('admin.update-requests.show', $updateRequest)
            ->with('success', "Request {$updateRequest->reference} sent to the developer.");
    }

    public function show(UpdateRequest $updateRequest)
    {
        $this->authorizeView($updateRequest);

        return Inertia::render('Admin/UpdateRequests/Show', [
            'request' => $updateRequest->load([
                'user:id,name,email,role,department',
                'attachments',
                'comments.user:id,name,role',
                'comments.attachments',
            ]),
            'isDeveloper' => auth()->user()->isSuperAdmin(),
            'canWithdraw' => $this->canWithdraw($updateRequest),
            ...$this->options(),
        ]);
    }

    /** Reply in the thread (either side), optionally with files. */
    public function comment(Request $request, UpdateRequest $updateRequest)
    {
        $this->authorizeView($updateRequest);
        $request->validate([
            'body' => 'required|string|max:20000',
            'attachments' => 'nullable|array|max:10',
            'attachments.*' => self::FILE_RULE,
        ]);

        $comment = $updateRequest->comments()->create(['user_id' => auth()->id(), 'body' => $request->input('body')]);
        $this->storeFiles($request->file('attachments', []), $updateRequest, $comment);

        // The developer's own replies come from the website mailbox's side already.
        if (! auth()->user()->isSuperAdmin()) {
            $this->notify($updateRequest, $comment);
        }

        // The requester answered the developer's question: back to the developer.
        if ($updateRequest->status === 'needs_info' && $updateRequest->user_id === auth()->id()) {
            $updateRequest->update(['status' => 'in_review']);
            $comment->update(['status_change' => 'in_review']);
        }
        $updateRequest->touch();

        return back()->with('success', 'Reply added.');
    }

    /** Developer only: move the request along and leave a response for the requester. */
    public function updateStatus(Request $request, UpdateRequest $updateRequest)
    {
        abort_unless(auth()->user()->isSuperAdmin(), 403);
        $data = $request->validate([
            'status' => ['required', Rule::in(array_keys(UpdateRequest::STATUSES))],
            'developer_note' => 'nullable|string|max:20000',
        ]);

        $changed = $data['status'] !== $updateRequest->status;
        $updateRequest->update([
            'status' => $data['status'],
            'developer_note' => $data['developer_note'] ?? $updateRequest->developer_note,
            'resolved_at' => in_array($data['status'], ['done', 'declined'], true) ? ($updateRequest->resolved_at ?? now()) : null,
        ]);

        if ($changed || filled($data['developer_note'] ?? null)) {
            $updateRequest->comments()->create([
                'user_id' => auth()->id(),
                'body' => filled($data['developer_note'] ?? null) ? $data['developer_note'] : 'Status changed to '.UpdateRequest::STATUSES[$data['status']].'.',
                'status_change' => $changed ? $data['status'] : null,
            ]);
        }

        return back()->with('success', 'Request updated.');
    }

    /** The requester withdraws a request the developer hasn't started; the developer can delete any. */
    public function destroy(UpdateRequest $updateRequest)
    {
        abort_unless($this->canWithdraw($updateRequest), 403);

        foreach (UpdateRequestAttachment::where('update_request_id', $updateRequest->id)->get() as $file) {
            Storage::disk('local')->delete($file->path);
        }
        $updateRequest->delete();

        return redirect()->route('admin.update-requests.index')->with('success', 'Request withdrawn.');
    }

    /** Attachments are private: only the requester and the developer can open them. */
    public function attachment(UpdateRequestAttachment $attachment)
    {
        $this->authorizeView(UpdateRequest::findOrFail($attachment->update_request_id));
        abort_unless(Storage::disk('local')->exists($attachment->path), 404);

        $inline = $attachment->is_image || $attachment->is_video || $attachment->mime === 'application/pdf';

        return $inline
            ? Storage::disk('local')->response($attachment->path, $attachment->original_name)
            : Storage::disk('local')->download($attachment->path, $attachment->original_name);
    }

    private function storeFiles(array $files, UpdateRequest $updateRequest, ?UpdateRequestComment $comment = null): void
    {
        foreach ($files as $file) {
            UpdateRequestAttachment::create([
                'update_request_id' => $updateRequest->id,
                'update_request_comment_id' => $comment?->id,
                'path' => $file->store("update-requests/{$updateRequest->id}", 'local'),
                'original_name' => $file->getClientOriginalName(),
                'mime' => $file->getMimeType(),
                'size' => $file->getSize(),
            ]);
        }
    }

    /** Emails the request (or a reply) to the website mailbox; never blocks the save. */
    private function notify(UpdateRequest $updateRequest, ?UpdateRequestComment $comment = null): void
    {
        try {
            Mail::to(config('mail.recipients.update_requests'))->queue(new UpdateRequestNotification($updateRequest, $comment));
        } catch (\Throwable $e) {
            report($e);
        }
    }

    private function authorizeView(UpdateRequest $updateRequest): void
    {
        $user = auth()->user();
        abort_unless($user->isSuperAdmin() || $updateRequest->user_id === $user->id, 403);
    }

    private function canWithdraw(UpdateRequest $updateRequest): bool
    {
        $user = auth()->user();

        return $user->isSuperAdmin() || ($updateRequest->user_id === $user->id && $updateRequest->status === 'submitted');
    }

    private function options(): array
    {
        return [
            'types' => UpdateRequest::TYPES,
            'priorities' => UpdateRequest::PRIORITIES,
            'statuses' => UpdateRequest::STATUSES,
        ];
    }
}
