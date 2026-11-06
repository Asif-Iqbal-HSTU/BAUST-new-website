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
        $dept = Department::where('slug', 'ict')->first();
        if (!$dept) {
            $dept = Department::create([
                'slug' => 'ict',
                'name' => 'Department of Information and Communication Technology',
                'short_name' => 'ICT',
                'faculty' => 'FECE',
                'order' => 2,
            ]);
        }

        // 1. Department Profile
        $dept->update([
            'name' => 'Department of Information and Communication Technology',
            'short_name' => 'ICT',
            'faculty' => 'FECE',
            'tagline' => 'Department of Information and Communication Technology',
            'established' => '2015',
            'accreditation_badge' => 'OBE Curriculum',
            'accreditation_title' => 'Outcome-Based Education Program',
            'accreditation_text' => 'The B.Sc. Engineering in ICT program follows the Outcome Based Education (OBE) curriculum aligned with BAETE standards.',
            'about' => "Information and Communication Technology (ICT) plays a vital and indispensable role in all fields of modern human activities. Consequently, ICT has established itself as one of the most important branches of engineering. The recent developments in communication networks and information systems have a considerable impact on society, expanding to all fields of study from industrial automation to cloud database engineering.\n\nThe Department of Information and Communication Technology is one of the pioneer departments of this institute, providing top-quality education at its undergraduate program. ICT is the leading booming sector in the present day. Keeping this in mind, the department offers a B.Sc. in ICT course designed to produce technology specialists who are equipped with the skills to address real-world problems.\n\nA combination of highly qualified faculty members and state-of-the-art facilities has established the ICT department as one of the leading and prestigious departments of the university.",
            'vision' => "To be a center of excellence recognized nationally and internationally for quality education, research, and innovation in Information and Communication Technology.",
            'mission' => "DM1: To educate students to meet with the new challenges in the progress of information processing, telecommunications, network architectures, and modern software technologies to provide innovative, creative solutions for societal needs.\n\nDM2: To create and disseminate innovative knowledge through basic and applied research in Information and Communication Technology.\n\nDM3: To contribute to the development of skilled, ethical engineering human resources to impact society in a sustainable way.",
            'hod_name' => 'Engr. Md. Mamun Hossain',
            'hod_designation' => 'Associate Professor & Head',
            'hod_photo' => '/images/ict/members/md_mamun_hossain.jpeg',
            'hod_message' => "Welcome to the Department of Information and Communication Technology (ICT) at BAUST.\n\nThe department is committed to establishing a quality academic culture to ensure the attainment of intended skills, knowledge, and attitudes in the field of Information Technology (IT), as well as in information processing, information systems, robotics, and the diverse technologies upon which modern IT society is based. Through this approach, ICT Engineering graduates will be able to adapt to the current and future needs of the ICT-oriented industry.\n\nOur B.Sc. in ICT program provides students with core computer science competencies alongside dedicated instruction in modern communication systems, embedded networking, signal processing, and software engineering. We offer state-of-the-art laboratory facilities and a highly competent, research-focused faculty.\n\nOur alumni are successfully positioned across various IT and telecommunication sectors, bank networks, BCS cadres, and public service domains. We invite you to explore our department and join us in our mission to produce tomorrow's technology leaders.",
            'is_active' => true,
        ]);

        $deptId = $dept->id;

        // 2. Department Slides
        DepartmentSlide::where('department_id', $deptId)->delete();
        $slides = [
            ['image' => '/images/departments/ict/slider/slide1.jpg', 'title' => 'Admission Open in ICT', 'order' => 1],
            ['image' => '/images/departments/ict/slider/slide2.jpg', 'title' => '13th Disciplinary Committee meeting', 'order' => 2],
            ['image' => '/images/departments/ict/slider/slide3.jpeg', 'title' => 'A campus moment with some ICT students and faculty', 'order' => 3],
            ['image' => '/images/departments/ict/slider/slide4.jpeg', 'title' => 'A casual adda with teachers and students at the BAUST café premises', 'order' => 4],
            ['image' => '/images/departments/ict/slider/slide5.jpeg', 'title' => 'Independence Day & National Day Celebration – 26th March 2025', 'order' => 5],
            ['image' => '/images/departments/ict/slider/slide6.jpeg', 'title' => 'Mohasthangarh, ICT Excursion, 2025 – Tech in Nature', 'order' => 6],
            ['image' => '/images/departments/ict/slider/slide7.jpeg', 'title' => 'Mohasthangarh, ICT Excursion, 2025 – Tech in Nature', 'order' => 7],
            ['image' => '/images/departments/ict/slider/slide8.jpeg', 'title' => 'Momo INN, ICT Excursion 2025 – Tech in Nature', 'order' => 8],
        ];
        foreach ($slides as $s) {
            DepartmentSlide::create(array_merge($s, ['department_id' => $deptId]));
        }

        // 3. Department Stats
        DepartmentStat::where('department_id', $deptId)->delete();
        $stats = [
            ['value' => '16+', 'label' => 'Faculty & Staff', 'order' => 1],
            ['value' => '2015', 'label' => 'Established', 'order' => 2],
            ['value' => 'B.Sc. ICT', 'label' => 'Program', 'order' => 3],
            ['value' => '250+', 'label' => 'Students', 'order' => 4],
        ];
        foreach ($stats as $st) {
            DepartmentStat::create(array_merge($st, ['department_id' => $deptId]));
        }

        // 4. Department Highlights
        DepartmentHighlight::where('department_id', $deptId)->delete();
        $highlights = [
            ['icon' => 'Cpu', 'title' => 'Advanced Labs', 'text' => 'Well-equipped laboratories for programming, database management, digital logic, and communication systems.', 'order' => 1],
            ['icon' => 'Users', 'title' => 'Experienced Faculty', 'text' => 'Guidance from highly qualified faculty members specializing in networking, communications, and software engineering.', 'order' => 2],
            ['icon' => 'Briefcase', 'title' => 'Diverse Careers', 'text' => 'Prepares graduates for banking IT, telecom carriers, BCS, government ministries, and global software companies.', 'order' => 3],
            ['icon' => 'BookOpen', 'title' => 'Modern Syllabus', 'text' => 'Outcome-based curriculum covering cybersecurity, internet of things, AI, web, and mobile app development.', 'order' => 4],
        ];
        foreach ($highlights as $h) {
            DepartmentHighlight::create(array_merge($h, ['department_id' => $deptId]));
        }

        // 5. Department OBE (PEOs and PLOs)
        DepartmentObe::where('department_id', $deptId)->delete();
        $peos = [
            ['code' => 'PEO-1', 'title' => 'Professional Progression', 'description' => 'Graduates will progress in their chosen profession and achieve career advancement in Information and Communication Technology sectors.', 'order' => 1],
            ['code' => 'PEO-2', 'title' => 'Ethics & Leadership', 'description' => 'Graduates will demonstrate ethical behavior, teamwork, and leadership in telecommunications and software engineering environments.', 'order' => 2],
            ['code' => 'PEO-3', 'title' => 'Technological Competence', 'description' => 'Graduates will identify, develop, and apply relevant and evolving technologies to contribute effectively in professional and entrepreneurial roles.', 'order' => 3],
            ['code' => 'PEO-4', 'title' => 'Societal Development', 'description' => 'Graduates will apply their knowledge and skills aligned with relevant Sustainable Development Goals for societal development.', 'order' => 4],
        ];
        foreach ($peos as $p) {
            DepartmentObe::create(array_merge($p, ['department_id' => $deptId, 'type' => 'peo', 'is_active' => true]));
        }

        $plos = [
            ['code' => 'PLO1', 'title' => 'Engineering knowledge', 'description' => 'Apply the knowledge of mathematics, science, engineering fundamentals and an engineering specialization to the solution of complex ICT engineering problems.', 'order' => 1],
            ['code' => 'PLO2', 'title' => 'Problem analysis', 'description' => 'Identify, formulate, research the literature and analyze complex communication and computing problems to reach substantiated conclusions.', 'order' => 2],
            ['code' => 'PLO3', 'title' => 'Design/development of solutions', 'description' => 'Design solutions for complex ICT problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety.', 'order' => 3],
            ['code' => 'PLO4', 'title' => 'Investigation', 'description' => 'Conduct investigations of complex problems, considering design of experiments, analysis and interpretation of data and synthesis of information to provide valid conclusions.', 'order' => 4],
            ['code' => 'PLO5', 'title' => 'Modern tool usage', 'description' => 'Create, select and apply appropriate techniques, resources and modern engineering and IT tools including prediction and modeling to complex engineering activities.', 'order' => 5],
            ['code' => 'PLO6', 'title' => 'The engineer and society', 'description' => 'Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal and cultural issues and consequent responsibilities.', 'order' => 6],
            ['code' => 'PLO7', 'title' => 'Environment and sustainability', 'description' => 'Understand the impact of professional engineering solutions in societal and environmental contexts, and demonstrate knowledge of sustainable development.', 'order' => 7],
            ['code' => 'PLO8', 'title' => 'Ethics', 'description' => 'Apply ethical principles and commit to professional ethics and responsibilities and norms of engineering practice.', 'order' => 8],
            ['code' => 'PLO9', 'title' => 'Individual and team work', 'description' => 'Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.', 'order' => 9],
            ['code' => 'PLO10', 'title' => 'Communication', 'description' => 'Communicate effectively on complex engineering activities with the engineering community and with society at large.', 'order' => 10],
            ['code' => 'PLO11', 'title' => 'Project management and finance', 'description' => 'Demonstrate knowledge and understanding of engineering and management principles and apply these to manage projects.', 'order' => 11],
            ['code' => 'PLO12', 'title' => 'Life-long learning', 'description' => 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.', 'order' => 12],
        ];
        foreach ($plos as $pl) {
            DepartmentObe::create(array_merge($pl, ['department_id' => $deptId, 'type' => 'plo', 'is_active' => true]));
        }

        // 6. Department Curriculum
        DepartmentCurriculum::where('department_id', $deptId)->delete();
        DepartmentCurriculum::create([
            'department_id' => $deptId,
            'title' => 'B.Sc. in Information and Communication Technology Syllabus (Revised)',
            'year' => 'Revised',
            'file' => '/storage/departments/ict-syllabus-revised.pdf',
            'description' => 'The revised outcome-based curriculum designed to meet modern industry standards, focusing on information security, wireless networks, software engineering, and Internet of Things.',
            'highlights' => ['Outcome-Based Education (OBE) structure', 'Advanced Wireless & Cellular Communications', 'Cybersecurity & Cryptography Modules'],
            'duration' => '4 Years (8 Semesters)',
            'credits' => '161.5 Credits',
            'degree' => 'B.Sc. in ICT',
            'order' => 1,
            'is_active' => true,
        ]);

        // 7. Department Laboratories (14 Labs)
        DepartmentLaboratory::where('department_id', $deptId)->delete();
        $labs = [
            [
                'name' => 'Computer Programming & Software Engineering Lab',
                'slug' => 'computer-programming-software-engineering-lab',
                'description' => 'This laboratory is designed for students to master fundamental coding, programming methodologies, software design architectures, and database configurations. It hosts powerful workstations running Linux and Windows, equipped with top-tier development suites.',
                'equipment' => ['Intel Core i7/i9 Workstations', 'IDE environments (VS Code, Eclipse, IntelliJ)', 'Version Control (Git/GitHub)', 'Dual-OS Boot Environments'],
                'objectives' => ['Develop strong problem-solving and algorithmic logic', 'Master C/C++, Java, and Python frameworks', 'Implement software design patterns and SDLC methodologies'],
                'order' => 1,
            ],
            [
                'name' => 'Signal Processing & Telecommunication Lab',
                'slug' => 'signal-processing-telecommunication-lab',
                'description' => 'A highly specialized laboratory focusing on digital signal processing, signal modulations, antenna systems, and telecommunication hardware interfacing. Students gain practical insights into the physical transmission layer of ICT systems.',
                'equipment' => ['Digital Storage Oscilloscopes', 'RF Signal Generators', 'DSP Development Boards', 'Fiber Optic Training Kits', 'Spectrum Analyzers'],
                'objectives' => ['Analyze signal behavior in time and frequency domains', 'Perform analog and digital modulation experiments', 'Understand optical fiber communications and signal propagation'],
                'order' => 2,
            ],
            [
                'name' => 'Cybersecurity & Computer Networks Lab',
                'slug' => 'cybersecurity-computer-networks-lab',
                'description' => 'Focuses on network administration, security enforcement, and threat detection. Students work on configuring physical routing systems, analyzing packets, and testing penetration methods in secure sandbox environments.',
                'equipment' => ['Cisco Managed Routers & Switch Racks', 'Next-Gen Hardware Firewalls', 'Virtualization Servers (Proxmox/ESXi)', 'Network Analyzers (Wireshark, Nmap, Snort)'],
                'objectives' => ['Configure complex local and wide-area networks', 'Design secure firewalls and access control lists', 'Understand vulnerability assessment and cryptographic principles'],
                'order' => 3,
            ],
            [
                'name' => 'VLSI & Embedded System Lab',
                'slug' => 'vlsi-embedded-system-lab',
                'description' => 'Provides hands-on experience in VLSI chip design, digital logic verification, and embedded computing systems. Students interface microcontrollers with physical systems to build automated automation solutions.',
                'equipment' => ['FPGA Development Kits', 'Arduino & Raspberry Pi Kits', 'Logic Analyzers', 'Microcontroller Interfacing Boards', 'PCB Prototyping Systems'],
                'objectives' => ['Write Hardware Description Languages (VHDL/Verilog)', 'Program microcontrollers for sensor interfacing and motor control', 'Design and test integrated circuit blocks'],
                'order' => 4,
            ],
            [
                'name' => 'Database and Data Warehouse Lab',
                'slug' => 'database-data-warehouse-lab',
                'description' => 'Equipped with industry-standard relational and NoSQL database management tools, enabling students to construct scalable databases and data warehouse architectures.',
                'equipment' => ['Database Servers (Oracle, MySQL, PostgreSQL)', 'Data Mining and ETL Toolkits', 'Cloud Data Storage Simulators'],
                'objectives' => ['Design normalized relational schemas', 'Execute complex SQL/NoSQL queries', 'Implement data warehousing and business intelligence models'],
                'order' => 5,
            ],
            [
                'name' => 'Object Oriented Programming Lab',
                'slug' => 'object-oriented-programming-lab',
                'description' => 'Dedicated facility for mastering OOP concepts using Java, C++, and Python, focusing on modularity, inheritance, polymorphism, and design patterns.',
                'equipment' => ['Modern Development Workstations', 'Java SE/EE SDKs', 'UML Modeling Suites'],
                'objectives' => ['Understand object-oriented paradigm and design patterns', 'Build desktop and backend client-server applications', 'Implement robust exception handling and testing'],
                'order' => 6,
            ],
            [
                'name' => 'Artificial Intelligence and Machine Learning Lab',
                'slug' => 'ai-machine-learning-lab',
                'description' => 'High-performance computing facility for training deep neural networks, computer vision algorithms, and natural language processing pipelines.',
                'equipment' => ['GPU-accelerated Workstations', 'Jupyter/Anaconda Environments', 'PyTorch and TensorFlow Frameworks'],
                'objectives' => ['Train predictive machine learning models', 'Implement computer vision and OCR pipelines', 'Explore generative AI and transformer architectures'],
                'order' => 7,
            ],
            [
                'name' => 'Web and Mobile Application Development Lab',
                'slug' => 'web-mobile-app-dev-lab',
                'description' => 'Full-stack development laboratory focused on responsive web systems, mobile applications (Android/iOS), and RESTful API integrations.',
                'equipment' => ['Android Virtual Device (AVD) Workstations', 'Node.js, React, and Flutter Environments', 'Testing Tablets and Mobile Hardware'],
                'objectives' => ['Build progressive web applications', 'Develop native and hybrid mobile apps', 'Integrate cloud backends and authentication services'],
                'order' => 8,
            ],
            [
                'name' => 'Data Communication Lab',
                'slug' => 'data-communication-lab',
                'description' => 'Laboratory dedicated to fundamental communication engineering, examining pulse code modulation, multiplexing, and transmission mediums.',
                'equipment' => ['Modulation/Demodulation Kits', 'Function Generators', 'Transmission Line Simulators'],
                'objectives' => ['Measure bandwidth and transmission loss', 'Implement error detection and correction codes', 'Analyze multiplexing protocols (TDM/FDM)'],
                'order' => 9,
            ],
            [
                'name' => 'Digital Logic Design Lab',
                'slug' => 'digital-logic-design-lab',
                'description' => 'Laboratory providing comprehensive training in combinational and sequential digital logic circuits.',
                'equipment' => ['Digital IC Trainer Kits', 'Logic Probe Pens', 'Breadboards and TTL/CMOS ICs'],
                'objectives' => ['Construct logic gates, multiplexers, and decoders', 'Design flip-flops, counters, and registers', 'Verify truth tables and Boolean expressions'],
                'order' => 10,
            ],
            [
                'name' => 'Microprocessor and Interfacing Lab',
                'slug' => 'microprocessor-interfacing-lab',
                'description' => 'Hands-on hardware lab for 8086/8088 microprocessor architecture and peripheral interfacing chips.',
                'equipment' => ['8086 Microprocessor Kits', '8255 PPI and 8254 Timer Modules', 'Stepper Motor and ADC/DAC Interfacing Cards'],
                'objectives' => ['Write assembly language programs', 'Interface external peripherals via PPI chips', 'Control physical motors and read sensor data'],
                'order' => 11,
            ],
            [
                'name' => 'Wireless and Cellular Communication Lab',
                'slug' => 'wireless-cellular-communication-lab',
                'description' => 'State-of-the-art facility exploring cellular network topologies, GSM/LTE/5G principles, and antenna radiation patterns.',
                'equipment' => ['Cellular System Trainers', 'SDR (Software Defined Radio) Kits', 'Antenna Measurement Systems'],
                'objectives' => ['Study cellular channel capacity and fading', 'Examine CDMA, OFDM, and MIMO technologies', 'Conduct wireless network performance benchmarking'],
                'order' => 12,
            ],
            [
                'name' => 'Cloud and Distributed Computing Lab',
                'slug' => 'cloud-distributed-computing-lab',
                'description' => 'Lab focused on virtualization, container orchestration, microservices architectures, and distributed computing models.',
                'equipment' => ['Server Virtualization Clusters', 'Docker and Kubernetes Environments', 'Distributed File Systems'],
                'objectives' => ['Deploy containerized microservices', 'Configure distributed load balancers', 'Implement cloud storage and serverless computing'],
                'order' => 13,
            ],
            [
                'name' => 'Multimedia and Image Processing Lab',
                'slug' => 'multimedia-image-processing-lab',
                'description' => 'Lab equipped for digital audio/video processing, compression algorithms, computer graphics, and computer-aided design.',
                'equipment' => ['High-resolution Color Calibrated Monitors', 'MATLAB and OpenCV Toolkits', 'Audio/Video Encoding Hardware'],
                'objectives' => ['Apply spatial and frequency domain image filtering', 'Implement image segmentation and feature extraction', 'Understand video compression standards (H.264/HEVC)'],
                'order' => 14,
            ],
        ];
        foreach ($labs as $lab) {
            DepartmentLaboratory::create(array_merge($lab, ['department_id' => $deptId, 'is_active' => true]));
        }

        // 8. Department Achievements
        DepartmentAchievement::where('department_id', $deptId)->delete();
        $achievements = [
            [
                'title' => 'National ICT Hackathon - Top 10 Finalist',
                'type' => 'National Hackathon',
                'icon' => 'Code',
                'color' => 'purple',
                'description' => 'Student developer teams from the ICT Department represented BAUST in the National ICT Division Hackathon, competing against top universities in developing smart solutions for national challenges.',
                'team_title' => 'Team TechSaviours',
                'team_members' => [
                    ['name' => 'Sabbir Rahman', 'batch' => 'ICT 2nd Batch'],
                    ['name' => 'Mst. Jannatul Fardous', 'batch' => 'ICT 2nd Batch'],
                ],
                'order' => 1,
            ],
            [
                'title' => 'Inter-University Programming Contest (IUPC) Honors',
                'type' => 'Competitive Programming',
                'icon' => 'Trophy',
                'color' => 'emerald',
                'description' => 'ICT teams consistently secure notable ranks in national-level programming contests, showcasing computational logic and algorithmic skills.',
                'team_title' => 'BAUST ICT Coders',
                'team_members' => [
                    ['name' => 'Tanvir Ahmed', 'batch' => 'ICT 4th Batch'],
                ],
                'order' => 2,
            ],
            [
                'title' => 'IoT & Robotics Showcases',
                'type' => 'Project Exhibition',
                'icon' => 'Cpu',
                'color' => 'blue',
                'description' => 'Innovative IoT projects like Smart Agriculture Systems and Automated Fire Rescue Robots designed by ICT students were highly praised in regional technology exhibitions.',
                'team_title' => 'IoT Dev Group',
                'team_members' => [
                    ['name' => 'Al Amin', 'batch' => 'ICT 3rd Batch'],
                    ['name' => 'Farhana Yasmin', 'batch' => 'ICT 3rd Batch'],
                ],
                'order' => 3,
            ],
        ];
        foreach ($achievements as $ach) {
            DepartmentAchievement::create(array_merge($ach, ['department_id' => $deptId, 'is_active' => true]));
        }

        // 9. Department Societies (ICT Society and Alumni)
        DepartmentSociety::where('department_id', $deptId)->delete();
        DepartmentSociety::create([
            'department_id' => $deptId,
            'name' => 'ICT Society of BAUST',
            'slug' => 'ict-society',
            'type' => 'society',
            'description' => 'The ICT Society of BAUST is the premier student-led organization of the department. We aim to inspire leadership and engineering qualities among students through specialized co-curricular and extracurricular programs.',
            'member_count' => '200+ Members',
            'established' => 'Est. 2016',
            'activities' => [
                ['title' => 'Seminars & Workshops', 'icon' => 'Users', 'description' => 'Technical sessions, software webinars, and telecom tutorials with industry leaders.'],
                ['title' => 'Study Tours', 'icon' => 'BookOpen', 'description' => 'Educational visits to prominent telecom operators, data centers, and software parks.'],
                ['title' => 'ICT Project Showcases', 'icon' => 'Zap', 'description' => 'Annual exhibitions of student-led software and IoT engineering projects.'],
                ['title' => 'Intra-Dept Programming Contests', 'icon' => 'Award', 'description' => 'Intense coding and logic challenges to test speed and accuracy.'],
                ['title' => 'Career Seminars', 'icon' => 'Briefcase', 'description' => 'Bridging the gap between graduation and job applications.'],
                ['title' => 'Social and Welfare Projects', 'icon' => 'Heart', 'description' => 'Blood donation initiatives and community tech education camps.'],
            ],
            'committee' => [
                ['role' => 'Advisor', 'name' => 'Md. Abdun Noor Polok', 'designation' => 'Lecturer & Program Coordinator, Dept. of ICT', 'image' => '/images/ict/members/md_abdun_noor_polok.jpg'],
                ['role' => 'Student Coordinator', 'name' => 'Anas Ahmed', 'designation' => 'Student, Dept. of ICT', 'image' => null],
            ],
            'order' => 1,
            'is_active' => true,
        ]);

        DepartmentSociety::create([
            'department_id' => $deptId,
            'name' => 'ICT Alumni Association',
            'slug' => 'alumni',
            'type' => 'alumni',
            'description' => 'The ICT Alumni Association of BAUST unites all graduates of our department. Our members are currently working in leading telecommunication firms, software companies, financial institutions, and government roles both in Bangladesh and across the globe. We provide mentorship, networking events, and career progression guides to current students and recent graduates.',
            'member_count' => '300+ Alumni',
            'established' => 'Est. 2019',
            'activities' => [
                ['title' => 'Global Careers', 'icon' => 'Briefcase', 'description' => 'Positioned in leading tech industries, MNCs, telecom carriers, and central banking IT sectors.'],
                ['title' => 'Higher Education Mentorship', 'icon' => 'GraduationCap', 'description' => 'Guiding graduates pursuing M.Sc., Ph.D., and advanced research fellowships worldwide.'],
                ['title' => 'Alumni Reunions & Networking', 'icon' => 'Users', 'description' => 'Annual get-togethers and interactive webinars connecting alumni with current students.'],
            ],
            'committee' => [
                ['role' => 'President', 'name' => 'ICT Alumni Lead', 'designation' => 'Senior Software Engineer', 'image' => null],
                ['role' => 'General Secretary', 'name' => 'ICT Alumni Representative', 'designation' => 'Network Operations Specialist', 'image' => null],
            ],
            'order' => 2,
            'is_active' => true,
        ]);

        // 10. Department Members (All 17 Members - localized photos and rich tabs)
        $membersData = [
            // Head of Department
            [
                'name' => 'Engr. Md. Mamun Hossain',
                'designation' => 'Associate Professor and Head',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'associate_professor',
                'photo' => '/images/ict/members/md_mamun_hossain.jpeg',
                'phone' => '01769675577',
                'email' => 'headict@baust.edu.bd',
                'personal_email' => 'mhossain@baust.edu.bd',
                'education' => ['Ph.D. Researcher, CSE, RUET', 'M.Sc. (Thesis) in CSE, SUST', 'B.Sc. (Engg.) in CSE, SUST'],
                'specialization' => 'Machine Learning, Computer Networks, Software Engineering',
                'biography' => "<p>Engr. Md. Mamun Hossain is currently serving as the Associate Professor and Head of the Department of Information and Communication Technology at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p><p>He has extensive academic experience in computer science, software engineering, and communications, actively mentoring students in advanced programming and applied research.</p>",
                'order' => 1,
            ],
            // Associate Professor
            [
                'name' => 'Dr. Engr. Mohammed Sowket Ali',
                'designation' => 'Associate Professor',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'associate_professor',
                'photo' => '/images/ict/members/mohammed_sowket_ali.jpg',
                'phone' => '+8801769662712',
                'email' => 'sowket@baust.edu.bd',
                'personal_email' => 'sowket.ali@gmail.com',
                'education' => ['Ph.D. and M.Engg. (South Korea)', 'B.Sc. Engg., FIEB, FBCS', 'Senior Member- IACSIT, Member - IAENG'],
                'specialization' => 'Control Theory and Application, Machine Learning, Explainable AI',
                'biography' => "<p>Dr. Engr. Mohammed Sowket Ali obtained his Ph.D. and M.Engg. degrees from South Korea. He is a Fellow of IEB (FIEB) and British Computer Society (FBCS), and Senior Member of IACSIT.</p><p>His research expertise spans intelligent systems, machine learning, and explainable artificial intelligence (XAI).</p>",
                'order' => 2,
            ],
            // Lecturers (Permanent)
            [
                'name' => 'Tasmim',
                'designation' => 'Lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'photo' => '/images/ict/members/tasmim.jpeg',
                'phone' => '01703830359',
                'email' => 'tasmim@baust.edu.bd',
                'education' => ['M.Sc. Engg. in CSE, RUET (On-going)', 'B.Sc. Engg. in ECE (RUET)'],
                'specialization' => 'AI, Deep Learning, Image Processing, Machine Learning, Signal Processing',
                'order' => 3,
            ],
            [
                'name' => 'Md. Abdun Noor Polok',
                'designation' => 'Lecturer & Program Coordinator',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'photo' => '/images/ict/members/md_abdun_noor_polok.jpg',
                'phone' => '01521403890',
                'email' => 'poloknoor@baust.edu.bd',
                'education' => ['M.Sc. Engg. in CSE, KUET (Pursuing)', 'B.Sc. in ICE, BAUET'],
                'specialization' => 'Computer Vision, Deep Learning, Machine Learning',
                'order' => 4,
            ],
            [
                'name' => 'Asif Idris Tuhin',
                'designation' => 'Lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'photo' => '/images/ict/members/asif_idris_tuhin.jpg',
                'phone' => '01787380880',
                'email' => 'tuhin@baust.edu.bd',
                'education' => ['M.Sc. Engg. in CSE, RUET (ongoing)', 'B.Sc. Engg. in CSE, SUST'],
                'specialization' => 'Machine Learning and Data Mining, Medical Imaging',
                'order' => 5,
            ],
            [
                'name' => 'Tazrian Billah',
                'designation' => 'Lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'photo' => '/images/ict/members/tazrian_billah.jpg',
                'phone' => '01957721943',
                'email' => 'tazrian@baust.edu.bd',
                'education' => ['B.Sc. in CSE, BAUST'],
                'specialization' => 'Control Theory and Application',
                'order' => 6,
            ],
            [
                'name' => 'Meftahul Jannat',
                'designation' => 'Lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'photo' => '/images/ict/members/meftahul_jannat.jpeg',
                'phone' => '01716155607',
                'email' => 'meftahul.jannat@baust.edu.bd',
                'education' => ['B.Sc. Engg. in ETE, RUET'],
                'specialization' => 'Computer Vision, Large Language Model, Machine Learning',
                'order' => 7,
            ],
            [
                'name' => 'Humaira Fairooz Moohy',
                'designation' => 'Lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'photo' => '/images/ict/members/humaira_fairooz_moohy.jpeg',
                'phone' => '01844260298',
                'email' => 'humaira@baust.edu.bd',
                'education' => ['M.Sc. in ETE, CUET (Ongoing)', 'B.Sc. in ETE, CUET'],
                'order' => 8,
            ],
            [
                'name' => 'Nusrat Nizam Suzana',
                'designation' => 'Lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'photo' => '/images/ict/members/nusrat_nizam_suzana.jpg',
                'phone' => '01312808305',
                'email' => 'nusrat.suzana.bup20@gmail.com',
                'education' => ['M.Sc. (Thesis) in ICE, BUP', 'B.Sc. in ICE, BUP'],
                'specialization' => 'Computer Vision, Machine Learning',
                'biography' => '<p>Nusrat Nizam Suzana is a Lecturer in the Department of Information and Communication Technology at BAUST. She completed her B.Sc. and M.Sc. in Information and Communication Engineering from Bangladesh University of Professionals (BUP).</p>',
                'order' => 9,
            ],
            [
                'name' => 'Md. Sirazul Islam Sobuj',
                'designation' => 'Lecturer',
                'type' => 'permanent',
                'status' => 'active',
                'category' => 'lecturer',
                'photo' => '/images/ict/members/md_sirazul_islam_sobuj.jpeg',
                'phone' => '01631903266',
                'email' => 'sirazcse116@gmail.com',
                'education' => ['M.Sc. (Engg.) in CSE, SUST (Pursuing)', 'B.Sc. (Engg.) in CSE, SUST'],
                'specialization' => 'Algorithms, Software Engineering, Deep Learning',
                'biography' => '<p>Md. Sirazul Islam Sobuj is a Lecturer in the Department of Information and Communication Technology at BAUST. He earned his B.Sc. in Computer Science and Engineering from Shahjalal University of Science and Technology (SUST) and is pursuing his M.Sc. there.</p>',
                'order' => 10,
            ],
            // Adjunct Faculty
            [
                'name' => 'Lt Col Prof. Dr. Md Shameem Reza (Retd)',
                'designation' => 'Professor',
                'type' => 'adjunct',
                'status' => 'active',
                'category' => 'professor',
                'photo' => '/images/ict/members/md_shameem_reza_retd.jpeg',
                'phone' => '+8801769662723',
                'email' => 'treasurer@baust.edu.bd',
                'education' => ['PhD (RU)'],
                'order' => 11,
            ],
            [
                'name' => 'Dr. Kazi Mohammad Anamoul Haque',
                'designation' => 'Associate Professor',
                'type' => 'adjunct',
                'status' => 'active',
                'category' => 'associate_professor',
                'photo' => '/images/ict/members/kazi_mohammad_anamoul_haque.jpg',
                'phone' => '+8801769675597',
                'email' => 'dkmah@baust.edu.bd',
                'personal_email' => 'anamnano@gmail.com',
                'education' => ['B.Sc.(Hons.), M.Sc., Ph. D.(SUST)'],
                'order' => 12,
            ],
            [
                'name' => 'Md. Abu Rayhan',
                'designation' => 'Associate Professor',
                'type' => 'adjunct',
                'status' => 'active',
                'category' => 'associate_professor',
                'photo' => '/images/ict/members/md_abu_rayhan.jpg',
                'phone' => '01769662710',
                'email' => 'aburayhan@baust.edu.bd',
                'personal_email' => 'rayhan4302@gmail.com',
                'education' => ['B.Sc. (Hons.), M.Sc. (Thesis), RU', 'Pursuing PhD (CUET)'],
                'specialization' => 'Condensed Matter Physics, Materials Science, Semiconductor Physics, Solar Cell, Superconductivity',
                'order' => 13,
            ],
            [
                'name' => 'Irfan Raju',
                'designation' => 'Assistant Professor',
                'type' => 'adjunct',
                'status' => 'active',
                'category' => 'assistant_professor',
                'photo' => '/images/ict/members/irfan_raju.jpg',
                'phone' => '01743810588',
                'email' => 'irfan@baust.edu.bd',
                'education' => ['M.Sc. (Thesis) & B.Sc. (Hons) in Mathematics, University of Rajshahi'],
                'order' => 14,
            ],
            // Academic Staff
            [
                'name' => 'Md. Sakhawad Hossain',
                'designation' => 'Lab Technician',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_staff',
                'photo' => '/images/ict/members/md_sakhawad_hossain.jpg',
                'phone' => '01765964284',
                'email' => 'sakhawat.text@gmail.com',
                'education' => ['B.Sc in CSE'],
                'order' => 15,
            ],
            [
                'name' => 'MD. Khushbul Alam',
                'designation' => 'Lab Technician',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_staff',
                'photo' => '/images/ict/members/md_khushbul_alam.jpeg',
                'phone' => '01773941177',
                'email' => 'khushbulalam@gmail.com',
                'education' => ['B.Sc. Engg. in CSE'],
                'order' => 16,
            ],
            [
                'name' => 'Airin Aktar',
                'designation' => 'Office Assistant',
                'type' => 'staff',
                'status' => 'active',
                'category' => 'academic_officer',
                'photo' => '/images/ict/members/airin_aktar.png',
                'phone' => '01767868698',
                'email' => null,
                'education' => ['Graduation (BSS)'],
                'order' => 17,
            ],
        ];

        foreach ($membersData as $m) {
            DepartmentMember::updateOrCreate(
                [
                    'department' => 'ict',
                    'name' => $m['name'],
                ],
                array_merge($m, ['department' => 'ict'])
            );
        }

        // Ensure ICT news and events notices are associated with news-events category
        $newsEventsCategory = NoticeCategory::where('slug', 'news-events')->first();
        if ($newsEventsCategory) {
            Notice::forDepartment('ict')
                ->whereIn('id', [507, 902, 903])
                ->each(function ($notice) use ($newsEventsCategory) {
                    $notice->categories()->syncWithoutDetaching([$newsEventsCategory->id]);
                });
        }
    }

    public function down(): void
    {
        // Safe down
    }
};
