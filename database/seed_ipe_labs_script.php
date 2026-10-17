<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\DepartmentLaboratory;

$labs = [
    'production-process-lab' => [
        'description' => 'The Machine Shop and Production Process Lab provides comprehensive hands-on training in conventional machining and modern manufacturing operations. Students gain practical experience on engine lathes, shaper machines, milling machines, drill presses, and grinding apparatus, learning metal removal principles, chip formation, tool geometry, surface roughness measurement, and precision manufacturing tolerances.',
        'equipment' => [
            'Precision Engine Lathes (Universal)',
            'Universal Milling Machine with Indexing Head',
            'Heavy Duty Shaper Machine',
            'Pedestal & Radial Drilling Machines',
            'Bench & Surface Grinding Machines',
            'Cutting Force Dynamometers & Precision Vernier Height Gauges'
        ],
        'objectives' => [
            'Mastering fundamental metal cutting mechanisms and chip morphology',
            'Operating manual and semi-automatic machine tools under industrial tolerances',
            'Evaluating machining parameters (speed, feed, depth of cut) on tool wear and surface finish',
            'Understanding industrial machining safety and workpiece clamping techniques'
        ]
    ],
    'simulation-lab' => [
        'description' => 'The Foundry and Welding Shop is designed to impart fundamental and practical knowledge of metal joining processes and molten metal casting technology. The facility houses modern shielded metal arc welding (SMAW), gas metal arc welding (GMAW), tungsten inert gas (TIG) welding, and oxy-acetylene gas cutting equipment, alongside green sand molding, core making, and non-ferrous melting furnace setups.',
        'equipment' => [
            'AC/DC Shielded Metal Arc Welding (SMAW) Sets',
            'MIG/MAG & TIG Inert Gas Welding Stations',
            'Oxy-Acetylene Gas Welding and Flame Cutting Kit',
            'Foundry Pit Furnace for Non-Ferrous Casting',
            'Green Sand Preparation Muller and Permeability Meter',
            'Welding Inspection Gauges and Non-Destructive Testing Dye Sets'
        ],
        'objectives' => [
            'Developing sound fabrication skills across multiple fusion welding modalities',
            'Understanding heat-affected zones (HAZ) and weld microstructure integrity',
            'Conducting pattern making, sand conditioning, and metal pouring experiments',
            'Analyzing casting defects like blowholes, shrinkage cavities, and porosity'
        ]
    ],
    'engineering-drawing-lab' => [
        'description' => 'The Engineering Drawing Lab serves as the foundational laboratory where engineering visualization, orthographic projection, sectional views, and assembly drawing fundamentals are developed. Equipped with professional drafting boards, draftettes, and high-precision drawing instruments, students learn standard engineering drawing conventions, dimensioning, tolerances, and geometric dimensioning and tolerancing (GD&T).',
        'equipment' => [
            'Professional Drafting Tables with Adjustable Tilt Angles',
            'Mini-Drafting Machines and Track Drafters',
            'Engineering Scale Rules and Drawing Instrument Kits',
            '3D Geometric Projection Solids and Model Displays',
            'Interactive Projection and Drafting Demonstration System'
        ],
        'objectives' => [
            'Mastering first-angle and third-angle orthographic projection standards',
            'Developing sectional, isometric, and perspective views of complex components',
            'Applying GD&T symbols and standard ISO limits and fits',
            'Translating manual drafts into computer-aided engineering models'
        ]
    ],
    'cad-cam-lab' => [
        'description' => 'The CAD and Simulation Lab provides students with high-performance computing workstations equipped with modern design and manufacturing software packages. Students learn parametric 3D solid modeling, computer-aided manufacturing toolpath generation, G-code/M-code programming for CNC equipment, and discrete-event system simulation for industrial assembly lines and supply chains.',
        'equipment' => [
            'High-Performance CAD/CAM Graphics Workstations',
            'SolidWorks & AutoCAD Parametric Design Suite',
            'Arena & FlexSim Discrete Event Simulation Software',
            'CNC G-Code Simulator and CAM Toolpath Verifier',
            'High-Speed Plotter and Multi-format Industrial Printers'
        ],
        'objectives' => [
            'Modeling parametric complex mechanical parts and multi-part assemblies',
            'Simulating production line bottlenecks and queueing behaviors in manufacturing',
            'Generating and verifying CNC machine toolpaths for automated fabrication',
            'Optimizing plant layouts and material flow using digital twin methodologies'
        ]
    ],
    'machine-tool-lab' => [
        'description' => 'The Materials Handling & Maintenance Engineering Lab emphasizes the analysis, design, and preventative maintenance of modern material handling equipment, automated conveyors, and production machinery. Students study vibration analysis, condition monitoring, hydraulic and pneumatic actuators, lubricant tribology, and overall equipment effectiveness (OEE).',
        'equipment' => [
            'Belt and Roller Conveyor Experimental Modules',
            'Electro-Pneumatic and Hydraulic Trainer Benches',
            'Digital Vibration Analyzers and Accelerometers',
            'Acoustic Emission and Stroboscopic Tachometer Units',
            'Industrial Lubricant Viscometer and Flash Point Testers'
        ],
        'objectives' => [
            'Designing unit load and bulk material handling systems for factory floors',
            'Implementing Total Productive Maintenance (TPM) and predictive condition monitoring',
            'Analyzing fluid power circuits (hydraulic and pneumatic) for automation',
            'Measuring vibration signatures to detect bearing failures and shaft misalignments'
        ]
    ],
    'ergonomics-safety-management-lab' => [
        'description' => 'The Ergonomics & Safety Management Lab focuses on human factors engineering, occupational biomechanics, workplace environment assessment, and industrial safety compliance. Students use anthropometric measurement tools, environmental meters (lux, sound, heat stress), and biomechanical posture analysis methods to design human-centered workplaces that minimize musculoskeletal disorders and optimize productivity.',
        'equipment' => [
            'Anthropometric Measurement Kits and Sliding Calipers',
            'Digital Lux Meters (Illuminance Assessment)',
            'Sound Level Meters (A/C Weighting with Octave Band Analyzer)',
            'Wet Bulb Globe Temperature (WBGT) Heat Stress Monitor',
            'Goniometers, Hand Grip Dynamometers & Pinch Gauges',
            'Digital Push-Pull Force Gauges and Ergonomic Evaluation Software'
        ],
        'objectives' => [
            'Conducting anthropometric surveys to design ergonomic workstations and chairs',
            'Evaluating indoor environmental quality including illumination, noise, and thermal comfort',
            'Applying posture assessment tools (RULA, REBA, OWAS) for worker safety',
            'Formulating comprehensive OSHA-aligned hazard mitigation and safety protocols'
        ]
    ],
    'measurement-quality-control-lab' => [
        'description' => 'The Measurement, Instrumentation and Quality Control Lab is equipped with high-precision linear, angular, and surface texture measuring instruments, alongside digital calibration and statistical quality control (SQC) systems. Students verify tolerances, calibrate gauges, build control charts (X-bar, R, p-charts), and conduct acceptance sampling and gauge repeatability and reproducibility (Gage R&R) studies.',
        'equipment' => [
            'Coordinate Measuring Machine (CMM) Trainer & Optical Comparators',
            'Digital Vernier Calipers, Micrometers, and Height Gauges (0.001mm)',
            'Surface Roughness Testers with Profile Tracing',
            'Sine Bars, Slip Gauge Sets (Grade 0 and Grade 1), and Angle Dekkors',
            'Digital Bevel Protractors and Dial Bore Gauges',
            'Statistical Process Control (SPC) Quality Analysis Software'
        ],
        'objectives' => [
            'Calibrating precision dimensional inspection equipment to traceable standards',
            'Measuring micro-inch surface roughness and waviness profiles',
            'Executing Gage R&R studies to assess measurement system variance',
            'Constructing statistical control charts to detect process variation and defects'
        ]
    ],
    'metrology-lab' => [
        'description' => 'The Metallurgy Lab is dedicated to the characterization of metallic materials, alloy microstructures, phase transformations, and thermal treatment processes. Equipped with metallurgical microscopes, polishing tables, specimen mounting presses, and electric muffle furnaces, students analyze iron-carbon equilibrium phases, grain size, case hardening, and precipitation kinetics.',
        'equipment' => [
            'Trinocular Metallurgical Microscopes with Digital Image Analysis',
            'High-Temperature Programmable Muffle Furnace (up to 1200°C)',
            'Metallographic Specimen Mounting Press',
            'Rotary Disc Grinding and Polishing Machines',
            'Micro-Vickers and Brinell Hardness Testers',
            'Chemical Etching Reagents and Fume Extraction Hood'
        ],
        'objectives' => [
            'Preparing metallographic specimens via sectioning, mounting, grinding, and polishing',
            'Observing ferrite, pearlite, martensite, and austenite microstructures in steels',
            'Evaluating the impact of annealing, normalizing, quenching, and tempering on hardness',
            'Quantifying ASTM grain size numbers and grain boundary distribution'
        ]
    ],
    'strength-of-materials-lab' => [
        'description' => 'The Strength of Materials Lab provides essential testing facilities to verify theoretical mechanics and evaluate mechanical properties of metallic and composite specimens. Equipped with universal testing machines, torsion testers, impact testers, and hardness apparatus, students test tension, compression, shear, bending, and torsion under calibrated loading.',
        'equipment' => [
            'Computerized Universal Testing Machine (UTM) with Extensometer',
            'Torsion Testing Machine with Angle of Twist Encoders',
            'Charpy and Izod Pendulum Impact Tester',
            'Rockwell, Brinell, and Vickers Hardness Testers',
            'Beam Bending and Deflection Experimental Test Rigs',
            'Electrical Resistance Strain Gauge Indicator Stations'
        ],
        'objectives' => [
            'Determining yield strength, ultimate tensile strength, and modulus of elasticity',
            'Measuring toughness and notch sensitivity under dynamic impact loading',
            'Investigating pure torsion shear stresses and angle of twist in shafts',
            'Validating Euler buckling formulas for columns under varying end constraints'
        ]
    ],
    'mechanics-of-machinery-lab' => [
        'description' => 'The Mechanics of Machinery Lab provides practical experimentation in kinematic mechanisms, gear trains, dynamic balancing of rotating masses, vibration damping, and gyroscopic principles. Students observe velocity and acceleration profiles in linkages and study resonant frequencies under forced vibrations.',
        'equipment' => [
            'Dynamic and Static Balancing Demonstration Rigs',
            'Motorized Gyroscope Demonstration Unit',
            'Universal Governor Apparatus (Hartnell, Porter, Watt)',
            'Whirling of Shafts Experimental Setup with Variable Speed Motor',
            'Cam and Follower Displacement and Jump Analysis Kit',
            'Epicyclic and Compound Gear Train Efficiency Apparatus'
        ],
        'objectives' => [
            'Balancing single-plane and multi-plane rotating unbalance masses dynamically',
            'Analyzing gyroscopic precessional torque on spinning rotors',
            'Measuring critical whirling speeds of shafts with diverse boundary conditions',
            'Determining speed regulation sensitivity and stability of mechanical governors'
        ]
    ],
    'fluid-mechanics-and-machinery-lab' => [
        'description' => 'The Fluid Mechanics and Machinery Lab features comprehensive fluid circuits, flow measurement benches, and hydraulic turbomachinery demonstrators. Students explore laminar and turbulent flow dynamics, pipe friction losses, Reynolds numbers, Bernoulli principles, and the performance characteristics of centrifugal pumps, Pelton wheels, and Francis turbines.',
        'equipment' => [
            'Hydraulic Bench with Variable Flow Recirculation Sump',
            'Venturi Meter, Orifice Plate, and Rotameter Flow Meter Benches',
            'Pipe Friction Loss and Minor Loss Pipework Apparatus',
            'Centrifugal Pump Test Rig with Pressure Transducers',
            'Pelton Wheel Turbine Demonstration Unit',
            'Reynolds Number Flow Visualization Apparatus'
        ],
        'objectives' => [
            'Verifying Bernoulli Theorem and computing discharge coefficients for flowmeters',
            'Measuring Darcy-Weisbach friction factors and minor head losses across pipe fittings',
            'Generating pump characteristic curves (head, flow rate, brake power, efficiency)',
            'Evaluating hydraulic turbine power output and runaway speed under variable loads'
        ]
    ],
    'thermodynamics-heat-transfer-lab' => [
        'description' => 'The Thermodynamics & Heat Transfer Lab facilitates in-depth investigations of thermal energy conversion, refrigeration cycles, and heat transfer phenomena. Students evaluate linear and radial thermal conduction, free and forced convection, Stefan-Boltzmann radiation, shell-and-tube heat exchangers, and vapor compression refrigeration cycles.',
        'equipment' => [
            'Thermal Conductivity Measurement Apparatus (Solids & Liquids)',
            'Free and Forced Convection Pin-Fin Heat Transfer Unit',
            'Concentric Tube & Shell-and-Tube Heat Exchanger Test Benches',
            'Stefan-Boltzmann Radiation and Emissivity Measurement Unit',
            'Vapor Compression Refrigeration Cycle Test Simulator',
            'Digital Temperature Data Acquisition and Thermocouple Arrays'
        ],
        'objectives' => [
            'Calculating thermal conductivity (k) and overall heat transfer coefficients (U)',
            'Comparing parallel flow and counter flow configurations in heat exchangers',
            'Measuring emissivity of surfaces and validating radiation physics',
            'Evaluating the Coefficient of Performance (COP) in refrigeration systems'
        ]
    ]
];

foreach ($labs as $slug => $data) {
    $lab = DepartmentLaboratory::where('department_id', 5)->where('slug', $slug)->first();
    if ($lab) {
        $lab->description = $data['description'];
        $lab->equipment = $data['equipment'];
        $lab->objectives = $data['objectives'];
        $lab->save();
        echo "Updated $slug\n";
    } else {
        echo "Not found: $slug\n";
    }
}
