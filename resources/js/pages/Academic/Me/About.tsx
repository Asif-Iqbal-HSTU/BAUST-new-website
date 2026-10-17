import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { ME_TABS, ME_DEPT_NAME } from '@/data/meData';

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
    { value: '400+', label: 'Current Students' },
    { value: '28+', label: 'Faculty & Staff' },
    { value: '14', label: 'Laboratories & Workshops' },
    { value: '95%', label: 'Placement & Higher Studies' },
];

const DEFAULT_ABOUT = `Mechanical Engineering (ME) is one of the most fundamental, versatile, and essential branches of engineering, with applications spanning automobile industries, power generation, aerospace systems, manufacturing processes, and robotics. The Department of Mechanical Engineering at Bangladesh Army University of Science and Technology (BAUST), Saidpur, commenced its journey in 2015 with a mission to develop skilled, innovative, and ethically grounded engineers.

The department offers a comprehensive 4-year undergraduate B.Sc. in Mechanical Engineering degree covering thermo-fluid sciences, mechanical design, manufacturing technology, mechatronics, and solid mechanics. Combining deep theoretical foundations with practical laboratory training across 14 state-of-the-art facilities, our students are prepared to lead industrial automation and national engineering developments.

Our curriculum combines Outcome-Based Education (OBE) with design workshops and industry internships, preparing graduates for key roles in energy industries, automotive engineering, manufacturing plants, and advanced research institutions worldwide.`;

export default function MeAbout({ department, stats }: Props) {
    const activeStats = (stats && stats.length > 0) ? stats : DEFAULT_STATS;
    const aboutText = department?.about || department?.description || DEFAULT_ABOUT;
    const aboutParagraphs = aboutText.split('\n\n').filter(Boolean);

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`About ${department?.short_name || 'ME'} - BAUST`} />
            <Navbar />
            <PageHero title={department?.name || "Department of Mechanical Engineering (ME)"} subtitle={null} compact={true} />
            <DeptSubNav departmentName={department?.short_name || ME_DEPT_NAME} activeTab="About" tabs={ME_TABS} />

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
                                <h2 className="text-2xl font-bold text-gray-900">{department?.name || 'Department of Mechanical Engineering'}</h2>
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
