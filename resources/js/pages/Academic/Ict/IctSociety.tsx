import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { ICT_TABS, ICT_DEPT_NAME, type DeptInfo } from '@/data/ictData';
import { deptIcon, pageText } from '@/lib/dept-icons';
import { Users, Zap, Star, Megaphone, Eye, Download } from 'lucide-react';

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

interface SocietyData {
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

interface Props {
    department?: DeptInfo | null;
    society?: SocietyData | null;
}

export default function IctSociety({ department, society }: Props) {
    const shortName = department?.short_name || 'ICT';
    const title = society?.name || `${shortName} Society of BAUST`;
    const description = society?.description;
    const memberCount = society?.member_count;
    const established = society?.established;
    const pdfUrl = society?.committee_pdf;
    const activities = Array.isArray(society?.activities) ? society.activities : [];
    const committee = Array.isArray(society?.committee) ? society.committee : [];

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${title} - BAUST`} />
            <Navbar />
            <PageHero 
                title={title} 
                subtitle={pageText(department, 'society_intro', 'Fostering Creativity, Teamwork, and Technological Growth')} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || ICT_DEPT_NAME} activeTab="ICT Society" tabs={ICT_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {!society && (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center text-gray-400 mb-24">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-40" />
                        <p className="text-lg font-medium">Society information will be published soon.</p>
                    </div>
                )}

                {/* Introduction Section */}
                {society && (
                <div className={`grid grid-cols-1 ${pdfUrl ? 'lg:grid-cols-2' : ''} gap-16 mb-24 items-center`}>
                    <div>
                        <h2 className="text-4xl font-black text-gray-900 mb-6">A Platform for Innovation</h2>
                        {description && (
                            <p className="text-gray-600 text-lg leading-relaxed mb-8 whitespace-pre-line">
                                {description}
                            </p>
                        )}
                        <div className="flex flex-wrap gap-4">
                            {memberCount && (
                                <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100 flex items-center gap-3 text-emerald-700 font-bold text-sm">
                                    <Users size={20} />
                                    {memberCount}
                                </div>
                            )}
                            {established && (
                                <div className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100 flex items-center gap-3 text-blue-700 font-bold text-sm">
                                    <Star size={20} />
                                    {established}
                                </div>
                            )}
                        </div>
                    </div>

                    {pdfUrl && (
                    <div className="bg-white p-8 lg:p-12 rounded-[3rem] border border-gray-100 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700 text-emerald-600">
                            <Users size={150} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                                <Users size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Official Executive Committee</h3>
                            <p className="text-gray-500 mb-8 font-medium">
                                Download or view the complete list of executive committee members of the {shortName} Society.
                            </p>
                            {pdfUrl && (
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a 
                                        href={pdfUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200"
                                    >
                                        <Eye size={18} /> View PDF
                                    </a>
                                    <a 
                                        href={pdfUrl} 
                                        download 
                                        className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                                    >
                                        <Download size={18} /> Download
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    )}
                </div>
                )}

                {/* Activities Grid */}
                {activities.length > 0 && (
                <section className="mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <Megaphone className="text-emerald-600 w-8 h-8" />
                        <h2 className="text-3xl font-bold text-gray-900">Society Activities</h2>
                        <div className="h-px flex-grow bg-emerald-100" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activities.map((act, idx) => {
                            const IconComponent = deptIcon(act.icon, Zap);
                            return (
                                <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                        <IconComponent size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{act.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{act.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
                )}

                {/* Committee Highlights */}
                {committee.length > 0 && (
                <section className="bg-white rounded-[4rem] p-12 lg:p-16 border border-gray-100 shadow-sm">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            Guided by experienced faculty and driven by passionate student leaders, the society thrives on collective excellence.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {committee.map((person, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-[2.5rem] p-8 flex items-center gap-8 group hover:bg-emerald-50 transition-colors">
                                <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-lg flex-shrink-0 bg-emerald-100 flex items-center justify-center">
                                    {person.image ? (
                                        <img 
                                            src={person.image} 
                                            alt={person.name} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=059669&color=fff&size=128`;
                                            }}
                                        />
                                    ) : (
                                        <Users className="w-12 h-12 text-emerald-600" />
                                    )}
                                </div>
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-white text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-3 shadow-sm">
                                        {person.role}
                                    </span>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{person.name}</h3>
                                    {person.designation && <p className="text-gray-500 text-sm font-semibold">{person.designation}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                )}
            </main>

            <Footer />
        </div>
    );
}
