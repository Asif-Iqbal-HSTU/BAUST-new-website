import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CSE_TABS, CSE_DEPT_NAME } from '@/data/cseData';
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
        title: "IEB-BAETE Accredited Program",
        type: "Accreditation",
        icon: "ShieldCheck",
        color: "emerald",
        description: "BSc. Engineering in CSE of BAUST has been accredited by IEB-BAETE and is recognized as meeting the initial academic requirements for engineering graduates in Bangladesh.",
        details: "IEB-BAETE became a provisional signatory to the Washington Accord in 2016, ensuring substantial academic equivalence of engineering academic programs accredited by Washington Accord signatories.",
        link: "https://www.ieagreements.org"
    },
    {
        id: 2,
        title: "GPH Ispat Esho Robot Banai – Champion",
        type: "National Robotics Show",
        icon: "Cpu",
        color: "blue",
        description: "The reality show 'GPH Ispat Presents Esho Robot Banai' held on Channel i saw young robot mechanics transform ideas into reality.",
        team_title: "Champion Team",
        team_members: [
            { name: "Shahidul Islam Bulbul", batch: "CSE 1st Batch" },
            { name: "Kazi Atai Kibria", batch: "CSE 3rd Batch" },
            { name: "Asif-Ul-Islam", batch: "CSE 3rd Batch" },
            { name: "Md. Noman Ahmed", batch: "CSE 3rd Batch" }
        ]
    },
    {
        id: 3,
        title: "bdapps National Hackathon 2022 – National Champion",
        type: "National Hackathon",
        icon: "Code",
        color: "purple",
        description: "Organized by bdapps (Robi) in partnership with the ICT Division. Out of 2,000 teams and 5,000 developers, Team Hako from BAUST secured the top position.",
        details: "The award was presented by the State Minister for ICT Division, Zunaid Ahmed Palak, MP.",
        team_title: "Team HAKO (Champion)",
        team_members: [
            { name: "Md Hadiuzzaman", batch: "CSE 6th Batch" },
            { name: "Shahriar Konok", batch: "CSE 6th Batch" },
            { name: "Abdur Raj Shafi", batch: "CSE 6th Batch" }
        ],
        link: "https://www.robi.com.bd/en/corporate/news-room/press-release/national-hackathon-organized-by-bdapps-recognizes-countrys-top-apps-developers"
    },
    {
        id: 4,
        title: "Innovative Idea Contest 2022 – Champion",
        type: "A2i Innovation Catalyst",
        icon: "Lightbulb",
        color: "amber",
        description: "Organized by a2i (Digital Bangladesh program), this contest incubates whole-of-government digital innovation catalysts.",
        team_title: "Champion Team",
        team_members: [
            { name: "Maria Mehedy", batch: "CSE 8th Batch" },
            { name: "Harisa Muntahina", batch: "CSE 13th Batch" },
            { name: "Prapti Nandini", batch: "CSE 13th Batch" }
        ]
    },
    {
        id: 5,
        title: "Digital Innovation Challenge for Women (DICFW) 2023",
        type: "Women in Tech",
        icon: "Star",
        color: "pink",
        description: "The 4th edition of technology-based competition held for women to inspire and encourage innovation in tech, organized by Women in Digital.",
        details: "Team Sunshine from CSE, BAUST emerged as the champion among 8 finalist teams.",
        team_title: "Team Sunshine (Champion)",
        team_members: [
            { name: "Maria Mehedy", batch: "CSE 8th Batch" }
        ]
    }
];

export default function Achievements({ department, achievements: achievementsProp }: Props) {
    const list = (achievementsProp && achievementsProp.length > 0) ? achievementsProp : DEFAULT_ACHIEVEMENTS;

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Achievements - ${department?.short_name || 'CSE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title="Notable Achievements" 
                subtitle="Celebrating Excellence and Innovation in Engineering" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.name || CSE_DEPT_NAME} activeTab="Achievements" tabs={CSE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                            <Trophy size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2">4+</h3>
                        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">National Champions</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2">IEB</h3>
                        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">BAETE Accredited</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6">
                            <Users size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2">100%</h3>
                        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Student Engagement</p>
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

            <Footer />
        </div>
    );
}
