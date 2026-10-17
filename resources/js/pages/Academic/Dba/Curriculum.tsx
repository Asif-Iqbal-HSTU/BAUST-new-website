import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { DBA_TABS, DBA_DEPT_NAME } from '@/data/dbaData';
import { FileText, Download, Eye, BookOpen, Clock, Award, ShieldCheck, CheckCircle2, Layers, X } from 'lucide-react';

interface CurriculumItem {
    id?: number;
    title: string;
    year?: string | null;
    description?: string | null;
    highlights?: string[] | string | null;
    file?: string | null;
    filename?: string;
    duration?: string | null;
    credits?: string | null;
    degree?: string | null;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
    duration?: string | null;
    credits?: string | null;
    degree?: string | null;
    accreditation?: string | null;
}

interface Props {
    department?: DeptInfo | null;
    curricula?: CurriculumItem[];
}

const DEFAULT_SYLLABI: CurriculumItem[] = [
    {
        year: "2022",
        degree: "BBA",
        duration: "4 Years (8 Semesters)",
        credits: "126 Credits",
        title: "Bachelor of Business Administration (BBA) - OBE Curriculum 2022",
        file: "/files/departments/dba/curriculum/Syllabus-2022-OBE_-BBA.pdf",
        description: "Modern Outcome-Based Education (OBE) curriculum designed to prepare agile business graduates equipped with strategic acumen, business analytics, and corporate problem-solving skills.",
        highlights: [
            "Outcome-Based Education (OBE) Framework",
            "Business Analytics & Digital Marketing Integrations",
            "Financial Modeling, Banking & Fintech Specializations",
            "Mandatory 12-Week Corporate Internship / Capstone Project"
        ]
    },
    {
        year: "2020",
        degree: "BBA",
        duration: "4 Years (8 Semesters)",
        credits: "126 Credits",
        title: "BBA Curriculum (2020) - Effective from 10th Batch",
        file: "/files/departments/dba/curriculum/Syllabus-DBA-2020-Effective-for-BBA-10th-Batch.pdf",
        description: "Comprehensive foundational curriculum covering major management disciplines including Accounting, Finance, Marketing, and Human Resource Management.",
        highlights: [
            "Core Management & Strategic Decision Foundations",
            "Corporate Governance & Business Law Modules",
            "Quantitative Analysis and Statistical Business Methods",
            "Comprehensive Viva Voce and Project Work"
        ]
    }
];

