<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\DepartmentMember;
use App\Models\Notice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CseDepartmentController extends Controller
{
    public function index()
    {
        $dept = Department::where('slug', 'cse')
            ->with([
                'slides' => fn($q) => $q->orderBy('order'),
                'highlights' => fn($q) => $q->orderBy('order'),
                'stats' => fn($q) => $q->orderBy('order'),
            ])
            ->first();

        $head = DepartmentMember::where('department', 'cse')
            ->where('is_head', true)
            ->first();

        $faculty = DepartmentMember::where('department', 'cse')
            ->where('employment_type', 'faculty')
            ->where('status', 'active')
            ->orderBy('order')
            ->take(8)
            ->get();

        $notices = Notice::active()
            ->forDepartment('cse')
            ->latest('published_at')
            ->take(5)
            ->get();

        return Inertia::render('Academic/Cse/Index', [
            'department' => $dept,
            'slides' => $dept?->slides ?? [],
            'highlights' => $dept?->highlights ?? [],
            'stats' => $dept?->stats ?? [],
            'headOfDept' => $head,
            'facultyPreview' => $faculty,
            'notices' => $notices
        ]);
    }

    public function about()
    {
        $dept = Department::where('slug', 'cse')
            ->with(['stats' => fn($q) => $q->orderBy('order')])
            ->first();

        return Inertia::render('Academic/Cse/About', [
            'department' => $dept,
            'stats' => $dept?->stats ?? [],
        ]);
    }

    public function visionMission()
    {
        $dept = Department::where('slug', 'cse')->first();
        $peos = $dept ? $dept->obes()->where('type', 'peo')->where('is_active', true)->get() : [];
        $plos = $dept ? $dept->obes()->where('type', 'plo')->where('is_active', true)->get() : [];

        return Inertia::render('Academic/Cse/VisionMission', [
            'department' => $dept,
            'peos' => $peos,
            'plos' => $plos,
        ]);
    }

    public function faculty()
    {
        $members = DepartmentMember::where('department', 'cse')
            ->facultyVisible()
            ->orderBy('type', 'asc') // Permanent first, then adjunct/contractual
            ->orderBy('order', 'asc')
            ->get();

        return Inertia::render('Academic/Cse/Faculty', [
            'members' => $members
        ]);
    }

    public function academicStaff()
    {
        $staff = DepartmentMember::where('department', 'cse')
            ->staffVisible()
            ->orderBy('order')
            ->get();

        return Inertia::render('Academic/Cse/AcademicStaff', [
            'staff' => $staff
        ]);
    }

    public function curriculum()
    {
        $dept = Department::where('slug', 'cse')->first();
        $curricula = $dept ? $dept->curricula()->where('is_active', true)->get() : [];

        return Inertia::render('Academic/Cse/Curriculum', [
            'department' => $dept,
            'curricula' => $curricula,
        ]);
    }

    public function alumni()
    {
        $dept = Department::where('slug', 'cse')->first();
        $alumni = $dept ? $dept->societies()->where('type', 'alumni')->where('is_active', true)->first() : null;

        return Inertia::render('Academic/Cse/Alumni', [
            'department' => $dept,
            'alumni' => $alumni,
        ]);
    }

    public function events()
    {
        $events = Notice::active()
            ->forDepartment('cse')
            ->whereHas('categories', function($q) {
                $q->whereIn('slug', ['news-events', 'upcoming-events']);
            })
            ->latest('published_at')
            ->get();

        return Inertia::render('Academic/Cse/Events', [
            'events' => $events
        ]);
    }

    public function eventDetail($slug)
    {
        $event = Notice::active()
            ->where('slug', $slug)
            ->with(['categories', 'pressCoverages'])
            ->firstOrFail();

        $relatedEvents = Notice::active()
            ->forDepartment('cse')
            ->where('id', '!=', $event->id)
            ->latest('published_at')
            ->take(5)
            ->get();

        $department = Department::where('slug', 'cse')->first();

        return Inertia::render('Academic/Cse/EventDetail', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
            'department' => $department,
        ]);
    }

    public function achievements()
    {
        $dept = Department::where('slug', 'cse')->first();
        $achievements = $dept ? $dept->achievements()->where('is_active', true)->get() : [];

        return Inertia::render('Academic/Cse/Achievements', [
            'department' => $dept,
            'achievements' => $achievements,
        ]);
    }

    public function laboratory($slug)
    {
        $dept = Department::where('slug', 'cse')->first();
        $allLabs = $dept ? $dept->laboratories()->where('is_active', true)->get() : [];
        $lab = $allLabs->firstWhere('slug', $slug) ?: $allLabs->first();

        return Inertia::render('Academic/Cse/Laboratory', [
            'department' => $dept,
            'lab' => $lab,
            'allLabs' => $allLabs,
            'labSlug' => $slug,
        ]);
    }

    public function society()
    {
        $dept = Department::where('slug', 'cse')->first();
        $society = $dept ? $dept->societies()->where('slug', 'cse-society')->where('is_active', true)->first() : null;

        return Inertia::render('Academic/Cse/CseSociety', [
            'department' => $dept,
            'society' => $society,
        ]);
    }
}
