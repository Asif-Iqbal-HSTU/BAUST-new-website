import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME, SocietyData, societyActivities } from '@/data/ceData';
import { Users, Award, GraduationCap, Zap, Building2, FileText } from 'lucide-react';
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
    alumni?: SocietyData | null;
}

export default function CeAlumniAssoc({ department, alumni }: Props) {
    const committee = alumni?.committee ?? [];
    const activities = societyActivities(alumni);
    const shortName = department?.short_name || 'CE';

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Alumni Association - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title="Alumni Association" 
                subtitle={pageText(department, 'alumni_association_intro', 'Fostering Fellowship, Career Networking, and Departmental Excellence')} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Alumni" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
                
                {!alumni && (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                        <p className="text-gray-500">Alumni association information has not been published yet.</p>
                    </div>
                )}

                {/* Intro Hero Banner */}
                {alumni && <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 sm:p-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                                <Users className="w-7 h-7" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                                    Official Alumni Network
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {alumni.name || `${shortName} Alumni Association`}
                                </h2>
                            </div>
                        </div>

                        {alumni.description && (
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify max-w-4xl whitespace-pre-line">
                                {alumni.description}
                            </p>
                        )}

                        {(alumni.member_count || alumni.established || alumni.committee_pdf) && <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
                            {alumni.member_count && <div className="flex items-center gap-3">
                                <GraduationCap className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Membership</p>
                                    <p className="text-sm sm:text-base font-extrabold text-gray-900">{alumni.member_count}</p>
                                </div>
                            </div>}
                            {alumni.established && <div className="flex items-center gap-3">
                                <Building2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Established</p>
                                    <p className="text-sm sm:text-base font-extrabold text-gray-900">{alumni.established}</p>
                                </div>
                            </div>}
                            {alumni.committee_pdf && (
                                <a href={alumni.committee_pdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 col-span-2 sm:col-span-1 group">
                                    <FileText className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">Committee</p>
                                        <p className="text-sm sm:text-base font-extrabold text-emerald-700 group-hover:underline">View PDF</p>
                                    </div>
                                </a>
                            )}
                        </div>}
                    </div>
                </div>}

                {/* Key Activities */}
                {activities.length > 0 && <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Zap className="text-emerald-700 w-6 h-6" />
                        <h3 className="text-2xl font-bold text-gray-900">Alumni Activities & Initiatives</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activities.map((act, idx) => {
                            const Icon = act.icon ? deptIcon(act.icon) : null;
                            return (
                                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
                                        {Icon ? <Icon className="w-5 h-5" /> : idx + 1}
                                    </div>
                                    <h4 className="font-bold text-gray-900 text-base mb-2">{act.title}</h4>
                                    {act.description && <p className="text-xs sm:text-sm text-gray-500 leading-relaxed text-justify">{act.description}</p>}
                                </div>
                            );
                        })}
                    </div>
                </div>}

                {/* Executive Committee */}
                {committee.length > 0 && <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        <div className="flex items-center gap-3 mb-8">
                            <Award className="w-6 h-6 text-emerald-700" />
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Alumni Executive Committee ({committee.length} Members)</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Elected leadership team guiding alumni initiatives and student mentorship</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {committee.map((m, idx) => (
                                <div key={idx} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between hover:border-emerald-200 transition-colors group">
                                    <div className="flex items-start gap-3">
                                        {m.image && (
                                            <img src={m.image} alt={m.name} className="w-12 h-12 rounded-xl object-cover object-top flex-shrink-0 bg-gray-100" />
                                        )}
                                        <div>
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100/60 inline-block">
                                                {m.role || 'Executive Member'}
                                            </span>
                                            <h4 className="font-bold text-gray-900 text-base mt-2.5 group-hover:text-emerald-700 transition-colors">
                                                {m.name}
                                            </h4>
                                            {m.designation && <p className="text-xs text-gray-500 mt-0.5">{m.designation}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}

            </main>
            <Footer />
        </div>
    );
}
