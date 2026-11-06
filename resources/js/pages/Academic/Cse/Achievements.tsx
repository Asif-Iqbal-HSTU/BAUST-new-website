import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CSE_TABS, CSE_DEPT_NAME, type DeptInfo } from '@/data/cseData';
import { deptIcon, pageText } from '@/lib/dept-icons';
import { Trophy, Users, ExternalLink } from 'lucide-react';

interface TeamMember {
    name: string;
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
    team_members?: TeamMember[] | null;
    link?: string | null;
}

interface Props {
    department?: DeptInfo | null;
    achievements?: AchievementItem[];
}

// Static class names so Tailwind keeps them; keys match the admin colour options.
const COLOR_CLASSES: Record<string, { icon: string; tag: string; border: string; title: string; link: string }> = {
    emerald: { icon: 'bg-emerald-50 text-emerald-600', tag: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-500', title: 'group-hover:text-emerald-700', link: 'text-emerald-600 hover:text-emerald-700' },
    blue: { icon: 'bg-blue-50 text-blue-600', tag: 'bg-blue-100 text-blue-700', border: 'border-blue-500', title: 'group-hover:text-blue-700', link: 'text-blue-600 hover:text-blue-700' },
    purple: { icon: 'bg-purple-50 text-purple-600', tag: 'bg-purple-100 text-purple-700', border: 'border-purple-500', title: 'group-hover:text-purple-700', link: 'text-purple-600 hover:text-purple-700' },
    amber: { icon: 'bg-amber-50 text-amber-600', tag: 'bg-amber-100 text-amber-700', border: 'border-amber-500', title: 'group-hover:text-amber-700', link: 'text-amber-600 hover:text-amber-700' },
    pink: { icon: 'bg-pink-50 text-pink-600', tag: 'bg-pink-100 text-pink-700', border: 'border-pink-500', title: 'group-hover:text-pink-700', link: 'text-pink-600 hover:text-pink-700' },
    rose: { icon: 'bg-rose-50 text-rose-600', tag: 'bg-rose-100 text-rose-700', border: 'border-rose-500', title: 'group-hover:text-rose-700', link: 'text-rose-600 hover:text-rose-700' },
    indigo: { icon: 'bg-indigo-50 text-indigo-600', tag: 'bg-indigo-100 text-indigo-700', border: 'border-indigo-500', title: 'group-hover:text-indigo-700', link: 'text-indigo-600 hover:text-indigo-700' },
};

export default function Achievements({ department, achievements: achievementsProp }: Props) {
    const list = achievementsProp ?? [];

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Achievements - ${department?.short_name || 'CSE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title="Notable Achievements" 
                subtitle={pageText(department, 'achievements_intro', 'Celebrating Excellence and Innovation in Engineering')} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.name || CSE_DEPT_NAME} activeTab="Achievements" tabs={CSE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {list.length === 0 && (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center text-gray-400">
                        <Trophy className="w-12 h-12 mx-auto mb-4 opacity-40" />
                        <p className="text-lg font-medium">Achievements will be published soon.</p>
                    </div>
                )}

                {/* Achievements List */}
                <div className="space-y-16">
                    {list.map((item, idx) => {
                        const IconComponent = deptIcon(item.icon, Trophy);
                        const color = COLOR_CLASSES[item.color || ''] || COLOR_CLASSES.emerald;
                        const teamMembers = Array.isArray(item.team_members) ? item.team_members : [];
                        const teamTitle = item.team_title;

                        return (
                            <div key={item.id ?? idx} className="relative group">
                                <div className="flex flex-col lg:flex-row gap-10 bg-white rounded-[3rem] p-8 lg:p-12 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                                    {/* Icon Side */}
                                    <div className={`flex-shrink-0 w-24 h-24 lg:w-32 lg:h-32 rounded-[2rem] ${color.icon} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                        <IconComponent size={56} className="lg:size-14" />
                                    </div>

                                    {/* Content Side */}
                                    <div className="flex-grow">
                                        <div className="flex flex-wrap items-center gap-3 mb-6">
                                            {item.type && (
                                                <span className={`px-4 py-1 rounded-full ${color.tag} text-[10px] font-black uppercase tracking-widest`}>
                                                    {item.type}
                                                </span>
                                            )}
                                            <div className="h-px w-12 bg-gray-200" />
                                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Notable Achievement</span>
                                        </div>

                                        <h3 className={`text-2xl lg:text-3xl font-black text-gray-900 mb-6 ${color.title} transition-colors`}>
                                            {item.title}
                                        </h3>

                                        {item.description && (
                                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                                {item.description}
                                            </p>
                                        )}

                                        {item.details && (
                                            <div className={`p-6 rounded-2xl bg-gray-50 border-l-4 ${color.border} mb-6 text-sm text-gray-500 italic leading-relaxed`}>
                                                {item.details}
                                            </div>
                                        )}

                                        {/* Team Members */}
                                        {teamMembers.length > 0 && (
                                            <div className="mt-8 pt-8 border-t border-gray-100">
                                                <div className="flex items-center gap-2 mb-4 text-xs font-black uppercase tracking-widest text-emerald-600">
                                                    <Users size={16} />
                                                    <span>{teamTitle || "Honored Members"}</span>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                                    {teamMembers.map((m, mIdx) => (
                                                        <div key={mIdx} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                                                            <p className="text-sm font-bold text-gray-900">{m.name}</p>
                                                            {m.batch && <p className="text-xs text-gray-400 font-medium">{m.batch}</p>}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* External Proof / News Link */}
                                        {item.link && (
                                            <div className="mt-8 flex justify-end">
                                                <a 
                                                    href={item.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest ${color.link} hover:gap-3 transition-all`}
                                                >
                                                    Read Press Release <ExternalLink size={14} />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            <Footer />
        </div>
    );
}
