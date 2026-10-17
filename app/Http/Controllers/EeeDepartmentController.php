<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\DepartmentMember;
use App\Models\Notice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EeeDepartmentController extends Controller
{
    public function index()
    {
        $dept = Department::where('slug', 'eee')
            ->with([
                'slides' => fn($q) => $q->orderBy('order'),
                'highlights' => fn($q) => $q->orderBy('order'),
                'stats' => fn($q) => $q->orderBy('order'),
            ])
            ->first();

        $head = DepartmentMember::where('department', 'eee')
            ->where('is_head', true)
            ->first();

        $faculty = DepartmentMember::where('department', 'eee')
            ->where('employment_type', 'faculty')
            ->where('status', 'active')
            ->orderBy('order')
            ->take(8)
            ->get();

        $notices = Notice::active()
            ->forDepartment('eee')
            ->latest('published_at')
            ->take(5)
            ->get();

        return Inertia::render('Academic/Eee/Index', [
            'department' => $dept,
            'slides' => $dept?->slides ?? [],
            'highlights' => $dept?->highlights ?? [],
            'stats' => $dept?->stats ?? [],
            'headOfDept' => $head,
            'facultyPreview' => $faculty,
            'notices' => $notices,
        ]);
    }

    public function about()
    {
        $dept = Department::where('slug', 'eee')
            ->with(['stats' => fn($q) => $q->orderBy('order')])
            ->first();

        return Inertia::render('Academic/Eee/About', [
            'department' => $dept,
            'stats' => $dept?->stats ?? [],
        ]);
    }

    public function visionMission()
    {
        $dept = Department::where('slug', 'eee')->first();
        $peos = $dept ? $dept->obes()->where('type', 'peo')->where('is_active', true)->orderBy('order')->get() : [];
        $plos = $dept ? $dept->obes()->where('type', 'plo')->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Eee/VisionMission', [
            'department' => $dept,
            'peos' => $peos,
            'plos' => $plos,
        ]);
    }

    public function faculty()
    {
        $dept = Department::where('slug', 'eee')->first();
        $members = DepartmentMember::where('department', 'eee')
            ->facultyVisible()
            ->orderBy('type', 'asc') // Permanent first, then adjunct/contractual
            ->orderBy('order', 'asc')
            ->get();

        return Inertia::render('Academic/Eee/Faculty', [
            'department' => $dept,
            'members' => $members,
        ]);
    }

    public function academicStaff()
    {
        $dept = Department::where('slug', 'eee')->first();
        $staff = DepartmentMember::where('department', 'eee')
            ->staffVisible()
            ->orderBy('order')
            ->get();

        return Inertia::render('Academic/Eee/AcademicStaff', [
            'department' => $dept,
            'staff' => $staff,
        ]);
    }

    public function curriculum()
    {
        $dept = Department::where('slug', 'eee')->first();
        $curricula = $dept ? $dept->curricula()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Eee/Curriculum', [
            'department' => $dept,
            'curricula' => $curricula,
        ]);
    }

    public function alumni()
    {
        $dept = Department::where('slug', 'eee')->first();
        $alumni = $dept ? $dept->societies()->where('type', 'alumni')->where('is_active', true)->first() : null;

        return Inertia::render('Academic/Eee/Alumni', [
            'department' => $dept,
            'alumni' => $alumni,
        ]);
    }

    public function events()
    {
        $dept = Department::where('slug', 'eee')->first();
        $events = Notice::active()
            ->forDepartment('eee')
            ->whereHas('categories', function($q) {
                $q->whereIn('slug', ['news-events', 'upcoming-events']);
            })
            ->latest('published_at')
            ->get();

        return Inertia::render('Academic/Eee/Events', [
            'department' => $dept,
            'events' => $events,
        ]);
    }

    public function eventDetail($slug)
    {
        $event = Notice::active()
            ->where('slug', $slug)
            ->with(['categories', 'pressCoverages'])
            ->firstOrFail();

        $relatedEvents = Notice::active()
            ->forDepartment('eee')
            ->where('id', '!=', $event->id)
            ->latest('published_at')
            ->take(5)
            ->get();

        $department = Department::where('slug', 'eee')->first();

        return Inertia::render('Academic/Eee/EventDetail', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
            'department' => $department,
        ]);
    }

    public function achievements()
    {
        $dept = Department::where('slug', 'eee')->first();
        $achievements = $dept ? $dept->achievements()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Eee/Achievements', [
            'department' => $dept,
            'achievements' => $achievements,
        ]);
    }

    public function laboratory($slug = null)
    {
        $dept = Department::where('slug', 'eee')->first();
        $allLabs = $dept ? $dept->laboratories()->where('is_active', true)->orderBy('order')->get() : [];
        $lab = $slug ? ($allLabs->firstWhere('slug', $slug) ?: $allLabs->first()) : $allLabs->first();

        return Inertia::render('Academic/Eee/Laboratory', [
            'department' => $dept,
            'lab' => $lab,
            'allLabs' => $allLabs,
            'labSlug' => $slug ?: ($lab?->slug ?? 'dc-circuit-laboratory'),
        ]);
    }

    public function society()
    {
        $dept = Department::where('slug', 'eee')->first();
        $society = $dept ? $dept->societies()->where('slug', 'eee-society')->where('is_active', true)->first() : null;

        return Inertia::render('Academic/Eee/EeeSociety', [
            'department' => $dept,
            'society' => $society,
        ]);
    }
}
