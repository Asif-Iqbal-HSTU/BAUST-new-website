import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';
import { Calendar, ArrowLeft, Download, Newspaper, ExternalLink } from 'lucide-react';

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

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    event: Notice;
    relatedEvents: Notice[];
    department?: DeptInfo | null;
}

export default function EventDetail({ event, relatedEvents, department }: Props) {
    const shortName = department?.short_name || 'CE';
    const pubDate = new Date(event.published_at);
    const formattedDate = isNaN(pubDate.getTime()) 
        ? event.published_at 
        : pubDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${event.title} - ${shortName} - BAUST`} />
            <Navbar />
            <PageHero 
                title={event.title} 
                subtitle={department?.name || CE_DEPT_NAME} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.name || CE_DEPT_NAME} activeTab="Events" tabs={CE_TABS} />

            <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto pb-1">
                    <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
                    <span className="text-gray-300">/</span>
                    <Link href="/ce" className="hover:text-emerald-700 transition-colors">{shortName}</Link>
                    <span className="text-gray-300">/</span>
                    <Link href="/ce/events" className="hover:text-emerald-700 transition-colors">News & Events</Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-800 font-semibold truncate max-w-sm">{event.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Event Article (Left 2 cols) */}
                    <article className="lg:col-span-2 min-w-0">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                            <div className="p-6 sm:p-10">
                                {/* Categories and date bar */}
                                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-gray-100">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                            {shortName} Department
                                        </span>
                                        {event.categories?.map(cat => (
                                            <span
                                                key={cat.id}
                                                className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                                                style={{
                                                    backgroundColor: (cat.color || '#059669') + '18',
                                                    color: cat.color || '#059669',
                                                }}
                                            >
                                                {cat.name}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                        <Calendar className="w-4 h-4 text-emerald-600" />
                                        <span>{formattedDate}</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-8">
                                    {event.title}
                                </h1>

                                {/* Attachment / Featured Visual */}
                                {event.attachment && !event.attachment.toLowerCase().includes('emoji') && !event.attachment.toLowerCase().includes('1f4') && !event.attachment.toLowerCase().includes('static.xx') && (
                                    <div className="mb-10">
                                        {event.attachment_type === 'image' || event.attachment.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
                                                <img
                                                    src={event.attachment}
                                                    alt={event.title}
                                                    className="w-full h-auto object-cover max-h-[550px]"
                                                />
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 h-[650px] sm:h-[800px]">
                                                    <iframe 
                                                        src={`${event.attachment}#toolbar=0&navpanes=0&scrollbar=0`}
                                                        className="w-full h-full"
                                                        title="Event Document Viewer"
                                                    />
                                                </div>
                                                <div className="flex justify-center">
                                                    <a
                                                        href={event.attachment}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-200"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                        Download Original Document
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Content Body */}
                                {event.content ? (
                                    <div
                                        className="prose rich-content max-w-none text-gray-800 text-base md:text-lg leading-relaxed font-sans [&_img:not([width='16'])]:rounded-2xl [&_img:not([width='16'])]:shadow-md [&_img:not([width='16'])]:my-6 [&_img:not([width='16'])]:mx-auto [&_img:not([width='16'])]:border [&_img:not([width='16'])]:border-gray-100 [&_img[width='16']]:inline-block [&_img[width='16']]:align-middle [&_img[width='16']]:my-0 [&_img[width='16']]:mx-1"
                                        dangerouslySetInnerHTML={{ __html: event.content }}
                                    />
                                ) : (
                                    <div className="text-center py-8 text-gray-400">
                                        {event.excerpt && <p className="text-base text-gray-600 leading-relaxed font-sans">{event.excerpt}</p>}
                                        {!event.excerpt && <p className="text-sm">Please refer to the document attachment above for complete details.</p>}
                                    </div>
                                )}

                                {/* Newspaper Coverage */}
                                {event.press_coverages && event.press_coverages.length > 0 && (
                                    <div className="mt-10 pt-8 border-t border-gray-100">
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-4 flex items-center gap-2">
                                            <Newspaper className="w-4 h-4 text-blue-600" />
                                            As Covered in the Press
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {event.press_coverages.map(c => (
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
                                                    <ExternalLink className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Back Link */}
                                <div className="mt-12 pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <Link
                                        href="/ce/events"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors group"
                                    >
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                        Back to {shortName} News & Events
                                    </Link>
                                    <Link
                                        href="/archive/notices?department=ce"
                                        className="text-xs font-semibold text-gray-400 hover:text-emerald-700 transition-colors"
                                    >
                                        View Full {shortName} Archive →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar (Right 1 col) */}
                    <aside className="space-y-6">
                        {/* Related CE Events */}
                        {relatedEvents && relatedEvents.length > 0 && (
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                                <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-5 bg-emerald-600 rounded-full" />
                                    More News from {shortName}
                                </h3>
                                <div className="space-y-3 divide-y divide-gray-50">
                                    {relatedEvents.map(re => {
                                        const d = new Date(re.published_at);
                                        return (
                                            <Link
                                                key={re.id}
                                                href={`/ce/events/${re.slug}`}
                                                className="block pt-3 first:pt-0 group"
                                            >
                                                <h4 className="text-sm font-bold text-gray-800 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                                                    {re.title}
                                                </h4>
                                                <span className="text-[11px] text-gray-400 mt-1 block">
                                                    {!isNaN(d.getTime()) ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : re.published_at}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                                <div className="mt-5 pt-4 border-t border-gray-100">
                                    <Link
                                        href="/ce/events"
                                        className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                                    >
                                        All Events & Announcements →
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Quick Navigation Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-5 bg-emerald-600 rounded-full" />
                                Department Links
                            </h3>
                            <ul className="space-y-2 text-sm font-medium">
                                <li>
                                    <Link href="/ce" className="block px-3 py-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                                        {shortName} Homepage
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/ce/faculty" className="block px-3 py-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                                        Faculty Members
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/ce/curriculum" className="block px-3 py-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                                        Undergraduate Curriculum
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/ce/laboratories" className="block px-3 py-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                                        Laboratories & Facilities
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/ce/clubs" className="block px-3 py-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                                        Student Clubs
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/ce/online-resources" className="block px-3 py-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                                        Online Resources & Drives
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}
