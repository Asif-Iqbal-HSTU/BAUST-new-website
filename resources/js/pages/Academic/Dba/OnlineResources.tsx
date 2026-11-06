import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { DBA_TABS, DBA_DEPT_NAME } from '@/data/dbaData';
import { 
    Folder, 
    ExternalLink, 
    Search, 
    Calendar, 
    Database, 
    Check, 
    Copy, 
    Layers,
    BookOpen,
    Download
} from 'lucide-react';

interface OnlineResourceItem {
    id: number;
    department_id: number;
    title: string;
    link: string;
    category?: string | null;
    description?: string | null;
    order: number;
    is_active: boolean;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    resources: OnlineResourceItem[];
}

export default function DbaOnlineResources({ department, resources = [] }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [copiedId, setCopiedId] = useState<number | null>(null);

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set<string>();
        resources.forEach(r => {
            if (r.category) cats.add(r.category);
        });
        return ['All', ...Array.from(cats)];
    }, [resources]);

    // Filter resources by search and category
    const filteredResources = useMemo(() => {
        return resources.filter(item => {
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
            const matchesSearch = searchQuery === '' || 
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [resources, selectedCategory, searchQuery]);

    const handleCopy = (id: number, link: string) => {
        navigator.clipboard.writeText(link);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const getCategoryIcon = (category?: string | null) => {
        if (!category) return <Folder className="w-5 h-5 text-emerald-600" />;
        const cat = category.toLowerCase();
        if (cat.includes('case') || cat.includes('study')) {
            return <BookOpen className="w-5 h-5 text-amber-600" />;
        }
        if (cat.includes('internship') || cat.includes('guideline')) {
            return <Database className="w-5 h-5 text-blue-600" />;
        }
        if (cat.includes('level') || cat.includes('term')) {
            return <Layers className="w-5 h-5 text-emerald-600" />;
        }
        return <Folder className="w-5 h-5 text-emerald-600" />;
    };

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Online Education & Resources - ${department?.short_name || 'DBA'} - BAUST`} />
            <Navbar />
            <PageHero 
                title="Online Education & Course Repositories" 
                subtitle="Courseware, Lecture Slides, Case Studies, and Term Academic Drives" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || DBA_DEPT_NAME} activeTab="Online Education" tabs={DBA_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">

                {/* Banner */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    <div className="relative z-10 max-w-3xl">
                        <span className="bg-emerald-500/30 text-emerald-200 text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-400/20">
                            Digital Repository
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-bold mt-4 leading-tight">
                            DBA Cloud Courseware & Learning Resources
                        </h2>
                        <p className="text-emerald-100/90 text-sm sm:text-base mt-4 leading-relaxed text-justify">
                            Access approved lecture materials, syllabus documents, business case studies, internship report formatting guidelines, and semester-wise Google Drive course packs curated by course teachers.
                        </p>
                    </div>
                </div>

                {/* Search & Category Filter */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text"
                            placeholder="Search course packs, level, or topic..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                        />
                    </div>

                    {categories.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                        selectedCategory === cat
                                            ? 'bg-emerald-700 text-white shadow-sm'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Resources Grid */}
                {filteredResources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResources.map((res) => (
                            <div 
                                key={res.id}
                                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                            {getCategoryIcon(res.category)}
                                        </div>
                                        {res.category && (
                                            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                                                {res.category}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug">
                                        {res.title}
                                    </h3>

                                    {res.description && (
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            {res.description}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between gap-2">
                                    <button
                                        onClick={() => handleCopy(res.id, res.link)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
                                    >
                                        {copiedId === res.id ? (
                                            <>
                                                <Check size={13} className="text-emerald-600" />
                                                <span className="text-emerald-600">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={13} />
                                                <span>Copy Link</span>
                                            </>
                                        )}
                                    </button>

                                    <a
                                        href={res.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-sm"
                                    >
                                        <span>Open Drive</span>
                                        <ExternalLink size={13} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center space-y-3">
                        <Folder className="w-10 h-10 text-gray-300 mx-auto" />
                        <h4 className="text-base font-bold text-gray-800">No resources found</h4>
                        <p className="text-xs text-gray-500">Try adjusting your search keywords or category filter.</p>
                    </div>
                )}

            </main>
            <Footer />
        </div>
    );
}
