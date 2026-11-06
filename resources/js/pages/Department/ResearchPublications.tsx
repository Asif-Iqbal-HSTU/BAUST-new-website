import React, { useState } from 'react';
import DeptPageShell from '@/custom_components/DeptPageShell';
import { DeptInfo, DeptPageProps, deptShort } from '@/data/departmentData';
import { pageText } from '@/lib/dept-icons';
import { BookOpen, ExternalLink, FileText, Search } from 'lucide-react';

interface Publication {
    id: number;
    type: string;
    category?: string | null;
    title: string;
    authors?: string | null;
    journal_conference?: string | null;
    year?: string | null;
    link?: string | null;
    pdf_file?: string | null;
    order: number;
}

interface Props extends DeptPageProps {
    department: DeptInfo & { page_texts?: Record<string, string> | null };
    publications: Publication[];
}

export default function DepartmentResearchPublications({ department, tabs, publications = [] }: Props) {
    const short = deptShort(department);
    const subject = /\(/.test(department.name) ? short : department.name.replace(/^Department of\s+/i, '');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', ...Array.from(new Set(publications.map(p => p.category).filter(Boolean)))];

    const filtered = publications.filter(p => {
        const matchesSearch =
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.authors && p.authors.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (p.journal_conference && p.journal_conference.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
        return matchesSearch && matchesCat;
    });

    return (
        <DeptPageShell
            department={department}
            tabs={tabs}
            activeTab="Publications"
            title={`Publications - ${short}`}
            heroTitle="Research Publications"
            heroSubtitle={pageText(department, 'research_subtitle', `Peer-Reviewed Journal & Conference Papers by ${short} Faculty and Scholars`)}
        >
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">

                {/* Header Banner */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    <div className="relative z-10 max-w-3xl">
                        <span className="bg-emerald-500/30 text-emerald-200 text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-400/20">
                            Academic Scholarship
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black mt-4 leading-tight">
                            {subject} Research & Publications
                        </h2>
                        <p className="text-emerald-100/90 text-sm sm:text-base mt-4 leading-relaxed text-justify whitespace-pre-line">
                            {pageText(
                                department,
                                'research_intro',
                                `Faculty members of the ${department.name} actively contribute to peer-reviewed international journals and conferences, advancing knowledge in their fields and bringing current research into the classroom.`,
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
                            placeholder="Search by title, authors, or journal..."
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
                                    {cat === 'all' ? 'All Disciplines' : cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Publications List */}
                {filtered.length > 0 ? (
                    <div className="space-y-4">
                        {filtered.map((pub) => (
                            <div 
                                key={pub.id}
                                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                            >
                                <div className="space-y-2 max-w-4xl">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {pub.year && (
                                            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md border border-emerald-100">
                                                {pub.year}
                                            </span>
                                        )}
                                        {pub.category && (
                                            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md border border-blue-100">
                                                {pub.category}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug">
                                        {pub.title}
                                    </h3>
                                    {pub.authors && (
                                        <p className="text-xs text-gray-600 font-medium">
                                            <span className="text-gray-400">Authors: </span>{pub.authors}
                                        </p>
                                    )}
                                    {pub.journal_conference && (
                                        <p className="text-xs text-emerald-600 font-semibold italic">
                                            {pub.journal_conference}
                                        </p>
                                    )}
                                </div>

                                {(pub.link || pub.pdf_file) && (
                                    <div className="flex-shrink-0 flex flex-wrap gap-2">
                                        {pub.link && (
                                            <a
                                                href={pub.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all shadow-sm group-hover:shadow"
                                            >
                                                View DOI / Article
                                                <ExternalLink size={13} />
                                            </a>
                                        )}
                                        {pub.pdf_file && (
                                            <a
                                                href={pub.pdf_file}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-all shadow-sm"
                                            >
                                                <FileText size={13} />
                                                PDF
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center space-y-3">
                        <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
                        <h4 className="text-base font-bold text-gray-800">No publications found</h4>
                        <p className="text-xs text-gray-500">
                            {publications.length === 0
                                ? 'Research publications of the department will be listed here.'
                                : 'Try adjusting your search keywords or discipline filter.'}
                        </p>
                    </div>
                )}

            </main>
        </DeptPageShell>
    );
}
