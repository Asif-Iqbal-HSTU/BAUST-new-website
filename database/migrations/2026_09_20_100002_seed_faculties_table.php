<?php

use App\Models\Faculty;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Move the previously hardcoded Dean's Office metadata (from
     * OfficeMember::facultyMeta()) into the new faculties table so it
     * becomes editable from the admin panel.
     */
    public function up(): void
    {
        $faculties = [
            'fece' => [
                'office_name' => "FECE Dean's Office",
                'office_subtitle' => 'Faculty of Electrical & Computer Engineering',
                'code' => 'FECE',
                'name' => 'Faculty of Electrical and Computer Engineering',
                'title' => "FECE Dean's Office",
                'tagline' => 'Pioneering cutting-edge research, intelligent systems, and world-class engineering education.',
                'about' => 'The Faculty of Electrical and Computer Engineering (FECE) at BAUST provides rigorous education and cutting-edge technological innovation. FECE oversees academic standards, outcome-based curricula, and dynamic laboratory facilities across its computing and electrical departments.',
                'location' => 'Academic Building 1, 2nd Floor, BAUST Campus, Saidpur Cantonment',
                'phone' => '+8801769675550',
                'email' => 'dean_ece@baust.edu.bd',
                'department_slugs' => ['cse', 'eee', 'ict'],
                'order' => 1,
            ],
            'fme' => [
                'office_name' => "FME Dean's Office",
                'office_subtitle' => 'Faculty of Mechanical Engineering',
                'code' => 'FME',
                'name' => 'Faculty of Mechanical Engineering',
                'title' => "FME Dean's Office",
                'tagline' => 'Advancing advanced manufacturing, thermal sciences, and industrial engineering excellence.',
                'about' => 'The Faculty of Mechanical Engineering (FME) fosters hands-on technical competence, industrial design, and multidisciplinary research. The Dean’s office coordinates curriculum accreditation, industrial attachments, and research projects across mechanical and production disciplines.',
                'location' => 'Academic Building 2, 3rd Floor, BAUST Campus, Saidpur Cantonment',
                'phone' => '+8801769675557',
                'email' => 'dean_me@baust.edu.bd',
                'department_slugs' => ['me', 'ipe'],
                'order' => 2,
            ],
            'fce' => [
                'office_name' => "FCE Dean's Office",
                'office_subtitle' => 'Faculty of Civil Engineering',
                'code' => 'FCE',
                'name' => 'Faculty of Civil Engineering',
                'title' => "FCE Dean's Office",
                'tagline' => 'Building sustainable infrastructure, environmental resilience, and modern civil engineering solutions.',
                'about' => 'The Faculty of Civil Engineering (FCE) is committed to producing visionary engineers equipped for modern structural engineering, geotechnical analysis, and sustainable urban design. The Dean’s Office leads academic oversight, quality assurance, and testing consultancy.',
                'location' => 'Academic Building 1, 3rd Floor, BAUST Campus, Saidpur Cantonment',
                'phone' => '01769-662720',
                'email' => 'dean_ce@baust.edu.bd',
                'department_slugs' => ['ce'],
                'order' => 3,
            ],
            'fbs' => [
                'office_name' => "FBS Dean's Office",
                'office_subtitle' => 'Faculty of Business Studies',
                'code' => 'FBS',
                'name' => 'Faculty of Business Studies',
                'title' => "FBS Dean's Office",
                'tagline' => 'Nurturing ethical business leadership, financial innovation, and entrepreneurial mindsets.',
                'about' => 'The Faculty of Business Studies (FBS) prepares future executives, entrepreneurs, and accountants through contemporary management frameworks, analytical decision-making, and ethical business paradigms.',
                'location' => 'Academic Building 2, 1st Floor, BAUST Campus, Saidpur Cantonment',
                'phone' => '+8801769662723',
                'email' => 'dean_bs@baust.edu.bd',
                'department_slugs' => ['dba', 'ais'],
                'order' => 4,
            ],
            'fsh' => [
                'office_name' => "FSH Dean's Office",
                'office_subtitle' => 'Faculty of Science and Humanities',
                'code' => 'FSH',
                'name' => 'Faculty of Science and Humanities',
                'title' => "FSH Dean's Office",
                'tagline' => 'Fostering foundational science, language mastery, and humanities inquiry across all disciplines.',
                'about' => 'The Faculty of Science and Humanities (FSH) provides the foundational scientific principles, mathematical rigor, and linguistic competence essential for comprehensive university education at BAUST.',
                'location' => 'Academic Building 1, 1st Floor, BAUST Campus, Saidpur Cantonment',
                'phone' => '01717142817',
                'email' => 'dean_sh@baust.edu.bd',
                'department_slugs' => ['eng', 'as'],
                'order' => 5,
            ],
        ];

        foreach ($faculties as $slug => $data) {
            Faculty::updateOrCreate(['slug' => $slug], $data);
        }
    }

    public function down(): void
    {
        Faculty::whereIn('slug', ['fece', 'fme', 'fce', 'fbs', 'fsh'])->delete();
    }
};
