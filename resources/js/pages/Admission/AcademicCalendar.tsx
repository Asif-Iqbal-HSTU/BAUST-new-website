import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { CalendarDays, Info, Download, ExternalLink, AlertCircle, GraduationCap } from 'lucide-react';

interface CalendarDocument {
    title: string;
    subtitle: string;
    pdf: string;
}

interface PdfViewerLabels {
    full_view_label: string;
    download_label: string;
    preview_label: string;
    unavailable_heading: string;
    unavailable_text: string;
}

export interface AcademicCalendarContent {
    browser_title: string;
    hero: { title: string; subtitle: string };
    overview: { heading: string; text: string; highlighted_phrases: string[] };
    semester_structure: {
        heading: string;
        serial_column: string;
        event_column: string;
        weeks_column: string;
        total_label: string;
        events: { event: string; weeks: number | string }[];
    };
    note: { heading: string; text: string };
    undergraduate_calendar: CalendarDocument;
    graduate_divider_label: string;
    graduate_calendar: CalendarDocument;
    pdf_viewer: PdfViewerLabels;
}

/** Splits `text` on the given phrases; the first phrase gets the accent colour, the rest are just emphasised. */
function withHighlights(text: string, phrases: string[]): React.ReactNode {
    const list = phrases.filter(Boolean);
    if (!list.length) return text;
    const escaped = list.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const parts = text.split(new RegExp(`(${escaped.join('|')})`, 'g'));
    return parts.map((part, i) => {
        const at = list.indexOf(part);
        if (at < 0) return <React.Fragment key={i}>{part}</React.Fragment>;
        return (
            <span key={i} className={at === 0 ? 'font-semibold text-emerald-700' : 'font-semibold'}>
                {part}
            </span>
        );
    });
}

function PdfCard({ doc, labels }: { doc: CalendarDocument; labels: PdfViewerLabels }) {
    const src = doc.pdf;
    return (
        <div className="bg-white p-6 md:p-8 rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-900">{doc.title}</h3>
                    <p className="text-sm text-slate-500">{doc.subtitle}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                    <a href={src} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 bg-slate-50 text-slate-600 px-5 py-2.5 rounded-2xl font-bold hover:bg-emerald-50 hover:text-emerald-700 transition-all text-sm">
                        <span>{labels.full_view_label}</span><ExternalLink size={16} />
                    </a>
                    <a href={src} download className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-5 py-2.5 rounded-2xl font-bold hover:bg-emerald-700 transition-all text-sm">
                        <Download size={16} /><span>{labels.download_label}</span>
                    </a>
                </div>
            </div>
            <div className="rounded-[30px] border-4 border-slate-50 overflow-hidden bg-slate-50 shadow-inner">
                <div className="bg-slate-100 px-6 py-3 flex items-center justify-between border-b border-slate-200">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{labels.preview_label}</span>
                </div>
                <object data={src} type="application/pdf" className="w-full h-[620px]">
                    <div className="flex flex-col items-center justify-center h-[420px] p-12 text-center bg-white">
                        <AlertCircle className="text-slate-200 mb-6" size={72} />
                        <h4 className="text-slate-800 font-bold mb-2">{labels.unavailable_heading}</h4>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto">{labels.unavailable_text}</p>
                    </div>
                </object>
            </div>
        </div>
    );
}

export default function AcademicCalendar({ content }: { content: AcademicCalendarContent }) {
    const { hero, overview, semester_structure: structure, note, pdf_viewer: labels } = content;
    const total = structure.events.reduce((s, t) => s + (Number(t.weeks) || 0), 0);

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Head title={`${content.browser_title} - BAUST`} />
            <Navbar />
            <PageHero title={hero.title} subtitle={hero.subtitle} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
                    {/* Overview + term-structure table */}
                    <div className="xl:col-span-5 space-y-8">
                        <section className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 text-emerald-600 group-hover:scale-110 transition-transform duration-700"><CalendarDays size={140} /></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                    <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl mr-4"><Info size={24} /></span>
                                    {overview.heading}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {withHighlights(overview.text, overview.highlighted_phrases)}
                                </p>
                            </div>
                        </section>

                        <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 overflow-hidden">
                            <div className="px-8 py-5 bg-emerald-50/60 border-b border-emerald-100">
                                <h3 className="text-base font-bold text-emerald-900">{structure.heading}</h3>
                            </div>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-slate-400 text-[11px] uppercase tracking-widest">
                                        <th className="px-8 py-3 font-bold">{structure.serial_column}</th>
                                        <th className="px-2 py-3 font-bold">{structure.event_column}</th>
                                        <th className="px-8 py-3 font-bold text-right">{structure.weeks_column}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {structure.events.map((t, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/60">
                                            <td className="px-8 py-3.5 text-slate-400 font-semibold">{idx + 1}</td>
                                            <td className="px-2 py-3.5 text-slate-700 font-medium">{t.event}</td>
                                            <td className="px-8 py-3.5 text-right font-bold text-slate-800">{t.weeks}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-emerald-50/50">
                                        <td className="px-8 py-3.5" />
                                        <td className="px-2 py-3.5 font-extrabold text-emerald-800">{structure.total_label}</td>
                                        <td className="px-8 py-3.5 text-right font-extrabold text-emerald-800">{total}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl">
                            <h4 className="text-lg font-bold mb-3 flex items-center"><AlertCircle className="mr-2 text-emerald-400" size={20} />{note.heading}</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">{note.text}</p>
                        </div>
                    </div>

                    {/* PDF calendars */}
                    <div className="xl:col-span-7 space-y-8">
                        <PdfCard doc={content.undergraduate_calendar} labels={labels} />
                        <div className="flex items-center gap-3 px-2">
                            <GraduationCap className="text-emerald-600" size={22} />
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{content.graduate_divider_label}</span>
                            <div className="h-px flex-grow bg-slate-200" />
                        </div>
                        <PdfCard doc={content.graduate_calendar} labels={labels} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
