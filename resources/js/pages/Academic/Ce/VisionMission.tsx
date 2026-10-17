import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';

interface ObeItem {
    id?: number;
    type?: string;
    code: string;
    title?: string | null;
    description: string;
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
    { code: 'PEO-1', title: 'Technical Competence', description: 'Graduates will be competent to provide effective solutions to civil engineering problems by applying appropriate knowledge, skills, and tools.' },
    { code: 'PEO-2', title: 'Ethical & Sustainable Practice', description: 'Graduates will responsibly practice civil engineering by integrating sustainability, safety, economic feasibility, and ethical values to meet societal needs.' },
    { code: 'PEO-3', title: 'Leadership & Teamwork', description: 'Graduates will demonstrate communication, leadership, teamwork, and project management skills in multidisciplinary and diverse professional environments.' },
    { code: 'PEO-4', title: 'Lifelong Learning', description: 'Graduates will engage in lifelong learning through higher studies, professional training, research, or entrepreneurship to address emerging technologies and evolving challenges for professional advancement.' },
];

const DEFAULT_PLOS: ObeItem[] = [
    { code: 'PLO1', title: 'Engineering knowledge', description: 'Apply the knowledge of mathematics, science, engineering fundamentals and an engineering specialization to the solution of complex civil engineering problems.' },
    { code: 'PLO2', title: 'Problem analysis', description: 'Identify, formulate, research literature and analyze complex civil engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences and engineering sciences.' },
    { code: 'PLO3', title: 'Design/development of solutions', description: 'Design solutions for complex civil engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, cultural, societal, and environmental considerations.' },
    { code: 'PLO4', title: 'Investigation', description: 'Conduct investigations of complex problems considering design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions.' },
    { code: 'PLO5', title: 'Modern tool usage', description: 'Create, select and apply appropriate techniques, resources, and modern engineering and IT tools, including prediction and modeling to complex civil engineering activities with an understanding of the limitations.' },
    { code: 'PLO6', title: 'The engineer and society', description: 'Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.' },
    { code: 'PLO7', title: 'Environment and sustainability', description: 'Understand the impact of the professional civil engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.' },
    { code: 'PLO8', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics, responsibilities and norms of the civil engineering practice.' },
    { code: 'PLO9', title: 'Individual and team work', description: 'Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.' },
    { code: 'PLO10', title: 'Communication', description: 'Communicate effectively on complex civil engineering activities with the engineering community and with society at large, such as being able to comprehend and write effective reports, design documentation, make effective presentations, and give and receive clear instructions.' },
    { code: 'PLO11', title: 'Project management and finance', description: 'Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.' },
    { code: 'PLO12', title: 'Life-long learning', description: 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.' },
];

const DEFAULT_VISION = "To become a recognized center of excellence through producing Civil Engineering professionals inculcating morality, ethics, and discipline, and fitted for industry and academia to ensure sustainable development.";

const DEFAULT_MISSION = `1. To ensure a dynamic, student-centered learning environment with state-of-the-art facilities in Civil Engineering, including basic sciences and management.
2. To provide opportunities that bridge theoretical knowledge with real-time projects and industrial activities, contributing to the sustainable development of society.
3. To conduct advanced, inter- and multi-disciplinary research in collaboration with industries and other academia to address contemporary challenges.
4. To foster students’ engagement in lifelong learning, cultivating appreciation for diversity, tolerance, ethics, and morality.`;

export default function CeVisionMission({ department, peos: peosProp, plos: plosProp }: Props) {
    const activePeos = (peosProp && peosProp.length > 0) ? peosProp : DEFAULT_PEOS;
    const activePlos = (plosProp && plosProp.length > 0) ? plosProp : DEFAULT_PLOS;

    const visionText = department?.vision || DEFAULT_VISION;
    const missionText = department?.mission || DEFAULT_MISSION;
    const missionPoints = missionText.split('\n').filter(Boolean);

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Vision & Mission - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero title={department?.name || "Department of Civil Engineering (CE)"} subtitle={null} compact={true} />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Vision & Mission" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">

                {/* Department Vision & Mission */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                            Vision & Mission of the Department
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6">
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm">Vision</span>
                                </div>
                                <p className="text-gray-600 text-[15px] leading-relaxed mt-3 text-justify">
                                    {visionText}
                                </p>
                            </div>
                            <div className="relative bg-teal-50/60 border border-teal-100 rounded-2xl p-6">
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-teal-600 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm">Mission</span>
                                </div>
                                <div className="space-y-2 text-gray-600 text-[14px] leading-relaxed mt-3">
                                    {missionPoints.map((pt, idx) => (
                                        <p key={idx}>{pt}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Program Educational Objectives (PEOs) */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                Program Educational Objectives (PEOs)
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Four years after graduation, the graduates of the B.Sc. in Civil Engineering program are expected to attain the following:
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {activePeos.map((peo, idx) => (
                                <div key={peo.id ?? idx} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="min-w-[4.25rem] px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center flex-shrink-0 whitespace-nowrap shadow-sm">
                                            {peo.code || `PEO-${idx + 1}`}
                                        </span>
                                        {peo.title && (
                                            <h3 className="font-bold text-gray-900 text-base">{peo.title}</h3>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed text-justify">
                                        {peo.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Program Learning Outcomes (PLOs) */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                Program Learning Outcomes (PLOs)
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                The B.Sc. in Civil Engineering program prepares students to attain the following 12 Washington Accord graduate attributes upon graduation:
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activePlos.map((plo, idx) => (
                                <div key={plo.id ?? idx} className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all">
                                    <div className="min-w-[3.5rem] px-2.5 py-1.5 h-9 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm whitespace-nowrap">
                                        {plo.code || `PLO${idx + 1}`}
                                    </div>
                                    <div className="flex-1">
                                        {plo.title && (
                                            <h4 className="text-sm font-bold text-gray-900 mb-1">{plo.title}</h4>
                                        )}
                                        <p className="text-xs text-gray-600 leading-relaxed text-justify">
                                            {plo.description}
                                        </p>
                                    </div>
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
