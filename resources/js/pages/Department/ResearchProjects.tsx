import React, { useState } from 'react';
import DeptPageShell from '@/custom_components/DeptPageShell';
import { DeptInfo, DeptPageProps, deptShort } from '@/data/departmentData';
import { pageText } from '@/lib/dept-icons';
import { BookMarked, ExternalLink, FileText, GraduationCap, Search, UserCheck, Users } from 'lucide-react';

interface Project {
    id: number;
    type: string;
    category?: string | null;
    title: string;
    authors?: string | null;
    journal_conference?: string | null;
    year?: string | null;
    link?: string | null;
    pdf_file?: string | null;
    supervisor?: string | null;
    students_info?: string | null;
    order: number;
}

interface Props extends DeptPageProps {
    department: DeptInfo & { page_texts?: Record<string, string> | null };
    projects: Project[];
}

export default function DepartmentResearchProjects({ department, tabs, projects = [] }: Props) {
    const short = deptShort(department);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];

    const filtered = projects.filter(p => {
        const q = searchTerm.toLowerCase();
        const matchesSearch = [p.title, p.authors, p.supervisor, p.students_info, p.journal_conference]
            .some((v) => v && v.toLowerCase().includes(q));
        const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
        return matchesSearch && matchesCat;
    });

    return (
        <DeptPageShell
            department={department}
            tabs={tabs}
            activeTab="Research Projects"
            title={`Research Projects - ${short}`}
            heroTitle="Theses & Research Projects"
            heroSubtitle={pageText(department, 'thesis_subtitle', `Student Theses and Research Projects of the ${department.name}`)}
        >
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">

                {/* Header Banner */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    <div className="relative z-10 max-w-3xl">
                        <span className="bg-emerald-500/30 text-emerald-200 text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-400/20">
                            Capstone Inquiries
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-bold mt-4 leading-tight">
                            Theses & Research Projects
                        </h2>
                        <p className="text-emerald-100/90 text-sm sm:text-base mt-4 leading-relaxed text-justify whitespace-pre-line">
                            {pageText(
                                department,
                                'thesis_intro',
                                `Students of the ${department.name} carry out research theses and projects under the supervision of ${short} faculty members, combining theoretical rigor with applied investigation.`,
                            )}
                        </p>
                    </div>
                </div>

                {/* Filters and Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text"
                            placeholder="Search by topic, student, or supervisor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                        />
                    </div>

                    {categories.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat as string}
                                    onClick={() => setSelectedCategory(cat as string)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                        selectedCategory === cat
                                            ? 'bg-emerald-700 text-white shadow-sm'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {cat === 'all' ? 'All Specializations' : cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Projects Grid */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filtered.map((proj) => (
                            <div 
                                key={proj.id}
                                className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            {proj.category && (
                                                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-emerald-100">
                                                    {proj.category}
                                                </span>
                                            )}
                                        </div>
                                        {proj.year && (
                                            <span className="text-xs font-bold text-gray-400">
                                                Session {proj.year}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug">
                                        {proj.title}
                                    </h3>

                                    {proj.authors && (
                                        <div className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                                            <GraduationCap className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <span className="text-gray-400 font-medium">Researcher(s): </span>
                                                <span className="font-semibold text-gray-800">{proj.authors}</span>
                                            </div>
                                        </div>
                                    )}

                                    {proj.students_info && (
                                        <div className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                                            <Users className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <span className="text-gray-400 font-medium">Students: </span>
                                                <span className="font-semibold text-gray-800 whitespace-pre-line">{proj.students_info}</span>
                                            </div>
                                        </div>
                                    )}

                                    {proj.supervisor && (
                                        <div className="flex items-start gap-2 text-xs text-gray-600 bg-blue-50/40 p-3 rounded-xl border border-blue-100/50">
                                            <UserCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <span className="text-gray-400 font-medium">Supervisor: </span>
                                                <span className="font-semibold text-blue-900">{proj.supervisor}</span>
                                            </div>
                                        </div>
                                    )}

                                    {proj.journal_conference && (
                                        <p className="text-xs text-emerald-600 font-semibold italic">{proj.journal_conference}</p>
                                    )}
                                </div>

                                {(proj.link || proj.pdf_file) && (
                                    <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-end gap-5">
                                        {proj.pdf_file && (
                                            <a
                                                href={proj.pdf_file}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-black text-gray-600 hover:text-gray-800 transition-colors"
                                            >
                                                <FileText size={13} />
                                                PDF
                                            </a>
                                        )}
                                        {proj.link && (
                                            <a
                                                href={proj.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 hover:text-emerald-800 transition-colors"
                                            >
                                                View Abstract & Archive
                                                <ExternalLink size={13} />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center space-y-3">
                        <BookMarked className="w-10 h-10 text-gray-300 mx-auto" />
                        <h4 className="text-base font-bold text-gray-800">No research projects found</h4>
                        <p className="text-xs text-gray-500">
                            {projects.length === 0
                                ? 'Theses and research projects of the department will be listed here.'
                                : 'Try adjusting your search query or specialization filter.'}
                        </p>
                    </div>
                )}

            </main>
        </DeptPageShell>
    );
}
