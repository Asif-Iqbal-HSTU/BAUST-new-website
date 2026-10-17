<?php

namespace Database\Seeders;

use App\Models\DepartmentMember;
use Illuminate\Database\Seeder;

class IpeDepartmentMemberSeeder extends Seeder
{
    public function run(): void
    {
        DepartmentMember::where('department', 'ipe')->delete();

        $members = [
            // --- Permanent Faculty (Active) ---
            [
                'name' => 'Prof. Dr. Imtiaz Ahmed Choudhury',
                'designation' => 'Professor and Dean, Faculty of ME',
                'photo' => '/images/ipe/members/imtiaz_ahmed_choudhury.jpg',
                'phone' => '+8801769675557 (Office) +8801726644025 (Personal)',
                'email' => 'dean_me@baust.edu.bd',
                'personal_email' => 'imtiaz.ipe@baust.edu.bd',
                'education' => ['B.Sc Engg. (BUET), M.Eng. (AIT), M.Sc. (USA), PhD, CEng (UK)'],
                'department' => 'ipe',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'professor',
                'order' => 1
            ],
            [
                'name' => 'Prof. Dr. Md Shameem Reza',
                'designation' => 'Professor',
                'photo' => '/images/ipe/members/md_shameem_reza.jpeg',
                'phone' => '+8801769662723',
                'email' => 'treasurer@baust.edu.bd',
                'personal_email' => null,
                'education' => ['PhD (RU)'],
                'department' => 'ipe',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'professor',
                'order' => 2
            ],
            [
                'name' => 'Md. Ariful Alam',
                'designation' => 'Assistant Professor & Head of the Dept.',
                'photo' => '/images/ipe/members/md_ariful_alam.jpg',
                'phone' => '+8801769675566 (Office) +8801729141848 (Personal)',
                'email' => 'headipe@baust.edu.bd',
                'personal_email' => 'arif.ipe@baust.edu.bd',
                'education' => ['B.Sc. Engg. in IPE (KUET), M.Sc. Engg. in IEM (KUET), MIEB'],
                'department' => 'ipe',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'assistant_professor',
                'order' => 3
            ],
            [
                'name' => 'Md. Ragib Abid',
                'designation' => 'Lecturer',
                'photo' => '/images/ipe/members/md_ragib_abid.jpeg',
                'phone' => '01819754317',
                'email' => 'abid@baust.edu.bd',
                'personal_email' => 'dpcipe@baust.edu.bd',
                'education' => ['B.Sc in IPE (KUET), M.Sc in IPE (BUET) (Pursuing)'],
                'department' => 'ipe',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 4
            ],
            [
                'name' => 'Hrittik Mural',
                'designation' => 'Lecturer & Program Coordinator',
                'photo' => '/images/ipe/members/hrittik_mural.jpeg',
                'phone' => '01786106369',
                'email' => 'hrittikmuralarnab1998@gmail.com',
                'personal_email' => null,
                'education' => ['B.Sc Engg in MIE (CUET), M.Sc in ME (CUET) (Pursuing)'],
                'department' => 'ipe',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 5
            ],
            [
                'name' => 'Md. Mahabub-A-Khoda',
                'designation' => 'Lecturer',
                'photo' => '/images/ipe/members/md_mahabub_a_khoda.jpg',
                'phone' => '01717977861',
                'email' => 'mahabub_ipe@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc. Engg. in IPE (KUET), M.Sc in IPE (RUET) (Pursuing)'],
                'department' => 'ipe',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 6
            ],
            [
                'name' => 'Abdul Halim',
                'designation' => 'Lecturer',
                'photo' => '/images/ipe/members/abdul_halim.jpg',
                'phone' => '01869267325',
                'email' => 'abdulhalim@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc. Engg. in IPE (RUET), M.Sc in IPE (RUET) (Pursuing)'],
                'department' => 'ipe',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 7
            ],
            [
                'name' => 'A.S.M. Shahriar Hossain Alvee',
                'designation' => 'Lecturer',
                'photo' => '/images/ipe/members/asm_shahriar_hossain_alvee.jpg',
                'phone' => '01710740848',
                'email' => 'alveeshahriar.ipe@baust.edu.bd',
                'personal_email' => 'alveeshahriar.ipe.19@gmail.com',
                'education' => ['B.Sc. Engg. in IPE (RUET), M.Sc in IPE (RUET) (Pursuing)'],
                'department' => 'ipe',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'order' => 8
            ],

            // --- Adjunct Faculty ---
            [
                'name' => 'Dr. Sultana Parveen',
                'designation' => 'Professor (BUET)',
                'photo' => '/images/ipe/members/sultana_parveen.jpg',
                'phone' => null,
                'email' => 'sparveen@ipe.buet.ac.bd',
                'personal_email' => null,
                'education' => ['B.Sc. Engg. & M. Sc. Engg. (BUET) Ph.D. (BUET)'],
                'department' => 'ipe',
                'type' => 'adjunct',
                'status' => 'active',
                'category' => 'professor',
                'order' => 9
            ],
            [
                'name' => 'Dr. Abdullahil Azeem',
                'designation' => 'Professor (BUET)',
                'photo' => '/images/ipe/members/abdullahil_azeem.jpg',
                'phone' => null,
                'email' => 'azeem@ipe.buet.ac.bd',
                'personal_email' => null,
                'education' => ['B.Sc. Engg. (BUET), M. Sc. Engg. (AIT, Thailand), Ph.D. (Canada)'],
                'department' => 'ipe',
                'type' => 'adjunct',
                'status' => 'active',
                'category' => 'professor',
                'order' => 10
            ],

