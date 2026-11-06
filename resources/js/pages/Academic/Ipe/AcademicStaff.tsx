import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { IPE_TABS, IPE_DEPT_NAME, FacultyMember } from '@/data/ipeData';
import ProfileModal, { getProfileSlug } from '@/custom_components/ProfileModal';
import { pageText } from '@/lib/dept-icons';

function StaffCard({ member, onClick }: { member: FacultyMember; onClick?: () => void }) {
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
                <div className="mb-3">
                     <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full">
                        {member.designation}
                    </span>
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
                    <div className="w-full border-t border-gray-100 pt-3 mt-auto">
                        {member.education.map((edu, idx) => (
                            <p key={idx} className="text-[11px] text-gray-400 leading-relaxed italic">{edu}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
    page_texts?: Record<string, string> | null;
}

export default function IpeAcademicStaff({ department, staff = [] }: { department?: DeptInfo | null; staff: FacultyMember[] }) {
    const [selectedMember, setSelectedMember] = useState<any | null>(null);
    const exStaff = staff.filter(m => m.status === 'ex_faculty');
    const maternityLeaveStaff = staff.filter(m => m.status === 'maternity_leave');
    const activeStaff = staff.filter(m => m.status !== 'ex_faculty' && m.status !== 'maternity_leave');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const profileSlug = params.get('profile');
        if (profileSlug) {
            const match = staff.find(m => getProfileSlug(m.name) === profileSlug);
            if (match) {
                setSelectedMember(match);
            }
        }
    }, [staff]);

    const handleCloseModal = () => {
        setSelectedMember(null);
        const url = new URL(window.location.href);
        url.searchParams.delete('profile');
        window.history.replaceState({}, '', url.pathname + url.search);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Academic Staff - ${department?.short_name || 'IPE'} - BAUST`} />
            <Navbar />
            <PageHero title={department?.name || "Department of Industrial and Production Engineering (IPE)"} subtitle={null} compact={true} />
            <DeptSubNav departmentName={department?.short_name || IPE_DEPT_NAME} activeTab="Academic Staff" tabs={IPE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

                {pageText(department, 'staff_intro', '') && (
                    <p className="text-gray-600 text-[15px] leading-relaxed max-w-3xl">{pageText(department, 'staff_intro', '')}</p>
                )}

                {/* Academic Staff */}
                {activeStaff.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Academic Staff</h2>
                            <div className="h-0.5 flex-grow bg-gradient-to-r from-emerald-100 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {activeStaff.map((member) => (
                                <StaffCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Staff on Maternity Leave */}
                {maternityLeaveStaff.length > 0 && (
                    <section className="pt-8">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Staff on Maternity Leave</h2>
                            <div className="h-0.5 flex-grow bg-gradient-to-r from-pink-100 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {maternityLeaveStaff.map((member) => (
                                <StaffCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Ex Academic Staff */}
                {exStaff.length > 0 && (
                    <section className="pt-8 border-t border-dashed border-slate-200">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl font-bold text-gray-500">Ex Academic Staff</h2>
                            <div className="h-0.5 flex-grow bg-gradient-to-r from-slate-100 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-85 hover:opacity-100 transition-opacity duration-300">
                            {exStaff.map((member) => (
                                <StaffCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
                            ))}
                        </div>
                    </section>
                )}

                {staff.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-lg font-medium">No academic staff found.</p>
                    </div>
                )}

            </main>
            <Footer />

            <ProfileModal member={selectedMember} onClose={handleCloseModal} />
        </div>
    );
}