export default function DbaCurriculum({ department, curricula }: Props) {
    const list = (curricula && curricula.length > 0) ? curricula : DEFAULT_SYLLABI;
    const [previewPdf, setPreviewPdf] = useState<string | null>(null);

    const getFileUrl = (item: CurriculumItem) => {
        if (item.file) return item.file;
        if (item.filename) return `/files/departments/dba/curriculum/${item.filename}`;
        return '#';
    };

    const parseHighlights = (highlights: any): string[] => {
        if (!highlights) return [];
        if (Array.isArray(highlights)) return highlights;
        try {
            const parsed = JSON.parse(highlights);
            if (Array.isArray(parsed)) return parsed;
        } catch (e) {
            // Split by newline or comma if string
            return String(highlights).split(',').map(s => s.trim()).filter(Boolean);
        }
        return [];
    };

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Curriculum - ${department?.short_name || 'DBA'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={`${department?.short_name || 'DBA'} Academic Curriculum`} 
                subtitle="Outcome-Based Education (OBE) Structured for 21st Century Business Excellence" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || DBA_DEPT_NAME} activeTab="Curriculum" tabs={DBA_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                {/* Intro Section */}
                <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-emerald-100 rounded-2xl">
                            <BookOpen className="text-emerald-700 w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900">
                                {department?.short_name || 'DBA'} Course Curriculum & Syllabus
                            </h2>
                            <p className="text-sm font-medium text-emerald-700">Bachelor of Business Administration (BBA)</p>
                        </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-base text-justify">
                        The Department of Business Administration at BAUST offers a comprehensive 4-year undergraduate BBA program designed to foster analytical thinking, ethical judgment, leadership skills, and global business expertise. Built upon Outcome-Based Education (OBE) principles, our curriculum continuously evolves to address shifting corporate paradigms, financial technologies, and data-driven management frameworks.
                    </p>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-3.5 bg-emerald-50 text-emerald-700 rounded-2xl">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Program Duration</p>
                            <p className="text-lg font-black text-gray-800">{department?.duration || '4 Years (8 Semesters)'}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-3.5 bg-blue-50 text-blue-700 rounded-2xl">
                            <Award className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Credits</p>
                            <p className="text-lg font-black text-gray-800">{department?.credits || '126 Credits'}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-3.5 bg-purple-50 text-purple-700 rounded-2xl">
                            <Layers className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Degree Conferred</p>
                            <p className="text-lg font-black text-gray-800">{department?.degree || 'Bachelor of Business Admin (BBA)'}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-3.5 bg-teal-50 text-teal-700 rounded-2xl">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Accreditation</p>
                            <p className="text-lg font-black text-gray-800">{department?.accreditation || 'UGC Approved & OBE Compliant'}</p>
                        </div>
                    </div>
                </div>

                {/* Major Concentrations Banner */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 lg:p-10 text-white shadow-xl">
                    <div className="max-w-3xl">
                        <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full">
                            BBA Specialization Tracks
                        </span>
                        <h3 className="text-2xl lg:text-3xl font-black mt-3 mb-4">
                            Four Specialized Concentration Areas
                        </h3>
                        <p className="text-emerald-100 text-sm leading-relaxed mb-6">
                            Students have the flexibility in their 4th year to choose career-focused concentrations guided by corporate industry mentors:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
                                <h4 className="font-bold text-sm text-white">Finance & Banking</h4>
                                <p className="text-xs text-emerald-200 mt-1">Corporate Finance, Investment, Fintech</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
                                <h4 className="font-bold text-sm text-white">Marketing</h4>
                                <p className="text-xs text-emerald-200 mt-1">Brand Management, Digital Marketing</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
                                <h4 className="font-bold text-sm text-white">HRM</h4>
                                <p className="text-xs text-emerald-200 mt-1">Talent Mgmt, Labor Law, Org Behavior</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
                                <h4 className="font-bold text-sm text-white">Accounting & MIS</h4>
                                <p className="text-xs text-emerald-200 mt-1">Cost Accounting, ERP, Auditing</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Syllabi List Cards */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <FileText className="text-emerald-700 w-6 h-6" />
                        <h3 className="text-2xl font-black text-gray-900">Approved Curriculum & Course Catalogs</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {list.map((item, idx) => {
                            const fileUrl = getFileUrl(item);
                            const highlights = parseHighlights(item.highlights);

                            return (
                                <div 
                                    key={item.id ?? idx} 
                                    className="bg-white rounded-3xl p-8 lg:p-10 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600 group-hover:bg-emerald-500 transition-colors" />

                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full">
                                                    Year: {item.year || 'Current'}
                                                </span>
                                                {item.degree && (
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                                                        {item.degree}
                                                    </span>
                                                )}
                                            </div>
                                            <h4 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                                {item.title}
                                            </h4>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            {fileUrl !== '#' && (
                                                <>
                                                    <button
                                                        onClick={() => setPreviewPdf(fileUrl)}
                                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                                    >
                                                        <Eye size={16} />
                                                        Preview PDF
                                                    </button>
                                                    <a
                                                        href={fileUrl}
                                                        download
                                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-sm"
                                                    >
                                                        <Download size={16} />
                                                        Download Syllabus
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2">
                                            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Curriculum Description</h5>
                                            <p className="text-gray-600 leading-relaxed text-sm text-justify">
                                                {item.description}
                                            </p>
                                        </div>

                                        {highlights.length > 0 && (
                                            <div>
                                                <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Key Highlights</h5>
                                                <ul className="space-y-2">
                                                    {highlights.map((h, hIdx) => (
                                                        <li key={hIdx} className="flex items-start gap-2 text-xs text-gray-700">
                                                            <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                                                            <span>{h}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            {/* PDF Preview Modal */}
            {previewPdf && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
                        <div className="p-4 bg-gray-900 text-white flex items-center justify-between">
                            <span className="font-bold text-sm">Curriculum Document Viewer</span>
                            <div className="flex items-center gap-3">
                                <a
                                    href={previewPdf}
                                    download
                                    className="text-xs bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5"
                                >
                                    <Download size={13} />
                                    Download
                                </a>
                                <button
                                    onClick={() => setPreviewPdf(null)}
                                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="flex-grow w-full bg-gray-100">
                            <iframe
                                src={`${previewPdf}#toolbar=1`}
                                title="Curriculum PDF Preview"
                                className="w-full h-full border-0"
                            />
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
