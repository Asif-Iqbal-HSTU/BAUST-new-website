<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaCoverageRequest;
use App\Models\Notice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MediaCoverageRequestController extends Controller
{
    private function baseRules(): array
    {
        return [
            'event_name' => 'required|string|max:255',
            'organizing_unit' => 'required|string|max:255',
            'purpose' => 'nullable|string',
            'event_date' => 'required|date',
            'event_time' => 'nullable|date_format:H:i',
            'location' => 'nullable|string|max:255',
            'chief_guest' => 'nullable|string|max:255',
            'chairperson' => 'nullable|string|max:255',
            'expected_participants' => 'nullable|integer|min:0',
            'contact_name' => 'required|string|max:255',
            'contact_designation' => 'nullable|string|max:255',
            'contact_mobile' => 'required|string|max:30',
            'coverage_press_release' => 'boolean',
            'coverage_facebook_post' => 'boolean',
            'coverage_media_send' => 'boolean',
            'coverage_other' => 'nullable|string|max:255',
            'special_instructions' => 'nullable|string',
        ];
    }

    public function index(Request $request)
    {
        $user = auth()->user();
        $isManager = $user->canManageMediaRequests();

        $query = MediaCoverageRequest::query()->with(['submittedBy:id,name,department', 'handledBy:id,name']);

        if (!$isManager) {
            $query->where('submitted_by', $user->id);
        } elseif ($request->query('status')) {
            $query->where('status', $request->query('status'));
        }

        $requests = $query->latest('event_date')->paginate(20)->withQueryString();

        return Inertia::render('Admin/MediaRequests/Index', [
            'requests' => $requests,
            'filters' => $request->only(['status']),
            'isManager' => $isManager,
        ]);
    }

    public function create()
    {
        $user = auth()->user();
        abort_unless($user->canSubmitMediaRequest() || $user->canManageMediaRequests(), 403);

        return Inertia::render('Admin/MediaRequests/Form', [
            'mediaRequest' => null,
            'isManager' => $user->canManageMediaRequests(),
            'defaultOrganizingUnit' => $user->isDeptAdmin() ? strtoupper($user->department ?? '') : null,
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        abort_unless($user->canSubmitMediaRequest() || $user->canManageMediaRequests(), 403);

        $validated = $request->validate($this->baseRules());
        $validated['submitted_by'] = $user->id;
        $validated['status'] = 'pending';

        MediaCoverageRequest::create($validated);

        return redirect()->route('admin.media-requests.index')->with('success', 'Media coverage request submitted to the PR Office.');
    }

    public function edit(MediaCoverageRequest $mediaRequest)
    {
        $user = auth()->user();
        $isManager = $user->canManageMediaRequests();
        abort_unless($isManager || $mediaRequest->submitted_by === $user->id, 403);

        return Inertia::render('Admin/MediaRequests/Form', [
            'mediaRequest' => $mediaRequest->load(['submittedBy:id,name,department', 'handledBy:id,name', 'notice:id,title,slug']),
            'isManager' => $isManager,
            'canEditBase' => $isManager || ($mediaRequest->submitted_by === $user->id && $mediaRequest->status === 'pending'),
            'prWorthyNotices' => $isManager
                ? Notice::active()->prWorthy()->latest('published_at')->limit(50)->get(['id', 'title', 'slug'])
                : [],
        ]);
    }

    public function update(Request $request, MediaCoverageRequest $mediaRequest)
    {
        $user = auth()->user();
        $isManager = $user->canManageMediaRequests();
        $isOwner = $mediaRequest->submitted_by === $user->id;
        abort_unless($isManager || $isOwner, 403);

        $data = [];

        if ($isManager || ($isOwner && $mediaRequest->status === 'pending')) {
            $data = $request->validate($this->baseRules());
        }

        if ($isManager) {
            $managerValidated = $request->validate([
                'status' => 'required|in:' . implode(',', MediaCoverageRequest::STATUSES),
                'receive_no' => 'nullable|string|max:50',
                'pr_remarks' => 'nullable|string',
                'notice_id' => 'nullable|exists:notices,id',
            ]);

            if (!empty($managerValidated['receive_no']) && empty($mediaRequest->receive_no)) {
                $mediaRequest->received_at = now();
                $mediaRequest->handled_by = $user->id;
            }

            $data = array_merge($data, $managerValidated);
        }

        $mediaRequest->update($data);

        return redirect()->route('admin.media-requests.index')->with('success', 'Media coverage request updated.');
    }

    /**
     * PR Office intake action: assigns a sequential receive number and marks
     * the request received (policy Appendix A, "PR office use only" table).
     */
    public function receive(MediaCoverageRequest $mediaRequest)
    {
        $user = auth()->user();
        abort_unless($user->canManageMediaRequests(), 403);

        if (empty($mediaRequest->receive_no)) {
            $year = now()->format('Y');
            $seq = DB::transaction(function () use ($year) {
                $count = MediaCoverageRequest::whereYear('created_at', $year)
                    ->whereNotNull('receive_no')
                    ->count();

                return $count + 1;
            });

            $mediaRequest->receive_no = sprintf('MCR-%s-%03d', $year, $seq);
            $mediaRequest->received_at = now();
            $mediaRequest->handled_by = $user->id;
        }

        if ($mediaRequest->status === 'pending') {
            $mediaRequest->status = 'received';
        }

        $mediaRequest->save();

        return back()->with('success', 'Request marked received: ' . $mediaRequest->receive_no);
    }

    public function destroy(MediaCoverageRequest $mediaRequest)
    {
        $user = auth()->user();
        $isManager = $user->canManageMediaRequests();
        $isOwner = $mediaRequest->submitted_by === $user->id && $mediaRequest->status === 'pending';
        abort_unless($isManager || $isOwner, 403);

        $mediaRequest->delete();

        return redirect()->route('admin.media-requests.index')->with('success', 'Media coverage request removed.');
    }
}
