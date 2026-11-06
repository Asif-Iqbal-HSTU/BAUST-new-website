import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME, SocietyData, societyActivities } from '@/data/ceData';
import { Users, Award, Calendar, CheckCircle, FileText } from 'lucide-react';
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
    club?: SocietyData | null;
    allClubs?: SocietyData[];
    clubSlug?: string | null;
}

export default function CeClubs({ department, club, allClubs = [] }: Props) {
    const shortName = department?.short_name || 'CE';
    const activities = societyActivities(club);
    const committee = club?.committee ?? [];

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${club?.name || 'Student Clubs'} - ${shortName} - BAUST`} />
            <Navbar />
            <PageHero
                title={`Student Clubs - ${department?.name || CE_DEPT_NAME}`}
                subtitle={pageText(department, 'society_intro', 'Student Leadership, Innovation, and Environmental Sustainability')}
                compact={true}
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Clubs" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

                {/* Switch Tabs */}
                {allClubs.length > 1 && (
                    <div className="flex flex-wrap max-w-2xl mx-auto bg-white rounded-2xl p-1.5 shadow-sm border border-gray-200 gap-1">
                        {allClubs.map((item) => {
                            const isCurrent = item.slug === club?.slug;
                            return (
                                <Link
                                    key={item.slug}
                                    href={`/ce/clubs/${item.slug}`}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm rounded-xl transition-all whitespace-nowrap ${
                                        isCurrent
                                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                            : 'text-gray-500 hover:text-emerald-700 hover:bg-emerald-50'
                                    }`}
                                >
                                    <Users className="w-4 h-4" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                )}

                {!club && (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                        <p className="text-gray-500">No clubs have been published yet.</p>
                    </div>
                )}

                {club && (
                    <>
                        {/* Main Club Banner */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                            <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                            <div className="p-8 sm:p-12">
                                <div className="flex items-center gap-5 mb-6">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-md flex items-center justify-center flex-shrink-0 text-emerald-700">
                                        <Users className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                                            {club.type === 'club' ? 'Student Club' : 'Student Society'}
                                        </span>
                                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                                            {club.name}
                                        </h2>
                                    </div>
                                </div>

                                {club.description && (
                                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify max-w-4xl whitespace-pre-line">
                                        {club.description}
                                    </p>
                                )}

                                {(club.member_count || club.established || club.committee_pdf) && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
                                        {club.member_count && (
                                            <div className="flex items-center gap-3">
                                                <Users className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold uppercase">Membership</p>
                                                    <p className="text-sm sm:text-base font-extrabold text-gray-900">{club.member_count}</p>
                                                </div>
                                            </div>
                                        )}
                                        {club.established && (
                                            <div className="flex items-center gap-3">
                                                <Calendar className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold uppercase">Established</p>
                                                    <p className="text-sm sm:text-base font-extrabold text-gray-900">{club.established}</p>
                                                </div>
                                            </div>
                                        )}
                                        {club.committee_pdf && (
                                            <a href={club.committee_pdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 col-span-2 sm:col-span-1 group">
                                                <FileText className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold uppercase">Committee</p>
                                                    <p className="text-sm sm:text-base font-extrabold text-emerald-700 group-hover:underline">View PDF</p>
                                                </div>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Activities & Initiatives */}
                        {activities.length > 0 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <Award className="text-emerald-700 w-6 h-6" />
                                    <h3 className="text-2xl font-bold text-gray-900">Key Activities & Signature Events</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activities.map((act, idx) => {
                                        const Icon = deptIcon(act.icon, CheckCircle);
                                        return (
                                            <div key={idx} className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-200 transition-all">
                                                <Icon className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <span className="text-xs sm:text-sm font-semibold text-gray-700">{act.title}</span>
                                                    {act.description && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{act.description}</p>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Committee */}
                        {committee.length > 0 && (
                            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                                <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-5 bg-emerald-500 rounded-full" />
                                    Advisors & Executive Committee
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {committee.map((mem, idx) => (
                                        <div key={idx} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
                                            {mem.image && (
                                                <img src={mem.image} alt={mem.name} className="w-12 h-12 rounded-xl object-cover object-top flex-shrink-0 bg-gray-100" />
                                            )}
                                            <div>
                                                {mem.role && <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">{mem.role}</p>}
                                                <h5 className="font-bold text-gray-900 text-sm">{mem.name}</h5>
                                                {mem.designation && <p className="text-xs text-gray-500 mt-0.5">{mem.designation}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

            </main>
            <Footer />
        </div>
    );
}
