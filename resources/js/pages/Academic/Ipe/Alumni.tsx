import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { IPE_TABS, IPE_DEPT_NAME, SocietyData, AlumniPerson, societyActivities } from '@/data/ipeData';
import { GraduationCap, Building, Award, FileText, Briefcase, BookOpen } from 'lucide-react';
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
    alumniList?: AlumniPerson[];
}

function AlumniCard({ person }: { person: AlumniPerson }) {
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=059669&color=fff&size=96`;
    return (
        <div className="p-4 rounded-2xl bg-gray-50/60 border border-gray-100 flex items-center gap-4">
            <img
                src={person.image || avatar}
                alt={person.name}
                className="w-14 h-14 rounded-xl object-cover object-top flex-shrink-0 bg-gray-100"
                onError={(e) => { e.currentTarget.src = avatar; }}
            />
            <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 leading-snug">{person.name}</p>
                {(person.designation || person.organization) && (
                    <p className="text-xs text-emerald-700 font-semibold leading-snug">
                        {[person.designation, person.organization].filter(Boolean).join(', ')}
                    </p>
                )}
                {(person.batch || person.passing_year) && (
                    <p className="text-[11px] text-gray-500 mt-0.5">
                        {[person.batch && `Batch ${person.batch}`, person.passing_year && `Passed ${person.passing_year}`].filter(Boolean).join(' · ')}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function IpeAlumni({ department, alumni, alumniList = [] }: Props) {
    const destinations = societyActivities(alumni);
    const committee = alumni?.committee ?? [];
    const description = alumni?.description || '';
    const shortName = department?.short_name || 'IPE';
    const jobHolders = alumniList.filter(a => a.type === 'job_holder');
    const higherStudies = alumniList.filter(a => a.type === 'higher_study');

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Alumni - ${department?.short_name || 'IPE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={alumni?.name || `${shortName} Alumni Network`} 
                subtitle={pageText(department, 'alumni_subtitle', `Global Footprint of BAUST ${shortName} Graduates`)} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || IPE_DEPT_NAME} activeTab="Alumni" tabs={IPE_TABS} />

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
                                <p className="text-sm text-gray-500 mt-0.5">{department?.name || IPE_DEPT_NAME}</p>
                            </div>
                        </div>

                        <div className={`grid grid-cols-1 ${destinations.length > 0 ? 'md:grid-cols-2' : ''} gap-8 items-start mb-10`}>
                            <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed text-justify whitespace-pre-line">
                                {description && <p>{description}</p>}
                                <p>
                                    {pageText(department, 'alumni_intro', `Through regular seminars, mock interview drives, industry workshops, and technical mentoring networks, the ${shortName} Alumni Network plays a vital role in preparing current students for graduation and professional certification.`)}
                                </p>
                                {alumni?.committee_pdf && (
                                    <a href={alumni.committee_pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors">
                                        <FileText size={14} /> Committee (PDF)
                                    </a>
                                )}
                            </div>

                            {destinations.length > 0 && <div className="bg-emerald-50/60 rounded-3xl p-6 sm:p-8 border border-emerald-100 flex flex-col justify-center space-y-4">
                                <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                                    <Building className="w-5 h-5 text-emerald-700" />
                                    Notable Career Sectors
                                </h3>
                                <div className="space-y-3">
                                    {destinations.map((dest, idx) => {
                                        const Icon = dest.icon ? deptIcon(dest.icon) : null;
                                        return (
                                            <div key={idx} className="flex items-start gap-3">
                                                {Icon ? <Icon className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" /> : <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />}
                                                <div>
                                                    <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug">{dest.title}</span>
                                                    {dest.description && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{dest.description}</p>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>}
                        </div>

                        {/* Alumni Committee */}
                        {committee.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-emerald-600" />
                                    Alumni Committee
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
                            </div>
                        )}

                        {/* Alumni Directory */}
                        {[
                            { title: 'Alumni in Industry & Service', icon: Briefcase, list: jobHolders },
                            { title: 'Alumni in Higher Studies', icon: BookOpen, list: higherStudies },
                        ].filter(g => g.list.length > 0).map(group => (
                            <div key={group.title} className="mb-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <group.icon className="w-5 h-5 text-emerald-600" />
                                    {group.title}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {group.list.map(person => <AlumniCard key={person.id} person={person} />)}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
