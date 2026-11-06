import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME, AchievementItem, achievementColor } from '@/data/ceData';
import { Trophy, ExternalLink } from 'lucide-react';
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

export default function CeAchievements({ department, achievements }: Props) {
    const list = achievements ?? [];

    const renderIcon = (iconName?: string | null) => {
        const Comp = deptIcon(iconName, Trophy);
        return <Comp className="w-6 h-6" />;
    };

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Achievements - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={`Achievements - ${department?.name || CE_DEPT_NAME}`} 
                subtitle={pageText(department, 'achievements_subtitle', "Celebrating Faculty & Student Success in Competitions, Research, & Innovation")} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Achievements" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
                
                {/* Header info */}
                <div className="flex items-center gap-3">
                    <Trophy className="text-emerald-700 w-8 h-8" />
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Hall of Fame & Recognitions</h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">{pageText(department, 'achievements_intro', 'Honoring milestones, national awards, and excellence in civil engineering')}</p>
                    </div>
                </div>

                {list.length === 0 && (
                    <p className="text-center text-gray-400 py-12">No achievements have been published yet.</p>
                )}

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {list.map((item, idx) => {
                        const color = achievementColor(item.color);
                        return (
                        <div key={item.id ?? idx} className={`bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl ${color.border} transition-all duration-300 p-8 flex flex-col justify-between group`}>
                            <div>
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div className={`w-12 h-12 rounded-2xl ${color.icon} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                        {renderIcon(item.icon)}
                                    </div>
                                    {item.type && (
                                        <span className={`${color.badge} text-xs font-bold px-3 py-1 rounded-full`}>
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
                        );
                    })}
                </div>

            </main>
            <Footer />
        </div>
    );
}
