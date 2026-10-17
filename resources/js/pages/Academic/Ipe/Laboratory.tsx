import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { IPE_TABS, IPE_DEPT_NAME } from '@/data/ipeData';
import { Settings, Info, CheckCircle, Monitor, FlaskConical, ChevronRight } from 'lucide-react';

interface LabData {
    id?: number;
    slug: string;
    name: string;
    description: string;
    images: string[];
    equipment: string[];
    objectives: string[];
}

const DEFAULT_LABS: Record<string, LabData> = {
    'production-process-lab': {
        slug: 'production-process-lab',
        name: "Machine Shop and Production Process Lab",
        description: "The Machine Shop and Production Process Lab provides comprehensive hands-on training in conventional machining and modern manufacturing operations. Students gain practical experience on engine lathes, shaper machines, milling machines, drill presses, and grinding apparatus, learning metal removal principles, chip formation, tool geometry, surface roughness measurement, and precision manufacturing tolerances.",
        images: [
            "/images/departments/ipe/laboratory/production-process-lab/1.jpg",
            "/images/departments/ipe/laboratory/production-process-lab/2.jpg",
            "/images/departments/ipe/laboratory/production-process-lab/3.jpg",
            "/images/departments/ipe/laboratory/production-process-lab/4.jpg"
        ],
        equipment: [
            "Precision Engine Lathes (Universal)",
            "Universal Milling Machine with Indexing Head",
            "Heavy Duty Shaper Machine",
            "Pedestal & Radial Drilling Machines",
            "Bench & Surface Grinding Machines",
            "Cutting Force Dynamometers & Precision Vernier Height Gauges"
        ],
        objectives: [
            "Mastering fundamental metal cutting mechanisms and chip morphology",
            "Operating manual and semi-automatic machine tools under industrial tolerances",
            "Evaluating machining parameters (speed, feed, depth of cut) on tool wear and surface finish",
            "Understanding industrial machining safety and workpiece clamping techniques"
        ]
    },
    'simulation-lab': {
        slug: 'simulation-lab',
        name: "Foundry and Welding Shop",
        description: "The Foundry and Welding Shop is designed to impart fundamental and practical knowledge of metal joining processes and molten metal casting technology. The facility houses modern shielded metal arc welding (SMAW), gas metal arc welding (GMAW), tungsten inert gas (TIG) welding, and oxy-acetylene gas cutting equipment, alongside green sand molding, core making, and non-ferrous melting furnace setups.",
        images: [
            "/images/departments/ipe/laboratory/simulation-lab/1.jpg",
            "/images/departments/ipe/laboratory/simulation-lab/2.jpg",
            "/images/departments/ipe/laboratory/simulation-lab/3.jpg",
            "/images/departments/ipe/laboratory/simulation-lab/4.jpg",
            "/images/departments/ipe/laboratory/simulation-lab/5.jpg"
        ],
        equipment: [
            "AC/DC Shielded Metal Arc Welding (SMAW) Sets",
            "MIG/MAG & TIG Inert Gas Welding Stations",
            "Oxy-Acetylene Gas Welding and Flame Cutting Kit",
            "Foundry Pit Furnace for Non-Ferrous Casting",
            "Green Sand Preparation Muller and Permeability Meter",
            "Welding Inspection Gauges and Non-Destructive Testing Dye Sets"
        ],
        objectives: [
            "Developing sound fabrication skills across multiple fusion welding modalities",
            "Understanding heat-affected zones (HAZ) and weld microstructure integrity",
            "Conducting pattern making, sand conditioning, and metal pouring experiments",
            "Analyzing casting defects like blowholes, shrinkage cavities, and porosity"
        ]
    },
    'engineering-drawing-lab': {
        slug: 'engineering-drawing-lab',
        name: "Engineering Drawing Lab",
        description: "The Engineering Drawing Lab serves as the foundational laboratory where engineering visualization, orthographic projection, sectional views, and assembly drawing fundamentals are developed. Equipped with professional drafting boards, draftettes, and high-precision drawing instruments, students learn standard engineering drawing conventions, dimensioning, tolerances, and geometric dimensioning and tolerancing (GD&T).",
        images: [
            "/images/departments/ipe/laboratory/engineering-drawing-lab/1.jpg",
            "/images/departments/ipe/laboratory/engineering-drawing-lab/2.jpg"
        ],
        equipment: [
            "Professional Drafting Tables with Adjustable Tilt Angles",
            "Mini-Drafting Machines and Track Drafters",
            "Engineering Scale Rules and Drawing Instrument Kits",
            "3D Geometric Projection Solids and Model Displays",
            "Interactive Projection and Drafting Demonstration System"
        ],
        objectives: [
            "Mastering first-angle and third-angle orthographic projection standards",
            "Developing sectional, isometric, and perspective views of complex components",
            "Applying GD&T symbols and standard ISO limits and fits",
            "Translating manual drafts into computer-aided engineering models"
        ]
    },
    'cad-cam-lab': {
        slug: 'cad-cam-lab',
        name: "CAD and Simulation Lab",
        description: "The CAD and Simulation Lab provides students with high-performance computing workstations equipped with modern design and manufacturing software packages. Students learn parametric 3D solid modeling, computer-aided manufacturing toolpath generation, G-code/M-code programming for CNC equipment, and discrete-event system simulation for industrial assembly lines and supply chains.",
        images: [
            "/images/departments/ipe/laboratory/cad-cam-lab/1.jpg",
            "/images/departments/ipe/laboratory/cad-cam-lab/2.jpg"
        ],
        equipment: [
            "High-Performance CAD/CAM Graphics Workstations",
            "SolidWorks & AutoCAD Parametric Design Suite",
            "Arena & FlexSim Discrete Event Simulation Software",
            "CNC G-Code Simulator and CAM Toolpath Verifier",
            "High-Speed Plotter and Multi-format Industrial Printers"
        ],
        objectives: [
            "Modeling parametric complex mechanical parts and multi-part assemblies",
            "Simulating production line bottlenecks and queueing behaviors in manufacturing",
            "Generating and verifying CNC machine toolpaths for automated fabrication",
            "Optimizing plant layouts and material flow using digital twin methodologies"
        ]
    },
    'machine-tool-lab': {
        slug: 'machine-tool-lab',
        name: "Materials Handling & Maintenance Engineering Lab",
        description: "The Materials Handling & Maintenance Engineering Lab emphasizes the analysis, design, and preventative maintenance of modern material handling equipment, automated conveyors, and production machinery. Students study vibration analysis, condition monitoring, hydraulic and pneumatic actuators, lubricant tribology, and overall equipment effectiveness (OEE).",
        images: [
            "/images/departments/ipe/laboratory/machine-tool-lab/1.jpg",
            "/images/departments/ipe/laboratory/machine-tool-lab/2.jpg"
        ],
        equipment: [
            "Belt and Roller Conveyor Experimental Modules",
            "Electro-Pneumatic and Hydraulic Trainer Benches",
            "Digital Vibration Analyzers and Accelerometers",
            "Acoustic Emission and Stroboscopic Tachometer Units",
            "Industrial Lubricant Viscometer and Flash Point Testers"
        ],
        objectives: [
            "Designing unit load and bulk material handling systems for factory floors",
            "Implementing Total Productive Maintenance (TPM) and predictive condition monitoring",
            "Analyzing fluid power circuits (hydraulic and pneumatic) for automation",
            "Measuring vibration signatures to detect bearing failures and shaft misalignments"
        ]
    },
    'ergonomics-safety-management-lab': {
        slug: 'ergonomics-safety-management-lab',
        name: "Ergonomics & Safety Management Lab",
        description: "The Ergonomics & Safety Management Lab focuses on human factors engineering, occupational biomechanics, workplace environment assessment, and industrial safety compliance. Students use anthropometric measurement tools, environmental meters (lux, sound, heat stress), and biomechanical posture analysis methods to design human-centered workplaces that minimize musculoskeletal disorders and optimize productivity.",
        images: [
            "/images/departments/ipe/laboratory/ergonomics-safety-management-lab/1.jpg",
            "/images/departments/ipe/laboratory/ergonomics-safety-management-lab/2.jpg",
            "/images/departments/ipe/laboratory/ergonomics-safety-management-lab/3.jpg",
            "/images/departments/ipe/laboratory/ergonomics-safety-management-lab/4.jpg",
            "/images/departments/ipe/laboratory/ergonomics-safety-management-lab/5.jpg"
        ],
        equipment: [
            "Anthropometric Measurement Kits and Sliding Calipers",
            "Digital Lux Meters (Illuminance Assessment)",
            "Sound Level Meters (A/C Weighting with Octave Band Analyzer)",
            "Wet Bulb Globe Temperature (WBGT) Heat Stress Monitor",
            "Goniometers, Hand Grip Dynamometers & Pinch Gauges",
            "Digital Push-Pull Force Gauges and Ergonomic Evaluation Software"
        ],
        objectives: [
            "Conducting anthropometric surveys to design ergonomic workstations and chairs",
            "Evaluating indoor environmental quality including illumination, noise, and thermal comfort",
            "Applying posture assessment tools (RULA, REBA, OWAS) for worker safety",
            "Formulating comprehensive OSHA-aligned hazard mitigation and safety protocols"
        ]
    },
    'measurement-quality-control-lab': {
        slug: 'measurement-quality-control-lab',
        name: "Measurement, Instrumentation and Quality Control Lab",
        description: "The Measurement, Instrumentation and Quality Control Lab is equipped with high-precision linear, angular, and surface texture measuring instruments, alongside digital calibration and statistical quality control (SQC) systems. Students verify tolerances, calibrate gauges, build control charts (X-bar, R, p-charts), and conduct acceptance sampling and gauge repeatability and reproducibility (Gage R&R) studies.",
        images: [
            "/images/departments/ipe/laboratory/measurement-quality-control-lab/1.jpg",
            "/images/departments/ipe/laboratory/measurement-quality-control-lab/2.jpg",
            "/images/departments/ipe/laboratory/measurement-quality-control-lab/3.jpg",
            "/images/departments/ipe/laboratory/measurement-quality-control-lab/4.jpg",
            "/images/departments/ipe/laboratory/measurement-quality-control-lab/5.jpg",
            "/images/departments/ipe/laboratory/measurement-quality-control-lab/6.jpg"
        ],
        equipment: [
            "Coordinate Measuring Machine (CMM) Trainer & Optical Comparators",
            "Digital Vernier Calipers, Micrometers, and Height Gauges (0.001mm)",
            "Surface Roughness Testers with Profile Tracing",
            "Sine Bars, Slip Gauge Sets (Grade 0 and Grade 1), and Angle Dekkors",
            "Digital Bevel Protractors and Dial Bore Gauges",
            "Statistical Process Control (SPC) Quality Analysis Software"
        ],
        objectives: [
            "Calibrating precision dimensional inspection equipment to traceable standards",
            "Measuring micro-inch surface roughness and waviness profiles",
            "Executing Gage R&R studies to assess measurement system variance",
            "Constructing statistical control charts to detect process variation and defects"
        ]
    },
    'metrology-lab': {
        slug: 'metrology-lab',
        name: "Metallurgy Lab",
        description: "The Metallurgy Lab is dedicated to the characterization of metallic materials, alloy microstructures, phase transformations, and thermal treatment processes. Equipped with metallurgical microscopes, polishing tables, specimen mounting presses, and electric muffle furnaces, students analyze iron-carbon equilibrium phases, grain size, case hardening, and precipitation kinetics.",
        images: [
            "/images/departments/ipe/laboratory/metrology-lab/1.png",
            "/images/departments/ipe/laboratory/metrology-lab/2.jpg",
            "/images/departments/ipe/laboratory/metrology-lab/3.png"
        ],
        equipment: [
            "Trinocular Metallurgical Microscopes with Digital Image Analysis",
            "High-Temperature Programmable Muffle Furnace (up to 1200°C)",
            "Metallographic Specimen Mounting Press",
            "Rotary Disc Grinding and Polishing Machines",
            "Micro-Vickers and Brinell Hardness Testers",
            "Chemical Etching Reagents and Fume Extraction Hood"
        ],
        objectives: [
            "Preparing metallographic specimens via sectioning, mounting, grinding, and polishing",
            "Observing ferrite, pearlite, martensite, and austenite microstructures in steels",
            "Evaluating the impact of annealing, normalizing, quenching, and tempering on hardness",
            "Quantifying ASTM grain size numbers and grain boundary distribution"
        ]
    },
    'strength-of-materials-lab': {
        slug: 'strength-of-materials-lab',
        name: "Strength of Materials Lab",
        description: "The Strength of Materials Lab provides essential testing facilities to verify theoretical mechanics and evaluate mechanical properties of metallic and composite specimens. Equipped with universal testing machines, torsion testers, impact testers, and hardness apparatus, students test tension, compression, shear, bending, and torsion under calibrated loading.",
        images: [
            "/images/departments/ipe/laboratory/strength-of-materials-lab/1.jpg",
            "/images/departments/ipe/laboratory/strength-of-materials-lab/2.jpg",
            "/images/departments/ipe/laboratory/strength-of-materials-lab/3.jpg",
            "/images/departments/ipe/laboratory/strength-of-materials-lab/4.jpg"
        ],
        equipment: [
            "Computerized Universal Testing Machine (UTM) with Extensometer",
            "Torsion Testing Machine with Angle of Twist Encoders",
            "Charpy and Izod Pendulum Impact Tester",
            "Rockwell, Brinell, and Vickers Hardness Testers",
            "Beam Bending and Deflection Experimental Test Rigs",
            "Electrical Resistance Strain Gauge Indicator Stations"
        ],
        objectives: [
            "Determining yield strength, ultimate tensile strength, and modulus of elasticity",
            "Measuring toughness and notch sensitivity under dynamic impact loading",
            "Investigating pure torsion shear stresses and angle of twist in shafts",
            "Validating Euler buckling formulas for columns under varying end constraints"
        ]
    },
    'mechanics-of-machinery-lab': {
        slug: 'mechanics-of-machinery-lab',
        name: "Mechanics of Machinery Lab",
        description: "The Mechanics of Machinery Lab provides practical experimentation in kinematic mechanisms, gear trains, dynamic balancing of rotating masses, vibration damping, and gyroscopic principles. Students observe velocity and acceleration profiles in linkages and study resonant frequencies under forced vibrations.",
        images: [
            "/images/departments/ipe/laboratory/mechanics-of-machinery-lab/1.jpg",
            "/images/departments/ipe/laboratory/mechanics-of-machinery-lab/2.jpg",
            "/images/departments/ipe/laboratory/mechanics-of-machinery-lab/3.jpg",
            "/images/departments/ipe/laboratory/mechanics-of-machinery-lab/4.jpg",
            "/images/departments/ipe/laboratory/mechanics-of-machinery-lab/5.jpg",
            "/images/departments/ipe/laboratory/mechanics-of-machinery-lab/6.jpg"
        ],
        equipment: [
            "Dynamic and Static Balancing Demonstration Rigs",
            "Motorized Gyroscope Demonstration Unit",
            "Universal Governor Apparatus (Hartnell, Porter, Watt)",
            "Whirling of Shafts Experimental Setup with Variable Speed Motor",
            "Cam and Follower Displacement and Jump Analysis Kit",
            "Epicyclic and Compound Gear Train Efficiency Apparatus"
        ],
        objectives: [
            "Balancing single-plane and multi-plane rotating unbalance masses dynamically",
            "Analyzing gyroscopic precessional torque on spinning rotors",
            "Measuring critical whirling speeds of shafts with diverse boundary conditions",
            "Determining speed regulation sensitivity and stability of mechanical governors"
        ]
    },
    'fluid-mechanics-and-machinery-lab': {
        slug: 'fluid-mechanics-and-machinery-lab',
        name: "Fluid Mechanics and Machinery Lab",
        description: "The Fluid Mechanics and Machinery Lab features comprehensive fluid circuits, flow measurement benches, and hydraulic turbomachinery demonstrators. Students explore laminar and turbulent flow dynamics, pipe friction losses, Reynolds numbers, Bernoulli principles, and the performance characteristics of centrifugal pumps, Pelton wheels, and Francis turbines.",
        images: [
            "/images/departments/ipe/laboratory/fluid-mechanics-and-machinery-lab/1.jpg",
            "/images/departments/ipe/laboratory/fluid-mechanics-and-machinery-lab/2.jpg"
        ],
        equipment: [
            "Hydraulic Bench with Variable Flow Recirculation Sump",
            "Venturi Meter, Orifice Plate, and Rotameter Flow Meter Benches",
            "Pipe Friction Loss and Minor Loss Pipework Apparatus",
            "Centrifugal Pump Test Rig with Pressure Transducers",
            "Pelton Wheel Turbine Demonstration Unit",
            "Reynolds Number Flow Visualization Apparatus"
        ],
        objectives: [
            "Verifying Bernoulli Theorem and computing discharge coefficients for flowmeters",
            "Measuring Darcy-Weisbach friction factors and minor head losses across pipe fittings",
            "Generating pump characteristic curves (head, flow rate, brake power, efficiency)",
            "Evaluating hydraulic turbine power output and runaway speed under variable loads"
        ]
    },
    'thermodynamics-heat-transfer-lab': {
        slug: 'thermodynamics-heat-transfer-lab',
        name: "Thermodynamics & Heat Transfer Lab",
        description: "The Thermodynamics & Heat Transfer Lab facilitates in-depth investigations of thermal energy conversion, refrigeration cycles, and heat transfer phenomena. Students evaluate linear and radial thermal conduction, free and forced convection, Stefan-Boltzmann radiation, shell-and-tube heat exchangers, and vapor compression refrigeration cycles.",
        images: [
            "/images/departments/ipe/laboratory/thermodynamics-heat-transfer-lab/1.jpg",
            "/images/departments/ipe/laboratory/thermodynamics-heat-transfer-lab/2.jpg",
            "/images/departments/ipe/laboratory/thermodynamics-heat-transfer-lab/3.jpg",
            "/images/departments/ipe/laboratory/thermodynamics-heat-transfer-lab/4.jpg",
            "/images/departments/ipe/laboratory/thermodynamics-heat-transfer-lab/5.jpg",
            "/images/departments/ipe/laboratory/thermodynamics-heat-transfer-lab/6.jpg"
        ],
        equipment: [
            "Thermal Conductivity Measurement Apparatus (Solids & Liquids)",
            "Free and Forced Convection Pin-Fin Heat Transfer Unit",
            "Concentric Tube & Shell-and-Tube Heat Exchanger Test Benches",
            "Stefan-Boltzmann Radiation and Emissivity Measurement Unit",
            "Vapor Compression Refrigeration Cycle Test Simulator",
            "Digital Temperature Data Acquisition and Thermocouple Arrays"
        ],
        objectives: [
            "Calculating thermal conductivity (k) and overall heat transfer coefficients (U)",
            "Comparing parallel flow and counter flow configurations in heat exchangers",
            "Measuring emissivity of surfaces and validating radiation physics",
            "Evaluating the Coefficient of Performance (COP) in refrigeration systems"
        ]
    }
};

