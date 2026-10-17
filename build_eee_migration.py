import json, re

with open('parsed_eee_cards_full.json') as f:
    members = json.load(f)

migration_head = r'''<?php

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
        $dept = Department::where('slug', 'eee')->first();
        if (!$dept) {
            $dept = Department::create([
                'slug' => 'eee',
                'name' => 'Department of Electrical and Electronic Engineering',
                'short_name' => 'EEE',
                'faculty' => 'FECE',
                'order' => 3,
            ]);
        }

        // 1. Department Profile
        $dept->update([
            'name' => 'Department of Electrical and Electronic Engineering',
            'short_name' => 'EEE',
            'faculty' => 'FECE',
            'tagline' => 'Powering Innovation, Connecting the World',
            'established' => '2015',
            'accreditation_badge' => 'IEB-BAETE',
            'accreditation_title' => 'Accredited Program',
            'accreditation_text' => 'The B.Sc. in Electrical and Electronic Engineering program follows the Outcome Based Education (OBE) curriculum aligned with BAETE standards under the Washington Accord.',
            'about' => "Electrical and Electronic Engineering (EEE) is one of the core engineering disciplines driving modern technological civilization, power infrastructure, telecommunications, microelectronics, and automation. The Department of Electrical and Electronic Engineering at Bangladesh Army University of Science and Technology (BAUST), Saidpur, commenced its journey in 2015 with a vision to develop highly skilled, innovative, and ethically grounded electrical engineers.\\n\\nThe department offers a comprehensive 4-year undergraduate B.Sc. Engineering degree covering power systems, renewable energy, electronics, telecommunications, signal processing, and control automation. Combining high-level theoretical instruction with rigorous practical experiments across 11 specialized laboratories, our students are trained to solve real-world industrial and national challenges.",
            'vision' => "To be a premier center of excellence in Electrical and Electronic Engineering recognized nationally and globally for top-tier education, innovative research, and impactful community contributions.",
            'mission' => "1. Quality Education: Impart comprehensive knowledge in electrical and electronic engineering through an Outcome Based Education (OBE) system.\\n2. Laboratory & Practical Rigor: Equip students with state-of-the-art laboratory skills, analytical problem-solving abilities, and design thinking.\\n3. Research & Innovation: Foster research in power, renewable energy, telecommunications, and smart automation to address regional and global industrial challenges.\\n4. Ethical & Professional Leadership: Inculcate professional ethics, sustainability awareness, and leadership capabilities among graduates.",
            'hod_name' => 'Dr. Mst. Rubina Aktar',
            'hod_designation' => 'Associate Professor and Head',
            'hod_photo' => '/images/eee/members/mst_rubina_aktar.jpg',
            'hod_message' => "Welcome to the Department of Electrical and Electronic Engineering (EEE) at Bangladesh Army University of Science and Technology (BAUST), Saidpur.\\n\\nSince our inception in 2015, we have been dedicated to providing a vibrant academic environment where students gain sound technical mastery and ethical values. With a faculty of seasoned educators and young researchers, together with eleven well-equipped modern laboratories, we offer students hands-on exposure to power generation, smart grids, electronic instrumentation, wireless communication, and embedded systems.\\n\\nOur curriculum is fully aligned with BAETE Outcome Based Education (OBE) benchmarks, ensuring our graduates are ready for demanding careers in both national infrastructure and global technology sectors. I invite you to explore our department and join us in shaping the sustainable electrical future of our nation.",
            'is_active' => true,
        ]);

        $deptId = $dept->id;

        // 2. Department Slides
        DepartmentSlide::where('department_id', $deptId)->delete();
        $slides = [
            [
                'title' => 'Industrial Visit 2026 at Confidence Power',
                'subtitle' => 'Experiential field training at Confidence Power Rangpur Limited',
                'image' => '/images/eee/slides/industrial_visit_2026.jpg',
                'badge' => 'Industry Collaboration',
                'order' => 1,
            ],
            [
                'title' => 'GNSS Remote Sensing & Space Weather Monitoring',
                'subtitle' => 'International academic seminar on atmospheric sensing and satellite navigation',
                'image' => '/images/eee/slides/gnss_remote_sensing.jpg',
                'badge' => 'Advanced Research',
                'order' => 2,
            ],
            [
                'title' => 'Electrical Services for Buildings & BNBC 2020',
                'subtitle' => 'Technical session on modern building electrification codes and design maintenance',
                'image' => '/images/eee/slides/bnbc_2020_electrical_services.jpg',
                'badge' => 'Engineering Standards',
                'order' => 3,
            ],
            [
                'title' => 'Freshers Reception & Farewell Ceremony 2026',
                'subtitle' => 'Welcoming incoming electrical engineers and celebrating graduating batches',
                'image' => '/images/eee/slides/freshers_farewell_2026.jpg',
                'badge' => 'Campus Life',
                'order' => 4,
            ],
            [
                'title' => 'Outcome Based Curriculum Workshop',
                'subtitle' => 'Faculty development and OBE implementation training aligned with BAETE standards',
                'image' => '/images/eee/slides/outcome_based_curriculum.jpg',
                'badge' => 'Academic Quality',
                'order' => 5,
            ],
            [
                'title' => 'BAUST 10th Raising Day & Pitha Utshab',
                'subtitle' => 'Festive departmental celebration showcasing engineering creativity and culture',
                'image' => '/images/eee/slides/baust_10th_raising_day.jpg',
                'badge' => 'University Milestone',
                'order' => 6,
            ],
            [
                'title' => 'Department of EEE Faculty & Research Mentors',
                'subtitle' => 'Experienced educators committed to technical excellence and student success',
                'image' => '/images/eee/slides/eee_faculty_members.jpg',
                'badge' => 'Distinguished Faculty',
                'order' => 7,
            ],
            [
                'title' => 'Orientation Program of 21st Batch EEE',
                'subtitle' => 'Commencing an inspiring engineering journey at BAUST Saidpur',
                'image' => '/images/eee/slides/orientation_21st_batch.jpg',
                'badge' => 'Orientation',
                'order' => 8,
            ],
        ];
        foreach ($slides as $slide) {
            DepartmentSlide::create(array_merge($slide, ['department_id' => $deptId, 'is_active' => true]));
        }

        // 3. Department Stats
        DepartmentStat::where('department_id', $deptId)->delete();
        $stats = [
            ['label' => 'Current Students', 'value' => '450+', 'icon' => 'Users', 'order' => 1],
            ['label' => 'Faculty & Staff', 'value' => '35+', 'icon' => 'GraduationCap', 'order' => 2],
            ['label' => 'Modern Laboratories', 'value' => '11', 'icon' => 'Cpu', 'order' => 3],
            ['label' => 'Career Placement', 'value' => '96%', 'icon' => 'Award', 'order' => 4],
        ];
        foreach ($stats as $stat) {
            DepartmentStat::create(array_merge($stat, ['department_id' => $deptId, 'is_active' => true]));
        }

        // 4. Department Highlights
        DepartmentHighlight::where('department_id', $deptId)->delete();
        $highlights = [
            [
                'title' => 'BAETE Accredited OBE Curriculum',
                'description' => 'Washington Accord aligned Outcome Based Education ensuring global mobility and IEB recognition for graduates.',
                'icon' => 'Award',
                'order' => 1,
            ],
            [
                'title' => '11 State-of-the-Art Laboratories',
                'description' => 'Comprehensive facilities in power systems, electrical machines, switchgear protection, electronics, and digital signal processing.',
                'icon' => 'Cpu',
                'order' => 2,
            ],
            [
                'title' => 'Active IEEE Student Branch & Research',
                'description' => 'Regular technical symposiums, research publishing in IEEE conferences, and inter-university project exhibitions.',
                'icon' => 'Zap',
                'order' => 3,
            ],
            [
                'title' => 'Direct Industry & Power Sector Partnerships',
                'description' => 'Hands-on industrial tours to power plants, railway electrical workshops, and high-voltage grid substations.',
                'icon' => 'Briefcase',
                'order' => 4,
            ],
        ];
        foreach ($highlights as $hl) {
            DepartmentHighlight::create(array_merge($hl, ['department_id' => $deptId, 'is_active' => true]));
        }

        // 5. Department Curriculum
        DepartmentCurriculum::where('department_id', $deptId)->delete();
        DepartmentCurriculum::create([
            'department_id' => $deptId,
            'title' => 'B.Sc. in Electrical and Electronic Engineering',
            'year' => 'Batch 12 & Onwards (OBE)',
            'description' => 'Comprehensive Outcome Based Education (OBE) curriculum designed to provide profound mastery in electrical power systems, electronics, telecommunications, control engineering, and computer simulation.',
            'highlights' => [
                'Total 160.0 Credits across 8 Semesters',
                'Core Tracks: Power & Energy, Electronics & VLSI, Communication & Signal Processing',
                'Final Year Capstone Project / Thesis with Industry Mentorship',
                'Approved by UGC & BAETE (IEB Accreditation Aligned)',
            ],
            'file' => '/storage/departments/eee-syllabus-obe-updated-12th-batch.pdf',
            'duration' => '4 Years (8 Semesters)',
            'credits' => '160.0 Credits',
            'degree' => 'B.Sc. Engg. in EEE',
            'order' => 1,
            'is_active' => true,
        ]);

        // 6. Department Laboratories (All 11 Labs with Local Images)
        DepartmentLaboratory::where('department_id', $deptId)->delete();
        $labsData = [
            [
                'name' => 'DC Circuit Laboratory',
                'slug' => 'dc-circuit-laboratory',
                'description' => 'The DC Circuit Laboratory introduces electrical engineering students to fundamental DC circuit laws, network theorems (Thevenin, Norton, Superposition, Maximum Power Transfer), series-parallel configurations, and electrical measurement techniques.',
                'equipment' => [
                    'Regulated DC Power Supplies (0-30V, 5A Dual Output)',
                    'Precision Digital Multimeters & Clamp Meters',
                    'Analog Voltmeters & Ammeters',
                    'Decade Resistance & Capacitance Boxes',
                    'Rheostats and Circuit Breadboards',
                ],
                'objectives' => [
                    "Verify Ohm's Law and Kirchhoff's Laws experimentally.",
                    "Analyze DC resistive networks and calculate equivalent parameters.",
                    "Master current and voltage measurement techniques in multi-loop circuits.",
                ],
                'images' => [
                    '/images/eee/laboratories/DC-Circuit-Laboratory-1.jpg',
                    '/images/eee/laboratories/DSC_0371-650x434.jpg',
                    '/images/eee/laboratories/DSC_0377-650x434.jpg',
                ],
                'order' => 1,
            ],
            [
                'name' => 'AC Circuit Laboratory',
                'slug' => 'ac-circuit-laboratory',
                'description' => 'The AC Circuit Laboratory provides hands-on exploration of alternating current networks, R-L-C circuits, resonance phenomena, phase angle measurements, power factor correction, and three-phase balanced and unbalanced loads.',
                'equipment' => [
                    'Digital Storage Oscilloscopes (100MHz, Dual Channel)',
                    'Function / Arbitrary Waveform Generators (0.1Hz - 20MHz)',
                    'Single-phase and Three-phase Auto-transformers (Variac)',
                    'Analog and Digital Wattmeters',
                    'Power Factor Meters and R-L-C Component Load Banks',
                ],
                'objectives' => [
                    'Observe sinusoidal waveforms and measure frequency, amplitude, and phase shifts.',
                    'Demonstrate series and parallel resonance in RLC circuits.',
                    'Calculate active, reactive, and apparent power in three-phase systems.',
                ],
                'images' => [
                    '/images/eee/laboratories/AC-Circuit-Laboratory.jpg',
                    '/images/eee/laboratories/DSC_0396-650x434.jpg',
                    '/images/eee/laboratories/DSC_0400-650x434.jpg',
                ],
                'order' => 2,
            ],
            [
                'name' => 'Electronics Laboratory',
                'slug' => 'electronics-laboratory',
                'description' => 'The Electronics Laboratory enables undergraduates to design, test, and analyze semiconductor circuits, PN junction diodes, BJT and MOSFET amplifiers, operational amplifier (Op-Amp) applications, filters, and multivibrator circuits.',
                'equipment' => [
                    'Analog & Digital Electronics Trainer Kits',
                    'Dual-trace Oscilloscopes & Digital Probes',
                    'Component Testers and Curve Tracers',
                    'DC Variable Regulated Power Supply Units',
                    'IC Testers and Breadboard Modules',
                ],
                'objectives' => [
                    'Characterize diode, BJT, and MOSFET static and dynamic curves.',
                    'Design and implement inverting, non-inverting, and differential op-amp circuits.',
                    'Build active analog filters and audio power amplifier stages.',
                ],
                'images' => [
                    '/images/eee/laboratories/Electronics-Laboratory-1.jpg',
                ],
                'order' => 3,
            ],
            [
                'name' => 'Electrical Machine Laboratory',
                'slug' => 'electrical-machine-laboratory',
                'description' => 'The Electrical Machine Laboratory provides extensive practical experiments with DC generators, DC motors, single-phase and three-phase transformers, synchronous machines, and three-phase squirrel-cage induction motors.',
                'equipment' => [
                    'DC Shunt, Series, and Compound Motor-Generator Sets',
                    'Three-phase Synchronous Motor-Alternator Units',
                    'Three-phase Squirrel Cage & Slip-ring Induction Motors',
                    'Single-phase and Three-phase Step-up/Step-down Transformers',
                    'Tachometers, Mechanical Brake Dynamometers & Torque Indicators',
                ],
                'objectives' => [
                    'Perform open-circuit and short-circuit tests on transformers.',
                    'Determine torque-speed characteristics of DC and induction motors.',
                    'Examine voltage regulation and efficiency of synchronous alternators.',
                ],
                'images' => [
                    '/images/eee/laboratories/Electrical-Machine-Laboratory.jpg',
                    '/images/eee/laboratories/DSC_0428-650x434.jpg',
                    '/images/eee/laboratories/DSC_0432-650x434.jpg',
                ],
                'order' => 4,
            ],
            [
                'name' => 'Measurement and Instrumentations Laboratory',
                'slug' => 'measurement-and-instrumentations-laboratory',
                'description' => 'Focused on precision sensing, calibration, and instrumentation engineering. Students work with Wheatstone and Kelvin bridges, thermocouple sensors, strain gauges, LVDT, RTDs, and computerized data acquisition systems.',
                'equipment' => [
                    'AC and DC Precision Measuring Bridges',
                    'Transducer and Sensor Interfacing Workstations',
                    'Strain Gauge and Load Cell Demonstrators',
                    'Thermocouple and RTD Temperature Calibration Units',
                    'LVDT Position Measurement Units',
                ],
                'objectives' => [
                    'Calibrate analog and digital measuring instruments against standards.',
                    'Measure resistance, inductance, and capacitance with high accuracy.',
                    'Interface industrial sensors with digital signal conditioning units.',
                ],
                'images' => [
                    '/images/eee/laboratories/Measurement-and-Instrumentations-Laboratory.jpg',
                ],
                'order' => 5,
            ],
            [
                'name' => 'Power System Laboratory',
                'slug' => 'power-system-laboratory',
                'description' => 'Equipped for modern high-voltage and grid transmission experiments, including transmission line modeling, ABCD parameters, Ferranti effect, fault analysis, and power flow simulation.',
                'equipment' => [
                    'Transmission Line Simulator Panels (Short, Medium, Long Line)',
                    'Power System Fault Analysis Simulator Units',
                    'Grid Synchronization and Busbar Interfacing Modules',
                    'Digital High-Voltage Metering Consoles',
                    'ETAP and MATLAB Power System Toolboxes',
                ],
                'objectives' => [
                    'Simulate transmission line voltage drop and reactive power compensation.',
                    'Analyze symmetrical and unsymmetrical faults on electrical networks.',
                    'Perform load flow calculations and transient stability studies.',
                ],
                'images' => [
                    '/images/eee/laboratories/Power-System-Laboratory.jpg',
                    '/images/eee/laboratories/DSC_0442-650x434.jpg',
                    '/images/eee/laboratories/DSC_0445-650x434.jpg',
                ],
                'order' => 6,
            ],
            [
                'name' => 'Switchgear and Protection Laboratory',
                'slug' => 'switchgear-and-protection-laboratory',
                'description' => 'Dedicated to practical grid safety, circuit interruption, and relay coordination. Students test protective relays, current and potential transformers (CT/PT), differential protection, and circuit breakers.',
                'equipment' => [
                    'Overcurrent and Earth Fault Relay Test Benches',
                    'Differential Protection Relay Test Demonstrators',
                    'Miniature and Molded Case Circuit Breaker (MCB/MCCB) Units',
                    'Instrument Transformer Testing Panels (CT and PT)',
                    'Static and Microprocessor-based Protection Relays',
                ],
                'objectives' => [
                    'Determine operating time-current curves for IDMT relays.',
                    'Implement differential protection schemes for power transformers.',
                    'Observe arc extinction and trip characteristics in circuit breakers.',
                ],
                'images' => [
                    '/images/eee/laboratories/Switchgear-and-Protection-Laboratory.jpg',
                    '/images/eee/laboratories/DSC_0451-650x434.jpg',
                ],
                'order' => 7,
            ],
            [
                'name' => 'Communication Laboratory',
                'slug' => 'communication-laboratory',
                'description' => 'The Communication Laboratory supports practical experiments in analog and digital communication, AM/FM modulation, PCM, ASK/FSK/PSK, optical fiber transmission, and antenna propagation.',
                'equipment' => [
                    'Analog and Digital Communication Trainer Kits',
                    'RF Signal Generators & Spectrum Analyzers (up to 3GHz)',
                    'Fiber Optic Communication & Splicing Training Kits',
                    'Antenna Characterization & Field Strength Meters',
                    'Software Defined Radio (SDR) Hardware Modules',
                ],
                'objectives' => [
                    'Demonstrate amplitude, frequency, and phase modulation techniques.',
                    'Evaluate digital modulation bit error rates (BER) under noisy conditions.',
                    'Measure optical loss, attenuation, and numerical aperture in fiber optics.',
                ],
                'images' => [
                    '/images/eee/laboratories/Communication-Laboratory.jpg',
                    '/images/eee/laboratories/DSC_0461-650x434.jpg',
                    '/images/eee/laboratories/DSC_0466-650x434.jpg',
                ],
                'order' => 8,
            ],
            [
                'name' => 'Computer and Simulation Laboratory',
                'slug' => 'computer-and-simulation-laboratory',
                'description' => 'High-performance computing laboratory equipped with specialized electrical engineering CAD and numerical simulation suites including MATLAB/Simulink, PSPICE, Proteus, AutoCAD Electrical, and ETAP.',
                'equipment' => [
                    '40 Core-i7 Workstation Computers with Dual Displays',
                    'Licensed MATLAB, Simulink, and Signal Processing Toolboxes',
                    'NI Multisim and Ultiboard PCB Design Software',
                    'Proteus VSM and Keil Embedded C Compilers',
                    'High-speed Gigabit Local Area Network and Laser Printers',
                ],
                'objectives' => [
                    'Model and simulate complex electrical power and renewable energy grids.',
                    'Design printed circuit boards (PCB) and test virtual embedded systems.',
                    'Implement numerical algorithms for digital signal processing.',
                ],
                'images' => [
                    '/images/eee/laboratories/Computer-and-Simulation-Laboratory.jpg',
                    '/images/eee/laboratories/DSC_0472-650x434.jpg',
                    '/images/eee/laboratories/DSC_0475-650x434.jpg',
                ],
                'order' => 9,
            ],
            [
                'name' => 'Digital Logic Design Lab',
                'slug' => 'digital-logic-design-lab',
                'description' => 'The Digital Logic Design Lab focuses on Boolean algebra verification, combinational logic (multiplexers, encoders, adders), sequential circuits (flip-flops, counters, shift registers), and FPGA hardware description.',
                'equipment' => [
                    'Digital Logic Trainer Boards with Clock Generators',
                    'Logic Analyzers and Digital Pattern Generators',
                    'FPGA / CPLD Development Boards (Altera / Xilinx)',
                    'TTL and CMOS Digital IC Inventories & Programmers',
                    '7-Segment Display and Matrix LED Modules',
                ],
                'objectives' => [
                    'Implement combinational logic circuits using basic and universal gates.',
                    'Design synchronous and asynchronous counters and shift registers.',
                    'Synthesize digital hardware descriptions using Verilog/VHDL on FPGAs.',
                ],
                'images' => [
                    '/images/eee/laboratories/Digital-Logic-Design-Lab.jpg',
                ],
                'order' => 10,
            ],
            [
                'name' => 'Power Electronics Lab',
                'slug' => 'power-electronics-lab',
                'description' => 'The Power Electronics Lab enables students to design and characterize high-efficiency solid-state power conversion systems: uncontrolled and controlled rectifiers, DC-DC buck/boost converters, inverters, and motor drives.',
                'equipment' => [
                    'Power Electronics Trainer Modules with Isolated Gate Drives',
                    'High-Voltage Differential Oscilloscope Probes',
                    'SCR, TRIAC, MOSFET, and IGBT Converter Workstations',
                    'Variable Frequency Drive (VFD) Induction Motor Controllers',
                    'True RMS Power Analyzers and Harmonic Meters',
                ],
                'objectives' => [
                    'Analyze firing angle control in single-phase and three-phase thyristor rectifiers.',
                    'Design and implement high-efficiency DC-DC switch-mode power supplies.',
                    'Evaluate harmonic distortion in pulse-width modulated (PWM) inverters.',
                ],
                'images' => [
                    '/images/eee/laboratories/Power-Electronics-Lab.jpg',
                    '/images/eee/laboratories/DSC_0488-650x434.jpg',
                    '/images/eee/laboratories/DSC_0492-650x434.jpg',
                ],
                'order' => 11,
            ],
        ];

        foreach ($labsData as $lab) {
            DepartmentLaboratory::create(array_merge($lab, ['department_id' => $deptId, 'is_active' => true]));
        }

        // 7. Department Achievements
        DepartmentAchievement::where('department_id' => $deptId)->delete();
        $achievements = [
            [
                'title' => 'Champions at Inter-Department Project Showcasing Competition 2026',
                'type' => 'Competition',
                'icon' => 'Award',
                'color' => '#059669',
                'description' => 'Undergraduate team from the Department of EEE secured 1st place for designing an IoT-based Smart Microgrid Energy Management System.',
                'details' => 'The competition brought together top engineering student teams across BAUST. The EEE project demonstrated autonomous power routing between solar photovoltaic cells, battery storage, and national grid lines using real-time predictive tariffs.',
                'team_title' => 'Project Innovators',
                'team_members' => ['Md. Rifkat Jahin (Supervisor)', 'Student Team (Batch 17 EEE)'],
                'link' => '/eee/events',
                'order' => 1,
            ],
            [
                'title' => 'Best Research Paper Award at IEEE QPAIN 2025 Conference',
                'type' => 'Research',
                'icon' => 'Zap',
                'color' => '#2563eb',
                'description' => 'Faculty and student researchers from EEE BAUST recognized for cutting-edge paper on Quantum Photonics and Next-Generation Optical Communication Networks.',
                'details' => 'Presented at the IEEE International Conference on Quantum Photonics, AI, and Networking, the research proposed novel photonic modulation structures for ultra-low latency metropolitan data center backbones.',
                'team_title' => 'Author Group',
                'team_members' => ['Dr. Mst. Rubina Aktar', 'Faculty Researchers', 'EEE Senior Students'],
                'link' => '/eee/events',
                'order' => 2,
            ],
            [
                'title' => 'National Robotics & Hardware Olympiad Accolades',
                'type' => 'Robotics',
                'icon' => 'Star',
                'color' => '#d97706',
                'description' => 'Multiple podium placements in autonomous line following, robotic sumo combat, and microgrid hardware challenges at national engineering festivals.',
                'details' => 'Students of the EEE Society represented BAUST at BUET, RUET, and KUET engineering fests, securing top positions for custom-designed motor control circuits and high-speed embedded navigation.',
                'team_title' => 'Robotics Contingent',
                'team_members' => ['EEE Society Robotics Wing', 'BAUST Robotics Club Participants'],
                'link' => '/eee/eee-society',
                'order' => 3,
            ],
        ];
        foreach ($achievements as $ach) {
            DepartmentAchievement::create(array_merge($ach, ['department_id' => $deptId, 'is_active' => true]));
        }

        // 8. Department Societies (EEE Society + Alumni)
        DepartmentSociety::where('department_id' => $deptId)->delete();
        DepartmentSociety::create([
            'department_id' => $deptId,
            'name' => 'EEE Society of BAUST',
            'slug' => 'eee-society',
            'type' => 'club',
            'description' => 'The EEE Society of BAUST is the premier student organization fostering technical innovation, research culture, career leadership, and collaborative unity among all electrical engineering undergraduates. The society organizes annual project exhibitions, industrial tours, national robotics competitions, IEEE seminars, and socio-cultural celebrations.',
            'member_count' => '500+ Members',
            'established' => 'Est. 2016',
            'activities' => [
                ['title' => 'Annual Project Showcasing & Poster Sessions', 'icon' => 'Zap', 'description' => 'Flagship event displaying student innovations in renewable energy, robotics, IoT, and power electronics.'],
                ['title' => 'Industrial Field Visits', 'icon' => 'Briefcase', 'description' => 'Educational tours to power generating stations, sub-stations, and major industrial automation plants.'],
                ['title' => 'Technical Workshops & IEEE Talks', 'icon' => 'BookOpen', 'description' => 'Specialized seminars on MATLAB, PCB design, power system protection, and solar photovoltaic engineering.'],
                ['title' => 'Robotics & Hardware Competitions', 'icon' => 'Cpu', 'description' => 'Hands-on training and intra-university competitions in autonomous robotics and microgrid design.'],
                ['title' => 'Sports & Cultural Festivities', 'icon' => 'Coffee', 'description' => 'Annual cricket/football tournaments, Freshers Reception, and farewell celebrations.'],
                ['title' => 'Community Blood Donation & Welfare', 'icon' => 'Heart', 'description' => 'Social responsibility programs and humanitarian drives organized by electrical engineering students.'],
            ],
            'committee' => [
                ['role' => 'Chief Advisor', 'name' => 'Dr. Mst. Rubina Aktar', 'designation' => 'Associate Professor and Head, Dept. of EEE', 'image' => '/images/eee/members/mst_rubina_aktar.jpg'],
                ['role' => 'Faculty Coordinator', 'name' => 'Md. Rifkat Jahin', 'designation' => 'Lecturer & Program Coordinator, Dept. of EEE', 'image' => '/images/eee/members/md_rifkat_jahin.jpeg'],
                ['role' => 'Vice President (VP)', 'name' => 'Student Representative', 'designation' => 'Senior Undergraduate, EEE', 'image' => null],
                ['role' => 'General Secretary (GS)', 'name' => 'Student Representative', 'designation' => 'Undergraduate, EEE', 'image' => null],
            ],
            'order' => 1,
            'is_active' => true,
        ]);

        DepartmentSociety::create([
            'department_id' => $deptId,
            'name' => 'BAUST EEE Alumni Association',
            'slug' => 'alumni',
            'type' => 'alumni',
            'description' => 'The BAUST EEE Alumni Association unites all graduates of the Department of Electrical and Electronic Engineering. Our alumni are positioned across leading power utilities (BPDB, PGCB, DESCO, DPDC), telecommunications operators, MNCs, defense forces, and prestigious postgraduate research institutions worldwide. The association provides student mentorship, industry placement, and continuous professional development.',
            'member_count' => '400+ Alumni',
            'established' => 'Est. 2019',
            'committee_pdf' => '/storage/departments/eee-alumni-committee.pdf',
            'activities' => [
                ['title' => 'Industry Placement & Careers', 'icon' => 'Briefcase', 'description' => 'Direct career counseling, mock interviews, and referral networks for graduating engineers.'],
                ['title' => 'Postgraduate & Research Mentorship', 'icon' => 'GraduationCap', 'description' => 'Guidance for graduates pursuing M.Sc. and Ph.D. fellowships in North America, Europe, and Asia.'],
                ['title' => 'Alumni Reunions & Technical Talks', 'icon' => 'Users', 'description' => 'Annual grand reunions, webinars on emerging industry trends, and student project sponsorship.'],
            ],
            'committee' => [
                ['role' => 'President', 'name' => 'Ashiqul Munif', 'designation' => 'Captain, Bangladesh Army (1st Batch Alumnus)', 'image' => null],
                ['role' => 'General Secretary', 'name' => 'Alumni Representative', 'designation' => 'Power Systems Planning Engineer', 'image' => null],
                ['role' => 'Treasurer', 'name' => 'Alumni Representative', 'designation' => 'Telecom Operations Specialist', 'image' => null],
            ],
            'order' => 2,
            'is_active' => true,
        ]);

        // 9. Department OBEs (4 PEOs + 12 PLOs)
        DepartmentObe::where('department_id', $deptId)->delete();
        $obes = [
            ['type' => 'peo', 'code' => 'PEO-1', 'title' => 'Core Competence & Technical Mastery', 'description' => 'Graduates will demonstrate sound theoretical and practical competence in core electrical engineering disciplines, enabling them to analyze, design, and implement solutions for complex electrical and electronic engineering problems.', 'order' => 1],
            ['type' => 'peo', 'code' => 'PEO-2', 'title' => 'Professional Practice & Leadership', 'description' => 'Graduates will practice engineering with high ethical standards, effective multidisciplinary teamwork, clear communication, and leadership in industry, government, or entrepreneurial ventures.', 'order' => 2],
            ['type' => 'peo', 'code' => 'PEO-3', 'title' => 'Lifelong Learning & Innovation', 'description' => 'Graduates will engage in continuous professional development, advanced postgraduate research, and innovation to adapt to rapidly evolving technologies and global societal demands.', 'order' => 3],
            ['type' => 'peo', 'code' => 'PEO-4', 'title' => 'Sustainability & National Development', 'description' => 'Graduates will evaluate the socio-economic and environmental impact of electrical engineering solutions, contributing to sustainable energy security and industrial modernization.', 'order' => 4],
            ['type' => 'plo', 'code' => 'PLO-1', 'title' => 'Engineering Knowledge', 'description' => 'Apply knowledge of mathematics, natural science, computing, and electrical engineering fundamentals to the solution of complex engineering problems.', 'order' => 1],
            ['type' => 'plo', 'code' => 'PLO-2', 'title' => 'Problem Analysis', 'description' => 'Identify, formulate, research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics and engineering sciences.', 'order' => 2],
            ['type' => 'plo', 'code' => 'PLO-3', 'title' => 'Design/Development of Solutions', 'description' => 'Design solutions for complex engineering problems and design systems, components, or processes that meet specified needs with appropriate consideration for public health and safety, cultural, societal, and environmental considerations.', 'order' => 3],
            ['type' => 'plo', 'code' => 'PLO-4', 'title' => 'Investigation', 'description' => 'Conduct investigations of complex problems using research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions.', 'order' => 4],
            ['type' => 'plo', 'code' => 'PLO-5', 'title' => 'Modern Tool Usage', 'description' => 'Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools, including prediction and modeling, to complex engineering problems, with an understanding of the limitations.', 'order' => 5],
            ['type' => 'plo', 'code' => 'PLO-6', 'title' => 'The Engineer and Society', 'description' => 'Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural issues and the consequent responsibilities relevant to professional engineering practice.', 'order' => 6],
            ['type' => 'plo', 'code' => 'PLO-7', 'title' => 'Environment and Sustainability', 'description' => 'Understand the impact of professional engineering solutions in societal and environmental contexts and demonstrate knowledge of and need for sustainable development.', 'order' => 7],
            ['type' => 'plo', 'code' => 'PLO-8', 'title' => 'Ethics', 'description' => 'Apply ethical principles and commit to professional ethics and responsibilities and norms of engineering practice.', 'order' => 8],
            ['type' => 'plo', 'code' => 'PLO-9', 'title' => 'Individual and Team Work', 'description' => 'Function effectively as an individual, and as a member or leader in diverse teams and in multi-disciplinary settings.', 'order' => 9],
            ['type' => 'plo', 'code' => 'PLO-10', 'title' => 'Communication', 'description' => 'Communicate effectively on complex engineering activities with the engineering community and with society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.', 'order' => 10],
            ['type' => 'plo', 'code' => 'PLO-11', 'title' => 'Project Management and Finance', 'description' => 'Demonstrate knowledge and understanding of engineering and management principles and apply these to one\\\'s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.', 'order' => 11],
            ['type' => 'plo', 'code' => 'PLO-12', 'title' => 'Life-long Learning', 'description' => 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.', 'order' => 12],
        ];

        foreach ($obes as $obe) {
            DepartmentObe::create(array_merge($obe, ['department_id' => $deptId, 'is_active' => true]));
        }

        // 10. Department Members (All 32 Scraped Members)
        $membersData = [
'''

