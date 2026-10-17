import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { ICT_TABS, ICT_DEPT_NAME } from '@/data/ictData';
import { Cpu, Server, ShieldAlert, Monitor, Radio, Settings, Info, CheckCircle, ArrowRight } from 'lucide-react';

interface LabDetails {
    id?: number;
    name: string;
    slug?: string;
    icon?: any;
    description: string;
    equipment: string[];
    objectives: string[];
    images?: string[];
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    lab?: LabDetails | null;
    allLabs?: LabDetails[];
    labSlug?: string;
}

const DEFAULT_LABS: LabDetails[] = [
    {
        name: "Computer Programming & Software Engineering Lab",
        slug: "computer-programming-software-engineering-lab",
        icon: Monitor,
        description: "This laboratory is designed for students to master fundamental coding, programming methodologies, software design architectures, and database configurations. It hosts powerful workstations running Linux and Windows, equipped with top-tier development suites.",
        equipment: ["Intel Core i7/i9 Workstations", "IDE environments (VS Code, Eclipse, IntelliJ)", "Version Control (Git/GitHub)", "Dual-OS Boot Environments"],
        objectives: ["Develop strong problem-solving and algorithmic logic", "Master C/C++, Java, and Python frameworks", "Implement software design patterns and SDLC methodologies"]
    },
    {
        name: "Signal Processing & Telecommunication Lab",
        slug: "signal-processing-telecommunication-lab",
        icon: Radio,
        description: "A highly specialized laboratory focusing on digital signal processing, signal modulations, antenna systems, and telecommunication hardware interfacing. Students gain practical insights into the physical transmission layer of ICT systems.",
        equipment: ["Digital Storage Oscilloscopes", "RF Signal Generators", "DSP Development Boards", "Fiber Optic Training Kits", "Spectrum Analyzers"],
        objectives: ["Analyze signal behavior in time and frequency domains", "Perform analog and digital modulation experiments", "Understand optical fiber communications and signal propagation"]
    },
    {
        name: "Cybersecurity & Computer Networks Lab",
        slug: "cybersecurity-computer-networks-lab",
        icon: ShieldAlert,
        description: "Focuses on network administration, security enforcement, and threat detection. Students work on configuring physical routing systems, analyzing packets, and testing penetration methods in secure sandbox environments.",
        equipment: ["Cisco Managed Routers & Switch Racks", "Next-Gen Hardware Firewalls", "Virtualization Servers (Proxmox/ESXi)", "Network Analyzers (Wireshark, Nmap, Snort)"],
        objectives: ["Configure complex local and wide-area networks", "Design secure firewalls and access control lists", "Understand vulnerability assessment and cryptographic principles"]
    },
    {
        name: "VLSI & Embedded System Lab",
        slug: "vlsi-embedded-system-lab",
        icon: Cpu,
        description: "Provides hands-on experience in VLSI chip design, digital logic verification, and embedded computing systems. Students interface microcontrollers with physical systems to build automated automation solutions.",
        equipment: ["FPGA Development Kits", "Arduino & Raspberry Pi Kits", "Logic Analyzers", "Microcontroller Interfacing Boards", "PCB Prototyping Systems"],
        objectives: ["Write Hardware Description Languages (VHDL/Verilog)", "Program microcontrollers for sensor interfacing and motor control", "Design and test integrated circuit blocks"]
    }
];

function getLabIcon(index: number) {
    const icons = [Monitor, Radio, ShieldAlert, Cpu, Server, Settings];
    return icons[index % icons.length];
}

