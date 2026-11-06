<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\DepartmentMember;
use App\Models\Notice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MeDepartmentController extends Controller
{
    public function index()
    {
        $dept = Department::where('slug', 'me')
            ->with([
                'slides' => fn($q) => $q->orderBy('order'),
                'highlights' => fn($q) => $q->orderBy('order'),
                'stats' => fn($q) => $q->orderBy('order'),
            ])
            ->first();

        $head = DepartmentMember::where('department', 'me')
            ->where('is_head', true)
            ->first();

        $faculty = DepartmentMember::where('department', 'me')
            ->where('employment_type', 'faculty')
            ->where('status', 'active')
            ->orderBy('order')
            ->take(8)
            ->get();

        $notices = Notice::active()
            ->forDepartment('me')
            ->latest('published_at')
            ->take(5)
            ->get();

        // Slides, highlights and stats reach the page through the eager-loaded `department` relations.
        return Inertia::render('Academic/Me/Index', [
            'department' => $dept,
            'headOfDept' => $head,
            'facultyPreview' => $faculty,
            'notices' => $notices,
        ]);
    }

    public function about()
    {
        $dept = Department::where('slug', 'me')
            ->with(['stats' => fn($q) => $q->orderBy('order')])
            ->first();

        return Inertia::render('Academic/Me/About', [
            'department' => $dept,
            'stats' => $dept?->stats ?? [],
        ]);
    }

    public function visionMission()
    {
        $dept = Department::where('slug', 'me')->first();
        $peos = $dept ? $dept->obes()->where('type', 'peo')->where('is_active', true)->orderBy('order')->get() : [];
        $plos = $dept ? $dept->obes()->where('type', 'plo')->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Me/VisionMission', [
            'department' => $dept,
            'peos' => $peos,
            'plos' => $plos,
        ]);
    }

    public function faculty()
    {
        $dept = Department::where('slug', 'me')->first();
        $members = DepartmentMember::where('department', 'me')
            ->facultyVisible()
            ->orderBy('type', 'asc') // Permanent first, then adjunct/contractual
            ->orderBy('order', 'asc')
            ->get();

        return Inertia::render('Academic/Me/Faculty', [
            'department' => $dept,
            'members' => $members,
        ]);
    }

    public function academicStaff()
    {
        $dept = Department::where('slug', 'me')->first();
        $staff = DepartmentMember::where('department', 'me')
            ->staffVisible()
            ->orderBy('order')
            ->get();

        return Inertia::render('Academic/Me/AcademicStaff', [
            'department' => $dept,
            'staff' => $staff,
        ]);
    }

    public function curriculum()
    {
        $dept = Department::where('slug', 'me')->first();
        $curricula = $dept ? $dept->curricula()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Me/Curriculum', [
            'department' => $dept,
            'curricula' => $curricula,
        ]);
    }

    public function alumni()
    {
        $dept = Department::where('slug', 'me')->first();
        $alumni = $dept ? $dept->societies()->where('type', 'alumni')->where('is_active', true)->orderBy('order')->first() : null;
        $alumniMembers = $dept ? $dept->alumni()->where('is_active', true)->get() : [];

        return Inertia::render('Academic/Me/Alumni', [
            'department' => $dept,
            'alumni' => $alumni,
            'alumniMembers' => $alumniMembers,
        ]);
    }

    public function events()
    {
        $dept = Department::where('slug', 'me')->first();
        $events = Notice::active()
            ->forDepartment('me')
            ->whereHas('categories', function($q) {
                $q->whereIn('slug', ['news-events', 'upcoming-events']);
            })
            ->latest('published_at')
            ->get();

        return Inertia::render('Academic/Me/Events', [
            'department' => $dept,
            'events' => $events,
        ]);
    }

    public function eventDetail($slug)
    {
        $event = Notice::active()
            ->forDepartment('me')
            ->where('slug', $slug)
            ->with(['categories', 'pressCoverages'])
            ->firstOrFail();

        $relatedEvents = Notice::active()
            ->forDepartment('me')
            ->where('id', '!=', $event->id)
            ->latest('published_at')
            ->take(5)
            ->get();

        $department = Department::where('slug', 'me')->first();

        return Inertia::render('Academic/Me/EventDetail', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
            'department' => $department,
        ]);
    }

    public function achievements()
    {
        $dept = Department::where('slug', 'me')->first();
        $achievements = $dept ? $dept->achievements()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Me/Achievements', [
            'department' => $dept,
            'achievements' => $achievements,
        ]);
    }

    public function laboratory($slug = null)
    {
        $dept = Department::where('slug', 'me')->first();
        $allLabs = $dept ? $dept->laboratories()->where('is_active', true)->orderBy('order')->get() : [];
        $lab = $slug ? collect($allLabs)->firstWhere('slug', $slug) : collect($allLabs)->first();
        abort_if($slug && ! $lab, 404);

        return Inertia::render('Academic/Me/Laboratory', [
            'department' => $dept,
            'lab' => $lab,
            'allLabs' => $allLabs,
            'labSlug' => $lab?->slug,
        ]);
    }

    public function society()
    {
        $dept = Department::where('slug', 'me')->first();
        $society = $dept ? $dept->societies()->whereIn('type', ['society', 'club'])->where('is_active', true)->orderBy('order')->first() : null;

        return Inertia::render('Academic/Me/MeSociety', [
            'department' => $dept,
            'society' => $society,
        ]);
    }

    public function onlineResources()
    {
        $dept = Department::where('slug', 'me')->first();
        $resources = $dept ? $dept->onlineResources()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Me/OnlineResources', [
            'department' => $dept,
            'resources' => $resources,
        ]);
    }
}
