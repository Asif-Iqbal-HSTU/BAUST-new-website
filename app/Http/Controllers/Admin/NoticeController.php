<?php
 
namespace App\Http\Controllers\Admin;
 
use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Notice;
use App\Models\NoticeCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class NoticeController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $query = Notice::query()->with('categories');

        if ($user->isDeptAdmin()) {
            $query->where('department', $user->department);
        } elseif ($user->isPro()) {
            $query->where(function ($q) {
                $q->whereNull('department')->orWhere('department', '')->orWhereHas('categories', function ($c) {
                    $c->whereIn('slug', Notice::PR_CATEGORY_SLUGS);
                });
            });
            if ($request->query('department')) {
                $query->where('department', $request->query('department'));
            }
        } elseif ($request->query('department')) {
            $query->where('department', $request->query('department'));
        }

        if ($request->query('search')) {
            $query->where('title', 'like', '%' . $request->query('search') . '%');
        }

        $notices = $query->with('pressCoverages')->latest('published_at')->paginate(20)->withQueryString();

        return Inertia::render('Admin/Notices/Index', [
            'notices' => $notices,
            'filters' => $request->only(['department', 'search']),
            'departments' => Department::orderBy('name')->get(['slug', 'name', 'short_name']),
        ]);
    }

    public function create()
    {
        $user = auth()->user();

        return Inertia::render('Admin/Notices/Form', [
            'notice' => null,
            'categories' => NoticeCategory::orderBy('order')->get(),
            'departments' => Department::orderBy('name')->get(['slug', 'name', 'short_name']),
            'prCategorySlugs' => Notice::PR_CATEGORY_SLUGS,
            'canPickDepartment' => $user->isSuperAdmin() || $user->isPro(),
        ]);
    }
 
    public function store(Request $request)
    {
        $user = auth()->user();

        $rules = [
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'is_pinned' => 'boolean',
            'is_active' => 'boolean',
            'published_at' => 'required|date',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:notice_categories,id',
            'attachment_file' => 'nullable|file|max:10240', // 10MB
            'attachment_url' => 'nullable|string',
            'coverages' => 'nullable|array',
            'coverages.*.newspaper_name' => 'required_with:coverages|string|max:255',
            'coverages.*.url' => 'nullable|string|max:2048',
            'coverages.*.clipping_file' => 'nullable|file|max:10240',
            'coverages.*.published_date' => 'nullable|date',
            'coverages.*.hardcopy_archive_page' => 'nullable|string|max:50',
            'coverages.*.remarks' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'chief_guest' => 'nullable|string|max:255',
            'special_guests' => 'nullable|string|max:255',
            'chairperson' => 'nullable|string|max:255',
            'press_release_no' => 'nullable|string|max:100|unique:notices,press_release_no',
        ];

        if ($user->isSuperAdmin() || $user->isPro()) {
            $rules['department'] = 'nullable|exists:departments,slug';
        }

        $validated = $request->validate($rules);

        if ($user->isPro() && !empty($validated['department'])) {
            $picksPrCategory = collect($validated['category_ids'] ?? [])
                ->intersect(NoticeCategory::whereIn('slug', Notice::PR_CATEGORY_SLUGS)->pluck('id'))
                ->isNotEmpty();

            if (!$picksPrCategory) {
                return back()->withErrors([
                    'category_ids' => 'Pick a News & Events / Upcoming Events / Achievements / Conferences category when scoping to a department.',
                ])->withInput();
            }
        }

        $data = $validated;
        unset($data['category_ids'], $data['attachment_file'], $data['attachment_url'], $data['coverages']);

        if ($user->isDeptAdmin()) {
            $data['department'] = $user->department;
        } elseif (($user->isSuperAdmin() || $user->isPro()) && empty($data['department'])) {
            $data['department'] = null;
        }

        // Auto generate slug
        $slugBase = Str::slug($validated['title']);
        $slug = $slugBase;
        $count = 1;
        while (Notice::where('slug', $slug)->exists()) {
            $slug = $slugBase . '-' . $count;
            $count++;
        }
        $data['slug'] = $slug;

        // Handle attachment
        if ($request->hasFile('attachment_file')) {
            $file = $request->file('attachment_file');
            $path = $file->store('notices', 'public');
            $data['attachment'] = '/storage/' . $path;
            $data['attachment_type'] = $file->getClientOriginalExtension();
        } elseif ($request->filled('attachment_url')) {
            $data['attachment'] = $validated['attachment_url'];
            $data['attachment_type'] = pathinfo($validated['attachment_url'], PATHINFO_EXTENSION) ?: 'url';
        }

        $data['author'] = $user->name;

        $notice = Notice::create($data);

        if (!empty($validated['category_ids'])) {
            $notice->categories()->sync($validated['category_ids']);
        }

        $this->syncCoverages($notice, $validated['coverages'] ?? []);

        return redirect()->route('admin.notices.index')->with('success', 'Notice created successfully.');
    }

    /**
     * Replace a notice's press coverage entries with the submitted list.
     * Existing clipping files are removed from disk before the row is dropped.
     */
    private function syncCoverages(Notice $notice, array $coverages): void
    {
        foreach ($notice->pressCoverages as $existing) {
            if ($existing->clipping_file && str_starts_with($existing->clipping_file, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $existing->clipping_file));
            }
        }
        $notice->pressCoverages()->delete();

        foreach (array_values($coverages) as $i => $coverage) {
            $hasFile = isset($coverage['clipping_file']) && $coverage['clipping_file'] instanceof \Illuminate\Http\UploadedFile;

            if (empty($coverage['newspaper_name']) || (empty($coverage['url']) && !$hasFile)) {
                continue;
            }

            $clippingPath = null;
            if ($hasFile) {
                $clippingPath = '/storage/' . $coverage['clipping_file']->store('press-coverage', 'public');
            }

            $notice->pressCoverages()->create([
                'newspaper_name' => $coverage['newspaper_name'],
                'url' => $coverage['url'] ?? null,
                'clipping_file' => $clippingPath,
                'published_date' => $coverage['published_date'] ?? null,
                'hardcopy_archive_page' => $coverage['hardcopy_archive_page'] ?? null,
                'remarks' => $coverage['remarks'] ?? null,
                'order' => $i,
            ]);
        }
    }
 
    public function edit(Notice $notice)
    {
        $user = auth()->user();

        if (!$user->canManageNotice($notice)) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Admin/Notices/Form', [
            'notice' => $notice->load(['categories', 'pressCoverages']),
            'categories' => NoticeCategory::orderBy('order')->get(),
            'departments' => Department::orderBy('name')->get(['slug', 'name', 'short_name']),
            'prCategorySlugs' => Notice::PR_CATEGORY_SLUGS,
            'canPickDepartment' => $user->isSuperAdmin() || $user->isPro(),
        ]);
    }

    public function update(Request $request, Notice $notice)
    {
        $user = auth()->user();

        if (!$user->canManageNotice($notice)) {
            abort(403, 'Unauthorized action.');
        }

        $rules = [
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'is_pinned' => 'boolean',
            'is_active' => 'boolean',
            'published_at' => 'required|date',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:notice_categories,id',
            'attachment_file' => 'nullable|file|max:10240',
            'attachment_url' => 'nullable|string',
            'coverages' => 'nullable|array',
            'coverages.*.newspaper_name' => 'required_with:coverages|string|max:255',
            'coverages.*.url' => 'nullable|string|max:2048',
            'coverages.*.clipping_file' => 'nullable|file|max:10240',
            'coverages.*.published_date' => 'nullable|date',
            'coverages.*.hardcopy_archive_page' => 'nullable|string|max:50',
            'coverages.*.remarks' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'chief_guest' => 'nullable|string|max:255',
            'special_guests' => 'nullable|string|max:255',
            'chairperson' => 'nullable|string|max:255',
            'press_release_no' => 'nullable|string|max:100|unique:notices,press_release_no,' . $notice->id,
        ];

        if ($user->isSuperAdmin() || $user->isPro()) {
            $rules['department'] = 'nullable|exists:departments,slug';
        }

        $validated = $request->validate($rules);

        if ($user->isPro() && !empty($validated['department'])) {
            $picksPrCategory = collect($validated['category_ids'] ?? [])
                ->intersect(NoticeCategory::whereIn('slug', Notice::PR_CATEGORY_SLUGS)->pluck('id'))
                ->isNotEmpty();

            if (!$picksPrCategory) {
                return back()->withErrors([
                    'category_ids' => 'Pick a News & Events / Upcoming Events / Achievements / Conferences category when scoping to a department.',
                ])->withInput();
            }
        }

        $data = $validated;
        unset($data['category_ids'], $data['attachment_file'], $data['attachment_url'], $data['coverages']);

        if ($user->isDeptAdmin()) {
            $data['department'] = $user->department;
        } elseif (($user->isSuperAdmin() || $user->isPro()) && empty($data['department'])) {
            $data['department'] = null;
        }

        // Regenerate slug if title changes
        if ($validated['title'] !== $notice->title) {
            $slugBase = Str::slug($validated['title']);
            $slug = $slugBase;
            $count = 1;
            while (Notice::where('slug', $slug)->where('id', '!=', $notice->id)->exists()) {
                $slug = $slugBase . '-' . $count;
                $count++;
            }
            $data['slug'] = $slug;
        }
 
        // Handle attachment
        if ($request->hasFile('attachment_file')) {
            // Delete old custom attachment if exists
            if ($notice->attachment && str_starts_with($notice->attachment, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $notice->attachment));
            }
            $file = $request->file('attachment_file');
            $path = $file->store('notices', 'public');
            $data['attachment'] = '/storage/' . $path;
            $data['attachment_type'] = $file->getClientOriginalExtension();
        } elseif ($request->filled('attachment_url')) {
            $data['attachment'] = $validated['attachment_url'];
            $data['attachment_type'] = pathinfo($validated['attachment_url'], PATHINFO_EXTENSION) ?: 'url';
        } elseif ($request->boolean('clear_attachment')) {
            if ($notice->attachment && str_starts_with($notice->attachment, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $notice->attachment));
            }
            $data['attachment'] = null;
            $data['attachment_type'] = null;
        }
 
        $notice->update($data);

        $notice->categories()->sync($validated['category_ids'] ?? []);
        $this->syncCoverages($notice, $validated['coverages'] ?? []);

        return redirect()->route('admin.notices.index')->with('success', 'Notice updated successfully.');
    }

    /**
     * Press Release Archive Register (policy §4.1): serial, date, title,
     * number of media that published it, media names, publication dates,
     * hardcopy archive page, and preservation remarks.
     */
    public function archiveRegister(Request $request)
    {
        $user = auth()->user();
        abort_unless($user->isSuperAdmin() || $user->isPro(), 403);

        $query = Notice::query()->with('pressCoverages')->has('pressCoverages');

        if ($request->query('search')) {
            $query->where('title', 'like', '%' . $request->query('search') . '%');
        }

        $entries = $query->latest('published_at')->paginate(25)->withQueryString();

        return Inertia::render('Admin/Notices/ArchiveRegister', [
            'entries' => $entries,
            'filters' => $request->only(['search']),
        ]);
    }

    public function destroy(Notice $notice)
    {
        $user = auth()->user();

        if (!$user->canManageNotice($notice)) {
            abort(403, 'Unauthorized action.');
        }
 
        if ($notice->attachment && str_starts_with($notice->attachment, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $notice->attachment));
        }
 
        $notice->categories()->detach();
        $notice->delete();
 
        return redirect()->route('admin.notices.index')->with('success', 'Notice deleted successfully.');
    }
}
