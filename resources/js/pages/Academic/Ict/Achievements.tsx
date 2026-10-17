import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { ICT_TABS, ICT_DEPT_NAME } from '@/data/ictData';
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

const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
    {
        id: 1,
        title: "National ICT Hackathon - Top 10 Finalist",
        type: "National Hackathon",
        icon: "Code",
        color: "purple",
        description: "Student developer teams from the ICT Department represented BAUST in the National ICT Division Hackathon, competing against top universities in developing smart solutions for national challenges.",
        team_title: "Team TechSaviours",
        team_members: [
            { name: "Sabbir Rahman", batch: "ICT 2nd Batch" },
            { name: "Mst. Jannatul Fardous", batch: "ICT 2nd Batch" }
        ]
    },
    {
        id: 2,
        title: "Inter-University Programming Contest (IUPC) Honors",
        type: "Competitive Programming",
        icon: "Trophy",
        color: "emerald",
        description: "ICT teams consistently secure notable ranks in national-level programming contests, showcasing computational logic and algorithmic skills.",
        team_title: "BAUST ICT Coders",
        team_members: [
            { name: "Tanvir Ahmed", batch: "ICT 4th Batch" }
        ]
    },
    {
        id: 3,
        title: "IoT & Robotics Showcases",
        type: "Project Exhibition",
        icon: "Cpu",
        color: "blue",
        description: "Innovative IoT projects like Smart Agriculture Systems and Automated Fire Rescue Robots designed by ICT students were highly praised in regional technology exhibitions.",
        team_title: "IoT Dev Group",
        team_members: [
            { name: "Al Amin", batch: "ICT 3rd Batch" },
            { name: "Farhana Yasmin", batch: "ICT 3rd Batch" }
        ]
    }
];

export default function IctAchievements({ department, achievements: achievementsProp }: Props) {
    const list = (achievementsProp && achievementsProp.length > 0) ? achievementsProp : DEFAULT_ACHIEVEMENTS;

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Achievements - ${department?.short_name || 'ICT'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={`${department?.short_name || 'ICT'} Notable Achievements`} 
                subtitle="Celebrating Student Innovations and Departmental Milestones" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || ICT_DEPT_NAME} activeTab="Achievements" tabs={ICT_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                            <Trophy size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2">3+</h3>
                        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">National Showcases</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2">OBE</h3>
                        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Aligned Syllabus</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6">
                            <Users size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2">100%</h3>
                        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Hands-on Labs</p>
                    </div>
                </div>

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
                                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Departmental Highlight</span>
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
                                                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 hover:gap-3 transition-all"
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
                        <h3 className="text-3xl font-black mb-4">Empowering Technical Talents</h3>
                        <p className="text-slate-400 leading-relaxed font-medium">
                            The department supports and encourages student participation in diverse national hackathons, robotic expos, software exhibitions, and research publications to build industry-ready leaders.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
