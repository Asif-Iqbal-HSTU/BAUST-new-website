import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { ME_TABS, ME_DEPT_NAME } from '@/data/meData';
import { GraduationCap, Building, FileText, Award, Briefcase, CheckCircle } from 'lucide-react';
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

interface AlumniSociety {
    id?: number;
    name: string;
    description?: string | null;
    member_count?: string | null;
    established?: string | null;
    committee_pdf?: string | null;
    committee?: CommitteeMember[] | null;
    activities?: (SocietyActivity | string)[] | null;
}

interface AlumnusItem {
    id: number;
    type: 'job_holder' | 'higher_study' | string;
    name: string;
    batch?: string | null;
    passing_year?: string | null;
    designation?: string | null;
    organization?: string | null;
    image?: string | null;
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
    alumni?: AlumniSociety | null;
    alumniMembers?: AlumnusItem[];
}

function AlumnusCard({ person }: { person: AlumnusItem }) {
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=059669&color=fff&size=128`;
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <img
                src={person.image || avatar}
                alt={person.name}
                className="w-24 h-24 rounded-full object-cover object-top border-2 border-emerald-50 mb-3"
                onError={(e) => { e.currentTarget.src = avatar; }}
            />
            <h4 className="text-sm font-bold text-gray-900 leading-snug">{person.name}</h4>
            {(person.batch || person.passing_year) && (
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
                    {[person.batch, person.passing_year].filter(Boolean).join(' · ')}
                </p>
            )}
            {person.designation && <p className="text-xs text-emerald-700 font-semibold mt-2">{person.designation}</p>}
            {person.organization && <p className="text-xs text-gray-500 mt-0.5">{person.organization}</p>}
        </div>
    );
}

export default function MeAlumni({ department, alumni, alumniMembers = [] }: Props) {
    const shortName = department?.short_name || 'ME';
    const activities = (Array.isArray(alumni?.activities) ? alumni.activities : [])
        .map((act) => (typeof act === 'string' ? { title: act } : act) as SocietyActivity)
        .filter((act) => act?.title || act?.description);
    const committee = Array.isArray(alumni?.committee) ? alumni.committee : [];
    const description = alumni?.description || '';
    const intro = pageText(department, 'alumni_intro', `Through regular seminars, mock interview drives, industrial workshops, and technical mentoring networks, the ${shortName} Alumni Network plays a vital role in preparing current students for graduation.`);

    const jobHolders = alumniMembers.filter((a) => a.type === 'job_holder');
    const higherStudy = alumniMembers.filter((a) => a.type === 'higher_study');
    const groups = [
        { key: 'job_holder', title: 'Alumni in Professional Careers', icon: Briefcase, items: jobHolders },
        { key: 'higher_study', title: 'Alumni in Higher Studies', icon: GraduationCap, items: higherStudy },
    ].filter((g) => g.items.length > 0);

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Alumni - ${shortName} - BAUST`} />
            <Navbar />
            <PageHero 
                title={alumni?.name || `${shortName} Alumni Network`} 
                subtitle={pageText(department, 'alumni_subtitle', "Global Footprint of BAUST Mechanical Engineers")} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || ME_DEPT_NAME} activeTab="Alumni" tabs={ME_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{alumni?.name || `${shortName} Alumni Association`}</h2>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    {[department?.name, alumni?.member_count, alumni?.established].filter(Boolean).join(' · ')}
                                </p>
                            </div>
                        </div>

                        <div className={`grid grid-cols-1 ${activities.length > 0 ? 'md:grid-cols-2' : ''} gap-8 items-start mb-10`}>
                            <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed text-justify">
                                {description && <p className="whitespace-pre-line">{description}</p>}
                                {intro && <p>{intro}</p>}

                                {alumni?.committee_pdf && (
                                    <div className="pt-2">
                                        <a
                                            href={alumni.committee_pdf}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors"
                                        >
                                            <FileText size={15} />
                                            <span>Download Official Alumni Committee (PDF)</span>
                                        </a>
                                    </div>
                                )}
                            </div>

                            {activities.length > 0 && (
                            <div className="bg-emerald-50/60 rounded-3xl p-6 sm:p-8 border border-emerald-100 flex flex-col justify-center space-y-4">
                                <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                                    <Building className="w-5 h-5 text-emerald-700" />
                                    Notable Career Sectors
                                </h3>
                                <div className="space-y-3">
                                    {activities.map((act, idx) => {
                                        const Icon = act.icon ? deptIcon(act.icon, CheckCircle) : null;
                                        return (
                                            <div key={idx} className="flex items-start gap-3">
                                                {Icon ? (
                                                    <Icon size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                                                ) : (
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                                )}
                                                <div>
                                                    {act.title && <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug">{act.title}</span>}
                                                    {act.description && <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{act.description}</p>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            )}
                        </div>

                        {committee.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-emerald-600" />
                                    Alumni Committee
                                </h3>
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

                    </div>
                </div>

                {groups.map((group) => (
                    <section key={group.key}>
                        <div className="flex items-center gap-3 mb-6">
                            <group.icon className="w-6 h-6 text-emerald-600" />
                            <h2 className="text-2xl font-bold text-gray-900">{group.title}</h2>
                            <div className="h-0.5 flex-grow bg-gradient-to-r from-emerald-100 to-transparent" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                            {group.items.map((person) => (
                                <AlumnusCard key={person.id} person={person} />
                            ))}
                        </div>
                    </section>
                ))}
            </main>
            <Footer />
        </div>
    );
}
