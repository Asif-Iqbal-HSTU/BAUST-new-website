import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { IPE_TABS, IPE_DEPT_NAME } from '@/data/ipeData';

interface StatItem {
    id?: number;
    value: string;
    label: string;
}

interface DeptInfo {
    id: number;
    slug: string;
    name: string;
    short_name: string;
    faculty?: string | null;
    tagline?: string | null;
    established?: string | null;
    about?: string | null;
    description?: string | null;
}

interface Props {
    department?: DeptInfo | null;
    stats?: StatItem[];
}

const DEFAULT_STATS: StatItem[] = [
    { value: '350+', label: 'Current Students' },
    { value: '24+', label: 'Faculty & Staff' },
    { value: '12', label: 'Specialized Labs' },
    { value: '96%', label: 'Placement & Higher Studies' },
];

const DEFAULT_ABOUT = `Industrial and Production Engineering (IPE) is a globally valued engineering discipline that optimizes processes, improves workplace productivity, and ensures operational quality across modern manufacturing and service sectors. The Department of IPE at Bangladesh Army University of Science and Technology (BAUST) began its journey in 2016 and has established itself as an engineering education leader.

The department offers a 4-year B.Sc. Engineering curriculum blending manufacturing processes, operations research, supply chain management, ergonomics, and quality control. With 12 dedicated laboratories and an active student chapter (IEOM), our students acquire real-world problem-solving skills suited for leading multinational corporations and research institutions.

Our graduates are equipped with Outcome-Based Education (OBE) principles and technical mastery in CAD/CAM, ergonomics simulation, operations modeling, and Lean Six Sigma methodologies, allowing immediate placement across garments/textile supply chains, electronics manufacturing, pharmaceuticals, logistics, and foreign higher studies.`;

export default function IpeAbout({ department, stats }: Props) {
    const activeStats = (stats && stats.length > 0) ? stats : DEFAULT_STATS;
    const aboutText = department?.about || department?.description || DEFAULT_ABOUT;
    const aboutParagraphs = aboutText.split('\n\n').filter(Boolean);

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`About ${department?.short_name || 'IPE'} - BAUST`} />
            <Navbar />
            <PageHero title={department?.name || "Department of Industrial and Production Engineering (IPE)"} subtitle={null} compact={true} />
            <DeptSubNav departmentName={department?.short_name || IPE_DEPT_NAME} activeTab="About" tabs={IPE_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-14">

                        {/* Section Title */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{department?.name || 'Department of Industrial and Production Engineering'}</h2>
                                <p className="text-sm text-gray-500 mt-0.5">{department?.faculty || 'Faculty of Mechanical Engineering (FME)'}</p>
                            </div>
                        </div>

                        <div className="space-y-5 text-gray-600 leading-8 text-[16px] text-justify">
                            {aboutParagraphs.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {activeStats.map((stat, idx) => (
                                <div key={stat.id ?? idx} className="text-center p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100/50">
                                    <p className="text-2xl font-extrabold text-emerald-700">{stat.value}</p>
                                    <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
