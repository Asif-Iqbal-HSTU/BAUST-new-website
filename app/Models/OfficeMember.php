<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class OfficeMember extends Model
{
    protected $fillable = ['office', 'name', 'designation', 'photo', 'phone', 'email', 'education', 'tier', 'order'];

    protected $casts = ['education' => 'array'];

    /** Catalog of administrative offices: slug => [name, subtitle]. */
    public static function offices(): array
    {
        $static = [
            'vc' => ['name' => 'Office of the Vice Chancellor', 'subtitle' => 'Leadership & Governance of the University'],
            'pro-vc' => ['name' => "Office of the Pro-Vice Chancellor", 'subtitle' => 'Academic Leadership of the University'],
            'treasurer' => ['name' => 'Office of the Treasurer', 'subtitle' => 'Financial Management of the University'],
            'registrar' => ['name' => 'Office of the Registrar', 'subtitle' => 'Administrative Nerve Center of the University'],
            'controller-of-examination' => ['name' => 'Controller of Examination', 'subtitle' => 'Examinations & Results'],
            'ict-wing-archive' => ['name' => 'ICT Wing & Archive', 'subtitle' => 'Technology, Systems & Records'],
            'deans-of-faculties' => ['name' => 'Deans of Faculties', 'subtitle' => 'Academic Leadership of the Faculties'],
            'proctors-office' => ['name' => "Proctor's Office", 'subtitle' => 'Discipline & Student Conduct'],
            'asw' => ['name' => "Office of the Adviser of Students' Welfare (ASW)", 'subtitle' => 'Student Welfare & Support'],
            'admission-office' => ['name' => 'Admission Office', 'subtitle' => 'Admissions & Enrolment'],
            'librarian' => ['name' => 'Office of the Librarian', 'subtitle' => 'Central Library Services'],
            'complaint-committee' => ['name' => 'Complaint Committee', 'subtitle' => 'Grievance & Redressal'],
        ];

        // Guarded: offices() is called from routes/web.php at file-load time,
        // which also runs during artisan bootstrapping (e.g. build-time
        // `package:discover`) before a real database connection exists.
        $faculties = [];
        try {
            if (Schema::hasTable('faculties')) {
                $faculties = Faculty::orderBy('order')->get()->mapWithKeys(fn (Faculty $f) => [
                    $f->slug => [
                        'name' => $f->office_name,
                        'subtitle' => $f->office_subtitle,
                        'faculty_code' => $f->code,
                        'faculty_name' => $f->name,
                    ],
                ])->toArray();
            }
        } catch (\Throwable $e) {
            $faculties = [];
        }

        return $faculties + $static;
    }

    /** Detailed faculty profiles and metadata for Dean's office portals, sourced from the faculties table. */
    public static function facultyMeta(string $slug): ?array
    {
        $faculty = Faculty::where('slug', $slug)->first();

        if (! $faculty) {
            return null;
        }

        return [
            'code' => $faculty->code,
            'name' => $faculty->name,
            'title' => $faculty->title,
            'tagline' => $faculty->tagline,
            'about' => $faculty->about,
            'location' => $faculty->location,
            'phone' => $faculty->phone,
            'email' => $faculty->email,
            'department_slugs' => $faculty->department_slugs ?? [],
        ];
    }
}
