<?php

use App\Models\Department;
use App\Models\DepartmentHighlight;
use App\Models\DepartmentMember;
use App\Models\DepartmentStat;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        $vision = 'To be a center of excellence recognized nationally and internationally for quality education, research and innovation.';

        $depts = [
            ['cse', 'Computer Science & Engineering', 'CSE', 'FECE', '2015',
                'The Department of Computer Science & Engineering (CSE) at BAUST offers a modern, outcome-based curriculum covering software engineering, artificial intelligence, data science, networking and cyber-security. It nurtures competent graduates through well-equipped laboratories, research and strong industry linkage.'],
            ['ict', 'Information & Communication Technology', 'ICT', 'FECE', '2015',
                'The Department of Information & Communication Technology (ICT) prepares graduates for the rapidly evolving digital world, blending computing, communication systems and information technology with hands-on, project-based learning.'],
            ['eee', 'Electrical & Electronic Engineering', 'EEE', 'FECE', '2015',
                'The Department of Electrical & Electronic Engineering (EEE) provides a strong foundation in power, electronics, communication and control systems, combining rigorous theory with practical laboratory experience to produce industry-ready engineers.'],
            ['me', 'Mechanical Engineering', 'ME', 'FME', '2015',
                'The Department of Mechanical Engineering (ME) covers design, thermal sciences, manufacturing and mechatronics, equipping students with the analytical and practical skills needed across a broad range of engineering industries.'],
            ['ipe', 'Industrial & Production Engineering', 'IPE', 'FME', '2015',
                'The Department of Industrial & Production Engineering (IPE) focuses on optimizing systems, processes and productivity. Its B.Sc. in IPE is an IEB-accredited program producing engineers skilled in operations, quality and supply-chain management.'],
            ['ce', 'Civil Engineering', 'CE', 'FCE', '2015',
                'The Department of Civil Engineering (CE) offers comprehensive education in structural, geotechnical, transportation, environmental and water-resources engineering, supported by modern laboratories and a focus on sustainable infrastructure.'],
            ['dba', 'Business Administration', 'DBA', 'FBS', '2015',
                'The Department of Business Administration (DBA) offers a BBA program designed to develop future business leaders, blending management, marketing, finance and entrepreneurship with real-world case studies and industry engagement.'],
            ['ais', 'Accounting & Information Systems', 'AIS', 'FBS', '2016',
                'The Department of Accounting & Information Systems (AIS) integrates accounting, auditing, taxation and information systems, preparing graduates for professional careers in accounting, finance and business analytics.'],
            ['eng', 'English', 'English', 'FSH', '2016',
                'The Department of English is the liberal-arts core of the university. Setting out its journey in Fall 2016, the department fosters imaginative, observant and analytical thinking through the study of language, literature and communication.'],
            ['as', 'Arts & Sciences', 'A&S', 'FSH', '2015',
                'The Department of Arts & Sciences delivers the foundational courses in Physics, Chemistry, Mathematics, Sociology and Bangla that underpin every program at BAUST, supporting students across all disciplines.'],
        ];

        $missions = [
            'cse' => 'To provide quality, outcome-based education in computing; to advance knowledge through research; and to produce ethical, skilled graduates who contribute to society and the technology industry.',
            'ce' => 'To educate civil engineers who design safe, sustainable and resilient infrastructure, and to advance the profession through research and community service.',
        ];

        $order = 1;
        foreach ($depts as [$slug, $name, $short, $faculty, $est, $about]) {
            Department::updateOrCreate(['slug' => $slug], [
                'name' => $name,
                'short_name' => $short,
                'faculty' => $faculty,
                'tagline' => 'Bangladesh Army University of Science & Technology',
                'established' => $est,
                'about' => $about,
                'vision' => $vision,
                'mission' => $missions[$slug] ?? 'To deliver quality outcome-based education, foster research and innovation, and produce competent, ethical graduates who serve the nation and beyond.',
                'is_active' => true,
                'order' => $order++,
            ]);
        }

        // Heads of the four new departments (with photos) -> DepartmentMember + hod fields
        $heads = [
            ['dba', 'Dr. Md. Anowar Hossain', 'Associate Professor & Head of the Department', '/storage/members/dba-dr-md-anowar-hossain.jpg'],
            ['ais', 'Rakibul Islam', 'Assistant Professor & Head of the Department', '/storage/members/ais-rakibul-islam.jpg'],
            ['eng', 'Md. Ashikullah', 'Associate Professor & Head of the Department', '/storage/members/eng-md-ashikullah.jpg'],
            ['as', 'Md. Mizanur Rahman', 'Associate Professor & Head of the Department', '/storage/members/as-md-mizanur-rahman.jpg'],
        ];
        foreach ($heads as [$slug, $name, $desig, $photo]) {
            DepartmentMember::updateOrCreate(
                ['department' => $slug, 'name' => $name],
                [
                    'designation' => $desig,
                    'photo' => $photo,
                    'education' => [],
                    'type' => 'permanent',
                    'status' => 'active',
                    'category' => 'head',
                    'order' => 0,
                ]
            );
            Department::where('slug', $slug)->update([
                'hod_name' => $name,
                'hod_designation' => $desig,
                'hod_photo' => $photo,
                'hod_message' => 'Welcome to the '.Department::where('slug', $slug)->value('name')
                    .' at BAUST. Our dedicated faculty and modern facilities are committed to nurturing capable, ethical and industry-ready graduates.',
            ]);
        }

        // A few starter highlights for the new departments
        $newHighlights = [
            'Outcome-Based Curriculum', 'Experienced Faculty', 'Modern Facilities', 'Industry Linkage',
        ];
        foreach (['dba', 'ais', 'eng', 'as'] as $slug) {
            $dept = Department::where('slug', $slug)->first();
            foreach ($newHighlights as $i => $title) {
                DepartmentHighlight::create([
                    'department_id' => $dept->id,
                    'icon' => ['GraduationCap', 'Users', 'Building2', 'Handshake'][$i],
                    'title' => $title,
                    'order' => $i,
                ]);
            }
            DepartmentStat::create(['department_id' => $dept->id, 'value' => (string) $dept->members()->count(), 'label' => 'Faculty & Staff', 'order' => 0]);
            DepartmentStat::create(['department_id' => $dept->id, 'value' => $dept->established, 'label' => 'Established', 'order' => 1]);
        }
    }

    public function down(): void
    {
        DepartmentMember::whereIn('department', ['dba', 'ais', 'eng', 'as'])->delete();
        Department::truncate();
    }
};
