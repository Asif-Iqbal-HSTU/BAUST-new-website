import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { DBA_TABS, DBA_DEPT_NAME } from '@/data/dbaData';
import { Calendar, Megaphone, Clock, ArrowRight, BookOpen } from 'lucide-react';

interface Notice {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    published_at: string;
    image?: string | null;
    categories?: { name: string; slug: string }[];
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    events: Notice[];
}

export default function DbaEvents({ department, events }: Props) {
    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`News & Events - ${department?.short_name || 'DBA'} - BAUST`} />
            <Navbar />
            <PageHero 
                title="News & Events" 
                subtitle="Stay Updated with Departmental Announcements, Seminars & Competitions" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || DBA_DEPT_NAME} activeTab="Events" tabs={DBA_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center gap-4 mb-12">
                    <Megaphone className="text-emerald-600 w-8 h-8" />
                    <h2 className="text-3xl font-bold text-gray-900">Latest from DBA</h2>
                    <div className="h-px flex-grow bg-emerald-100" />
                </div>

                {events && events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => {
                            const date = new Date(event.published_at);
                            return (
                                <div key={event.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full overflow-hidden">
                                    <div className="p-8 flex flex-col flex-grow">
                                        {/* Date Badge */}
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl flex flex-col items-center justify-center min-w-[64px] border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                                <span className="text-sm font-black leading-none">{date.toLocaleString('default', { day: '2-digit' })}</span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest mt-1">{date.toLocaleString('default', { month: 'short' })}</span>
                                            </div>
                                            <div className="h-px flex-grow bg-gray-100" />
                                        </div>

                                        <Link href={`/dba/events/${event.slug}`} className="flex-grow">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors line-clamp-3">
                                                {event.title}
                                            </h3>
                                        </Link>

                                        {event.excerpt && (
                                            <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                                                {event.excerpt}
                                            </p>
                                        )}

                                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold">
                                                <Calendar size={14} className="text-emerald-500/50" />
                                                {date.getFullYear()}
                                            </div>
                                            <Link 
                                                href={`/dba/events/${event.slug}`}
                                                className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 group-hover:translate-x-1 transition-transform"
                                            >
                                                Read More
                                                <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 max-w-lg mx-auto">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-800">No events published yet</h3>
                        <p className="text-gray-500 text-sm mt-2">New announcements, seminar notifications, and events will appear here.</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
