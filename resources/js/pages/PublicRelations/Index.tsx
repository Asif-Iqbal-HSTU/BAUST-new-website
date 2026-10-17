import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import PROIntroFab from '@/custom_components/PROIntroFab';
import { Newspaper, ExternalLink } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
}

interface PressCoverage {
    id: number;
    newspaper_name: string;
    url: string | null;
    clipping_file: string | null;
    published_date: string | null;
}

interface NewsEventItem {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    department: string | null;
    published_at: string;
    categories: Category[];
    press_coverages: PressCoverage[];
}

interface PaginatedItems {
    data: NewsEventItem[];
    current_page: number;
    last_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface DeptItem {
    slug: string;
    name: string;
    short_name: string;
}

interface Props {
    items: PaginatedItems;
    filters: { department?: string | null; search?: string | null };
    departments: DeptItem[];
}

function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    const day = d.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return { day, month: months[d.getMonth()], year: d.getFullYear() };
}

export default function PublicRelationsIndex({ items, filters, departments }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilters = (next: { department?: string | null; search?: string | null }) => {
        router.get('/public-relations', {
            department: next.hasOwnProperty('department') ? (next.department || undefined) : (filters.department || undefined),
            search: next.hasOwnProperty('search') ? (next.search || undefined) : (filters.search || undefined),
        }, { preserveState: true });
    };

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Public Relations - News & Events - BAUST" />
            <Navbar />
            <PageHero
                title="Public Relations"
                subtitle="News, events, and press coverage from across BAUST Saidpur"
                compact
            />

            <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-emerald-500 rounded-full" />
                        <p className="text-gray-500 text-sm">
                            Showing <span className="font-bold text-gray-800">{items.total}</span> news & events
                            {filters.department && (
                                <> from <span className="font-bold text-emerald-700 uppercase">{filters.department}</span></>
                            )}
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => { e.preventDefault(); applyFilters({ search }); }}
                        className="flex items-center gap-2 flex-wrap"
                    >
                        <select
                            value={filters.department || ''}
                            onChange={(e) => applyFilters({ department: e.target.value || null })}
                            className="py-2.5 px-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
                        >
                            <option value="">All Departments</option>
                            {departments.map((d) => (
                                <option key={d.slug} value={d.slug}>{d.short_name || d.name}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Search news & events..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-4 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none w-56 transition-all"
                        />
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-200 transition-all active:scale-95"
                        >
                            Search
                        </button>
                        {(filters.search || filters.department) && (
                            <button
                                type="button"
                                onClick={() => { setSearch(''); router.get('/public-relations'); }}
                                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold rounded-xl transition-all"
                            >
                                Clear
                            </button>
                        )}
                    </form>
                </div>

                {items.data.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                        <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-500">Nothing published yet</h3>
                        <p className="text-sm text-gray-400 mt-1">Check back soon for the latest news, events, and press coverage.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {items.data.map((item) => {
                            const { day, month, year } = formatDate(item.published_at);
                            return (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all flex flex-col"
                                >
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.categories.slice(0, 2).map((cat) => (
                                                    <span
                                                        key={cat.id}
                                                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                                        style={{ backgroundColor: cat.color + '15', color: cat.color }}
                                                    >
                                                        {cat.name}
                                                    </span>
                                                ))}
                                            </div>
                                            {item.department && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                                                    {item.department}
                                                </span>
                                            )}
                                        </div>

                                        <Link
                                            href={`/archive/notices/${item.slug}`}
                                            className="text-[15px] font-bold text-gray-800 hover:text-emerald-700 transition-colors leading-snug line-clamp-2"
                                        >
                                            {item.title}
                                        </Link>

                                        {item.excerpt && (
                                            <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">{item.excerpt}</p>
                                        )}

                                        <p className="text-[11px] text-gray-400 mt-3">{day} {month} {year}</p>

                                        {item.press_coverages.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-gray-100 space-y-1.5">
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
                                                    <Newspaper className="w-3 h-3" />
                                                    As covered in the press
                                                </p>
                                                {item.press_coverages.map((c) => (
                                                    <a
                                                        key={c.id}
                                                        href={c.url || c.clipping_file || '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                                                    >
                                                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                                        <span className="truncate">{c.newspaper_name}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {items.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1.5 mt-8">
                        {items.links.map((link, idx) => {
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
            </main>

            <Footer />
            <PROIntroFab />
        </div>
    );
}
