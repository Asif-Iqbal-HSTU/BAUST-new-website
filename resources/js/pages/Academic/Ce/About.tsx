import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';

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
}

interface Props {
    department?: DeptInfo | null;
    stats?: StatItem[];
}

const DEFAULT_STATS: StatItem[] = [
    { value: '450+', label: 'Undergraduate Students' },
    { value: '28+', label: 'Faculty & Staff Members' },
    { value: '11', label: 'Specialized Laboratories' },
    { value: '100%', label: 'OBE Aligned Curriculum' },
];

const DEFAULT_ABOUT = `Civil engineering is the backbone of modern civilization—one of the oldest and most far-reaching disciplines in engineering. Civil engineers are the architects of infrastructure, shaping the physical world while ensuring environmental sustainability. From towering skyscrapers to sprawling dams, from cutting-edge suspension bridges to offshore drilling platforms, and from flood management to environmental protection, civil engineers make it all possible. They tackle challenges like earthquake resistance, pollution control, and sustainable development, all while managing projects and ensuring quality. In essence, civil engineers shape the history of nations and design a future built to last.

The Department of Civil Engineering (CE) at BAUST embarked on its mission in December 2019, with the goal of producing top-tier civil engineers. Offering a comprehensive four-year B.Sc. degree in Civil Engineering, the department embraces a clear vision backed by strategic missions. Our Outcome-Based Education (OBE) system and cutting-edge curriculum cover the full spectrum of civil engineering fields, empowering students to specialize in areas that align with their career goals. Students first build a strong foundation in basic sciences, mathematics, humanities, social sciences, and management before diving into core civil engineering subjects. Specializations offered include Structural Engineering, Environmental Engineering, Geotechnical Engineering, Transportation Engineering, and Water Resources Engineering.`;

export default function CeAbout({ department, stats }: Props) {
    const activeStats = (stats && stats.length > 0) ? stats : DEFAULT_STATS;
    const aboutText = department?.about || DEFAULT_ABOUT;
    const aboutParagraphs = aboutText.split('\n\n').filter(Boolean);

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`About ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero title={department?.name || "Department of Civil Engineering (CE)"} subtitle={null} compact={true} />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="About" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-14">

                        {/* Section Title */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{department?.name || 'Department of Civil Engineering'}</h2>
                                <p className="text-sm text-gray-500 mt-0.5">{department?.faculty || 'Faculty of Civil Engineering (FCE)'}</p>
                            </div>
                        </div>

                        <div className="space-y-6 text-gray-600 leading-8 text-[16px] text-justify">
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
