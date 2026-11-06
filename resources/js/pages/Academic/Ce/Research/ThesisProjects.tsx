import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';
import { pageText } from '@/lib/dept-icons';
import { GraduationCap, Users, UserCheck, FileText, Search, Download, Eye, ExternalLink } from 'lucide-react';

interface ThesisItem {
    id: number;
    title: string;
    supervisor?: string | null;
    students_info?: string | null;
    pdf_file?: string | null;
    year?: string | null;
    category?: string | null;
    authors?: string | null;
    link?: string | null;
    order: number;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
    page_texts?: Record<string, string> | null;
}

interface Props {
    department?: DeptInfo | null;
    theses: ThesisItem[];
}

export default function CeThesisProjects({ department, theses = [] }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = theses.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.supervisor && t.supervisor.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (t.students_info && t.students_info.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (t.authors && t.authors.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Thesis Projects - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title="Undergraduate Thesis Projects" 
                subtitle={pageText(department, 'thesis_subtitle', `Capstone Research & Final Year Dissertations of ${department?.short_name || 'CE'} Graduates`)} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Research" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
                
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    <div className="relative z-10 max-w-3xl">
                        <span className="bg-emerald-500/30 text-emerald-200 text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-400/20">
                            Capstone Dissertations
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-bold mt-4 leading-tight">
                            Undergraduate Thesis & Research Innovations
                        </h2>
                        <p className="text-emerald-100/90 text-sm sm:text-base mt-4 leading-relaxed text-justify">
                            {pageText(department, 'thesis_intro', 'Final year Civil Engineering students conduct intensive experimental and analytical investigations under dedicated faculty supervision, solving real-world infrastructure, materials, water management, and transportation challenges in Bangladesh.')}
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text"
                            placeholder="Search by topic, student name/ID, or supervisor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                        />
                    </div>
                    <span className="text-xs font-bold text-gray-400 whitespace-nowrap">
                        Showing {filtered.length} of {theses.length} Projects
                    </span>
                </div>

                {/* Theses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.length > 0 ? (
                        filtered.map((item, idx) => (
                            <div 
                                key={item.id ?? idx}
                                className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-emerald-200"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                                            #{idx + 1}
                                        </span>
                                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/60 uppercase tracking-wider">
                                            {[item.category || 'Capstone Thesis', item.year].filter(Boolean).join(' · ')}
                                        </span>
                                    </div>

                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug">
                                        {item.title}
                                    </h3>

                                    <div className="pt-3 border-t border-gray-100 space-y-2.5 text-xs text-gray-600">
                                        {item.authors && (
                                            <div className="flex items-start gap-2.5">
                                                <Users className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <span className="font-bold text-gray-800">Authors: </span>
                                                    <span>{item.authors}</span>
                                                </div>
                                            </div>
                                        )}

                                        {item.students_info && (
                                            <div className="flex items-start gap-2.5">
                                                <Users className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <span className="font-bold text-gray-800">Students: </span>
                                                    <span>{item.students_info}</span>
                                                </div>
                                            </div>
                                        )}

                                        {item.supervisor && (
                                            <div className="flex items-start gap-2.5">
                                                <UserCheck className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <span className="font-bold text-gray-800">Supervisor: </span>
                                                    <span className="text-gray-700 font-semibold">{item.supervisor}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                                    {item.pdf_file ? (
                                        <a
                                            href={item.pdf_file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all"
                                        >
                                            <FileText className="w-3.5 h-3.5" />
                                            <span>View Abstract PDF</span>
                                        </a>
                                    ) : item.link ? (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            <span>View Project</span>
                                        </a>
                                    ) : (
                                        <span className="text-[11px] text-gray-400 italic">Abstract document on file</span>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
                            <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-base font-bold text-gray-700">No thesis projects found</h3>
                            <p className="text-xs text-gray-500 mt-1">Try another search keyword.</p>
                        </div>
                    )}
                </div>

            </main>
            <Footer />
        </div>
    );
}
