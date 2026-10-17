import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';

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
    department?: string | null;
    categories: Category[];
    press_coverages?: PressCoverage[];
}

interface Props {
    notice: Notice;
    relatedNotices: Notice[];
}

export default function NoticeDetail({ notice, relatedNotices }: Props) {
    const pubDate = new Date(notice.published_at);
    const formattedDate = pubDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${notice.title} - BAUST`} />
            <Navbar />
            <PageHero title="Notice Details" subtitle="Bangladesh Army University of Science & Technology" compact />

            <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                    <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    <Link href="/archive/notices" className="hover:text-emerald-600 transition-colors">Notices</Link>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    <span className="text-gray-600 font-semibold truncate max-w-xs">{notice.title}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <article className="flex-1 min-w-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Green accent bar */}
                            <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />

                            <div className="p-6 sm:p-10">
                                {/* Category tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {notice.categories.map(cat => (
                                        <Link
                                            key={cat.id}
                                            href={`/archive/notices?category=${cat.slug}`}
                                            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-all hover:opacity-80"
                                            style={{
                                                backgroundColor: cat.color + '15',
                                                color: cat.color,
                                            }}
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                    {notice.department === 'cse' && (
                                        <Link
                                            href={`/cse/events/${notice.slug}`}
                                            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors flex items-center gap-1"
                                        >
                                            CSE Department Portal →
                                        </Link>
                                    )}
                                    {notice.is_pinned && (
                                        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-red-50 text-red-600 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            Pinned
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-3">
                                    {notice.title}
                                </h1>

                                {/* Meta */}
                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-6 border-b border-gray-100">
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {formattedDate}
                                    </span>
                                </div>

                                {/* Attachment Preview / Viewer */}
                                {notice.attachment && (
                                    <div className="mb-10">
                                        {notice.attachment_type === 'image' || notice.attachment?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 group">
                                                <img
                                                    src={notice.attachment}
                                                    alt={notice.title}
                                                    className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 h-[800px]">
                                                    <iframe 
                                                        src={`${notice.attachment}#toolbar=0&navpanes=0&scrollbar=0`}
                                                        className="w-full h-full"
                                                        title="Notice Document Viewer"
                                                    />
                                                    {/* Tooltip hint */}
                                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black text-gray-500 shadow-sm border border-gray-100 pointer-events-none uppercase tracking-widest">
                                                        Embedded Document
                                                    </div>
                                                </div>
                                                
                                                <div className="flex justify-center">
                                                    <a
                                                        href={notice.attachment}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-sm rounded-xl transition-all border border-emerald-100 shadow-sm shadow-emerald-100/50"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 11l5 5m0 0l5-5m-5 5V4" />
                                                        </svg>
                                                        Download Original Document
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Content Body */}
                                {notice.content ? (
                                    <div
                                        className="prose rich-content max-w-none text-gray-700 leading-relaxed font-sans"
                                        dangerouslySetInnerHTML={{ __html: notice.content }}
                                    />
                                ) : (
                                    <div className="text-center py-10 text-gray-400">
                                        <p className="text-sm">This notice does not have a text body.</p>
                                        {notice.attachment && (
                                            <p className="text-sm mt-1">Please view the attached document above.</p>
                                        )}
                                    </div>
                                )}
                                {/* Newspaper Coverage */}
                                {notice.press_coverages && notice.press_coverages.length > 0 && (
                                    <div className="mt-10 pt-8 border-t border-gray-100">
                                        <h3 className="text-sm font-black uppercase tracking-wider text-gray-700 mb-4 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                            </svg>
                                            As Covered in the Press
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {notice.press_coverages.map(c => (
                                                <a
                                                    key={c.id}
                                                    href={c.url || c.clipping_file || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-blue-100 bg-blue-50/60 hover:bg-blue-100/60 transition-colors"
                                                >
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-bold text-blue-800 truncate">{c.newspaper_name}</p>
                                                        {c.published_date && (
                                                            <p className="text-[11px] text-blue-500">
                                                                {new Date(c.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Back Link */}
                        <div className="mt-6">
                            <Link
                                href="/archive/notices"
                                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors group"
                            >
                                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Notices
                            </Link>
                        </div>
                    </article>

                    {/* Sidebar: Related Notices */}
                    {relatedNotices.length > 0 && (
                        <aside className="lg:w-80 flex-shrink-0">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-4">
                                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white">
                                    <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                                        <span className="w-1 h-5 bg-emerald-500 rounded-full" />
                                        Related Notices
                                    </h3>
                                </div>
                                <div className="divide-y divide-gray-50">
                                    {relatedNotices.map(rn => {
                                        const d = new Date(rn.published_at);
                                        return (
                                            <Link
                                                key={rn.id}
                                                href={`/archive/notices/${rn.slug}`}
                                                className="block px-4 py-3.5 hover:bg-emerald-50/50 transition-colors group"
                                            >
                                                <p className="text-[13px] font-bold text-gray-700 group-hover:text-emerald-700 line-clamp-2 leading-snug transition-colors">
                                                    {rn.title}
                                                </p>
                                                <p className="text-[11px] text-gray-400 mt-1.5">
                                                    {d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
