<?php

use App\Models\Department;
use App\Models\DepartmentAchievement;
use App\Models\DepartmentCurriculum;
use App\Models\DepartmentHighlight;
use App\Models\DepartmentLaboratory;
use App\Models\DepartmentMember;
use App\Models\DepartmentObe;
use App\Models\DepartmentSlide;
use App\Models\DepartmentSociety;
use App\Models\DepartmentStat;
use App\Models\Notice;
use App\Models\NoticeCategory;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        // =========================================================================
        // 1. MECHANICAL ENGINEERING (ME) - ID 4
        // =========================================================================
        $me = Department::where('slug', 'me')->first();
        if (!$me) {
            $me = Department::create([
                'slug' => 'me',
                'name' => 'Department of Mechanical Engineering',
                'short_name' => 'ME',
                'faculty' => 'FME',
                'order' => 4,
            ]);
        }

        $me->update([
            'name' => 'Department of Mechanical Engineering',
            'short_name' => 'ME',
            'faculty' => 'FME',
            'tagline' => 'Innovating the Future Through Mechanical Excellence',
            'established' => '2015',
            'accreditation_badge' => 'IEB-BAETE',
            'accreditation_title' => 'Accredited Program',
            'accreditation_text' => 'The B.Sc. in Mechanical Engineering program is accredited by the Board of Accreditation for Engineering and Technical Education (BAETE) under the Washington Accord.',
            'about' => "Mechanical Engineering (ME) is one of the most fundamental, versatile, and essential branches of engineering, with applications spanning automobile industries, power generation, aerospace systems, manufacturing processes, and robotics. The Department of Mechanical Engineering at Bangladesh Army University of Science and Technology (BAUST), Saidpur, commenced its journey in 2015 with a mission to develop skilled, innovative, and ethically grounded engineers.\\n\\nThe department offers a comprehensive 4-year undergraduate B.Sc. in Mechanical Engineering degree covering thermo-fluid sciences, mechanical design, manufacturing technology, mechatronics, and solid mechanics. Combining deep theoretical foundations with practical laboratory training across 14 state-of-the-art facilities, our students are prepared to lead industrial automation and national engineering developments.",
            'vision' => "To be a center of excellence recognized nationally and internationally for quality education, research, and innovation in Mechanical Engineering, producing skilled engineers capable of addressing global technical challenges.",
            'mission' => "1. Impart quality outcome-based education (OBE) to develop engineering competency, analytical thinking, and ethical integrity.\\n2. Foster advanced research and industrial collaborations in thermal sciences, renewable energy, and automated manufacturing.\\n3. Provide state-of-the-art laboratory facilities ensuring practical, design-oriented, and experimental mastery.\\n4. Cultivate leadership, social responsibility, and lifelong learning for sustainable national development.",
            'hod_name' => 'Md. Mahmudul Adil',
            'hod_designation' => 'Assistant Professor and Head',
            'hod_photo' => '/images/me/members/md._mahmudul_adil.jpg',
            'hod_message' => "Welcome to the Department of Mechanical Engineering at Bangladesh Army University of Science and Technology (BAUST). Established in 2015, our department is dedicated to providing students with high-quality education and hands-on technical training.\\n\\nMechanical Engineering is a fundamental pillar of modern industry, encompassing energy systems, automotive engineering, manufacturing, and robotics. Our curriculum is aligned with Outcome-Based Education (OBE) and accredited by BAETE under the Washington Accord, ensuring our graduates are recognized globally.\\n\\nWith our passionate faculty and 14 dedicated laboratories, we foster an environment of discipline, creativity, and leadership. We warmly invite you to join the Mechanical Engineering family at BAUST.",
            'is_active' => true,
        ]);

        $meId = $me->id;

        // ME Slides
        DepartmentSlide::where('department_id', $meId)->delete();
        $meSlides = [
            ['title' => 'Accredited by BAETE under the Washington Accord', 'subtitle' => 'Department of Mechanical Engineering, BAUST', 'image' => '/images/me/slides/slide_1.png', 'badge' => 'BAETE Accredited', 'order' => 1],
            ['title' => 'Champion Trophy - Annual Sports Tournament', 'subtitle' => 'Excellence in Extracurricular Achievements', 'image' => '/images/me/slides/slide_2.png', 'badge' => 'Championship', 'order' => 2],
            ['title' => 'Clutch Carnival 1.0 - Technical & Gaming Fest', 'subtitle' => 'Empowering Youth and Engineering Talents', 'image' => '/images/me/slides/slide_3.png', 'badge' => 'Tech Expo', 'order' => 3],
            ['title' => 'Inter-Department Champion Summer 2024', 'subtitle' => 'Mechanical Engineering Department Victory', 'image' => '/images/me/slides/slide_4.png', 'badge' => 'Sports & Glory', 'order' => 4],
        ];
        foreach ($meSlides as $s) {
            DepartmentSlide::create(array_merge($s, ['department_id' => $meId, 'is_active' => true]));
        }

        // ME Stats
        DepartmentStat::where('department_id', $meId)->delete();
        $meStats = [
            ['value' => '400+', 'label' => 'Undergraduate Students', 'order' => 1],
            ['value' => '28+', 'label' => 'Faculty & Staff', 'order' => 2],
            ['value' => '14', 'label' => 'Laboratories & Workshops', 'order' => 3],
            ['value' => '95%', 'label' => 'Placement & Higher Studies', 'order' => 4],
        ];
        foreach ($meStats as $st) {
            DepartmentStat::create(array_merge($st, ['department_id' => $meId, 'is_active' => true]));
        }

        // ME Highlights
        DepartmentHighlight::where('department_id', $meId)->delete();
        $meHighlights = [
            ['title' => 'Thermo-Fluid Sciences & Power Generation', 'description' => 'Comprehensive research in heat engines, refrigeration, thermodynamics, and sustainable energy.', 'icon' => 'Flame', 'order' => 1],
            ['title' => 'CAD, Simulation & Finite Element Analysis', 'description' => 'State-of-the-art computational simulation in SolidWorks, ANSYS, and AutoCAD design suites.', 'icon' => 'Cpu', 'order' => 2],
            ['title' => 'Precision Manufacturing & Foundry Shop', 'description' => 'Hands-on training in lathe, milling, welding, metal casting, and advanced production processes.', 'icon' => 'Wrench', 'order' => 3],
            ['title' => 'Robotics, Mechatronics & Automation', 'description' => 'Interdisciplinary robotics development, control systems, and automated mechanical design.', 'icon' => 'Bot', 'order' => 4],
        ];
        foreach ($meHighlights as $h) {
            DepartmentHighlight::create(array_merge($h, ['department_id' => $meId, 'is_active' => true]));
        }

        // ME Curricula
        DepartmentCurriculum::where('department_id', $meId)->delete();
        $meCurricula = [
            [
                'title' => 'B.Sc. in Mechanical Engineering (Batch 13 & Onwards)',
                'slug' => 'me-curriculum-batch-13-and-onwards',
                'year' => 'Batch 13 & Onwards',
                'file' => '/storage/departments/me-syllabus-batch-13-and-onwards.pdf',
                'description' => 'Latest Outcome-Based Education (OBE) syllabus aligned with BAETE Washington Accord standards.',
                'highlights' => ['Total 160.0 Credits across 8 Semesters', 'Thermo-Fluid & Design Specialization Tracks', 'Capstone Design Project with Industry Mentorship'],
                'duration' => '4 Years (8 Semesters)',
                'credits' => '160.0 Credits',
                'degree' => 'B.Sc. Engg. in ME',
                'order' => 1,
            ],
            [
                'title' => 'B.Sc. in Mechanical Engineering (Batches 8 to 12)',
                'slug' => 'me-curriculum-batches-8-to-12',
                'year' => 'Batch 8 to 12',
                'file' => '/storage/departments/me-syllabus-batch-8-to-12.pdf',
                'description' => 'Curriculum applicable for undergraduate batches 8 through 12.',
                'highlights' => ['Core Mechanical Principles', 'Laboratory Workshop Focus', 'Industrial Training Requirements'],
                'duration' => '4 Years',
                'credits' => '160.0 Credits',
                'degree' => 'B.Sc. Engg. in ME',
                'order' => 2,
            ],
            [
                'title' => 'B.Sc. in Mechanical Engineering (Batches 1 to 7)',
                'slug' => 'me-curriculum-batches-1-to-7',
                'year' => 'Batch 1 to 7',
                'file' => '/storage/departments/me-syllabus-batch-1-to-7.pdf',
                'description' => 'Foundational undergraduate curriculum for earlier batches 1st through 7th.',
                'highlights' => ['Machine Design Fundamentals', 'Thermal Systems Practice', 'Power Engineering Modules'],
                'duration' => '4 Years',
                'credits' => '160.0 Credits',
                'degree' => 'B.Sc. Engg. in ME',
                'order' => 3,
            ],
        ];
        foreach ($meCurricula as $c) {
            DepartmentCurriculum::create(array_merge($c, ['department_id' => $meId, 'is_active' => true]));
        }

        // ME Achievements
        DepartmentAchievement::where('department_id', $meId)->delete();
        $meAchievements = [
            [
                'title' => 'Inter-Department Football Champions 2024 (Mechanical Falcons)',
                'category' => 'Sports & Athletics',
                'date' => 'August 2024',
                'description' => 'The Mechanical Falcons clinched the championship title in the 8th Inter-Department Football Tournament 2024, displaying exceptional teamwork and sportsmanship.',
                'order' => 1,
            ],
            [
                'title' => 'SolidWorks Professional Certification Excellence',
                'category' => 'Professional Certification',
                'date' => 'October 2024',
                'description' => 'Undergraduate student Foyz Shikder Tomal earned the prestigious Certified SOLIDWORKS Associate (CSWA) credential, proving international mastery in mechanical CAD modeling.',
                'order' => 2,
            ],
            [
                'title' => 'Clutch Carnival 1.0 Engineering Gaming and Tech Exhibition',
                'category' => 'Tech Expo',
                'date' => 'January 2025',
                'description' => 'The Mechanical Engineering Department organized Clutch Carnival 1.0, hosting competitive robotics showcases, e-football tournaments, and mechanical model exhibitions.',
                'order' => 3,
            ],
        ];
        foreach ($meAchievements as $ach) {
            DepartmentAchievement::create(array_merge($ach, ['department_id' => $meId, 'is_active' => true]));
        }

        // ME Societies
        DepartmentSociety::where('department_id', $meId)->delete();
        DepartmentSociety::create([
            'department_id' => $meId,
            'name' => 'Mechanical Engineering Association (ME Club)',
            'slug' => 'me-society',
            'type' => 'society',
            'description' => 'The Mechanical Engineering Association (ME Club) is the premier student organization of the Department of Mechanical Engineering. It organizes annual mechanical tech fests, CAD competitions, industrial tours to power plants and automobile factories, and sports tournaments.',
            'committee' => [
                ['role' => 'Chief Patron', 'name' => 'Brig Gen Md Hafizur Rahman, afwc, psc (Retd), Vice Chancellor'],
                ['role' => 'President', 'name' => 'Md. Mahmudul Adil, Head of ME Department'],
                ['role' => 'Faculty Advisor', 'name' => 'Prof. Dr. Imtiaz Ahmed Choudhury, Dean Faculty of ME'],
                ['role' => 'Student Body', 'name' => 'Executive Committee, ME Club'],
            ],
            'activities' => [
                'Clutch Carnival Tech & E-Sports Expo',
                'Industrial Tours to Automobile Assembly & Power Generation Plants',
                'SolidWorks and ANSYS FEA Workshops',
                'Annual Sports, Cultural Receptions, and Farewell Dinners',
            ],
            'order' => 1,
            'is_active' => true,
        ]);
        DepartmentSociety::create([
            'department_id' => $meId,
            'name' => 'ME Alumni Association',
            'slug' => 'me-alumni',
            'type' => 'alumni',
            'description' => 'The ME Alumni Association connects hundreds of graduate mechanical engineers working across power plants, automotive companies, manufacturing plants, government ministries, and international research universities.',
            'committee' => [
                ['role' => 'President', 'name' => 'Engr. Alumni President (BAUST ME Batch 1)'],
                ['role' => 'General Secretary', 'name' => 'Engr. Alumni GS (BAUST ME Batch 2)'],
            ],
            'activities' => [
                'Power Generation (BPDB, APSCL, EGCB, RPCL)',
                'Automotive & Heavy Machinery Engineering',
                'HVAC, Refrigeration & Building Services',
                'Postgraduate Studies in USA, Canada, Germany, and Australia',
                'BCS Technical & Administration Cadres',
            ],
            'order' => 2,
            'is_active' => true,
        ]);

        // ME OBEs
        DepartmentObe::where('department_id', $meId)->delete();
        $mePeos = [
            ['code' => 'PEO-1', 'title' => 'Professional Engineering', 'description' => 'Graduates will succeed as competent mechanical engineers in industries, consultancy, and entrepreneurship.'],
            ['code' => 'PEO-2', 'title' => 'Continuous Learning', 'description' => 'Graduates will engage in advanced higher education, research, and professional certifications to adapt to evolving technical frontiers.'],
            ['code' => 'PEO-3', 'title' => 'Leadership & Collaboration', 'description' => 'Graduates will demonstrate effective multidisciplinary teamwork, communication skills, and ethical leadership.'],
            ['code' => 'PEO-4', 'title' => 'Sustainability & Ethics', 'description' => 'Graduates will uphold professional ethics and design environmentally sustainable engineering solutions for societal welfare.'],
        ];
        foreach ($mePeos as $idx => $peo) {
            DepartmentObe::create(array_merge($peo, ['department_id' => $meId, 'type' => 'peo', 'order' => $idx + 1, 'is_active' => true]));
        }

        $standardPlos = [
            ['code' => 'PLO1', 'title' => 'Engineering Knowledge', 'description' => 'Apply knowledge of mathematics, science, engineering fundamentals, and mechanical specialization to solve complex problems.'],
            ['code' => 'PLO2', 'title' => 'Problem Analysis', 'description' => 'Identify, formulate, research literature, and analyze complex engineering problems using first principles.'],
            ['code' => 'PLO3', 'title' => 'Design/Development of Solutions', 'description' => 'Design solutions for complex mechanical engineering problems and design system components or processes meeting specified needs.'],
            ['code' => 'PLO4', 'title' => 'Investigation', 'description' => 'Conduct investigations of complex problems using research-based knowledge and design of experiments.'],
            ['code' => 'PLO5', 'title' => 'Modern Tool Usage', 'description' => 'Select and apply appropriate techniques, resources, and modern engineering and IT tools including simulation and modeling.'],
            ['code' => 'PLO6', 'title' => 'The Engineer and Society', 'description' => 'Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural issues.'],
            ['code' => 'PLO7', 'title' => 'Environment and Sustainability', 'description' => 'Understand the impact of professional engineering solutions in societal and environmental contexts and demonstrate knowledge of sustainable development.'],
            ['code' => 'PLO8', 'title' => 'Ethics', 'description' => 'Apply ethical principles and commit to professional ethics and responsibilities of engineering practice.'],
            ['code' => 'PLO9', 'title' => 'Individual and Team Work', 'description' => 'Function effectively as an individual, and as a member or leader in diverse teams in multidisciplinary settings.'],
            ['code' => 'PLO10', 'title' => 'Communication', 'description' => 'Communicate effectively on complex engineering activities with the engineering community and society at large.'],
            ['code' => 'PLO11', 'title' => 'Project Management and Finance', 'description' => 'Demonstrate knowledge and understanding of engineering management principles and apply these to manage projects.'],
            ['code' => 'PLO12', 'title' => 'Life-long Learning', 'description' => 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning.'],
        ];
        foreach ($standardPlos as $idx => $plo) {
            DepartmentObe::create(array_merge($plo, ['department_id' => $meId, 'type' => 'plo', 'order' => $idx + 1, 'is_active' => true]));
        }

        // =========================================================================
        // 2. INDUSTRIAL & PRODUCTION ENGINEERING (IPE) - ID 5
        // =========================================================================
        $ipe = Department::where('slug', 'ipe')->first();
        if (!$ipe) {
            $ipe = Department::create([
                'slug' => 'ipe',
                'name' => 'Department of Industrial and Production Engineering',
                'short_name' => 'IPE',
                'faculty' => 'FME',
                'order' => 5,
            ]);
        }

        $ipe->update([
            'name' => 'Department of Industrial and Production Engineering',
            'short_name' => 'IPE',
            'faculty' => 'FME',
            'tagline' => 'Optimizing Systems, Driving Productivity & Quality',
            'established' => '2016',
            'accreditation_badge' => 'IEB-BAETE',
            'accreditation_title' => 'Accredited Program',
            'accreditation_text' => 'The B.Sc. in Industrial & Production Engineering program is accredited by the Board of Accreditation for Engineering and Technical Education (BAETE) under the Washington Accord.',
            'about' => "Industrial and Production Engineering (IPE) is a globally valued engineering discipline that optimizes processes, improves workplace productivity, and ensures operational quality across modern manufacturing and service sectors. The Department of IPE at Bangladesh Army University of Science and Technology (BAUST) began its journey in 2016 and has established itself as an engineering education leader.\\n\\nThe department offers a 4-year B.Sc. Engineering curriculum blending manufacturing processes, operations research, supply chain management, ergonomics, and quality control. With 12 dedicated laboratories and an active student chapter (IEOM), our students acquire real-world problem-solving skills suited for leading multinational corporations and research institutions.",
            'vision' => "To be a recognized center of excellence in Industrial and Production Engineering education and applied research, producing competent, ethical engineers who optimize productivity and drive sustainable industrial growth.",
            'mission' => "1. Deliver high-standard Outcome-Based Education (OBE) in manufacturing, operations, and quality engineering.\\n2. Provide modern laboratory facilities for experimental verification, simulation, and ergonomic design.\\n3. Promote applied research, industry-academia linkages, and efficiency improvement in national manufacturing sectors.\\n4. Inculcate ethical values, safety culture, and environmental awareness in professional engineering practice.",
            'hod_name' => 'Prof. Dr. A.K.M. Nurul Amin',
            'hod_designation' => 'Professor and Head of the Department',
            'hod_photo' => '/images/ipe/members/prof._dr._a.k.m._nurul_amin.png',
            'hod_message' => "Welcome to the Department of Industrial and Production Engineering at BAUST, a center of excellence in engineering education and applied research.\\n\\nIndustrial and Production Engineering (IPE) is a vital discipline that enhances productivity, optimizes operations, and improves safety and quality. Since 2016, our department has produced graduates serving leading multinational corporations, supply chain networks, and manufacturing plants.\\n\\nOur curriculum balances theoretical foundations with hands-on practice across 12 modern laboratories and software simulation suites. Our students also participate in the active IEOM Student Chapter, publishing papers and winning international accolades. I am delighted to welcome you to the IPE Department.",
            'is_active' => true,
        ]);

        $ipeId = $ipe->id;

        // IPE Slides
        DepartmentSlide::where('department_id', $ipeId)->delete();
        $ipeSlides = [
            ['title' => 'B.Sc. in IPE is Accredited by IEB-BAETE', 'subtitle' => 'Quality Assurance & Outcome-Based Education', 'image' => '/images/ipe/slides/slide_1.jpg', 'badge' => 'BAETE Accredited', 'order' => 1],
            ['title' => "World's Top 2% Scientist Recognition", 'subtitle' => 'Honoring Prof. Dr. Imtiaz Ahmed Choudhury', 'image' => '/images/ipe/slides/slide_2.jpg', 'badge' => 'Global Honor', 'order' => 2],
            ['title' => 'Honorable Chief of Army Staff Visited BAUST', 'subtitle' => 'Inspiring Future Engineers and Leaders', 'image' => '/images/ipe/slides/slide_3.jpg', 'badge' => 'Distinguished Visit', 'order' => 3],
            ['title' => 'Industrial Visit at Apex Footwear & Leatherware Ltd.', 'subtitle' => 'Bridging Industry Standards with Classroom Learning', 'image' => '/images/ipe/slides/slide_4.jpg', 'badge' => 'Industry Tour', 'order' => 4],
            ['title' => 'IPE Students with Faculty Members', 'subtitle' => 'Collaborative Academic and Research Environment', 'image' => '/images/ipe/slides/slide_5.jpg', 'badge' => 'Faculty & Students', 'order' => 5],
            ['title' => 'Seminar on Role of Industrial Engineers in Operations', 'subtitle' => 'Distinguished Guest Lecture by Prof. Dr. Abdullahil Azeem (BUET)', 'image' => '/images/ipe/slides/slide_6.jpg', 'badge' => 'Expert Seminar', 'order' => 6],
        ];
        foreach ($ipeSlides as $s) {
            DepartmentSlide::create(array_merge($s, ['department_id' => $ipeId, 'is_active' => true]));
        }

        // IPE Stats
        DepartmentStat::where('department_id', $ipeId)->delete();
        $ipeStats = [
            ['value' => '300+', 'label' => 'Undergraduate Students', 'order' => 1],
            ['value' => '24+', 'label' => 'Faculty & Staff', 'order' => 2],
            ['value' => '12', 'label' => 'Specialized Laboratories', 'order' => 3],
            ['value' => '96%', 'label' => 'Placement & Industry Absorption', 'order' => 4],
        ];
        foreach ($ipeStats as $st) {
            DepartmentStat::create(array_merge($st, ['department_id' => $ipeId, 'is_active' => true]));
        }

        // IPE Highlights
        DepartmentHighlight::where('department_id', $ipeId)->delete();
        $ipeHighlights = [
            ['title' => 'Production Optimization & Lean Manufacturing', 'description' => 'Eliminating waste, increasing productivity, and implementing Six Sigma quality control.', 'icon' => 'TrendingUp', 'order' => 1],
            ['title' => 'Supply Chain & Operations Research', 'description' => 'Mathematical modeling, logistics management, inventory optimization, and decision science.', 'icon' => 'Network', 'order' => 2],
            ['title' => 'Ergonomics & Occupational Safety', 'description' => 'Human factors engineering, workplace design, industrial hygiene, and worker safety protocols.', 'icon' => 'Activity', 'order' => 3],
            ['title' => 'CAD/CAM, CNC & Advanced Metrology', 'description' => 'Computer-aided manufacturing, precision measurement, quality assurance, and tool design.', 'icon' => 'Sliders', 'order' => 4],
        ];
        foreach ($ipeHighlights as $h) {
            DepartmentHighlight::create(array_merge($h, ['department_id' => $ipeId, 'is_active' => true]));
        }

        // IPE Curricula
        DepartmentCurriculum::where('department_id', $ipeId)->delete();
        $ipeCurricula = [
            [
                'title' => 'B.Sc. in IPE Syllabus (Summer 2026 & Onwards)',
                'slug' => 'ipe-curriculum-summer-2026-and-onwards',
                'year' => 'Summer 2026 Onwards',
                'file' => '/storage/departments/ipe-syllabus-summer-2026-and-onwards.pdf',
                'description' => 'Outcome-Based Education (OBE) curriculum for students admitted in Summer 2026 and onwards.',
                'highlights' => ['Total 161.0 Credit Hours', 'Outcome Based Education (OBE) Framework', 'IEB-BAETE Washington Accord Aligned'],
                'duration' => '4 Years (8 Semesters)',
                'credits' => '161.0 Credits',
                'degree' => 'B.Sc. Engg. in IPE',
                'order' => 1,
            ],
            [
                'title' => 'B.Sc. in IPE Syllabus (Winter 2021 & Onwards)',
                'slug' => 'ipe-curriculum-winter-2021-and-onwards',
                'year' => 'Winter 2021 Onwards',
                'file' => '/storage/departments/ipe-syllabus-winter-2021-and-onwards.pdf',
                'description' => 'Undergraduate curriculum for students admitted in Winter 2021 semester through Spring 2026.',
                'highlights' => ['Operations & Supply Chain Modules', 'Manufacturing Engineering Focus', 'Industrial Internship'],
                'duration' => '4 Years',
                'credits' => '160.0 Credits',
                'degree' => 'B.Sc. Engg. in IPE',
                'order' => 2,
            ],
            [
                'title' => 'B.Sc. in IPE Syllabus (Winter 2020)',
                'slug' => 'ipe-curriculum-winter-2020',
                'year' => 'Winter 2020 Onwards',
                'file' => '/storage/departments/ipe-syllabus-winter-2020-and-onwards.pdf',
                'description' => 'Undergraduate curriculum for students admitted in Winter 2020 semester.',
                'highlights' => ['Foundational IPE Core', 'Workplace Safety Protocols', 'Production Process Labs'],
                'duration' => '4 Years',
                'credits' => '160.0 Credits',
                'degree' => 'B.Sc. Engg. in IPE',
                'order' => 3,
            ],
            [
                'title' => 'B.Sc. in IPE Syllabus (Spring 2016 to 2019)',
                'slug' => 'ipe-curriculum-batch-2016-to-2019',
                'year' => 'Batch 2016 to 2019',
                'file' => '/storage/departments/ipe-syllabus-batch-2016-to-2019.pdf',
                'description' => 'Original undergraduate curriculum for pioneer batches of the IPE department.',
                'highlights' => ['Core Industrial Engineering', 'Quality Control Workshops', 'Capstone Project'],
                'duration' => '4 Years',
                'credits' => '160.0 Credits',
                'degree' => 'B.Sc. Engg. in IPE',
                'order' => 4,
            ],
        ];
        foreach ($ipeCurricula as $c) {
            DepartmentCurriculum::create(array_merge($c, ['department_id' => $ipeId, 'is_active' => true]));
        }

        // IPE Achievements
        DepartmentAchievement::where('department_id', $ipeId)->delete();
        $ipeAchievements = [
            [
                'title' => "World's Top 2% Scientist Recognition (Prof. Dr. Imtiaz Ahmed Choudhury)",
                'category' => 'Global Honor',
                'date' => 'October 2024',
                'description' => 'Prof. Dr. Imtiaz Ahmed Choudhury was recognized in the prestigious Stanford-Elsevier list of the World\'s Top 2% Scientists for outstanding lifetime research in manufacturing and materials.',
                'order' => 1,
            ],
            [
                'title' => 'IEOM Society BAUST Student Chapter Certificate Ceremony 2024',
                'category' => 'International Chapter',
                'date' => 'December 2024',
                'description' => 'The Industrial Engineering and Operations Management (IEOM) Society BAUST Chapter celebrated its annual certificate award ceremony, recognizing outstanding student researchers.',
                'order' => 2,
            ],
            [
                'title' => 'Business Idea Presentation & Poster Competition 1st Place',
                'category' => 'National Competition',
                'date' => 'July 2024',
                'description' => 'IPE undergraduate students won 1st Place in the inter-university business idea and poster competition for their automated inventory and ergonomics tracking prototype.',
                'order' => 3,
            ],
        ];
        foreach ($ipeAchievements as $ach) {
            DepartmentAchievement::create(array_merge($ach, ['department_id' => $ipeId, 'is_active' => true]));
        }

        // IPE Societies
        DepartmentSociety::where('department_id', $ipeId)->delete();
        DepartmentSociety::create([
            'department_id' => $ipeId,
            'name' => 'IEOM Society BAUST Student Chapter',
            'slug' => 'ipe-society',
            'type' => 'society',
            'description' => 'The IEOM Society BAUST Student Chapter is the official international student organization of the Department of Industrial and Production Engineering. It provides networking opportunities, technical research conferences, Lean Six Sigma workshops, and global student exchange programs.',
            'committee' => [
                ['role' => 'Faculty Advisor', 'name' => 'Prof. Dr. A.K.M. Nurul Amin, Head of IPE Department'],
                ['role' => 'Chapter Counselor', 'name' => 'Prof. Dr. Imtiaz Ahmed Choudhury, Dean Faculty of ME'],
                ['role' => 'President', 'name' => 'Md. Mahabub-A-Khoda, Lecturer & Program Coordinator'],
                ['role' => 'Student Body', 'name' => 'Executive Board, IEOM BAUST Chapter'],
            ],
            'activities' => [
                'International IEOM Conferences & Paper Presentations',
                'Industrial Tours to Apex Footwear, Leatherware Ltd. & Steel Rolling Mills',
                'Six Sigma, Operations Research & Supply Chain Simulations',
                'Certificate Giving Ceremonies and Annual IPE Day Celebrations',
            ],
            'order' => 1,
            'is_active' => true,
        ]);
        DepartmentSociety::create([
            'department_id' => $ipeId,
            'name' => 'IPE Alumni Association',
            'slug' => 'ipe-alumni',
            'type' => 'alumni',
            'description' => 'The IPE Alumni Association connects hundreds of graduate industrial and production engineers working across leading manufacturing plants, multinational supply chains, and research universities.',
            'committee' => [
                ['role' => 'President', 'name' => 'Engr. Alumni President (BAUST IPE Batch 1)'],
                ['role' => 'General Secretary', 'name' => 'Engr. Alumni GS (BAUST IPE Batch 2)'],
            ],
            'activities' => [
                'Garments & Apparel Manufacturing Supply Chains (Apex, Beximco, Square)',
                'FMCG Supply Chain & Operations Management (Unilever, Nestlé, PRAN)',
                'Quality Assurance & Lean Six Sigma Consultancy',
                'Postgraduate Studies in USA, Germany, Japan, and Canada',
                'BCS Cadres & Public Administration Officers',
            ],
            'order' => 2,
            'is_active' => true,
        ]);

        // IPE OBEs
        DepartmentObe::where('department_id', $ipeId)->delete();
        $ipePeos = [
            ['code' => 'PEO-1', 'title' => 'Professional Practice', 'description' => 'Graduates will succeed as competent industrial and production engineers in manufacturing, service, and supply chain sectors.'],
            ['code' => 'PEO-2', 'title' => 'Continuous Learning', 'description' => 'Graduates will engage in advanced higher studies, research, and professional certifications to keep pace with industry 4.0 innovations.'],
            ['code' => 'PEO-3', 'title' => 'Managerial Leadership', 'description' => 'Graduates will demonstrate leadership, effective communication, and multidisciplinary project management abilities.'],
            ['code' => 'PEO-4', 'title' => 'Ethical Responsibility', 'description' => 'Graduates will demonstrate commitment to safety standards, environmental sustainability, and professional integrity.'],
        ];
        foreach ($ipePeos as $idx => $peo) {
            DepartmentObe::create(array_merge($peo, ['department_id' => $ipeId, 'type' => 'peo', 'order' => $idx + 1, 'is_active' => true]));
        }

        foreach ($standardPlos as $idx => $plo) {
            DepartmentObe::create(array_merge($plo, ['department_id' => $ipeId, 'type' => 'plo', 'order' => $idx + 1, 'is_active' => true]));
        }

        // =========================================================================
        // 3. SEED LABORATORIES (ME & IPE)
        // =========================================================================
        DepartmentLaboratory::whereIn('department_id', [$meId, $ipeId])->delete();

        $meLabs = [
            [
                'department_id' => $meId,
                'name' => 'Strength of Materials Lab',
                'slug' => 'strength-of-materials-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Strength of Materials Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Strength of Materials Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/me/laboratories/strength-of-materials-lab/1.jpg', '/images/me/laboratories/strength-of-materials-lab/2.jpg', '/images/me/laboratories/strength-of-materials-lab/3.jpg', '/images/me/laboratories/strength-of-materials-lab/4.jpg', '/images/me/laboratories/strength-of-materials-lab/5.jpg'],
                'order' => 1,
                'is_active' => true,
            ],
            [
                'department_id' => $meId,
                'name' => 'Mechanics of Machinery Lab',
                'slug' => 'mechanics-of-machinery-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Mechanics of Machinery Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Mechanics of Machinery Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/me/laboratories/mechanics-of-machinery-lab/1.jpg', '/images/me/laboratories/mechanics-of-machinery-lab/2.jpg', '/images/me/laboratories/mechanics-of-machinery-lab/3.jpg', '/images/me/laboratories/mechanics-of-machinery-lab/4.jpg', '/images/me/laboratories/mechanics-of-machinery-lab/5.jpg', '/images/me/laboratories/mechanics-of-machinery-lab/6.jpg'],
                'order' => 2,
                'is_active' => true,
            ],
            [
                'department_id' => $meId,
                'name' => 'Thermodynamics Lab',
                'slug' => 'thermodynamics-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Thermodynamics Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Thermodynamics Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/me/laboratories/thermodynamics-lab/1.jpg', '/images/me/laboratories/thermodynamics-lab/2.jpg', '/images/me/laboratories/thermodynamics-lab/3.jpg', '/images/me/laboratories/thermodynamics-lab/4.jpg', '/images/me/laboratories/thermodynamics-lab/5.jpg', '/images/me/laboratories/thermodynamics-lab/6.jpg'],
                'order' => 3,
                'is_active' => true,
            ],
            [
                'department_id' => $meId,
                'name' => 'Heat Engine Lab',
                'slug' => 'heat-engine-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Heat Engine Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Heat Engine Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/me/laboratories/heat-engine-lab/1.jpg', '/images/me/laboratories/heat-engine-lab/2.jpg', '/images/me/laboratories/heat-engine-lab/3.jpg', '/images/me/laboratories/heat-engine-lab/4.jpg', '/images/me/laboratories/heat-engine-lab/5.jpg', '/images/me/laboratories/heat-engine-lab/6.jpg'],
                'order' => 4,
                'is_active' => true,
            ],
            [
                'department_id' => $meId,
                'name' => 'Heat Transfer Lab',
                'slug' => 'heat-transfer-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Heat Transfer Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Heat Transfer Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/me/laboratories/heat-transfer-lab/1.jpg', '/images/me/laboratories/heat-transfer-lab/2.jpg', '/images/me/laboratories/heat-transfer-lab/3.jpg', '/images/me/laboratories/heat-transfer-lab/4.jpg', '/images/me/laboratories/heat-transfer-lab/5.jpg', '/images/me/laboratories/heat-transfer-lab/6.jpg'],
                'order' => 5,
                'is_active' => true,
            ],
            [
                'department_id' => $meId,
                'name' => 'Refrigeration and Air Conditioning Lab',
                'slug' => 'refrigeration-and-air-conditioning-lab-2',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Refrigeration and Air Conditioning Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Refrigeration and Air Conditioning Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/me/laboratories/refrigeration-and-air-conditioning-lab-2/1.jpg', '/images/me/laboratories/refrigeration-and-air-conditioning-lab-2/2.jpg', '/images/me/laboratories/refrigeration-and-air-conditioning-lab-2/3.jpg'],
                'order' => 6,
                'is_active' => true,
            ],
            [
                'department_id' => $meId,
                'name' => 'Fluid Mechanics and Machinery Lab',
                'slug' => 'fluid-mechanics-and-machinery-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Fluid Mechanics and Machinery Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Fluid Mechanics and Machinery Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/me/laboratories/fluid-mechanics-and-machinery-lab/1.jpg', '/images/me/laboratories/fluid-mechanics-and-machinery-lab/2.jpg', '/images/me/laboratories/fluid-mechanics-and-machinery-lab/3.jpg', '/images/me/laboratories/fluid-mechanics-and-machinery-lab/4.jpg', '/images/me/laboratories/fluid-mechanics-and-machinery-lab/5.jpg', '/images/me/laboratories/fluid-mechanics-and-machinery-lab/6.jpg'],
                'order' => 7,
                'is_active' => true,
            ],
            [
                'department_id' => $meId,
                'name' => 'CAD & Simulation Lab',
                'slug' => 'cad-and-simulation-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard CAD & Simulation Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in CAD & Simulation Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/me/laboratories/cad-and-simulation-lab/1.jpg', '/images/me/laboratories/cad-and-simulation-lab/2.jpg'],
                'order' => 8,
                'is_active' => true,
            ],
            [
                'department_id' => $meId,
                'name' => 'Machine Shop and Production Process Lab',
                'slug' => 'machine-shop-and-production-process-lab-2',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Machine Shop and Production Process Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Machine Shop and Production Process Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/me/laboratories/machine-shop-and-production-process-lab-2/1.jpg', '/images/me/laboratories/machine-shop-and-production-process-lab-2/2.jpg', '/images/me/laboratories/machine-shop-and-production-process-lab-2/3.jpg', '/images/me/laboratories/machine-shop-and-production-process-lab-2/4.jpg', '/images/me/laboratories/machine-shop-and-production-process-lab-2/5.jpg', '/images/me/laboratories/machine-shop-and-production-process-lab-2/6.jpg'],
                'order' => 9,
                'is_active' => true,
            ],
            [
                'department_id' => $meId,
                'name' => 'Welding Shop',
                'slug' => 'welding-shop-2',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Welding Shop apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Welding Shop', 'Experimental verification of theoretical principles'],
                'images' => [],
                'order' => 10,
                'is_active' => true,
            ],
            [
                'department_id' => $meId,
                'name' => 'Foundry Shop',
                'slug' => 'foundry-shop',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Foundry Shop apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Foundry Shop', 'Experimental verification of theoretical principles'],
                'images' => ['/images/me/laboratories/foundry-shop/1.jpg', '/images/me/laboratories/foundry-shop/2.jpg'],
                'order' => 11,
                'is_active' => true,
            ],
            [
                'department_id' => $meId,
                'name' => 'Measurement and Instrumentation Lab',
                'slug' => 'measurement-and-instrumentation-lab-2',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Measurement and Instrumentation Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Measurement and Instrumentation Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/me/laboratories/measurement-and-instrumentation-lab-2/1.jpg', '/images/me/laboratories/measurement-and-instrumentation-lab-2/2.jpg', '/images/me/laboratories/measurement-and-instrumentation-lab-2/3.jpg', '/images/me/laboratories/measurement-and-instrumentation-lab-2/4.jpg', '/images/me/laboratories/measurement-and-instrumentation-lab-2/5.jpg', '/images/me/laboratories/measurement-and-instrumentation-lab-2/6.jpg'],
                'order' => 12,
                'is_active' => true,
            ],
            [
                'department_id' => $meId,
                'name' => 'Materials and Metallurgy Lab',
                'slug' => 'materials-and-metallurgy-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Materials and Metallurgy Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Materials and Metallurgy Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/me/laboratories/materials-and-metallurgy-lab/1.jpg', '/images/me/laboratories/materials-and-metallurgy-lab/2.jpg'],
                'order' => 13,
                'is_active' => true,
            ],
            [
                'department_id' => $meId,
                'name' => 'Drawing Lab',
                'slug' => 'drawing-lab-2',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Drawing Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Drawing Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/me/laboratories/drawing-lab-2/1.jpg', '/images/me/laboratories/drawing-lab-2/2.jpg'],
                'order' => 14,
                'is_active' => true,
            ],
        ];
        foreach ($meLabs as $l) { DepartmentLaboratory::create($l); }

        $ipeLabs = [
            [
                'department_id' => $ipeId,
                'name' => 'Machine Shop and Production Process Lab',
                'slug' => 'production-process-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Machine Shop and Production Process Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Machine Shop and Production Process Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/ipe/laboratories/production-process-lab/1.jpg', '/images/ipe/laboratories/production-process-lab/2.jpg', '/images/ipe/laboratories/production-process-lab/3.jpg'],
                'order' => 1,
                'is_active' => true,
            ],
            [
                'department_id' => $ipeId,
                'name' => 'Foundry and Welding Shop',
                'slug' => 'simulation-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Foundry and Welding Shop apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Foundry and Welding Shop', 'Experimental verification of theoretical principles'],
                'images' => ['/images/ipe/laboratories/simulation-lab/1.jpg', '/images/ipe/laboratories/simulation-lab/2.jpg', '/images/ipe/laboratories/simulation-lab/3.jpg', '/images/ipe/laboratories/simulation-lab/4.jpg', '/images/ipe/laboratories/simulation-lab/5.jpg'],
                'order' => 2,
                'is_active' => true,
            ],
            [
                'department_id' => $ipeId,
                'name' => 'Engineering Drawing Lab',
                'slug' => 'engineering-drawing-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Engineering Drawing Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Engineering Drawing Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/ipe/laboratories/engineering-drawing-lab/1.jpg', '/images/ipe/laboratories/engineering-drawing-lab/2.png'],
                'order' => 3,
                'is_active' => true,
            ],
            [
                'department_id' => $ipeId,
                'name' => 'CAD and Simulation Lab',
                'slug' => 'cad-cam-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard CAD and Simulation Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in CAD and Simulation Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/ipe/laboratories/cad-cam-lab/1.jpg', '/images/ipe/laboratories/cad-cam-lab/2.png'],
                'order' => 4,
                'is_active' => true,
            ],
            [
                'department_id' => $ipeId,
                'name' => 'Materials Handling & Maintenance Engineering Lab',
                'slug' => 'machine-tool-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Materials Handling & Maintenance Engineering Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Materials Handling & Maintenance Engineering Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/ipe/laboratories/machine-tool-lab/1.jpg', '/images/ipe/laboratories/machine-tool-lab/2.jpg'],
                'order' => 5,
                'is_active' => true,
            ],
            [
                'department_id' => $ipeId,
                'name' => 'Ergonomics & Safety Management Lab',
                'slug' => 'ergonomics-safety-management-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Ergonomics & Safety Management Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Ergonomics & Safety Management Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/ipe/laboratories/ergonomics-safety-management-lab/1.jpeg', '/images/ipe/laboratories/ergonomics-safety-management-lab/2.jpeg', '/images/ipe/laboratories/ergonomics-safety-management-lab/3.jpg', '/images/ipe/laboratories/ergonomics-safety-management-lab/4.jpg', '/images/ipe/laboratories/ergonomics-safety-management-lab/5.jpg'],
                'order' => 6,
                'is_active' => true,
            ],
            [
                'department_id' => $ipeId,
                'name' => 'Measurement, Instrumentation and Quality Control Lab',
                'slug' => 'measurement-quality-control-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Measurement, Instrumentation and Quality Control Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Measurement, Instrumentation and Quality Control Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/ipe/laboratories/measurement-quality-control-lab/1.jpg', '/images/ipe/laboratories/measurement-quality-control-lab/2.jpg', '/images/ipe/laboratories/measurement-quality-control-lab/3.jpg', '/images/ipe/laboratories/measurement-quality-control-lab/4.jpg', '/images/ipe/laboratories/measurement-quality-control-lab/5.jpg', '/images/ipe/laboratories/measurement-quality-control-lab/6.jpg'],
                'order' => 7,
                'is_active' => true,
            ],
            [
                'department_id' => $ipeId,
                'name' => 'Metallurgy Lab',
                'slug' => 'metrology-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Metallurgy Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Metallurgy Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/ipe/laboratories/metrology-lab/1.png', '/images/ipe/laboratories/metrology-lab/2.jpg', '/images/ipe/laboratories/metrology-lab/3.jpg'],
                'order' => 8,
                'is_active' => true,
            ],
            [
                'department_id' => $ipeId,
                'name' => 'Strength of Materials Lab',
                'slug' => 'strength-of-materials-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Strength of Materials Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Strength of Materials Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/ipe/laboratories/strength-of-materials-lab/1.jpg', '/images/ipe/laboratories/strength-of-materials-lab/2.jpg', '/images/ipe/laboratories/strength-of-materials-lab/3.jpg', '/images/ipe/laboratories/strength-of-materials-lab/4.jpg'],
                'order' => 9,
                'is_active' => true,
            ],
            [
                'department_id' => $ipeId,
                'name' => 'Mechanics of Machinery Lab',
                'slug' => 'mechanics-of-machinery-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Mechanics of Machinery Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Mechanics of Machinery Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/ipe/laboratories/mechanics-of-machinery-lab/1.jpg', '/images/ipe/laboratories/mechanics-of-machinery-lab/2.jpg', '/images/ipe/laboratories/mechanics-of-machinery-lab/3.jpg', '/images/ipe/laboratories/mechanics-of-machinery-lab/4.jpg', '/images/ipe/laboratories/mechanics-of-machinery-lab/5.jpg', '/images/ipe/laboratories/mechanics-of-machinery-lab/6.jpg'],
                'order' => 10,
                'is_active' => true,
            ],
            [
                'department_id' => $ipeId,
                'name' => 'Fluid Mechanics and Machinery Lab',
                'slug' => 'fluid-mechanics-and-machinery-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Fluid Mechanics and Machinery Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Fluid Mechanics and Machinery Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/ipe/laboratories/fluid-mechanics-and-machinery-lab/1.jpg', '/images/ipe/laboratories/fluid-mechanics-and-machinery-lab/2.jpg'],
                'order' => 11,
                'is_active' => true,
            ],
            [
                'department_id' => $ipeId,
                'name' => 'Thermodynamics & Heat Transfer Lab',
                'slug' => 'thermodynamics-heat-transfer-lab',
                'description' => 'State-of-the-art laboratory facility.',
                'equipment' => ['Standard Thermodynamics & Heat Transfer Lab apparatus', 'Testing workstations'],
                'objectives' => ['Hands-on practical training in Thermodynamics & Heat Transfer Lab', 'Experimental verification of theoretical principles'],
                'images' => ['/images/ipe/laboratories/thermodynamics-heat-transfer-lab/1.jpg', '/images/ipe/laboratories/thermodynamics-heat-transfer-lab/2.jpg', '/images/ipe/laboratories/thermodynamics-heat-transfer-lab/3.jpg', '/images/ipe/laboratories/thermodynamics-heat-transfer-lab/4.jpg', '/images/ipe/laboratories/thermodynamics-heat-transfer-lab/5.jpg', '/images/ipe/laboratories/thermodynamics-heat-transfer-lab/6.jpg'],
                'order' => 12,
                'is_active' => true,
            ],
        ];
        foreach ($ipeLabs as $l) { DepartmentLaboratory::create($l); }


        // =========================================================================
        // 4. POPULATE DEPARTMENT MEMBERS (ME & IPE)
        // =========================================================================
        // ME Members
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Mahmudul Adil'],
            [
                'designation' => 'Assistant Professor and Head, Dept. of ME.',
                'phone' => null,
                'email' => 'headme@baust.edu.bd,adil@baust.edu.bd (0ff), mahmuduladil95@gmail.com (Per)',
                'photo' => '/images/me/members/md._mahmudul_adil.jpg',
                'education' => ['B.Sc. in Mechanical Engineering, CUET; M.Sc. in Mechanical Engineering, CUET'],
                'category' => 'assistant_professor',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Mahmudul Adil</strong> is currently serving as <strong>Assistant Professor and Head, Dept. of ME.</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 1,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Prof. Dr. Imtiaz Ahmed Choudhury'],
            [
                'designation' => 'Professor and Dean, Faculty of ME.',
                'phone' => null,
                'email' => 'dean_me@baust.edu.bd',
                'photo' => '/images/me/members/prof._dr._imtiaz_ahmed_choudhury.jpg',
                'education' => ['B.Sc. (ME), MEng, MS, PhD, CEng (UK).'],
                'category' => 'professor',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Prof. Dr. Imtiaz Ahmed Choudhury</strong> is currently serving as <strong>Professor and Dean, Faculty of ME.</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 2,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Dr. Md. Syful Islam'],
            [
                'designation' => 'Professor',
                'phone' => null,
                'email' => 'msislam@baust.edu.bd',
                'photo' => '/images/me/members/dr._md._syful_islam.jpg',
                'education' => ['B.Sc. Engg. (BUET);M.Sc. in Mechanical Engineering, Tuskegee University, Tuskegee,  Alabama, USA; PhD in Mechanical Engineering, University of Nevada Las Vegas   Las Vegas, Nevada, USA'],
                'category' => 'professor',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Dr. Md. Syful Islam</strong> is currently serving as <strong>Professor</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 3,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Tasfia Tasnim'],
            [
                'designation' => 'Assistant Professor',
                'phone' => null,
                'email' => 'tasfia@baust.edu.bd',
                'photo' => '/images/me/members/tasfia_tasnim.jpg',
                'education' => ['B.Sc. Engg. in ME (CUET)', 'M.Sc. Engg. in ME (CUET)'],
                'category' => 'assistant_professor',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Tasfia Tasnim</strong> is currently serving as <strong>Assistant Professor</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 4,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Waheduzzaman Basunia Nouman'],
            [
                'designation' => 'Assistant Professor',
                'phone' => null,
                'email' => 'nouman@baust.edu.bd, md.waheduzzaman.nouman@gmail.com',
                'photo' => '/images/me/members/md._waheduzzaman_basunia_nouman.png',
                'education' => ['B. Sc. Engg. in ME (BUET), M.Sc. Engg. in ME (BUET)'],
                'category' => 'assistant_professor',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Waheduzzaman Basunia Nouman</strong> is currently serving as <strong>Assistant Professor</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 5,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Abu Daud'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'daud.me@baust.edu.bd',
                'photo' => '/images/me/members/md._abu_daud.jpg',
                'education' => ['B.Sc. Engg. in ME (RUET), M.Sc. Engg. in ME, (RUET)-Ongoing'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Abu Daud</strong> is currently serving as <strong>Lecturer</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 6,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Abdullah Al Mohotadi'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'mohotadi@baust.edu.bd(official) </br> abdullahmohotadi@gmail.com( personal)',
                'photo' => '/images/me/members/md._abdullah_al_mohotadi.jpeg',
                'education' => ['B.Sc in Mechanical Engineering (KUET); M.Sc in Mechanical Engineering (KUET) [Ongoing]'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Abdullah Al Mohotadi</strong> is currently serving as <strong>Lecturer</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 7,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Kabid Ahmed Akib'],
            [
                'designation' => 'Lecturer and DPC',
                'phone' => null,
                'email' => 'kabidahmed@baust.edu.bd (Official)',
                'photo' => '/images/me/members/kabid_ahmed_akib.jpeg',
                'education' => ['B.Sc in Mechanical Engg. (RUET)', 'M.Sc in Mechanical Engg. (RUET) , Ongoing'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Kabid Ahmed Akib</strong> is currently serving as <strong>Lecturer and DPC</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 8,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Tausifuz Zaman'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'tausifuz@baust.edu.bd',
                'photo' => '/images/me/members/md._tausifuz_zaman.jpg',
                'education' => ['B.Sc in Mechanical Engg. BUET'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Tausifuz Zaman</strong> is currently serving as <strong>Lecturer</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 9,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Iqbal Nafis Razee'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'iqbal.nafis74@baust.edu.bd',
                'photo' => '/images/me/members/iqbal_nafis_razee.jpg',
                'education' => ['B.Sc in Mechanical Engineering(BUET)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Iqbal Nafis Razee</strong> is currently serving as <strong>Lecturer</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 10,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Eftekher Ahmed Reyad'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'reyad@baust.edu.bd <br> reyadahmed05@gmail.com',
                'photo' => '/images/me/members/eftekher_ahmed_reyad.jpg',
                'education' => ['BSc in ME, BUET'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Eftekher Ahmed Reyad</strong> is currently serving as <strong>Lecturer</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 11,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Masud Parves'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'masudparves@baust.edu.bd',
                'photo' => '/images/me/members/md._masud_parves.jpeg',
                'education' => ['B.Sc in Mechanical Engineering (CUET)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Masud Parves</strong> is currently serving as <strong>Lecturer</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 12,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md Mozammal Hossain Ashik'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'mmhossainashik@baust.edu.bd, mmhossainashik@gmail.com',
                'photo' => '/images/me/members/md_mozammal_hossain_ashik.png',
                'education' => ['B. Sc. Engg. in ME (BUET)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md Mozammal Hossain Ashik</strong> is currently serving as <strong>Lecturer</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 13,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Monjurul Alam'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'monjurulalam@baust.edu.bd',
                'photo' => '/images/me/members/monjurul_alam.jpg',
                'education' => ['B. Sc. Engg. in ME (BUET)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Monjurul Alam</strong> is currently serving as <strong>Lecturer</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 14,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Rafsun Hossain Mridha'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'rafsunhossainmridha@gmail.com',
                'photo' => null,
                'education' => ['B.Sc. in Mechanical Engineering'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Rafsun Hossain Mridha</strong> is currently serving as <strong>Lecturer</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 15,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Washim Akram'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'washim@baust.edu.bd',
                'photo' => '/images/me/members/md._washim_akram.png',
                'education' => ['B.Sc. Engg. in ME (RUET), (University Gold Medalist), M.Sc. (University of Saskatchewan, Canada)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Washim Akram</strong> is currently serving as <strong>Lecturer</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 16,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Tahmid Anjum Khan'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'tahmid.khan@baust.edu.bd',
                'photo' => '/images/me/members/md._tahmid_anjum_khan.jpg',
                'education' => ['B.Sc in Mechanical Engineering (BUET)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Tahmid Anjum Khan</strong> is currently serving as <strong>Lecturer</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 17,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Sharier Nazim'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'shariernazim@baust.edu.bd',
                'photo' => '/images/me/members/md._sharier_nazim.jpg',
                'education' => ['B.Sc in ME (KUET)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Sharier Nazim</strong> is currently serving as <strong>Lecturer</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 18,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Abu Jafor'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'jafor@baust.edu.bd',
                'photo' => '/images/me/members/md._abu_jafor.png',
                'education' => ['B.Sc. Engg. in ME (CUET) Ph.D. (Ongoing), (Baylor University, USA)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Abu Jafor</strong> is currently serving as <strong>Lecturer</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 19,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Abu Sufian'],
            [
                'designation' => 'Lab Technician',
                'phone' => null,
                'email' => 'sufianbaust@gmail.com',
                'photo' => '/images/me/members/abu_sufian.png',
                'education' => ['Diploma in Mechanical Engineering'],
                'category' => 'academic_officer',
                'type' => 'staff',
                'status' => 'active',
                'biography' => '<p><strong>Abu Sufian</strong> is currently serving as <strong>Lab Technician</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 20,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Nahimul Islam'],
            [
                'designation' => 'Lab Technician',
                'phone' => null,
                'email' => 'nahimul1999@gmail.com',
                'photo' => '/images/me/members/md._nahimul_islam.jpg',
                'education' => ['Diploma in Mechanical Engineering, B.Sc. Engg. in ME (Ongoing, IEB)'],
                'category' => 'academic_officer',
                'type' => 'staff',
                'status' => 'active',
                'biography' => '<p><strong>Md. Nahimul Islam</strong> is currently serving as <strong>Lab Technician</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 21,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Rofiqul Islam'],
            [
                'designation' => 'Lab Technician',
                'phone' => null,
                'email' => 'rofiqulislam616@gmail.com',
                'photo' => '/images/me/members/rofiqul_islam.png',
                'education' => ['Diploma in Mechanical Engineering, B.Sc. in ME (Ongoing, City University)'],
                'category' => 'academic_officer',
                'type' => 'staff',
                'status' => 'active',
                'biography' => '<p><strong>Rofiqul Islam</strong> is currently serving as <strong>Lab Technician</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 22,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Ashiqur Rahaman'],
            [
                'designation' => 'Lab Technician',
                'phone' => null,
                'email' => 'bmashiqur2014@gmail.com',
                'photo' => '/images/me/members/md._ashiqur_rahaman.jpg',
                'education' => [],
                'category' => 'academic_officer',
                'type' => 'staff',
                'status' => 'active',
                'biography' => '<p><strong>Md. Ashiqur Rahaman</strong> is currently serving as <strong>Lab Technician</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 23,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Ajgor Ali'],
            [
                'designation' => 'Lab Technician',
                'phone' => null,
                'email' => 'ajgor2255@gmail.com',
                'photo' => '/images/me/members/md._ajgor_ali.jpg',
                'education' => [],
                'category' => 'academic_officer',
                'type' => 'staff',
                'status' => 'active',
                'biography' => '<p><strong>Md. Ajgor Ali</strong> is currently serving as <strong>Lab Technician</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 24,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Mithun Babu'],
            [
                'designation' => 'Lab Assistant',
                'phone' => null,
                'email' => 'mbmithunbabu@gmail.com',
                'photo' => '/images/me/members/mithun_babu.jpg',
                'education' => ['Diploma in Engineering (Mechanical)', 'BSC in ME'],
                'category' => 'academic_staff',
                'type' => 'staff',
                'status' => 'active',
                'biography' => '<p><strong>Mithun Babu</strong> is currently serving as <strong>Lab Assistant</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 25,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Yahiya Rahman'],
            [
                'designation' => 'Office Assistant',
                'phone' => null,
                'email' => 'yahiyabaust@gmail.com',
                'photo' => '/images/me/members/md._yahiya_rahman.jpg',
                'education' => ['BBA (Hons.) in Accounting'],
                'category' => 'academic_staff',
                'type' => 'staff',
                'status' => 'active',
                'biography' => '<p><strong>Md. Yahiya Rahman</strong> is currently serving as <strong>Office Assistant</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 26,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Toriq-Ul-Islam'],
            [
                'designation' => 'Lab Assistant',
                'phone' => null,
                'email' => 'torikul.islam4434@gmail.com',
                'photo' => '/images/me/members/md._toriq-ul-islam.jpg',
                'education' => ['Diploma in Engineering (Power)'],
                'category' => 'academic_staff',
                'type' => 'staff',
                'status' => 'active',
                'biography' => '<p><strong>Md. Toriq-Ul-Islam</strong> is currently serving as <strong>Lab Assistant</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 27,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'me', 'name' => 'Md. Sohidul Islam'],
            [
                'designation' => 'Cleaner',
                'phone' => null,
                'email' => 'sohidulbaust@gmail.com',
                'photo' => '/images/me/members/md._sohidul_islam.jpg',
                'education' => ['Class Eight'],
                'category' => 'academic_staff',
                'type' => 'staff',
                'status' => 'active',
                'biography' => '<p><strong>Md. Sohidul Islam</strong> is currently serving as <strong>Cleaner</strong> in the Department of ME at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST ME.</p>',
                'research_interests' => '<p>Active areas of research include advanced ME design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 28,
            ]
        );
        // IPE Members
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Prof. Dr. A.K.M. Nurul Amin'],
            [
                'designation' => 'Professor and Head of the Department',
                'phone' => null,
                'email' => 'headipe@baust.edu.bd,  akmnurulamin1954@gmail.com (Personal)',
                'photo' => '/images/ipe/members/prof._dr._a.k.m._nurul_amin.png',
                'education' => ['Ph.D. in Engineering Volgograd Polytechnic Institute, USSR'],
                'category' => 'professor',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Prof. Dr. A.K.M. Nurul Amin</strong> is currently serving as <strong>Professor and Head of the Department</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 1,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Prof. Dr. Imtiaz Ahmed Choudhury'],
            [
                'designation' => 'Professor and Dean, Faculty of ME',
                'phone' => null,
                'email' => 'dean_me@baust.edu.bd, imtiaz.ipe@baust.edu.bd',
                'photo' => '/images/ipe/members/prof._dr._imtiaz_ahmed_choudhury.jpg',
                'education' => ['B.Sc Engg. (BUET), M.Eng. (AIT), M.Sc. (USA), PhD, CEng (UK)'],
                'category' => 'professor',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Prof. Dr. Imtiaz Ahmed Choudhury</strong> is currently serving as <strong>Professor and Dean, Faculty of ME</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 2,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Prof. Dr. Md Shameem Reza'],
            [
                'designation' => 'Professor',
                'phone' => null,
                'email' => 'treasurer@baust.edu.bd',
                'photo' => '/images/ipe/members/prof._dr._md_shameem_reza.jpeg',
                'education' => ['PhD (RU)'],
                'category' => 'professor',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Prof. Dr. Md Shameem Reza</strong> is currently serving as <strong>Professor</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 3,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Md. Ariful Alam'],
            [
                'designation' => 'Assistant Professor',
                'phone' => null,
                'email' => 'arif.ipe@baust.edu.bd',
                'photo' => '/images/ipe/members/md._ariful_alam.jpg',
                'education' => ['B.Sc. Engg. in IPE (KUET), M.Sc. Engg. in IEM (KUET), MIEB'],
                'category' => 'assistant_professor',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Ariful Alam</strong> is currently serving as <strong>Assistant Professor</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 4,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Md. Ragib Abid'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'abid@baust.edu.bd </br> dpcipe@baust.edu.bd',
                'photo' => '/images/ipe/members/md._ragib_abid.jpeg',
                'education' => ['B.Sc in IPE (KUET), M.Sc in IPE (BUET) (Pursuing)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Ragib Abid</strong> is currently serving as <strong>Lecturer</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 5,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Hrittik Mural'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'hrittikmuralarnab1998@gmail.com',
                'photo' => '/images/ipe/members/hrittik_mural.jpeg',
                'education' => ['B.Sc Engg in MIE (CUET), M.Sc in ME (CUET) (Pursuing)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Hrittik Mural</strong> is currently serving as <strong>Lecturer</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 6,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Md. Mahabub-A-Khoda'],
            [
                'designation' => 'Lecturer & Program Coordinator',
                'phone' => null,
                'email' => 'mahabub_ipe@baust.edu.bd',
                'photo' => '/images/ipe/members/md._mahabub-a-khoda.jpg',
                'education' => ['B.Sc. Engg. in IPE (KUET), M.Sc in IPE (RUET) (Pursuing)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Mahabub-A-Khoda</strong> is currently serving as <strong>Lecturer & Program Coordinator</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 7,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Abdul Halim'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'abdulhalim@baust.edu.bd',
                'photo' => '/images/ipe/members/abdul_halim.jpg',
                'education' => ['B.Sc. Engg. in IPE (RUET), M.Sc in IPE (RUET) (Pursuing)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Abdul Halim</strong> is currently serving as <strong>Lecturer</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 8,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'A.S.M. Shahriar Hossain Alvee'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'alveeshahriar.ipe@baust.edu.bd <br> alveeshahriar.ipe.19@gmail.com',
                'photo' => '/images/ipe/members/a.s.m._shahriar_hossain_alvee.jpg',
                'education' => ['B.Sc. Engg. in IPE (RUET), M.Sc in IPE (RUET) (Pursuing)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>A.S.M. Shahriar Hossain Alvee</strong> is currently serving as <strong>Lecturer</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 9,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Md. Al Amin'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'alaminpbt@gmail.com',
                'photo' => '/images/ipe/members/md._al_amin.jpeg',
                'education' => ['B.Sc. Engg. in IPE (BAUST), M.Sc. in Data Science (JU)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Al Amin</strong> is currently serving as <strong>Lecturer</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 10,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Jannatul Maoya Hossain'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'jannatulmaoyahossain@gmail.com',
                'photo' => '/images/ipe/members/jannatul_maoya_hossain.jpg',
                'education' => ['B.Sc. Engg. in IPE (BUET)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Jannatul Maoya Hossain</strong> is currently serving as <strong>Lecturer</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 11,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Musarrat Zarin'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'musarratzarin02@gmail.com',
                'photo' => '/images/ipe/members/musarrat_zarin.png',
                'education' => ['B.Sc. Engg. in IPE (BUET)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Musarrat Zarin</strong> is currently serving as <strong>Lecturer</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 12,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Dr. Sultana Parveen'],
            [
                'designation' => 'Professor (BUET)',
                'phone' => null,
                'email' => 'sparveen@ipe.buet.ac.bd',
                'photo' => '/images/ipe/members/dr._sultana_parveen.jpg',
                'education' => ['B.Sc. Engg. & M. Sc. Engg. (BUET) Ph.D. (BUET)'],
                'category' => 'professor',
                'type' => 'adjunct',
                'status' => 'active',
                'biography' => '<p><strong>Dr. Sultana Parveen</strong> is currently serving as <strong>Professor (BUET)</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 13,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Dr. Abdullahil Azeem'],
            [
                'designation' => 'Professor (BUET)',
                'phone' => null,
                'email' => 'azeem@ipe.buet.ac.bd',
                'photo' => '/images/ipe/members/dr._abdullahil_azeem.jpg',
                'education' => ['B.Sc. Engg. (BUET), M. Sc. Engg. (AIT, Thailand), Ph.D.  (Canada)'],
                'category' => 'professor',
                'type' => 'adjunct',
                'status' => 'active',
                'biography' => '<p><strong>Dr. Abdullahil Azeem</strong> is currently serving as <strong>Professor (BUET)</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 14,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Md Mehedi Hasan'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'mehedihasanhridoy99@gmail.com',
                'photo' => '/images/ipe/members/md_mehedi_hasan.jpg',
                'education' => ['B.Sc in IPE (BUET), PhD Candidate at Auburn University, USA'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md Mehedi Hasan</strong> is currently serving as <strong>Lecturer</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 15,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Md. Injamamul Haque Protyai'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'injamamul@baust.edu.bd',
                'photo' => '/images/ipe/members/md._injamamul_haque_protyai.jpeg',
                'education' => ['B.Sc in IPE, PhD Student, University of Arkansas, USA'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Injamamul Haque Protyai</strong> is currently serving as <strong>Lecturer</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 16,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Md. Nahimul Islam'],
            [
                'designation' => 'Lab Technician',
                'phone' => null,
                'email' => 'nahimul1999@gmail.com',
                'photo' => '/images/ipe/members/md._nahimul_islam.jpg',
                'education' => ['Diploma(Mechanical),B.Sc.(Mechanical),IEB [Ongoing]'],
                'category' => 'academic_officer',
                'type' => 'staff',
                'status' => 'active',
                'biography' => '<p><strong>Md. Nahimul Islam</strong> is currently serving as <strong>Lab Technician</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 17,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Md. Rofiqul Islam'],
            [
                'designation' => 'Lab Technician',
                'phone' => null,
                'email' => 'rofiqulislam616@gmail.com',
                'photo' => '/images/ipe/members/md._rofiqul_islam.png',
                'education' => ['B. Sc. in Mechanical Engineering'],
                'category' => 'academic_officer',
                'type' => 'staff',
                'status' => 'active',
                'biography' => '<p><strong>Md. Rofiqul Islam</strong> is currently serving as <strong>Lab Technician</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 18,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Md. Khademul Islam'],
            [
                'designation' => 'Lab Assistant',
                'phone' => null,
                'email' => 'khkhademul22@gmail.com',
                'photo' => '/images/ipe/members/md._khademul_islam.jpg',
                'education' => ['B. Sc. in Mechanical Engineering'],
                'category' => 'academic_staff',
                'type' => 'staff',
                'status' => 'active',
                'biography' => '<p><strong>Md. Khademul Islam</strong> is currently serving as <strong>Lab Assistant</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 19,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Md. Habibulla Hossen'],
            [
                'designation' => 'Office Assistant',
                'phone' => null,
                'email' => 'mdhabibulla370@gmail.com',
                'photo' => '/images/ipe/members/md._habibulla_hossen.jpg',
                'education' => [],
                'category' => 'academic_staff',
                'type' => 'staff',
                'status' => 'active',
                'biography' => '<p><strong>Md. Habibulla Hossen</strong> is currently serving as <strong>Office Assistant</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 20,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Md. Mushiur Rahman'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'mushiur4582@baust.edu.bd',
                'photo' => '/images/ipe/members/md._mushiur_rahman.jpeg',
                'education' => ['B.Sc in IPE (RUET), M.Sc in IPE (RUET) (Pursuing)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Mushiur Rahman</strong> is currently serving as <strong>Lecturer</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 21,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Parth Pratim Das Pritam'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'parth.ipe.36@gmail.com',
                'photo' => '/images/ipe/members/parth_pratim_das_pritam.jpg',
                'education' => ['B.Sc. Engg. in IPE (RUET), M.Sc in IPE (RUET) (Pursuing)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Parth Pratim Das Pritam</strong> is currently serving as <strong>Lecturer</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 22,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Nadim Mahmud'],
            [
                'designation' => 'Lecturer',
                'phone' => null,
                'email' => 'nadimmahmudnayan27.ipe@gmail.com',
                'photo' => '/images/ipe/members/nadim_mahmud.png',
                'education' => ['B.Sc. Engg. in IPE (RUET), M.Sc in IPE (RUET) (Pursuing)'],
                'category' => 'lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Nadim Mahmud</strong> is currently serving as <strong>Lecturer</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 23,
            ]
        );
        DepartmentMember::updateOrCreate(
            ['department' => 'ipe', 'name' => 'Md. Firoz Kabir'],
            [
                'designation' => 'Assistant Professor',
                'phone' => null,
                'email' => 'firozipe10@gmail.com',
                'photo' => '/images/ipe/members/md._firoz_kabir.jpg',
                'education' => ['B.Sc. Engg. in IPE (RUET), M.Sc in IPE (RUET), PhD (Pursuing), RUET'],
                'category' => 'assistant_professor',
                'type' => 'permanent',
                'status' => 'active',
                'biography' => '<p><strong>Md. Firoz Kabir</strong> is currently serving as <strong>Assistant Professor</strong> in the Department of IPE at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>',
                'experience' => '<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST IPE.</p>',
                'research_interests' => '<p>Active areas of research include advanced IPE design, manufacturing optimization, simulation modeling, and sustainability.</p>',
                'publications' => '<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>',
                'order' => 24,
            ]
        );

        // =========================================================================
        // 5. SYNCHRONIZE NOTICES FOR ME AND IPE
        // =========================================================================
        $newsCat = NoticeCategory::firstOrCreate(['slug' => 'news-events'], ['name' => 'News & Events', 'color' => '#059669']);

        // Sample notices for ME
        $meNotices = [
            [
                'title' => 'Clutch Carnival 1.0 Organized by ME Department',
                'slug' => 'clutch-carnival-1-0-organized-by-me-department',
                'excerpt' => 'A premier technical and gaming festival showcasing student engineering projects and e-football competitions.',
                'content' => '<p>The Department of Mechanical Engineering (ME) successfully hosted Clutch Carnival 1.0, celebrating student innovation, robotics showcases, and competitive extracurricular activities.</p>',
                'published_at' => '2026-02-18',
            ],
            [
                'title' => 'Publication of Results Winter 2026 Regular and Summer 2025 Special (ME)',
                'slug' => 'publication-of-results-winter-2026-regular-and-summer-2025-special-me',
                'excerpt' => 'Official examination results published for undergraduate ME batches.',
                'content' => '<p>The Controller of Examinations, BAUST has published the final examination results for undergraduate students of the Mechanical Engineering Department.</p>',
                'published_at' => '2026-02-05',
            ],
            [
                'title' => 'Mechanical Falcons Win 8th Inter-Department Football Tournament',
                'slug' => 'mechanical-falcons-win-8th-inter-department-football-tournament',
                'excerpt' => 'Mechanical Falcons claimed the coveted championship trophy in the inter-department football tournament.',
                'content' => '<p>In an exhilarating final match, Mechanical Falcons emerged champions of the 8th Inter-Department Football Tournament 2024.</p>',
                'published_at' => '2025-08-15',
            ]
        ];
        foreach ($meNotices as $nData) {
            $n = Notice::updateOrCreate(
                ['slug' => $nData['slug']],
                array_merge($nData, [
                    'department' => 'me',
                    'is_active' => true,
                    'is_pinned' => false,
                ])
            );
            $n->categories()->syncWithoutDetaching([$newsCat->id]);
        }

        // Sample notices for IPE
        $ipeNotices = [
            [
                'title' => 'IEOM Society BAUST Student Chapter Certificate Ceremony 2024',
                'slug' => 'ieom-society-baust-student-chapter-certificate-ceremony-2024',
                'excerpt' => 'Celebrating excellence in industrial engineering and operations research.',
                'content' => '<p>The Department of Industrial and Production Engineering organized the certificate giving ceremony for the IEOM Student Chapter, honoring leadership and research presentations.</p>',
                'published_at' => '2026-02-12',
            ],
            [
                'title' => 'Publication of Results Winter 2026 Regular and Summer 2025 Special (IPE)',
                'slug' => 'publication-of-results-winter-2026-regular-and-summer-2025-special-ipe',
                'excerpt' => 'Official examination results published for undergraduate IPE batches.',
                'content' => '<p>The Controller of Examinations, BAUST has published the final examination results for undergraduate students of the IPE Department.</p>',
                'published_at' => '2026-02-05',
            ],
            [
                'title' => 'Industrial Visit at Leatherware Ltd. for IPE Students',
                'slug' => 'industrial-visit-at-leatherware-ltd-for-ipe-students',
                'excerpt' => 'Hands-on exposure to supply chain, lean manufacturing, and quality control systems.',
                'content' => '<p>Undergraduate students of the Department of IPE visited Leatherware Ltd. to study real-world manufacturing processes, assembly line balancing, and quality management systems.</p>',
                'published_at' => '2025-09-20',
            ]
        ];
        foreach ($ipeNotices as $nData) {
            $n = Notice::updateOrCreate(
                ['slug' => $nData['slug']],
                array_merge($nData, [
                    'department' => 'ipe',
                    'is_active' => true,
                    'is_pinned' => false,
                ])
            );
            $n->categories()->syncWithoutDetaching([$newsCat->id]);
        }
    }

    public function down(): void
    {
    }
};
