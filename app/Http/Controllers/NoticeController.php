<?php

namespace App\Http\Controllers;

use App\Models\Notice;
use App\Models\NoticeCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoticeController extends Controller
{
    /**
     * Main archive page: shows all notices with optional category filter.
     */
    public function index(Request $request)
    {
        $categorySlug = $request->query('category');
        $search = $request->query('search');
        $department = $request->query('department');

        $query = Notice::active()
            ->with('categories')
            ->latest('published_at');

        if ($categorySlug) {
            $query->inCategory($categorySlug);
        }

        if ($department) {
            $query->forDepartment($department);
        }

        if ($search) {
            $query->where('title', 'like', "%{$search}%");
        }

        $notices = $query->paginate(20)->withQueryString();

        $categories = NoticeCategory::withCount('notices')
            ->orderBy('order')
            ->having('notices_count', '>', 0)
            ->get();

        $activeCategory = $categorySlug
            ? NoticeCategory::where('slug', $categorySlug)->first()
            : null;

        return Inertia::render('Archive/Notices', [
            'notices' => $notices,
            'categories' => $categories,
            'activeCategory' => $activeCategory,
            'search' => $search,
        ]);
    }

    /**
     * Single notice detail page.
     */
    public function show(Request $request, string $slug)
    {
        $notice = Notice::where('slug', $slug)
            ->with(['categories', 'pressCoverages'])
            ->firstOrFail();

        if (($request->query('dept') === 'cse' || $request->query('from') === 'cse') || ($notice->department === 'cse' && $request->has('dept'))) {
            return redirect()->route('academic.cse.events.show', ['slug' => $slug]);
        }

        $relatedNotices = Notice::active()
            ->where('id', '!=', $notice->id)
            ->whereHas('categories', function ($q) use ($notice) {
                $q->whereIn('notice_categories.id', $notice->categories->pluck('id'));
            })
            ->latest('published_at')
            ->take(5)
            ->get();

        return Inertia::render('Archive/NoticeDetail', [
            'notice' => $notice->load('categories'),
            'relatedNotices' => $relatedNotices,
        ]);
    }
}
