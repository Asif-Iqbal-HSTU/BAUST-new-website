import React from 'react';
import SeoHead from '@/components/seo-head';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { GraduationCap, BookOpen, Clock, Users, ExternalLink, Info, CheckCircle2 } from "lucide-react";

export interface OfferedProgramsContent {
    browser_title: string;
    hero: { title: string; subtitle: string };
    intro: { heading: string; text: string };
    undergraduate: {
        heading: string;
        subheading: string;
        serial_column: string;
        name_column: string;
        credits_column: string;
        credits_suffix: string;
        programs: { name: string; credits: number | string }[];
    };
    graduate: {
        heading: string;
        subheading: string;
        credits_label: string;
        programs: { name: string; credits: string; duration: string }[];
    };
    admission_overview: {
        heading: string;
        lead: string;
        capacity_text: string;
        capacity_highlight: string;
        footnote: string;
    };
    apply_cta: { heading: string; text: string; button_label: string; button_url: string };
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

export default function OfferedPrograms({ content }: { content: OfferedProgramsContent }) {
    const { hero, intro, undergraduate, graduate, admission_overview: overview, apply_cta: cta } = content;

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <SeoHead title={`${content.browser_title} - BAUST`} />

            {/* Navigation */}
            <Navbar />

            {/* Page Header */}
            <PageHero title={hero.title} subtitle={hero.subtitle} />

            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">{intro.heading}</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        {intro.text}
                    </p>
                </div>

                <div className="space-y-20">

                    {/* Undergraduate Programs Section */}
                    <section>
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-600/20 text-white">
                                <GraduationCap size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">{undergraduate.heading}</h3>
                                <p className="text-slate-500 text-sm">{undergraduate.subheading}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100">
                                            <th className="px-8 py-5 text-sm font-black uppercase tracking-wider text-slate-500">{undergraduate.serial_column}</th>
                                            <th className="px-8 py-5 text-sm font-black uppercase tracking-wider text-slate-500">{undergraduate.name_column}</th>
                                            <th className="px-8 py-5 text-sm font-black uppercase tracking-wider text-slate-500 text-right">{undergraduate.credits_column}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {undergraduate.programs.map((program, idx) => (
                                            <tr key={idx} className="hover:bg-emerald-50/30 transition-colors group">
                                                <td className="px-8 py-5 text-slate-500 font-medium">{(idx + 1).toString().padStart(2, '0')}</td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        <span className="text-slate-900 font-semibold">{program.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-bold">
                                                        {program.credits} {undergraduate.credits_suffix}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* Graduate Programs Section */}
                    <section id="graduate-programs" className="scroll-mt-24">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="bg-[#0f5132] p-3 rounded-2xl shadow-lg shadow-emerald-900/20 text-white">
                                <BookOpen size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">{graduate.heading}</h3>
                                <p className="text-slate-500 text-sm">{graduate.subheading}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {graduate.programs.map((program, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/40 border border-slate-100 hover:border-emerald-200 hover:shadow-emerald-100/50 transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-slate-50 text-slate-400 font-black p-2 rounded-xl text-xs group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                            #{idx + 1}
                                        </div>
                                        <div className="flex items-center space-x-2 text-emerald-600 text-xs font-bold uppercase tracking-widest">
                                            <Clock size={14} />
                                            <span>{program.duration}</span>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">{program.name}</h4>
                                    <div className="flex items-center space-x-2 mt-4 text-slate-500 font-medium text-sm">
                                        <div className="p-1 bg-slate-100 rounded-md text-slate-400">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        <span>{graduate.credits_label} <b className="text-slate-700">{program.credits}</b></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Admission Info Cards */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">

                        {/* Capacity Info */}
                        <div className="lg:col-span-2 bg-[#0f5132] text-white p-8 md:p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <Users size={120} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-6 flex items-center">
                                    <span className="p-2 bg-white/10 rounded-lg mr-4">
                                        <Info size={24} />
                                    </span>
                                    {overview.heading}
                                </h3>
                                <div className="space-y-6 text-emerald-50/80 leading-relaxed">
                                    <p className="text-lg font-medium text-white">
                                        {overview.lead}
                                    </p>
                                    <p>
                                        {withHighlight(overview.capacity_text, overview.capacity_highlight, (p) => (
                                            <strong className="text-emerald-300">{p}</strong>
                                        ))}
                                    </p>
                                    {overview.footnote && (
                                        <div className="pt-6 border-t border-white/10">
                                            <p className="text-xs italic opacity-70">
                                                {overview.footnote}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Application CTA */}
                        <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border border-slate-100 flex flex-col justify-between items-center text-center">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-6">
                                <ExternalLink size={40} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{cta.heading}</h3>
                                <p className="text-slate-500 text-sm mb-8">{cta.text}</p>
                            </div>
                            <a
                                href={cta.button_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/20 active:scale-95 flex items-center justify-center space-x-2"
                            >
                                <span>{cta.button_label}</span>
                                <ExternalLink size={18} />
                            </a>
                        </div>
                    </section>

                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
