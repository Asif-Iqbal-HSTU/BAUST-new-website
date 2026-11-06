<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OfficeMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfficeController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Offices/Index', [
            'offices' => collect(OfficeMember::offices())->filter(fn ($cfg, $slug) => auth()->user()->canManageOffice($slug))->map(fn ($cfg, $slug) => [
                'slug' => $slug,
                'name' => $cfg['name'],
                'count' => OfficeMember::where('office', $slug)->count(),
            ])->values(),
        ]);
    }

    public function manage(string $office)
    {
        $catalog = OfficeMember::offices();

        return Inertia::render('Admin/Offices/Manage', [
            'office' => ['slug' => $office, 'name' => $catalog[$office]['name'] ?? ucfirst($office)],
            'members' => OfficeMember::where('office', $office)->orderBy('tier')->orderBy('order')->get(),
        ]);
    }

    public function storeItem(Request $request, string $office)
    {
        $data = $this->validated($request);
        $data['office'] = $office;
        $data['order'] ??= (int) OfficeMember::where('office', $office)->where('tier', $data['tier'])->max('order') + 1;
        $this->applyPhoto($request, $data, null);
        OfficeMember::create($data);

        return back()->with('success', 'Member added.');
    }

    public function updateItem(Request $request, string $office, int $id)
    {
        $member = OfficeMember::where('office', $office)->findOrFail($id);
        $data = $this->validated($request);
        $this->applyPhoto($request, $data, $member);
        $member->update($data);

        return back()->with('success', 'Member updated.');
    }

    /** Save a drag-and-drop order within a tier: `ordered_ids` become order 1..n. */
    public function reorderItems(Request $request, string $office)
    {
        $ids = $request->validate(['ordered_ids' => 'required|array', 'ordered_ids.*' => 'integer'])['ordered_ids'];

        \DB::transaction(function () use ($ids, $office) {
            foreach (array_values($ids) as $i => $id) {
                OfficeMember::where('office', $office)->whereKey($id)->update(['order' => $i + 1]);
            }
        });

        return back()->with('success', 'Order updated.');
    }

    public function destroyItem(string $office, int $id)
    {
        OfficeMember::where('office', $office)->findOrFail($id)->delete();

        return back()->with('success', 'Member deleted.');
    }

    private function validated(Request $request): array
    {
        $v = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|string|max:500',
            'education' => 'nullable|string',
            'tier' => 'nullable|integer|min:1|max:4',
            'order' => 'nullable|integer',
            'photo_file' => 'nullable|image|max:2048',
            'photo_url' => 'nullable|string|max:500',
        ]);
        $edu = array_values(array_filter(array_map('trim', preg_split('/\r?\n/', $v['education'] ?? ''))));
        unset($v['photo_file'], $v['photo_url'], $v['education']);
        $v['education'] = $edu;
        $v['tier'] = $v['tier'] ?? 4;
        if (! isset($v['order'])) {
            unset($v['order']); // ordering is done by drag and drop (reorderItems)
        }

        return $v;
    }

    private function applyPhoto(Request $request, array &$data, ?OfficeMember $existing): void
    {
        if ($request->hasFile('photo_file')) {
            $data['photo'] = '/storage/'.$request->file('photo_file')->store('offices', 'public');
        } elseif ($request->filled('photo_url')) {
            $data['photo'] = $request->input('photo_url');
        } elseif ($existing) {
            $data['photo'] = $existing->photo;
        }
    }
}
