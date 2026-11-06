import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { XCircle, Info, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export interface CancelPolicyContent {
    browser_title: string;
    hero: { title: string; subtitle: string };
    overview: {
        section_number: string;
        heading: string;
        text: string;
        highlighted_phrase: string;
        highlights: string[];
    };
    reference: { heading: string; text: string };
    refund_schedule: {
        heading: string;
        subheading: string;
        serial_column: string;
        description_column: string;
        refundable_column: string;
        rules: { when: string; refundable: string }[];
    };
}

/** Renders `text`, wrapping the first occurrence of `phrase` with `wrap`. */
function withHighlight(text: string, phrase: string, wrap: (p: string) => React.ReactNode): React.ReactNode {
    const at = phrase ? text.indexOf(phrase) : -1;
    if (at < 0) return text;
    return (
        <>
            {text.slice(0, at)}
            {wrap(phrase)}
            {text.slice(at + phrase.length)}
        </>
    );
}

export default function CancelPolicy({ content }: { content: CancelPolicyContent }) {
    const { hero, overview, reference, refund_schedule: schedule } = content;

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Head title={`${content.browser_title} - BAUST`} />
            <Navbar />
            <PageHero title={hero.title} subtitle={hero.subtitle} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
                    {/* Overview */}
                    <div className="xl:col-span-4 space-y-8">
                        <section className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 text-emerald-600 group-hover:scale-110 transition-transform duration-700"><XCircle size={140} /></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                    <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl mr-4"><Info size={24} /></span>
                                    {overview.section_number && <>{overview.section_number} &nbsp;</>}{overview.heading}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {withHighlight(overview.text, overview.highlighted_phrase, (p) => (
                                        <span className="font-semibold text-slate-800">{p}</span>
                                    ))}
                                </p>
                                <div className="mt-6 space-y-3">
                                    {overview.highlights.map((t, idx) => (
                                        <div key={idx} className="flex items-center space-x-3 text-sm font-medium text-slate-700">
                                            <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" /><span>{t}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl">
                            <h4 className="text-lg font-bold mb-3 flex items-center"><AlertCircle className="mr-2 text-emerald-400" size={20} />{reference.heading}</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">{reference.text}</p>
                        </div>
                    </div>

                    {/* Refund schedule */}
                    <div className="xl:col-span-8">
                        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
                            <div className="px-8 py-6 bg-emerald-50/60 border-b border-emerald-100 flex items-center gap-3">
                                <Clock className="text-emerald-700" size={22} />
                                <div>
                                    <h3 className="text-lg font-bold text-emerald-900">{schedule.heading}</h3>
                                    <p className="text-xs text-emerald-700/70">{schedule.subheading}</p>
                                </div>
                            </div>

                            {/* Desktop table */}
                            <table className="w-full text-sm hidden md:table">
                                <thead>
                                    <tr className="text-left text-slate-400 text-[11px] uppercase tracking-widest border-b border-slate-100">
                                        <th className="px-8 py-4 font-bold">{schedule.serial_column}</th>
                                        <th className="px-2 py-4 font-bold">{schedule.description_column}</th>
                                        <th className="px-8 py-4 font-bold">{schedule.refundable_column}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {schedule.rules.map((r, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/60 align-top">
                                            <td className="px-8 py-5 text-slate-400 font-bold">{idx + 1}</td>
                                            <td className="px-2 py-5 text-slate-800 font-semibold">{r.when}</td>
                                            <td className="px-8 py-5 text-slate-600 leading-relaxed">{r.refundable}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Mobile cards */}
                            <div className="md:hidden divide-y divide-slate-50">
                                {schedule.rules.map((r, idx) => (
                                    <div key={idx} className="p-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">{idx + 1}</span>
                                            <p className="font-semibold text-slate-800 text-sm">{r.when}</p>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed pl-9">{r.refundable}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
