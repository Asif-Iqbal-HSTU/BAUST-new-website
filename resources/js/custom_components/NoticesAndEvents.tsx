import React from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, ArrowUpRight } from 'lucide-react';

export interface NoticeItem {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    department?: string | null;
    published_at: string | null;
    date_formatted?: string;
}

export interface NewsEventItem {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    attachment?: string | null;
    department?: string | null;
    published_at: string | null;
    date_formatted?: string;
}

interface Props {
    notices?: NoticeItem[];
    newsEvents?: NewsEventItem[];
}

export default function NoticesAndEvents({ notices = [], newsEvents = [] }: Props) {
    const defaultImage = '/images/campus-960.webp';

    // Separate news events into top 2 featured and bottom 2 compact
    const topFeatured = newsEvents.slice(0, 2);
    const bottomCompact = newsEvents.slice(2, 4);

    return (
        <section className="w-full bg-slate-50/70 py-12 md:py-16 border-b border-gray-100">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    
                    {/* Left Column: Notices */}
                    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden">
                        {/* Header */}
                        <div className="py-4 px-6 border-b border-gray-100 text-center bg-white">
                            <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 tracking-tight">
                                Notices
                            </h2>
                        </div>

                        {/* Scrollable Notices List */}
                        <div className="flex-1 overflow-y-auto max-h-[500px] p-3 sm:p-5 divide-y divide-gray-100 space-y-1">
                            {notices.length > 0 ? (
                                notices.map((notice) => (
                                    <Link
                                        key={notice.id}
                                        href={`/archive/notices/${notice.slug}`}
                                        className="block p-3.5 rounded-xl hover:bg-emerald-50/50 transition-colors group"
                                    >
                                        <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                                            {notice.title}
                                        </h3>

                                        {notice.excerpt && (
                                            <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                                                {notice.excerpt}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mt-2">
                                            <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                            <span>{notice.date_formatted || 'Recent'}</span>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="py-12 text-center text-gray-400 text-sm">
                                    No notices published recently.
                                </div>
                            )}
                        </div>

                        {/* Notices Footer */}
                        <div className="p-3.5 border-t border-gray-100 bg-gray-50/60 text-center mt-auto">
                            <Link
                                href="/archive/notices"
                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors group"
                            >
                                <span>View all Notices</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: News and Events */}
                    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden">
                        {/* Header */}
                        <div className="py-4 px-6 border-b border-gray-100 text-center bg-white">
                            <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 tracking-tight">
                                News and Events
                            </h2>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto max-h-[500px] lg:max-h-none lg:overflow-visible">
                            {newsEvents.length > 0 ? (
                                <>
                                    {/* Top 2 Featured News Cards */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        {topFeatured.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/archive/notices/${item.slug}`}
                                                className="group flex flex-col h-full bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all p-3"
                                            >
                                                {/* Image Banner */}
                                                <div className="relative w-full h-36 sm:h-38 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                                                    <img
                                                        src={item.attachment || defaultImage}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        onError={(e) => {
                                                            const target = e.currentTarget;
                                                            if (target.src !== defaultImage) {
                                                                target.src = defaultImage;
                                                            }
                                                        }}
                                                    />
                                                </div>

                                                {/* Tag & Date */}
                                                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 mt-2.5">
                                                    <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold uppercase text-[10px]">
                                                        {item.department ? item.department : 'Official'}
                                                    </span>
                                                    <span className="text-gray-300">•</span>
                                                    <span className="text-gray-500 font-medium">
                                                        {item.date_formatted || 'Recent'}
                                                    </span>
                                                </div>

                                                {/* Title with Arrow */}
                                                <div className="flex items-start justify-between gap-1.5 mt-1.5">
                                                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                                                        {item.title}
                                                    </h3>
                                                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-700 shrink-0 transition-colors mt-0.5" />
                                                </div>

                                                {/* Excerpt */}
                                                {item.excerpt && (
                                                    <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                                                        {item.excerpt}
                                                    </p>
                                                )}
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Bottom 2 Compact News Cards */}
                                    {bottomCompact.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                            {bottomCompact.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={`/archive/notices/${item.slug}`}
                                                    className="flex items-center gap-3 group p-2 rounded-xl hover:bg-emerald-50/50 transition-colors border border-transparent hover:border-gray-100"
                                                >
                                                    {/* Small Thumbnail */}
                                                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                                                        <img
                                                            src={item.attachment || defaultImage}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            onError={(e) => {
                                                                const target = e.currentTarget;
                                                                if (target.src !== defaultImage) {
                                                                    target.src = defaultImage;
                                                                }
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Text Content */}
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                                                            {item.title}
                                                        </h4>
                                                        {item.excerpt && (
                                                            <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">
                                                                {item.excerpt}
                                                            </p>
                                                        )}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="py-12 text-center text-gray-400 text-sm">
                                    No news or events published recently.
                                </div>
                            )}
                        </div>

                        {/* News and Events Footer */}
                        <div className="p-3.5 border-t border-gray-100 bg-gray-50/60 text-center mt-auto">
                            <Link
                                href="/archive/notices?category=news-events"
                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors group"
                            >
                                <span>View all News and Events</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
