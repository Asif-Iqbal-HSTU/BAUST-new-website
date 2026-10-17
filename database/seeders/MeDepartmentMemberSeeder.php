<?php

namespace Database\Seeders;

use App\Models\DepartmentMember;
use Illuminate\Database\Seeder;

class MeDepartmentMemberSeeder extends Seeder
{
    public function run(): void
    {
        DepartmentMember::where('department', 'me')->delete();

        $members = [
            // --- Permanent Faculty (Active) ---
            [
                'name' => 'Md. Mahmudul Adil',
                'designation' => 'Assistant Professor and Head, Dept. of ME.',
                'photo' => '/images/me/members/md_mahmudul_adil.jpg',
                'phone' => '01769-675564(Head), 01773421369',
                'email' => 'headme@baust.edu.bd',
                'personal_email' => 'mahmuduladil95@gmail.com',
                'education' => ['B.Sc. in Mechanical Engineering, CUET', 'M.Sc. in Mechanical Engineering, CUET'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'assistant_professor',
                'order' => 1
            ],
            [
                'name' => 'Prof. Dr. Imtiaz Ahmed Choudhury',
                'designation' => 'Professor and Dean, Faculty of ME.',
                'photo' => '/images/me/members/imtiaz_ahmed_choudhury.jpg',
                'phone' => '01769675564(office), 01726-644025',
                'email' => 'dean_me@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc. (ME), MEng, MS, PhD, CEng (UK).'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'professor',
                'order' => 2
            ],
            [
                'name' => 'Dr. Md. Syful Islam',
                'designation' => 'Professor',
                'photo' => '/images/me/members/md_syful_islam.jpg',
                'phone' => '01747107765(personal)',
                'email' => 'msislam@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc. Engg. (BUET)', 'M.Sc. in Mechanical Engineering, Tuskegee University, Tuskegee, Alabama, USA', 'PhD in Mechanical Engineering, University of Nevada Las Vegas Las Vegas, Nevada, USA'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'professor',
                'order' => 3
            ],
            [
                'name' => 'Tasfia Tasnim',
                'designation' => 'Assistant Professor',
                'photo' => '/images/me/members/tasfia_tasnim.jpg',
                'phone' => '01759805908',
                'email' => 'tasfia@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc. Engg. in ME (CUET)', 'M.Sc. Engg. in ME (CUET)'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'assistant_professor',
                'order' => 4
            ],
            [
                'name' => 'Md. Waheduzzaman Basunia Nouman',
                'designation' => 'Assistant Professor',
                'photo' => '/images/me/members/md_waheduzzaman_basunia_nouman.png',
                'phone' => '01773911016',
                'email' => 'nouman@baust.edu.bd',
                'personal_email' => 'md.waheduzzaman.nouman@gmail.com',
                'education' => ['B. Sc. Engg. in ME (BUET)', 'M.Sc. Engg. in ME (BUET)'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'assistant_professor',
                'order' => 5
            ],
            [
                'name' => 'Md. Abu Daud',
                'designation' => 'Lecturer',
                'photo' => '/images/me/members/md_abu_daud.jpg',
                'phone' => '01761683344',
                'email' => 'daud.me@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc. Engg. in ME (RUET)', 'M.Sc. Engg. in ME, (RUET)-Ongoing'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 6
            ],
            [
                'name' => 'Md. Abdullah Al Mohotadi',
                'designation' => 'Lecturer',
                'photo' => '/images/me/members/md_abdullah_al_mohotadi.jpeg',
                'phone' => '01774658810',
                'email' => 'mohotadi@baust.edu.bd',
                'personal_email' => 'abdullahmohotadi@gmail.com',
                'education' => ['B.Sc in Mechanical Engineering (KUET)', 'M.Sc in Mechanical Engineering (KUET) [Ongoing]'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 7
            ],
            [
                'name' => 'Kabid Ahmed Akib',
                'designation' => 'Lecturer and DPC',
                'photo' => '/images/me/members/kabid_ahmed_akib.jpeg',
                'phone' => '01937711667',
                'email' => 'kabidahmed@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc in Mechanical Engg. (RUET)', 'M.Sc in Mechanical Engg. (RUET) , Ongoing'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 8
            ],
            [
                'name' => 'Md. Tausifuz Zaman',
                'designation' => 'Lecturer',
                'photo' => '/images/me/members/md_tausifuz_zaman.jpg',
                'phone' => '01758774856',
                'email' => 'tausifuz@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc in Mechanical Engg. BUET'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 9
            ],
            [
                'name' => 'Iqbal Nafis Razee',
                'designation' => 'Lecturer',
                'photo' => '/images/me/members/iqbal_nafis_razee.jpg',
                'phone' => '01300560747',
                'email' => 'iqbal.nafis74@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc in Mechanical Engineering(BUET)'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 10
            ],
            [
                'name' => 'Md. Tahmid Anjum Khan',
                'designation' => 'Lecturer',
                'photo' => '/images/me/members/md_tahmid_anjum_khan.jpg',
                'phone' => '01303-137882',
                'email' => 'tahmid.khan@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc in Mechanical Engineering (BUET)'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 11
            ],
            [
                'name' => 'Eftekher Ahmed Reyad',
                'designation' => 'Lecturer',
                'photo' => '/images/me/members/eftekher_ahmed_reyad.jpg',
                'phone' => '01746309525',
                'email' => 'reyad@baust.edu.bd',
                'personal_email' => 'reyadahmed05@gmail.com',
                'education' => ['BSc in ME, BUET'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 12
            ],

            // --- Adjunct Faculty ---
            [
                'name' => 'Professor Mohammad Ali',
                'designation' => 'Professor',
                'photo' => '/images/me/members/professor_mohammad_ali.jpg',
                'phone' => '01732194776',
                'email' => 'mali@buet.ac.bd',
                'personal_email' => null,
                'education' => ['Ph.D. (Nagoya University, Japan), M.Sc. Engg. & B. Sc. Engg. (BUET)'],
                'department' => 'me',
                'type' => 'adjunct',
                'status' => 'active',
                'category' => 'professor',
                'order' => 13
            ],
            [
                'name' => 'Professor Dr. Mohammad Mamun',
                'designation' => 'Professor',
                'photo' => '/images/me/members/professor_mohammad_mamun.png',
                'phone' => '01714-386925',
                'email' => 'mdmamun@me.buet.ac.bd',
                'personal_email' => null,
                'education' => ['Ph.D. (Saga University, Japan), M.Sc. Engg. & B.Sc. Engg. (BUET).'],
                'department' => 'me',
                'type' => 'adjunct',
                'status' => 'active',
                'category' => 'professor',
                'order' => 14
            ],
            [
                'name' => 'Dr. Aloke Kumar Mozumder',
                'designation' => 'Professor',
                'photo' => '/images/me/members/aloke_kumar_mozumder.png',
                'phone' => '880-2-9665636',
                'email' => 'aloke@me.buet.ac.bd',
                'personal_email' => null,
                'education' => ['Ph.D. (Japan), M.Sc. (BUET), B.Sc. (BUET)'],
                'department' => 'me',
                'type' => 'adjunct',
                'status' => 'active',
                'category' => 'professor',
                'order' => 15
            ],
            [
                'name' => 'A K M Monjur Morshed',
                'designation' => 'Professor',
                'photo' => '/images/me/members/a_k_m_monjur_morshed.jpg',
                'phone' => '01687913985',
                'email' => 'monjur_morshed@me.buet.ac.bd',
                'personal_email' => null,
                'education' => ['Ph.D. (University of South Carolina), M.Sc. Engg. & B. Sc. Engg. (BUET)'],
                'department' => 'me',
                'type' => 'adjunct',
                'status' => 'active',
                'category' => 'professor',
                'order' => 16
            ],

            // --- Faculty on Study Leave ---
            [
                'name' => 'Robiul Islam Rubel',
                'designation' => 'Lecturer',
                'photo' => '/images/me/members/robiul_islam_rubel.png',
                'phone' => '+8801749399082',
                'email' => 'rubel@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc. Engg. in ME (RUET), Ph.D. (South Dakota University, USA)'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'study_leave',
                'category' => 'lecturer',
                'order' => 17
            ],
            [
                'name' => 'Rafsun Hossain Mridha',
                'designation' => 'Lecturer',
                'photo' => null,
                'phone' => '01521498102',
                'email' => 'rafsunhossainmridha@gmail.com',
                'personal_email' => null,
                'education' => ['B.Sc. in Mechanical Engineering'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'study_leave',
                'category' => 'lecturer',
                'order' => 18
            ],
            [
                'name' => 'Md. Washim Akram',
                'designation' => 'Lecturer',
                'photo' => '/images/me/members/md_washim_akram.png',
                'phone' => '01778384882',
                'email' => 'washim@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc. Engg. in ME (RUET), (University Gold Medalist), M.Sc. (University of Saskatchewan, Canada)'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'study_leave',
                'category' => 'lecturer',
                'order' => 19
            ],
            [
                'name' => 'Md. Sharier Nazim',
                'designation' => 'Lecturer',
                'photo' => '/images/me/members/md_sharier_nazim.jpg',
                'phone' => '01689432893',
                'email' => 'shariernazim@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc in ME (KUET)'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'study_leave',
                'category' => 'lecturer',
                'order' => 20
            ],
            [
                'name' => 'Md. Abu Jafor',
                'designation' => 'Lecturer',
                'photo' => '/images/me/members/md_abu_jafor.png',
                'phone' => '01769675565',
                'email' => 'jafor@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc. Engg. in ME (CUET) Ph.D. (Ongoing), (Baylor University, USA)'],
                'department' => 'me',
                'type' => 'permanent',
                'status' => 'study_leave',
                'category' => 'lecturer',
                'order' => 21
            ],

            // --- Academic Officer (Lab Technicians) ---
            [
                'name' => 'Abu Sufian',
                'designation' => 'Lab Technician',
                'photo' => '/images/me/members/abu_sufian.png',
                'phone' => '01817696391',
                'email' => 'sufianbaust@gmail.com',
                'personal_email' => null,
                'education' => ['Diploma in Mechanical Engineering'],
                'department' => 'me',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_officer',
                'order' => 22
            ],
            [
                'name' => 'Md. Nahimul Islam',
                'designation' => 'Lab Technician',
                'photo' => '/images/me/members/md_nahimul_islam.jpg',
                'phone' => '01761-260758',
                'email' => 'nahimul1999@gmail.com',
                'personal_email' => null,
                'education' => ['Diploma in Mechanical Engineering, B.Sc. Engg. in ME (Ongoing, IEB)'],
                'department' => 'me',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_officer',
                'order' => 23
            ],
            [
                'name' => 'Rofiqul Islam',
                'designation' => 'Lab Technician',
                'photo' => '/images/me/members/rofiqul_islam.png',
                'phone' => '01744812346',
                'email' => 'rofiqulislam616@gmail.com',
                'personal_email' => null,
                'education' => ['Diploma in Mechanical Engineering, B.Sc. in ME (Ongoing, City University)'],
                'department' => 'me',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_officer',
                'order' => 24
            ],
            [
                'name' => 'Md. Ashiqur Rahaman',
                'designation' => 'Lab Technician',
                'photo' => '/images/me/members/md_ashiqur_rahaman.jpg',
                'phone' => '+8801781-373451',
                'email' => 'bmashiqur2014@gmail.com',
                'personal_email' => null,
                'education' => ['Diploma in Mechanical Engineering'],
                'department' => 'me',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_officer',
                'order' => 25
            ],
            [
                'name' => 'Md. Ajgor Ali',
                'designation' => 'Lab Technician',
                'photo' => '/images/me/members/md_ajgor_ali.jpg',
                'phone' => '+8801822-339255',
                'email' => 'ajgor2255@gmail.com',
                'personal_email' => null,
                'education' => ['Diploma in Mechanical Engineering'],
                'department' => 'me',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_officer',
                'order' => 26
            ],

            // --- Academic Staff (Lab/Office Assistants) ---
            [
                'name' => 'Mithun Babu',
                'designation' => 'Lab Assistant',
                'photo' => '/images/me/members/mithun_babu.jpg',
                'phone' => '+88 01824450619',
                'email' => 'mbmithunbabu@gmail.com',
                'personal_email' => null,
                'education' => ['Diploma in Engineering (Mechanical)', 'BSC in ME'],
                'department' => 'me',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_staff',
                'order' => 27
            ],
            [
                'name' => 'Md. Yahiya Rahman',
                'designation' => 'Office Assistant',
                'photo' => '/images/me/members/md_yahiya_rahman.jpg',
                'phone' => '01763796411 / 01766749755',
                'email' => 'yahiyabaust@gmail.com',
                'personal_email' => null,
                'education' => ['BBA (Hons.) in Accounting'],
                'department' => 'me',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_staff',
                'order' => 28
            ],
            [
                'name' => 'Md. Toriq-Ul-Islam',
                'designation' => 'Lab Assistant',
                'photo' => 'https://baust.edu.bd/me/wp-content/uploads/sites/19/2022/02/Toriq-Ul-Islam-ME-240x300.jpg',
                'phone' => '01723974434',
                'email' => 'torikul.islam4434@gmail.com',
                'personal_email' => null,
                'education' => ['Diploma in Engineering (Power)'],
                'department' => 'me',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_staff',
                'order' => 29
            ],
            [
                'name' => 'Md. Sohidul Islam',
                'designation' => 'Cleaner',
                'photo' => '/images/me/members/md_sohidul_islam.jpg',
                'phone' => '01936431813',
                'email' => 'sohidulbaust@gmail.com',
                'personal_email' => null,
                'education' => ['Class Eight'],
                'department' => 'me',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_staff',
                'order' => 30
            ]
        ];

        foreach ($members as $member) {
            DepartmentMember::create($member);
        }
    }
}
