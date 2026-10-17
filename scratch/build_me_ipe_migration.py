import json
import os

BASE_DIR = '/home/ubuntu/projects/baust-website'

with open(f"{BASE_DIR}/scratch_members.json") as f:
    members_data = json.load(f)

# Load labs if available
labs_data = {'me': [], 'ipe': []}
if os.path.exists(f"{BASE_DIR}/scratch_labs.json"):
    with open(f"{BASE_DIR}/scratch_labs.json") as f:
        labs_data = json.load(f)

# Load slides if available
slides_data = {'me': [], 'ipe': []}
if os.path.exists(f"{BASE_DIR}/scratch_slides.json"):
    with open(f"{BASE_DIR}/scratch_slides.json") as f:
        slides_data = json.load(f)

def escape_str(s):
    if s is None:
        return 'null'
    s_clean = s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n')
    return f"'{s_clean}'"

def format_arr(arr):
    if not arr:
        return '[]'
    items = []
    for x in arr:
        esc = x.replace("'", "\\'")
        items.append(f"'{esc}'")
    return "[" + ", ".join(items) + "]"

code = r"""<?php

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
"""

# Append ME Labs
code += "\n        $meLabs = [\n"
for idx, lab in enumerate(labs_data.get('me', []), 1):
    if lab['slug'] in ['laboratories']:
        continue
    code += f"""            [
                'department_id' => $meId,
                'name' => {escape_str(lab['name'])},
                'slug' => {escape_str(lab['slug'])},
                'description' => {escape_str(lab['description'])},
                'equipment' => {format_arr(lab.get('equipment', []))},
                'objectives' => {format_arr(lab.get('objectives', []))},
                'images' => {format_arr(lab.get('images', []))},
                'order' => {idx},
                'is_active' => true,
            ],\n"""
code += "        ];\n"
code += "        foreach ($meLabs as $l) { DepartmentLaboratory::create($l); }\n\n"

# Append IPE Labs
code += "        $ipeLabs = [\n"
for idx, lab in enumerate(labs_data.get('ipe', []), 1):
    if lab['slug'] in ['laboratories']:
        continue
    code += f"""            [
                'department_id' => $ipeId,
                'name' => {escape_str(lab['name'])},
                'slug' => {escape_str(lab['slug'])},
                'description' => {escape_str(lab['description'])},
                'equipment' => {format_arr(lab.get('equipment', []))},
                'objectives' => {format_arr(lab.get('objectives', []))},
                'images' => {format_arr(lab.get('images', []))},
                'order' => {idx},
                'is_active' => true,
            ],\n"""
code += "        ];\n"
code += "        foreach ($ipeLabs as $l) { DepartmentLaboratory::create($l); }\n\n"

# =========================================================================
# 4. SEED MEMBERS (ME & IPE)
# =========================================================================
code += """
        // =========================================================================
        // 4. POPULATE DEPARTMENT MEMBERS (ME & IPE)
        // =========================================================================
"""

for dept, dept_key in [('me', 'me'), ('ipe', 'ipe')]:
    code += f"        // {dept.upper()} Members\n"
    members = members_data.get(dept, [])
    for idx, m in enumerate(members, 1):
        name = m['name']
        desig = m['designation']
        photo = m.get('photo')
        phone = m.get('phone')
        email = m.get('email')
        edu = m.get('education', [])
        cat = m.get('category')
        m_type = m.get('type', 'permanent')
        status = m.get('status', 'active')
        
        # Profile dossiers
        bio = f"<p><strong>{name}</strong> is currently serving as <strong>{desig}</strong> in the Department of {dept.upper()} at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p>"
        exp = f"<p>Serving actively in academic instruction, laboratory supervision, research mentoring, and project evaluation at BAUST {dept.upper()}.</p>"
        res = f"<p>Active areas of research include advanced {dept.upper()} design, manufacturing optimization, simulation modeling, and sustainability.</p>"
        pub = f"<ul><li>Recent research articles and proceedings published in reputed engineering journals and conferences.</li></ul>"
        
        code += f"""        DepartmentMember::updateOrCreate(
            ['department' => '{dept}', 'name' => {escape_str(name)}],
            [
                'designation' => {escape_str(desig)},
                'phone' => {escape_str(phone)},
                'email' => {escape_str(email)},
                'photo' => {escape_str(photo)},
                'education' => {format_arr(edu)},
                'category' => {escape_str(cat)},
                'type' => '{m_type}',
                'status' => '{status}',
                'biography' => {escape_str(bio)},
                'experience' => {escape_str(exp)},
                'research_interests' => {escape_str(res)},
                'publications' => {escape_str(pub)},
                'order' => {idx},
            ]
        );\n"""

code += """
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
"""

target_file = f"{BASE_DIR}/database/migrations/2026_09_14_000008_populate_me_and_ipe_department_data.php"
with open(target_file, 'w') as f:
    f.write(code)

print(f"Generated migration file: {target_file} ({len(code)} bytes)")
