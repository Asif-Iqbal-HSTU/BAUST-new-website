import React from 'react';
import { Link } from '@inertiajs/react';
import DeptPageShell from '@/custom_components/DeptPageShell';
import { DeptInfo, DeptPageProps, avatarUrl, deptShort } from '@/data/departmentData';
import { deptIcon, pageText } from '@/lib/dept-icons';
import { Users, Zap, Heart, Eye, Download, FileText } from 'lucide-react';

interface ActivityItem {
    title: string;
    icon?: string | null;
    description: string;
}

interface CommitteeMember {
    role: string;
    name: string;
    designation: string;
    image?: string | null;
}

interface AlumniData {
    id?: number;
    name: string;
    slug?: string;
    description?: string | null;
    member_count?: string | null;
    established?: string | null;
    committee_pdf?: string | null;
    activities?: ActivityItem[] | null;
    committee?: CommitteeMember[] | null;
}

interface AlumnusItem {
    id: number;
    type?: string | null;
    name: string;
    batch?: string | null;
    passing_year?: string | null;
    designation?: string | null;
    organization?: string | null;
    image?: string | null;
}

interface Props extends DeptPageProps {
    department: DeptInfo & { page_texts?: Record<string, string> | null };
    alumni?: AlumniData | null;
    alumniList?: AlumnusItem[];
    society?: { name: string } | null;
}

export default function DepartmentAlumni({ department, tabs, alumni, alumniList = [], society }: Props) {
    const short = deptShort(department);
    const title = alumni?.name || `${short} Alumni`;
    const intro = pageText(
        department,
        'alumni_intro',
        `Graduates of the ${department.name} are building careers across Bangladesh and beyond. The alumni network connects graduates with current students through mentoring, career guidance and community events.`,
    );
    const memberCount = alumni?.member_count ? (/member/i.test(alumni.member_count) ? alumni.member_count : `${alumni.member_count} Members`) : null;
    const pdfUrl = alumni?.committee_pdf || null;
    const activities = alumni?.activities ?? [];
    const committee = alumni?.committee ?? [];

    return (
        <DeptPageShell
            department={department}
            tabs={tabs}
            activeTab="Alumni"
            title={title}
            heroTitle={title}
            heroSubtitle={pageText(department, 'alumni_subtitle', "Fostering Connections, Empowering Future Leaders")}
        >

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Introduction */}
                <div className="max-w-3xl mb-20">
                    <h2 className="text-4xl font-black text-gray-900 mb-6">Building a Legacy</h2>
                    <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                        {intro}
                    </p>
                </div>

                {/* Alumni Association */}
                {alumni && (alumni.description || memberCount || alumni.established || pdfUrl) && (
                    <section className={`grid grid-cols-1 ${pdfUrl ? 'lg:grid-cols-2' : ''} gap-12 mb-24 items-center`}>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{alumni.name}</h2>
                            {alumni.description && (
                                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line mb-6">{alumni.description}</p>
                            )}
                            <div className="flex flex-wrap gap-4">
                                {memberCount && (
                                    <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100 flex items-center gap-3 text-emerald-700 font-bold text-sm">
                                        <Users size={20} />
                                        {memberCount}
                                    </div>
                                )}
                                {alumni.established && (
                                    <div className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100 flex items-center gap-3 text-blue-700 font-bold text-sm">
                                        {/est/i.test(alumni.established) ? alumni.established : `Est. ${alumni.established}`}
                                    </div>
                                )}
                            </div>
                        </div>
                        {pdfUrl && (
                            <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700 text-emerald-600">
                                    <FileText size={150} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Executive Committee</h3>
                                    <p className="text-gray-500 mb-8 font-medium">View or download the complete list of the association's executive committee.</p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200">
                                            <Eye size={18} /> View PDF
                                        </a>
                                        <a href={pdfUrl} download className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                                            <Download size={18} /> Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* Notable Alumni */}
                {alumniList.length > 0 && (
                    <section className="mb-24">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Notable Alumni</h2>
                                <p className="text-gray-500 font-medium">Where our graduates are making an impact</p>
                            </div>
                            <div className="hidden md:block h-px flex-grow ml-12 bg-gradient-to-r from-emerald-100 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {alumniList.map((a) => (
                                <div key={a.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
                                    <img
                                        src={a.image || avatarUrl(a.name, 96)}
                                        alt={a.name}
                                        className="w-24 h-24 rounded-full object-cover object-top shadow-sm border-2 border-emerald-50 mb-4"
                                        onError={(e) => { e.currentTarget.src = avatarUrl(a.name, 96); }}
                                    />
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{a.name}</h3>
                                    {a.designation && <p className="text-sm font-semibold text-emerald-700">{a.designation}</p>}
                                    {a.organization && <p className="text-sm text-gray-500 mt-1">{a.organization}</p>}
                                    {(a.type === 'higher_study' || a.batch || a.passing_year) && (
                                        <span className="mt-3 inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest">
                                            {[a.type === 'higher_study' ? 'Higher Study' : null, a.batch, a.passing_year].filter(Boolean).join(' · ')}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Activities Section */}
                {activities.length > 0 && <section className="mb-24">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Activities</h2>
                            <p className="text-gray-500 font-medium">Core events and initiatives organized by the society</p>
                        </div>
                        <div className="hidden md:block h-px flex-grow ml-12 bg-gradient-to-r from-emerald-100 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {activities.map((act, idx) => {
                            const IconComponent = deptIcon(act.icon, Zap);
                            return (
                                <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                        <IconComponent size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{act.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{act.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>}

                {/* Committee Section */}
                {committee.length > 0 && <section>
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Meet Your Committee</h2>
                        <div className="h-px flex-grow bg-emerald-100" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                        {committee.map((person, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all flex items-center gap-6 group">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-emerald-50 flex-shrink-0 relative flex items-center justify-center">
                                    {person.image ? (
                                        <img 
                                            src={person.image} 
                                            alt={person.name} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <Users className="w-10 h-10 text-emerald-600" />
                                    )}
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
                                </div>
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-2">
                                        {person.role}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{person.name}</h3>
                                    <p className="text-gray-500 text-sm font-medium">{person.designation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>}

                {/* Footer Message */}
                {society && <div className="mt-24 p-10 bg-white rounded-[2rem] border border-emerald-100 shadow-inner text-center">
                    <Heart className="mx-auto text-emerald-500 w-12 h-12 mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Join the Community</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Whether you are a fresh graduate or a seasoned professional, your journey with BAUST doesn't end at graduation. Stay connected and contribute to the next generation of graduates.
                    </p>
                    <Link
                        href={`/${department.slug}/clubs`}
                        className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200"
                    >
                        Learn More About {society.name}
                    </Link>
                </div>}
            </main>
        </DeptPageShell>
    );
}
