import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { IPE_TABS, IPE_DEPT_NAME, SocietyData, societyActivities } from '@/data/ipeData';
import { Users, Activity, Award, CheckCircle, FileText, CalendarDays } from 'lucide-react';
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
    society?: SocietyData | null;
}

export default function IpeSociety({ department, society }: Props) {
    const committee = society?.committee ?? [];
    const activities = societyActivities(society);
    const description = society?.description || '';
    const shortName = department?.short_name || 'IPE';

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${society?.name || 'Society'} - ${shortName} - BAUST`} />
            <Navbar />
            <PageHero 
                title={society?.name || `${shortName} Society of BAUST`} 
                subtitle={pageText(department, 'society_intro', 'Student Leadership, Industrial Systems Innovation & Professional Excellence')} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || IPE_DEPT_NAME} activeTab="IPE Society of BAUST" tabs={IPE_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
                {!society && (
                    <p className="text-center text-gray-400 py-20">Society information has not been published yet.</p>
                )}
                {society && <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{society.name}</h2>
                                <p className="text-sm text-gray-500 mt-0.5">{department?.name || IPE_DEPT_NAME}</p>
                            </div>
                        </div>

                        {(society.established || society.member_count || society.committee_pdf) && (
                            <div className="flex flex-wrap gap-3 mb-8">
                                {society.established && (
                                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-bold px-3 py-1 rounded-full">
                                        <CalendarDays size={14} /> Established {society.established}
                                    </span>
                                )}
                                {society.member_count && (
                                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-bold px-3 py-1 rounded-full">
                                        <Users size={14} /> {society.member_count}
                                    </span>
                                )}
                                {society.committee_pdf && (
                                    <a href={society.committee_pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full hover:bg-emerald-700 transition-colors">
                                        <FileText size={14} /> Committee (PDF)
                                    </a>
                                )}
                            </div>
                        )}

                        {description && <div className="space-y-4 text-gray-600 leading-8 text-[15px] sm:text-[16px] text-justify whitespace-pre-line mb-10">
                            <p>{description}</p>
                        </div>}

                        {/* Executive Committee */}
                        {committee.length > 0 && <div className="mb-10">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-emerald-600" />
                                Executive Advisory Committee
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {committee.map((member, idx) => (
                                    <div key={idx} className="p-4 rounded-2xl bg-gray-50/60 border border-gray-100 flex items-center gap-3">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="w-10 h-10 rounded-xl object-cover object-top flex-shrink-0 bg-gray-100" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                                                {idx + 1}
                                            </div>
                                        )}
                                        <div>
                                            {member.role && <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">{member.role}</p>}
                                            <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                                            {member.designation && <p className="text-xs text-gray-500">{member.designation}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>}

                        {/* Key Society Activities */}
                        {activities.length > 0 && <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100 p-6 sm:p-8">
                            <h3 className="text-base font-bold text-emerald-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-700" />
                                Key Society Activities
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                                {activities.map((act, idx) => {
                                    const Icon = deptIcon(act.icon, CheckCircle);
                                    return (
                                        <div key={idx} className="flex items-start gap-2.5">
                                            <Icon size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <span className={act.description ? "leading-snug font-semibold" : "leading-snug"}>{act.title}</span>
                                                {act.description && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{act.description}</p>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>}

                    </div>
                </div>}
            </main>
            <Footer />
        </div>
    );
}
