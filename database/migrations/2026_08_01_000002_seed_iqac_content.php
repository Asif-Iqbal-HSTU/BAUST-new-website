<?php

use App\Models\IqacEvent;
use App\Models\IqacMember;
use App\Models\IqacNotice;
use App\Models\IqacObePoint;
use App\Models\IqacQaArea;
use App\Models\IqacSetting;
use App\Models\IqacSlide;
use App\Models\IqacStat;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        // ---- Singleton settings ----
        $settings = [
            'about_heading' => 'Assuring quality in everything BAUST does',
            'about_paragraphs' => [
                'Since its inception in November 2017, the Institutional Quality Assurance Cell (IQAC) at BAUST ensures the desired quality of graduates through continuous improvement across the entire operations of the institution — assuring every stakeholder connected with higher education: students, parents, teachers, staff, funding agencies and society at large.',
                'IQAC has adopted Outcome-Based Education (OBE) as the core practice of the university and works to create an environment where every stakeholder is equally valued and respected.',
            ],
            'director_name' => 'Prof. Dr. Imtiaz Ahmed Choudhury',
            'director_role' => 'Director, IQAC',
            'director_affiliation' => 'Professor & Head, Dept. of Mechanical Engineering',
            'director_credentials' => 'B.Sc Engg. (BUET), M.Eng. (AIT), M.Sc. (USA), PhD, CEng (UK)',
            'director_photo' => '/images/iqac/imtiaz-ahmed-choudhury.jpg',
            'director_message' => [
                'It is my great pleasure to welcome you to IQAC-BAUST. The development of Quality Assurance systems in higher education is currently a major global concern, and assuring quality has become a common practice in Bangladesh through the initiatives of the University Grants Commission (UGC).',
                'IQAC, BAUST ensures the desired quality of graduates through continuous improvement across the entire operations of the institution. Since its inception in November 2017, we have worked to familiarize Outcome-Based Education among stakeholders and have adopted the Outcome-Based curriculum as the core practice of the university.',
                'As Director, I seek your valuable support and cooperation in this journey — and I strongly believe that, together, IQAC-BAUST can become a pioneer in quality assurance.',
            ],
            'vision_text' => 'Become a globally recognized Center of Quality Assurance and assist BAUST in all aspects to uphold globally accepted quality education.',
            'mission_text' => 'To build a sustainable academic environment conducive to quality teaching, learning and research through capacity building, continuous improvement, active engagement of stakeholders, and cooperation and collaboration across every quality assurance area of the university.',
            'obe_heading' => 'Outcome-Based Education at the core',
            'obe_description' => 'From curriculum design to assessment, BAUST aligns its programs with Program Outcomes (POs) and Course Outcomes (COs), reinforced through faculty training and continuous review in line with BNQF and BAETE guidelines.',
            'contact_address' => 'IQAC, BAUST, Saidpur Cantonment, Nilphamari, Bangladesh',
            'contact_email' => 'iqac@baust.edu.bd',
            'contact_office' => 'Institutional Quality Assurance Cell',
        ];
        foreach ($settings as $key => $value) {
            IqacSetting::setValue($key, $value);
        }

        // ---- Stats ----
        $stats = [
            ['2017', 'Established'],
            ['OBE', 'Core Practice'],
            ['3', 'QAC · FQAC · PSAC'],
            ['UGC', 'Aligned Framework'],
        ];
        foreach ($stats as $i => [$v, $l]) {
            IqacStat::create(['value' => $v, 'label' => $l, 'order' => $i]);
        }

        // ---- Quality Assurance areas (icon key => lucide icon in frontend) ----
        $areas = [
            ['Landmark', 'Governance'],
            ['BookOpen', 'Curriculum Design & Review'],
            ['GraduationCap', 'Student Admission & Progress'],
            ['Building2', 'Physical Facilities'],
            ['ClipboardCheck', 'Teaching–Learning & Assessment'],
            ['LifeBuoy', 'Student Support Services'],
            ['Users', 'Staff & Facilities'],
            ['FlaskConical', 'Research & Extension'],
            ['Layers', 'Process Management'],
            ['RefreshCw', 'Continuous Quality Improvement'],
        ];
        foreach ($areas as $i => [$icon, $label]) {
            IqacQaArea::create(['icon' => $icon, 'label' => $label, 'order' => $i]);
        }

        // ---- OBE points ----
        $obe = [
            'Outcome-Based Curriculum',
            'Program & Course Outcomes (PO/CO)',
            'Continuous Assessment',
            'BNQF & BAETE Alignment',
            'Faculty Capacity Building',
            'QAC · FQAC · PSAC Committees',
        ];
        foreach ($obe as $i => $text) {
            IqacObePoint::create(['text' => $text, 'order' => $i]);
        }

        // ---- Members ----
        $members = [
            ['Prof. Dr. Imtiaz Ahmed Choudhury', 'Director, IQAC', 'Professor & Head, Dept. of Mechanical Engineering', 'B.Sc Engg. (BUET), M.Eng. (AIT), M.Sc. (USA), PhD, CEng (UK)', '/images/iqac/imtiaz-ahmed-choudhury.jpg', true],
            ['Prof. Dr. Md. Mahmudul Hasan', 'Additional Director-1', 'Professor, Dept. of Civil Engineering', 'B.Sc Engg. (Civil), KUET; M.Engg & PhD (Civil & Environmental Engg.), Ritsumeikan University, Japan', '/images/iqac/md-mahmudul-hasan.jpg', false],
            ['Nur Hasan Mahmud Shahen', 'Additional Director-2', 'Assistant Professor (Mathematics), Dept. of Arts & Sciences', 'B.Sc (Hons.) & M.Sc in Applied Mathematics; PhD (Pursuing, BUET)', '/images/iqac/nur-hasan-mahmud-shahen.jpg', false],
            ['Md. Asif Iqbal', 'Assistant Software Engineer', 'IQAC, BAUST', 'B.Sc in Computer Science & Engineering', '/images/iqac/md-asif-iqbal.jpg', false],
            ['Subroto Debnath', 'Office Assistant', 'IQAC, BAUST', '', '/images/iqac/subroto-debnath.jpg', false],
            ['Md. Sakim', 'Messenger', 'IQAC, BAUST', '', '/images/iqac/md-sakim.jpg', false],
        ];
        foreach ($members as $i => [$name, $role, $aff, $cred, $photo, $lead]) {
            IqacMember::create([
                'name' => $name, 'role' => $role, 'affiliation' => $aff,
                'credentials' => $cred, 'photo' => $photo, 'is_lead' => $lead, 'order' => $i,
            ]);
        }

        // ---- Events ----
        $events = [
            ['Jan 22–29, 2026', 'Orientation & Training Program for newly recruited faculty members, officers and staff'],
            ['2025', 'Seminar on BNQF (Bangladesh National Qualifications Framework) held at BAUST'],
            ['May 24, 2025', 'OBE Implementation Strategies — insights gained from BAETE training'],
            ['May 14, 2025', 'Seminar on the effective integration of OBE at BAUST'],
            ['Feb 20, 2025', 'University Grants Commission (UGC) visits IQAC, BAUST'],
        ];
        foreach ($events as $i => [$date, $title]) {
            IqacEvent::create(['date_label' => $date, 'title' => $title, 'order' => $i]);
        }

        // ---- Notices ----
        $notices = [
            'QAC, FQAC and PSAC committees have been formed under the IQAC at BAUST',
            'Improving Student Success: Roles of Faculty & Management in Reducing Dropout Rates',
            'Important Instructions on Research by the Hon’ble Vice Chancellor',
            'Workshop on OBE Implementation for Science & Technology Related Curriculum',
        ];
        foreach ($notices as $i => $text) {
            IqacNotice::create(['text' => $text, 'order' => $i]);
        }

        // ---- Slides ----
        $slides = [
            ['/images/iqac/slider/orientation-training-jan-2026.jpg', 'Orientation & Training Program for newly recruited faculty, officers and staff', 'Jan 22–29, 2026'],
            ['/images/iqac/slider/seminar-bnqf.jpg', 'Driving Academic Excellence: Seminar on BNQF held at BAUST', '2025'],
            ['/images/iqac/slider/vc-quality-obe-seminar.jpg', 'Honorable VC emphasizes Quality Education and OBE strategy in seminar', '2025'],
            ['/images/iqac/slider/obe-baete-training-may-2025.jpg', 'OBE Implementation Strategies: insights gained from BAETE training', 'May 24, 2025'],
            ['/images/iqac/slider/obe-integration-seminar-may-2025.jpg', 'Effective Integration of OBE at BAUST — seminar led by the Director, IQAC', 'May 14, 2025'],
            ['/images/iqac/slider/ugc-visit-feb-2025-1.jpg', 'University Grants Commission (UGC) visits IQAC, BAUST', 'Feb 20, 2025'],
            ['/images/iqac/slider/ugc-visit-feb-2025-2.jpg', 'UGC delegation at IQAC, BAUST — quality assurance review', 'Feb 20, 2025'],
            ['/images/iqac/slider/iqac-workshop.jpg', 'Workshop arranged by IQAC, BAUST for faculty capacity building', 'IQAC Activities'],
        ];
        foreach ($slides as $i => [$img, $title, $date]) {
            IqacSlide::create(['image' => $img, 'title' => $title, 'date_label' => $date, 'order' => $i]);
        }

        // ---- Dedicated IQAC admin login ----
        // Password comes from the IQAC_ADMIN_PASSWORD env var (set in the
        // deployment .env, never committed). If unset, generate a random one
        // and print it once so an operator can capture and rotate it.
        $password = env('IQAC_ADMIN_PASSWORD');
        if (empty($password)) {
            $password = Str::random(20);
            fwrite(STDERR, "\n[iqac] Generated initial IQAC admin password: {$password}\n");
        }

        $admin = User::updateOrCreate(
            ['email' => 'iqac.admin@baust.edu.bd'],
            [
                'name' => 'IQAC Admin',
                'password' => Hash::make($password),
                'role' => 'iqac_admin',
            ]
        );
        // email_verified_at is not mass-assignable — set it directly so the
        // account satisfies the `verified` middleware on /admin routes.
        if (! $admin->email_verified_at) {
            $admin->forceFill(['email_verified_at' => now()])->save();
        }
    }

    public function down(): void
    {
        User::where('email', 'iqac.admin@baust.edu.bd')->delete();
        IqacSlide::truncate();
        IqacNotice::truncate();
        IqacEvent::truncate();
        IqacMember::truncate();
        IqacObePoint::truncate();
        IqacQaArea::truncate();
        IqacStat::truncate();
        IqacSetting::truncate();
    }
};