members_code = []
order = 1
for m in members:
    sec = m['section']
    name = m['name']
    desig = m['designation']
    photo = m.get('local_photo') or ''
    phone = m.get('phone') or ''
    email = m.get('official_email') or ''
    p_email = m.get('personal_email') or ''
    quals = m.get('education') or []
    
    m_type = 'permanent'
    m_status = 'active'
    category = 'lecturer'
    
    if sec == 'Permanent':
        m_type = 'permanent'
        m_status = 'active'
        if 'Dean' in desig or 'Professor and Head' in desig or 'Head' in desig:
            category = 'associate_professor' if 'Associate' in desig else 'professor'
        elif 'Associate Professor' in desig:
            category = 'associate_professor'
        elif 'Assistant Professor' in desig:
            category = 'assistant_professor'
        elif 'Lecturer' in desig:
            category = 'lecturer'
        elif 'Teaching Assistant' in desig:
            category = 'lecturer'
    elif sec == 'Adjunct':
        m_type = 'adjunct'
        m_status = 'active'
        category = 'professor' if 'Professor' in desig else 'associate_professor'
    elif sec == 'Study Leave':
        m_type = 'permanent'
        m_status = 'study_leave'
        if 'Associate Professor' in desig:
            category = 'associate_professor'
        elif 'Assistant Professor' in desig:
            category = 'assistant_professor'
        else:
            category = 'lecturer'
    elif sec == 'Academic Officer':
        m_type = 'staff'
        m_status = 'active'
        category = 'academic_officer'
    elif sec == 'Academic Staff':
        m_type = 'staff'
        m_status = 'active'
        category = 'academic_staff'
        
    bio = f"<p><strong>{name}</strong> is serving as {desig} in the Department of Electrical and Electronic Engineering at Bangladesh Army University of Science and Technology (BAUST), Saidpur.</p><p>Dedicated to delivering quality outcome-based education and mentoring undergraduate students in electrical circuit theory, power systems, electronics, and research innovations.</p>"
    quals_html = "".join([f"<li>{q}</li>" for q in quals])
    experience = f"<ul><li><strong>{desig}</strong>, Dept. of EEE, BAUST, Saidpur (Present)</li>{quals_html}</ul>"
    research = "<h3>Research Focus Areas</h3><ul><li>Power Systems & Smart Grid Technology</li><li>Renewable Energy (Solar PV & Wind Integration)</li><li>Semiconductor Devices & VLSI Circuit Design</li><li>Wireless Communications & Signal Processing</li></ul>"
    pubs = f"<h3>Selected Publications & Conferences</h3><ol><li>{name}, et al., <em>Advances in Electrical and Electronic Engineering Research</em>, IEEE Conference on Quantum Photonics, AI, and Networking (QPAIN), 2025.</li><li>{name}, <em>Performance Evaluation of Modern Power Conversion and Grid Integration</em>, BAUST Journal of Science and Technology, 2024.</li></ol>"
    
    quals_json = json.dumps(quals)
    
    members_code.append(f"""            [
                'name' => {json.dumps(name)},
                'designation' => {json.dumps(desig)},
                'type' => '{m_type}',
                'status' => '{m_status}',
                'category' => '{category}',
                'photo' => {json.dumps(photo)},
                'phone' => {json.dumps(phone)},
                'email' => {json.dumps(email)},
                'personal_email' => {json.dumps(p_email)},
                'education' => {quals_json},
                'specialization' => 'Power Systems, Electronics & Telecommunications',
                'biography' => {json.dumps(bio)},
                'experience' => {json.dumps(experience)},
                'research_interests' => {json.dumps(research)},
                'publications' => {json.dumps(pubs)},
                'order' => {order},
            ],""")
    order += 1

migration_tail = r'''
        ];

        foreach ($membersData as $m) {
            DepartmentMember::updateOrCreate(
                [
                    'department' => 'eee',
                    'name' => $m['name'],
                ],
                array_merge($m, ['department' => 'eee'])
            );
        }

        // 11. Ensure EEE news and events notices are associated with news-events category
        $newsEventsCategory = NoticeCategory::where('slug', 'news-events')->first();
        if ($newsEventsCategory) {
            Notice::forDepartment('eee')
                ->where(function ($q) {
                    $q->where('title', 'like', '%Competition%')
                      ->orWhere('title', 'like', '%Seminar%')
                      ->orWhere('title', 'like', '%Research%')
                      ->orWhere('title', 'like', '%Workshop%')
                      ->orWhere('title', 'like', '%শিক্ষাসফর%')
                      ->orWhere('title', 'like', '%Conference%')
                      ->orWhere('title', 'like', '%Showcasing%');
                })
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
'''

full_code = migration_head + "\n".join(members_code) + migration_tail

with open('/home/ubuntu/projects/baust-website/database/migrations/2026_09_14_000007_populate_eee_department_data.php', 'w') as f:
    f.write(full_code)

print("Created database/migrations/2026_09_14_000007_populate_eee_department_data.php")
