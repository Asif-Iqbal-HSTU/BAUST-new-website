import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { ICT_TABS, ICT_DEPT_NAME } from '@/data/ictData';

interface ObeItem {
    id?: number;
    type?: string;
    code?: string;
    title?: string | null;
    description?: string;
    text?: string;
}

interface DeptInfo {
    id: number;
    slug: string;
    name: string;
    short_name: string;
    vision?: string | null;
    mission?: string | null;
}

interface Props {
    department?: DeptInfo | null;
    peos?: ObeItem[];
    plos?: ObeItem[];
}

const DEFAULT_PEOS: ObeItem[] = [
    { code: 'PEO-1', title: 'Professional Progression', description: 'Graduates will progress in their chosen profession and achieve career advancement in the field of Information and Communication Technology.' },
    { code: 'PEO-2', title: 'Ethics & Leadership', description: 'Graduates will demonstrate ethical behavior, teamwork, and leadership in professional engineering environments.' },
    { code: 'PEO-3', title: 'Technological Competence', description: 'Graduates will identify, develop, and apply relevant and evolving technologies to contribute effectively in professional and entrepreneurial roles.' },
    { code: 'PEO-4', title: 'Societal Development', description: 'Graduates will apply their knowledge and skills aligned with relevant Sustainable Development Goals for societal development.' },
];

const DEFAULT_PLOS: ObeItem[] = [
    { code: 'PLO1', title: 'Engineering knowledge', description: 'Apply the knowledge of mathematics, science, engineering fundamentals and an engineering specialization to the solution of complex engineering problems.' },
    { code: 'PLO2', title: 'Problem analysis', description: 'Identify, formulate, research the literature and analyze complex engineering problems and reach substantiated conclusions using first principles of mathematics, the natural sciences and the engineering sciences.' },
    { code: 'PLO3', title: 'Design/development of solutions', description: 'Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety as well as cultural, societal and environmental concerns.' },
    { code: 'PLO4', title: 'Investigation', description: 'Conduct investigations of complex problems, considering design of experiments, analysis and interpretation of data and synthesis of information to provide valid conclusions.' },
    { code: 'PLO5', title: 'Modern tool usage', description: 'Create, select and apply appropriate techniques, resources and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.' },
    { code: 'PLO6', title: 'The engineer and society', description: 'Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.' },
    { code: 'PLO7', title: 'Environment and sustainability', description: 'Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.' },
    { code: 'PLO8', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.' },
    { code: 'PLO9', title: 'Individual and team work', description: 'Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.' },
    { code: 'PLO10', title: 'Communication', description: 'Communicate effectively on complex engineering activities with the engineering community and with society at large, such as being able to comprehend and write effective reports.' },
    { code: 'PLO11', title: 'Project management and finance', description: 'Demonstrate knowledge and understanding of the engineering and management principles and apply these to one\'s own work, as a member and leader in a team, to manage projects.' },
    { code: 'PLO12', title: 'Life-long learning', description: 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.' },
];

const DEFAULT_VISION = "To be a center of excellence recognized nationally and internationally for quality education, research, and innovation in Information and Communication Technology.";

export default function IctVisionMission({ department, peos: peosProp, plos: plosProp }: Props) {
    const activePeos = (peosProp && peosProp.length > 0) ? peosProp : DEFAULT_PEOS;
    const activePlos = (plosProp && plosProp.length > 0) ? plosProp : DEFAULT_PLOS;

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Vision & Mission - ${department?.short_name || 'ICT'} - BAUST`} />
            <Navbar />
            <PageHero title={department?.name || "Department of Information and Communication Technology (ICT)"} subtitle={null} compact={true} />
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

                {/* PLOs */}
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

            </main>
            <Footer />
        </div>
    );
}
