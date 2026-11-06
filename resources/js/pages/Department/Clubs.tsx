import React from 'react';
import DeptPageShell from '@/custom_components/DeptPageShell';
import { DeptInfo, DeptPageProps, deptShort } from '@/data/departmentData';
import { deptIcon, pageText } from '@/lib/dept-icons';
import { Users, FileText, Download, Eye, Zap, Star, Megaphone } from 'lucide-react';

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

interface SocietyData {
    id?: number;
    name: string;
    slug?: string;
    type?: string | null;
    description?: string | null;
    member_count?: string | null;
    established?: string | null;
    committee_pdf?: string | null;
    activities?: ActivityItem[] | null;
    committee?: CommitteeMember[] | null;
}

interface Props extends DeptPageProps {
    department: DeptInfo & { page_texts?: Record<string, string> | null };
    society?: SocietyData | null;
    societies?: SocietyData[];
}

export default function DepartmentClubs({ department, tabs, society, societies }: Props) {
    const title = society?.name || `${deptShort(department)} Clubs & Societies`;
    const list = societies ?? (society ? [society] : []);

    return (
        <DeptPageShell
            department={department}
            tabs={tabs}
            activeTab={society?.name || 'Clubs & Societies'}
            title={title}
            heroTitle={title}
            heroSubtitle={pageText(department, 'society_intro', 'Nurturing Innovation, Leadership, and Excellence')}
        >

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
                {list.length === 0 && (
                    <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Clubs & Societies Coming Soon</h3>
                        <p className="text-gray-500">Details of the department's student clubs and societies will be published here.</p>
                    </div>
                )}
                {list.map((s, idx) => (
                    <SocietySection key={s.id ?? idx} society={s} showName={list.length > 1} />
                ))}
            </main>
        </DeptPageShell>
    );
}

function SocietySection({ society, showName }: { society: SocietyData; showName: boolean }) {
    const description = society.description || '';
    const memberCount = society.member_count ? (/member/i.test(society.member_count) ? society.member_count : `${society.member_count} Members`) : null;
    const established = society.established ? (/est/i.test(society.established) ? society.established : `Est. ${society.established}`) : null;
    const pdfUrl = society.committee_pdf || null;
    const activities = society.activities ?? [];
    const committee = society.committee ?? [];

    return (
        <section>
            {/* Introduction & PDF Section */}
            <div className={`grid grid-cols-1 ${pdfUrl ? 'lg:grid-cols-2' : ''} gap-16 mb-24 items-center`}>
                <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">{showName ? society.name : 'A Platform for Growth'}</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8 whitespace-pre-line">
                        {description}
                    </p>
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

                {pdfUrl && <div className="bg-white p-8 lg:p-12 rounded-[3rem] border border-gray-100 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700 text-emerald-600">
                        <FileText size={150} />
                    </div>
                    <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                            <Users size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Official Executive Committee</h3>
                        <p className="text-gray-500 mb-8 font-medium">
                            Download or view the complete list of executive committee members and constitution for the society.
                        </p>
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
                    </div>
                </div>}
            </div>

            {/* Activities Grid */}
            {activities.length > 0 && <section className="mb-24">
                <div className="flex items-center gap-4 mb-12">
                    <Megaphone className="text-emerald-600 w-8 h-8" />
                    <h2 className="text-3xl font-bold text-gray-900">Planned Activities</h2>
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
            </section>}

            {/* Committee Highlights */}
            {committee.length > 0 && <section className="bg-white rounded-[4rem] p-12 lg:p-16 border border-gray-100 shadow-sm">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Guided by experienced faculty and driven by passionate student leaders, the society thrives on collective excellence.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {committee.map((person, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-[2.5rem] p-8 flex items-center gap-8 group hover:bg-emerald-50 transition-colors">
                            <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-lg flex-shrink-0 bg-emerald-50 flex items-center justify-center">
                                {person.image ? (
                                    <img 
                                        src={person.image} 
                                        alt={person.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                                <p className="text-gray-500 text-sm font-semibold">{person.designation}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>}
        </section>
    );
}
