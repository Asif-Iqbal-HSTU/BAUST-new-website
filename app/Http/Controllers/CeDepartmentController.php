<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\DepartmentMember;
use App\Models\Notice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CeDepartmentController extends Controller
{
    public function index()
    {
        $dept = Department::where('slug', 'ce')
            ->with([
                'slides' => fn($q) => $q->orderBy('order'),
                'highlights' => fn($q) => $q->orderBy('order'),
                'stats' => fn($q) => $q->orderBy('order'),
            ])
            ->first();

        $head = DepartmentMember::where('department', 'ce')
            ->where('is_head', true)
            ->first();

        $faculty = DepartmentMember::where('department', 'ce')
            ->where('employment_type', 'faculty')
            ->where('status', 'active')
            ->orderBy('order')
            ->take(8)
            ->get();

        $notices = Notice::active()
            ->forDepartment('ce')
            ->latest('published_at')
            ->take(6)
            ->get();

        return Inertia::render('Academic/Ce/Index', [
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
        $dept = Department::where('slug', 'ce')
            ->with(['stats' => fn($q) => $q->orderBy('order')])
            ->first();

        return Inertia::render('Academic/Ce/About', [
            'department' => $dept,
            'stats' => $dept?->stats ?? [],
        ]);
    }

    public function visionMission()
    {
        $dept = Department::where('slug', 'ce')->first();
        $peos = $dept ? $dept->obes()->where('type', 'peo')->where('is_active', true)->orderBy('order')->get() : [];
        $plos = $dept ? $dept->obes()->where('type', 'plo')->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ce/VisionMission', [
            'department' => $dept,
            'peos' => $peos,
            'plos' => $plos,
        ]);
    }

    public function faculty()
    {
        $dept = Department::where('slug', 'ce')->first();
        $members = DepartmentMember::where('department', 'ce')
            ->facultyVisible()
            ->orderBy('type', 'asc') // Permanent first, then adjunct/contractual
            ->orderBy('order', 'asc')
            ->get();

        return Inertia::render('Academic/Ce/Faculty', [
            'department' => $dept,
            'members' => $members,
        ]);
    }

    public function academicStaff()
    {
        $dept = Department::where('slug', 'ce')->first();
        $staff = DepartmentMember::where('department', 'ce')
            ->staffVisible()
            ->orderBy('order')
            ->get();

        return Inertia::render('Academic/Ce/AcademicStaff', [
            'department' => $dept,
            'staff' => $staff,
        ]);
    }

    public function curriculum()
    {
        $dept = Department::where('slug', 'ce')->first();
        $curricula = $dept ? $dept->curricula()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ce/Curriculum', [
            'department' => $dept,
            'curricula' => $curricula,
        ]);
    }

    public function alumni()
    {
        return $this->alumniAssoc();
    }

    public function alumniInfo()
    {
        $dept = Department::where('slug', 'ce')->first();
        $jobHolders = $dept ? $dept->alumni()->where('type', 'job_holder')->where('is_active', true)->orderBy('order')->get() : [];
        $higherStudies = $dept ? $dept->alumni()->where('type', 'higher_study')->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ce/Alumni/AlumniInfo', [
            'department' => $dept,
            'jobHolders' => $jobHolders,
            'higherStudies' => $higherStudies,
        ]);
    }

    public function alumniAssoc()
    {
        $dept = Department::where('slug', 'ce')->first();
        $alumni = $dept ? $dept->societies()->where('type', 'alumni')->where('is_active', true)->orderBy('order')->first() : null;

        return Inertia::render('Academic/Ce/Alumni/AlumniAssoc', [
            'department' => $dept,
            'alumni' => $alumni,
        ]);
    }

    public function publications()
    {
        $dept = Department::where('slug', 'ce')->first();
        $publications = $dept ? $dept->researches()->where('type', 'publication')->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ce/Research/Publications', [
            'department' => $dept,
            'publications' => $publications,
        ]);
    }

    public function thesisProjects()
    {
        $dept = Department::where('slug', 'ce')->first();
        $theses = $dept ? $dept->researches()->where('type', 'thesis')->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ce/Research/ThesisProjects', [
            'department' => $dept,
            'theses' => $theses,
        ]);
    }

    public function studentVoice()
    {
        $dept = Department::where('slug', 'ce')->first();
        $voices = $dept ? $dept->studentVoices()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ce/StudentVoice', [
            'department' => $dept,
            'voices' => $voices,
        ]);
    }

    public function galleryPhotos()
    {
        $dept = Department::where('slug', 'ce')->first();
        $albums = $dept ? $dept->galleries()->where('type', 'photo')->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ce/Gallery/Photos', [
            'department' => $dept,
            'albums' => $albums,
        ]);
    }

    public function galleryVideos()
    {
        $dept = Department::where('slug', 'ce')->first();
        $videos = $dept ? $dept->galleries()->where('type', 'video')->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ce/Gallery/Videos', [
            'department' => $dept,
            'videos' => $videos,
        ]);
    }

    public function events()
    {
        $dept = Department::where('slug', 'ce')->first();
        $events = Notice::active()
            ->forDepartment('ce')
            ->whereHas('categories', function($q) {
                $q->whereIn('slug', ['news-events', 'upcoming-events']);
            })
            ->latest('published_at')
            ->get();

        return Inertia::render('Academic/Ce/Events', [
            'department' => $dept,
            'events' => $events,
        ]);
    }

    public function eventDetail($slug)
    {
        $event = Notice::active()
            ->forDepartment('ce')
            ->where('slug', $slug)
            ->with(['categories', 'pressCoverages'])
            ->firstOrFail();

        $relatedEvents = Notice::active()
            ->forDepartment('ce')
            ->where('id', '!=', $event->id)
            ->latest('published_at')
            ->take(5)
            ->get();

        $department = Department::where('slug', 'ce')->first();

        return Inertia::render('Academic/Ce/EventDetail', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
            'department' => $department,
        ]);
    }

    public function achievements()
    {
        $dept = Department::where('slug', 'ce')->first();
        $achievements = $dept ? $dept->achievements()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ce/Achievements', [
            'department' => $dept,
            'achievements' => $achievements,
        ]);
    }

    public function laboratories($slug = null)
    {
        $dept = Department::where('slug', 'ce')->first();
        $allLabs = $dept ? $dept->laboratories()->where('is_active', true)->orderBy('order')->get() : collect();
        $lab = $slug ? $allLabs->firstWhere('slug', $slug) : $allLabs->first();
        abort_if($slug && !$lab, 404);

        return Inertia::render('Academic/Ce/Laboratories', [
            'department' => $dept,
            'lab' => $lab,
            'allLabs' => $allLabs,
            'labSlug' => $lab?->slug,
        ]);
    }

    public function clubs($club = null)
    {
        $dept = Department::where('slug', 'ce')->first();
        $allClubs = $dept ? $dept->societies()->whereIn('type', ['society', 'club'])->where('is_active', true)->orderBy('order')->get() : collect();
        $selectedClub = $club ? $allClubs->firstWhere('slug', $club) : $allClubs->first();
        abort_if($club && !$selectedClub, 404);

        return Inertia::render('Academic/Ce/Clubs', [
            'department' => $dept,
            'club' => $selectedClub,
            'allClubs' => $allClubs,
            'clubSlug' => $selectedClub?->slug,
        ]);
    }

    public function society()
    {
        return redirect()->route('academic.ce.clubs');
    }

    public function onlineResources()
    {
        $dept = Department::where('slug', 'ce')->first();
        $resources = $dept ? $dept->onlineResources()->where('is_active', true)->orderBy('order')->get() : [];

        return Inertia::render('Academic/Ce/OnlineResources', [
            'department' => $dept,
            'resources' => $resources,
        ]);
    }
}
