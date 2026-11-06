import React from 'react';
import { Link } from '@inertiajs/react';
import DeptPageShell from '@/custom_components/DeptPageShell';
import { DeptInfo, DeptPageProps, deptBase, deptShort } from '@/data/departmentData';
import { pageText } from '@/lib/dept-icons';
import { Calendar, MapPin, Clock, ArrowRight, ExternalLink, Megaphone } from 'lucide-react';

interface Notice {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    published_at: string;
    categories?: { name: string; slug: string }[];
}

interface Props extends DeptPageProps {
    department: DeptInfo & { page_texts?: Record<string, string> | null };
    events: Notice[];
}

export default function DepartmentEvents({ department, tabs, events }: Props) {
    const base = deptBase(department);
    const short = deptShort(department);

    return (
        <DeptPageShell
            department={department}
            tabs={tabs}
            activeTab="Events"
            title={`News & Events - ${short}`}
            heroTitle="News & Events"
            heroSubtitle={pageText(department, 'events_intro', 'Stay Updated with Departmental Highlights')}
        >

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center gap-4 mb-12">
                    <Megaphone className="text-emerald-600 w-8 h-8" />
                    <h2 className="text-3xl font-bold text-gray-900">Latest from {short}</h2>
                    <div className="h-px flex-grow bg-emerald-100" />
                </div>

                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => {
                            const date = new Date(event.published_at);
                            return (
                                <div key={event.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
                                    <div className="p-8 flex flex-col flex-grow">
                                        {/* Date Badge */}
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl flex flex-col items-center justify-center min-w-[64px] border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                                <span className="text-sm font-black leading-none">{date.toLocaleString('default', { day: '2-digit' })}</span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest mt-1">{date.toLocaleString('default', { month: 'short' })}</span>
                                            </div>
                                            <div className="h-px flex-grow bg-gray-100" />
                                        </div>

                                        <Link href={`${base}/events/${event.slug}`} className="flex-grow">
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
                                                href={`${base}/events/${event.slug}`}
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
                    <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <Calendar size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Events Found</h3>
                        <p className="text-gray-500">Check back later for upcoming news and departmental highlights.</p>
                    </div>
                )}

                {/* Main Archive Link */}
                <div className="mt-20 text-center">
                    <Link 
                        href={`/archive/notices?department=${department.slug}`} 
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl hover:shadow-emerald-200 group"
                    >
                        Visit Main News Archive
                        <ExternalLink size={18} className="opacity-50 group-hover:opacity-100" />
                    </Link>
                </div>
            </main>
        </DeptPageShell>
    );
}
