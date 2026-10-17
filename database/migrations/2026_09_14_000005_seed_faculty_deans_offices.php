<?php

use App\Models\OfficeMember;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $deansOffices = [
            'fece' => [
                [
                    'name' => 'Brig Gen Mohammad Mobarak Hossain Majumder, psc',
                    'designation' => 'Dean, Faculty of ECE',
                    'photo' => '/images/offices/deans/fece_dean.jpeg',
                    'phone' => '+8801769675550 (Off)',
                    'email' => 'dean_ece@baust.edu.bd',
                    'education' => ['B.Sc. & M.Sc. in Mechanical Engineering (ME), BUET'],
                    'tier' => 1,
                    'order' => 1,
                ],
                [
                    'name' => 'Md. Rakib Hasan Rony',
                    'designation' => 'Coordinator',
                    'photo' => null,
                    'phone' => null,
                    'email' => null,
                    'education' => ['Lecturer, Department of EEE'],
                    'tier' => 2,
                    'order' => 2,
                ],
                [
                    'name' => 'Clerk',
                    'designation' => 'To be Included',
                    'photo' => null,
                    'phone' => null,
                    'email' => null,
                    'education' => [],
                    'tier' => 3,
                    'order' => 3,
                ],
                [
                    'name' => 'Supporting Staff',
                    'designation' => 'To be Included',
                    'photo' => null,
                    'phone' => null,
                    'email' => null,
                    'education' => [],
                    'tier' => 4,
                    'order' => 4,
                ],
            ],
            'fme' => [
                [
                    'name' => 'Prof. Dr. Imtiaz Ahmed Choudhury',
                    'designation' => 'Professor (IPE) & Dean, Faculty of ME',
                    'photo' => '/images/offices/deans/fme_dean.jpg',
                    'phone' => '+8801769675557 (Office) +8801726644025 (Personal)',
                    'email' => 'dean_me@baust.edu.bd',
                    'education' => ['B.Sc Engg. (BUET)', 'M.Eng. (AIT)', 'M.Sc. (USA)', 'Ph.D (Ireland)'],
                    'tier' => 1,
                    'order' => 1,
                ],
                [
                    'name' => 'Md. Ariful Alam',
                    'designation' => 'Assistant Professor & Coordinator',
                    'photo' => '/images/offices/deans/fme_coordinator.jpg',
                    'phone' => '01729141848',
                    'email' => 'arif.ipe@baust.edu.bd',
                    'education' => ['B.Sc. Engg. in IPE (KUET)', 'M.Sc. Engg. in IEM (KUET)'],
                    'tier' => 2,
                    'order' => 2,
                ],
                [
                    'name' => 'Md. Yahiya Rahman',
                    'designation' => 'Clerk',
                    'photo' => '/images/offices/deans/fme_clerk.png',
                    'phone' => '01763796411',
                    'email' => 'yahiyabaust@gmail.com',
                    'education' => ['BBA (Hons.) in Accounting'],
                    'tier' => 3,
                    'order' => 3,
                ],
            ],
            'fce' => [
                [
                    'name' => 'Professor Dr. Md. Mahmudul Hasan',
                    'designation' => 'Dean (In-Charge), Faculty of CE',
                    'photo' => '/images/offices/deans/fce_dean.png',
                    'phone' => '01769-662720',
                    'email' => 'dean_ce@baust.edu.bd',
                    'education' => ['B.Sc Engg.(Civil), KUET', 'M. Engg & PhD (Civil & Environmental Engg.) Ritsumeikan'],
                    'tier' => 1,
                    'order' => 1,
                ],
                [
                    'name' => 'Kh. Shihab Uddin Ahmed',
                    'designation' => 'Lecturer & Coordinator',
                    'photo' => '/images/offices/deans/fce_coordinator.jpg',
                    'phone' => '+8801763988745',
                    'email' => 'kh.shihab@baust.edu.bd',
                    'education' => ['B.Sc in Civil Engineering, BUET'],
                    'tier' => 2,
                    'order' => 2,
                ],
                [
                    'name' => 'Md. Shakim Billah',
                    'designation' => 'Messenger',
                    'photo' => '/images/offices/deans/fce_staff.png',
                    'phone' => '01766022173',
                    'email' => null,
                    'education' => [],
                    'tier' => 4,
                    'order' => 3,
                ],
            ],
            'fbs' => [
                [
                    'name' => 'Dr. Md. Shah Alam',
                    'designation' => 'Dean, Faculty of Business Studies',
                    'photo' => '/images/offices/deans/fbs_dean.jpg',
                    'phone' => '+8801769662723 (Office), +8801714425307 (Personal)',
                    'email' => 'dean_bs@baust.edu.bd',
                    'education' => ['B.Com (Hons) in Accounting, M.Com in Accounting, PhD in Commerce'],
                    'tier' => 1,
                    'order' => 1,
                ],
                [
                    'name' => 'Rakibul Islam',
                    'designation' => 'Assistant Professor & Coordinator',
                    'photo' => '/images/offices/deans/fbs_coordinator.jpg',
                    'phone' => null,
                    'email' => null,
                    'education' => ['Assistant Professor, Department of Business Administration'],
                    'tier' => 2,
                    'order' => 2,
                ],
                [
                    'name' => 'Clerk',
                    'designation' => 'To be Included',
                    'photo' => null,
                    'phone' => null,
                    'email' => null,
                    'education' => [],
                    'tier' => 3,
                    'order' => 3,
                ],
                [
                    'name' => 'Supporting Staff',
                    'designation' => 'To be Included',
                    'photo' => null,
                    'phone' => null,
                    'email' => null,
                    'education' => [],
                    'tier' => 4,
                    'order' => 4,
                ],
            ],
            'fsh' => [
                [
                    'name' => 'Professor Md. Jahurul Islam',
                    'designation' => 'Professor & Dean, Faculty of Science & Humanities',
                    'photo' => '/images/offices/deans/fsh_dean.jpg',
                    'phone' => '01717142817',
                    'email' => 'dean_sh@baust.edu.bd',
                    'education' => ['B.A. (Hons.), & M.A. in English, M. Phil'],
                    'tier' => 1,
                    'order' => 1,
                ],
                [
                    'name' => 'Faculty Coordinator',
                    'designation' => 'Coordinator',
                    'photo' => null,
                    'phone' => null,
                    'email' => null,
                    'education' => ['Faculty of Science & Humanities'],
                    'tier' => 2,
                    'order' => 2,
                ],
                [
                    'name' => 'Office Staff',
                    'designation' => 'To be Included',
                    'photo' => null,
                    'phone' => null,
                    'email' => null,
                    'education' => [],
                    'tier' => 4,
                    'order' => 3,
                ],
            ],
        ];

        foreach ($deansOffices as $officeSlug => $members) {
            foreach ($members as $data) {
                OfficeMember::updateOrCreate(
                    [
                        'office' => $officeSlug,
                        'name' => $data['name'],
                    ],
                    $data
                );
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        OfficeMember::whereIn('office', ['fece', 'fme', 'fce', 'fbs', 'fsh'])->delete();
    }
};