interface Props {
    lab?: LabData | null;
    labs?: LabData[];
    labSlug?: string;
}

function normalizeImage(src: string): string {
    if (!src) return '/images/departments/ipe/laboratory/production-process-lab/1.jpg';
    if (src.startsWith('/images/ipe/laboratories/')) {
        return src.replace('/images/ipe/laboratories/', '/images/departments/ipe/laboratory/');
    }
    return src;
}

export default function IpeLaboratory({ lab: propLab, labs: propLabs, labSlug }: Props) {
    const slugKey = labSlug || propLab?.slug || 'production-process-lab';
    const fallback = DEFAULT_LABS[slugKey] || DEFAULT_LABS['production-process-lab'];

    const rawImages = (propLab?.images && propLab.images.length > 0) ? propLab.images : fallback.images;
    const cleanImages = rawImages.map(normalizeImage);

    const lab: LabData = {
        slug: propLab?.slug || fallback.slug,
        name: propLab?.name || fallback.name,
        description: propLab?.description || fallback.description,
        images: cleanImages,
        equipment: (propLab?.equipment && propLab.equipment.length > 0) ? propLab.equipment : fallback.equipment,
        objectives: (propLab?.objectives && propLab.objectives.length > 0) ? propLab.objectives : fallback.objectives,
    };

    const labList = (propLabs && propLabs.length > 0) ? propLabs : Object.values(DEFAULT_LABS);

    return (
        <div className="min-h-screen flex flex-col font-['Inter',sans-serif]" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${lab.name} - IPE - BAUST`} />
            <Navbar />
            <PageHero 
                title={lab.name} 
                subtitle="Hands-on Learning in State-of-the-Art Industrial & Production Facilities" 
                compact={true} 
            />
            <DeptSubNav departmentName={IPE_DEPT_NAME} activeTab="Laboratories" tabs={IPE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Side */}
                    <div className="lg:col-span-2">
                        <section className="mb-12">
                            <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                <Info className="text-emerald-600" />
                                About the Laboratory
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                                {lab.description}
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <Monitor className="text-emerald-600" />
                                Lab Gallery
                            </h2>
                            <div className={`grid gap-6 ${lab.images.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                {lab.images.map((img, idx) => (
                                    <div key={idx} className="group relative rounded-[2.5rem] overflow-hidden bg-gray-100 border border-gray-100 shadow-lg aspect-video">
                                        <img 
                                            src={img} 
                                            alt={`${lab.name} View ${idx + 1}`} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                if (target.src.includes('/images/ipe/laboratories/')) {
                                                    target.src = target.src.replace('/images/ipe/laboratories/', '/images/departments/ipe/laboratory/');
                                                } else {
                                                    target.src = '/images/departments/ipe/laboratory/production-process-lab/1.jpg';
                                                }
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Sidebar Info */}
                    <div className="space-y-8">
                        {/* Equipment List */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                                    <Settings size={20} />
                                </div>
                                <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm">Lab Equipment</h3>
                            </div>
                            <ul className="space-y-4">
                                {lab.equipment.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Objectives List */}
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl">
                            <div className="flex items-center gap-3 mb-6 text-emerald-400">
                                <CheckCircle size={24} />
                                <h3 className="font-bold uppercase tracking-widest text-sm">Learning Objectives</h3>
                            </div>
                            <ul className="space-y-5">
                                {lab.objectives.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-emerald-400" />
                                        <span className="text-sm text-gray-300 font-medium leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* All Laboratories Navigation Box */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                                    <FlaskConical size={20} />
                                </div>
                                <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm">All IPE Laboratories</h3>
                            </div>
                            <div className="space-y-1.5 max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-100 pr-1">
                                {labList.map((item) => {
                                    const isActive = item.slug === lab.slug;
                                    return (
                                        <Link
                                            key={item.slug}
                                            href={`/ipe/laboratories/${item.slug}`}
                                            className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                                                isActive
                                                    ? 'bg-emerald-600 text-white shadow-md'
                                                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
                                            }`}
                                        >
                                            <span className="truncate mr-2">{item.name}</span>
                                            <ChevronRight size={14} className={isActive ? 'text-white' : 'text-gray-400'} />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
