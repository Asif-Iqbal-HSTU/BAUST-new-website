<?php

use App\Models\Department;
use App\Models\DepartmentAchievement;
use App\Models\DepartmentCurriculum;
use App\Models\DepartmentHighlight;
use App\Models\DepartmentLaboratory;
use App\Models\DepartmentObe;
use App\Models\DepartmentOnlineResource;
use App\Models\DepartmentSlide;
use App\Models\DepartmentSociety;
use App\Models\DepartmentStat;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    public function up(): void
    {
        // 1. CE Department Profile
        $ce = Department::where('slug', 'ce')->first();
        if (!$ce) {
            $ce = Department::create([
                'slug' => 'ce',
                'name' => 'Department of Civil Engineering',
                'short_name' => 'CE',
                'faculty' => 'FCE',
                'order' => 6,
            ]);
        }

        $ce->update([
            'name' => 'Department of Civil Engineering',
            'short_name' => 'CE',
            'faculty' => 'FCE',
            'tagline' => 'Building the Nation with Sustainable Engineering Solutions',
            'established' => '2019',
            'accreditation_badge' => 'IEB-BAETE',
            'accreditation_title' => 'Outcome-Based Education Program',
            'accreditation_text' => 'The Department of Civil Engineering offers a 4-year undergraduate B.Sc. in Civil Engineering program designed in line with Outcome-Based Education (OBE) and Washington Accord accreditation criteria.',
            'about' => "Civil engineering is the backbone of modern civilization—one of the oldest and most far-reaching disciplines in engineering. Civil engineers are the architects of infrastructure, shaping the physical world while ensuring environmental sustainability. From towering skyscrapers to sprawling dams, from cutting-edge suspension bridges to offshore drilling platforms, and from flood management to environmental protection, civil engineers make it all possible. They tackle challenges like earthquake resistance, pollution control, and sustainable development, all while managing projects and ensuring quality. In essence, civil engineers shape the history of nations and design a future built to last.\n\nThe Department of Civil Engineering (CE) at BAUST embarked on its mission in December 2019, with the goal of producing top-tier civil engineers. Offering a comprehensive four-year B.Sc. degree in Civil Engineering, the department embraces a clear vision backed by strategic missions. Our Outcome-Based Education (OBE) system and cutting-edge curriculum cover the full spectrum of civil engineering fields, empowering students to specialize in areas that align with their career goals. Students first build a strong foundation in basic sciences, mathematics, humanities, social sciences, and management before diving into core civil engineering subjects. Specializations offered include Structural Engineering, Environmental Engineering, Geotechnical Engineering, Transportation Engineering, and Water Resources Engineering.",
            'vision' => "To become a recognized center of excellence through producing Civil Engineering professionals inculcating morality, ethics, and discipline, and fitted for industry and academia to ensure sustainable development.",
            'mission' => "1. To ensure a dynamic, student-centered learning environment with state-of-the-art facilities in Civil Engineering, including basic sciences and management.\n2. To provide opportunities that bridge theoretical knowledge with real-time projects and industrial activities, contributing to the sustainable development of society.\n3. To conduct advanced, inter- and multi-disciplinary research in collaboration with industries and other academia to address contemporary challenges.\n4. To foster students’ engagement in lifelong learning, cultivating appreciation for diversity, tolerance, ethics, and morality.",
            'hod_name' => 'Professor Dr. Md. Mahmudul Hasan',
            'hod_designation' => 'Dean (In-Charge), Faculty of Civil Engineering & Head of Department',
            'hod_photo' => '/images/ce/members/md_mahmudul_hasan.jpg',
            'hod_message' => "Welcome to the Department of Civil Engineering (CE) at Bangladesh Army University of Science and Technology (BAUST), Saidpur. Civil Engineering is the foundation of national development, shaping transportation networks, resilient buildings, clean water supplies, and sustainable environmental systems.\n\nSince our inception in December 2019, our department has been committed to providing an exceptional educational experience through modern Outcome-Based Education (OBE) curricula, 11 dedicated state-of-the-art laboratories, and an experienced faculty body. Our students gain extensive hands-on experience through practical surveying camps, laboratory investigations, structural CAD design, and field attachments.\n\nWe emphasize ethical discipline, research innovation, and environmental responsibility, empowering our graduates to lead public and private infrastructure development both at home and internationally. I invite you to explore our department and join us in building a better world.",
            'is_active' => true,
        ]);

        $ceId = $ce->id;

        // 2. CE Slides (8 slides)
        DepartmentSlide::where('department_id', $ceId)->delete();
        $ceSlides = [
            ['title' => 'Sticker Design Competition & Creative Showcase', 'subtitle' => 'Civil Engineering Innovation Club, BAUST', 'image' => '/images/departments/ce/slider/slide1.jpg', 'badge' => 'Student Innovation', 'order' => 1],
            ['title' => 'Congratulations to Our Proud Alumni', 'subtitle' => 'Celebrating Excellence in Higher Studies & Career Advancements', 'image' => '/images/departments/ce/slider/slide2.jpg', 'badge' => 'Alumni Pride', 'order' => 2],
            ['title' => 'Welcoming New Faculty Members', 'subtitle' => 'Strengthening Academic and Research Excellence in CE', 'image' => '/images/departments/ce/slider/slide3.jpg', 'badge' => 'Academic Faculty', 'order' => 3],
            ['title' => 'Industrial Attachments at Leading Organizations', 'subtitle' => 'Hands-on Practical Training with National Infrastructure Projects', 'image' => '/images/departments/ce/slider/slide4.jpg', 'badge' => 'Industry Linkage', 'order' => 4],
            ['title' => 'Leadership in Engineering Education', 'subtitle' => 'Faculty Milestones & Professional Achievements', 'image' => '/images/departments/ce/slider/slide5.jpg', 'badge' => 'Academic Excellence', 'order' => 5],
            ['title' => 'Graduation Thesis & Capstone Project Defense', 'subtitle' => 'Research in Structural, Environmental & Transportation Engineering', 'image' => '/images/departments/ce/slider/slide6.jpg', 'badge' => 'Research & Defense', 'order' => 6],
            ['title' => 'BAUST Creative Minds Expo 2.0', 'subtitle' => 'Inspiring Innovation for a Sustainable and Green Future', 'image' => '/images/departments/ce/slider/slide7.jpg', 'badge' => 'Sustainable Expo', 'order' => 7],
            ['title' => 'Departmental Board Viva & Assessment', 'subtitle' => 'Ensuring High Standards under Washington Accord Criteria', 'image' => '/images/departments/ce/slider/slide8.jpg', 'badge' => 'OBE Assessment', 'order' => 8],
        ];
        foreach ($ceSlides as $s) {
            DepartmentSlide::create(array_merge($s, ['department_id' => $ceId, 'is_active' => true]));
        }

        // 3. CE Stats
        DepartmentStat::where('department_id', $ceId)->delete();
        $ceStats = [
            ['value' => '450+', 'label' => 'Undergraduate Students', 'order' => 1],
            ['value' => '28+', 'label' => 'Faculty & Staff Members', 'order' => 2],
            ['value' => '11', 'label' => 'Specialized Laboratories', 'order' => 3],
            ['value' => '100%', 'label' => 'OBE Aligned Curriculum', 'order' => 4],
        ];
        foreach ($ceStats as $st) {
            DepartmentStat::create(array_merge($st, ['department_id' => $ceId, 'is_active' => true]));
        }

        // 4. CE Highlights
        DepartmentHighlight::where('department_id', $ceId)->delete();
        $ceHighlights = [
            ['title' => 'Outcome Based Education (OBE)', 'text' => 'Curriculum aligned with international BAETE Washington Accord standards covering all 5 core CE branches.', 'icon' => 'GraduationCap', 'order' => 1],
            ['title' => '11 State-of-the-Art Laboratories', 'text' => 'Comprehensive testing facilities including SM Lab, Geotechnical, Transportation, Environmental, and Open Channel Flow.', 'icon' => 'Building2', 'order' => 2],
            ['title' => 'Practical Surveying & Field Camps', 'text' => 'Hands-on intensive field work using digital total stations, leveling instruments, and GIS tools.', 'icon' => 'Compass', 'order' => 3],
            ['title' => 'Environmental & Sustainable Infrastructure', 'text' => 'Active research in climate resilience, waste reduction, water treatment, and green engineering materials.', 'icon' => 'Leaf', 'order' => 4],
        ];
        foreach ($ceHighlights as $h) {
            DepartmentHighlight::create(array_merge($h, ['department_id' => $ceId, 'is_active' => true]));
        }

        // 5. CE Curricula
        DepartmentCurriculum::where('department_id', $ceId)->delete();
        $ceCurricula = [
            [
                'title' => 'B.Sc. in Civil Engineering (OBE Based 2022)',
                'slug' => 'ce-curriculum-2022',
                'year' => '2022',
                'degree' => 'Bachelor of Science in Civil Engineering',
                'duration' => '4 Years (8 Semesters)',
                'credits' => '160 Credits',
                'file' => null,
                'description' => 'Latest Outcome-Based Education (OBE) curriculum approved by UGC and aligned with BAETE Washington Accord standards.',
                'highlights' => ['Structural & Earthquake Engineering', 'Environmental & Water Resources', 'Geotechnical & Transportation Engineering', 'Industrial Attachment & Capstone Thesis'],
                'order' => 1,
            ],
            [
                'title' => 'B.Sc. in Civil Engineering Syllabus (2019)',
                'slug' => 'ce-curriculum-2019',
                'year' => '2019',
                'degree' => 'Bachelor of Science in Civil Engineering',
                'duration' => '4 Years (8 Semesters)',
                'credits' => '160 Credits',
                'file' => null,
                'description' => 'Foundational undergraduate curriculum covering fundamental civil engineering principles, survey camps, and laboratory competencies.',
                'highlights' => ['Foundational Engineering Sciences', 'Core Civil Engineering Laboratories', 'Intensive Survey Camp'],
                'order' => 2,
            ],
        ];
        foreach ($ceCurricula as $c) {
            DepartmentCurriculum::create(array_merge($c, ['department_id' => $ceId, 'is_active' => true]));
        }

        // 6. CE 11 Laboratories
        DepartmentLaboratory::where('department_id', $ceId)->delete();
        $ceLabs = [
            [
                'name' => 'Practical Surveying Lab',
                'slug' => 'practical-surveying-lab',
                'order' => 1,
                'description' => 'Surveying is vital for informed planning, construction, and management of land and infrastructure. It provides precise measurements of land boundaries, elevations, and contours, essential for designing buildings, roads, bridges, and utilities. The Practical Surveying Laboratory at BAUST provides students with hands-on experience in modern surveying techniques, digital instrumentation, and field map generation.',
                'equipment' => [
                    'Digital Total Station with Data Collector',
                    'Auto Level & Tilting Level Instruments',
                    'Optical Theodolite & Electronic Theodolite',
                    'Handheld GPS Receivers & Compass Sets',
                    'Leveling Staffs & Ranging Rods',
                    'Plane Table Survey Sets & Alidades',
                    'Measuring Tapes, Chains & Arrows',
                ],
                'objectives' => [
                    'Mastering angular and linear measurement techniques in field conditions',
                    'Conducting topographic surveys and contour map generation',
                    'Setting out building foundations, highway curves, and drainage grades',
                    'Operating modern electronic total stations and GIS data collection tools',
                ],
                'images' => [
                    '/images/departments/ce/laboratory/practical-surveying-lab/1.jpg',
                    '/images/departments/ce/laboratory/practical-surveying-lab/2.jpg',
                    '/images/departments/ce/laboratory/practical-surveying-lab/3.jpg',
                    '/images/departments/ce/laboratory/practical-surveying-lab/4.jpg',
                    '/images/departments/ce/laboratory/practical-surveying-lab/5.jpg',
                    '/images/departments/ce/laboratory/practical-surveying-lab/6.jpg',
                ],
            ],
            [
                'name' => 'Civil Engineering Drawing Lab',
                'slug' => 'drawing-lab-2',
                'order' => 2,
                'description' => 'Civil engineering drawing is a critical aspect of the design and construction process, providing a visual blueprint that guides every phase of an infrastructure project. The Drawing Lab at BAUST trains students in both fundamental hand drafting and advanced Computer-Aided Design (CAD), bridging creative visualization with structural accuracy.',
                'equipment' => [
                    'Adjustable Engineering Drafting Tables & Parallel Bars',
                    'Computer-Aided Design Workstations with AutoCAD & Revit',
                    'Large Format Plan Plotters & High-Resolution Scanners',
                    'Drafting Scales, Set Squares, Protractors & T-Squares',
                    '3D Architectural Visualization & BIM Software',
                ],
                'objectives' => [
                    'Translating structural concepts into standardized architectural blueprints',
                    'Creating plan, elevation, section, and structural detailing drawings',
                    'Mastering 2D drafting and 3D modeling using AutoCAD and Revit',
                    'Understanding building codes, standard symbology, and construction documentation',
                ],
                'images' => [
                    '/images/departments/ce/laboratory/drawing-lab-2/1.jpg',
                    '/images/departments/ce/laboratory/drawing-lab-2/2.jpg',
                    '/images/departments/ce/laboratory/drawing-lab-2/3.jpg',
                    '/images/departments/ce/laboratory/drawing-lab-2/4.jpg',
                ],
            ],
            [
                'name' => 'Engineering Materials Lab (Concrete Lab)',
                'slug' => 'strength-of-materials-lab-sm-lab',
                'order' => 3,
                'description' => 'The Engineering Materials Lab provides extensive testing facilities for concrete, brick, stone aggregates, sand, cement, and masonry. Students conduct rigorous testing to assess compressive strength, durability, fineness, and workability required for safe structural construction.',
                'equipment' => [
                    'Digital Compression Testing Machine (2000 kN)',
                    'Standard Sieve Shakers & Tyler Sieve Sets',
                    'Vicat Apparatus for Cement Setting Time',
                    'Le Chatelier Flask & Mold for Soundness',
                    'Slump Cone & Compacting Factor Apparatus',
                    'Curing Tanks with Temperature Control',
                    'Concrete Core Cutting Machine & Rebound Hammer',
                ],
                'objectives' => [
                    'Determining compressive and tensile strength of concrete cylinders and cubes',
                    'Testing fineness, normal consistency, and setting times of Portland cement',
                    'Performing grain size sieve analysis and fineness modulus for aggregates',
                    'Designing concrete mixes according to ACI and British standards',
                ],
                'images' => [
                    '/images/departments/ce/laboratory/strength-of-materials-lab-sm-lab/1.jpg',
                    '/images/departments/ce/laboratory/strength-of-materials-lab-sm-lab/2.jpg',
                    '/images/departments/ce/laboratory/strength-of-materials-lab-sm-lab/3.jpg',
                    '/images/departments/ce/laboratory/strength-of-materials-lab-sm-lab/4.jpg',
                    '/images/departments/ce/laboratory/strength-of-materials-lab-sm-lab/5.jpg',
                    '/images/departments/ce/laboratory/strength-of-materials-lab-sm-lab/6.jpg',
                ],
            ],
            [
                'name' => 'Strength of Materials Lab (SM Lab)',
                'slug' => 'structural-mechanics-lab-sm-lab-2',
                'order' => 4,
                'description' => 'The Structural Mechanics Laboratory provides experimental verification of stress, strain, shear, torsion, and deflection in structural members under diverse mechanical loadings. Students validate classic mechanics theories against real physical behavior.',
                'equipment' => [
                    'Universal Testing Machine (UTM) for Tension & Compression',
                    'Torsion Testing Machine with Angle of Twist Indicator',
                    'Impact Testing Machine (Charpy and Izod)',
                    'Rockwell & Brinell Hardness Testers',
                    'Beam Deflection Testing Apparatus',
                    'Column Buckling & Strut Apparatus',
                    'Helical Spring Testing Apparatus',
                ],
                'objectives' => [
                    'Investigating stress-strain characteristics of mild steel and rebar specimens',
                    'Measuring modulus of elasticity, yield strength, and ultimate tensile strength',
                    'Evaluating impact toughness and energy absorption of engineering alloys',
                    'Verifying bending stresses, shear stresses, and deflection equations in beams',
                ],
                'images' => [
                    '/images/departments/ce/laboratory/structural-mechanics-lab-sm-lab-2/1.jpg',
                    '/images/departments/ce/laboratory/structural-mechanics-lab-sm-lab-2/2.jpg',
                    '/images/departments/ce/laboratory/structural-mechanics-lab-sm-lab-2/3.jpg',
                    '/images/departments/ce/laboratory/structural-mechanics-lab-sm-lab-2/4.jpg',
                    '/images/departments/ce/laboratory/structural-mechanics-lab-sm-lab-2/5.jpg',
                    '/images/departments/ce/laboratory/structural-mechanics-lab-sm-lab-2/6.jpg',
                ],
            ],
            [
                'name' => 'Geotechnical Engineering Lab',
                'slug' => 'geotechnical-engineering-lab',
                'order' => 5,
                'description' => 'The Geotechnical Engineering Laboratory equips students to analyze soil behavior, bearing capacity, and foundation settlement. Through comprehensive physical and mechanical soil testing, students design safe substructures and earth-retaining systems.',
                'equipment' => [
                    'Direct Shear Test Apparatus with Load Ring',
                    'Consolidation / Oedometer Test Apparatus',
                    'Unconfined Compression Testing Apparatus',
                    'Standard Proctor & Modified Proctor Compaction Kits',
                    'Liquid Limit (Casagrande) & Plastic Limit Devices',
                    'Constant Head & Falling Head Permeameters',
                    'Hydrometer Analysis Set for Fine-Grained Soils',
                    'Manual Sample Ejector & Soil Sampling Tubes',
                ],
                'objectives' => [
                    'Classifying soils using Atterberg limits and grain size distribution',
                    'Determining shear strength parameters (cohesion c and friction angle phi)',
                    'Measuring soil consolidation parameters and coefficient of permeability',
                    'Assessing optimum moisture content and maximum dry density for road subgrades',
                ],
                'images' => [
                    '/images/departments/ce/laboratory/geotechnical-engineering-lab/1.jpg',
                    '/images/departments/ce/laboratory/geotechnical-engineering-lab/2.jpg',
                    '/images/departments/ce/laboratory/geotechnical-engineering-lab/3.jpg',
                    '/images/departments/ce/laboratory/geotechnical-engineering-lab/4.jpg',
                    '/images/departments/ce/laboratory/geotechnical-engineering-lab/5.jpg',
                    '/images/departments/ce/laboratory/geotechnical-engineering-lab/6.jpg',
                ],
            ],
            [
                'name' => 'Transportation Engineering Lab',
                'slug' => 'transportation-engineering-lab',
                'order' => 6,
                'description' => 'The Transportation Engineering Laboratory is dedicated to pavement material characterization, traffic engineering studies, and highway design. Students test asphalt, bitumen, and aggregates to ensure durable and resilient road infrastructure.',
                'equipment' => [
                    'Los Angeles Abrasion Testing Machine',
                    'Aggregate Impact Value (AIV) Testing Machine',
                    'California Bearing Ratio (CBR) Test Machine',
                    'Bitumen Penetrometer & Softening Point (Ring & Ball) Apparatus',
                    'Ductility Testing Machine for Bituminous Materials',
                    'Loss on Heating Oven & Flash and Fire Point Tester',
                    'Marshall Compactor and Stability Testing System',
                ],
                'objectives' => [
                    'Evaluating aggregate hardness, toughness, and abrasion resistance',
                    'Determining penetration grade, ductility, and softening point of bitumen',
                    'Performing Marshall stability and flow tests for asphalt concrete mix design',
                    'Assessing subgrade soil bearing capacity via California Bearing Ratio (CBR)',
                ],
                'images' => [
                    '/images/departments/ce/laboratory/transportation-engineering-lab/1.jpg',
                    '/images/departments/ce/laboratory/transportation-engineering-lab/2.jpeg',
                    '/images/departments/ce/laboratory/transportation-engineering-lab/3.jpg',
                    '/images/departments/ce/laboratory/transportation-engineering-lab/4.jpeg',
                    '/images/departments/ce/laboratory/transportation-engineering-lab/5.jpg',
                    '/images/departments/ce/laboratory/transportation-engineering-lab/6.jpeg',
                ],
            ],
            [
                'name' => 'Environmental Engineering Lab',
                'slug' => 'environmental-engineering-lab',
                'order' => 7,
                'description' => 'The Environmental Engineering Laboratory focuses on water quality analysis, wastewater treatment, and pollution assessment. Students test physical, chemical, and biological parameters to design water supply and sanitation systems.',
                'equipment' => [
                    'UV-Vis Spectrophotometer',
                    'BOD Incubator & Dissolved Oxygen (DO) Meters',
                    'Turbidity Meter & Digital pH/Conductivity Meters',
                    'Jar Test Apparatus for Coagulation & Flocculation',
                    'Bacteriological Incubator & Colony Counter',
                    'Arsenic Field Test Kits & Heavy Metal Testing Accessories',
                    'Muffle Furnace & Analytical Electronic Balances',
                ],
                'objectives' => [
                    'Analyzing potable water and wastewater for pH, turbidity, TDS, and hardness',
                    'Measuring biochemical oxygen demand (BOD) and chemical oxygen demand (COD)',
                    'Optimizing coagulant dosage using standard jar testing methods',
                    'Assessing bacteriological indicators (total coliform and fecal coliform) in water',
                ],
                'images' => [
                    '/images/departments/ce/laboratory/environmental-engineering-lab/1.jpeg',
                    '/images/departments/ce/laboratory/environmental-engineering-lab/2.jpeg',
                    '/images/departments/ce/laboratory/environmental-engineering-lab/3.jpg',
                    '/images/departments/ce/laboratory/environmental-engineering-lab/4.jpg',
                    '/images/departments/ce/laboratory/environmental-engineering-lab/5.jpg',
                    '/images/departments/ce/laboratory/environmental-engineering-lab/6.jpg',
                ],
            ],
            [
                'name' => 'Open Channel Flow Lab',
                'slug' => 'open-channel-flow-lab',
                'order' => 8,
                'description' => 'The Open Channel Flow Laboratory is a specialized facility for studying free-surface water flow in rivers, canals, spillways, and hydraulic structures. Students investigate critical flow, hydraulic jumps, and flow measurement devices.',
                'equipment' => [
                    'Tilting Flume with Variable Slope & Wave Generator',
                    'Broad-Crested & Sharp-Crested Weirs (Rectangular & V-Notch)',
                    'Venturi Flume & Parshall Flume Flumes',
                    'Sluice Gates with Upstream & Downstream Depth Gauges',
                    'Hook and Point Depth Gauges',
                    'Pitot Tubes & Digital Flow Velocity Meters',
                    'Hydraulic Jump Analysis Basin',
                ],
                'objectives' => [
                    'Studying uniform and non-uniform steady flow in open channels',
                    'Observing hydraulic jump phenomena and calculating energy dissipation',
                    'Calibrating flow measurement devices including weirs and flumes',
                    'Investigating water surface profiles (M and S curves) in backwater conditions',
                ],
                'images' => [
                    '/images/departments/ce/laboratory/open-channel-flow-lab/1.jpeg',
                    '/images/departments/ce/laboratory/open-channel-flow-lab/2.jpg',
                    '/images/departments/ce/laboratory/open-channel-flow-lab/3.jpg',
                    '/images/departments/ce/laboratory/open-channel-flow-lab/4.jpg',
                    '/images/departments/ce/laboratory/open-channel-flow-lab/5.jpg',
                    '/images/departments/ce/laboratory/open-channel-flow-lab/6.jpg',
                ],
            ],
            [
                'name' => 'Fluid Mechanics Lab',
                'slug' => 'fluid-mechanics-lab',
                'order' => 9,
                'description' => 'The Fluid Mechanics Laboratory provides foundational training in fluid statics, pressure measurement, laminar and turbulent flow dynamics, and pipe friction losses crucial for water supply and hydraulic engineering.',
                'equipment' => [
                    'Hydraulic Bench with Centrifugal Pump Unit',
                    'Pipe Friction & Minor Head Loss Apparatus',
                    'Venturi Meter and Orifice Meter Calibration Setup',
                    'Bernoulli Theorem Demonstration Apparatus',
                    'Reynolds Number Demonstration Apparatus',
                    'Metacentric Height & Center of Pressure Apparatus',
                    'Impact of a Jet Apparatus',
                ],
                'objectives' => [
                    'Verifying Bernoulli theorem along a converging-diverging venturi conduit',
                    'Determining Darcy friction factors and head losses in pipe networks',
                    'Visualizing laminar, transitional, and turbulent flow regimes via Reynolds dye',
                    'Measuring dynamic hydrodynamic forces exerted by fluid jets on vanes',
                ],
                'images' => [
                    '/images/departments/ce/laboratory/fluid-mechanics-lab/1.jpg',
                    '/images/departments/ce/laboratory/fluid-mechanics-lab/2.jpg',
                    '/images/departments/ce/laboratory/fluid-mechanics-lab/3.jpg',
                    '/images/departments/ce/laboratory/fluid-mechanics-lab/4.jpeg',
                ],
            ],
            [
                'name' => 'Computer Lab',
                'slug' => 'computer-lab',
                'order' => 10,
                'description' => 'The Civil Engineering Computer Laboratory offers specialized workstations equipped with industry-standard engineering analysis, structural simulation, GIS mapping, and project management software suites.',
                'equipment' => [
                    'High-Performance Intel Core i7 Workstations',
                    'ETABS & SAP2000 Structural Analysis Suites',
                    'AutoCAD Civil 3D & Autodesk Revit for BIM',
                    'ArcGIS Software for Hydrologic & Spatial Modeling',
                    'MATLAB for Numerical Computation and Optimization',
                    'High-Speed Campus LAN & Dedicated Power Backup (UPS)',
                ],
                'objectives' => [
                    'Performing finite element structural modeling of multistory reinforced concrete frames',
                    'Running watershed and drainage hydrologic simulations with GIS mapping',
                    'Writing computational algorithms in MATLAB for matrix structural analysis',
                    'Managing project timelines and critical path schedules using modern software',
                ],
                'images' => [
                    '/images/departments/ce/laboratory/computer-lab/1.jpg',
                    '/images/departments/ce/laboratory/computer-lab/2.jpg',
                ],
            ],
            [
                'name' => 'Mechanical Workshop Lab',
                'slug' => 'workshop-lab',
                'order' => 11,
                'description' => 'The Mechanical Workshop provides practical training in fabrication, metal casting, welding, and carpentry. Students gain essential hands-on skills in structural connections, machinery operation, and fabrication safety.',
                'equipment' => [
                    'Heavy-Duty Engine Lathe Machines & Shaper Machines',
                    'Electric Arc Welding & Oxy-Acetylene Gas Welding Units',
                    'Pedestal Drill Machines & Grinding Wheels',
                    'Sheet Metal Shearing, Bending & Rolling Machines',
                    'Foundry Furnace, Molds & Sand Preparation Sets',
                    'Woodworking Band Saws, Circular Saws & Planers',
                    'Fitting Benches, Vices & Precision Hand Tools',
                ],
                'objectives' => [
                    'Gaining hands-on fabrication experience in metal machining and shaping',
                    'Performing structural welding joints (butt, lap, fillet) with arc and gas setups',
                    'Understanding pattern making, molding, and metal casting processes',
                    'Applying workshop safety regulations, protective gear, and machine maintenance',
                ],
                'images' => [
                    '/images/departments/ce/laboratory/workshop-lab/1.jpg',
                    '/images/departments/ce/laboratory/workshop-lab/2.jpg',
                    '/images/departments/ce/laboratory/workshop-lab/3.jpg',
                    '/images/departments/ce/laboratory/workshop-lab/4.jpg',
                    '/images/departments/ce/laboratory/workshop-lab/5.jpg',
                    '/images/departments/ce/laboratory/workshop-lab/6.jpg',
                ],
            ],
        ];

        foreach ($ceLabs as $lab) {
            DepartmentLaboratory::create([
                'department_id' => $ceId,
                'name' => $lab['name'],
                'slug' => $lab['slug'],
                'description' => $lab['description'],
                'equipment' => $lab['equipment'],
                'objectives' => $lab['objectives'],
                'images' => $lab['images'],
                'order' => $lab['order'],
                'is_active' => true,
            ]);
        }

        // 7. CE Societies & Clubs
        DepartmentSociety::where('department_id', $ceId)->delete();
        $ceSocieties = [
            [
                'name' => 'Environment and Sustainability Club (ESC)',
                'slug' => 'esc',
                'type' => 'society',
                'established' => '2023',
                'member_count' => '150+ Members',
                'description' => "Towards the sustainable environment: our earth our responsibility.\n\nESC is a pioneer club of the Department of Civil Engineering, started on 2nd September 2023 under the direct guidance of Dr. Md. Mahmudul Hasan, Dean and Head of Department. ESC provides a platform for individuals passionate about environmental sustainability to come together, share ideas, and work towards preserving and protecting the planet.\n\nActivities include: Plastic Reuse Competitions, Environmental Awareness Campaigns, Tree Planting Drives, Workshops on Solid Waste Management, and Sustainable Infrastructure Exhibitions.",
                'order' => 1,
            ],
            [
                'name' => 'Civil Engineering Innovation Club (CEIC)',
                'slug' => 'ceic',
                'type' => 'society',
                'established' => '2021',
                'member_count' => '200+ Members',
                'description' => "Fostering engineering creativity, technical design, and innovation.\n\nCEIC organizes intra-departmental technical competitions, including the Intra Dept Drawing and CAD Contest, bridge building model competitions, structural modeling workshops, and sticker design contests to empower youth and future engineering talents.",
                'order' => 2,
            ],
            [
                'name' => 'Civil Engineering Alumni Association',
                'slug' => 'ce-alumni',
                'type' => 'alumni',
                'established' => '2023',
                'member_count' => '100+ Alumni',
                'description' => "To establish a dynamic and forward-looking alumni network for the Department of Civil Engineering at BAUST, Saidpur—fostering social, cultural, academic, and professional engagement among graduates. The Alumni Association actively supports mentoring, industry placements, and technical seminars for current students.",
                'order' => 3,
            ],
        ];
        foreach ($ceSocieties as $soc) {
            DepartmentSociety::create(array_merge($soc, ['department_id' => $ceId, 'is_active' => true]));
        }

        // 8. CE OBEs (PEOs & PLOs)
        DepartmentObe::where('department_id', $ceId)->delete();
        $cePEOs = [
            [
                'type' => 'peo',
                'code' => 'PEO-1',
                'title' => 'Technical Competence',
                'description' => 'Graduates will be competent to provide effective solutions to civil engineering problems by applying appropriate knowledge, skills, and tools.',
                'order' => 1,
            ],
            [
                'type' => 'peo',
                'code' => 'PEO-2',
                'title' => 'Ethical & Sustainable Practice',
                'description' => 'Graduates will responsibly practice civil engineering by integrating sustainability, safety, economic feasibility, and ethical values to meet societal needs.',
                'order' => 2,
            ],
            [
                'type' => 'peo',
                'code' => 'PEO-3',
                'title' => 'Leadership & Teamwork',
                'description' => 'Graduates will demonstrate communication, leadership, teamwork, and project management skills in multidisciplinary and diverse professional environments.',
                'order' => 3,
            ],
            [
                'type' => 'peo',
                'code' => 'PEO-4',
                'title' => 'Lifelong Learning',
                'description' => 'Graduates will engage in lifelong learning through higher studies, professional training, research, or entrepreneurship to address emerging technologies and evolving challenges for professional advancement.',
                'order' => 4,
            ],
        ];
        foreach ($cePEOs as $peo) {
            DepartmentObe::create(array_merge($peo, ['department_id' => $ceId, 'is_active' => true]));
        }

        $cePLOs = [
            ['type' => 'plo', 'code' => 'PLO1', 'title' => 'Engineering Knowledge', 'description' => 'Apply the knowledge of mathematics, science, engineering fundamentals and an engineering specialization to the solution of complex civil engineering problems.', 'order' => 1],
            ['type' => 'plo', 'code' => 'PLO2', 'title' => 'Problem Analysis', 'description' => 'Identify, formulate, research literature and analyze complex civil engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences and engineering sciences.', 'order' => 2],
            ['type' => 'plo', 'code' => 'PLO3', 'title' => 'Design/Development of Solutions', 'description' => 'Design solutions for complex civil engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, cultural, societal, and environmental considerations.', 'order' => 3],
            ['type' => 'plo', 'code' => 'PLO4', 'title' => 'Investigation', 'description' => 'Conduct investigations of complex problems considering design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions.', 'order' => 4],
            ['type' => 'plo', 'code' => 'PLO5', 'title' => 'Modern Tool Usage', 'description' => 'Create, select and apply appropriate techniques, resources, and modern engineering and IT tools, including prediction and modeling to complex civil engineering activities with an understanding of the limitations.', 'order' => 5],
            ['type' => 'plo', 'code' => 'PLO6', 'title' => 'The Engineer and Society', 'description' => 'Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.', 'order' => 6],
            ['type' => 'plo', 'code' => 'PLO7', 'title' => 'Environment and Sustainability', 'description' => 'Understand the impact of the professional civil engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.', 'order' => 7],
            ['type' => 'plo', 'code' => 'PLO8', 'title' => 'Ethics', 'description' => 'Apply ethical principles and commit to professional ethics, responsibilities and norms of the civil engineering practice.', 'order' => 8],
            ['type' => 'plo', 'code' => 'PLO9', 'title' => 'Individual and Team Work', 'description' => 'Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.', 'order' => 9],
            ['type' => 'plo', 'code' => 'PLO10', 'title' => 'Communication', 'description' => 'Communicate effectively on complex civil engineering activities with the engineering community and with society at large, such as being able to comprehend and write effective reports, design documentation, make effective presentations, and give and receive clear instructions.', 'order' => 10],
            ['type' => 'plo', 'code' => 'PLO11', 'title' => 'Project Management and Finance', 'description' => 'Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.', 'order' => 11],
            ['type' => 'plo', 'code' => 'PLO12', 'title' => 'Life-long Learning', 'description' => 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.', 'order' => 12],
        ];
        foreach ($cePLOs as $plo) {
            DepartmentObe::create(array_merge($plo, ['department_id' => $ceId, 'is_active' => true]));
        }

        // 9. CE Achievements
        DepartmentAchievement::where('department_id', $ceId)->delete();
        $ceAchievements = [
            [
                'title' => 'Vice Chancellor’s Excellence Award in Research & Service',
                'type' => 'Faculty Award',
                'icon' => 'Award',
                'color' => 'amber',
                'description' => 'Civil Engineering faculty members recognized for outstanding contributions in research publications, OBE pedagogy, and institutional service at BAUST.',
                'details' => 'Awarded by the Honorable Vice Chancellor recognizing academic dedication, top tier research papers in Scopus/SCI indexed journals, and exceptional mentorship.',
                'team_title' => 'Recipient Faculty',
                'team_members' => [['name' => 'Prof. Dr. Md. Mahmudul Hasan', 'batch' => 'Head of CE']],
                'order' => 1,
            ],
            [
                'title' => '2nd Place at BAUST Pitha Utsob 2025 (“Pitha Mohol”)',
                'type' => 'Cultural Excellence',
                'icon' => 'Trophy',
                'color' => 'emerald',
                'description' => 'The Civil Engineering Department stall “Pitha Mohol” secured 2nd place at the campus-wide Pitha Utsob 2025, celebrating cultural heritage and teamwork.',
                'details' => 'Demonstrated vibrant departmental culture, creative stall design, traditional culinary showcase, and active participation by students and faculty members.',
                'team_title' => 'Student & Faculty Organizing Team',
                'team_members' => [['name' => 'CE Cultural Committee', 'batch' => 'All Batches']],
                'order' => 2,
            ],
            [
                'title' => 'Intra Dept. Drawing and CAD Contest Championship',
                'type' => 'Technical Competition',
                'icon' => 'Cpu',
                'color' => 'blue',
                'description' => 'Organized by Civil Engineering Innovation Club (CEIC), recognizing student excellence in architectural planning, drafting precision, and 3D modeling.',
                'details' => 'Students competed across complex building plans, structural drafting, and CAD speed tests, evaluated by external industry experts and faculty judges.',
                'team_title' => 'Winning Teams',
                'team_members' => [['name' => 'Champion, 1st Runner Up & 2nd Runner Up Teams', 'batch' => 'CE Batches']],
                'order' => 3,
            ],
            [
                'title' => 'Teaching Excellence Program (TEP) Certification',
                'type' => 'Professional Achievement',
                'icon' => 'GraduationCap',
                'color' => 'indigo',
                'description' => 'Head of Department Dr. Md. Mahmudul Hasan successfully completed the prestigious Teaching Excellence Program (TEP) for advanced instructional design.',
                'details' => 'Enhancing OBE curriculum delivery, student-centric active learning methodologies, and modern formative assessment protocols in Civil Engineering.',
                'team_title' => 'Certified Leader',
                'team_members' => [['name' => 'Dr. Md. Mahmudul Hasan', 'batch' => 'Dean & Head']],
                'order' => 4,
            ],
            [
                'title' => 'Reuse of Plastic Materials Innovation Showcase',
                'type' => 'Sustainability Contest',
                'icon' => 'Leaf',
                'color' => 'green',
                'description' => '18 student teams turned plastic waste into functional engineering products organized by the Environment and Sustainability Club (ESC).',
                'details' => 'Highlighted sustainable civil engineering, recycled plastic aggregate in non-structural elements, eco-friendly paving concepts, and circular economy principles.',
                'team_title' => 'ESC Project Teams',
                'team_members' => [['name' => 'Top 3 Finalist Teams', 'batch' => 'ESC Club']],
                'order' => 5,
            ],
        ];
        foreach ($ceAchievements as $ach) {
            DepartmentAchievement::create(array_merge($ach, ['department_id' => $ceId, 'is_active' => true]));
        }

        // 10. CE Online Resources
        DepartmentOnlineResource::where('department_id', $ceId)->delete();
        $ceResources = [
            [
                'title' => 'Term-wise Lecture Notes & Handouts',
                'category' => 'Course Materials',
                'link' => 'https://drive.google.com/drive/folders/baust_ce_lecture_notes',
                'description' => 'Digital lecture presentations, reading materials, and handouts for all undergraduate Civil Engineering courses.',
                'order' => 1,
            ],
            [
                'title' => 'Practical Surveying & Lab Guidelines',
                'category' => 'Laboratory Manuals',
                'link' => 'https://drive.google.com/drive/folders/baust_ce_lab_manuals',
                'description' => 'Comprehensive laboratory guidelines, field testing protocols, and standard calculation templates for all 11 CE labs.',
                'order' => 2,
            ],
            [
                'title' => 'Previous Semesters Question Archive',
                'category' => 'Question Archive',
                'link' => 'https://drive.google.com/drive/folders/baust_ce_questions',
                'description' => 'Midterm and final term examination question papers from Winter 2020 through Winter 2024 semesters.',
                'order' => 3,
            ],
            [
                'title' => 'Academic Calendar & Class Routine',
                'category' => 'Schedules',
                'link' => 'https://baust.edu.bd/notice-category/academic/',
                'description' => 'Official class schedules, term schedules, laboratory time allocations, and academic guidelines.',
                'order' => 4,
            ],
        ];
        foreach ($ceResources as $res) {
            DepartmentOnlineResource::create(array_merge($res, ['department_id' => $ceId, 'is_active' => true]));
        }

        // 11. Create or Update ceadmin User
        $ceAdmin = User::where('email', 'ceadmin@baust.edu.bd')->first();
        if (!$ceAdmin) {
            User::create([
                'name' => 'CE Department Admin',
                'email' => 'ceadmin@baust.edu.bd',
                'password' => Hash::make('password'),
                'role' => 'dept_admin',
                'department' => 'ce',
            ]);
        } else {
            $ceAdmin->update([
                'name' => 'CE Department Admin',
                'role' => 'dept_admin',
                'department' => 'ce',
                'password' => Hash::make('password'),
            ]);
        }
    }

    public function down(): void
    {
        $ce = Department::where('slug', 'ce')->first();
        if ($ce) {
            DepartmentSlide::where('department_id', $ce->id)->delete();
            DepartmentStat::where('department_id', $ce->id)->delete();
            DepartmentHighlight::where('department_id', $ce->id)->delete();
            DepartmentCurriculum::where('department_id', $ce->id)->delete();
            DepartmentLaboratory::where('department_id', $ce->id)->delete();
            DepartmentSociety::where('department_id', $ce->id)->delete();
            DepartmentObe::where('department_id', $ce->id)->delete();
            DepartmentAchievement::where('department_id', $ce->id)->delete();
            DepartmentOnlineResource::where('department_id', $ce->id)->delete();
        }
        User::where('email', 'ceadmin@baust.edu.bd')->delete();
    }
};
