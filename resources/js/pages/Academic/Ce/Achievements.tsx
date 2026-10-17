import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';
import { Trophy, Award, Users, Star, ExternalLink, ShieldCheck, Cpu, Code, Lightbulb, GraduationCap, Leaf } from 'lucide-react';

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
    Leaf,
};

const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
    {
        title: "Vice Chancellor’s Excellence Award in Research & Service",
        type: "Faculty Award",
        icon: "Award",
        color: "amber",
        description: "Civil Engineering faculty members recognized for outstanding contributions in research publications, OBE pedagogy, and institutional service at BAUST.",
        details: "Awarded by the Honorable Vice Chancellor recognizing academic dedication, top tier research papers in Scopus/SCI indexed journals, and exceptional mentorship.",
        team_title: "Recipient Faculty",
        team_members: [{ name: "Prof. Dr. Md. Mahmudul Hasan", batch: "Head of CE" }],
    },
    {
        title: "2nd Place at BAUST Pitha Utsob 2025 (“Pitha Mohol”)",
        type: "Cultural Excellence",
        icon: "Trophy",
        color: "emerald",
        description: "The Civil Engineering Department stall “Pitha Mohol” secured 2nd place at the campus-wide Pitha Utsob 2025, celebrating cultural heritage and teamwork.",
        details: "Demonstrated vibrant departmental culture, creative stall design, traditional culinary showcase, and active participation by students and faculty members.",
        team_title: "Student & Faculty Organizing Team",
        team_members: [{ name: "CE Cultural Committee", batch: "All Batches" }],
    },
    {
        title: "Intra Dept. Drawing and CAD Contest Championship",
        type: "Technical Competition",
        icon: "Cpu",
        color: "blue",
        description: "Organized by Civil Engineering Innovation Club (CEIC), recognizing student excellence in architectural planning, drafting precision, and 3D modeling.",
        details: "Students competed across complex building plans, structural drafting, and CAD speed tests, evaluated by external industry experts and faculty judges.",
        team_title: "Winning Teams",
        team_members: [{ name: "Champion, 1st Runner Up & 2nd Runner Up Teams", batch: "CE Batches" }],
    },
    {
        title: "Teaching Excellence Program (TEP) Certification",
        type: "Professional Achievement",
        icon: "GraduationCap",
        color: "indigo",
        description: "Head of Department Dr. Md. Mahmudul Hasan successfully completed the prestigious Teaching Excellence Program (TEP) for advanced instructional design.",
        details: "Enhancing OBE curriculum delivery, student-centric active learning methodologies, and modern formative assessment protocols in Civil Engineering.",
        team_title: "Certified Leader",
        team_members: [{ name: "Dr. Md. Mahmudul Hasan", batch: "Dean & Head" }],
    },
    {
        title: "Reuse of Plastic Materials Innovation Showcase",
        type: "Sustainability Contest",
        icon: "Leaf",
        color: "green",
        description: "18 student teams turned plastic waste into functional engineering products organized by the Environment and Sustainability Club (ESC).",
        details: "Highlighted sustainable civil engineering, recycled plastic aggregate in non-structural elements, eco-friendly paving concepts, and circular economy principles.",
        team_title: "ESC Project Teams",
        team_members: [{ name: "Top 3 Finalist Teams", batch: "ESC Club" }],
    },
];

export default function CeAchievements({ department, achievements }: Props) {
    const list = (achievements && achievements.length > 0) ? achievements : DEFAULT_ACHIEVEMENTS;

    const renderIcon = (iconName?: string | null) => {
        const Comp = (iconName && ICON_MAP[iconName]) ? ICON_MAP[iconName] : Trophy;
        return <Comp className="w-6 h-6" />;
    };

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Achievements - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={department?.name ? `Achievements - ${department.name}` : "Department of Civil Engineering (CE)"} 
                subtitle="Celebrating Faculty & Student Success in Competitions, Research, & Innovation" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Achievements" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
                
                {/* Header info */}
                <div className="flex items-center gap-3">
                    <Trophy className="text-emerald-700 w-8 h-8" />
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Hall of Fame & Recognitions</h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Honoring milestones, national awards, and excellence in civil engineering</p>
                    </div>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {list.map((item, idx) => (
                        <div key={item.id ?? idx} className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between group">
                            <div>
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        {renderIcon(item.icon)}
                                    </div>
                                    {item.type && (
                                        <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                                            {item.type}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                    {item.title}
                                </h3>
                                {item.description && (
                                    <p className="text-sm text-gray-600 mt-3 leading-relaxed text-justify">
                                        {item.description}
                                    </p>
                                )}
                                {item.details && (
                                    <p className="text-xs text-gray-500 mt-2 italic leading-relaxed text-justify">
                                        {item.details}
                                    </p>
                                )}

                                {item.team_members && item.team_members.length > 0 && (
                                    <div className="mt-6 pt-5 border-t border-gray-100">
                                        {item.team_title && (
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                                {item.team_title}
                                            </p>
                                        )}
                                        <div className="flex flex-wrap gap-2">
                                            {item.team_members.map((m, mIdx) => (
                                                <span key={mIdx} className="text-xs bg-emerald-50 text-emerald-900 font-semibold px-2.5 py-1 rounded-lg border border-emerald-100/50">
                                                    {m.name} {m.batch && <span className="text-emerald-600">({m.batch})</span>}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {item.link && (
                                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                                    <a 
                                        href={item.link} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                                    >
                                        Read More <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </main>
            <Footer />
        </div>
    );
}
