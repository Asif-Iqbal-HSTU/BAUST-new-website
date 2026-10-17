<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\OfficeMember;
use Inertia\Inertia;
use Inertia\Response;

class OfficeController extends Controller
{
    public function show(string $office): Response
    {
        $catalog = OfficeMember::offices();
        abort_unless(isset($catalog[$office]), 404);

        $facultyMeta = OfficeMember::facultyMeta($office);

        $members = OfficeMember::where('office', $office)
            ->orderBy('tier')->orderBy('order')->get()
            ->map(fn ($m) => [
                'id' => $m->id,
                'name' => $m->name,
                'designation' => $m->designation,
                'photo' => $m->photo,
                'phone' => $m->phone,
                'email' => $m->email,
                'education' => $m->education ?? [],
                'tier' => $m->tier,
            ]);

        // If this is a Faculty Dean's Office, render the dedicated academic faculty page
        if ($facultyMeta) {
            $departments = Department::whereIn('slug', $facultyMeta['department_slugs'] ?? [])
                ->select('id', 'slug', 'short_name', 'name', 'tagline', 'hod_name', 'hod_designation', 'hod_photo')
                ->orderBy('order')
                ->get();

            $otherFaculties = \App\Models\Faculty::orderBy('order')->pluck('slug')
                ->filter(fn ($s) => $s !== $office)
                ->map(function ($s) {
                    $m = OfficeMember::facultyMeta($s);

                    return [
                        'slug' => $s,
                        'code' => $m['code'] ?? strtoupper($s),
                        'title' => $m['title'] ?? ucfirst($s),
                    ];
                })
                ->values();

            return Inertia::render('Academic/DeansOffice', [
                'office' => [
                    'slug' => $office,
                    'name' => $catalog[$office]['name'],
                    'subtitle' => $catalog[$office]['subtitle'],
                ],
                'faculty' => $facultyMeta,
                'departments' => $departments,
                'otherFaculties' => $otherFaculties,
                'members' => $members,
            ]);
        }

        return Inertia::render('Administration/Offices/Show', [
            'office' => [
                'slug' => $office,
                'name' => $catalog[$office]['name'],
                'subtitle' => $catalog[$office]['subtitle'],
            ],
            'members' => $members,
        ]);
    }
}
