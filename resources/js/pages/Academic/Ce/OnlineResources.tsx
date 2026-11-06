import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';
import { pageText } from '@/lib/dept-icons';
import { 
    Folder, 
    ExternalLink, 
    Search, 
    BookOpen, 
    Calendar, 
    Database, 
    Check, 
    Copy, 
    HardDrive,
    Layers,
    Sparkles
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
    name: string;
    short_name: string;
    page_texts?: Record<string, string> | null;
}

interface Props {
    department?: DeptInfo | null;
    resources: OnlineResourceItem[];
}

export default function OnlineResources({ department, resources = [] }: Props) {
    const shortName = department?.short_name || 'CE';
    const deptName = department?.name || 'Department of Civil Engineering';
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
        if (cat.includes('routine') || cat.includes('schedule')) {
            return <Calendar className="w-5 h-5 text-amber-600" />;
        }
        if (cat.includes('repository') || cat.includes('all') || cat.includes('drive')) {
            return <Database className="w-5 h-5 text-blue-600" />;
        }
        if (cat.includes('level') || cat.includes('term')) {
            return <Layers className="w-5 h-5 text-emerald-600" />;
        }
        return <Folder className="w-5 h-5 text-emerald-600" />;
    };

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Online Resources - ${shortName} - BAUST`} />
            <Navbar />
            <PageHero 
                title="Online Resources & Course Materials" 
                subtitle={deptName} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.name || CE_DEPT_NAME} activeTab="Online Resources" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                
                {/* Header Information Card */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-200 text-xs font-semibold mb-4">
                            <Sparkles className="w-3.5 h-3.5" />
                            Academic Cloud Repository
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                            {shortName} Online Education Portal
                        </h2>
                        <p className="mt-2 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                            {pageText(department, 'online_resources_intro', 'Access verified lecture notes, laboratory test manuals, codes, design sheets, and class routines hosted securely on Google Drive for all undergraduate students.')}
                        </p>
                    </div>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                    selectedCategory === cat
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-72">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search materials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Resources Grid */}
                {filteredResources.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-gray-700">No resources found</h3>
                        <p className="text-sm text-gray-500 mt-1">Try adjusting your search or category filter.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResources.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                            {getCategoryIcon(item.category)}
                                        </div>
                                        {item.category && (
                                            <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-100/70 text-emerald-800 uppercase tracking-wider">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-emerald-700 transition-colors mb-2">
                                        {item.title}
                                    </h3>

                                    {item.description && (
                                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
                                            {item.description}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-gray-50 flex items-center gap-2">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-grow inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-600/15 hover:shadow-emerald-600/25 transition-all"
                                    >
                                        <HardDrive className="w-4 h-4" />
                                        <span>Open Drive</span>
                                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                                    </a>

                                    <button
                                        type="button"
                                        onClick={() => handleCopy(item.id, item.link)}
                                        title="Copy Link"
                                        className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        {copiedId === item.id ? (
                                            <Check className="w-4 h-4 text-emerald-600" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Information Callout */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex items-start gap-4 text-amber-900">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-700 font-bold">
                        i
                    </div>
                    <div className="text-xs sm:text-sm leading-relaxed">
                        <strong className="font-semibold block mb-1">Access Guidelines:</strong>
                        Course materials and lecture folders are hosted via Google Drive. If you encounter permission restrictions, please make sure you are signed in with your official university institutional account (<span className="font-mono text-amber-800">@baust.edu.bd</span>) or contact your course instructor.
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
