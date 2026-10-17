<?php

use App\Models\Department;
use App\Models\DepartmentCurriculum;
use App\Models\DepartmentLaboratory;
use App\Models\DepartmentAchievement;
use App\Models\DepartmentSociety;
use App\Models\DepartmentObe;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        $cse = Department::where('slug', 'cse')->first();
        if (!$cse) {
            return;
        }

        // 1. Seed Curricula
        if ($cse->curricula()->count() === 0) {
            DepartmentCurriculum::create([
                'department_id' => $cse->id,
                'title' => 'B.Sc. in Computer Science and Engineering Syllabus (2019)',
                'year' => '2019',
                'description' => 'The latest curriculum designed to meet modern industry standards, focusing on Artificial Intelligence, Data Science, and Software Engineering.',
                'highlights' => ['Modern AI Integration', 'Updated Software Engineering Lab', 'Comprehensive Data Structures'],
                'file' => '/departments/cse/curriculum/B_Sc_-Engineering-in-CSE-Syllabus_20191.pdf',
                'duration' => '4 Years (8 Semesters)',
                'credits' => '160+ Credits',
                'degree' => 'B.Sc. in CSE',
                'order' => 1,
            ]);

            DepartmentCurriculum::create([
                'department_id' => $cse->id,
                'title' => 'B.Sc. in Computer Science and Engineering Syllabus (2015)',
                'year' => '2015',
                'description' => 'The foundational curriculum that established the core engineering principles and computer science fundamentals for the department.',
                'highlights' => ['Core CS Fundamentals', 'Classic Engineering Principles', 'Robust System Programming'],
                'file' => '/departments/cse/curriculum/B_Sc_-Engineering-in-CSE-Syllabus_2015.pdf.pdf',
                'duration' => '4 Years (8 Semesters)',
                'credits' => '160+ Credits',
                'degree' => 'B.Sc. in CSE',
                'order' => 2,
            ]);
        }

        // 2. Seed Laboratories
        if ($cse->laboratories()->count() === 0) {
            $labs = [
                [
                    'name' => 'Computer Programming and Operating System Lab',
                    'slug' => 'programming-os',
                    'description' => 'This laboratory is designed for the students to perform programming and system-level tasks. It provides a robust environment for learning C/C++, Java, Python, and Operating System concepts such as shell scripting and kernel management.',
                    'equipment' => ['High-performance Workstations', 'Core i7/i9 Processors', 'Linux/Unix & Windows Environments', 'Integrated Development Environments (IDEs)'],
                    'objectives' => ['Mastering core programming languages', 'Learning OS kernels and shell scripting', 'Developing complex algorithms', 'Collaborative coding practices'],
                    'images' => [
                        '/images/departments/cse/laboratory/computer-programming-and-operating-system-lab/2.jpg',
                        '/images/departments/cse/laboratory/computer-programming-and-operating-system-lab/4.jpg',
                    ],
                    'order' => 1,
                ],
                [
                    'name' => 'Database and Data Warehouse Lab',
                    'slug' => 'database',
                    'description' => 'Equipped with industry-standard database management systems, this lab allows students to design, implement, and manage complex databases. It also focuses on data warehousing and big data analytics.',
                    'equipment' => ['Oracle/MySQL/PostgreSQL Servers', 'Data Mining Tools', 'Cloud Database Access', 'Large Display Monitors for Query Analysis'],
                    'objectives' => ['Designing Relational Databases', 'Executing advanced SQL queries', 'Implementing Data Warehousing solutions', 'Understanding NoSQL and Big Data'],
                    'images' => [
                        '/images/departments/cse/laboratory/database-and-data-warehouse-lab/2.jpg',
                    ],
                    'order' => 2,
                ],
                [
                    'name' => 'Digital and Embedded System Lab',
                    'slug' => 'digital-embedded',
                    'description' => 'Focuses on the intersection of hardware and software. Students work with digital logic kits, FPGA boards, and various embedded systems to build real-world applications.',
                    'equipment' => ['Digital Logic Training Kits', 'FPGA Development Boards', 'Oscilloscopes', 'Logic Analyzers', 'Soldering Stations'],
                    'objectives' => ['Designing Digital Logic Circuits', 'Programming Embedded Controllers', 'FPGA Prototyping', 'Hardware-Software Integration'],
                    'images' => [
                        '/images/departments/cse/laboratory/digital-and-embedded-system-lab/2.jpg',
                    ],
                    'order' => 3,
                ],
                [
                    'name' => 'Network and Hardware Lab',
                    'slug' => 'network-hardware',
                    'description' => 'A specialized lab for computer networking and hardware maintenance. Students learn to configure routers, switches, and understand the physical architecture of computer systems.',
                    'equipment' => ['Cisco Routers and Switches', 'Network Cable Testers', 'Server Racks', 'PC Hardware Components for Assembly', 'Wireless Networking Kits'],
                    'objectives' => ['Configuring LAN/WAN networks', 'Network Security Implementation', 'PC Hardware troubleshooting', 'Learning OSI and TCP/IP protocols'],
                    'images' => [
                        '/images/departments/cse/laboratory/network-and-hardware-lab/2.jpg',
                        '/images/departments/cse/laboratory/network-and-hardware-lab/4.jpg',
                    ],
                    'order' => 4,
                ],
                [
                    'name' => 'Microprocessor and Interfacing Lab',
                    'slug' => 'microprocessor',
                    'description' => 'Provides hands-on experience with microprocessor kits (8086/8088) and microcontroller interfacing. Students learn assembly language programming and how to interface sensors and motors.',
                    'equipment' => ['8086/8088 Microprocessor Kits', 'Arduino & Raspberry Pi Boards', 'Sensor Interfacing Kits', 'Stepper Motor Modules', 'Function Generators'],
                    'objectives' => ['Writing Assembly Language Programs', 'Interfacing hardware with microprocessors', 'Building robotic prototypes', 'Understanding Computer Architecture'],
                    'images' => [
                        '/images/departments/cse/laboratory/microprocessor-and-interfacing-lab/2.jpg',
                    ],
                    'order' => 5,
                ],
            ];

            foreach ($labs as $lab) {
                DepartmentLaboratory::create(array_merge($lab, ['department_id' => $cse->id]));
            }
        }

        // 3. Seed Achievements
        if ($cse->achievements()->count() === 0) {
            $achievements = [
                [
                    'title' => 'IEB-BAETE Accredited Program',
                    'type' => 'Accreditation',
                    'icon' => 'ShieldCheck',
                    'color' => 'emerald',
                    'description' => 'BSc. Engineering in CSE of BAUST has been accredited by IEB-BAETE and is recognized as meeting the initial academic requirements for engineering graduates in Bangladesh.',
                    'details' => 'IEB-BAETE became a provisional signatory to the Washington Accord in 2016, ensuring substantial academic equivalence of engineering academic programs accredited by Washington Accord signatories.',
                    'link' => 'https://www.ieagreements.org',
                    'order' => 1,
                ],
                [
                    'title' => 'GPH Ispat Esho Robot Banai – Champion',
                    'type' => 'National Robotics Show',
                    'icon' => 'Cpu',
                    'color' => 'blue',
                    'description' => 'The reality show \'GPH Ispat Presents Esho Robot Banai\' held on Channel i saw young robot mechanics transform ideas into reality.',
                    'details' => null,
                    'team_title' => 'Champion Team',
                    'team_members' => [
                        ['name' => 'Shahidul Islam Bulbul', 'batch' => 'CSE 1st Batch'],
                        ['name' => 'Kazi Atai Kibria', 'batch' => 'CSE 3rd Batch'],
                        ['name' => 'Asif-Ul-Islam', 'batch' => 'CSE 3rd Batch'],
                        ['name' => 'Md. Noman Ahmed', 'batch' => 'CSE 3rd Batch'],
                    ],
                    'link' => null,
                    'order' => 2,
                ],
                [
                    'title' => 'bdapps National Hackathon 2022 – National Champion',
                    'type' => 'National Hackathon',
                    'icon' => 'Code',
                    'color' => 'purple',
                    'description' => 'Organized by bdapps (Robi) in partnership with the ICT Division. Out of 2,000 teams and 5,000 developers, Team Hako from BAUST secured the top position.',
                    'details' => 'The award was presented by the State Minister for ICT Division, Zunaid Ahmed Palak, MP.',
                    'team_title' => 'Team HAKO (Champion)',
                    'team_members' => [
                        ['name' => 'Md Hadiuzzaman', 'batch' => 'CSE 6th Batch'],
                        ['name' => 'Shahriar Konok', 'batch' => 'CSE 6th Batch'],
                        ['name' => 'Abdur Raj Shafi', 'batch' => 'CSE 6th Batch'],
                    ],
                    'link' => 'https://www.robi.com.bd/en/corporate/news-room/press-release/national-hackathon-organized-by-bdapps-recognizes-countrys-top-apps-developers',
                    'order' => 3,
                ],
                [
                    'title' => 'Innovative Idea Contest 2022 – Champion',
                    'type' => 'A2i Innovation Catalyst',
                    'icon' => 'Lightbulb',
                    'color' => 'amber',
                    'description' => 'Organized by a2i (Digital Bangladesh program), this contest incubates whole-of-government digital innovation catalysts.',
                    'details' => null,
                    'team_title' => 'Champion Team',
                    'team_members' => [
                        ['name' => 'Maria Mehedy', 'batch' => 'CSE 8th Batch'],
                        ['name' => 'Harisa Muntahina', 'batch' => 'CSE 13th Batch'],
                        ['name' => 'Prapti Nandini', 'batch' => 'CSE 13th Batch'],
                    ],
                    'link' => null,
                    'order' => 4,
                ],
                [
                    'title' => 'Digital Innovation Challenge for Women (DICFW) 2023',
                    'type' => 'Women in Tech',
                    'icon' => 'Star',
                    'color' => 'pink',
                    'description' => 'The 4th edition of technology-based competition held for women to inspire and encourage innovation in tech, organized by Women in Digital.',
                    'details' => 'Team Sunshine from CSE, BAUST emerged as the champion among 8 finalist teams.',
                    'team_title' => 'Team Sunshine (Champion)',
                    'team_members' => [
                        ['name' => 'Maria Mehedy', 'batch' => 'CSE 8th Batch'],
                    ],
                    'link' => null,
                    'order' => 5,
                ],
            ];

            foreach ($achievements as $ach) {
                DepartmentAchievement::create(array_merge($ach, ['department_id' => $cse->id]));
            }
        }

        // 4. Seed Societies (CSE Society & Alumni)
        if ($cse->societies()->count() === 0) {
            DepartmentSociety::create([
                'department_id' => $cse->id,
                'name' => 'CSE Society of BAUST',
                'slug' => 'cse-society',
                'type' => 'society',
                'description' => 'The CSE Society of BAUST is the premier student organization dedicated to fostering a culture of innovation and collaboration within the department. We provide students with opportunities to showcase their skills, engage in professional development, and contribute to the community.',
                'member_count' => '500+ Members',
                'established' => 'Est. 2015',
                'committee_pdf' => '/departments/cse/cse-society/BAUST-CSE-Society-Committee-Members-2023.2-1.pdf',
                'activities' => [
                    ['title' => 'Seminars & Workshops', 'icon' => 'Users', 'description' => 'Technical sessions and tutorials with industry experts.'],
                    ['title' => 'Study Tours', 'icon' => 'BookOpen', 'description' => 'Educational visits to prominent technology organizations.'],
                    ['title' => 'Software & Electronics Fair', 'icon' => 'Zap', 'description' => 'Annual exhibitions of student-led innovations and projects.'],
                    ['title' => 'Math & Informatics Olympiads', 'icon' => 'Award', 'description' => 'Intense competitions to test logical and analytical prowess.'],
                    ['title' => 'Job Fair & Career Counseling', 'icon' => 'Briefcase', 'description' => 'Bridging the gap between graduation and professional life.'],
                    ['title' => 'Gaming & Programming Contests', 'icon' => 'Zap', 'description' => 'Competitions to foster both recreational and technical skills.'],
                    ['title' => 'Social Responsibility', 'icon' => 'Heart', 'description' => 'Initiatives like blood donation and community service.'],
                ],
                'committee' => [
                    [
                        'role' => 'Treasurer',
                        'name' => 'Fatima Jahan Sarmin',
                        'designation' => 'Lecturer, Dept. of CSE',
                        'image' => '/storage/members/dr-md-nakib-hayat-chowdhury.jpg',
                    ],
                    [
                        'role' => 'Vice President (VP)',
                        'name' => 'Nahid Sidique',
                        'designation' => 'Student, 1st batch',
                        'image' => null,
                    ],
                ],
                'order' => 1,
            ]);

            DepartmentSociety::create([
                'department_id' => $cse->id,
                'name' => 'CSE Alumni Association',
                'slug' => 'cse-alumni',
                'type' => 'alumni',
                'description' => 'The CSE Alumni Association and the CSE Society of BAUST work together to bridge the gap between academic excellence and professional success. Our activities are designed to nurture talent, encourage social responsibility, and build a lifelong network of engineering professionals.',
                'member_count' => '300+ Alumni',
                'established' => 'Est. 2019',
                'committee_pdf' => null,
                'activities' => [
                    ['title' => 'Seminars & Workshops', 'icon' => 'Users', 'description' => 'Regular academic and technical sessions with industry experts.'],
                    ['title' => 'Study Tours', 'icon' => 'GraduationCap', 'description' => 'Educational trips to leading tech hubs and research centers.'],
                    ['title' => 'Software Fair', 'icon' => 'Zap', 'description' => 'Showcasing innovative software projects developed by students.'],
                    ['title' => 'Electronics Fair', 'icon' => 'Zap', 'description' => 'Displaying hardware and embedded systems innovations.'],
                    ['title' => 'Math Olympiad', 'icon' => 'Award', 'description' => 'Competitive math challenges to sharpen analytical skills.'],
                    ['title' => 'Informatics Olympiad', 'icon' => 'BookOpen', 'description' => 'Programming and logic-based competitions.'],
                    ['title' => 'Job Fair', 'icon' => 'Briefcase', 'description' => 'Connecting final year students with top-tier employers.'],
                    ['title' => 'Career Counseling', 'icon' => 'Star', 'description' => 'Guidance on professional paths and industry requirements.'],
                    ['title' => 'Gaming Competition', 'icon' => 'Zap', 'description' => 'E-sports events for recreational engagement.'],
                    ['title' => 'Programming Contest', 'icon' => 'Zap', 'description' => 'Intense coding challenges to foster problem-solving.'],
                    ['title' => 'Quiz Competition', 'icon' => 'BookOpen', 'description' => 'Broadening general knowledge and academic awareness.'],
                    ['title' => 'Cultural Program', 'icon' => 'Coffee', 'description' => 'Annual events celebrating arts and university culture.'],
                    ['title' => 'Blood Donation', 'icon' => 'Heart', 'description' => 'Social responsibility initiatives for the community.'],
                ],
                'committee' => [
                    [
                        'role' => 'Treasurer',
                        'name' => 'Fatima Jahan Sarmin',
                        'designation' => 'Lecturer, Dept. of CSE',
                        'image' => '/storage/members/dr-md-nakib-hayat-chowdhury.jpg',
                    ],
                    [
                        'role' => 'Vice President (VP)',
                        'name' => 'Nahid Sidique',
                        'designation' => 'Student, 1st batch',
                        'image' => null,
                    ],
                ],
                'order' => 2,
            ]);
        }

        // 5. Seed OBE Objectives (PEOs & PLOs)
        if ($cse->obes()->count() === 0) {
            $peos = [
                ['code' => 'PEO-1', 'title' => 'Professional Progression', 'description' => 'Graduates will progress in their chosen profession and achieve career advancement in their respective field.', 'order' => 1],
                ['code' => 'PEO-2', 'title' => 'Ethics & Leadership', 'description' => 'Graduates will demonstrate ethical behavior, teamwork, and leadership in professional environments.', 'order' => 2],
                ['code' => 'PEO-3', 'title' => 'Technological Competence', 'description' => 'Graduates will identify, develop, and apply relevant and evolving technologies to contribute effectively in professional and entrepreneurial roles.', 'order' => 3],
                ['code' => 'PEO-4', 'title' => 'Societal Development', 'description' => 'Graduates will apply their knowledge and skills aligned with relevant Sustainable Development Goals for societal development.', 'order' => 4],
            ];
            foreach ($peos as $p) {
                DepartmentObe::create(array_merge($p, ['department_id' => $cse->id, 'type' => 'peo']));
            }

            $plos = [
                ['code' => 'PLO1', 'title' => 'Engineering knowledge', 'description' => 'Apply the knowledge of mathematics, science, engineering fundamentals and an engineering specialization to the solution of complex engineering problems.', 'order' => 1],
                ['code' => 'PLO2', 'title' => 'Problem analysis', 'description' => 'Identify, formulate, research the literature and analyze complex engineering problems and reach substantiated conclusions using first principles of mathematics, the natural sciences and the engineering sciences.', 'order' => 2],
                ['code' => 'PLO3', 'title' => 'Design/development of solutions', 'description' => 'Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety as well as cultural, societal and environmental concerns.', 'order' => 3],
                ['code' => 'PLO4', 'title' => 'Investigation', 'description' => 'Conduct investigations of complex problems, considering design of experiments, analysis and interpretation of data and synthesis of information to provide valid conclusions.', 'order' => 4],
                ['code' => 'PLO5', 'title' => 'Modern tool usage', 'description' => 'Create, select and apply appropriate techniques, resources and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.', 'order' => 5],
                ['code' => 'PLO6', 'title' => 'The engineer and society', 'description' => 'Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.', 'order' => 6],
                ['code' => 'PLO7', 'title' => 'Environment and sustainability', 'description' => 'Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.', 'order' => 7],
                ['code' => 'PLO8', 'title' => 'Ethics', 'description' => 'Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.', 'order' => 8],
                ['code' => 'PLO9', 'title' => 'Individual and team work', 'description' => 'Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.', 'order' => 9],
                ['code' => 'PLO10', 'title' => 'Communication', 'description' => 'Communicate effectively on complex engineering activities with the engineering community and with society at large, such as being able to comprehend and write effective reports.', 'order' => 10],
                ['code' => 'PLO11', 'title' => 'Project management and finance', 'description' => 'Demonstrate knowledge and understanding of the engineering and management principles and apply these to one\'s own work, as a member and leader in a team, to manage projects.', 'order' => 11],
                ['code' => 'PLO12', 'title' => 'Life-long learning', 'description' => 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.', 'order' => 12],
            ];
            foreach ($plos as $pl) {
                DepartmentObe::create(array_merge($pl, ['department_id' => $cse->id, 'type' => 'plo']));
            }
        }
    }

    public function down(): void
    {
        // Safe no-op
    }
};
