import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CSE_TABS, CSE_DEPT_NAME, type DeptInfo } from '@/data/cseData';

interface StatItem {
    id?: number;
    value: string;
    label: string;
}

interface Props {
    department?: DeptInfo | null;
    stats?: StatItem[];
}

const DEFAULT_ABOUT = `Computer plays vital and in fact indispensable role in all fields of modern human activities. Consequently, Computer Science and Engineering has established itself as one of the most important branches of engineering. Recent development in computer has a considerable impact on society. It has already expanded to all fields of study starting from genetic engineering to space technology. Recent development in Artificial Intelligence has taken the human history a long way. That day is not very far when man can make machine like him.

The Department of Computer Science and Engineering is one of the pioneer Departments of this Institute providing top-quality education in Computer Science and Engineering (CSE) at its undergraduate program. ICT is the leading booming sector in present day. It is already declared as a thrust sector in Bangladesh. Keeping this in mind the department offers CSE course to produce computer specialist.

A combination of highly qualified faculty member and state of art facilities has established the CSE department as one of the leading and prestigious of the Country.`;

export default function CseAbout({ department, stats }: Props) {
    const activeStats = stats ?? [];
    const aboutText = department?.about || DEFAULT_ABOUT;
    const aboutParagraphs = aboutText.split('\n\n').filter(Boolean);

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`About ${department?.short_name || 'CSE'} - BAUST`} />
            <Navbar />
            <PageHero title={department?.name || "Department of Computer Science and Engineering (CSE)"} subtitle={null} compact={true} />
            <DeptSubNav departmentName={department?.short_name || CSE_DEPT_NAME} activeTab="About" tabs={CSE_TABS} />

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
                                <h2 className="text-2xl font-bold text-gray-900">{department?.name || 'Department of Computer Science and Engineering'}</h2>
                                <p className="text-sm text-gray-500 mt-0.5">{department?.faculty || 'Faculty of Electrical and Computer Engineering (FECE)'}</p>
                            </div>
                        </div>

                        <div className="space-y-5 text-gray-600 leading-8 text-[16px] text-justify">
                            {aboutParagraphs.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}
                        </div>

                        {/* Quick Stats */}
                        {activeStats.length > 0 && (
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {activeStats.map((stat, idx) => (
                                <div key={stat.id ?? idx} className="text-center p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100/50">
                                    <p className="text-2xl font-extrabold text-emerald-700">{stat.value}</p>
                                    <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
