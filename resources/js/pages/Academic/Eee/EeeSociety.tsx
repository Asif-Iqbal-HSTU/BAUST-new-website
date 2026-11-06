import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { EEE_TABS, EEE_DEPT_NAME } from '@/data/eeeData';
import { Users, Activity, Award, CheckCircle, FileText, Calendar } from 'lucide-react';
import { deptIcon, pageText } from '@/lib/dept-icons';

interface CommitteeMember {
    role?: string | null;
    name?: string | null;
    designation?: string | null;
    image?: string | null;
}

interface SocietyActivity {
    title?: string | null;
    icon?: string | null;
    description?: string | null;
}

interface SocietyData {
    id?: number;
    name: string;
    type?: string | null;
    description?: string | null;
    member_count?: string | null;
    established?: string | null;
    committee_pdf?: string | null;
    committee?: CommitteeMember[] | null;
    activities?: (SocietyActivity | string)[] | null;
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
    society?: SocietyData | null;
}

export default function EeeSociety({ department, society }: Props) {
    const committee = Array.isArray(society?.committee) ? society.committee : [];
    const activities = (Array.isArray(society?.activities) ? society.activities : [])
        .map((act) => (typeof act === 'string' ? { title: act } : act) as SocietyActivity)
        .filter((act) => act?.title || act?.description);
    const description = society?.description || '';

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${society?.name || 'Society'} - ${department?.short_name || 'EEE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={society?.name || `${department?.short_name || 'EEE'} Society of BAUST`} 
                subtitle={pageText(department, 'society_intro', 'Student Leadership, Technical Innovation & Cultural Excellence')} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || EEE_DEPT_NAME} activeTab="EEE Society of BAUST" tabs={EEE_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
                {!society ? (
                    <p className="text-center text-gray-400 py-20">Society information has not been published yet.</p>
                ) : (
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{society.name}</h2>
                                    <p className="text-sm text-gray-500 mt-0.5">{department?.name}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {society.member_count && (
                                    <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                                        <Users size={13} />
                                        {society.member_count}
                                    </span>
                                )}
                                {society.established && (
                                    <span className="flex items-center gap-1.5 bg-gray-50 text-gray-700 text-xs font-bold px-3 py-1 rounded-full border border-gray-100">
                                        <Calendar size={13} />
                                        {society.established}
                                    </span>
                                )}
                            </div>
                        </div>

                        {description && (
                            <div className="space-y-4 text-gray-600 leading-8 text-[15px] sm:text-[16px] text-justify whitespace-pre-line mb-10">
                                <p>{description}</p>
                            </div>
                        )}

                        {/* Executive Committee */}
                        {(committee.length > 0 || society.committee_pdf) && (
                        <div className="mb-10">
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-emerald-600" />
                                    Executive Advisory Committee
                                </h3>
                                {society.committee_pdf && (
                                    <a href={society.committee_pdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors">
                                        <FileText size={14} />
                                        Committee (PDF)
                                    </a>
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {committee.map((member, idx) => (
                                    <div key={idx} className="p-4 rounded-2xl bg-gray-50/60 border border-gray-100 flex items-center gap-3">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name ?? ''} className="w-12 h-12 rounded-xl object-cover object-top flex-shrink-0" />
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
                        </div>
                        )}

                        {/* Key Society Activities */}
                        {activities.length > 0 && (
                        <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100 p-6 sm:p-8">
                            <h3 className="text-base font-bold text-emerald-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-700" />
                                Key Society Activities
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                                {activities.map((act, idx) => {
                                    const Icon = deptIcon(act.icon, CheckCircle);
                                    return (
                                        <div key={idx} className="flex items-start gap-2.5">
                                            <Icon size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                {act.title && <p className="leading-snug font-semibold text-gray-800">{act.title}</p>}
                                                {act.description && <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{act.description}</p>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        )}

                    </div>
                </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
