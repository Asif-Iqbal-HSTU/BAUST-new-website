import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { ME_TABS, ME_DEPT_NAME } from '@/data/meData';
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
    'strength-of-materials-lab': {
        slug: 'strength-of-materials-lab',
        name: "Strength of Materials Lab",
        description: "Focuses on studying the behavior of solid materials under various forms of stress and strain. Students conduct tensile, compressive, shear, and torsion tests on metals, alloys, and composites to understand material failure limits and elasticity.",
        images: [
            "/images/departments/me/laboratory/strength-of-materials-lab/1.jpg",
            "/images/departments/me/laboratory/strength-of-materials-lab/2.jpg",
            "/images/departments/me/laboratory/strength-of-materials-lab/3.jpg",
            "/images/departments/me/laboratory/strength-of-materials-lab/4.jpg",
            "/images/departments/me/laboratory/strength-of-materials-lab/5.jpg"
        ],
        equipment: ["Universal Testing Machine (UTM)", "Torsion Testing Apparatus", "Impact Testing Rig (Charpy & Izod)", "Hardness Testers (Brinell & Rockwell)", "Strain Gauge Indicator Sets"],
        objectives: ["Determining tensile and compressive strength of materials", "Analyzing stress-strain curves and Poisson's ratio", "Investigating impact resistance and fracture toughness", "Experimental validation of beam deflection theories"]
    },
    'mechanics-of-machinery-lab': {
        slug: 'mechanics-of-machinery-lab',
        name: "Mechanics of Machinery Lab",
        description: "Dedicated to the kinematic and dynamic study of mechanical linkages, cams, gear trains, and gyroscopes. Students verify mechanical advantage, balancing of rotating masses, and vibration behaviors in mechanical systems.",
        images: [
            "/images/departments/me/laboratory/mechanics-of-machinery-lab/1.jpg",
            "/images/departments/me/laboratory/mechanics-of-machinery-lab/2.jpg",
            "/images/departments/me/laboratory/mechanics-of-machinery-lab/3.jpg",
            "/images/departments/me/laboratory/mechanics-of-machinery-lab/4.jpg",
            "/images/departments/me/laboratory/mechanics-of-machinery-lab/5.jpg"
        ],
        equipment: ["Static and Dynamic Balancing Apparatus", "Universal Governor Apparatus", "Cam and Follower Analysis Kit", "Motorized Gyroscope Apparatus", "Gear Train and Epicyclic Gear Sets"],
        objectives: ["Analyzing kinematics of planar mechanisms and linkages", "Studying static and dynamic balancing in rotating machinery", "Understanding governor performance and speed control", "Investigating gyroscopic couples and stabilization"]
    },
    'thermodynamics-lab': {
        slug: 'thermodynamics-lab',
        name: "Thermodynamics Lab",
        description: "Equipped with state-of-the-art apparatus for investigating thermodynamic laws, gas behavior, vapor compression cycles, and thermal conductivity. Hands-on testing helps students bridge theoretical thermal physics with practical systems.",
        images: [
            "/images/departments/me/laboratory/thermodynamics-lab/1.jpg",
            "/images/departments/me/laboratory/thermodynamics-lab/2.jpg",
            "/images/departments/me/laboratory/thermodynamics-lab/3.jpg",
            "/images/departments/me/laboratory/thermodynamics-lab/4.jpg",
            "/images/departments/me/laboratory/thermodynamics-lab/5.jpg"
        ],
        equipment: ["Bomb Calorimeter", "Steam Boiler and Turbine Demonstrator", "Vapor Compression Refrigeration Unit", "Marcet Boiler for Saturation Pressure", "Air Compressor Test Bench"],
        objectives: ["Measuring calorific values of fuels", "Verifying First and Second Laws of Thermodynamics", "Determining saturation temperature and pressure relations", "Evaluating performance of compressors and heat engines"]
    },
    'heat-engine-lab': {
        slug: 'heat-engine-lab',
        name: "Heat Engine Lab",
        description: "Focuses on internal and external combustion engines. Students analyze four-stroke and two-stroke petrol and diesel engines, dynamometer loading, fuel consumption rates, indicated horsepower, and exhaust gas emissions.",
        images: [
            "/images/departments/me/laboratory/heat-engine-lab/1.jpg",
            "/images/departments/me/laboratory/heat-engine-lab/2.jpg",
            "/images/departments/me/laboratory/heat-engine-lab/3.jpg",
            "/images/departments/me/laboratory/heat-engine-lab/4.jpg",
            "/images/departments/me/laboratory/heat-engine-lab/5.jpg"
        ],
        equipment: ["Four-Stroke Multi-Cylinder Petrol Engine Test Rig", "Single-Cylinder Diesel Engine with Hydraulic Dynamometer", "Exhaust Gas Emission Analyzer", "Cut-Section Engine Models", "Fuel Flow Rate and Air Intake Sensors"],
        objectives: ["Conducting brake thermal efficiency and volumetric efficiency tests", "Constructing indicator diagrams and heat balance sheets", "Analyzing engine emissions and fuel consumption characteristics", "Studying fuel injection and ignition mechanisms"]
    },
    'heat-transfer-lab': {
        slug: 'heat-transfer-lab',
        name: "Heat Transfer Lab",
        description: "Provides practical experimentation in conduction, convection (natural and forced), and thermal radiation. Students experiment with heat exchangers, pin fins, and lagged pipe setups to compute heat transfer coefficients.",
        images: [
            "/images/departments/me/laboratory/heat-transfer-lab/1.jpg",
            "/images/departments/me/laboratory/heat-transfer-lab/2.jpg",
            "/images/departments/me/laboratory/heat-transfer-lab/3.jpg",
            "/images/departments/me/laboratory/heat-transfer-lab/4.jpg",
            "/images/departments/me/laboratory/heat-transfer-lab/5.jpg"
        ],
        equipment: ["Shell and Tube Heat Exchanger Apparatus", "Thermal Conductivity of Liquids and Solids Bench", "Pin-Fin Heat Transfer Apparatus (Forced Convection)", "Stefan-Boltzmann Radiation Apparatus", "Critical Heat Flux & Boiling Demonstration Unit"],
        objectives: ["Measuring thermal conductivity of diverse materials", "Calculating overall heat transfer coefficients in heat exchangers", "Demonstrating natural vs forced convection dynamics", "Validating Stefan-Boltzmann Law for blackbody radiation"]
    },
    'refrigeration-and-air-conditioning-lab-2': {
        slug: 'refrigeration-and-air-conditioning-lab-2',
        name: "Refrigeration and Air Conditioning Lab",
        description: "Specializes in modern HVAC systems, cooling cycle efficiency, psychrometric properties of moist air, duct layout design, and eco-friendly refrigerant performance under varying load conditions.",
        images: [
            "/images/departments/me/laboratory/refrigeration-and-air-conditioning-lab-2/1.jpg",
            "/images/departments/me/laboratory/refrigeration-and-air-conditioning-lab-2/2.jpg",
            "/images/departments/me/laboratory/refrigeration-and-air-conditioning-lab-2/3.jpg"
        ],
        equipment: ["Vapor Compression Refrigeration Test Rig", "Air Conditioning Laboratory Test Unit", "Psychrometric Chamber", "Digital Anemometers and Humidity Probes", "Heat Pump Demonstration Kit"],
        objectives: ["Determining Coefficient of Performance (COP) of cooling units", "Executing psychrometric chart analysis for HVAC design", "Analyzing refrigerant phase transitions on pressure-enthalpy (P-h) diagrams", "Troubleshooting commercial refrigeration circuits"]
    },
    'fluid-mechanics-and-machinery-lab': {
        slug: 'fluid-mechanics-and-machinery-lab',
        name: "Fluid Mechanics and Machinery Lab",
        description: "Dedicated to the study of fluids at rest and in motion. Facilities include open channel flow flumes, pipe friction setups, Pelton wheels, Francis turbines, and centrifugal pump test benches for hydraulic performance analysis.",
        images: [
            "/images/departments/me/laboratory/fluid-mechanics-and-machinery-lab/1.jpg",
            "/images/departments/me/laboratory/fluid-mechanics-and-machinery-lab/2.jpg",
            "/images/departments/me/laboratory/fluid-mechanics-and-machinery-lab/3.jpg",
            "/images/departments/me/laboratory/fluid-mechanics-and-machinery-lab/4.jpg",
            "/images/departments/me/laboratory/fluid-mechanics-and-machinery-lab/5.jpg"
        ],
        equipment: ["Bernoulli's Theorem Demonstration Rig", "Pelton Wheel and Francis Turbine Test Rigs", "Centrifugal Pump Test Bench (Single & Multi-Stage)", "Venturimeter and Orifice Meter Calibration Setup", "Flow Over Notches and Weirs Flume"],
        objectives: ["Verifying Bernoulli's equation and continuity principles", "Calibrating flow measurement devices in closed conduits", "Evaluating operating characteristics of impulse and reaction turbines", "Calculating friction factors and head losses in pipes and fittings"]
    },
    'cad-and-simulation-lab': {
        slug: 'cad-and-simulation-lab',
        name: "CAD & Simulation Lab",
        description: "High-end computational center equipped with parametric CAD, CAM, and FEA/CFD simulation suites. Students learn 3D mechanical drafting, structural stress analysis, thermal simulations, and aerodynamic flow modeling.",
        images: [
            "/images/departments/me/laboratory/cad-and-simulation-lab/1.jpg",
            "/images/departments/me/laboratory/cad-and-simulation-lab/2.jpg"
        ],
        equipment: ["High-End Workstations with Dedicated Graphics", "SolidWorks Design & Simulation Software", "ANSYS Workbench (FEA & Fluent CFD)", "AutoCAD Mechanical Suites", "Interactive Simulation Projection Displays"],
        objectives: ["Creating precision 3D mechanical part and assembly models", "Conducting finite element analysis (FEA) for stress distribution", "Simulating fluid dynamics and thermal dissipation using CFD", "Generating manufacturing production drawings with GD&T"]
    },
    'machine-shop-and-production-process-lab-2': {
        slug: 'machine-shop-and-production-process-lab-2',
        name: "Machine Shop and Production Process Lab",
        description: "A comprehensive industrial manufacturing facility where students learn turning, milling, shaping, drilling, and grinding. Practical machining experience instills engineering tolerances, tool geometry, and production planning.",
        images: [
            "/images/departments/me/laboratory/machine-shop-and-production-process-lab-2/1.jpg",
            "/images/departments/me/laboratory/machine-shop-and-production-process-lab-2/2.jpg",
            "/images/departments/me/laboratory/machine-shop-and-production-process-lab-2/3.jpg",
            "/images/departments/me/laboratory/machine-shop-and-production-process-lab-2/4.jpg",
            "/images/departments/me/laboratory/machine-shop-and-production-process-lab-2/5.jpg"
        ],
        equipment: ["Heavy Duty Precision Engine Lathes", "Universal Milling Machines", "Shaping and Slotting Machines", "Radial Drilling Machine", "Surface and Pedestal Grinders"],
        objectives: ["Operating conventional machine tools safely and accurately", "Performing precision turning, taper turning, and threading", "Executing gear cutting and keyway milling operations", "Understanding chip formation, cutting speeds, and tool wear"]
    },
    'welding-shop-2': {
        slug: 'welding-shop-2',
        name: "Welding Shop",
        description: "Specialized training area for metal joining processes. Students practice Shielded Metal Arc Welding (SMAW), Gas Metal Arc Welding (MIG/MAG), Gas Tungsten Arc Welding (TIG), and oxy-acetylene gas welding and cutting.",
        images: [
            "/images/departments/me/laboratory/welding-shop-2/1.jpg",
            "/images/departments/me/laboratory/welding-shop-2/2.jpg"
        ],
        equipment: ["TIG and MIG Welding Machines", "AC/DC Arc Welding Transformers", "Oxy-Acetylene Gas Welding & Cutting Sets", "Spot Welding Machine", "Protective Welding Helmets and Fume Extractors"],
        objectives: ["Mastering manual metal arc and gas welding techniques", "Learning weld joint preparation and edge alignment", "Preventing weld defects like porosity and undercut", "Practicing industrial safety protocols in thermal joining"]
    },
    'foundry-shop': {
        slug: 'foundry-shop',
        name: "Foundry Shop",
        description: "Hands-on facility for sand casting, pattern making, mould cavity preparation, core boxes, metal melting, and pouring. Students witness molten metal solidification and learn casting defect prevention.",
        images: [
            "/images/departments/me/laboratory/foundry-shop/1.jpg",
            "/images/departments/me/laboratory/foundry-shop/2.jpg"
        ],
        equipment: ["Crucible Tilting Furnace", "Moulding Flasks and Cope/Drag Sets", "Foundry Sand Mullers and Sieve Analyzers", "Core Making and Baking Oven", "Pyrometers and Pouring Ladles"],
        objectives: ["Fabricating wooden patterns with shrinkage allowances", "Preparing green sand moulds with gating and riser systems", "Melting and casting non-ferrous metals safely", "Inspecting cast products for shrinkage and blowholes"]
    },
    'measurement-and-instrumentation-lab-2': {
        slug: 'measurement-and-instrumentation-lab-2',
        name: "Measurement and Instrumentation Lab",
        description: "Focuses on engineering metrology and sensor systems. Students calibrate micrometers, verniers, dial indicators, coordinate measurements, surface roughness testers, and electronic sensors for pressure and temperature.",
        images: [
            "/images/departments/me/laboratory/measurement-and-instrumentation-lab-2/1.jpg",
            "/images/departments/me/laboratory/measurement-and-instrumentation-lab-2/2.jpg",
            "/images/departments/me/laboratory/measurement-and-instrumentation-lab-2/3.jpg",
            "/images/departments/me/laboratory/measurement-and-instrumentation-lab-2/4.jpg",
            "/images/departments/me/laboratory/measurement-and-instrumentation-lab-2/5.jpg"
        ],
        equipment: ["Profile Projector (Optical Comparator)", "Surface Roughness Tester", "Electronic Autocollimator", "Dial Gauges, Bore Gauges, and Slip Gauges", "LVDT and Load Cell Transducer Kits"],
        objectives: ["Mastering precision dimensional and angular measurement", "Calibrating mechanical and digital measuring instruments", "Assessing surface roughness profiles and roundness", "Understanding sensor response, hysteresis, and error analysis"]
    },
    'materials-and-metallurgy-lab': {
        slug: 'materials-and-metallurgy-lab',
        name: "Materials and Metallurgy Lab",
        description: "Covers microstructure examination, specimen polishing, chemical etching, and heat treatment. Students study phase diagrams, grain boundaries, and the effects of annealing, quenching, and tempering on steel.",
        images: [
            "/images/departments/me/laboratory/materials-and-metallurgy-lab/1.jpg",
            "/images/departments/me/laboratory/materials-and-metallurgy-lab/2.jpg"
        ],
        equipment: ["Inverted Metallurgical Microscopes with Digital Cameras", "Muffle Heat Treatment Furnaces (up to 1200°C)", "Metallographic Specimen Mounting Press", "Variable-Speed Disc Polishers", "Chemical Etching and Fume Hood Station"],
        objectives: ["Preparing metallographic specimens from cutting to mirror polishing", "Observing microstructure of ferrous and non-ferrous alloys", "Applying heat treatment cycles (hardening, tempering, annealing)", "Correlating microstructural phases with mechanical hardness"]
    },
    'drawing-lab-2': {
        slug: 'drawing-lab-2',
        name: "Drawing Lab",
        description: "Dedicated drafting studio with large drafting tables, drafting machines, and projection systems where undergraduate students master orthographic projection, isometric views, sectioning, and engineering drawings.",
        images: [
            "/images/departments/me/laboratory/drawing-lab-2/1.jpg",
            "/images/departments/me/laboratory/drawing-lab-2/2.jpg"
        ],
        equipment: ["Adjustable Engineering Drafting Tables", "Mini Drafters and Precision Rule Sets", "Geometric Solid and Mechanical Part Models", "High-Resolution Demonstration Projector", "Large Format Plotter"],
        objectives: ["Mastering first and third angle orthographic projection", "Drafting sectional, isometric, and assembly drawings", "Applying standard dimensioning, tolerancing, and surface symbols", "Developing spatial visualization skills essential for mechanical design"]
    }
};

