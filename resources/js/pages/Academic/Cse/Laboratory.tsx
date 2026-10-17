import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CSE_TABS, CSE_DEPT_NAME } from '@/data/cseData';
import { Cpu, Server, Network, Terminal, Settings, Info, CheckCircle, Monitor, ArrowRight } from 'lucide-react';

interface LabData {
    id?: number;
    name: string;
    description: string;
    images: string[];
    equipment: string[];
    objectives: string[];
    slug: string;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    lab?: LabData | null;
    allLabs?: LabData[];
    labSlug: string;
}

const DEFAULT_LABS: Record<string, LabData> = {
    'programming-os': {
        slug: 'programming-os',
        name: "Computer Programming and Operating System Lab",
        description: "This laboratory is designed for the students to perform programming and system-level tasks. It provides a robust environment for learning C/C++, Java, Python, and Operating System concepts such as shell scripting and kernel management.",
        images: [
            "/images/departments/cse/laboratory/computer-programming-and-operating-system-lab/2.jpg",
            "/images/departments/cse/laboratory/computer-programming-and-operating-system-lab/4.jpg"
        ],
        equipment: ["High-performance Workstations", "Core i7/i9 Processors", "Linux/Unix & Windows Environments", "Integrated Development Environments (IDEs)"],
        objectives: ["Mastering core programming languages", "Learning OS kernels and shell scripting", "Developing complex algorithms", "Collaborative coding practices"]
    },
    'database': {
        slug: 'database',
        name: "Database and Data Warehouse Lab",
        description: "Equipped with industry-standard database management systems, this lab allows students to design, implement, and manage complex databases. It also focuses on data warehousing and big data analytics.",
        images: [
            "/images/departments/cse/laboratory/database-and-data-warehouse-lab/2.jpg"
        ],
        equipment: ["Oracle/MySQL/PostgreSQL Servers", "Data Mining Tools", "Cloud Database Access", "Large Display Monitors for Query Analysis"],
        objectives: ["Designing Relational Databases", "Executing advanced SQL queries", "Implementing Data Warehousing solutions", "Understanding NoSQL and Big Data"]
    },
    'digital-embedded': {
        slug: 'digital-embedded',
        name: "Digital and Embedded System Lab",
        description: "Focuses on the intersection of hardware and software. Students work with digital logic kits, FPGA boards, and various embedded systems to build real-world applications.",
        images: [
            "/images/departments/cse/laboratory/digital-and-embedded-system-lab/2.jpg"
        ],
        equipment: ["Digital Logic Training Kits", "FPGA Development Boards", "Oscilloscopes", "Logic Analyzers", "Soldering Stations"],
        objectives: ["Designing Digital Logic Circuits", "Programming Embedded Controllers", "FPGA Prototyping", "Hardware-Software Integration"]
    },
    'network-hardware': {
        slug: 'network-hardware',
        name: "Network and Hardware Lab",
        description: "A specialized lab for computer networking and hardware maintenance. Students learn to configure routers, switches, and understand the physical architecture of computer systems.",
        images: [
            "/images/departments/cse/laboratory/network-and-hardware-lab/2.jpg",
            "/images/departments/cse/laboratory/network-and-hardware-lab/4.jpg"
        ],
        equipment: ["Cisco Routers and Switches", "Network Cable Testers", "Server Racks", "PC Hardware Components for Assembly", "Wireless Networking Kits"],
        objectives: ["Configuring LAN/WAN networks", "Network Security Implementation", "PC Hardware troubleshooting", "Learning OSI and TCP/IP protocols"]
    },
    'microprocessor': {
        slug: 'microprocessor',
        name: "Microprocessor and Interfacing Lab",
        description: "Provides hands-on experience with microprocessor kits (8086/8088) and microcontroller interfacing. Students learn assembly language programming and how to interface sensors and motors.",
        images: [
            "/images/departments/cse/laboratory/microprocessor-and-interfacing-lab/2.jpg"
        ],
        equipment: ["8086/8088 Microprocessor Kits", "Arduino & Raspberry Pi Boards", "Sensor Interfacing Kits", "Stepper Motor Modules", "Function Generators"],
        objectives: ["Writing Assembly Language Programs", "Interfacing hardware with microprocessors", "Building robotic prototypes", "Understanding Computer Architecture"]
    }
};

export default function Laboratory({ department, lab: labProp, allLabs = [], labSlug }: Props) {
    const lab = labProp || DEFAULT_LABS[labSlug] || DEFAULT_LABS['programming-os'];
    const images = Array.isArray(lab.images) ? lab.images : [];
    const equipment = Array.isArray(lab.equipment) ? lab.equipment : [];
    const objectives = Array.isArray(lab.objectives) ? lab.objectives : [];

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${lab.name} - ${department?.short_name || 'CSE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={lab.name} 
                subtitle="Hands-on Learning in State-of-the-Art Facilities" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.name || CSE_DEPT_NAME} activeTab={lab.name} tabs={CSE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Side */}
                    <div className="lg:col-span-2">
                        <section className="mb-12">
                            <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                <Info className="text-emerald-600" />
                                About the Laboratory
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm whitespace-pre-line">
                                {lab.description}
                            </p>
                        </section>

                        {images.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <Monitor className="text-emerald-600" />
                                    Lab Gallery
                                </h2>
                                <div className={`grid gap-6 ${images.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                    {images.map((img, idx) => (
                                        <div key={idx} className="group relative rounded-[2.5rem] overflow-hidden bg-gray-100 border border-gray-100 shadow-lg aspect-video">
                                            <img 
                                                src={img} 
                                                alt={`${lab.name} View ${idx + 1}`} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar / Sidebar Info */}
                    <div className="space-y-8">
                        {/* Equipment List */}
                        {equipment.length > 0 && (
                            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                                        <Settings size={20} />
                                    </div>
                                    <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm">Lab Equipment</h3>
                                </div>
                                <ul className="space-y-4">
                                    {equipment.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Objectives List */}
                        {objectives.length > 0 && (
                            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl">
                                <div className="flex items-center gap-3 mb-6 text-emerald-400">
                                    <CheckCircle size={24} />
                                    <h3 className="font-bold uppercase tracking-widest text-sm">Learning Objectives</h3>
                                </div>
                                <ul className="space-y-5">
                                    {objectives.map((obj, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded-md border border-emerald-800/50">
                                                0{idx + 1}
                                            </span>
                                            <span className="text-sm text-slate-300 font-medium leading-relaxed">{obj}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* All Labs Navigation */}
                        {allLabs.length > 0 && (
                            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 px-2">Other Department Labs</h4>
                                <div className="space-y-1">
                                    {allLabs.map(l => (
                                        <Link
                                            key={l.slug}
                                            href={`/cse/laboratories/${l.slug}`}
                                            className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors ${
                                                l.slug === lab.slug
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            <span className="truncate pr-2">{l.name}</span>
                                            <ArrowRight size={14} className="flex-shrink-0" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
