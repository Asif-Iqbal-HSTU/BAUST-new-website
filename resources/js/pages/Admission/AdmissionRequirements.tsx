import React from 'react';
import SeoHead from '@/components/seo-head';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { FileText, CheckCircle2, ClipboardList, GraduationCap, Stethoscope, User, AlertCircle, ExternalLink, Download } from "lucide-react";

interface HighlightedText {
    text_before_highlight: string;
    highlight: string;
    text_after_highlight: string;
}

interface ProgramEligibility {
    heading: string;
    programs_label: string;
    criteria: (HighlightedText & { title: string })[];
    direct_admission: HighlightedText & { label: string };
}

export interface AdmissionRequirementsContent {
    meta_title: string;
    hero: { title: string; subtitle: string };
    engineering_programs: ProgramEligibility;
    non_engineering_programs: ProgramEligibility;
    required_documents: {
        heading: string;
        documents: string[];
        apply_button_label: string;
        apply_url: string;
    };
    medical_tests: { heading: string; test_label_prefix: string; tests: string[] };
    identity_documents: { heading: string; documents: string[] };
    admission_detail: {
        heading: string;
        description: string;
        detail_pdf: string;
        open_button_tooltip: string;
        download_button_label: string;
        preview_label: string;
        preview_fallback_text: string;
    };
}

