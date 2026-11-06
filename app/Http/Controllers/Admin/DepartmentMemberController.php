<?php
 
namespace App\Http\Controllers\Admin;
 
use App\Http\Controllers\Controller;
use App\Models\DepartmentMember;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
 
class DepartmentMemberController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $query = DepartmentMember::query();

        if ($user->isDeptAdmin()) {
            // Their department, plus any program of their faculty (e.g. MBA).
            $manageable = $user->manageableDepartmentSlugs();
            $picked = $request->query('department');
            // One department at a time (default: their own) so the list can be drag-reordered.
            $query->where('department', in_array($picked, $manageable, true) ? $picked : $user->department);
            $isSingleDept = true;
        } else {
            if ($request->query('department')) {
                $query->where('department', $request->query('department'));
            }
            $isSingleDept = $request->filled('department');
        }

        $perPage = (int)$request->query('per_page', $isSingleDept ? 100 : 25);
        $members = $query->orderBy('department')->orderBy('order')->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Members/Index', [
            'members' => $members,
            'filters' => $request->only(['department']),
            'isSingleDept' => $isSingleDept,
        ]);
    }

    /** Departments offered in the member form: all for super admin, the managed ones for a focal point. */
    private function departmentOptions()
    {
        $user = auth()->user();
        $query = \App\Models\Department::orderBy('name');
        if ($user->isDeptAdmin()) {
            $query->whereIn('slug', $user->manageableDepartmentSlugs());
        }

        return $query->get(['name', 'short_name', 'slug']);
    }

    /** A focal point may file a member under any department they manage; default is their own. */
    private function departmentFor($user, Request $request): string
    {
        $picked = $request->input('department');

        return in_array($picked, $user->manageableDepartmentSlugs(), true) ? $picked : $user->department;
    }

    public function reorder(Request $request)
    {
        $user = auth()->user();
        $validated = $request->validate([
            'ordered_ids' => 'nullable|array',
            'ordered_ids.*' => 'integer|exists:department_members,id',
            'orders' => 'nullable|array',
            'orders.*.id' => 'required_with:orders|integer|exists:department_members,id',
            'orders.*.order' => 'required_with:orders|integer',
        ]);

        \DB::transaction(function () use ($validated, $user) {
            if (!empty($validated['ordered_ids'])) {
                foreach ($validated['ordered_ids'] as $index => $id) {
                    $query = DepartmentMember::where('id', $id);
                    if ($user->isDeptAdmin()) {
                        $query->whereIn('department', $user->manageableDepartmentSlugs());
                    }
                    $query->update(['order' => $index + 1]);
                }
            } elseif (!empty($validated['orders'])) {
                foreach ($validated['orders'] as $item) {
                    $query = DepartmentMember::where('id', $item['id']);
                    if ($user->isDeptAdmin()) {
                        $query->whereIn('department', $user->manageableDepartmentSlugs());
                    }
                    $query->update(['order' => $item['order']]);
                }
            }
        });

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Members reordered successfully.']);
        }

        return back()->with('success', 'Members reordered successfully.');
    }
 
    public function create()
    {
        $departments = $this->departmentOptions();

        return Inertia::render('Admin/Members/Form', [
            'member' => null,
            'departments' => $departments,
        ]);
    }
 
    public function store(Request $request)
    {
        $user = auth()->user();
 
        $rawStatus = strtolower(trim((string)$request->input('status', 'active')));
        if (in_array($rawStatus, ['ex', 'ex_faculty', 'ex_officer', 'ex_member', 'ex-member', 'ex-faculty', 'former', 'inactive'])) {
            $request->merge(['status' => 'ex_faculty']);
        } elseif (in_array($rawStatus, ['study_leave', 'leave', 'study-leave'])) {
            $request->merge(['status' => 'study_leave']);
        } elseif (in_array($rawStatus, ['maternity_leave', 'maternity-leave', 'maternity'])) {
            $request->merge(['status' => 'maternity_leave']);
        } else {
            $request->merge(['status' => 'active']);
        }

        // Clean & normalize personal_email (supports multiple comma/array emails)
        if ($request->has('personal_email')) {
            $val = $request->input('personal_email');
            if (is_array($val)) {
                $cleaned = array_filter(array_map('trim', $val));
                $request->merge(['personal_email' => !empty($cleaned) ? implode(', ', $cleaned) : null]);
            } elseif (is_string($val)) {
                $parts = preg_split('/[,;\n]+/', $val);
                $cleaned = array_filter(array_map('trim', $parts));
                $request->merge(['personal_email' => !empty($cleaned) ? implode(', ', $cleaned) : null]);
            }
        }

        // Clean & normalize phone (supports multiple tagged numbers or array of objects)
        if ($request->has('phone')) {
            $val = $request->input('phone');
            if (is_array($val)) {
                $cleaned = [];
                foreach ($val as $item) {
                    if (is_array($item) && !empty($item['number'])) {
                        $num = trim($item['number']);
                        $tag = !empty($item['tag']) ? trim($item['tag']) : '';
                        $cleaned[] = $tag ? "{$num} ({$tag})" : $num;
                    } elseif (is_string($item) && trim($item)) {
                        $cleaned[] = trim($item);
                    }
                }
                $request->merge(['phone' => !empty($cleaned) ? implode(', ', $cleaned) : null]);
            } elseif (is_string($val)) {
                $request->merge(['phone' => trim($val) ?: null]);
            }
        }

        // Clean & normalize areas_of_interest
        if ($request->has('areas_of_interest')) {
            $rawAreas = $request->input('areas_of_interest');
            if (is_string($rawAreas)) {
                if (str_starts_with(trim($rawAreas), '[') && str_ends_with(trim($rawAreas), ']')) {
                    $decoded = json_decode($rawAreas, true);
                    $rawAreas = is_array($decoded) ? $decoded : preg_split('/[,;\n]+/', $rawAreas);
                } else {
                    $rawAreas = preg_split('/[,;\n]+/', $rawAreas);
                }
            }
            if (is_array($rawAreas)) {
                $cleaned = array_values(array_unique(array_filter(array_map(function($item) {
                    return trim(str_replace(['[', ']', '"', "'"], '', (string)$item));
                }, $rawAreas))));
                $request->merge(['areas_of_interest' => $cleaned]);
            }
        }

        $rules = [
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'phone' => 'nullable|string|max:500',
            'email' => 'nullable|email|max:255',
            'personal_email' => 'nullable|string|max:500',
            'education' => 'nullable|array',
            'type' => 'required|in:permanent,contractual,adjunct',
            'employment_type' => 'required|in:faculty,staff',
            'status' => 'required|in:active,study_leave,maternity_leave,ex_faculty',
            'category' => 'nullable|string',
            'is_head' => 'nullable|boolean',
            'biography' => 'nullable|string',
            'experience' => 'nullable|string',
            'research' => 'nullable|string',
            'publications' => 'nullable|string',
            'achievements' => 'nullable|string',
            'seminars' => 'nullable|string',
            'training' => 'nullable|string',
            'others' => 'nullable|string',
            'specialization' => 'nullable|string|max:255',
            'areas_of_interest' => 'nullable|array',
            'order' => 'nullable|integer',
            'photo_file' => 'nullable|image|max:2048',
            'photo_url' => 'nullable|string',
        ];
 
        if ($user->isSuperAdmin()) {
            $rules['department'] = 'required|exists:departments,slug';
        }
 
        $validated = $request->validate($rules);
 
        $data = $validated;
        unset($data['photo_file']);
        unset($data['photo_url']);
 
        // Force department if dept_admin
        if ($user->isDeptAdmin()) {
            $data['department'] = $this->departmentFor($user, $request);
        }
 
        $data['education'] = $validated['education'] ?? [];
        $data['areas_of_interest'] = $validated['areas_of_interest'] ?? [];
        $data['is_head'] = $request->boolean('is_head');

        // Photo upload handling
        if ($request->hasFile('photo_file')) {
            $path = $request->file('photo_file')->store('members', 'public');
            $data['photo'] = '/storage/' . $path;
        } elseif ($request->filled('photo_url')) {
            $data['photo'] = $validated['photo_url'];
        } else {
            $data['photo'] = null;
        }
 
        // New members go to the end; the list is reordered by drag and drop.
        $data['order'] ??= (int) DepartmentMember::where('department', $data['department'])->max('order') + 1;

        DepartmentMember::create($data);
 
        return redirect()->route('admin.members.index')->with('success', 'Department member added successfully.');
    }
 
    public function show(DepartmentMember $member)
    {
        return redirect()->route('admin.members.edit', $member);
    }

    public function edit(DepartmentMember $member)
    {
        $user = auth()->user();
 
        if (!$user->canManageDepartment($member->department)) {
            abort(403, 'Unauthorized action.');
        }

        $departments = $this->departmentOptions();
 
        return Inertia::render('Admin/Members/Form', [
            'member' => $member,
            'departments' => $departments,
        ]);
    }
 
    public function update(Request $request, DepartmentMember $member)
    {
        $user = auth()->user();
 
        if (!$user->canManageDepartment($member->department)) {
            abort(403, 'Unauthorized action.');
        }

        $rawStatus = strtolower(trim((string)$request->input('status', 'active')));
        if (in_array($rawStatus, ['ex', 'ex_faculty', 'ex_officer', 'ex_member', 'ex-member', 'ex-faculty', 'former', 'inactive'])) {
            $request->merge(['status' => 'ex_faculty']);
        } elseif (in_array($rawStatus, ['study_leave', 'leave', 'study-leave'])) {
            $request->merge(['status' => 'study_leave']);
        } elseif (in_array($rawStatus, ['maternity_leave', 'maternity-leave', 'maternity'])) {
            $request->merge(['status' => 'maternity_leave']);
        } else {
            $request->merge(['status' => 'active']);
        }

        // Clean & normalize personal_email (supports multiple comma/array emails)
        if ($request->has('personal_email')) {
            $val = $request->input('personal_email');
            if (is_array($val)) {
                $cleaned = array_filter(array_map('trim', $val));
                $request->merge(['personal_email' => !empty($cleaned) ? implode(', ', $cleaned) : null]);
            } elseif (is_string($val)) {
                $parts = preg_split('/[,;\n]+/', $val);
                $cleaned = array_filter(array_map('trim', $parts));
                $request->merge(['personal_email' => !empty($cleaned) ? implode(', ', $cleaned) : null]);
            }
        }

        // Clean & normalize phone (supports multiple tagged numbers or array of objects)
        if ($request->has('phone')) {
            $val = $request->input('phone');
            if (is_array($val)) {
                $cleaned = [];
                foreach ($val as $item) {
                    if (is_array($item) && !empty($item['number'])) {
                        $num = trim($item['number']);
                        $tag = !empty($item['tag']) ? trim($item['tag']) : '';
                        $cleaned[] = $tag ? "{$num} ({$tag})" : $num;
                    } elseif (is_string($item) && trim($item)) {
                        $cleaned[] = trim($item);
                    }
                }
                $request->merge(['phone' => !empty($cleaned) ? implode(', ', $cleaned) : null]);
            } elseif (is_string($val)) {
                $request->merge(['phone' => trim($val) ?: null]);
            }
        }

        // Clean & normalize areas_of_interest
        if ($request->has('areas_of_interest')) {
            $rawAreas = $request->input('areas_of_interest');
            if (is_string($rawAreas)) {
                if (str_starts_with(trim($rawAreas), '[') && str_ends_with(trim($rawAreas), ']')) {
                    $decoded = json_decode($rawAreas, true);
                    $rawAreas = is_array($decoded) ? $decoded : preg_split('/[,;\n]+/', $rawAreas);
                } else {
                    $rawAreas = preg_split('/[,;\n]+/', $rawAreas);
                }
            }
            if (is_array($rawAreas)) {
                $cleaned = array_values(array_unique(array_filter(array_map(function($item) {
                    return trim(str_replace(['[', ']', '"', "'"], '', (string)$item));
                }, $rawAreas))));
                $request->merge(['areas_of_interest' => $cleaned]);
            }
        }

        $rules = [
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'phone' => 'nullable|string|max:500',
            'email' => 'nullable|email|max:255',
            'personal_email' => 'nullable|string|max:500',
            'education' => 'nullable|array',
            'type' => 'required|in:permanent,contractual,adjunct',
            'employment_type' => 'required|in:faculty,staff',
            'status' => 'required|in:active,study_leave,maternity_leave,ex_faculty',
            'category' => 'nullable|string',
            'is_head' => 'nullable|boolean',
            'biography' => 'nullable|string',
            'experience' => 'nullable|string',
            'research' => 'nullable|string',
            'publications' => 'nullable|string',
            'achievements' => 'nullable|string',
            'seminars' => 'nullable|string',
            'training' => 'nullable|string',
            'others' => 'nullable|string',
            'specialization' => 'nullable|string|max:255',
            'areas_of_interest' => 'nullable|array',
            'order' => 'nullable|integer',
            'photo_file' => 'nullable|image|max:2048',
            'photo_url' => 'nullable|string',
        ];
 
        if ($user->isSuperAdmin()) {
            $rules['department'] = 'required|exists:departments,slug';
        }
 
        $validated = $request->validate($rules);
 
        $data = $validated;
        unset($data['photo_file']);
        unset($data['photo_url']);
 
        if ($user->isDeptAdmin()) {
            $data['department'] = $this->departmentFor($user, $request);
        }
 
        $data['education'] = $validated['education'] ?? $member->education ?? [];
        $data['areas_of_interest'] = $validated['areas_of_interest'] ?? $member->areas_of_interest ?? [];
        $data['is_head'] = $request->boolean('is_head');

        if ($request->hasFile('photo_file')) {
            // Delete old custom photo if exists
            if ($member->photo && str_starts_with($member->photo, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $member->photo));
            }
            $path = $request->file('photo_file')->store('members', 'public');
            $data['photo'] = '/storage/' . $path;
        } elseif ($request->filled('photo_url')) {
            $data['photo'] = $validated['photo_url'];
        } elseif ($request->boolean('clear_photo')) {
            if ($member->photo && str_starts_with($member->photo, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $member->photo));
            }
            $data['photo'] = null;
        }
 
        if (! isset($data['order'])) {
            unset($data['order']);
        }

        $member->update($data);

        return redirect()->back()->with('success', 'Department member updated successfully.');
    }
 
    public function destroy(DepartmentMember $member)
    {
        $user = auth()->user();
 
        if (!$user->canManageDepartment($member->department)) {
            abort(403, 'Unauthorized action.');
        }
 
        if ($member->photo && str_starts_with($member->photo, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $member->photo));
        }
 
        $member->delete();
 
        return redirect()->route('admin.members.index')->with('success', 'Department member deleted successfully.');
    }
}
