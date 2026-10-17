<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\DepartmentMember;
use App\Models\Notice;
use Inertia\Inertia;
use Inertia\Response;

/**
 * DB-driven pages for the non-engineering departments (DBA, AIS, English,
 * Arts & Sciences). Every page renders the same layout as the CSE department
 * so all departments look alike; only the data differs.
 */
class DepartmentController extends Controller
{
    /** Sub-navigation tabs, in the same order and shape as CSE_TABS. */
    public function getTabs(Department $d): array
    {
        $base = "/{$d->slug}";
        $short = $d->short_name ?: strtoupper($d->slug);

        $tabs = [
            ['name' => 'Home', 'href' => $base],
            ['name' => 'About', 'children' => array_values(array_filter([
                ['name' => "About {$short}", 'href' => "{$base}/about"],
                ($d->vision || $d->mission) ? ['name' => 'Vision & Mission', 'href' => "{$base}/vision-mission"] : null,
            ]))],
            ['name' => 'People', 'children' => array_values(array_filter([
                ['name' => 'Faculty Members', 'href' => "{$base}/faculty"],
                DepartmentMember::where('department', $d->slug)->staffVisible()->exists()
                    ? ['name' => 'Academic Staff', 'href' => "{$base}/academic-staff"] : null,
            ]))],
            ['name' => 'Curriculum', 'href' => "{$base}/curriculum"],
        ];

        $facilities = $d->laboratories()->where('is_active', true)->get(['name', 'slug']);
        if ($facilities->isNotEmpty()) {
            $tabs[] = ['name' => 'Facilities', 'children' => $facilities
                ->map(fn ($f) => ['name' => $f->name, 'href' => "{$base}/facilities/{$f->slug}"])->values()->all()];
        }

        $tabs[] = ['name' => 'Alumni', 'href' => "{$base}/alumni"];
        $tabs[] = ['name' => 'Events', 'href' => "{$base}/events"];

        $hasResearch = $d->researches()->where('is_active', true)->exists();
        $tabs[] = ['name' => 'Research', 'children' => $hasResearch
            ? [
                ['name' => 'Publications', 'href' => "{$base}/research/publications"],
                ['name' => 'Research Projects', 'href' => "{$base}/research/projects"],
            ]
            : [
                ['name' => 'Publications', 'href' => '/research#publications'],
                ['name' => 'Research Areas', 'href' => '/research#projects'],
            ]];

        $tabs[] = ['name' => 'Achievements', 'href' => "{$base}/achievements"];

        if ($d->onlineResources()->where('is_active', true)->exists()) {
            $tabs[] = ['name' => 'Online Resources', 'href' => "{$base}/online-resources"];
        }

        if ($society = $this->society($d)) {
            $tabs[] = ['name' => $society->name, 'href' => "{$base}/clubs"];
        }

        return $tabs;
    }

    private function department(string $slug): Department
    {
        return Department::where('slug', $slug)->firstOrFail();
    }

    private function society(Department $d)
    {
        return $d->societies()->where('type', '!=', 'alumni')->where('is_active', true)->orderBy('order')->first();
    }

    /** Props shared by every department page. */
    private function page(string $component, Department $d, array $props = []): Response
    {
        return Inertia::render("Department/{$component}", array_merge([
            'department' => $d,
            'tabs' => $this->getTabs($d),
        ], $props));
    }

    public function show(string $dept): Response
    {
        $department = Department::where('slug', $dept)
            ->with([
                'slides' => fn ($q) => $q->orderBy('order'),
                'highlights' => fn ($q) => $q->orderBy('order'),
                'stats' => fn ($q) => $q->orderBy('order'),
            ])
            ->firstOrFail();

        return $this->page('Show', $department, [
            'slides' => $department->slides,
            'highlights' => $department->highlights,
            'stats' => $department->stats,
            'headOfDept' => DepartmentMember::where('department', $dept)->where('is_head', true)->first(),
            'facultyPreview' => DepartmentMember::where('department', $dept)
                ->where('employment_type', 'faculty')
                ->where('status', 'active')
                ->orderBy('order')
                ->take(8)
                ->get(),
            'notices' => Notice::active()->forDepartment($dept)->latest('published_at')->take(5)->get(),
        ]);
    }

