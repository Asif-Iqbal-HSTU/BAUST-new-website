import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { ICT_TABS, ICT_DEPT_NAME, type DeptInfo } from '@/data/ictData';
import { deptIcon, pageText } from '@/lib/dept-icons';
import { Trophy, Users, ExternalLink, GraduationCap } from 'lucide-react';

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

export default function IctAchievements({ department, achievements: achievementsProp }: Props) {
    const list = achievementsProp ?? [];

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Achievements - ${department?.short_name || 'ICT'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={`${department?.short_name || 'ICT'} Notable Achievements`} 
                subtitle={pageText(department, 'achievements_subtitle', "Celebrating Student Innovations and Departmental Milestones")} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || ICT_DEPT_NAME} activeTab="Achievements" tabs={ICT_TABS} />

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
                                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Departmental Highlight</span>
                                        </div>

                                        <h3 className={`text-2xl lg:text-3xl font-bold text-gray-900 mb-6 ${color.title} transition-colors`}>
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

                                        {teamMembers.length > 0 && (
                                            <div className="bg-gray-50/50 rounded-3xl p-6 lg:p-8 border border-gray-100">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <Users size={18} className="text-emerald-600" />
                                                    <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs">{teamTitle || "Honored Team Members"}</h4>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                    {teamMembers.map((member, mIdx) => (
                                                        <div key={mIdx} className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                            <div>
                                                                <p className="text-sm font-bold text-gray-900">{member.name}</p>
                                                                {member.batch && (
                                                                    <p className="text-[10px] font-semibold text-gray-400 uppercase">{member.batch}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {item.link && (
                                            <div className="mt-8 flex justify-end">
                                                <a 
                                                    href={item.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest ${color.link} hover:gap-3 transition-all`}
                                                >
                                                    Read More Details <ExternalLink size={14} />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Resource Section */}
                <div className="mt-24 p-10 lg:p-16 bg-slate-900 rounded-[4rem] text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:scale-125 transition-transform duration-1000">
                        <GraduationCap size={200} />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-3xl font-bold mb-4">Empowering Technical Talents</h3>
                        <p className="text-slate-400 leading-relaxed font-medium">
                            {pageText(department, 'achievements_intro', 'The department supports and encourages student participation in diverse national hackathons, robotic expos, software exhibitions, and research publications to build industry-ready leaders.')}
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
