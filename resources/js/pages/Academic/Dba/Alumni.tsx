import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { DBA_TABS, DBA_DEPT_NAME } from '@/data/dbaData';
import { Users, Briefcase, GraduationCap, Building2, Search, Award, Heart, Coffee, ShieldCheck } from 'lucide-react';

interface ActivityItem {
    title: string;
    description: string;
}

interface CommitteeMember {
    role: string;
    name: string;
    contact?: string | null;
    designation?: string | null;
}

interface SocietyData {
    id?: number;
    name: string;
    slug?: string;
    description?: string | null;
    member_count?: string | null;
    activities?: ActivityItem[] | string | null;
    committee?: CommitteeMember[] | string | null;
}

interface AlumniMember {
    id: number;
    name: string;
    batch?: string | null;
    company?: string | null;
    designation?: string | null;
    category?: string | null;
    higher_study?: string | null;
    photo?: string | null;
    email?: string | null;
    phone?: string | null;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    society?: SocietyData | null;
    alumni: AlumniMember[];
}

const DEFAULT_ACTIVITIES: ActivityItem[] = [
    { title: "Corporate Mentorship & Resume Clinics", description: "Senior alumni guide graduating batches with mock interviews and career planning." },
    { title: "Annual Executive Networking Dinner", description: "A prestigious homecoming event bringing together alumni, faculty, and industry partners." },
    { title: "Job Referrals & Campus Recruitment", description: "Direct placement opportunities at private banks, multinationals, and RMG conglomerates." },
    { title: "Student Scholarship & Emergency Fund", description: "Alumni-funded stipends supporting meritorious DBA students facing financial hardships." }
];

const DEFAULT_COMMITTEE: CommitteeMember[] = [
    { role: "President", name: "Tanvir Ahmed", designation: "Relationship Manager, BRAC Bank" },
    { role: "Vice President", name: "Sadia Rahman", designation: "Brand Manager, Unilever BD" },
    { role: "General Secretary", name: "Fahim Shahriar", designation: "HR Executive, Square Textiles" },
    { role: "Treasurer", name: "Nusrat Jahan", designation: "Senior Officer, Eastern Bank" },
    { role: "Organizing Secretary", name: "Tahmid Hasan", designation: "Supply Chain Analyst, Beximco" }
];

export default function DbaAlumni({ department, society, alumni = [] }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const parseData = (val: any, fallback: any) => {
        if (!val) return fallback;
        if (typeof val === 'string') {
            try {
                return JSON.parse(val);
            } catch (e) {
                return fallback;
            }
        }
        return val;
    };

    const activities: ActivityItem[] = parseData(society?.activities, DEFAULT_ACTIVITIES);
    const committee: CommitteeMember[] = parseData(society?.committee, DEFAULT_COMMITTEE);

    const filteredAlumni = alumni.filter(item => {
        const matchesSearch = 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.company && item.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.designation && item.designation.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.batch && item.batch.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Alumni Network - ${department?.short_name || 'DBA'} - BAUST`} />
            <Navbar />
            <PageHero 
                title="BAUST BBA Alumni Association" 
                subtitle="Fostering Lifelong Corporate Connections, Mentorship, and Global Career Excellence" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || DBA_DEPT_NAME} activeTab="Alumni" tabs={DBA_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

                {/* Hero Card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 sm:p-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                                <Users className="w-7 h-7" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                                    Official Alumni Network
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                                    {society?.name || 'BAUST BBA Alumni Association'}
                                </h2>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed text-base text-justify">
                            {society?.description || 'The BAUST BBA Alumni Association unites more than 500 business graduates flourishing across commercial banking, multinational FMCGs, RMG conglomerates, entrepreneurial start-ups, and international graduate schools. The association bridges academic life with professional achievement through mentorship and career advancement.'}
                        </p>

                        {/* Activities */}
                        <div className="mt-10 pt-10 border-t border-gray-100">
                            <h3 className="text-lg font-black text-gray-900 mb-6">Association Programs & Strategic Initiatives</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {activities.map((act, idx) => (
                                    <div key={idx} className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-4">
                                        <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-sm flex-shrink-0 mt-0.5">
                                            <Briefcase size={16} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{act.title}</h4>
                                            <p className="text-xs text-gray-600 mt-1 leading-relaxed">{act.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Executive Committee */}
                        {committee.length > 0 && (
                            <div className="mt-12 pt-10 border-t border-gray-100">
                                <h3 className="text-lg font-black text-gray-900 mb-6">Alumni Executive Committee</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {committee.map((member, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                                    {member.role}
                                                </span>
                                                <h4 className="font-bold text-gray-900 text-sm mt-1">{member.name}</h4>
                                                {member.designation && (
                                                    <p className="text-xs text-gray-500 mt-0.5">{member.designation}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Corporate Placements Directory */}
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <Building2 className="w-6 h-6 text-emerald-700" />
                                <h3 className="text-2xl font-black text-gray-900">Corporate & Global Placements Directory</h3>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Verified employment records and graduate study destinations of DBA alumni</p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text"
                                placeholder="Search by name, company, or batch..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Alumni Placements Grid */}
                    {filteredAlumni.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAlumni.map((alum) => (
                                <div 
                                    key={alum.id}
                                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            {alum.batch && (
                                                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-emerald-100">
                                                    Batch: {alum.batch}
                                                </span>
                                            )}
                                            {alum.category && (
                                                <span className="bg-blue-50 text-blue-800 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-blue-100">
                                                    {alum.category}
                                                </span>
                                            )}
                                        </div>

                                        <h4 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                            {alum.name}
                                        </h4>

                                        {alum.designation && (
                                            <p className="text-xs font-semibold text-emerald-800">
                                                {alum.designation}
                                            </p>
                                        )}

                                        {alum.company && (
                                            <p className="text-xs text-gray-600 flex items-center gap-1.5">
                                                <Building2 size={13} className="text-gray-400 flex-shrink-0" />
                                                <span>{alum.company}</span>
                                            </p>
                                        )}

                                        {alum.higher_study && (
                                            <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 text-xs text-purple-900 flex items-start gap-2">
                                                <GraduationCap size={15} className="text-purple-600 flex-shrink-0 mt-0.5" />
                                                <span>{alum.higher_study}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center space-y-3">
                            <Users className="w-10 h-10 text-gray-300 mx-auto" />
                            <h4 className="text-base font-bold text-gray-800">No alumni records found</h4>
                            <p className="text-xs text-gray-500">Try searching with a different name, organization, or batch number.</p>
                        </div>
                    )}
                </div>

            </main>
            <Footer />
        </div>
    );
}
