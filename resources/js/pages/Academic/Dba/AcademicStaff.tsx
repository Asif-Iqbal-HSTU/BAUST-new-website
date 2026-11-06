import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { DBA_TABS, DBA_DEPT_NAME, FacultyMember } from '@/data/dbaData';
import ProfileModal, { getProfileSlug } from '@/custom_components/ProfileModal';
import { Users, Phone, Mail, Award, Briefcase } from 'lucide-react';

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    staff: FacultyMember[];
}

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
                        className="w-28 h-28 rounded-full object-cover shadow-sm border-2 border-emerald-50 bg-gray-50"
                        onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=10b981&color=fff&size=128&font-size=0.33`;
                        }}
                    />
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">{member.name}</h3>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-4 border border-emerald-100">
                    {member.designation}
                </span>

                {/* Contact Info */}
                <div className="w-full space-y-2 text-sm border-t border-gray-100 pt-4 mt-auto">
                    {member.phone && (
                        <div className="flex items-center justify-center gap-2 text-gray-600 text-xs">
                            <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{member.phone}</span>
                        </div>
                    )}
                    {member.email && (
                        <div className="flex items-center justify-center gap-2 text-gray-600 text-xs break-all">
                            <Mail className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{member.email}</span>
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

export default function DbaAcademicStaff({ department, staff }: Props) {
    const [selectedMember, setSelectedMember] = useState<FacultyMember | null>(null);

    const maternityLeaveStaff = staff.filter(m => m.status === 'maternity_leave');
    const activeStaff = staff.filter(m => m.status !== 'ex_faculty' && m.status !== 'maternity_leave');
    const exStaff = staff.filter(m => m.status === 'ex_faculty');

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

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Academic Staff - ${department?.short_name || 'DBA'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={`${department?.short_name || 'DBA'} Academic Staff`} 
                subtitle="Dedicated Professionals Providing Administrative and Laboratory Support" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || DBA_DEPT_NAME} activeTab="Academic Staff" tabs={DBA_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                {activeStaff.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {activeStaff.map((member) => (
                            <StaffCard
                                key={member.id}
                                member={member}
                                onClick={() => handleOpenModal(member)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 max-w-lg mx-auto">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-800">Academic Staff Information</h3>
                        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                            Staff details for the Department of Business Administration are maintained by the departmental office. For administrative inquiries, please contact <span className="font-semibold text-emerald-700">dba@baust.edu.bd</span>.
                        </p>
                    </div>
                )}

                {/* Staff on Maternity Leave */}
                {maternityLeaveStaff.length > 0 && (
                    <section className="mt-16 pt-10">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Staff on Maternity Leave</h2>
                            <div className="h-0.5 flex-grow bg-gradient-to-r from-pink-100 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 hover:opacity-100 transition-opacity">
                            {maternityLeaveStaff.map((member) => (
                                <StaffCard
                                    key={member.id}
                                    member={member}
                                    onClick={() => handleOpenModal(member)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Ex Academic Staff / Officers */}
                {exStaff.length > 0 && (
                    <section className="mt-16 pt-10 border-t border-dashed border-gray-200">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl font-bold text-gray-500">Ex Academic Staff / Officers</h2>
                            <div className="h-0.5 flex-grow bg-gradient-to-r from-slate-200 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 opacity-85 hover:opacity-100 transition-opacity">
                            {exStaff.map((member) => (
                                <StaffCard
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
