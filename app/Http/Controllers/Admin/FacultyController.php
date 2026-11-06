<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\OfficeMember;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FacultyController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Faculties/Index', [
            'faculties' => Faculty::orderBy('order')->get()->map(fn (Faculty $f) => [
                'id' => $f->id,
                'slug' => $f->slug,
                'code' => $f->code,
                'name' => $f->name,
                'office_name' => $f->office_name,
                'department_count' => count($f->department_slugs ?? []),
                'member_count' => OfficeMember::where('office', $f->slug)->count(),
            ]),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Faculties/Form', [
            'faculty' => null,
            'departments' => Department::orderBy('name')->get(['slug', 'name', 'short_name']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);

        $slugBase = Str::slug($data['slug'] ?: $data['code']);
        $slug = $slugBase;
        $count = 1;
        while (Faculty::where('slug', $slug)->exists()) {
            $slug = $slugBase.'-'.$count;
            $count++;
        }
        $data['slug'] = $slug;
        $data['order'] ??= (int) Faculty::max('order') + 1;

        Faculty::create($data);

        return redirect()->route('admin.faculties.index')->with('success', 'Faculty created successfully.');
    }

    /** Super admin, or a focal point of one of the faculty's departments (its Dean's page). */
    public function edit(Faculty $faculty)
    {
        abort_unless(auth()->user()->canManageFaculty($faculty->slug), 403);

        return Inertia::render('Admin/Faculties/Form', [
            'faculty' => $faculty,
            'departments' => Department::orderBy('name')->get(['slug', 'name', 'short_name']),
            'canEditStructure' => auth()->user()->isSuperAdmin(),
        ]);
    }

    public function update(Request $request, Faculty $faculty)
    {
        $user = auth()->user();
        abort_unless($user->canManageFaculty($faculty->slug), 403);

        $data = $this->validated($request, $faculty);
        $data['slug'] = $data['slug'] ?: $faculty->slug;
        if (! $user->isSuperAdmin()) {
            // The URL and which departments belong (and so who may edit) stay with the super admin.
            unset($data['slug'], $data['department_slugs']);
        }
        $faculty->update($data);

        return $user->isSuperAdmin()
            ? redirect()->route('admin.faculties.index')->with('success', 'Faculty updated successfully.')
            : back()->with('success', "Dean's page updated successfully.");
    }

    public function destroy(Faculty $faculty)
    {
        OfficeMember::where('office', $faculty->slug)->delete();
        $faculty->delete();

        return redirect()->route('admin.faculties.index')->with('success', 'Faculty deleted successfully.');
    }

    /** Save a drag-and-drop order: `ordered_ids` become order 1..n. */
    public function reorder(Request $request)
    {
        $ids = $request->validate(['ordered_ids' => 'required|array', 'ordered_ids.*' => 'integer'])['ordered_ids'];

        \DB::transaction(function () use ($ids) {
            foreach (array_values($ids) as $i => $id) {
                Faculty::whereKey($id)->update(['order' => $i + 1]);
            }
        });

        return back()->with('success', 'Order updated.');
    }

    private function validated(Request $request, ?Faculty $faculty = null): array
    {
        $slugRule = 'nullable|string|max:50|alpha_dash|unique:faculties,slug';
        if ($faculty) {
            $slugRule .= ','.$faculty->id;
        }

        $data = $request->validate([
            'slug' => $slugRule,
            'office_name' => 'required|string|max:255',
            'office_subtitle' => 'nullable|string|max:255',
            'code' => 'required|string|max:20',
            'name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'tagline' => 'nullable|string',
            'about' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|string|max:255',
            'department_slugs' => 'nullable|array',
            'department_slugs.*' => 'exists:departments,slug',
            'order' => 'nullable|integer',
        ]);

        if (! isset($data['order'])) {
            unset($data['order']); // ordering is done by drag and drop (reorder)
        }
        $data['department_slugs'] = $data['department_slugs'] ?? [];

        return $data;
    }
}
