<?php

namespace Database\Seeders;

use App\Models\DepartmentMember;
use Illuminate\Database\Seeder;

class IctDepartmentMemberSeeder extends Seeder
{
    public function run(): void
    {
        // First delete any existing ICT department members to avoid duplication if run multiple times
        DepartmentMember::where('department', 'ict')->delete();

        $members = [
            // --- Permanent Faculty (Active) ---
            [
                'name' => 'Engr. Md. Mamun Hossain',
                'designation' => 'Associate Professor and Head',
                'photo' => '/images/cse/members/CSE03.jpeg',
                'phone' => '+8801713998847',
                'email' => 'mhossain@baust.edu.bd',
                'personal_email' => 'mdmamun51@gmail.com',
                'education' => ['Ph.D. Researcher, CSE, RUET', 'M.Sc. (Thesis) in CSE', 'B.Sc. Engg. in CSE, SUST'],
                'department' => 'ict',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'associate_professor',
                'order' => 1
            ],
            [
                'name' => 'Dr. Engr. Mohammed Sowket Ali',
                'designation' => 'Associate Professor',
                'photo' => '/images/cse/members/CSE02.jpg',
                'phone' => '+8801709662713',
                'email' => 'sowket@baust.edu.bd',
                'personal_email' => 's.sowket@gmail.com',
                'education' => ['PhD. and M.Engg. (South Korea)', 'B.Sc. Engg., FIEB, FBCS, Senior Member-IACSIT'],
                'department' => 'ict',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'associate_professor',
                'order' => 2
            ],
            [
                'name' => 'Tasmim',
                'designation' => 'Lecturer',
                'photo' => '/images/ict/members/tasmim.jpeg',
                'phone' => '01703830359',
                'email' => 'tasmim@baust.edu.bd',
                'personal_email' => null,
                'education' => ['M.Sc. Engg. in CSE, RUET (On-going)', 'B.Sc. Engg. in ECE (RUET)'],
                'department' => 'ict',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 3
            ],
            [
                'name' => 'Md. Abdun Noor Polok',
                'designation' => 'Lecturer & Program Coordinator',
                'photo' => '/images/ict/members/md_abdun_noor_polok.jpg',
                'phone' => '01521403890',
                'email' => 'poloknoor@baust.edu.bd',
                'personal_email' => 'poloknoor06@gmail.com',
                'education' => ['M.Sc. Engg. In CSE, KUET (Pursuing)', 'B.Sc. in ICE, BAUET'],
                'department' => 'ict',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 4
            ],
            [
                'name' => 'Asif Idris Tuhin',
                'designation' => 'Lecturer',
                'photo' => '/images/ict/members/asif_idris_tuhin.jpg',
                'phone' => '01787380880',
                'email' => 'tuhin@baust.edu.bd',
                'personal_email' => 'tuhin123000@gmail.com',
                'education' => ['M.Sc. Engg. in CSE, RUET (ongoing)', 'B.Sc. Engg. in CSE, SUST'],
                'department' => 'ict',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 5
            ],
            [
                'name' => 'Tazrian Billah',
                'designation' => 'Lecturer',
                'photo' => '/images/ict/members/tazrian_billah.jpg',
                'phone' => '01957721943',
                'email' => 'tazrian@baust.edu.bd',
                'personal_email' => 'tazrian.baust@gmail.com',
                'education' => ['B.Sc. in CSE, BAUST'],
                'department' => 'ict',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 6
            ],
            [
                'name' => 'Meftahul Jannat',
                'designation' => 'Lecturer',
                'photo' => '/images/ict/members/meftahul_jannat.jpeg',
                'phone' => '01716155607',
                'email' => 'meftahul.jannat@baust.edu.bd',
                'personal_email' => 'mefta.ruet19@gmail.com',
                'education' => ['B.Sc. Engg. in ETE, RUET'],
                'department' => 'ict',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 7
            ],
            [
                'name' => 'Humaira Fairooz Moohy',
                'designation' => 'Lecturer',
                'photo' => '/images/ict/members/humaira_fairooz_moohy.jpeg',
                'phone' => '01844260298',
                'email' => 'humaira@baust.edu.bd',
                'personal_email' => 'humairaete19@gmail.com',
                'education' => ['M.Sc. in ETE, CUET (Ongoing)', 'B.Sc. in ETE, CUET'],
                'department' => 'ict',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 8
            ],

            // --- Adjunct Faculty ---
            [
                'name' => 'Lt Col Prof. Dr. Md Shameem Reza (Retd)',
                'designation' => 'Professor',
                'photo' => '/images/ict/members/md_shameem_reza_retd.jpeg',
                'phone' => '+8801769662723',
                'email' => 'treasurer@baust.edu.bd',
                'personal_email' => null,
                'education' => ['PhD (RU)'],
                'department' => 'ict',
                'type' => 'adjunct',
                'status' => 'active',
                'category' => 'professor',
                'order' => 9
            ],
            [
                'name' => 'Dr. Kazi Mohammad Anamoul Haque',
                'designation' => 'Associate Professor',
                'photo' => '/images/ict/members/kazi_mohammad_anamoul_haque.jpg',
                'phone' => '+8801769675597',
                'email' => 'dkmah@baust.edu.bd',
                'personal_email' => 'anamnano@gmail.com',
                'education' => ['B.Sc.(Hons.), M.Sc., Ph. D.(SUST)'],
                'department' => 'ict',
                'type' => 'adjunct',
                'status' => 'active',
                'category' => 'associate_professor',
                'order' => 10
            ],
            [
                'name' => 'Md. Abu Rayhan',
                'designation' => 'Associate Professor',
                'photo' => '/images/ict/members/md_abu_rayhan.jpg',
                'phone' => '01723757146',
                'email' => 'aburayhan@baust.edu.bd',
                'personal_email' => 'rayhan4302@gmail.com',
                'education' => ['B.Sc. (Hons.), M.Sc. (Thesis), RU', 'Pursuing PhD (CUET)'],
                'department' => 'ict',
                'type' => 'adjunct',
                'status' => 'active',
                'category' => 'associate_professor',
                'order' => 11
            ],
            [
                'name' => 'Irfan Raju',
                'designation' => 'Assistant Professor',
                'photo' => '/images/ict/members/irfan_raju.jpg',
                'phone' => '01743810588',
                'email' => 'irfan@baust.edu.bd',
                'personal_email' => 'tirfanraju11@gmail.com',
                'education' => ['M.Sc. (Thesis) & B.Sc. (Hons) in Mathematics, University of Rajshahi'],
                'department' => 'ict',
                'type' => 'adjunct',
                'status' => 'active',
                'category' => 'assistant_professor',
                'order' => 12
            ],

            // --- Academic Officer ---
            [
                'name' => 'Md. Sakhawad Hossain',
                'designation' => 'Lab Technician',
                'photo' => '/images/ict/members/md_sakhawad_hossain.jpg',
                'phone' => '01765964284',
                'email' => 'sakhawat.text@gmail.com',
                'personal_email' => null,
                'education' => ['B.Sc in CSE'],
                'department' => 'ict',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_officer',
                'order' => 13
            ],

            // --- Academic Staff ---
            [
                'name' => 'Airin Aktar',
                'designation' => 'Office Assistant',
                'photo' => '/images/ict/members/airin_aktar.png',
                'phone' => '01767868698',
                'email' => null,
                'personal_email' => null,
                'education' => ['Graduation (BSS)'],
                'department' => 'ict',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_staff',
                'order' => 14
            ],
        ];

        foreach ($members as $member) {
            DepartmentMember::create($member);
        }
    }
}
