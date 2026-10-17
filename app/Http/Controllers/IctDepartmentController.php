<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\DepartmentMember;
use App\Models\Notice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IctDepartmentController extends Controller
{
    public function index()
    {
        $dept = Department::where('slug', 'ict')
            ->with([
                'slides' => fn($q) => $q->orderBy('order'),
                'highlights' => fn($q) => $q->orderBy('order'),
                'stats' => fn($q) => $q->orderBy('order'),
            ])
            ->first();

        $head = DepartmentMember::where('department', 'ict')
            ->where('is_head', true)
            ->first();

        $faculty = DepartmentMember::where('department', 'ict')
            ->where('employment_type', 'faculty')
            ->where('status', 'active')
            ->orderBy('order')
            ->take(8)
            ->get();

        $notices = Notice::active()
            ->forDepartment('ict')
            ->latest('published_at')
            ->take(5)
            ->get();

        return Inertia::render('Academic/Ict/Index', [
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
        $dept = Department::where('slug', 'ict')
            ->with(['stats' => fn($q) => $q->orderBy('order')])
            ->first();

        return Inertia::render('Academic/Ict/About', [
            'department' => $dept,
            'stats' => $dept?->stats ?? [],
        ]);
    }

    public function visionMission()
    {
        $dept = Department::where('slug', 'ict')->first();
        $peos = $dept ? $dept->obes()->where('type', 'peo')->where('is_active', true)->orderBy('order')->get() : [];
        $plos = $dept ? $dept->obes()->where('type', 'plo')->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ict/VisionMission', [
            'department' => $dept,
            'peos' => $peos,
            'plos' => $plos,
        ]);
    }

    public function faculty()
    {
        $dept = Department::where('slug', 'ict')->first();
        $members = DepartmentMember::where('department', 'ict')
            ->facultyVisible()
            ->orderBy('type', 'asc') // Permanent first, then adjunct/contractual
            ->orderBy('order', 'asc')
            ->get();

        return Inertia::render('Academic/Ict/Faculty', [
            'department' => $dept,
            'members' => $members
        ]);
    }

    public function academicStaff()
    {
        $dept = Department::where('slug', 'ict')->first();
        $staff = DepartmentMember::where('department', 'ict')
            ->staffVisible()
            ->orderBy('order')
            ->get();

        return Inertia::render('Academic/Ict/AcademicStaff', [
            'department' => $dept,
            'staff' => $staff
        ]);
    }

    public function curriculum()
    {
        $dept = Department::where('slug', 'ict')->first();
        $curricula = $dept ? $dept->curricula()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ict/Curriculum', [
            'department' => $dept,
            'curricula' => $curricula,
        ]);
    }

    public function alumni()
    {
        $dept = Department::where('slug', 'ict')->first();
        $alumni = $dept ? $dept->societies()->where('type', 'alumni')->where('is_active', true)->first() : null;

        return Inertia::render('Academic/Ict/Alumni', [
            'department' => $dept,
            'alumni' => $alumni,
        ]);
    }

    public function events()
    {
        $dept = Department::where('slug', 'ict')->first();
        $events = Notice::active()
            ->forDepartment('ict')
            ->whereHas('categories', function($q) {
                $q->whereIn('slug', ['news-events', 'upcoming-events']);
            })
            ->latest('published_at')
            ->get();

        return Inertia::render('Academic/Ict/Events', [
            'department' => $dept,
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
            ->forDepartment('ict')
            ->where('id', '!=', $event->id)
            ->latest('published_at')
            ->take(5)
            ->get();

        $department = Department::where('slug', 'ict')->first();

        return Inertia::render('Academic/Ict/EventDetail', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
            'department' => $department,
        ]);
    }

    public function achievements()
    {
        $dept = Department::where('slug', 'ict')->first();
        $achievements = $dept ? $dept->achievements()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ict/Achievements', [
            'department' => $dept,
            'achievements' => $achievements,
        ]);
    }

    public function laboratories($slug = null)
    {
        $dept = Department::where('slug', 'ict')->first();
        $allLabs = $dept ? $dept->laboratories()->where('is_active', true)->orderBy('order')->get() : [];
        $lab = $slug ? ($allLabs->firstWhere('slug', $slug) ?: $allLabs->first()) : $allLabs->first();

        return Inertia::render('Academic/Ict/Laboratory', [
            'department' => $dept,
            'lab' => $lab,
            'allLabs' => $allLabs,
            'labSlug' => $slug ?: ($lab?->slug ?? 'computer-programming-software-engineering-lab'),
        ]);
    }

    public function research()
    {
        $dept = Department::where('slug', 'ict')->first();

        return Inertia::render('Academic/Ict/Research', [
            'department' => $dept,
        ]);
    }

    public function society()
    {
        $dept = Department::where('slug', 'ict')->first();
        $society = $dept ? $dept->societies()->where('slug', 'ict-society')->where('is_active', true)->first() : null;

        return Inertia::render('Academic/Ict/IctSociety', [
            'department' => $dept,
            'society' => $society,
        ]);
    }
}
