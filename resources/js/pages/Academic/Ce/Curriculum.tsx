import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';
import { FileText, Download, Eye, BookOpen, Clock, Award, ShieldCheck } from 'lucide-react';

interface CurriculumItem {
    id?: number;
    title: string;
    year?: string | null;
    description?: string | null;
    highlights?: string[] | null;
    file?: string | null;
    duration?: string | null;
    credits?: string | null;
    degree?: string | null;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    curricula?: CurriculumItem[];
}

const DEFAULT_CURRICULA: CurriculumItem[] = [
    {
        year: "2022",
        title: "B.Sc. in Civil Engineering (OBE Based 2022)",
        description: "Latest Outcome-Based Education (OBE) curriculum approved by UGC and aligned with BAETE Washington Accord standards.",
        highlights: ["Structural & Earthquake Engineering", "Environmental & Water Resources", "Geotechnical & Transportation Engineering", "Industrial Attachment & Capstone Thesis"],
        file: "/files/departments/ce/curriculum/Syllabus-2022.pdf",
        degree: "Bachelor of Science in Civil Engineering",
        duration: "4 Years (8 Semesters)",
        credits: "160 Credits",
    },
    {
        year: "2019",
        title: "B.Sc. in Civil Engineering Syllabus (2019)",
        description: "Foundational undergraduate curriculum covering fundamental civil engineering principles, survey camps, and laboratory competencies.",
        highlights: ["Foundational Engineering Sciences", "Core Civil Engineering Laboratories", "Intensive Survey Camp"],
        file: "/files/departments/ce/curriculum/Syllabus-2019.pdf",
        degree: "Bachelor of Science in Civil Engineering",
        duration: "4 Years (8 Semesters)",
        credits: "160 Credits",
    }
];

export default function CeCurriculum({ department, curricula }: Props) {
    const list = (curricula && curricula.length > 0) ? curricula : DEFAULT_CURRICULA;

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Curriculum - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={department?.name ? `Curriculum - ${department.name}` : "Department of Civil Engineering (CE)"} 
                subtitle="Academic Syllabi & Outcome-Based Education Structure" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Curriculum" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
                
                {/* Program Overview Banner */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    <div className="relative z-10 max-w-3xl">
                        <span className="bg-emerald-500/30 text-emerald-200 text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-400/20">
                            Academic Framework
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black mt-4 leading-tight">
                            Undergraduate Civil Engineering Curriculum
                        </h2>
                        <p className="text-emerald-100/90 text-sm sm:text-base mt-4 leading-relaxed text-justify">
                            The Department of Civil Engineering offers a 4-year (8-semester) Bachelor of Science degree designed to balance rigorous mathematical theory with hands-on testing across 11 specialized laboratories. Our OBE framework equips students for professional licensing and leadership.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-emerald-700/50">
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-emerald-300 font-semibold uppercase">Duration</p>
                                    <p className="text-sm font-bold text-white">4 Years (8 Terms)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Award className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-emerald-300 font-semibold uppercase">Total Credits</p>
                                    <p className="text-sm font-bold text-white">160.0 Credits</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                                <ShieldCheck className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-emerald-300 font-semibold uppercase">Accreditation</p>
                                    <p className="text-sm font-bold text-white">OBE / Washington Accord</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Syllabi Cards */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <BookOpen className="text-emerald-700 w-6 h-6" />
                        <h3 className="text-2xl font-bold text-gray-900">Approved Curricula & Syllabi</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {list.map((item, idx) => (
                            <div key={item.id ?? idx} className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                                <div className="p-8">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        {item.year && (
                                            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                                                Effective: {item.year}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                        {item.title}
                                    </h4>
                                    {item.description && (
                                        <p className="text-sm text-gray-600 mt-3 leading-relaxed text-justify">
                                            {item.description}
                                        </p>
                                    )}

                                    {item.highlights && item.highlights.length > 0 && (
                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Key Focus Areas</p>
                                            <div className="flex flex-wrap gap-2">
                                                {item.highlights.map((h, hIdx) => (
                                                    <span key={hIdx} className="text-xs bg-gray-50 text-gray-600 font-medium px-2.5 py-1 rounded-lg border border-gray-100">
                                                        {h}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
                                    {item.file ? (
                                        <>
                                            <a 
                                                href={item.file} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
                                            >
                                                <Eye className="w-4 h-4 text-emerald-600" />
                                                Preview PDF
                                            </a>
                                            <a 
                                                href={item.file} 
                                                download 
                                                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all active:scale-95"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download
                                            </a>
                                        </>
                                    ) : (
                                        <div className="w-full text-center text-xs font-semibold text-gray-500 py-1">
                                            Digital syllabus copy available via department academic office
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Category Breakdown Table */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                            Course Distribution by Sub-Discipline
                        </h3>

                        <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="bg-emerald-50 text-emerald-800 font-bold">
                                        <th className="p-4 border-b border-gray-100">Course Category</th>
                                        <th className="p-4 border-b border-gray-100 text-right">Credit Hours</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 divide-y divide-gray-50">
                                    <tr>
                                        <td className="p-4">Structural Engineering (Theory + Lab)</td>
                                        <td className="p-4 text-right font-semibold">45.50</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Environmental Engineering (Theory + Lab)</td>
                                        <td className="p-4 text-right font-semibold">15.50</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Geotechnical Engineering (Theory + Lab)</td>
                                        <td className="p-4 text-right font-semibold">16.50</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Transportation Engineering (Theory + Lab)</td>
                                        <td className="p-4 text-right font-semibold">14.00</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Water Resources Engineering (Theory + Lab)</td>
                                        <td className="p-4 text-right font-semibold">16.50</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Basic Sciences & Mathematics</td>
                                        <td className="p-4 text-right font-semibold">22.00</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Humanities, Social Sciences & Management</td>
                                        <td className="p-4 text-right font-semibold">15.50</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Practical Surveying Camp & Field Attachment</td>
                                        <td className="p-4 text-right font-semibold">6.00</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Undergraduate Final Project & Capstone Thesis</td>
                                        <td className="p-4 text-right font-semibold">6.00</td>
                                    </tr>
                                    <tr className="bg-emerald-50/50 font-bold text-emerald-900">
                                        <td className="p-4">Total Required Credits</td>
                                        <td className="p-4 text-right text-emerald-700">160.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
