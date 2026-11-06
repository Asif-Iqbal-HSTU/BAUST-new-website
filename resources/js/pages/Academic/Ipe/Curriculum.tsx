import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { IPE_TABS, IPE_DEPT_NAME } from '@/data/ipeData';
import { FileText, Download, Eye, BookOpen, Clock, Award, ShieldCheck } from 'lucide-react';
import { pageText } from '@/lib/dept-icons';

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
    slug: string;
    name: string;
    short_name: string;
    accreditation_badge?: string | null;
    page_texts?: Record<string, string> | null;
}

interface Props {
    department?: DeptInfo | null;
    curricula?: CurriculumItem[];
}

export default function IpeCurriculum({ department, curricula }: Props) {
    const list = curricula ?? [];
    const first = list[0];
    const shortName = department?.short_name || 'IPE';
    const deptName = department?.name || 'Department of Industrial and Production Engineering';

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Curriculum - ${department?.short_name || 'IPE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={`${department?.short_name || 'IPE'} Academic Curriculum`} 
                subtitle={pageText(department, 'curriculum_subtitle', "Outcome-Based Education Tailored for Professional Industrial Systems Excellence")} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || IPE_DEPT_NAME} activeTab="Curriculum" tabs={IPE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Intro Section */}
                <div className="max-w-3xl mb-16">
                    <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <BookOpen className="text-emerald-600 w-8 h-8" />
                        {department?.short_name || 'IPE'} Course Curriculum
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        {pageText(department, 'curriculum_intro', `The ${deptName} at BAUST offers a rigorous 4-year undergraduate program. The syllabus is structured following Outcome-Based Education (OBE) principles aligned with the Board of Accreditation for Engineering and Technical Education (BAETE) under the Washington Accord.`)}
                    </p>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    {[
                        { icon: Clock, label: "Duration", value: first?.duration || "4 Years (8 Semesters)" },
                        { icon: Award, label: "Total Credits", value: first?.credits || "160.0 Credits" },
                        { icon: ShieldCheck, label: "Accreditation", value: department?.accreditation_badge || "BAETE (Washington Accord)" },
                        { icon: BookOpen, label: "Degree", value: first?.degree || `B.Sc. Engg. in ${shortName}` }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <item.icon size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                                <p className="text-sm font-bold text-gray-900">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Syllabi Cards */}
                <div className="space-y-10">
                    <div className="flex items-center gap-4">
                        <h3 className="text-xl font-bold text-gray-900">Available Syllabi & Curriculum Documents</h3>
                        <div className="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent" />
                    </div>

                    {list.length === 0 && (
                        <p className="text-center text-gray-400 py-12">No curriculum documents have been published yet.</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {list.map((syllabus, idx) => {
                            const fileUrl = syllabus.file;
                            const highlights = Array.isArray(syllabus.highlights) ? syllabus.highlights : [];

                            return (
                                <div key={syllabus.id ?? idx} className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
                                    {/* Top Accent */}
                                    <div className={`h-2.5 w-full bg-gradient-to-r ${idx === 0 ? 'from-emerald-600 via-teal-500 to-green-400' : 'from-slate-600 to-slate-400'}`} />
                                    
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 rounded-2xl bg-gray-50 text-emerald-600 group-hover:scale-110 transition-transform">
                                                <FileText size={32} />
                                            </div>
                                            {syllabus.year && (
                                                <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${idx === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {syllabus.year}
                                                </span>
                                            )}
                                        </div>

                                        <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                                            {syllabus.title}
                                        </h4>
                                        
                                        {syllabus.description && (
                                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                                {syllabus.description}
                                            </p>
                                        )}

                                        {highlights.length > 0 && (
                                            <ul className="space-y-2 mb-8">
                                                {highlights.map((h, hIdx) => (
                                                    <li key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                        {h}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Actions */}
                                        {fileUrl && <div className="mt-auto flex flex-wrap gap-3">
                                            <a 
                                                href={fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 hover:shadow-lg transition-all"
                                            >
                                                <Eye size={16} />
                                                View Syllabus
                                            </a>
                                            <a 
                                                href={fileUrl}
                                                download
                                                className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all"
                                            >
                                                <Download size={16} />
                                                Download PDF
                                            </a>
                                        </div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Additional Note */}
                <div className="mt-20 p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                        <Award size={120} />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-2xl font-bold mb-4 italic">Outcome Based Education (OBE)</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            {pageText(department, 'curriculum_obe_note', `The ${shortName} curriculum is organized under the Washington Accord OBE model, ensuring that each graduate demonstrates measurable competencies in smart production systems, supply chain analytics, operations research, and industrial ergonomic design.`)}
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
