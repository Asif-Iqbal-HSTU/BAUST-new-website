import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';
import { BookOpen, ExternalLink, Search, Filter, FileText } from 'lucide-react';
import { pageText } from '@/lib/dept-icons';

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

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
    page_texts?: Record<string, string> | null;
}

interface Props {
    department?: DeptInfo | null;
    publications: Publication[];
}

export default function CePublications({ department, publications = [] }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', ...Array.from(new Set(publications.map(p => p.category).filter(Boolean)))];

    const filtered = publications.filter(p => {
        const q = searchTerm.toLowerCase();
        const matchesSearch = [p.title, p.authors, p.journal_conference, p.year].some(v => v && v.toLowerCase().includes(q));
        const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
        return matchesSearch && matchesCat;
    });

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Publications - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title="Research Publications" 
                subtitle={pageText(department, 'research_subtitle', `Peer-Reviewed Journal & International Conference Articles by ${department?.short_name || 'CE'} Faculty`)} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Research" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
                
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    <div className="relative z-10 max-w-3xl">
                        <span className="bg-emerald-500/30 text-emerald-200 text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-400/20">
                            Academic Scholarship
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black mt-4 leading-tight">
                            Faculty Research & Scientific Contributions
                        </h2>
                        <p className="text-emerald-100/90 text-sm sm:text-base mt-4 leading-relaxed text-justify">
                            {pageText(department, 'research_intro', 'Our faculty members actively publish groundbreaking research across water process engineering, structural strengthening, drought assessments, concrete sustainability, and road safety in premier international journals and conferences including Elsevier, Springer Nature, and KUET ICCESD.')}
                        </p>
                    </div>
                </div>

                {/* Filters and Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text"
                            placeholder="Search by keywords, authors, or journal..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                        <Filter className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat as string)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                    selectedCategory === cat
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {cat === 'all' ? 'All Publications' : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Publications List */}
                <div className="space-y-4">
                    {filtered.length > 0 ? (
                        filtered.map((pub, idx) => (
                            <div 
                                key={pub.id ?? idx}
                                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start justify-between gap-6 group hover:border-emerald-200"
                            >
                                <div className="space-y-3 flex-1">
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                                            pub.category?.toLowerCase().includes('journal')
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : 'bg-teal-100 text-teal-800'
                                        }`}>
                                            {pub.category || 'Journal Paper'}
                                        </span>
                                        <span className="text-xs font-semibold text-gray-400">
                                            {pub.year || `Citation #${idx + 1}`}
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-800 font-medium text-sm sm:text-base leading-relaxed text-justify">
                                        {pub.title}
                                    </p>
                                    {pub.authors && (
                                        <p className="text-xs sm:text-sm text-gray-600">{pub.authors}</p>
                                    )}
                                    {pub.journal_conference && (
                                        <p className="text-xs sm:text-sm text-emerald-700 italic">{pub.journal_conference}</p>
                                    )}
                                </div>

                                {(pub.link || pub.pdf_file) && <div className="flex flex-col gap-2 flex-shrink-0">
                                {pub.pdf_file && (
                                    <a
                                        href={pub.pdf_file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all shadow-sm flex-shrink-0 group-hover:scale-105"
                                    >
                                        <span>PDF</span>
                                        <FileText className="w-3.5 h-3.5" />
                                    </a>
                                )}
                                {pub.link && (
                                    <a
                                        href={pub.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all shadow-sm flex-shrink-0 group-hover:scale-105"
                                    >
                                        <span>View Article</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                )}
                                </div>}
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
                            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-base font-bold text-gray-700">No publications found</h3>
                            <p className="text-xs text-gray-500 mt-1">Try refining your search terms or filters.</p>
                        </div>
                    )}
                </div>

            </main>
            <Footer />
        </div>
    );
}
