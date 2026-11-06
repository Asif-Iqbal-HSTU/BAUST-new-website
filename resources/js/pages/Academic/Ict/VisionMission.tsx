import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { ICT_TABS, ICT_DEPT_NAME, type DeptInfo } from '@/data/ictData';

interface ObeItem {
    id?: number;
    type?: string;
    code?: string;
    title?: string | null;
    description?: string;
    text?: string;
}

interface Props {
    department?: DeptInfo | null;
    peos?: ObeItem[];
    plos?: ObeItem[];
}

const DEFAULT_VISION = "To be a center of excellence recognized nationally and internationally for quality education, research, and innovation in Information and Communication Technology.";

export default function IctVisionMission({ department, peos: peosProp, plos: plosProp }: Props) {
    const activePeos = peosProp ?? [];
    const activePlos = plosProp ?? [];

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Vision & Mission - ${department?.short_name || 'ICT'} - BAUST`} />
            <Navbar />
            <PageHero title={department?.name || ICT_DEPT_NAME} subtitle={null} compact={true} />
            <DeptSubNav departmentName={department?.short_name || ICT_DEPT_NAME} activeTab="Vision & Mission" tabs={ICT_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">

                {/* University Vision & Mission */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                            Vision & Mission of the University
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6">
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">Vision</span>
                                </div>
                                <p className="text-gray-600 text-[15px] leading-relaxed mt-3">
                                    The University aspires to transform into a center of excellence in Science, Engineering and Technology, Arts and Business Administration programs by providing innovative, multi-disciplinary courses to the young generation of the country and beyond. It endeavours to make the University a hub of knowledge and be recognized as a leading University of the country.
                                </p>
                            </div>
                            <div className="relative bg-blue-50/60 border border-blue-100 rounded-2xl p-6">
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-blue-600 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">Mission</span>
                                </div>
                                <ol className="text-gray-600 text-[15px] leading-relaxed mt-3 space-y-2 list-decimal pl-4">
                                    <li>Providing state of the art education to achieve disciplinary knowledge, problem solving skill, ability to lead and communication skill.</li>
                                    <li>Providing a collaborative environment enabling free exchange of ideas to flourish research, creativity and innovation.</li>
                                    <li>To remain updated and responsive to the diverse needs of society and transform in a sustainable way.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Department Vision & Mission */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-600" />
                    <div className="p-8 lg:p-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-teal-500 rounded-full" />
                            Vision & Mission of the {department?.short_name || 'ICT'} Department
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative bg-teal-50/60 border border-teal-100 rounded-2xl p-6">
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-teal-600 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">Vision</span>
                                </div>
                                <p className="text-gray-600 text-[15px] leading-relaxed mt-3 whitespace-pre-line">
                                    {department?.vision || DEFAULT_VISION}
                                </p>
                            </div>
                            <div className="relative bg-cyan-50/60 border border-cyan-100 rounded-2xl p-6">
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-cyan-600 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">Mission</span>
                                </div>
                                <div className="text-gray-600 text-[15px] leading-relaxed mt-3 space-y-3 whitespace-pre-line">
                                    {department?.mission ? (
                                        department.mission.split('\n\n').filter(Boolean).map((para, idx) => (
                                            <p key={idx}>{para}</p>
                                        ))
                                    ) : (
                                        <>
                                            <p><strong className="text-gray-800">DM1:</strong> To educate students to meet with the new challenges in the progress of information processing, telecommunications, network architectures, and modern software technologies to provide innovative, creative solutions for societal needs.</p>
                                            <p><strong className="text-gray-800">DM2:</strong> To create and disseminate innovative knowledge through basic and applied research in Information and Communication Technology.</p>
                                            <p><strong className="text-gray-800">DM3:</strong> To contribute to the development of skilled, ethical engineering human resources to impact society in a sustainable way.</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PEOs */}
                {activePeos.length > 0 && (
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-violet-500 via-purple-400 to-violet-600" />
                    <div className="p-8 lg:p-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-violet-500 rounded-full" />
                            Program Educational Objectives (PEOs)
                        </h2>
                        <p className="text-sm text-gray-500 mb-8 pl-4">The educational objectives define what the graduates are expected to perform after graduation.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {activePeos.map((peo, idx) => (
                                <div key={peo.id ?? idx} className="flex gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-violet-200 hover:bg-violet-50/30 transition-colors">
                                    <div className="flex-shrink-0 w-16 h-12 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-extrabold text-sm">
                                        {peo.code || `PEO-${idx + 1}`}
                                    </div>
                                    <div>
                                        {peo.title && <h4 className="text-sm font-bold text-gray-900 mb-1">{peo.title}</h4>}
                                        <p className="text-[14px] text-gray-600 leading-relaxed">{peo.description || peo.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                )}

                {/* PLOs */}
                {activePlos.length > 0 && (
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-orange-400 to-amber-600" />
                    <div className="p-8 lg:p-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-amber-500 rounded-full" />
                            Program Learning Outcomes (PLOs)
                        </h2>
                        <p className="text-sm text-gray-500 mb-8 pl-4">
                            Program Learning Outcomes (PLOs) ensure that the knowledge, skills and attitudes the students will achieve at the end of a four years B.Sc. engineering degree.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activePlos.map((plo, idx) => (
                                <div key={plo.id ?? idx} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-amber-200 hover:bg-amber-50/30 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full">{plo.code || `PLO${idx + 1}`}</span>
                                        {plo.title && <h4 className="text-sm font-bold text-gray-900">{plo.title}</h4>}
                                    </div>
                                    <p className="text-[13px] text-gray-500 leading-relaxed">{plo.description || plo.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                )}

            </main>
            <Footer />
        </div>
    );
}
