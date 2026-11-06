<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\DepartmentMember;
use App\Models\Notice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IpeDepartmentController extends Controller
{
    public function index()
    {
        $dept = Department::where('slug', 'ipe')
            ->with([
                'slides' => fn($q) => $q->orderBy('order'),
                'highlights' => fn($q) => $q->orderBy('order'),
                'stats' => fn($q) => $q->orderBy('order'),
            ])
            ->first();

        $head = DepartmentMember::where('department', 'ipe')
            ->where('is_head', true)
            ->first();

        $faculty = DepartmentMember::where('department', 'ipe')
            ->where('employment_type', 'faculty')
            ->where('status', 'active')
            ->orderBy('order')
            ->take(8)
            ->get();

        $notices = Notice::active()
            ->forDepartment('ipe')
            ->latest('published_at')
            ->take(5)
            ->get();

        return Inertia::render('Academic/Ipe/Index', [
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
        $dept = Department::where('slug', 'ipe')
            ->with(['stats' => fn($q) => $q->orderBy('order')])
            ->first();

        return Inertia::render('Academic/Ipe/About', [
            'department' => $dept,
            'stats' => $dept?->stats ?? [],
        ]);
    }

    public function visionMission()
    {
        $dept = Department::where('slug', 'ipe')->first();
        $peos = $dept ? $dept->obes()->where('type', 'peo')->where('is_active', true)->orderBy('order')->get() : [];
        $plos = $dept ? $dept->obes()->where('type', 'plo')->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ipe/VisionMission', [
            'department' => $dept,
            'peos' => $peos,
            'plos' => $plos,
        ]);
    }

    public function faculty()
    {
        $dept = Department::where('slug', 'ipe')->first();
        $members = DepartmentMember::where('department', 'ipe')
            ->facultyVisible()
            ->orderBy('type', 'asc') // Permanent first, then adjunct/contractual
            ->orderBy('order', 'asc')
            ->get();

        return Inertia::render('Academic/Ipe/Faculty', [
            'department' => $dept,
            'members' => $members,
        ]);
    }

    public function academicStaff()
    {
        $dept = Department::where('slug', 'ipe')->first();
        $staff = DepartmentMember::where('department', 'ipe')
            ->staffVisible()
            ->orderBy('order')
            ->get();

        return Inertia::render('Academic/Ipe/AcademicStaff', [
            'department' => $dept,
            'staff' => $staff,
        ]);
    }

    public function curriculum()
    {
        $dept = Department::where('slug', 'ipe')->first();
        $curricula = $dept ? $dept->curricula()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ipe/Curriculum', [
            'department' => $dept,
            'curricula' => $curricula,
        ]);
    }

    public function alumni()
    {
        $dept = Department::where('slug', 'ipe')->first();
        $alumni = $dept ? $dept->societies()->where('type', 'alumni')->where('is_active', true)->orderBy('order')->first() : null;
        $alumniList = $dept ? $dept->alumni()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ipe/Alumni', [
            'department' => $dept,
            'alumni' => $alumni,
            'alumniList' => $alumniList,
        ]);
    }

    public function events()
    {
        $dept = Department::where('slug', 'ipe')->first();
        $events = Notice::active()
            ->forDepartment('ipe')
            ->whereHas('categories', function($q) {
                $q->whereIn('slug', ['news-events', 'upcoming-events']);
            })
            ->latest('published_at')
            ->get();

        return Inertia::render('Academic/Ipe/Events', [
            'department' => $dept,
            'events' => $events,
        ]);
    }

    public function eventDetail($slug)
    {
        $event = Notice::active()
            ->forDepartment('ipe')
            ->where('slug', $slug)
            ->with(['categories', 'pressCoverages'])
            ->firstOrFail();

        $relatedEvents = Notice::active()
            ->forDepartment('ipe')
            ->where('id', '!=', $event->id)
            ->latest('published_at')
            ->take(5)
            ->get();

        $department = Department::where('slug', 'ipe')->first();

        return Inertia::render('Academic/Ipe/EventDetail', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
            'department' => $department,
        ]);
    }

    public function achievements()
    {
        $dept = Department::where('slug', 'ipe')->first();
        $achievements = $dept ? $dept->achievements()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ipe/Achievements', [
            'department' => $dept,
            'achievements' => $achievements,
        ]);
    }

    public function laboratory($slug = null)
    {
        $dept = Department::where('slug', 'ipe')->first();
        $allLabs = $dept ? $dept->laboratories()->where('is_active', true)->orderBy('order')->get() : collect();
        $lab = $slug ? $allLabs->firstWhere('slug', $slug) : $allLabs->first();
        abort_if($slug && !$lab, 404);

        return Inertia::render('Academic/Ipe/Laboratory', [
            'department' => $dept,
            'lab' => $lab,
            'allLabs' => $allLabs,
            'labSlug' => $lab?->slug,
        ]);
    }

    public function society()
    {
        $dept = Department::where('slug', 'ipe')->first();
        $society = $dept ? $dept->societies()->whereIn('type', ['society', 'club'])->where('is_active', true)->orderBy('order')->first() : null;

        return Inertia::render('Academic/Ipe/IpeSociety', [
            'department' => $dept,
            'society' => $society,
        ]);
    }

    public function onlineResources()
    {
        $dept = Department::where('slug', 'ipe')->first();
        $resources = $dept ? $dept->onlineResources()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ipe/OnlineResources', [
            'department' => $dept,
            'resources' => $resources,
        ]);
    }
}
