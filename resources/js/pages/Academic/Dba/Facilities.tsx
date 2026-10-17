import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { DBA_TABS, DBA_DEPT_NAME } from '@/data/dbaData';
import { Monitor, BookOpen, Presentation, CheckCircle, ArrowRight, ShieldCheck, Laptop, Users, Building } from 'lucide-react';

interface FacilityItem {
    id?: number;
    name: string;
    slug: string;
    description: string;
    images?: string[] | string | null;
    equipment?: string[] | string | null;
    objectives?: string[] | string | null;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    facilities: FacilityItem[];
    selectedFacility?: FacilityItem | null;
}

const DEFAULT_FACILITIES: FacilityItem[] = [
    {
        name: "Smart Classrooms",
        slug: "smart-classrooms",
        description: "Modern multimedia air-conditioned smart classrooms equipped with interactive smartboards, high-definition projectors, sound systems, and ergonomic seating to facilitate interactive case discussions and executive presentations.",
        images: ["/images/departments/dba/slider/slide1.jpeg"],
        equipment: ["Interactive Smartboards & Multi-touch Displays", "High-Definition Digital Projectors", "Ergonomic Executive Seating Layout", "High-speed Wi-Fi Connectivity", "Acoustic Audio Systems & Wireless Microphones"],
        objectives: ["Facilitate interactive case study discussions", "Enable hybrid lecture recording and remote corporate guest lectures", "Provide immersive multimedia business presentations"]
    },
    {
        name: "Computer & Business Analytics Lab",
        slug: "computer-business-analytics-lab",
        description: "State-of-the-art computer laboratory dedicated to statistical data analysis, business intelligence, financial modeling, and econometric research. Students gain hands-on training with contemporary enterprise tools.",
        images: ["/images/departments/dba/slider/slide2.jpeg"],
        equipment: ["45 High-performance Workstations", "SPSS, STATA & Econometric Modeling Software", "Tableau & Power BI for Business Intelligence", "Python and R environments for Data Science", "Gigabit LAN & Secure Cloud Access"],
        objectives: ["Hands-on empirical research and quantitative modeling", "Data visualization and financial analytics simulation", "Enterprise Resource Planning (ERP) training"]
    },
    {
        name: "Seminar Library & Case Study Room",
        slug: "seminar-library",
        description: "A specialized departmental library housing over 1,500 textbooks, reference manuals, national and international business journals, Harvard Business Review cases, and quiet study pods for intensive collaborative case solving.",
        images: ["/images/departments/dba/slider/slide3.jpeg"],
        equipment: ["1,500+ Specialized Business Books & Journals", "Harvard & IBA Case Study Collections", "Quiet Study Stations & Collaborative Discussion Tables", "Digital Catalog and e-Library Terminals"],
        objectives: ["Support in-depth academic literature review and thesis work", "Provide real-world business case study analysis space", "Foster self-directed reading and corporate awareness"]
    }
];

export default function DbaFacilities({ department, facilities, selectedFacility }: Props) {
    const list = (facilities && facilities.length > 0) ? facilities : DEFAULT_FACILITIES;
    const currentFacility = selectedFacility || list[0];

    const parseList = (val: any): string[] => {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) return parsed;
        } catch (e) {
            return String(val).split(',').map(s => s.trim()).filter(Boolean);
        }
        return [];
    };

    const images = parseList(currentFacility.images);
    const equipment = parseList(currentFacility.equipment);
    const objectives = parseList(currentFacility.objectives);

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${currentFacility?.name || 'Facilities'} - DBA - BAUST`} />
            <Navbar />
            <PageHero 
                title={`${department?.short_name || 'DBA'} Departmental Facilities`} 
                subtitle="Cutting-Edge Infrastructure Designed for Executive Learning and Research" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || DBA_DEPT_NAME} activeTab="Facilities" tabs={DBA_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

                    {/* Sidebar: List of Facilities */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Building className="text-emerald-600 w-5 h-5" />
                                All Facilities
                            </h3>
                            <nav className="space-y-2">
                                {list.map((fac) => {
                                    const isSelected = fac.slug === currentFacility.slug;
                                    return (
                                        <Link
                                            key={fac.slug}
                                            href={`/dba/facilities/${fac.slug}`}
                                            className={`flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all ${
                                                isSelected
                                                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                                                    : 'bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
                                            }`}
                                        >
                                            <span className="line-clamp-1">{fac.name}</span>
                                            <ArrowRight size={14} className={isSelected ? 'text-white' : 'text-gray-400'} />
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Quick Contact Box */}
                        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-3xl p-6 text-white shadow-md">
                            <h4 className="font-bold text-sm mb-2">Facility Coordinator</h4>
                            <p className="text-xs text-emerald-100 leading-relaxed mb-4">
                                For laboratory bookings, research access, or smart classroom reservations, please contact the DBA Departmental Office.
                            </p>
                            <a
                                href="mailto:dba@baust.edu.bd"
                                className="inline-block bg-white text-emerald-900 text-xs font-black px-4 py-2 rounded-xl hover:bg-emerald-50 transition-colors"
                            >
                                Contact DBA Office
                            </a>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                            <div className="p-8 lg:p-12 space-y-8">

                                {/* Facility Header */}
                                <div>
                                    <span className="bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                                        Department Infrastructure
                                    </span>
                                    <h2 className="text-3xl font-black text-gray-900 mt-3 mb-4">
                                        {currentFacility.name}
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed text-base text-justify">
                                        {currentFacility.description}
                                    </p>
                                </div>

                                {/* Images Carousel/Grid */}
                                {images.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {images.map((img, idx) => (
                                            <div key={idx} className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 group aspect-video">
                                                <img
                                                    src={img}
                                                    alt={`${currentFacility.name} photo ${idx + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    onError={(e) => {
                                                        e.currentTarget.src = "/images/departments/dba/slider/slide1.jpeg";
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Equipment & Objectives */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                                    {equipment.length > 0 && (
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                                                <Laptop className="w-4 h-4 text-emerald-600" />
                                                Equipment & Facilities Available
                                            </h4>
                                            <ul className="space-y-2.5">
                                                {equipment.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                                                        <CheckCircle size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                                                        <span className="font-medium">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {objectives.length > 0 && (
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                                                <Presentation className="w-4 h-4 text-blue-600" />
                                                Key Learning Objectives
                                            </h4>
                                            <ul className="space-y-2.5">
                                                {objectives.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 bg-blue-50/40 p-3 rounded-xl border border-blue-100/50">
                                                        <CheckCircle size={15} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                                        <span className="font-medium">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