interface Props {
    lab?: LabData | null;
    labs?: LabData[];
    labSlug?: string;
}

function normalizeImage(src: string): string {
    if (!src) return '/images/departments/me/laboratory/strength-of-materials-lab/1.jpg';
    if (src.startsWith('/images/me/laboratories/')) {
        return src.replace('/images/me/laboratories/', '/images/departments/me/laboratory/');
    }
    return src;
}

export default function MeLaboratory({ lab: propLab, labs: propLabs, labSlug }: Props) {
    const slugKey = labSlug || propLab?.slug || 'strength-of-materials-lab';
    const fallback = DEFAULT_LABS[slugKey] || DEFAULT_LABS['strength-of-materials-lab'];

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
            <Head title={`${lab.name} - ME - BAUST`} />
            <Navbar />
            <PageHero 
                title={lab.name} 
                subtitle="Hands-on Learning in State-of-the-Art Facilities" 
                compact={true} 
            />
            <DeptSubNav departmentName={ME_DEPT_NAME} activeTab={lab.name} tabs={ME_TABS} />

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
                                                if (target.src.includes('/images/me/laboratories/')) {
                                                    target.src = target.src.replace('/images/me/laboratories/', '/images/departments/me/laboratory/');
                                                } else {
                                                    target.src = '/images/departments/me/laboratory/strength-of-materials-lab/1.jpg';
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
                                <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm">All ME Laboratories</h3>
                            </div>
                            <div className="space-y-1.5 max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-100 pr-1">
                                {labList.map((item) => {
                                    const isActive = item.slug === lab.slug;
                                    return (
                                        <Link
                                            key={item.slug}
                                            href={`/me/laboratories/${item.slug}`}
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
