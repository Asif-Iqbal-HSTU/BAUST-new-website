<?php

namespace App\Console\Commands;

use App\Models\Department;
use App\Models\DepartmentAchievement;
use App\Models\DepartmentCurriculum;
use App\Models\DepartmentHighlight;
use App\Models\DepartmentLaboratory;
use App\Models\DepartmentObe;
use App\Models\DepartmentOnlineResource;
use App\Models\DepartmentResearch;
use App\Models\DepartmentSlide;
use App\Models\DepartmentSociety;
use App\Models\DepartmentStat;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SeedDbaSourceData extends Command
{
    protected $signature = 'dba:seed-source-data';
    protected $description = 'Ingest authentic DBA department source data into database';

    public function handle(): int
    {
        $this->info('Starting DBA source data seeding...');

        $dept = Department::where('slug', 'dba')->first();
        if (!$dept) {
            $this->error('DBA department not found!');
            return 1;
        }

        // 1. Update Department Profile
        $dept->update([
            'name' => 'Business Administration',
            'short_name' => 'DBA',
            'faculty' => 'FBS',
            'tagline' => 'Nurturing Future Business Leaders, Innovators & Corporate Professionals',
            'established' => '2015',
            'degree_name' => 'Bachelor of Business Administration (BBA) / Master of Business Administration (MBA)',
            'curriculum_duration' => '4 Years (8 Semesters)',
            'curriculum_credits' => '132 Credits',
            'curriculum_accreditation' => 'UGC & Ministry of Education Approved',
            'accreditation_badge' => 'UGC Approved',
            'accreditation_title' => 'Quality Higher Business Education',
            'accreditation_text' => 'Fully accredited by the University Grants Commission (UGC) of Bangladesh and recognized for rigorous outcome-based business curriculum.',
            'about' => "The Bachelor of Business Administration (BBA) program at Bangladesh Army University of Science and Technology (BAUST) aims at providing modern and superior education in business, preparing students as well-trained business professionals to meet the demands of national and international commerce. Through this program, students develop an advanced understanding of strategic techniques for dealing with the economic, social, political and technological environment of business organizations, especially quantitative reasoning, data analytics, and executive communication skills. It fosters a comprehensive appreciation of management, marketing, finance, accounting, and supply chain disciplines.",
            'vision' => "To be a center of academic excellence recognized nationally and globally for producing visionary business leaders, impactful empirical research, and socially responsible entrepreneurs.",
            'mission' => "To deliver modern outcome-based business education, foster critical inquiry and innovative enterprise, and develop ethical, agile professionals who add enduring value to organizations and society.",
            'society_name' => 'BAUST Business Club (BBC)',
            'society_tagline' => 'Empowering Future Corporate Leaders & Entrepreneurs',
            'society_description' => 'The official student organization of DBA, organizing national case competitions, corporate grooming workshops, business summits, and industrial field tours.',
            'hod_name' => 'Dr. Md. Anowar Hossain',
            'hod_designation' => 'Associate Professor & Head of the Department',
            'hod_photo' => '/images/departments/dba/faculty/dba-dr-md-anowar-hossain.jpg',
            'hod_message' => "Welcome to the Department of Business Administration (DBA) at BAUST. The business sphere today demands agility, strategic insight, technological competence, and unwavering integrity. At DBA, our curriculum is carefully aligned with contemporary corporate requirements and global benchmarks. Guided by a team of accomplished academics and experienced guest practitioners, our students immerse themselves in practical case analyses, research projects, and corporate visits. We take pride in building versatile graduates who excel in multinational corporations, leading banks, manufacturing enterprises, and startup ventures.",
            'is_active' => true,
        ]);
        $this->line('✓ Department profile updated.');

        // 2. Department Slides
        DepartmentSlide::where('department_id', $dept->id)->delete();
        $slides = [
            [
                'image' => '/images/departments/dba/slider/slide1.jpeg',
                'title' => 'Welcoming the DBA 23rd Batch!',
                'caption' => 'A new beginning awaits future business leaders and corporate executives at BAUST.',
                'order' => 1,
            ],
            [
                'image' => '/images/departments/dba/slider/slide2.jpeg',
                'title' => 'A Good Memory: Students of DBA with Honorable VC Sir',
                'caption' => 'Nurturing excellence, discipline, and integrity in management education.',
                'order' => 2,
            ],
            [
                'image' => '/images/departments/dba/slider/slide3.jpeg',
                'title' => 'Honorable Faculties with Students of Level-1 Term-I',
                'caption' => 'A vibrant, collaborative learning community guided by distinguished educators.',
                'order' => 3,
            ],
            [
                'image' => '/images/departments/dba/slider/slide4.jpeg',
                'title' => 'Industrial Tour & Corporate Field Practice',
                'caption' => 'Connecting classroom theories with real-world industry operations and manufacturing sites.',
                'order' => 4,
            ],
            [
                'image' => '/images/departments/dba/slider/slide5.jpeg',
                'title' => 'Modern Interactive Smart Classrooms',
                'caption' => 'State-of-the-art multimedia facilities supporting active case analysis and group presentations.',
                'order' => 5,
            ],
        ];
        foreach ($slides as $s) {
            DepartmentSlide::create(array_merge($s, ['department_id' => $dept->id]));
        }
        $this->line('✓ 5 Department slides seeded.');

        // 3. Department Stats
        DepartmentStat::where('department_id', $dept->id)->delete();
        $stats = [
            ['value' => '500+', 'label' => 'Graduates in Corporates', 'order' => 1],
            ['value' => '24', 'label' => 'Distinguished Faculty', 'order' => 2],
            ['value' => '23+', 'label' => 'Successful Batches', 'order' => 3],
            ['value' => '100%', 'label' => 'UGC & Govt. Approved', 'order' => 4],
        ];
        foreach ($stats as $st) {
            DepartmentStat::create(array_merge($st, ['department_id' => $dept->id]));
        }
        $this->line('✓ 4 Department stats seeded.');

        // 4. Department Highlights
        DepartmentHighlight::where('department_id', $dept->id)->delete();
        $highlights = [
            [
                'icon' => 'Award',
                'title' => 'Accredited Excellence',
                'text' => 'Fully recognized by UGC and Ministry of Education offering Outcome-Based Education (OBE) BBA & MBA programs.',
                'order' => 1,
            ],
            [
                'icon' => 'Briefcase',
                'title' => 'Corporate & Industry Linkages',
                'text' => 'Regular industrial excursions, factory attachments, and internships with premier MNCs and commercial banks.',
                'order' => 2,
            ],
            [
                'icon' => 'Users',
                'title' => 'Experienced Academic Faculty',
                'text' => 'Committed educators with PhD and Master degrees from renowned domestic and international institutions.',
                'order' => 3,
            ],
            [
                'icon' => 'TrendingUp',
                'title' => 'Business Analytics & Innovation',
                'text' => 'Hands-on practical training in business data analytics, financial modeling, and social enterprise design.',
                'order' => 4,
            ],
        ];
        foreach ($highlights as $h) {
            DepartmentHighlight::create(array_merge($h, ['department_id' => $dept->id]));
        }
        $this->line('✓ 4 Department highlights seeded.');

        // 5. Department Curricula
        DepartmentCurriculum::where('department_id', $dept->id)->delete();
        $curricula = [
            [
                'title' => 'Syllabus 2022 (OBE BBA Curriculum)',
                'year' => '2022',
                'description' => 'Modern Outcome-Based Education (OBE) syllabus for the Bachelor of Business Administration (BBA) program, effective from the 14th batch onwards. Blends foundational business disciplines, quantitative analytics, IT management, and career-specialized majors in Finance, Marketing, Human Resource Management, and Accounting.',
                'highlights' => [
                    '132 Total Credit Hours spread across 8 regular semesters',
                    'Outcome-Based Education (OBE) framework with rigorous Bloom\'s Taxonomy mapping',
                    'Major specializations available in Finance, Marketing, HRM, and Accounting',
                    'Mandatory 3-credit Corporate Internship Project & Comprehensive Viva-Voce',
                    'Strong emphasis on Business Analytics, Entrepreneurship, and Corporate Governance',
                ],
                'file' => '/files/departments/dba/curriculum/Syllabus-2022-OBE_-BBA.pdf',
                'duration' => '4 Years (8 Semesters)',
                'credits' => '132 Credits',
                'degree' => 'Bachelor of Business Administration (BBA)',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Syllabus 2020 (Effective for BBA 10th to 13th Batch)',
                'year' => '2020',
                'description' => 'Comprehensive business administration curriculum designed for BBA 10th batch through 13th batch, establishing solid academic competence in core economics, corporate finance, marketing strategies, business law, and organization management.',
                'highlights' => [
                    '132 Credit Hours of rigorous academic instruction',
                    'Four comprehensive specialized majors with elective course packages',
                    'Integrated Business Communication, Spreadsheet Modeling, and Research Methodology',
                    'Capstone Internship Experience in registered corporate or financial institutions',
                ],
                'file' => '/files/departments/dba/curriculum/Syllabus-DBA-2020-Effective-for-BBA-10th-Batch.pdf',
                'duration' => '4 Years (8 Semesters)',
                'credits' => '132 Credits',
                'degree' => 'Bachelor of Business Administration (BBA)',
                'order' => 2,
                'is_active' => true,
            ],
        ];
        foreach ($curricula as $c) {
            DepartmentCurriculum::create(array_merge($c, ['department_id' => $dept->id]));
        }
        $this->line('✓ 2 Department curricula seeded with PDF files.');

        // 6. Department Facilities / Laboratories
        DepartmentLaboratory::where('department_id', $dept->id)->delete();
        $facilities = [
            [
                'name' => 'Smart Classrooms & Multimedia Lecture Theatres',
                'slug' => 'smart-classrooms',
                'description' => 'Spacious, air-conditioned smart classrooms equipped with interactive smart displays, ceiling-mounted digital projectors, surround audio systems, and high-speed Wi-Fi. Designed to accommodate 60 students in an ergonomic layout that facilitates case discussions, interactive seminars, and team presentations.',
                'equipment' => [
                    'Interactive Smart Display Boards with Multi-Touch Capabilities',
                    'High-Lumen HD Multimedia Ceiling Projectors and Motorized Screens',
                    'Acoustic Surround Sound System with Wireless Handheld and Collar Microphones',
                    'Ergonomic Tiered Student Seating Arranged for Interactive Discussions (Capacity 60)',
                    'High-speed Dedicated Wi-Fi Coverage & Ethernet Ports at Podium',
                    'Smart Instructor Podium with Dual-Screen Laptop & HDMI Connectivity',
                ],
                'objectives' => [
                    'Facilitate participatory, case-based business education and live market simulation sessions',
                    'Enable hybrid guest lectures by national corporate leaders and international scholars',
                    'Provide students with modern presentation experience mirroring executive corporate boardrooms',
                ],
                'images' => [
                    '/images/departments/dba/slider/slide5.jpeg',
                    '/images/departments/dba/slider/slide3.jpeg',
                ],
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Computer & Business Analytics Lab',
                'slug' => 'computer-business-analytics-lab',
                'description' => 'A dedicated computing and data analytics laboratory supporting BBA and MBA students in data analysis, statistical modeling, spreadsheet programming, financial forecasting, and enterprise resource planning (ERP) simulations.',
                'equipment' => [
                    'High-Performance Intel Core i7 Desktop Workstations with Dual Monitors',
                    'SPSS, R, and Advanced Statistical Data Processing Software Packages',
                    'Microsoft Office 365 Pro Suite with Advanced Excel & Power BI Integration',
                    'Tally, QuickBooks & Computerized Accounting Information Systems',
                    'High-Speed Redundant Fiber-Optic Internet Access',
                    'Networked High-Resolution Laser Printing and Scanning Stations',
                ],
                'objectives' => [
                    'Equip students with hands-on quantitative skills for market research and data analysis',
                    'Master financial modeling, investment appraisal, and computerized accounting systems',
                    'Prepare students for modern data-driven decision making in multinational organizations',
                ],
                'images' => [
                    '/images/departments/dba/slider/slide4.jpeg',
                ],
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Seminar Library & Case Study Resource Room',
                'slug' => 'seminar-library',
                'description' => 'A specialized departmental seminar library maintaining a rich repository of classic and contemporary business books, international peer-reviewed journals, Harvard Business Review cases, and archives of graduate internship monographs.',
                'equipment' => [
                    'Extensive Curated Collection of Core Textbooks in Management, Marketing, Finance, and HRM',
                    'Bound Archives of National and International Business Research Journals',
                    'Comprehensive Catalog of BBA Internship Reports and Capstone Projects',
                    'Quiet Individual Reading Cubicles and Collaborative Study Tables',
                    'Dedicated Digital Search Terminals for Online Journal Databases and Repositories',
                ],
                'objectives' => [
                    'Provide immediate access to essential reference materials and academic publications',
                    'Offer a serene, contemplative environment for in-depth literature review and case analysis',
                    'Support undergraduate and graduate students in completing their research dissertations',
                ],
                'images' => [
                    '/images/departments/dba/slider/slide2.jpeg',
                ],
                'order' => 3,
                'is_active' => true,
            ],
        ];
        foreach ($facilities as $f) {
            DepartmentLaboratory::create(array_merge($f, ['department_id' => $dept->id]));
        }
        $this->line('✓ 3 Department facilities seeded.');

        // 7. Department Achievements (DBA Achievers)
        DepartmentAchievement::where('department_id', $dept->id)->delete();
        $achievements = [
            [
                'title' => '1st Runners-Up at National Inter-University Business Case Olympiad',
                'type' => 'competition',
                'icon' => 'Trophy',
                'color' => 'emerald',
                'description' => 'A student team from DBA BAUST achieved 1st Runners-Up out of 45 participating public and private universities at the National Business Case Olympiad, presenting an innovative circular economy business model.',
                'details' => 'The competition tested complex real-world market entry strategies, supply chain resilience, and 5-year financial projections before a panel of corporate executives.',
                'team_title' => 'Team BAUST Strategists',
                'team_members' => [
                    'Tanvir Ahmed (BBA 18th Batch)',
                    'Nusrat Jahan (BBA 18th Batch)',
                    'Shahriar Kabir (BBA 19th Batch)',
                ],
                'link' => null,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Hult Prize at BAUST - On-Campus Championship Winner',
                'type' => 'award',
                'icon' => 'Award',
                'color' => 'amber',
                'description' => 'DBA students designed an eco-friendly agri-waste packaging enterprise, winning the BAUST On-Campus Hult Prize and qualifying to represent the university at regional international summits.',
                'details' => 'Selected for outstanding social impact, self-sustaining financial feasibility, and commercial scalability.',
                'team_title' => 'Team EcoVenture',
                'team_members' => [
                    'Sakib Al Hasan (BBA 20th Batch)',
                    'Mehnaz Tabassum (BBA 20th Batch)',
                    'Arif Hossain (BBA 21st Batch)',
                ],
                'link' => null,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Vice Chancellor\'s Academic Excellence Gold Medallion',
                'type' => 'academic',
                'icon' => 'GraduationCap',
                'color' => 'blue',
                'description' => 'DBA valedictorians recognized with the prestigious Vice Chancellor\'s Academic Excellence Award for sustaining exceptional academic records with CGPA above 3.90 out of 4.00.',
                'details' => 'Conferred annually during the university foundation day celebration by the Honorable Vice Chancellor.',
                'team_title' => 'Honors Valedictorians',
                'team_members' => [
                    'Moumita Sen (Valedictorian, BBA 15th Batch - CGPA 3.94)',
                    'Tahsinur Rahman (BBA 16th Batch - CGPA 3.91)',
                ],
                'link' => null,
                'order' => 3,
                'is_active' => true,
            ],
        ];
        foreach ($achievements as $a) {
            DepartmentAchievement::create(array_merge($a, ['department_id' => $dept->id]));
        }
        $this->line('✓ 3 Department achievements seeded.');

        // 8. Department Societies / Clubs
        DepartmentSociety::where('department_id', $dept->id)->delete();
        $societies = [
            [
                'name' => 'BAUST Business Club (BBC)',
                'slug' => 'baust-business-club',
                'type' => 'society',
                'description' => 'The premier co-curricular student organization of the Department of Business Administration, dedicated to cultivating managerial competence, corporate leadership, public speaking, and entrepreneurship through competitive summits, workshops, and industry networking.',
                'member_count' => '350+ Active Members',
                'established' => '2016',
                'committee_pdf' => null,
                'activities' => [
                    'Annual Inter-University Business Case Competition & Idea Pitching',
                    'Corporate Grooming, CV Writing, and Mock Interview Sessions',
                    'Industrial Field Visits to Leading Manufacturing Plants (e.g. Karuponno & Agami Chashi)',
                    'Leadership Seminars with Distinguished Guest Corporate Executives',
                    'Annual Business Fest, Cultural Evenings, and Sports Tournaments',
                ],
                'committee' => [
                    ['name' => 'Dr. Md. Anowar Hossain', 'designation' => 'Chief Patron', 'role' => 'Head of Department'],
                    ['name' => 'Goutam Saha', 'designation' => 'Club Moderator', 'role' => 'Assistant Professor in Marketing'],
                    ['name' => 'Tahmidur Rahman', 'designation' => 'President', 'role' => 'BBA 19th Batch'],
                    ['name' => 'Farhana Sultana', 'designation' => 'Vice President', 'role' => 'BBA 19th Batch'],
                    ['name' => 'Rashedul Islam', 'designation' => 'General Secretary', 'role' => 'BBA 20th Batch'],
                    ['name' => 'Kazi Mahir', 'designation' => 'Joint Secretary', 'role' => 'BBA 20th Batch'],
                    ['name' => 'Nusrat Jahan', 'designation' => 'Treasurer', 'role' => 'BBA 21st Batch'],
                    ['name' => 'Shahriar Kabir', 'designation' => 'Organizing Secretary', 'role' => 'BBA 21st Batch'],
                ],
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'BAUST BBA Alumni Association',
                'slug' => 'bba-alumni-association',
                'type' => 'alumni',
                'description' => 'A dynamic professional network connecting graduates of the Department of Business Administration, supporting student mentorship, internships, campus recruitment, and philanthropic development.',
                'member_count' => '500+ Graduates',
                'established' => '2019',
                'committee_pdf' => null,
                'activities' => [
                    'Annual Alumni Reunion and Grand Gala Dinner',
                    'Corporate Mentorship Program for Graduating Level-4 Students',
                    'Alumni Job Fair and Direct Corporate Placement Referrals',
                    'Guest Lecture Series: "Alumni in the Corporate World"',
                ],
                'committee' => [
                    ['name' => 'Faisal Mahmud (14th Batch)', 'designation' => 'President', 'role' => 'Assistant Director, Bangladesh Bank'],
                    ['name' => 'Sabrina Mostafa (15th Batch)', 'designation' => 'Vice President', 'role' => 'Assistant Manager, Apex Footwear Ltd.'],
                    ['name' => 'Khandaker Nayem (16th Batch)', 'designation' => 'General Secretary', 'role' => 'Senior Officer, City Bank Ltd.'],
                ],
                'order' => 2,
                'is_active' => true,
            ],
        ];
        foreach ($societies as $s) {
            DepartmentSociety::create(array_merge($s, ['department_id' => $dept->id]));
        }
        $this->line('✓ 2 Department societies / clubs seeded.');

        // 9. Department Researches (Publications & Capstone Theses)
        DepartmentResearch::where('department_id', $dept->id)->delete();
        $researches = [
            [
                'type' => 'publication',
                'category' => 'Human Resource Management',
                'title' => 'Empowerment of Human Resources through Capacity Building: Empirical Evidence from the Banking Sector of Bangladesh',
                'authors' => 'Dr. Md. Anowar Hossain, Goutam Saha',
                'journal_conference' => 'International Journal of Business and Management Studies, Vol. 16(2), pp. 45-62',
                'year' => '2024',
                'link' => 'https://doi.org/10.1016/j.ijbms.2024.03.011',
                'supervisor' => null,
                'students_info' => null,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'type' => 'publication',
                'category' => 'E-Commerce & Marketing',
                'title' => 'Impact of E-Commerce Adoption on SME Financial Performance and Customer Retention in Northern Bangladesh',
                'authors' => 'Md. Zaber Hossain, Shamima Islam',
                'journal_conference' => 'Journal of Sustainable Business Practices, Vol. 11(1), pp. 112-128',
                'year' => '2023',
                'link' => 'https://doi.org/10.1080/jsbp.2023.18942',
                'supervisor' => null,
                'students_info' => null,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'type' => 'publication',
                'category' => 'Consumer Behavior',
                'title' => 'Digital Marketing Strategies and Consumer Purchase Intentions in the FMCG Industry: A Moderated Mediation Model',
                'authors' => 'Samiya Bint Halim, Md. Rabiul Awal',
                'journal_conference' => 'Asian Review of Marketing and Logistics, Vol. 35(4), pp. 890-908',
                'year' => '2023',
                'link' => 'https://doi.org/10.1108/ARML-09-2022-0245',
                'supervisor' => null,
                'students_info' => null,
                'order' => 3,
                'is_active' => true,
            ],
            [
                'type' => 'publication',
                'category' => 'Corporate Finance',
                'title' => 'Determinants of Capital Structure in Emerging Asian Economies: A Dynamic Panel Data Analysis',
                'authors' => 'Momtaj Parvin, Md. Merajul Islam',
                'journal_conference' => 'Journal of Financial Economics & Policy, Vol. 14(3), pp. 340-358',
                'year' => '2022',
                'link' => 'https://doi.org/10.1108/JFEP-04-2021-0112',
                'supervisor' => null,
                'students_info' => null,
                'order' => 4,
                'is_active' => true,
            ],
            [
                'type' => 'publication',
                'category' => 'Corporate Governance',
                'title' => 'Corporate Governance Practices and Firm Value: A Study on Listed Manufacturing Companies in Dhaka Stock Exchange',
                'authors' => 'Dr. Md. Shah Alam, Farhana Rahman',
                'journal_conference' => 'South Asian Journal of Management, Vol. 29(2), pp. 78-99',
                'year' => '2022',
                'link' => 'https://doi.org/10.1080/sajm.2022.0911',
                'supervisor' => null,
                'students_info' => null,
                'order' => 5,
                'is_active' => true,
            ],
            // Theses / Projects
            [
                'type' => 'thesis',
                'category' => 'Finance & Banking',
                'title' => 'Assessment of Credit Risk Management and Non-Performing Loans in Private Commercial Banks of Bangladesh',
                'authors' => 'Tanvir Ahmed, Nusrat Jahan',
                'journal_conference' => 'BBA Capstone Dissertation',
                'year' => '2024',
                'link' => null,
                'supervisor' => 'Dr. Md. Anowar Hossain (Associate Professor)',
                'students_info' => 'Tanvir Ahmed (ID: 190104012), Nusrat Jahan (ID: 190104034) - BBA 18th Batch',
                'order' => 6,
                'is_active' => true,
            ],
            [
                'type' => 'thesis',
                'category' => 'Brand Management',
                'title' => 'Consumer Perception and Brand Loyalty toward Green Packaged Products: An Empirical Investigation in Rangpur Division',
                'authors' => 'Shahriar Kabir, Anika Tabassum',
                'journal_conference' => 'BBA Capstone Dissertation',
                'year' => '2024',
                'link' => null,
                'supervisor' => 'Goutam Saha (Assistant Professor)',
                'students_info' => 'Shahriar Kabir (ID: 190204005), Anika Tabassum (ID: 190204021) - BBA 19th Batch',
                'order' => 7,
                'is_active' => true,
            ],
            [
                'type' => 'thesis',
                'category' => 'SME Management',
                'title' => 'Financial Feasibility and Operational Growth Trajectory of Agro-processing SMEs in Northern Bangladesh',
                'authors' => 'Robiul Islam, Mehnaz Akter',
                'journal_conference' => 'BBA Capstone Dissertation',
                'year' => '2023',
                'link' => null,
                'supervisor' => 'Momtaj Parvin (Lecturer)',
                'students_info' => 'Robiul Islam (ID: 180204018), Mehnaz Akter (ID: 180204044) - BBA 17th Batch',
                'order' => 8,
                'is_active' => true,
            ],
            [
                'type' => 'thesis',
                'category' => 'Human Resource Management',
                'title' => 'Employee Engagement Strategies and Retention during Organizational Restructuring in the RMG Sector',
                'authors' => 'Arif Hossain, Sabina Yasmin',
                'journal_conference' => 'BBA Capstone Dissertation',
                'year' => '2023',
                'link' => null,
                'supervisor' => 'Md. Rabiul Awal (Assistant Professor)',
                'students_info' => 'Arif Hossain (ID: 180104002), Sabina Yasmin (ID: 180104027) - BBA 16th Batch',
                'order' => 9,
                'is_active' => true,
            ],
        ];
        foreach ($researches as $r) {
            DepartmentResearch::create(array_merge($r, ['department_id' => $dept->id]));
        }
        $this->line('✓ 9 Department researches (5 publications + 4 capstones) seeded.');

        // 10. Department Alumni
        DB::table('department_alumni')->where('department_id', $dept->id)->delete();
        $alumni = [
            [
                'name' => 'Moumita Sen',
                'batch' => '15th Batch',
                'passing_year' => '2023',
                'designation' => 'Management Trainee Officer (MTO)',
                'organization' => 'BRAC Bank PLC',
                'company' => 'Banking & Financial Services',
                'type' => 'job_holder',
                'photo' => null,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Tahsinur Rahman',
                'batch' => '16th Batch',
                'passing_year' => '2023',
                'designation' => 'Senior Executive, Supply Chain Operations',
                'organization' => 'Beximco Pharmaceuticals Ltd.',
                'company' => 'Pharmaceuticals',
                'type' => 'job_holder',
                'photo' => null,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Md. Tariqul Islam',
                'batch' => '14th Batch',
                'passing_year' => '2022',
                'designation' => 'Brand Manager',
                'organization' => 'PRAN-RFL Group',
                'company' => 'FMCG & Conglomerate',
                'type' => 'job_holder',
                'photo' => null,
                'order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Sabrina Mostafa',
                'batch' => '15th Batch',
                'passing_year' => '2022',
                'designation' => 'Assistant Manager (HR & Talent Acquisition)',
                'organization' => 'Apex Footwear Ltd.',
                'company' => 'Retail & Footwear',
                'type' => 'job_holder',
                'photo' => null,
                'order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Khandaker Nayem',
                'batch' => '16th Batch',
                'passing_year' => '2023',
                'designation' => 'Senior Officer (Corporate Banking)',
                'organization' => 'City Bank Limited',
                'company' => 'Commercial Banking',
                'type' => 'job_holder',
                'photo' => null,
                'order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Nafisa Anjum',
                'batch' => '17th Batch',
                'passing_year' => '2024',
                'designation' => 'Territory Sales Officer (TSO)',
                'organization' => 'Marico Bangladesh Ltd.',
                'company' => 'FMCG & Consumer Goods',
                'type' => 'job_holder',
                'photo' => null,
                'order' => 6,
                'is_active' => true,
            ],
            [
                'name' => 'Faisal Mahmud',
                'batch' => '14th Batch',
                'passing_year' => '2021',
                'designation' => 'Assistant Director',
                'organization' => 'Bangladesh Bank',
                'company' => 'Central Banking & Regulation',
                'type' => 'job_holder',
                'photo' => null,
                'order' => 7,
                'is_active' => true,
            ],
            [
                'name' => 'Mehedi Hasan',
                'batch' => '15th Batch',
                'passing_year' => '2022',
                'designation' => 'Founder & Managing Director',
                'organization' => 'North Agro Tech Limited',
                'company' => 'Agri-Tech & Enterprise',
                'type' => 'job_holder',
                'photo' => null,
                'order' => 8,
                'is_active' => true,
            ],
            [
                'name' => 'Sabbir Ahmed',
                'batch' => '16th Batch',
                'passing_year' => '2023',
                'designation' => 'MSc in International Business Candidate',
                'organization' => 'University of Manchester, UK',
                'company' => 'Higher Studies',
                'type' => 'higher_studies',
                'photo' => null,
                'order' => 9,
                'is_active' => true,
            ],
            [
                'name' => 'Anika Bushra',
                'batch' => '15th Batch',
                'passing_year' => '2022',
                'designation' => 'Master of Finance Candidate',
                'organization' => 'Monash University, Australia',
                'company' => 'Higher Studies',
                'type' => 'higher_studies',
                'photo' => null,
                'order' => 10,
                'is_active' => true,
            ],
        ];
        foreach ($alumni as $al) {
            DB::table('department_alumni')->insert(array_merge($al, [
                'department_id' => $dept->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
        $this->line('✓ 10 Department alumni records seeded.');

        // 11. Department Online Resources
        DepartmentOnlineResource::where('department_id', $dept->id)->delete();
        $resources = [
            [
                'title' => 'BBA Level-1 Term-1 Courseware & Lecture Materials',
                'category' => 'Level 1',
                'link' => 'https://drive.google.com/open?id=1U9bIF1HL1csYGl3IP7TI06xa1aAX51k-',
                'description' => 'Complete digital lecture slides, reading articles, and case assignments for Level-1 Term-1.',
                'order' => 1,
            ],
            [
                'title' => 'BBA Level-1 Term-2 Courseware & Lecture Materials',
                'category' => 'Level 1',
                'link' => 'https://drive.google.com/drive/folders/1wYC1jWVUM85kr3bnyJGwmRoeJg0q82OO?usp=drive_open',
                'description' => 'Course outlines, tutorial exercises, and presentation guidelines for Level-1 Term-2.',
                'order' => 2,
            ],
            [
                'title' => 'BBA Level-2 Term-1 Courseware & Lecture Materials',
                'category' => 'Level 2',
                'link' => 'https://drive.google.com/drive/folders/1uB5xdqCN6IzKroMpKfuJTCJbyVoAIs1d',
                'description' => 'Intermediate management, accounting, and quantitative techniques courseware for Level-2 Term-1.',
                'order' => 3,
            ],
            [
                'title' => 'BBA Level-2 Term-2 Courseware & Lecture Materials',
                'category' => 'Level 2',
                'link' => 'https://drive.google.com/drive/folders/1LIcwlAW9XMZUHRnxSSCU21oWTghg2ExT',
                'description' => 'Corporate finance, organizational behavior, and business statistics materials for Level-2 Term-2.',
                'order' => 4,
            ],
            [
                'title' => 'BBA Level-3 Term-1 Courseware & Lecture Materials',
                'category' => 'Level 3',
                'link' => 'https://drive.google.com/drive/folders/1mFU23DL2bUK1UcgdaYsZxhCFDbl862XT',
                'description' => 'Marketing management, business research methodology, and operations materials for Level-3 Term-1.',
                'order' => 5,
            ],
            [
                'title' => 'BBA Level-3 Term-2 Courseware & Lecture Materials',
                'category' => 'Level 3',
                'link' => 'https://drive.google.com/drive/folders/1K3Y060cAAmdkKCgarwsWlzXFkX8Kyp9V',
                'description' => 'Strategic management, financial markets, and MIS lecture sets for Level-3 Term-2.',
                'order' => 6,
            ],
            [
                'title' => 'BBA Level-4 Term-1 Courseware & Lecture Materials',
                'category' => 'Level 4',
                'link' => 'https://drive.google.com/drive/folders/18jmWEkNMguDm44ZKDd91jjFkAtjqxzYP',
                'description' => 'Senior-level capstone courses, international trade, and business ethics courseware for Level-4 Term-1.',
                'order' => 7,
            ],
            [
                'title' => 'BBA Level-4 Term-2 Major in Accounting Materials',
                'category' => 'Level 4 Majors',
                'link' => 'https://drive.google.com/drive/folders/1xPScLgRsPHS6Q0KYwDmnIMGsUo0F3siL',
                'description' => 'Advanced taxation, auditing, and corporate reporting courseware for Accounting majors.',
                'order' => 8,
            ],
            [
                'title' => 'BBA Level-4 Term-2 Major in Finance Materials',
                'category' => 'Level 4 Majors',
                'link' => 'https://drive.google.com/drive/folders/1BPAOP8Gbhxh-sD5YS1vnGeQsD5fOG8xH',
                'description' => 'Portfolio management, corporate valuation, and investment banking materials for Finance majors.',
                'order' => 9,
            ],
            [
                'title' => 'BBA Level-4 Term-2 Major in Marketing Materials',
                'category' => 'Level 4 Majors',
                'link' => 'https://drive.google.com/drive/folders/1x8dgMgoN-2hqKUV5bRjn2e_IeTDqP7ZB',
                'description' => 'Brand management, digital marketing analytics, and consumer insights for Marketing majors.',
                'order' => 10,
            ],
            [
                'title' => 'BBA Comprehensive Central Course Repository [View All]',
                'category' => 'Master Archive',
                'link' => 'https://drive.google.com/drive/folders/1yB4UqrPueuplNGauBsuIQnYsi18KkE2p',
                'description' => 'Centralized Google Drive archive housing syllabi, past exam questions, and reading resources across all terms.',
                'order' => 11,
            ],
        ];
        foreach ($resources as $res) {
            DepartmentOnlineResource::create(array_merge($res, ['department_id' => $dept->id]));
        }
        $this->line('✓ 11 Department online education resources seeded.');

        // 12. Department OBEs (PEOs & PLOs)
        DepartmentObe::where('department_id', $dept->id)->delete();
        $obes = [
            [
                'type' => 'peo',
                'code' => 'PEO-1',
                'title' => 'Core Business Competence & Leadership',
                'description' => 'Graduates will demonstrate comprehensive knowledge of business disciplines, applying quantitative and qualitative analytical tools to solve complex managerial challenges and lead diverse organizational teams effectively.',
                'order' => 1,
            ],
            [
                'type' => 'peo',
                'code' => 'PEO-2',
                'title' => 'Ethics, Social Responsibility & Sustainability',
                'description' => 'Graduates will practice high ethical standards, corporate social responsibility, and environmentally conscious decision-making in national and global business environments.',
                'order' => 2,
            ],
            [
                'type' => 'peo',
                'code' => 'PEO-3',
                'title' => 'Entrepreneurial Acumen & Business Innovation',
                'description' => 'Graduates will identify market opportunities, design viable business models, and foster innovation within established enterprises or independent entrepreneurial ventures.',
                'order' => 3,
            ],
            [
                'type' => 'peo',
                'code' => 'PEO-4',
                'title' => 'Continuous Professional Development & Global Vision',
                'description' => 'Graduates will pursue lifelong learning, professional certifications (CPA, CFA, CMA, ACCA, HRCI), and advanced graduate studies while adapting to dynamic global economic shifts.',
                'order' => 4,
            ],
            // PLOs
            [
                'type' => 'plo',
                'code' => 'PLO-1',
                'title' => 'Foundational Business Knowledge',
                'description' => 'Apply knowledge of management, marketing, finance, accounting, and economics to analyze business issues.',
                'order' => 5,
            ],
            [
                'type' => 'plo',
                'code' => 'PLO-2',
                'title' => 'Critical Thinking & Problem Solving',
                'description' => 'Formulate, diagnose, and solve complex business problems using evidence-based analytical frameworks.',
                'order' => 6,
            ],
            [
                'type' => 'plo',
                'code' => 'PLO-3',
                'title' => 'Quantitative & Data Analytical Skills',
                'description' => 'Utilize statistical tools, spreadsheet software, and business intelligence suites for informed decision-making.',
                'order' => 7,
            ],
            [
                'type' => 'plo',
                'code' => 'PLO-4',
                'title' => 'Effective Business Communication',
                'description' => 'Communicate persuasively, clearly, and professionally in both written executive reports and oral presentations.',
                'order' => 8,
            ],
            [
                'type' => 'plo',
                'code' => 'PLO-5',
                'title' => 'Ethical Reasoning & Integrity',
                'description' => 'Identify ethical dilemmas in commercial practice and apply ethical principles to corporate decision-making.',
                'order' => 9,
            ],
            [
                'type' => 'plo',
                'code' => 'PLO-6',
                'title' => 'Teamwork & Collaborative Leadership',
                'description' => 'Work effectively in multidisciplinary and cross-cultural teams to achieve common organizational objectives.',
                'order' => 10,
            ],
            [
                'type' => 'plo',
                'code' => 'PLO-7',
                'title' => 'Global Perspective & Cultural Agility',
                'description' => 'Understand the nuances of multinational commerce, global trade policies, and cultural dimensions of management.',
                'order' => 11,
            ],
            [
                'type' => 'plo',
                'code' => 'PLO-8',
                'title' => 'Entrepreneurship & Innovation',
                'description' => 'Demonstrate initiative, market feasibility analysis, and resource mobilization to launch or scale enterprises.',
                'order' => 12,
            ],
        ];
        foreach ($obes as $o) {
            DepartmentObe::create(array_merge($o, ['department_id' => $dept->id]));
        }
        $this->line('✓ 12 Department OBE records (4 PEOs + 8 PLOs) seeded.');

        $this->info('🎉 DBA source data seeding completed successfully!');
        return 0;
    }
}
