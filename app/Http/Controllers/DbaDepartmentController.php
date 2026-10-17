<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\DepartmentMember;
use App\Models\Notice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DbaDepartmentController extends Controller
{
    private function getDepartment(): Department
    {
        return Department::where('slug', 'dba')->firstOrFail();
    }

    public function index(): Response
    {
        $dept = Department::where('slug', 'dba')
            ->with([
                'slides' => fn($q) => $q->orderBy('order'),
                'highlights' => fn($q) => $q->orderBy('order'),
                'stats' => fn($q) => $q->orderBy('order'),
            ])
            ->first();

        $head = DepartmentMember::where('department', 'dba')
            ->where('is_head', true)
            ->first();

        $faculty = DepartmentMember::where('department', 'dba')
            ->where('employment_type', 'faculty')
            ->where('status', 'active')
            ->orderBy('order')
            ->take(8)
            ->get();

        $notices = Notice::active()
            ->forDepartment('dba')
            ->latest('published_at')
            ->take(6)
            ->get();

        $achievements = $dept ? $dept->achievements()->where('is_active', true)->orderBy('order')->take(3)->get() : [];
        $facilities = $dept ? $dept->laboratories()->where('is_active', true)->orderBy('order')->take(3)->get() : [];

        return Inertia::render('Academic/Dba/Index', [
            'department' => $dept,
            'slides' => $dept?->slides ?? [],
            'highlights' => $dept?->highlights ?? [],
            'stats' => $dept?->stats ?? [],
            'headOfDept' => $head,
            'facultyPreview' => $faculty,
            'notices' => $notices,
            'achievements' => $achievements,
            'facilities' => $facilities,
        ]);
    }

    public function about(): Response
    {
        $dept = Department::where('slug', 'dba')
            ->with(['stats' => fn($q) => $q->orderBy('order')])
            ->first();

        return Inertia::render('Academic/Dba/About', [
            'department' => $dept,
            'stats' => $dept?->stats ?? [],
        ]);
    }

    public function visionMission(): Response
    {
        $dept = $this->getDepartment();
        $peos = $dept->obes()->where('type', 'peo')->where('is_active', true)->orderBy('order')->get();
        $plos = $dept->obes()->where('type', 'plo')->where('is_active', true)->orderBy('order')->get();

        return Inertia::render('Academic/Dba/VisionMission', [
            'department' => $dept,
            'peos' => $peos,
            'plos' => $plos,
        ]);
    }

    public function faculty(): Response
    {
        $dept = $this->getDepartment();
        $members = DepartmentMember::where('department', 'dba')
            ->facultyVisible()
            ->orderBy('order', 'asc')
            ->get();

        return Inertia::render('Academic/Dba/Faculty', [
            'department' => $dept,
            'members' => $members,
        ]);
    }

    public function academicStaff(): Response
    {
        $dept = $this->getDepartment();
        $staff = DepartmentMember::where('department', 'dba')
            ->staffVisible()
            ->orderBy('order')
            ->get();

        return Inertia::render('Academic/Dba/AcademicStaff', [
            'department' => $dept,
            'staff' => $staff,
        ]);
    }

    public function curriculum(): Response
    {
        $dept = $this->getDepartment();
        $curricula = $dept->curricula()->where('is_active', true)->orderBy('order')->get();

        return Inertia::render('Academic/Dba/Curriculum', [
            'department' => $dept,
            'curricula' => $curricula,
        ]);
    }

    public function facilities(): Response
    {
        $dept = $this->getDepartment();
        $facilities = $dept->laboratories()->where('is_active', true)->orderBy('order')->get();

        return Inertia::render('Academic/Dba/Facilities', [
            'department' => $dept,
            'facilities' => $facilities,
            'selectedFacility' => $facilities->first(),
        ]);
    }

    public function facilitiesDetail(string $slug): Response
    {
        $dept = $this->getDepartment();
        $facilities = $dept->laboratories()->where('is_active', true)->orderBy('order')->get();
        $facility = $facilities->firstWhere('slug', $slug) ?: $facilities->first();

        return Inertia::render('Academic/Dba/Facilities', [
            'department' => $dept,
            'facilities' => $facilities,
            'selectedFacility' => $facility,
        ]);
    }

    public function events(): Response
    {
        $dept = $this->getDepartment();
        $events = Notice::active()
            ->forDepartment('dba')
            ->latest('published_at')
            ->get();

        return Inertia::render('Academic/Dba/Events', [
            'department' => $dept,
            'events' => $events,
        ]);
    }

    public function eventDetail(string $slug): Response
    {
        $event = Notice::active()
            ->where('slug', $slug)
            ->with(['categories', 'pressCoverages'])
            ->firstOrFail();

        $relatedEvents = Notice::active()
            ->forDepartment('dba')
            ->where('id', '!=', $event->id)
            ->latest('published_at')
            ->take(5)
            ->get();

        $department = $this->getDepartment();

        return Inertia::render('Academic/Dba/EventDetail', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
            'department' => $department,
        ]);
    }

    public function researchPublications(): Response
    {
        $dept = $this->getDepartment();
        $publications = $dept->researches()
            ->where('type', 'publication')
            ->where('is_active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Academic/Dba/Research/Publications', [
            'department' => $dept,
            'publications' => $publications,
        ]);
    }

    public function researchProjects(): Response
    {
        $dept = $this->getDepartment();
        $projects = $dept->researches()
            ->where('type', 'thesis')
            ->where('is_active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Academic/Dba/Research/Projects', [
            'department' => $dept,
            'projects' => $projects,
        ]);
    }

    public function achievements(): Response
    {
        $dept = $this->getDepartment();
        $achievements = $dept->achievements()
            ->where('is_active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Academic/Dba/Achievements', [
            'department' => $dept,
            'achievements' => $achievements,
        ]);
    }

    public function onlineResources(): Response
    {
        $dept = $this->getDepartment();
        $resources = $dept->onlineResources()
            ->orderBy('order')
            ->get();

        return Inertia::render('Academic/Dba/OnlineResources', [
            'department' => $dept,
            'resources' => $resources,
        ]);
    }

    public function alumni(): Response
    {
        $dept = $this->getDepartment();
        $alumniSociety = $dept->societies()->where('type', 'alumni')->first();
        $alumniList = DB::table('department_alumni')
            ->where('department_id', $dept->id)
            ->orderBy('order')
            ->get();

        return Inertia::render('Academic/Dba/Alumni', [
            'department' => $dept,
            'society' => $alumniSociety,
            'alumni' => $alumniList,
        ]);
    }

    public function clubs(): Response
    {
        $dept = $this->getDepartment();
        $club = $dept->societies()->where('type', 'society')->first();

        return Inertia::render('Academic/Dba/Clubs', [
            'department' => $dept,
            'club' => $club,
        ]);
    }
}
