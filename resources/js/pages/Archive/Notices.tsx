import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
    notices_count: number;
}

interface Notice {
    id: number;
    title: string;
    slug: string;
    content: string | null;
    excerpt: string | null;
    attachment: string | null;
    attachment_type: string | null;
    original_url: string | null;
    is_pinned: boolean;
    published_at: string;
    categories: Category[];
}

interface PaginatedNotices {
    data: Notice[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface Props {
    notices: PaginatedNotices;
    categories: Category[];
    activeCategory: Category | null;
    search: string | null;
}

function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    const day = d.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return { day, month, year };
}

export default function Notices({ notices, categories, activeCategory, search }: Props) {
    const [searchQuery, setSearchQuery] = useState(search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/archive/notices', {
            search: searchQuery || undefined,
            category: activeCategory?.slug || undefined,
        }, { preserveState: true });
    };

    const handleCategoryClick = (slug: string | null) => {
        router.get('/archive/notices', {
            category: slug || undefined,
            search: searchQuery || undefined,
        }, { preserveState: true });
    };

    const pageTitle = activeCategory
        ? `${activeCategory.name} - Archive`
        : 'All Notices - Archive';

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={pageTitle + ' - BAUST'} />
            <Navbar />
            <PageHero
                title={activeCategory ? activeCategory.name : 'Notice Archive'}
                subtitle="Bangladesh Army University of Science & Technology"
                compact
            />

            <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-8">
                {/* Top Bar: Search + Stats */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-emerald-500 rounded-full" />
                        <div>
                            <p className="text-gray-500 text-sm">
                                Showing <span className="font-bold text-gray-800">{notices.total}</span> notices
                                {activeCategory && (
                                    <> in <span className="font-bold" style={{ color: activeCategory.color }}>{activeCategory.name}</span></>
                                )}
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search notices..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none w-64 transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-200 transition-all active:scale-95"
                        >
                            Search
                        </button>
                        {(search || activeCategory) && (
                            <button
                                type="button"
                                onClick={() => { setSearchQuery(''); router.get('/archive/notices'); }}
                                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold rounded-xl transition-all"
                            >
                                Clear
                            </button>
                        )}
                    </form>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar: Categories */}
                    <aside className="lg:w-72 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-4">
                            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    Filter by Category
                                </h3>
                            </div>
                            <div className="p-2 max-h-[60vh] overflow-y-auto">
                                <button
                                    onClick={() => handleCategoryClick(null)}
                                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                                        !activeCategory
                                            ? 'bg-emerald-50 text-emerald-700 font-bold'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${!activeCategory ? 'bg-emerald-500' : 'bg-gray-300 group-hover:bg-gray-400'}`} />
                                        All Notices
                                    </span>
                                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">
                                        {categories.reduce((sum, c) => sum + c.notices_count, 0)}
                                    </span>
                                </button>

                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryClick(cat.slug)}
                                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                                            activeCategory?.slug === cat.slug
                                                ? 'bg-emerald-50 text-emerald-700 font-bold'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2 truncate">
                                            <span
                                                className="w-2 h-2 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: activeCategory?.slug === cat.slug ? cat.color : '#d1d5db' }}
                                            />
                                            <span className="truncate">{cat.name}</span>
                                        </span>
                                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold flex-shrink-0 ml-2">
                                            {cat.notices_count}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Notice List */}
                    <div className="flex-1 min-w-0">
                        {notices.data.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="text-lg font-bold text-gray-500">No notices found</h3>
                                <p className="text-sm text-gray-400 mt-1">Try a different search or category filter.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {notices.data.map((notice) => {
                                    const { day, month, year } = formatDate(notice.published_at);
                                    return (
                                        <div
                                            key={notice.id}
                                            className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all group"
                                        >
                                            <div className="flex items-stretch">
                                                {/* Date Badge */}
                                                <div className="flex-shrink-0 w-20 flex flex-col items-center justify-center py-5 px-3 border-r border-gray-100 bg-gradient-to-b from-gray-50 to-white rounded-l-2xl">
                                                    <span className="text-2xl font-black text-emerald-700 leading-none">{day}</span>
                                                    <span className="text-xs font-bold text-emerald-600 uppercase mt-0.5">{month}</span>
                                                    <span className="text-[10px] text-gray-400 font-medium mt-0.5">{year}</span>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0 p-4 flex flex-col justify-center">
                                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                                        {notice.categories.map(cat => (
                                                            <span
                                                                key={cat.id}
                                                                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                                                style={{
                                                                    backgroundColor: cat.color + '15',
                                                                    color: cat.color,
                                                                }}
                                                            >
                                                                {cat.name}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <Link
                                                        href={`/archive/notices/${notice.slug}`}
                                                        className="text-[15px] font-bold text-gray-800 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2"
                                                    >
                                                        {notice.title}
                                                    </Link>

                                                    {notice.excerpt && (
                                                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{notice.excerpt}</p>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-2 px-4 flex-shrink-0">
                                                    {notice.attachment && (
                                                        <a
                                                            href={notice.attachment}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                                                            title="View Attachment"
                                                        >
                                                            {notice.attachment_type === 'pdf' ? (
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                                </svg>
                                                            ) : (
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            )}
                                                        </a>
                                                    )}
                                                    <Link
                                                        href={`/archive/notices/${notice.slug}`}
                                                        className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                                        title="View Details"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Pagination */}
                        {notices.last_page > 1 && (
                            <div className="flex items-center justify-center gap-1.5 mt-8">
                                {notices.links.map((link, idx) => {
                                    if (!link.url) {
                                        return (
                                            <span
                                                key={idx}
                                                className="px-3 py-2 text-sm text-gray-300 rounded-lg"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    }
                                    return (
                                        <Link
                                            key={idx}
                                            href={link.url}
                                            className={`px-3.5 py-2 text-sm rounded-xl font-semibold transition-all ${
                                                link.active
                                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                                    : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
