import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { DBA_TABS, DBA_DEPT_NAME, FacultyMember } from '@/data/dbaData';
import ProfileModal, { getProfileSlug } from '@/custom_components/ProfileModal';
import { Users, Search, Mail, Phone, GraduationCap, Building2 } from 'lucide-react';

type CategoryFilter = 'all' | 'professor' | 'associate_professor' | 'assistant_professor' | 'lecturer';

const CATEGORY_LABELS: Record<CategoryFilter, string> = {
    all: 'All Designations',
    professor: 'Professors',
    associate_professor: 'Associate Professors',
    assistant_professor: 'Assistant Professors',
    lecturer: 'Lecturers',
};

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    members: FacultyMember[];
}

function FacultyCard({ member, onClick }: { member: FacultyMember; onClick?: () => void }) {
    return (
        <div 
            onClick={onClick}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer"
        >
            <div className="h-1 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-6 flex flex-col items-center text-center flex-grow">
                {/* Photo */}
                <div className="relative mb-4">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-300 to-green-500 opacity-0 group-hover:opacity-25 transition-opacity" />
                    <img
                        src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff&size=160&font-size=0.33`}
                        alt={member.name}
                        className="relative w-36 h-36 rounded-2xl object-cover object-top shadow-sm z-10 bg-gray-50 border border-gray-100"
                        onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff&size=160&font-size=0.33`;
                        }}
                    />
                </div>

                {/* Name & Designation */}
                <h3 className="text-base font-bold text-gray-900 leading-snug mb-1 group-hover:text-emerald-700 transition-colors">
                    {member.name}
                </h3>
                <div className="mb-3 space-x-1">
                    <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-100">
                        {member.designation}
                    </span>
                    {member.status === 'study_leave' && (
                        <span className="inline-block bg-amber-50 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-200">
                            On Study Leave
                        </span>
                    )}
                </div>

                {/* Contact Info */}
                <div className="w-full space-y-2 text-left border-t border-gray-100 pt-3 mt-1">
                    {member.phone && (
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span className="truncate">{member.phone}</span>
                        </div>
                    )}
                    {member.email && (
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Mail className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span className="truncate">{member.email}</span>
                        </div>
                    )}
                </div>

                {/* Education Preview */}
                {member.education && member.education.length > 0 && (
                    <div className="w-full border-t border-gray-100 pt-3 mt-auto text-left">
                        {member.education.slice(0, 2).map((edu, idx) => (
                            <p key={idx} className="text-[11px] text-gray-400 italic line-clamp-1">
                                {edu}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function DbaFaculty({ department, members }: Props) {
    const [filter, setFilter] = useState<CategoryFilter>('all');
    const [facultyType, setFacultyType] = useState<'permanent' | 'contractual' | 'adjunct'>('permanent');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMember, setSelectedMember] = useState<FacultyMember | null>(null);

    // Deep linking via URL query params (?profile=slug)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const profileSlug = params.get('profile');
        if (profileSlug) {
            const match = members.find(m => getProfileSlug(m.name) === profileSlug);
            if (match) {
                setSelectedMember(match);
            }
        }
    }, [members]);

    const handleOpenModal = (member: FacultyMember) => {
        setSelectedMember(member);
        const slug = getProfileSlug(member.name);
        const newUrl = `${window.location.pathname}?profile=${slug}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    };

    const handleCloseModal = () => {
        setSelectedMember(null);
        window.history.pushState({ path: window.location.pathname }, '', window.location.pathname);
    };

    const exFaculty = members.filter(m => m.status === 'ex_faculty');
    const activeFaculty = members.filter(m => m.status !== 'ex_faculty');

    // Filter by type (permanent/adjunct)
    const typeFiltered = activeFaculty.filter(m => (m.type || 'permanent') === facultyType);

    // Filter by category
    const categoryFiltered = typeFiltered.filter(m => {
        if (filter === 'all') return true;
        const des = (m.designation || '').toLowerCase();
        if (filter === 'professor') return des.includes('professor') && !des.includes('associate') && !des.includes('assistant');
        if (filter === 'associate_professor') return des.includes('associate');
        if (filter === 'assistant_professor') return des.includes('assistant');
        if (filter === 'lecturer') return des.includes('lecturer');
        return true;
    });

    // Filter by search query
    const filteredMembers = categoryFiltered.filter(m => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            m.name.toLowerCase().includes(q) ||
            m.designation.toLowerCase().includes(q) ||
            (m.email && m.email.toLowerCase().includes(q)) ||
            (m.education && m.education.some(e => e.toLowerCase().includes(q)))
        );
    });

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Faculty Members - ${department?.short_name || 'DBA'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={`${department?.short_name || 'DBA'} Faculty Members`} 
                subtitle="Distinguished Educators, Industry Researchers, and Corporate Mentors" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || DBA_DEPT_NAME} activeTab="Faculty Members" tabs={DBA_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                
                {/* Controls Card */}
                <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 mb-12 space-y-6">
                    {/* Top Row: Type Tabs & Search */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex bg-gray-100/80 p-1.5 rounded-2xl w-full md:w-auto">
                            <button
                                onClick={() => setFacultyType('permanent')}
                                className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                    facultyType === 'permanent'
                                        ? 'bg-white text-emerald-700 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                Permanent Faculty ({activeFaculty.filter(m => (m.type || 'permanent') === 'permanent').length})
                            </button>
                            <button
                                onClick={() => setFacultyType('contractual')}
                                className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                    facultyType === 'contractual'
                                        ? 'bg-white text-emerald-700 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                Contractual Faculty ({activeFaculty.filter(m => m.type === 'contractual').length})
                            </button>
                            <button
                                onClick={() => setFacultyType('adjunct')}
                                className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                    facultyType === 'adjunct'
                                        ? 'bg-white text-emerald-700 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                Adjunct / Guest Faculty ({activeFaculty.filter(m => m.type === 'adjunct').length})
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search faculty by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50/50"
                            />
                        </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {(Object.keys(CATEGORY_LABELS) as CategoryFilter[]).map((key) => (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                    filter === key
                                        ? 'bg-emerald-700 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {CATEGORY_LABELS[key]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Faculty Grid */}
                {filteredMembers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredMembers.map((member) => (
                            <FacultyCard
                                key={member.id}
                                member={member}
                                onClick={() => handleOpenModal(member)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-800">No faculty members found</h3>
                        <p className="text-gray-500 text-sm mt-1">Try adjusting your search criteria or category filter.</p>
                    </div>
                )}

                {/* Ex Faculty Members */}
                {exFaculty.length > 0 && (
                    <section className="mt-16 pt-10 border-t border-dashed border-gray-200">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl font-bold text-gray-500">Ex Faculty Members</h2>
                            <div className="h-0.5 flex-grow bg-gradient-to-r from-slate-200 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 opacity-85 hover:opacity-100 transition-opacity">
                            {exFaculty.map((member) => (
                                <FacultyCard
                                    key={member.id}
                                    member={member}
                                    onClick={() => handleOpenModal(member)}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* Profile Modal */}
            {selectedMember && (
                <ProfileModal
                    member={selectedMember as any}
                    onClose={handleCloseModal}
                />
            )}

            <Footer />
        </div>
    );
}
