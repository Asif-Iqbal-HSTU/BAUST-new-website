import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { Gift, FileText, Download, ExternalLink, AlertCircle, ChevronRight, CheckCircle2 } from "lucide-react";

export interface WaiverAndFinancialAidContent {
    browser_title: string;
    hero: { title: string; subtitle: string };
    intro: { heading: string; text: string };
    documents: {
        document_label: string;
        items: { title: string; description: string; pdf: string }[];
    };
    key_benefits: { heading: string; items: string[] };
    download_cta: { caption: string; label: string };
    preview: {
        full_view_label: string;
        preview_label: string;
        unavailable_heading: string;
        unavailable_text: string;
        view_document_label: string;
    };
}

export default function WaiverAndFinancialAid({ content }: { content: WaiverAndFinancialAidContent }) {
    const [activeTab, setActiveTab] = useState(0);

    const { hero, intro, documents, key_benefits: benefits, download_cta: downloadCta, preview } = content;
    const waivers = documents.items;
    const active = waivers[activeTab] ?? waivers[0];

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Head title={`${content.browser_title} - BAUST`} />

            {/* Navigation */}
            <Navbar />

            {/* Page Header */}
            <PageHero title={hero.title} subtitle={hero.subtitle} />

            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl mb-6 shadow-sm">
                        <Gift size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">{intro.heading}</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        {intro.text}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Navigation/Info Cards */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-2 rounded-[32px] shadow-xl border border-slate-100">
                            {waivers.map((waiver, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTab(idx)}
                                    className={`w-full text-left p-6 rounded-2xl transition-all duration-300 flex items-center justify-between group ${
                                        activeTab === idx
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                                        : 'hover:bg-slate-50 text-slate-700'
                                    }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-2 rounded-xl ${activeTab === idx ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-emerald-50'}`}>
                                            <FileText size={20} className={activeTab === idx ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'} />
                                        </div>
                                        <div>
                                            <span className="font-bold block">{waiver.title}</span>
                                            <span className={`text-[10px] uppercase tracking-widest font-black ${activeTab === idx ? 'text-emerald-200' : 'text-slate-400'}`}>
                                                {documents.document_label} {idx + 1}
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className={activeTab === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all'} />
                                </button>
                            ))}
                        </div>

                        {/* Quick Facts Card */}
                        <div className="bg-[#0f5132] text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                            <div className="absolute -bottom-4 -right-4 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <CheckCircle2 size={120} />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-lg font-bold mb-6 flex items-center">
                                    <AlertCircle className="mr-2 text-emerald-400" size={20} />
                                    {benefits.heading}
                                </h4>
                                <ul className="space-y-4">
                                    {benefits.items.map((benefit, i) => (
                                        <li key={i} className="flex items-start space-x-3 text-sm text-emerald-50/80">
                                            <div className="mt-1 flex-shrink-0 text-emerald-400">
                                                <CheckCircle2 size={14} />
                                            </div>
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Download CTA */}
                        {active && (
                            <a
                                href={active.pdf}
                                download
                                className="flex items-center justify-center space-x-3 bg-white p-6 rounded-[30px] border border-slate-100 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all group"
                            >
                                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <Download size={24} />
                                </div>
                                <div className="text-left">
                                    <span className="block text-slate-400 text-[10px] font-black uppercase tracking-widest">{downloadCta.caption}</span>
                                    <span className="font-bold text-slate-800">{downloadCta.label}</span>
                                </div>
                            </a>
                        )}
                    </div>

                    {/* Right Column: PDF Preview */}
                    {active && (
                        <div className="lg:col-span-8">
                            <div className="bg-white p-4 rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden h-full">

                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-8 border-b border-slate-50 gap-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900">{active.title}</h3>
                                        <p className="text-sm text-slate-500 mt-1">{active.description}</p>
                                    </div>
                                    <a
                                        href={active.pdf}
                                        target="_blank"
                                        className="inline-flex items-center space-x-2 bg-slate-50 text-slate-600 px-5 py-3 rounded-2xl font-bold hover:bg-emerald-50 hover:text-emerald-700 transition-all text-sm whitespace-nowrap"
                                    >
                                        <span>{preview.full_view_label}</span>
                                        <ExternalLink size={16} />
                                    </a>
                                </div>

                                {/* PDF Container */}
                                <div className="bg-slate-50 p-1 md:p-4 rounded-[32px] mt-4 shadow-inner">
                                    <div className="bg-slate-100 px-6 py-2 flex items-center justify-between border-b border-slate-200 rounded-t-2xl">
                                        <div className="flex items-center space-x-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{preview.preview_label}</span>
                                    </div>
                                    <object
                                        key={activeTab}
                                        data={active.pdf}
                                        type="application/pdf"
                                        className="w-full h-[700px] rounded-b-2xl shadow-xl"
                                    >
                                        <div className="flex flex-col items-center justify-center h-[500px] p-12 text-center bg-white rounded-b-2xl">
                                            <AlertCircle className="text-slate-200 mb-6" size={80} />
                                            <h4 className="text-slate-800 font-bold mb-2">{preview.unavailable_heading}</h4>
                                            <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
                                                {preview.unavailable_text}
                                            </p>
                                            <a
                                                href={active.pdf}
                                                target="_blank"
                                                className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                                            >
                                                {preview.view_document_label}
                                            </a>
                                        </div>
                                    </object>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
