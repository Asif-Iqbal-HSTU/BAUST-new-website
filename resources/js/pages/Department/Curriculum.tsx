import React from 'react';
import DeptPageShell from '@/custom_components/DeptPageShell';
import { DeptPageProps, deptShort } from '@/data/departmentData';
import { FileText, Download, Eye, BookOpen, Clock, Award, ShieldCheck } from 'lucide-react';

interface CurriculumItem {
    id?: number;
    title: string;
    year?: string | null;
    description?: string | null;
    highlights?: string[] | null;
    file?: string | null;
    filename?: string;
    duration?: string | null;
    credits?: string | null;
    degree?: string | null;
}

interface Props extends DeptPageProps {
    curricula?: CurriculumItem[];
}

export default function DepartmentCurriculum({ department, tabs, curricula = [] }: Props) {
    const short = deptShort(department);
    const list = curricula;
    const primary = list[0];

    const getFileUrl = (item: CurriculumItem) => {
        if (item.file) return item.file;
        if (item.filename) return `/departments/${department.slug}/curriculum/${item.filename}`;
        return '#';
    };

    return (
        <DeptPageShell
            department={department}
            tabs={tabs}
            activeTab="Curriculum"
            title={`Curriculum - ${short}`}
            heroTitle={`${short} Academic Curriculum`}
            heroSubtitle="Designed for Excellence, Built for the Future"
        >

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Intro Section */}
                <div className="max-w-3xl mb-16">
                    <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <BookOpen className="text-emerald-600 w-8 h-8" />
                        {short} Course Curriculum
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        The {department.name} at BAUST offers a comprehensive undergraduate program. Our curriculum is periodically updated to align with contemporary academic standards and the requirements of the University Grants Commission (UGC).
                    </p>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    {[
                        { icon: Clock, label: "Duration", value: primary?.duration },
                        { icon: Award, label: "Total Credits", value: primary?.credits },
                        { icon: ShieldCheck, label: "Accreditation", value: department.accreditation_badge || 'UGC Approved' },
                        { icon: BookOpen, label: "Degree", value: primary?.degree }
                    ].filter((item) => item.value).map((item, idx) => (
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
                        <h3 className="text-xl font-bold text-gray-900">Available Syllabi Versions</h3>
                        <div className="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {list.map((syllabus, idx) => {
                            const fileUrl = getFileUrl(syllabus);
                            const highlights = Array.isArray(syllabus.highlights) ? syllabus.highlights : [];

                            return (
                                <div key={syllabus.id ?? idx} className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row">
                                    {/* Left Side Accent */}
                                    <div className={`w-2 md:w-4 flex-shrink-0 bg-gradient-to-b ${idx === 0 ? 'from-emerald-600 to-green-400' : 'from-slate-600 to-slate-400'}`} />
                                    
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 rounded-2xl bg-gray-50 text-emerald-600 group-hover:scale-110 transition-transform">
                                                <FileText size={32} />
                                            </div>
                                            {syllabus.year && (
                                                <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${idx === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    Version {syllabus.year}
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
                                        <div className="mt-auto flex flex-wrap gap-3">
                                            <a 
                                                href={fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 hover:shadow-lg transition-all"
                                            >
                                                <Eye size={18} />
                                                View Syllabus
                                            </a>
                                            <a 
                                                href={fileUrl}
                                                download
                                                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all"
                                            >
                                                <Download size={18} />
                                                Download PDF
                                            </a>
                                        </div>
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
                            Curricula are designed following the OBE framework, ensuring that students achieve specific competencies and skills by the end of their degree. We focus on continuous quality improvement (CQI) to maintain academic excellence.
                        </p>
                    </div>
                </div>
            </main>
        </DeptPageShell>
    );
}
