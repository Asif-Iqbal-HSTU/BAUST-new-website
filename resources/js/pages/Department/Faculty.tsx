import React, { useState, useEffect } from 'react';
import DeptPageShell from '@/custom_components/DeptPageShell';
import { DeptPageProps, FacultyMember, deptShort } from '@/data/departmentData';
import ProfileModal, { getProfileSlug } from '@/custom_components/ProfileModal';

type CategoryFilter = 'all' | 'professor' | 'associate_professor' | 'assistant_professor' | 'lecturer';

const CATEGORY_LABELS: Record<CategoryFilter, string> = {
    all: 'All',
    professor: 'Professors',
    associate_professor: 'Associate Professors',
    assistant_professor: 'Assistant Professors',
    lecturer: 'Lecturers',
};

function FacultyCard({ member, onClick }: { member: FacultyMember; onClick?: () => void }) {
    return (
        <div 
            onClick={onClick}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer"
        >
            <div className="h-1 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-5 flex flex-col items-center text-center flex-grow">
                {/* Photo */}
                <div className="relative mb-4">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-emerald-300 to-green-500 opacity-0 group-hover:opacity-25 transition-opacity" />
                    <img
                        src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff&size=128&font-size=0.33`}
                        alt={member.name}
                        className="relative w-36 h-36 rounded-xl object-cover object-top shadow-sm z-10 bg-gray-50"
                        onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff&size=128&font-size=0.33`;
                        }}
                    />
                </div>

                {/* Name & Designation */}
                <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-1">{member.name}</h3>
                <div className="mb-2 flex flex-wrap items-center justify-center gap-1">
                     <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full">
                        {member.designation}
                    </span>
                    {member.status === 'study_leave' && (
                        <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full">
                            On Study Leave
                        </span>
                    )}
                </div>

                {/* Contact Info */}
                <div className="w-full space-y-1.5 text-left border-t border-gray-100 pt-3 mt-1">
                    {member.phone && (
                        <div className="flex items-start gap-2">
                            <svg className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <p className="text-[11px] text-gray-500 break-all">{member.phone}</p>
                        </div>
                    )}
                    {member.email && (
                        <div className="flex items-start gap-2">
                            <svg className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <p className="text-[11px] text-gray-500 break-all">{member.email}</p>
                        </div>
                    )}
                </div>

                {/* Education */}
                {member.education && member.education.length > 0 && (
                    <div className="w-full border-t border-gray-100 pt-2.5 mt-auto">
                        {member.education.slice(0, 2).map((edu, idx) => (
                            <p key={idx} className="text-[11px] text-gray-500 leading-relaxed italic line-clamp-1">{edu}</p>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default function DepartmentFaculty({ department, tabs, members }: DeptPageProps & { members: FacultyMember[] }) {
    const [filter, setFilter] = useState<CategoryFilter>('all');
    const [selectedMember, setSelectedMember] = useState<any | null>(null);

    const filtered = filter === 'all'
        ? members
        : members.filter(m => m.category === filter);

    const counts: Record<CategoryFilter, number> = {
        all: members.length,
        professor: members.filter(m => m.category === 'professor').length,
        associate_professor: members.filter(m => m.category === 'associate_professor').length,
        assistant_professor: members.filter(m => m.category === 'assistant_professor').length,
        lecturer: members.filter(m => m.category === 'lecturer').length,
    };

    const permanentFaculty = filtered.filter(m => m.type === 'permanent' && m.status === 'active');
    const contractualFaculty = filtered.filter(m => m.type === 'contractual' && m.status === 'active');
    const adjunctFaculty = filtered.filter(m => m.type === 'adjunct' && m.status === 'active');
    const studyLeaveFaculty = filtered.filter(m => m.status === 'study_leave');
    const exFaculty = filtered.filter(m => m.status === 'ex_faculty');

    // Extract HOD to highlight at the top
    const headOfDept = permanentFaculty.find(m => m.is_head);
    const otherPermanentFaculty = permanentFaculty.filter(m => m.id !== headOfDept?.id);

    // Sort by rank: Professor, Associate Professor, Assistant Professor, Lecturer
    const CATEGORY_RANK: Record<string, number> = {
        professor: 1,
        associate_professor: 2,
        assistant_professor: 3,
        lecturer: 4,
        teaching_assistant: 5,
    };

    const sortedOtherPermanentFaculty = [...otherPermanentFaculty].sort((a, b) => {
        if ((a.order || 0) !== (b.order || 0)) {
            return (a.order || 0) - (b.order || 0);
        }
        const rankA = CATEGORY_RANK[a.category || ''] || 99;
        const rankB = CATEGORY_RANK[b.category || ''] || 99;
        return rankA - rankB;
    });

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

    const handleCloseModal = () => {
        setSelectedMember(null);
        const url = new URL(window.location.href);
        url.searchParams.delete('profile');
        window.history.replaceState({}, '', url.pathname + url.search);
    };

    return (
        <DeptPageShell
            department={department}
            tabs={tabs}
            activeTab="Faculty Members"
            title={`Faculty Members - ${deptShort(department)}`}
            overlay={<ProfileModal member={selectedMember} onClose={handleCloseModal} />}
        >

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Category Filter */}
                <div className="flex flex-wrap items-center gap-2 mb-10 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm w-fit">
                    {(Object.keys(CATEGORY_LABELS) as CategoryFilter[]).map((key) => (
                        <button
                            key={key}
                            onClick={() => setFilter(key)}
                            className={`
                                px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200
                                ${filter === key
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'bg-transparent text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                                }
                            `}
                        >
                            {CATEGORY_LABELS[key]}
                            <span className={`ml-1.5 text-[11px] ${filter === key ? 'text-emerald-200' : 'text-gray-400'}`}>({counts[key]})</span>
                        </button>
                    ))}
                </div>

                {/* Sections */}
                <div className="space-y-16">
                    {/* Permanent Faculty */}
                    {permanentFaculty.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Faculty Members</h2>
                                <div className="h-0.5 flex-grow bg-gradient-to-r from-emerald-100 to-transparent" />
                            </div>

                            {/* Head of Department Featured Card */}
                            {headOfDept && (
                                <div className="flex justify-center mb-12 animate-in fade-in duration-300">
                                    <div className="w-full max-w-sm">
                                        <div 
                                            onClick={() => setSelectedMember(headOfDept)}
                                            className="bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 p-[3px] rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-sm z-20">
                                                Head of Dept
                                            </div>
                                            <div className="bg-white rounded-[21px] p-6 flex flex-col items-center text-center">
                                                <div className="relative mb-4">
                                                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-300 to-teal-500 opacity-20 blur-sm group-hover:opacity-45 transition-opacity" />
                                                    <img
                                                        src={headOfDept.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(headOfDept.name)}&background=059669&color=fff&size=144&font-size=0.33`}
                                                        alt={headOfDept.name}
                                                        className="relative w-36 h-36 rounded-2xl object-cover object-top shadow-sm z-10 bg-gray-50 border border-emerald-50"
                                                        onError={(e) => {
                                                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(headOfDept.name)}&background=059669&color=fff&size=144&font-size=0.33`;
                                                        }}
                                                    />
                                                </div>
                                                <h3 className="text-base font-bold text-gray-900 leading-snug mb-1">{headOfDept.name}</h3>
                                                <p className="text-xs text-emerald-700 font-extrabold uppercase tracking-widest bg-emerald-50 border border-emerald-100/50 px-3.5 py-0.5 rounded-full mb-4">
                                                    {headOfDept.designation}
                                                </p>
                                                <div className="w-full space-y-1.5 text-left border-t border-gray-100 pt-4 mt-1">
                                                    {headOfDept.phone && (
                                                        <div className="flex items-center gap-2 text-gray-600 text-xs">
                                                            <svg className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                                            <span className="truncate">{headOfDept.phone}</span>
                                                        </div>
                                                    )}
                                                    {headOfDept.email && (
                                                        <div className="flex items-center gap-2 text-gray-600 text-xs">
                                                            <svg className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                            <span className="truncate break-all">{headOfDept.email}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Sorted Faculty Members Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {sortedOtherPermanentFaculty.map((member) => (
                                    <FacultyCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Contractual Faculty */}
                    {contractualFaculty.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Contractual Faculty</h2>
                                <div className="h-0.5 flex-grow bg-gradient-to-r from-emerald-100 to-transparent" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {contractualFaculty.map((member) => (
                                    <FacultyCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Adjunct Faculty */}
                    {adjunctFaculty.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Adjunct Faculty</h2>
                                <div className="h-0.5 flex-grow bg-gradient-to-r from-emerald-100 to-transparent" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {adjunctFaculty.map((member) => (
                                    <FacultyCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Faculty on Study Leave */}
                    {studyLeaveFaculty.length > 0 && (
                        <section>
                             <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Faculty on Study Leave</h2>
                                <div className="h-0.5 flex-grow bg-gradient-to-r from-amber-100 to-transparent" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                                {studyLeaveFaculty.map((member) => (
                                    <FacultyCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
                                ))}
                            </div>
                        </section>
                    )}
                    {/* Ex Faculty Members */}
                    {exFaculty.length > 0 && (
                        <section className="pt-8 border-t border-dashed border-slate-200">
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold text-gray-500">Ex Faculty Members</h2>
                                <div className="h-0.5 flex-grow bg-gradient-to-r from-slate-100 to-transparent" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-85 hover:opacity-100 transition-opacity duration-300">
                                {exFaculty.map((member) => (
                                    <FacultyCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-lg font-medium">No members match your current filter.</p>
                    </div>
                )}

            </main>
        </DeptPageShell>
    );
}