export default function IctLaboratory({ department, lab: labProp, allLabs = [], labSlug }: Props) {
    const labsList = allLabs && allLabs.length > 0 ? allLabs : DEFAULT_LABS;
    const initialLab = labProp || (labSlug ? labsList.find(l => l.slug === labSlug) : null) || labsList[0];
    const [selectedLab, setSelectedLab] = useState<LabDetails>(initialLab);

    const equipment = Array.isArray(selectedLab?.equipment) ? selectedLab.equipment : [];
    const objectives = Array.isArray(selectedLab?.objectives) ? selectedLab.objectives : [];

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Laboratories - ${department?.short_name || 'ICT'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={`${department?.short_name || 'ICT'} Laboratory Facilities`} 
                subtitle="State-of-the-Art Labs Powering Hands-on Innovations" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || ICT_DEPT_NAME} activeTab="Laboratories" tabs={ICT_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                
                {/* Introduction */}
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <Settings className="text-emerald-600 w-8 h-8" />
                        Practical Lab Learning
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        The {department?.name || 'ICT Department'} maintains specialized laboratories equipped with modern hardware, servers, and software suites. These labs enable students to bridge the gap between academic theory and industry engineering practices.
                    </p>
                </div>

                {/* Featured Labs Interactive Section */}
                <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                            Explore Facilities
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Left List Tab Selection */}
                            <div className="space-y-3 max-h-[550px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                                {labsList.map((lab, idx) => {
                                    const Icon = lab.icon || getLabIcon(idx);
                                    const isSelected = selectedLab?.name === lab.name || selectedLab?.slug === lab.slug;
                                    return (
                                        <button
                                            key={lab.id ?? idx}
                                            onClick={() => setSelectedLab(lab)}
                                            className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left border transition-all duration-300 cursor-pointer ${
                                                isSelected 
                                                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100'
                                                    : 'bg-gray-50/50 border-gray-100 text-gray-700 hover:bg-emerald-50/40 hover:text-emerald-800'
                                            }`}
                                        >
                                            <div className={`p-2.5 rounded-xl flex-shrink-0 ${isSelected ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                                                <Icon size={20} />
                                            </div>
                                            <span className="text-sm font-bold leading-tight">{lab.name}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Right Detailed Panel */}
                            <div className="lg:col-span-2 bg-gray-50/40 border border-gray-100 rounded-3xl p-8 space-y-8 animate-in fade-in duration-300">
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-950 mb-4">{selectedLab?.name}</h4>
                                    <p className="text-gray-600 text-base leading-relaxed text-justify whitespace-pre-line">{selectedLab?.description}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-200/60">
                                    {/* Equipment */}
                                    <div>
                                        <h5 className="font-extrabold text-[12px] uppercase tracking-widest text-emerald-800 mb-4 flex items-center gap-2">
                                            <Settings size={14} className="text-emerald-600" />
                                            Lab Instruments & Tools
                                        </h5>
                                        {equipment.length > 0 ? (
                                            <ul className="space-y-3">
                                                {equipment.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                                        <span className="text-xs font-semibold text-gray-600 leading-snug">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-xs text-gray-400 italic">High-performance workstations and modern instrument kits.</p>
                                        )}
                                    </div>

                                    {/* Objectives */}
                                    <div>
                                        <h5 className="font-extrabold text-[12px] uppercase tracking-widest text-slate-800 mb-4 flex items-center gap-2">
                                            <CheckCircle size={14} className="text-emerald-600" />
                                            Learning Objectives
                                        </h5>
                                        {objectives.length > 0 ? (
                                            <ul className="space-y-3">
                                                {objectives.map((obj, idx) => (
                                                    <li key={idx} className="flex items-start gap-2.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                                        <span className="text-xs font-semibold text-gray-600 leading-snug">{obj}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-xs text-gray-400 italic">Hands-on practical execution aligned with OBE curriculum.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Complete List of Laboratories */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">List of All Laboratories ({labsList.length})</h3>
                        <div className="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {labsList.map((labItem, idx) => (
                            <div 
                                key={labItem.id ?? idx} 
                                onClick={() => {
                                    setSelectedLab(labItem);
                                    window.scrollTo({ top: 400, behavior: 'smooth' });
                                }}
                                className={`p-6 rounded-2xl border shadow-sm flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer ${
                                    selectedLab?.name === labItem.name 
                                        ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20' 
                                        : 'bg-white border-gray-100'
                                }`}
                            >
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm flex-shrink-0">
                                    {(idx + 1).toString().padStart(2, '0')}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-sm font-bold text-gray-800 leading-snug mb-1 truncate">{labItem.name}</h4>
                                    <p className="text-[11px] text-gray-400">Department of ICT, BAUST</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