            // --- Faculty Members on Leave ---
            [
                'name' => 'Md Mehedi Hasan',
                'designation' => 'Lecturer',
                'photo' => '/images/ipe/members/md_mehedi_hasan.jpg',
                'phone' => '01792525929',
                'email' => 'mehedihasanhridoy99@gmail.com',
                'personal_email' => null,
                'education' => ['B.Sc in IPE (BUET), PhD Candidate at Auburn University, USA'],
                'department' => 'ipe',
                'type' => 'permanent',
                'status' => 'study_leave',
                'category' => 'lecturer',
                'order' => 11
            ],
            [
                'name' => 'Md. Injamamul Haque Protyai',
                'designation' => 'Lecturer',
                'photo' => '/images/ipe/members/md_injamamul_haque_protyai.jpeg',
                'phone' => '01533573091',
                'email' => 'injamamul@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc in IPE, PhD Student, University of Arkansas, USA'],
                'department' => 'ipe',
                'type' => 'permanent',
                'status' => 'study_leave',
                'category' => 'lecturer',
                'order' => 12
            ],

            // --- Academic Officer (Lab Technicians) ---
            [
                'name' => 'Md. Nahimul Islam',
                'designation' => 'Lab Technician',
                'photo' => '/images/ipe/members/md_nahimul_islam.jpg',
                'phone' => '01761-260758',
                'email' => 'nahimul1999@gmail.com',
                'personal_email' => null,
                'education' => ['Diploma(Mechanical),B.Sc.(Mechanical),IEB [Ongoing]'],
                'department' => 'ipe',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_officer',
                'order' => 13
            ],
            [
                'name' => 'Md. Rofiqul Islam',
                'designation' => 'Lab Technician',
                'photo' => '/images/ipe/members/md_rofiqul_islam.png',
                'phone' => '01744812346',
                'email' => 'rofiqulislam616@gmail.com',
                'personal_email' => null,
                'education' => ['B. Sc. in Mechanical Engineering'],
                'department' => 'ipe',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_officer',
                'order' => 14
            ],

            // --- Academic Staff (Lab/Office Assistants) ---
            [
                'name' => 'Md. Khademul Islam',
                'designation' => 'Lab Assistant',
                'photo' => '/images/ipe/members/md_khademul_islam.jpg',
                'phone' => '01755439822',
                'email' => 'khkhademul22@gmail.com',
                'personal_email' => null,
                'education' => ['B. Sc. in Mechanical Engineering'],
                'department' => 'ipe',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_staff',
                'order' => 15
            ],
            [
                'name' => 'Md. Habibulla Hossen',
                'designation' => 'Office Assistant',
                'photo' => '/images/ipe/members/md_habibulla_hossen.jpg',
                'phone' => '01765674976',
                'email' => 'mdhabibulla370@gmail.com',
                'personal_email' => null,
                'education' => [],
                'department' => 'ipe',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_staff',
                'order' => 16
            ],
            // --- Ex-Faculty Members ---
            [
                'name' => 'Md. Firoz Kabir',
                'designation' => 'Assistant Professor',
                'photo' => '/images/ipe/members/md_firoz_kabir.jpg',
                'phone' => '01737572421',
                'email' => 'firozipe10@gmail.com',
                'personal_email' => null,
                'education' => ['B.Sc. Engg. in IPE (RUET)', 'M.Sc in IPE (RUET)', 'PhD (Pursuing), RUET'],
                'department' => 'ipe',
                'type' => 'permanent',
                'status' => 'ex_faculty',
                'category' => 'assistant_professor',
                'order' => 17
            ],
            [
                'name' => 'Md. Mushiur Rahman',
                'designation' => 'Lecturer',
                'photo' => '/images/ipe/members/md_mushiur_rahman.jpeg',
                'phone' => '01568796159',
                'email' => 'mushiur4582@baust.edu.bd',
                'personal_email' => null,
                'education' => ['B.Sc. Engg. in IPE (RUET)', 'M.Sc in IPE (RUET) (Pursuing)'],
                'department' => 'ipe',
                'type' => 'permanent',
                'status' => 'ex_faculty',
                'category' => 'lecturer',
                'order' => 18
            ],
            [
                'name' => 'Parth Pratim Das Pritam',
                'designation' => 'Lecturer',
                'photo' => '/images/ipe/members/parth_pratim_das_pritam.jpg',
                'phone' => '+8801788627878',
                'email' => 'parth.ipe.36@gmail.com',
                'personal_email' => null,
                'education' => ['B.Sc. Engg. in IPE (RUET)', 'M.Sc in IPE (RUET) (Pursuing)'],
                'department' => 'ipe',
                'type' => 'permanent',
                'status' => 'ex_faculty',
                'category' => 'lecturer',
                'order' => 19
            ],
            [
                'name' => 'Nadim Mahmud',
                'designation' => 'Lecturer',
                'photo' => '/images/ipe/members/nadim_mahmud.png',
                'phone' => '01309658669',
                'email' => 'nadimmahmudnayan27.ipe@gmail.com',
                'personal_email' => null,
                'education' => ['B.Sc. Engg. in IPE (RUET)', 'M.Sc in IPE (RUET) (Pursuing)'],
                'department' => 'ipe',
                'type' => 'permanent',
                'status' => 'ex_faculty',
                'category' => 'lecturer',
                'order' => 20
            ]
        ];

        foreach ($members as $member) {
            DepartmentMember::create($member);
        }
    }
}
