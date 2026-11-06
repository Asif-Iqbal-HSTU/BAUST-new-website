import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { DBA_TABS, DBA_DEPT_NAME } from '@/data/dbaData';
import { Trophy, Award, Users, Star, ExternalLink, ShieldCheck, TrendingUp, Lightbulb, GraduationCap } from 'lucide-react';

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
    team_members?: TeamMember[] | string | null;
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
    TrendingUp,
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
        title: "National Business Case Olympiad 2023 – 1st Runner Up",
        type: "National Competition",
        icon: "Trophy",
        color: "amber",
        description: "DBA student team 'DBA Innovators' clinched 1st Runner Up among 48 public and private universities across Bangladesh for designing a sustainable agro-supply chain financial model.",
        details: "The competition was evaluated by senior venture capitalists, corporate executives, and FMCG brand strategists.",
        team: {
            title: "Team DBA Innovators",
            members: [
                { name: "Tahmid Hasan", batch: "BBA 11th" },
                { name: "Nusrat Jahan", batch: "BBA 11th" },
                { name: "Rafid Zaman", batch: "BBA 12th" }
            ]
        }
    },
    {
        id: 2,
        title: "Hult Prize at BAUST – Champion Team 2024",
        type: "Global Social Entrepreneurship",
        icon: "Award",
        color: "emerald",
        description: "Winning project 'GreenEdge Solutions' proposing biodegradable agricultural packaging from northern jute fibers, representing BAUST at the regional qualifiers.",
        details: "Guided by DBA faculty mentors in social entrepreneurship, financial feasibility, and marketing execution.",
        team: {
            title: "GreenEdge Founders",
            members: [
                { name: "Tanvir Ahmed", batch: "BBA 12th" },
                { name: "Sadia Rahman", batch: "BBA 13th" }
            ]
        }
    },
    {
        id: 3,
        title: "Vice-Chancellor's Gold Medallion 2022",
        type: "Academic Excellence",
        icon: "Star",
        color: "blue",
        description: "Awarded to BBA Valedictorian Sumaiya Akter for attaining highest CGPA (3.98/4.00) in the Faculty of Business Studies.",
        details: "Currently serving as a Management Trainee Officer (MTO) at Eastern Bank PLC."
    }
];

export default function DbaAchievements({ department, achievements }: Props) {
    const list = (achievements && achievements.length > 0) ? achievements : DEFAULT_ACHIEVEMENTS;

    const parseTeam = (item: AchievementItem) => {
        if (item.team) return item.team;
        if (item.team_members) {
            if (typeof item.team_members === 'string') {
                try {
                    const parsed = JSON.parse(item.team_members);
                    if (Array.isArray(parsed)) return { title: item.team_title || 'Team Members', members: parsed };
                } catch (e) {
                    return null;
                }
            } else if (Array.isArray(item.team_members)) {
                return { title: item.team_title || 'Team Members', members: item.team_members };
            }
        }
        return null;
    };

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`DBA Achievers - ${department?.short_name || 'DBA'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={`${department?.short_name || 'DBA'} Achievers & Honors`} 
                subtitle="Celebrating National Awards, Case Competition Laureates, and Academic Laurels" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || DBA_DEPT_NAME} activeTab="DBA Achievers" tabs={DBA_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                {/* Intro Hero */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                        <Trophy size={14} className="text-amber-600" />
                        Hall of Distinction
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Pioneering Business Acumen & Leadership
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-base">
                        DBA students and faculty consistently demonstrate excellence in national case olympiads, international entrepreneurial challenges, and academic achievements.
                    </p>
                </div>

                {/* Achievements Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {list.map((item, idx) => {
                        const IconComponent = (item.icon && ICON_MAP[item.icon]) ? ICON_MAP[item.icon] : Trophy;
                        const teamData = parseTeam(item);

                        return (
                            <div 
                                key={item.id ?? idx} 
                                className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group h-full"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                        <IconComponent className="w-7 h-7" />
                                    </div>
                                    {item.type && (
                                        <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                                            {item.type}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors leading-snug">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed mb-6 text-justify">
                                    {item.description}
                                </p>

                                {item.details && (
                                    <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 text-xs text-gray-500 leading-relaxed mb-6 italic">
                                        "{item.details}"
                                    </div>
                                )}

                                {/* Team Members */}
                                {teamData && teamData.members && teamData.members.length > 0 && (
                                    <div className="mt-auto pt-6 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                                            <Users size={14} className="text-emerald-600" />
                                            {teamData.title}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {teamData.members.map((m, mIdx) => (
                                                <span 
                                                    key={mIdx}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50/70 text-emerald-800 border border-emerald-100"
                                                >
                                                    <span>{m.name}</span>
                                                    {m.batch && <span className="text-[10px] text-emerald-600 font-normal">({m.batch})</span>}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {item.link && (
                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <a 
                                            href={item.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 hover:text-emerald-800 transition-colors"
                                        >
                                            View Official Recognition
                                            <ExternalLink size={13} />
                                        </a>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>
            <Footer />
        </div>
    );
}
