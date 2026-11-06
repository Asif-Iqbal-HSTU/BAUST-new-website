import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CSE_TABS, CSE_DEPT_NAME, type DeptInfo } from '@/data/cseData';
import { deptIcon, pageText } from '@/lib/dept-icons';
import { Users, Briefcase, GraduationCap, Zap, Heart, Eye, Download } from 'lucide-react';

interface ActivityItem {
    title: string;
    icon?: string | null;
    description: string;
}

interface CommitteeMember {
    role: string;
    name: string;
    designation?: string | null;
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
    type: 'job_holder' | 'higher_study' | string;
    name: string;
    batch?: string | null;
    passing_year?: string | null;
    designation?: string | null;
    organization?: string | null;
    image?: string | null;
}

interface Props {
    department?: DeptInfo | null;
    alumni?: AlumniData | null;
    alumniMembers?: AlumnusItem[];
}

function AlumnusCard({ person }: { person: AlumnusItem }) {
    return (
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all flex items-center gap-5 group">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-emerald-50 flex-shrink-0 flex items-center justify-center">
                {person.image ? (
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                    <Users className="w-9 h-9 text-emerald-600" />
                )}
            </div>
            <div className="min-w-0">
                <h3 className="text-lg font-bold text-gray-900 leading-snug">{person.name}</h3>
                {person.designation && <p className="text-emerald-700 text-sm font-semibold">{person.designation}</p>}
                {person.organization && <p className="text-gray-500 text-sm">{person.organization}</p>}
                {(person.batch || person.passing_year) && (
                    <p className="text-gray-400 text-xs mt-1">
                        {[person.batch, person.passing_year && `Passed ${person.passing_year}`].filter(Boolean).join(' · ')}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function Alumni({ department, alumni, alumniMembers = [] }: Props) {
    const title = alumni?.name || `${department?.short_name || 'CSE'} Alumni`;
    const description = alumni?.description;
    const activities = Array.isArray(alumni?.activities) ? alumni.activities : [];
    const committee = Array.isArray(alumni?.committee) ? alumni.committee : [];
    const jobHolders = alumniMembers.filter(a => a.type !== 'higher_study');
    const higherStudy = alumniMembers.filter(a => a.type === 'higher_study');

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${title} - BAUST`} />
            <Navbar />
            <PageHero 
                title={title} 
                subtitle={pageText(department, 'alumni_intro', 'Fostering Connections, Empowering Future Leaders')} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.name || CSE_DEPT_NAME} activeTab="Alumni" tabs={CSE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Introduction */}
                {(description || alumni?.member_count || alumni?.established) && (
                <div className="max-w-3xl mb-20">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Building a Legacy</h2>
                    {description && (
                        <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                            {description}
                        </p>
                    )}
                    {(alumni?.member_count || alumni?.established) && (
                        <div className="flex flex-wrap gap-4 mt-6">
                            {alumni?.member_count && (
                                <span className="bg-emerald-50 px-5 py-2.5 rounded-2xl border border-emerald-100 text-emerald-700 font-bold text-sm">{alumni.member_count}</span>
                            )}
                            {alumni?.established && (
                                <span className="bg-blue-50 px-5 py-2.5 rounded-2xl border border-blue-100 text-blue-700 font-bold text-sm">{alumni.established}</span>
                            )}
                        </div>
                    )}
                </div>
                )}

                {/* Alumni Directory */}
                {jobHolders.length > 0 && (
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-12">
                            <Briefcase className="text-emerald-600 w-8 h-8" />
                            <h2 className="text-3xl font-bold text-gray-900">Alumni in Profession</h2>
                            <div className="h-px flex-grow bg-emerald-100" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobHolders.map(person => <AlumnusCard key={person.id} person={person} />)}
                        </div>
                    </section>
                )}

                {higherStudy.length > 0 && (
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-12">
                            <GraduationCap className="text-emerald-600 w-8 h-8" />
                            <h2 className="text-3xl font-bold text-gray-900">Alumni in Higher Studies</h2>
                            <div className="h-px flex-grow bg-emerald-100" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {higherStudy.map(person => <AlumnusCard key={person.id} person={person} />)}
                        </div>
                    </section>
                )}

                {/* Activities Section */}
                {activities.length > 0 && (
                <section className="mb-24">
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
                        {/* More card */}
                        <div className="bg-emerald-600 p-8 rounded-3xl shadow-lg flex flex-col justify-center text-white relative overflow-hidden group">
                            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                <Zap size={150} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 relative z-10">And More...</h3>
                            <p className="text-emerald-100 text-sm leading-relaxed relative z-10">
                                Other activities as decided by the executive committee to ensure the continuous growth of our community.
                            </p>
                        </div>
                    </div>
                </section>
                )}

                {/* Committee Section */}
                {(committee.length > 0 || alumni?.committee_pdf) && (
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Meet Your Committee</h2>
                        <div className="h-px flex-grow bg-emerald-100" />
                        {alumni?.committee_pdf && (
                            <div className="flex gap-2">
                                <a href={alumni.committee_pdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all">
                                    <Eye size={16} /> View PDF
                                </a>
                                <a href={alumni.committee_pdf} download className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all">
                                    <Download size={16} /> Download
                                </a>
                            </div>
                        )}
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
                                    {person.designation && <p className="text-gray-500 text-sm font-medium">{person.designation}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                )}

                {/* Footer Message */}
                <div className="mt-24 p-10 bg-white rounded-[2rem] border border-emerald-100 shadow-inner text-center">
                    <Heart className="mx-auto text-emerald-500 w-12 h-12 mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Join the Community</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Whether you are a fresh graduate or a seasoned professional, your journey with BAUST doesn't end at graduation. Stay connected and contribute to the next generation of engineers.
                    </p>
                    <a
                        href="/cse/cse-society"
                        className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200"
                    >
                        Learn More About Society
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    );
}