    public function about(string $dept): Response
    {
        $department = $this->department($dept);

        return $this->page('About', $department, ['stats' => $department->stats]);
    }

    public function visionMission(string $dept): Response
    {
        $department = $this->department($dept);

        return $this->page('VisionMission', $department, [
            'peos' => $department->obes()->where('type', 'peo')->where('is_active', true)->get(),
            'plos' => $department->obes()->where('type', 'plo')->where('is_active', true)->get(),
        ]);
    }

    public function faculty(string $dept): Response
    {
        return $this->page('Faculty', $this->department($dept), [
            'members' => DepartmentMember::where('department', $dept)
                ->facultyVisible()
                ->orderBy('type')
                ->orderBy('order')
                ->get(),
        ]);
    }

    public function academicStaff(string $dept): Response
    {
        return $this->page('AcademicStaff', $this->department($dept), [
            'staff' => DepartmentMember::where('department', $dept)->staffVisible()->orderBy('order')->get(),
        ]);
    }

    public function curriculum(string $dept): Response
    {
        $department = $this->department($dept);

        return $this->page('Curriculum', $department, [
            'curricula' => $department->curricula()->where('is_active', true)->get(),
        ]);
    }

    public function facilities(string $dept, ?string $facilitySlug = null): Response
    {
        $department = $this->department($dept);
        $all = $department->laboratories()->where('is_active', true)->get();
        $lab = ($facilitySlug ? $all->firstWhere('slug', $facilitySlug) : null) ?: $all->first();

        return $this->page('Facilities', $department, [
            'lab' => $lab,
            'allLabs' => $all,
            'labSlug' => $lab?->slug ?? '',
        ]);
    }

    // Laravel passes route parameters positionally: URL segments first, then the
    // ->defaults('dept') value, so the slug must come before $dept here.
    public function facilitiesDetail(string $facilitySlug, string $dept): Response
    {
        return $this->facilities($dept, $facilitySlug);
    }

    public function events(string $dept): Response
    {
        return $this->page('Events', $this->department($dept), [
            'events' => Notice::active()->forDepartment($dept)->latest('published_at')->get(),
        ]);
    }

    public function eventDetail(string $eventSlug, string $dept): Response
    {
        $event = Notice::active()
            ->where('slug', $eventSlug)
            ->with(['categories', 'pressCoverages'])
            ->firstOrFail();

        return $this->page('EventDetail', $this->department($dept), [
            'event' => $event,
            'relatedEvents' => Notice::active()
                ->forDepartment($dept)
                ->where('id', '!=', $event->id)
                ->latest('published_at')
                ->take(5)
                ->get(),
        ]);
    }

    public function achievements(string $dept): Response
    {
        $department = $this->department($dept);

        return $this->page('Achievements', $department, [
            'achievements' => $department->achievements()->where('is_active', true)->get(),
        ]);
    }

    public function onlineResources(string $dept): Response
    {
        $department = $this->department($dept);

        return $this->page('OnlineResources', $department, [
            'resources' => $department->onlineResources()->where('is_active', true)->get(),
        ]);
    }

    public function alumni(string $dept): Response
    {
        $department = $this->department($dept);

        return $this->page('Alumni', $department, [
            'alumni' => $department->societies()->where('type', 'alumni')->where('is_active', true)->first(),
            'alumniList' => $department->alumni()->where('is_active', true)->get(),
            'society' => $this->society($department),
        ]);
    }

    public function clubs(string $dept): Response
    {
        $department = $this->department($dept);

        return $this->page('Clubs', $department, ['society' => $this->society($department)]);
    }

    public function researchPublications(string $dept): Response
    {
        $department = $this->department($dept);

        return Inertia::render('Academic/Dba/Research/Publications', [
            'department' => $department,
            'tabs' => $this->getTabs($department),
            'publications' => $department->researches()->where('type', 'publication')->where('is_active', true)->get(),
        ]);
    }

    public function researchProjects(string $dept): Response
    {
        $department = $this->department($dept);

        return Inertia::render('Academic/Dba/Research/Projects', [
            'department' => $department,
            'tabs' => $this->getTabs($department),
            'projects' => $department->researches()->where('type', 'thesis')->where('is_active', true)->get(),
        ]);
    }
}
