import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { IPE_TABS, IPE_DEPT_NAME } from '@/data/ipeData';
import { Trophy, Award, Calendar } from 'lucide-react';

interface AchievementItem {
    id?: number;
    title: string;
    description?: string | null;
    details?: string | null;
    date?: string | null;
    category?: string | null;
    image?: string | null;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    achievements?: AchievementItem[];
}

const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
    {
        title: 'IEOM International Conference - Best Student Paper Award',
        category: 'Research',
        date: '2025',
        description: 'Undergraduate student research on Lean Six Sigma manufacturing optimization in ready-made garment (RMG) factories was honored with the Best Student Paper Award at the IEOM International Conference.'
    },
    {
        title: 'National Supply Chain Hackathon - Champions',
        category: 'Competition',
        date: '2025',
        description: 'BAUST IPE team clinched First Place nationwide by designing an AI-assisted stochastic inventory replenishment model for pharmaceutical cold chains.'
    },
    {
        title: 'Faculty Recognition: Top 2% Global Scientists',
        category: 'Honor',
        date: '2024',
        description: 'Prof. Dr. Imtiaz Ahmed Choudhury, Dean and Professor of FME/IPE, was recognized in the prestigious Stanford University / Elsevier list of the World’s Top 2% Most-Cited Researchers.'
    }
];

export default function IpeAchievements({ department, achievements: achievementsProp }: Props) {
    const list = achievementsProp && achievementsProp.length > 0 ? achievementsProp : DEFAULT_ACHIEVEMENTS;

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Achievements - ${department?.short_name || 'IPE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={`${department?.short_name || 'IPE'} Department Achievements`} 
                subtitle="Excellence in International Conferences, Supply Chain Competitions & Research Honors" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || IPE_DEPT_NAME} activeTab="Achievements" tabs={IPE_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Recognitions & Honors</h2>
                                <p className="text-sm text-gray-500 mt-0.5">Showcasing the achievements of IPE faculty, researchers, and students</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {list.map((ach, idx) => (
                                <div key={ach.id ?? idx} className="p-6 sm:p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all duration-300 group">
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-2">
                                            {ach.category && (
                                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                                                    {ach.category}
                                                </span>
                                            )}
                                            {ach.date && (
                                                <span className="flex items-center gap-1 text-xs text-gray-400 font-semibold">
                                                    <Calendar size={13} />
                                                    {ach.date}
                                                </span>
                                            )}
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Award size={18} />
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                                        {ach.title}
                                    </h3>

                                    {ach.description && (
                                        <p className="text-sm text-gray-600 leading-relaxed text-justify">
                                            {ach.description}
                                        </p>
                                    )}

                                    {ach.details && (
                                        <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200/50 leading-relaxed italic">
                                            {ach.details}
                                        </p>
                                    )}

                                    {ach.image && (
                                        <div className="mt-4 rounded-xl overflow-hidden max-h-60 border border-gray-100">
                                            <img src={ach.image} alt={ach.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
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
