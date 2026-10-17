import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { DBA_TABS, DBA_DEPT_NAME } from '@/data/dbaData';
import { Building2, Award, Users, BookOpen, CheckCircle, TrendingUp, Compass, Target } from 'lucide-react';

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
    duration?: string | null;
    credits?: string | null;
    degree?: string | null;
    accreditation?: string | null;
}

interface Props {
    department?: DeptInfo | null;
    stats?: StatItem[];
}

const DEFAULT_STATS: StatItem[] = [
    { value: '500+', label: 'In Corporates & Banks' },
    { value: '24', label: 'Faculty Members' },
    { value: '23+', label: 'Graduated Batches' },
    { value: '100%', label: 'UGC Approved' },
];

export default function DbaAbout({ department, stats }: Props) {
    const activeStats = (stats && stats.length > 0) ? stats : DEFAULT_STATS;
    const aboutText = department?.about || `The Department of Business Administration (DBA) at Bangladesh Army University of Science and Technology (BAUST), Saidpur, is committed to creating visionary business leaders, entrepreneurs, and forward-thinking corporate managers. In an era characterized by dynamic global markets, rapid digital transformations, and competitive corporate ecosystems, the study of business administration stands as an essential pillar of national and international socio-economic development.

Our Bachelor of Business Administration (BBA) program is designed according to modern Outcome-Based Education (OBE) principles. The curriculum bridges rigorous foundational theory with real-world case studies, corporate internships, financial modeling, digital business management, and strategic marketing methodologies. 

With experienced academic faculty members, modern smart multimedia classrooms, a dedicated Business Analytics computer lab, and an active business club culture, DBA fosters an environment where students gain both intellectual rigor and pragmatic leadership acumen.`;

    const aboutParagraphs = aboutText.split('\n\n').filter(Boolean);

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`About ${department?.short_name || 'DBA'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={department?.name || "Department of Business Administration (DBA)"} 
                subtitle="Nurturing Ethical Leadership, Strategic Innovation, and Managerial Excellence" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || DBA_DEPT_NAME} activeTab="About DBA" tabs={DBA_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-14">

                        {/* Section Title */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0 shadow-inner">
                                <Building2 className="w-7 h-7 text-emerald-700" />
                            </div>
                            <div>
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{department?.name || 'Department of Business Administration'}</h2>
                                <p className="text-sm font-semibold text-emerald-700 mt-1">{department?.faculty || 'Faculty of Business Studies'}</p>
                            </div>
                        </div>

                        {/* Text Body */}
                        <div className="space-y-6 text-gray-600 leading-8 text-[16px] text-justify">
                            {aboutParagraphs.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}
                        </div>

                        {/* Key Pillars */}
                        <div className="mt-12 pt-10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-4">
                                <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-md">
                                    <Target className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">Outcome-Based Curriculum</h4>
                                    <p className="text-xs text-gray-600 mt-1">Accredited structure focused on industry readiness and analytical problem solving.</p>
                                </div>
                            </div>
                            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-start gap-4">
                                <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">Corporate Linkages</h4>
                                    <p className="text-xs text-gray-600 mt-1">Strong relationships with leading financial institutions, RMG, and multinational corps.</p>
                                </div>
                            </div>
                            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-start gap-4">
                                <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-md">
                                    <Compass className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">Holistic Grooming</h4>
                                    <p className="text-xs text-gray-600 mt-1">Active business competitions, case study simulations, and leadership symposiums.</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {activeStats.map((stat, idx) => (
                                <div key={stat.id ?? idx} className="text-center p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100/50 hover:bg-emerald-100/60 transition-colors">
                                    <p className="text-2xl lg:text-3xl font-extrabold text-emerald-700">{stat.value}</p>
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
