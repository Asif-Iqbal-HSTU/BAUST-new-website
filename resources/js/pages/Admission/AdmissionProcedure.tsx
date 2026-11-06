import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { ClipboardCheck, FileText, Users, Stethoscope, ShieldCheck, AlertTriangle, ArrowRightCircle, ExternalLink, CheckCircle2 } from "lucide-react";

export interface AdmissionProcedureContent {
    meta_title: string;
    hero: { title: string; subtitle: string };
    selection_rules: {
        heading: string;
        rules: { title: string; description: string }[];
    };
    required_documents: {
        heading: string;
        documents: string[];
        quota_heading: string;
        quota_documents: { quota_type: string; detail: string }[];
    };
    medical_checkup: {
        heading: string;
        description: string;
        tests_label: string;
        tests: string[];
        warning: string;
    };
    guardian_consent: { heading: string; description: string };
    apply_cta: { heading: string; subtitle: string; button_label: string; apply_url: string };
}

export default function AdmissionProcedure({ content }: { content: AdmissionProcedureContent }) {
    const { hero, selection_rules, required_documents, medical_checkup, guardian_consent, apply_cta } = content;

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Head title={content.meta_title} />

            {/* Navigation */}
            <Navbar />

            {/* Page Header */}
            <PageHero title={hero.title} subtitle={hero.subtitle} />

            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Rules & Procedures */}
                    <div className="lg:col-span-8 space-y-12">
                        
                        {/* 1. Selection Rules */}
                        <section>
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-600/20 text-white">
                                    <ClipboardCheck size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">{selection_rules.heading}</h3>
                            </div>

                            <div className="space-y-6">
                                {selection_rules.rules.map((item, idx) => (
                                    <div key={idx} className="bg-white p-6 md:p-8 rounded-[32px] shadow-lg shadow-slate-200/50 border border-slate-100 group hover:border-emerald-200 transition-all">
                                        <div className="flex items-start space-x-5">
                                            <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                <ArrowRightCircle size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                                                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 2. Document Submission */}
                        <section className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-slate-100">
                            <div className="flex items-center space-x-4 mb-10">
                                <div className="bg-[#0f5132] p-3 rounded-2xl text-white">
                                    <FileText size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">{required_documents.heading}</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {required_documents.documents.map((doc, idx) => (
                                    <div key={idx} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="bg-white p-1.5 rounded-full text-emerald-500 shadow-sm">
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">{doc}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                    <Users size={64} />
                                </div>
                                <h4 className="font-bold text-emerald-900 mb-6 flex items-center">
                                    <Users className="mr-3" size={20} />
                                    {required_documents.quota_heading}
                                </h4>
                                <ul className="space-y-4">
                                    {required_documents.quota_documents.map((quota, idx) => (
                                        <li key={idx} className="bg-white/60 p-4 rounded-xl border border-emerald-100/50">
                                            <span className="font-black text-[10px] uppercase tracking-widest text-emerald-600 block mb-1">{quota.quota_type}</span>
                                            <p className="text-sm text-slate-700 leading-snug">{quota.detail}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Medical & Consent */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* Medical Check-up */}
                        <section className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-6 opacity-5">
                                <Stethoscope size={80} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                                <Stethoscope className="mr-3 text-emerald-600" size={24} />
                                {medical_checkup.heading}
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-8">
                                {medical_checkup.description}
                            </p>
                            
                            <div className="space-y-3">
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{medical_checkup.tests_label}</p>
                                {medical_checkup.tests.map((test, idx) => (
                                    <div key={idx} className="flex items-center space-x-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                                        <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                                            {idx + 1}
                                        </div>
                                        <span className="text-sm font-bold text-emerald-800">{test}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start space-x-3">
                                <AlertTriangle className="text-orange-600 shrink-0" size={18} />
                                <p className="text-[11px] text-orange-800 font-medium leading-snug">
                                    {medical_checkup.warning}
                                </p>
                            </div>
                        </section>

                        {/* Guardian's Consent */}
                        <section className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                            <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={80} />
                            </div>
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <ShieldCheck className="mr-3 text-emerald-400" size={24} />
                                {guardian_consent.heading}
                            </h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                {guardian_consent.description}
                            </p>
                        </section>

                        {/* Apply CTA */}
                        <div className="bg-emerald-600 p-8 rounded-[40px] text-white shadow-xl shadow-emerald-600/20 flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ExternalLink size={32} />
                            </div>
                            <h4 className="text-lg font-bold mb-2">{apply_cta.heading}</h4>
                            <p className="text-emerald-50 text-xs mb-8 opacity-80">{apply_cta.subtitle}</p>
                            <a 
                                href={apply_cta.apply_url} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-white text-emerald-700 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all active:scale-95 flex items-center justify-center space-x-2 shadow-lg"
                            >
                                <span>{apply_cta.button_label}</span>
                                <ExternalLink size={18} />
                            </a>
                        </div>

                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
