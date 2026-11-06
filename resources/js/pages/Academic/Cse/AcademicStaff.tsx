import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CSE_TABS, CSE_DEPT_NAME, FacultyMember, type DeptInfo } from '@/data/cseData';
import { pageText } from '@/lib/dept-icons';
import ProfileModal, { getProfileSlug } from '@/custom_components/ProfileModal';

function StaffCard({ member, onClick }: { member: FacultyMember; onClick?: () => void }) {
    return (
        <div 
            onClick={onClick}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full cursor-pointer"
        >
            <div className="h-1.5 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-6 flex flex-col items-center text-center flex-grow">
                {/* Photo */}
                <div className="mb-4">
                    <img
                        src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=10b981&color=fff&size=128&font-size=0.33`}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover shadow-sm border-2 border-emerald-50"
                        onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=10b981&color=fff&size=128&font-size=0.33`;
                        }}
                    />
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                    {member.designation}
                </span>

                {/* Contact Info */}
                <div className="w-full space-y-2 text-sm border-t border-gray-100 pt-4 mt-auto">
                    {member.phone && (
                        <div className="flex items-center justify-center gap-2 text-gray-600">
                             <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                             <span>{member.phone}</span>
                        </div>
                    )}
                    {member.email && (
                        <div className="flex items-center justify-center gap-2 text-gray-600 break-all">
                             <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                             <span className="text-xs">{member.email}</span>
                        </div>
                    )}
                    {member.education && member.education.length > 0 && (
                        <div className="pt-2">
                            {member.education.map((edu, idx) => (
                                <p key={idx} className="text-[11px] text-gray-400 italic leading-snug">{edu}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function CseStaff({ staff, department }: { staff: FacultyMember[]; department?: DeptInfo | null }) {
    const [selectedMember, setSelectedMember] = useState<any | null>(null);
    const exStaff = staff.filter(m => m.status === 'ex_faculty');
    const activeStaff = staff.filter(m => m.status !== 'ex_faculty');

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
        <div className="min-h-screen flex flex-col font-sans" style={{ background: '#f8fafc' }}>
            <Head title={`Academic Staff - ${department?.short_name || 'CSE'} - BAUST`} />
            <Navbar />
            <PageHero title={department?.name || CSE_DEPT_NAME} subtitle={null} compact={true} />
            <DeptSubNav departmentName={department?.short_name || CSE_DEPT_NAME} activeTab="Academic Staff" tabs={CSE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                <div className="max-w-3xl mb-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4 italic tracking-tight">Academic Staff</h1>
                    <p className="text-gray-600 text-lg">
                        {pageText(department, 'staff_intro', 'Meet our dedicated technical and administrative support team who ensure the smooth operation of our laboratories and academic activities.')}
                    </p>
                </div>

                <div className="space-y-20">
                    {/* Academic Staff */}
                    {activeStaff.length > 0 && (
                        <section>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {activeStaff.map((member) => (
                                    <StaffCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Ex Academic Staff */}
                    {exStaff.length > 0 && (
                        <section className="pt-8 border-t border-dashed border-slate-200">
                            <h2 className="text-2xl font-bold text-gray-500 mb-8 border-l-4 border-slate-300 pl-4 uppercase tracking-wider">Ex Academic Staff</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 opacity-85 hover:opacity-100 transition-opacity duration-300">
                                {exStaff.map((member) => (
                                    <StaffCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>

            </main>
            <Footer />

            <ProfileModal member={selectedMember} onClose={handleCloseModal} />
        </div>
    );
}
