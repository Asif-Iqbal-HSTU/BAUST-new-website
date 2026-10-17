import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { DBA_TABS, DBA_DEPT_NAME } from '@/data/dbaData';
import { Target, Compass, BookOpen, Award, CheckCircle2 } from 'lucide-react';

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
    {
        code: 'PEO-1',
        title: 'Professional Competence & Managerial Excellence',
        description: 'Graduates will demonstrate comprehensive knowledge and practical skills in business management, marketing, finance, accounting, and human resource management to thrive in competitive global markets.'
    },
    {
        code: 'PEO-2',
        title: 'Leadership, Ethics & Social Responsibility',
        description: 'Graduates will exhibit ethical integrity, corporate social responsibility, and exemplary leadership in diverse multidisciplinary and multicultural organizational environments.'
    },
    {
        code: 'PEO-3',
        title: 'Critical Thinking & Entrepreneurial Acumen',
        description: 'Graduates will formulate data-driven business strategies, embrace innovation, and leverage entrepreneurial mindset to establish viable ventures and drive business transformation.'
    },
    {
        code: 'PEO-4',
        title: 'Continuous Professional Learning & Adaptation',
        description: 'Graduates will pursue continuous self-directed professional development, research, and adaptation to technological shifts and modern business paradigms.'
    }
];

const DEFAULT_PLOS: ObeItem[] = [
    { code: 'PLO-1', title: 'Business Knowledge', description: 'Apply foundational theories, frameworks, and qualitative/quantitative models in accounting, finance, marketing, and management.' },
    { code: 'PLO-2', title: 'Critical Thinking & Problem Solving', description: 'Identify, analyze, and synthesize complex business problems using logical and empirical methodologies to derive strategic decisions.' },
    { code: 'PLO-3', title: 'Effective Communication', description: 'Communicate business ideas, presentations, and technical reports persuasively to diverse stakeholders across oral, written, and digital media.' },
    { code: 'PLO-4', title: 'Teamwork & Leadership', description: 'Collaborate effectively in diverse, multidisciplinary teams and exercise ethical managerial leadership to achieve organizational objectives.' },
    { code: 'PLO-5', title: 'Digital & Analytics Literacy', description: 'Employ modern business information technology, ERP systems, data analytics, and computational tools for business intelligence and operations.' },
    { code: 'PLO-6', title: 'Global Perspective & Sustainability', description: 'Assess the impact of socio-economic, environmental, legal, and international developments on sustainable business practices.' },
    { code: 'PLO-7', title: 'Ethics & Corporate Responsibility', description: 'Commit to high professional ethics, corporate governance principles, and social responsibility in organizational decision-making.' },
    { code: 'PLO-8', title: 'Lifelong Learning & Innovation', description: 'Exhibit self-directed lifelong learning, adaptability, and innovative thinking to stay ahead in evolving business ecosystems.' },
];

export default function DbaVisionMission({ department, peos: peosProp, plos: plosProp }: Props) {
    const activePeos = (peosProp && peosProp.length > 0) ? peosProp : DEFAULT_PEOS;
    const activePlos = (plosProp && plosProp.length > 0) ? plosProp : DEFAULT_PLOS;

    const deptVision = department?.vision || "To become a center of excellence in business and management education, cultivating visionary leaders and entrepreneurs who advance ethical and sustainable economic growth.";
    const deptMission = department?.mission || "To provide transformative business education integrating analytical rigor, ethical values, and practical industry experience, empowering students to excel in dynamic global business environments and contribute meaningfully to society.";

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Vision & Mission - ${department?.short_name || 'DBA'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={department?.name || "Department of Business Administration (DBA)"} 
                subtitle="Strategic Vision, Core Values, and Outcome-Based Educational Framework" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || DBA_DEPT_NAME} activeTab="Vision & Mission" tabs={DBA_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">

                {/* University Vision & Mission */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-2 h-6 bg-emerald-500 rounded-full" />
                            Vision & Mission of the University
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6">
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm">University Vision</span>
                                </div>
                                <p className="text-gray-600 text-[15px] leading-relaxed mt-3">
                                    The University aspires to transform into a center of excellence in Science, Engineering and Technology, Arts and Business Administration programs by providing innovative, multi-disciplinary courses to the young generation of the country and beyond. It endeavours to make the University a hub of knowledge and be recognized as a leading University of the country.
                                </p>
                            </div>
                            <div className="relative bg-blue-50/60 border border-blue-100 rounded-2xl p-6">
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-blue-600 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm">University Mission</span>
                                </div>
                                <ol className="text-gray-600 text-[15px] leading-relaxed mt-3 space-y-2.5 list-decimal pl-4">
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
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-600 to-teal-500" />
                    <div className="p-8 lg:p-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-2 h-6 bg-teal-500 rounded-full" />
                            Vision & Mission of the Department of Business Administration
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative bg-teal-50/60 border border-teal-100 rounded-2xl p-6">
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-teal-700 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm">Department Vision</span>
                                </div>
                                <p className="text-gray-700 text-[15px] leading-relaxed mt-3 font-medium">
                                    {deptVision}
                                </p>
                            </div>
                            <div className="relative bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6">
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-emerald-700 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm">Department Mission</span>
                                </div>
                                <p className="text-gray-700 text-[15px] leading-relaxed mt-3 font-medium">
                                    {deptMission}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Program Educational Objectives (PEOs) */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                <Target className="w-5 h-5 text-emerald-700" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Program Educational Objectives (PEOs)</h2>
                                <p className="text-sm text-gray-500">Long-term career and professional accomplishments expected of our BBA graduates</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                            {activePeos.map((peo, idx) => (
                                <div key={peo.id ?? idx} className="p-6 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-lg tracking-wider">
                                            {peo.code}
                                        </span>
                                        {peo.title && (
                                            <h4 className="font-bold text-gray-900 text-sm">{peo.title}</h4>
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed text-justify">{peo.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Program Learning Outcomes (PLOs) */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-500" />
                    <div className="p-8 lg:p-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Award className="w-5 h-5 text-blue-700" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Program Learning Outcomes (PLOs)</h2>
                                <p className="text-sm text-gray-500">Specific abilities, knowledge, and competencies demonstrated upon graduation</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            {activePlos.map((plo, idx) => (
                                <div key={plo.id ?? idx} className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <span className="bg-blue-600 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                                            {plo.code}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        {plo.title && (
                                            <h4 className="font-bold text-gray-900 text-sm">{plo.title}</h4>
                                        )}
                                        <p className="text-gray-600 text-xs leading-relaxed">{plo.description}</p>
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