/** "before <highlight>after" — a space is only inserted after the highlight when the tail starts a new word. */
function Highlighted({ item, className }: { item: HighlightedText; className: string }) {
    const after = item.text_after_highlight;
    const gap = /^[A-Za-z0-9(]/.test(after) ? ' ' : '';

    return (
        <>
            {item.text_before_highlight}{' '}
            <span className={className}>{item.highlight}</span>
            {gap}{after}
        </>
    );
}

export default function AdmissionRequirements({ content }: { content: AdmissionRequirementsContent }) {
    const { hero, engineering_programs: eng, non_engineering_programs: nonEng, required_documents, medical_tests, identity_documents, admission_detail } = content;
    const requiredDocuments = required_documents.documents;

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <SeoHead title={content.meta_title} />

            {/* Navigation */}
            <Navbar />

            {/* Page Header */}
            <PageHero title={hero.title} subtitle={hero.subtitle} />

            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column: Eligibility & Info */}
                    <div className="xl:col-span-7 space-y-12">
                        
                        {/* 1. Engineering Programs Eligibility */}
                        <section className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 text-emerald-600 group-hover:scale-110 transition-transform duration-700">
                                <GraduationCap size={160} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center space-x-4 mb-8">
                                    <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-lg shadow-emerald-600/20">
                                        <FileText size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">{eng.heading}</h3>
                                </div>
                                <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-4">{eng.programs_label}</p>
                                
                                <div className="space-y-6">
                                    {eng.criteria.map((item, idx) => idx === 0 ? (
                                        <div key={idx} className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                                            <h4 className="font-bold text-emerald-900 mb-3 flex items-center">
                                                <CheckCircle2 size={18} className="mr-2" />
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                <Highlighted item={item} className="font-bold text-emerald-700 underline decoration-2 underline-offset-4" />
                                            </p>
                                        </div>
                                    ) : (
                                        <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                            <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                                                <CheckCircle2 size={18} className="mr-2 text-slate-400" />
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                <Highlighted item={item} className="font-bold text-slate-900" />
                                            </p>
                                        </div>
                                    ))}

                                    <div className="bg-[#0f5132] p-6 rounded-2xl shadow-xl border border-emerald-400/20">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                <AlertCircle size={16} className="text-emerald-300" />
                                            </div>
                                            <h4 className="font-bold text-white uppercase tracking-wider text-xs">{eng.direct_admission.label}</h4>
                                        </div>
                                        <p className="text-emerald-50 text-sm font-medium">
                                            <Highlighted item={eng.direct_admission} className="text-emerald-300 font-black text-lg" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 2. Non-Engineering Programs Eligibility */}
                        <section className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 text-slate-600 group-hover:scale-110 transition-transform duration-700">
                                <ClipboardList size={160} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center space-x-4 mb-8">
                                    <div className="bg-slate-800 p-3 rounded-2xl text-white shadow-lg shadow-slate-900/20">
                                        <FileText size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">{nonEng.heading}</h3>
                                </div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">{nonEng.programs_label}</p>
                                
                                <div className="space-y-6">
                                    {nonEng.criteria.map((item, idx) => (
                                        <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                            <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                                                <CheckCircle2 size={18} className="mr-2 text-slate-400" />
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                <Highlighted item={item} className={idx === 0 ? 'font-bold text-slate-900 underline decoration-2 underline-offset-4' : 'font-bold text-slate-900'} />
                                            </p>
                                        </div>
                                    ))}

                                    <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-white/10">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                <AlertCircle size={16} className="text-slate-400" />
                                            </div>
                                            <h4 className="font-bold text-slate-400 uppercase tracking-wider text-xs">{nonEng.direct_admission.label}</h4>
                                        </div>
                                        <p className="text-slate-300 text-sm font-medium">
                                            <Highlighted item={nonEng.direct_admission} className="text-white font-black text-lg" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Required Documents */}
                    <div className="xl:col-span-5 space-y-8">
                        
                        <section className="bg-[#0f5132] text-white p-8 md:p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-8 flex items-center">
                                    <span className="p-2 bg-white/10 rounded-lg mr-4">
                                        <ClipboardList size={24} />
                                    </span>
                                    {required_documents.heading}
                                </h3>
                                <ul className="space-y-4">
                                    {requiredDocuments.map((doc, idx) => (
                                        <li key={idx} className="flex items-start group">
                                            <div className="mt-1 mr-3 flex-shrink-0">
                                                <div className="bg-emerald-400/20 text-emerald-400 p-0.5 rounded-full group-hover:bg-emerald-400 group-hover:text-[#0f5132] transition-colors">
                                                    <CheckCircle2 size={16} />
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-emerald-50/90 leading-tight">{doc}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                                    <a 
                                        href={required_documents.apply_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-2 bg-white text-[#0f5132] px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-lg active:scale-95"
                                    >
                                        <span>{required_documents.apply_button_label}</span>
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Medical Reports Helper */}
                        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-6 flex items-center">
                                <Stethoscope className="mr-3 text-emerald-600" size={24} />
                                {medical_tests.heading}
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                {medical_tests.tests.map((test, idx) => (
                                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100 hover:border-emerald-200 transition-colors">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{medical_tests.test_label_prefix} {idx+1}</p>
                                        <p className="text-slate-800 font-bold text-sm">{test}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Identification Helper */}
                        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-6 flex items-center">
                                <User className="mr-3 text-emerald-600" size={24} />
                                {identity_documents.heading}
                            </h4>
                            <div className="space-y-4">
                                {identity_documents.documents.map((doc, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100/50">
                                        <span className="text-sm font-medium text-slate-700">{doc}</span>
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* PDF Details Section */}
                <section className="mt-20">
                    <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-slate-100">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 text-center md:text-left">
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">{admission_detail.heading}</h3>
                                <p className="text-slate-500">{admission_detail.description}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <a 
                                    href={admission_detail.detail_pdf} 
                                    target="_blank"
                                    className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors"
                                    title={admission_detail.open_button_tooltip}
                                >
                                    <ExternalLink size={24} />
                                </a>
                                <a 
                                    href={admission_detail.detail_pdf} 
                                    download
                                    className="flex items-center space-x-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                                >
                                    <Download size={20} />
                                    <span>{admission_detail.download_button_label}</span>
                                </a>
                            </div>
                        </div>

                        {/* PDF Preview Container */}
                        <div className="rounded-[40px] border-4 border-slate-100 overflow-hidden bg-slate-50 shadow-inner">
                            <div className="bg-slate-100 px-6 py-3 flex items-center justify-between border-b border-slate-200">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{admission_detail.preview_label}</span>
                            </div>
                            <object 
                                data={admission_detail.detail_pdf} 
                                type="application/pdf"
                                className="w-full h-[800px]"
                            >
                                <div className="flex flex-col items-center justify-center h-[400px] p-12 text-center">
                                    <AlertCircle className="text-slate-300 mb-4" size={64} />
                                    <p className="text-slate-500 font-medium max-w-sm mx-auto">{admission_detail.preview_fallback_text}</p>
                                </div>
                            </object>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
