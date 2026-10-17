<?php

namespace Database\Seeders;

use App\Models\DepartmentMember;
use Illuminate\Database\Seeder;

class CeDepartmentMemberSeeder extends Seeder
{
    public function run(): void
    {
        DepartmentMember::where('department', 'ce')->delete();

        $members = [
            [
                'name' => 'Professor Dr. Md. Mahmudul Hasan',
                'designation' => 'Dean (In-Charge) of the Faculty of Civil Engineering & Professor and Head of the Dept. of Civil Engg.',
                'photo' => '/images/ce/members/md_mahmudul_hasan.jpg',
                'phone' => '+8801769-662720 (Office) +8801712126942 (Personal)',
                'email' => 'headce@baust.edu.bd',
                'personal_email' => 'drmhasan2014@gmail.com',
                'education' => [
                    'PhD and M.Engg. in Civil and Environmental Engg., Ritsumeikan University, Japan',
                    'B.Sc in Civil Engineering, KUET',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'professor',
                'order' => 1
            ],
            [
                'name' => 'Kh. Shihab Uddin Ahmed',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/kh_shihab_uddin_ahmed.jpg',
                'phone' => '+8801763988745',
                'email' => 'kh.shihab@baust.edu.bd',
                'personal_email' => NULL,
                'education' => [
                    'B.Sc in Civil Engineering, BUET',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 2
            ],
            [
                'name' => 'Habibur Rahman',
                'designation' => 'Lecturer & Program Coordinator',
                'photo' => '/images/ce/members/habibur_rahman.jpg',
                'phone' => '+8801767834616',
                'email' => 'dpcce@baust.edu.bd',
                'personal_email' => 'habibce@baust.edu.bd',
                'education' => [
                    'M.Sc. in Civil and Environmental Engineering (Ongoing), KUET',
                    'B.Sc. in Civil Engineering, KUET',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 3
            ],
            [
                'name' => 'Md. Jahangir Alam',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/md_jahangir_alam.jpg',
                'phone' => '+8801717657540',
                'email' => 'jahangir_ce@baust.edu.bd',
                'personal_email' => 'jahangiralam1772@gmail.com',
                'education' => [
                    'B.Sc in Civil Engineering, KUET',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 4
            ],
            [
                'name' => 'Ahasanul Haque Hashib',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/ahasanul_haque_hashib.jpg',
                'phone' => '+8801409531383',
                'email' => 'hashib_ce@baust.edu.bd',
                'personal_email' => 'hashib.kuet.ce@gmail.com',
                'education' => [
                    'M.Sc in Civil and Transportation Engineering (Ongoing), BUET B.Sc in Civil Engineering, KUET',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 5
            ],
            [
                'name' => 'Sabiha Tasnim Rifa',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/sabiha_tasnim_rifa.jpeg',
                'phone' => '+8801754009237',
                'email' => 'strifa@baust.edu.bd',
                'personal_email' => 'rifasabiha0000@gmail.com',
                'education' => [
                    'M.Sc in Civil and Environmental Engineering (Ongoing), RUET',
                    'B.Sc in Civil Engineering, RUET',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 6
            ],
            [
                'name' => 'Faisal Ahmed',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/faisal_ahmed.jpg',
                'phone' => '+8801746390870 (Official & Personal)',
                'email' => 'faisalahmed_ce@baust.edu.bd',
                'personal_email' => 'faisalkuet1845@gmail.com',
                'education' => [
                    'M.Sc in Civil and Geotechnical Engineering (Ongoing), BUET',
                    'B.Sc in Civil Engineering, KUET',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 7
            ],
            [
                'name' => 'Anzuman Ara Priya',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/anzuman_ara_priya.jpeg',
                'phone' => '+8801724902127',
                'email' => 'anzumanara@baust.edu.bd',
                'personal_email' => NULL,
                'education' => [
                    'M.Sc in Civil and Structural Engineering (Ongoing), BUET B.Sc in Civil Engineering, BUET',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 8
            ],
            [
                'name' => 'Md. Sohrab Mia',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/md_sohrab_mia.jpg',
                'phone' => '+8801576619671 (Official) +8801747973693 (Personal)',
                'email' => 'sohrab@baust.edu.bd',
                'personal_email' => 'sohrabafrad@gmail.com',
                'education' => [
                    'M.Sc in Civil and Structural Engineering (Ongoing), BUET',
                    'B.Sc in Civil Engineering, BUET',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 9
            ],
            [
                'name' => 'Md. Aiman Wasee',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/md_aiman_wasee.jpg',
                'phone' => '+801744984093 (Official) +8801744984093 (Personal)',
                'email' => 'aiman@baust.edu.bd',
                'personal_email' => 'aiman.wasee@gmail.com',
                'education' => [
                    'B.Sc in Civil Engineering, KUET',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 10
            ],
            [
                'name' => 'Punom Roy',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/punom_roy.jpg',
                'phone' => '+8801303056351',
                'email' => 'punomroy@baust.edu.bd',
                'personal_email' => NULL,
                'education' => [
                    'B.Sc in Civil Engineering, KUET',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 11
            ],
            [
                'name' => 'MD. Ausaf Alam',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/md_ausaf_alam.png',
                'phone' => '01673601673',
                'email' => 'ausaf_ce@baust.edu.bd',
                'personal_email' => NULL,
                'education' => [
                    'B.Sc. in Civil Engineering, BUET',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 12
            ],
            [
                'name' => 'Md. Fazzle Rabby',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/md_fazzle_rabby.png',
                'phone' => '+8801789798651',
                'email' => 'fazzlece@baust.edu.bd',
                'personal_email' => 'fazzlecekuet@gmail.com',
                'education' => [
                    'B.Sc in Civil Engineering, KUET',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'study_leave',
                'category' => 'lecturer',
                'order' => 13
            ],
            [
                'name' => 'Md. Ahedul Islam',
                'designation' => 'Lab Technician',
                'photo' => '/images/ce/members/md_ahedul_islam.jpg',
                'phone' => '01515235618',
                'email' => 'ahedul@baust.edu.bd',
                'personal_email' => 'ahedulislam18@gmail.com',
                'education' => [
                    'Diploma in Civil Engineering, Rangpur Polytechnic Institute, Rangpur',
                ],
                'department' => 'ce',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_officer',
                'order' => 14
            ],
            [
                'name' => 'Tushar Ahmmed',
                'designation' => 'Lab Assistant',
                'photo' => '/images/ce/members/tushar_ahmmed.jpg',
                'phone' => '01811341297',
                'email' => 'tushar@baust.edu.bd',
                'personal_email' => NULL,
                'education' => [
                    'Diploma In Civil Engineering, TMSS Polytechnic Institute, Natore',
                ],
                'department' => 'ce',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_officer',
                'order' => 15
            ],
            [
                'name' => 'Md. Saikat Hossain',
                'designation' => 'Lab Assistant',
                'photo' => '/images/ce/members/md_saikat_hossain.jpg',
                'phone' => '01793063416',
                'email' => 'saikat@baust.edu.bd',
                'personal_email' => NULL,
                'education' => [
                    'Diploma In Civil Engineering, National Polytechnic Institute, Dhaka',
                ],
                'department' => 'ce',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_officer',
                'order' => 16
            ],
            [
                'name' => 'Md. Shakim Billah',
                'designation' => 'Messenger',
                'photo' => '/images/ce/members/md_shakim_billah.jpg',
                'phone' => '01766022173',
                'email' => NULL,
                'personal_email' => NULL,
                'education' => [],
                'department' => 'ce',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_staff',
                'order' => 17
            ],
            [
                'name' => 'Ole Foysal',
                'designation' => 'Cleaner',
                'photo' => '/images/ce/members/ole_foysal.jpg',
                'phone' => '01975274861',
                'email' => NULL,
                'personal_email' => NULL,
                'education' => [],
                'department' => 'ce',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_staff',
                'order' => 18
            ],
            [
                'name' => 'Md. Faysal Kabir',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/md_faysal_kabir.jpg',
                'phone' => '+8801706649065',
                'email' => 'From [04.09.2022] to [21.12.2025]',
                'personal_email' => NULL,
                'education' => [
                    'MSc in Civil and Transportation Engineering, BUET (Ongoing)',
                    'BSc in Civil Engineering, BUET',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'ex_faculty',
                'category' => 'lecturer',
                'order' => 19
            ],
            [
                'name' => 'Md. Habib-Ul-Bashar',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/md_habib_ul_bashar.png',
                'phone' => NULL,
                'email' => 'From [16.07.2023] to [21.08.2024]',
                'personal_email' => NULL,
                'education' => [
                    'B.Sc. in Civil Engineering (BUET)',
                    'M.Sc(Ongoing) in Structural Eng. (BUET)',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'ex_faculty',
                'category' => 'lecturer',
                'order' => 20
            ],
            [
                'name' => 'Md. Abdul Malek',
                'designation' => 'Teaching Assistant',
                'photo' => '/images/ce/members/md_abdul_malek.jpg',
                'phone' => '01613842396',
                'email' => 'abmalek1785@gmail.com',
                'personal_email' => NULL,
                'education' => [
                    'B.Sc. in Civil Engineering (BAUST)',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'ex_faculty',
                'category' => 'assistant_professor',
                'order' => 21
            ],
            [
                'name' => 'Md. Tauhid Ur Rahman, PhD',
                'designation' => 'Adjunct Faculty',
                'photo' => '/images/ce/members/md_tauhid_ur_rahman.jpeg',
                'phone' => NULL,
                'email' => 'tauhid@ce.mist.ac.bd',
                'personal_email' => NULL,
                'education' => [
                    'Professor, Department of Civil Engineering (CE), MIST',
                ],
                'department' => 'ce',
                'type' => 'adjunct',
                'status' => 'ex_faculty',
                'category' => 'lecturer',
                'order' => 22
            ],
            [
                'name' => 'Colonel Md Kabirul Islam',
                'designation' => 'Adjunct Faculty',
                'photo' => '/images/ce/members/colonel_md_kabirul_islam.jpeg',
                'phone' => NULL,
                'email' => NULL,
                'personal_email' => NULL,
                'education' => [
                    'Ex Professor at MIST, Bangladesh',
                ],
                'department' => 'ce',
                'type' => 'adjunct',
                'status' => 'ex_faculty',
                'category' => 'lecturer',
                'order' => 23
            ],
            [
                'name' => 'Md. Izharul Haque Azad',
                'designation' => 'Asst. Professor',
                'photo' => '/images/ce/members/md_izharul_haque_azad.jpg',
                'phone' => NULL,
                'email' => 'From [15.12.2019] to [21.04.2024]',
                'personal_email' => NULL,
                'education' => [
                    'B.Sc. in Civil Engineering (KUET)',
                    'M.Sc in Structural Eng (BUET)',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'ex_faculty',
                'category' => 'assistant_professor',
                'order' => 24
            ],
            [
                'name' => 'Md. Sadman Islam',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/md_sadman_islam.jpg',
                'phone' => NULL,
                'email' => 'From [1.8.2022] to [16.7.2023]',
                'personal_email' => NULL,
                'education' => [
                    'B.Sc. in Civil Engineering (BUET)',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'ex_faculty',
                'category' => 'lecturer',
                'order' => 25
            ],
            [
                'name' => 'Md. Asaduzzaman',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/md_asaduzzaman.jpg',
                'phone' => NULL,
                'email' => 'From [ ] to [ ]',
                'personal_email' => NULL,
                'education' => [
                    'B.Sc. in Civil Engineering (KUET)',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'ex_faculty',
                'category' => 'lecturer',
                'order' => 26
            ],
            [
                'name' => 'Abu Saif Md. Nasim Uddin',
                'designation' => 'Lecturer',
                'photo' => '/images/ce/members/abu_saif_md_nasim_uddin.jpg',
                'phone' => NULL,
                'email' => 'From [Dec, 2019] to [March, 2022]',
                'personal_email' => NULL,
                'education' => [
                    'B.Sc. in Civil Engineering (BUET)',
                ],
                'department' => 'ce',
                'type' => 'permanent',
                'status' => 'ex_faculty',
                'category' => 'lecturer',
                'order' => 27
            ],
            [
                'name' => 'Md. Raju Mia',
                'designation' => 'Lab Technician',
                'photo' => '/images/ce/members/md_raju_mia.jpg',
                'phone' => '01786834668',
                'email' => 'rajumiarpi304681@gmail.com',
                'personal_email' => NULL,
                'education' => [
                    'Diploma in Civil Engineering',
                ],
                'department' => 'ce',
                'type' => 'staff',
                'status' => 'ex_officer',
                'category' => 'academic_officer',
                'order' => 28
            ],
        ];

        foreach ($members as $member) {
            DepartmentMember::create($member);
        }
    }
}
