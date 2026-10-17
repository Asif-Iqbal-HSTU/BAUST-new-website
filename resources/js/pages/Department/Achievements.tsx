import React from 'react';
import DeptPageShell from '@/custom_components/DeptPageShell';
import { DeptPageProps, deptShort } from '@/data/departmentData';
import { Trophy, Award, Users, Star, ExternalLink, ShieldCheck, Cpu, Code, Lightbulb, GraduationCap } from 'lucide-react';

interface TeamMember {
    name: string;
    batch?: string;
}

interface AchievementItem {
    id?: number;
    title: string;
    type?: string | null;
    icon?: string | any;
    color?: string | null;
    description?: string | null;
    details?: string | null;
    team_title?: string | null;
    team?: {
        title: string;
        members: TeamMember[];
    };
    team_members?: TeamMember[] | null;
    link?: string | null;
}

interface Props extends DeptPageProps {
    achievements?: AchievementItem[];
}

const ICON_MAP: Record<string, any> = {
    ShieldCheck,
    Cpu,
    Code,
    Lightbulb,
    Star,
    Trophy,
    Award,
    Users,
    GraduationCap,
};

export default function DepartmentAchievements({ department, tabs, achievements = [] }: Props) {
    const short = deptShort(department);
    const list = achievements;
    const teamMembersTotal = list.reduce((n, a) => n + (a.team_members?.length ?? 0), 0);

    return (
        <DeptPageShell
            department={department}
            tabs={tabs}
            activeTab="Achievements"
            title={`Achievements - ${short}`}
            heroTitle="Notable Achievements"
            heroSubtitle={`Celebrating Excellence at the Department of ${short}`}
        >

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                            <Trophy size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2">{list.length}</h3>
                        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Notable Achievements</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2">{department.accreditation_badge || 'UGC'}</h3>
                        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">{department.accreditation_badge ? 'Accreditation' : 'Approved Programs'}</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6">
                            <Users size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2">{teamMembersTotal > 0 ? teamMembersTotal : (department.established || '-')}</h3>
                        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">{teamMembersTotal > 0 ? 'Students Recognized' : 'Established'}</p>
                    </div>
                </div>

                {list.length === 0 && (
                    <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <Trophy size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Achievements Coming Soon</h3>
                        <p className="text-gray-500">Notable achievements of our students and faculty will be published here.</p>
                    </div>
                )}

                {/* Achievements List */}
                <div className="space-y-16">
                    {list.map((item, idx) => {
                        const IconComponent = (typeof item.icon === 'string' ? ICON_MAP[item.icon] : item.icon) || Trophy;
                        const color = item.color || 'emerald';
                        const teamMembers = item.team_members || item.team?.members || [];
                        const teamTitle = item.team_title || item.team?.title;

                        return (
                            <div key={item.id ?? idx} className="relative group">
                                <div className="flex flex-col lg:flex-row gap-10 bg-white rounded-[3rem] p-8 lg:p-12 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                                    {/* Icon Side */}
                                    <div className="flex-shrink-0 w-24 h-24 lg:w-32 lg:h-32 rounded-[2rem] bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <IconComponent size={56} className="lg:size-14" />
                                    </div>

                                    {/* Content Side */}
                                    <div className="flex-grow">
                                        <div className="flex flex-wrap items-center gap-3 mb-6">
                                            {item.type && (
                                                <span className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest">
                                                    {item.type}
                                                </span>
                                            )}
                                            <div className="h-px w-12 bg-gray-200" />
                                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Notable Achievement</span>
                                        </div>

                                        <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-6 group-hover:text-emerald-700 transition-colors">
                                            {item.title}
                                        </h3>

                                        {item.description && (
                                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                                {item.description}
                                            </p>
                                        )}

                                        {item.details && (
                                            <div className="p-6 rounded-2xl bg-gray-50 border-l-4 border-emerald-500 mb-6 text-sm text-gray-500 italic leading-relaxed">
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
                                                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 hover:gap-3 transition-all"
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
        </DeptPageShell>
    );
}
