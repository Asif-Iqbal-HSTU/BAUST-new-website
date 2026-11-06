import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { EEE_TABS, EEE_DEPT_NAME } from '@/data/eeeData';
import { pageText } from '@/lib/dept-icons';
import { Calendar, ArrowRight, Megaphone } from 'lucide-react';

interface EventNotice {
    id: number;
    title: string;
    slug: string;
    published_at: string;
    excerpt?: string | null;
    description?: string | null;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
    page_texts?: Record<string, string> | null;
}

export default function EeeEvents({ department, events }: { department?: DeptInfo | null; events: EventNotice[] }) {
    const list: EventNotice[] = events ?? [];

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`News & Events - ${department?.short_name || 'EEE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title="News & Events" 
                subtitle={pageText(department, 'events_intro', `Stay Updated with ${department?.short_name || 'EEE'} Department Highlights`)} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || EEE_DEPT_NAME} activeTab="Events" tabs={EEE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center gap-4 mb-12">
                    <Megaphone className="text-emerald-600 w-8 h-8" />
                    <h2 className="text-3xl font-bold text-gray-900">Latest from {department?.short_name || 'EEE'}</h2>
                    <div className="h-px flex-grow bg-emerald-100" />
                </div>

                {list.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {list.map((event) => {
                            const date = new Date(event.published_at);
                            const day = isNaN(date.getTime()) ? '--' : date.toLocaleString('default', { day: '2-digit' });
                            const month = isNaN(date.getTime()) ? '' : date.toLocaleString('default', { month: 'short' });
                            const year = isNaN(date.getTime()) ? '' : date.getFullYear();
                            const link = `/eee/events/${event.slug}`;

                            return (
                                <div key={event.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
                                    <div className="p-8 flex flex-col flex-grow">
                                        {/* Date Badge */}
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl flex flex-col items-center justify-center min-w-[64px] border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                                <span className="text-sm font-black leading-none">{day}</span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest mt-1">{month}</span>
                                            </div>
                                            <div className="h-px flex-grow bg-gray-100" />
                                        </div>

                                        <Link href={link} className="flex-grow">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors line-clamp-3">
                                                {event.title}
                                            </h3>
                                        </Link>

                                        {(event.excerpt || event.description) && (
                                            <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {event.excerpt || event.description}
                                            </p>
                                        )}

                                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold">
                                                <Calendar size={14} className="text-emerald-500/50" />
                                                {year}
                                            </div>
                                            <Link 
                                                href={link}
                                                className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold hover:gap-3 transition-all"
                                            >
                                                Read More <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                        <p className="text-gray-500 font-medium">No published events found at this time.</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
