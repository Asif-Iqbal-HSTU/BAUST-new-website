import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { EEE_TABS, EEE_DEPT_NAME } from '@/data/eeeData';
import { Trophy, Award, Users, ExternalLink } from 'lucide-react';
import { deptIcon, pageText } from '@/lib/dept-icons';

interface TeamMember {
    name?: string | null;
    batch?: string | null;
}

interface AchievementItem {
    id?: number;
    title: string;
    type?: string | null;
    icon?: string | null;
    color?: string | null;
    description?: string | null;
    details?: string | null;
    team_title?: string | null;
    team_members?: (TeamMember | string)[] | null;
    link?: string | null;
}

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

const COLOR_CLASSES: Record<string, { tag: string; icon: string }> = {
    emerald: { tag: 'bg-emerald-100 text-emerald-800', icon: 'bg-emerald-50 text-emerald-600' },
    blue: { tag: 'bg-blue-100 text-blue-800', icon: 'bg-blue-50 text-blue-600' },
    purple: { tag: 'bg-purple-100 text-purple-800', icon: 'bg-purple-50 text-purple-600' },
    amber: { tag: 'bg-amber-100 text-amber-800', icon: 'bg-amber-50 text-amber-600' },
    pink: { tag: 'bg-pink-100 text-pink-800', icon: 'bg-pink-50 text-pink-600' },
    rose: { tag: 'bg-rose-100 text-rose-800', icon: 'bg-rose-50 text-rose-600' },
    indigo: { tag: 'bg-indigo-100 text-indigo-800', icon: 'bg-indigo-50 text-indigo-600' },
};

export default function EeeAchievements({ department, achievements: achievementsProp }: Props) {
    const list = achievementsProp ?? [];
    const shortName = department?.short_name || 'EEE';

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Achievements - ${department?.short_name || 'EEE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={`${department?.short_name || 'EEE'} Department Achievements`} 
                subtitle={pageText(department, 'achievements_subtitle', "Excellence in Competitions, Research Innovations & National Recognitions")} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || EEE_DEPT_NAME} activeTab="Achievements" tabs={EEE_TABS} />

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
                            <p className="text-center text-gray-400 py-10">No achievements published yet.</p>
                        )}

                        <div className="space-y-6">
                            {list.map((ach, idx) => {
                                const Icon = deptIcon(ach.icon, Award);
                                const color = COLOR_CLASSES[ach.color ?? ''] ?? COLOR_CLASSES.emerald;
                                const team = (ach.team_members ?? [])
                                    .map((m) => (typeof m === 'string' ? { name: m, batch: null } : m))
                                    .filter((m) => m?.name);
                                return (
                                <div key={ach.id ?? idx} className="p-6 sm:p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all duration-300 group">
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-2">
                                            {ach.type && (
                                                <span className={`${color.tag} text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full`}>
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
                                            <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 mb-2">
                                                <Users size={13} />
                                                {ach.team_title || 'Team'}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {team.map((m, mIdx) => (
                                                    <span key={mIdx} className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                                                        {m.name}
                                                        {m.batch && <span className="text-gray-400 font-medium"> · {m.batch}</span>}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {ach.link && (
                                        <a href={ach.link} target={ach.link.startsWith('/') ? undefined : '_blank'} rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline">
                                            Learn more
                                            <ExternalLink size={13} />
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
