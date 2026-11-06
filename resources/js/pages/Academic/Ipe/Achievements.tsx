import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { IPE_TABS, IPE_DEPT_NAME, AchievementItem, achievementColor } from '@/data/ipeData';
import { Trophy, Award, Users, ExternalLink } from 'lucide-react';
import { deptIcon, pageText } from '@/lib/dept-icons';

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
    page_texts?: Record<string, string> | null;
}

interface Props {
    department?: DeptInfo | null;
    achievements?: AchievementItem[];
}

export default function IpeAchievements({ department, achievements: achievementsProp }: Props) {
    const list = achievementsProp ?? [];
    const shortName = department?.short_name || 'IPE';

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Achievements - ${department?.short_name || 'IPE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={`${department?.short_name || 'IPE'} Department Achievements`} 
                subtitle={pageText(department, 'achievements_subtitle', "Excellence in International Conferences, Supply Chain Competitions & Research Honors")} 
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
                                <p className="text-sm text-gray-500 mt-0.5">{pageText(department, 'achievements_intro', `Showcasing the achievements of ${shortName} faculty, researchers, and students`)}</p>
                            </div>
                        </div>

                        {list.length === 0 && (
                            <p className="text-center text-gray-400 py-12">No achievements have been published yet.</p>
                        )}

                        <div className="space-y-6">
                            {list.map((ach, idx) => {
                                const color = achievementColor(ach.color);
                                const Icon = deptIcon(ach.icon, Award);
                                const team = ach.team_members ?? [];
                                return (
                                <div key={ach.id ?? idx} className={`p-6 sm:p-8 rounded-2xl border border-gray-100 bg-gray-50/50 ${color.border} hover:bg-emerald-50/20 transition-all duration-300 group`}>
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-2">
                                            {ach.type && (
                                                <span className={`${color.badge} text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full`}>
                                                    {ach.type}
                                                </span>
                                            )}
                                        </div>
                                        <div className={`w-8 h-8 rounded-full ${color.icon} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            <Icon size={18} />
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

                                    {team.length > 0 && (
                                        <div className="mt-4">
                                            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                                                <Users size={13} />
                                                {ach.team_title || 'Team'}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {team.map((m, mIdx) => (
                                                    <span key={mIdx} className="bg-white border border-gray-200 text-xs text-gray-700 font-semibold px-3 py-1 rounded-full">
                                                        {m.name}{m.batch && <span className="text-gray-400 font-medium"> · {m.batch}</span>}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {ach.link && (
                                        <a href={ach.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline">
                                            Learn more <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
