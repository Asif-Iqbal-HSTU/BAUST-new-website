import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { Shirt, Info, Download, ExternalLink, AlertCircle, CheckCircle2 } from "lucide-react";

export default function DressCode() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Head title="Dress Code - BAUST" />

            {/* Navigation */}
            <Navbar />

            {/* Page Header */}
            <PageHero title="University Dress Code" subtitle="Standard Uniform & Grooming Policies" />

            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column: Summary & Info */}
                    <div className="xl:col-span-4 space-y-8">
                        
                        <section className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 text-emerald-600 group-hover:scale-110 transition-transform duration-700">
                                <Shirt size={140} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                    <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl mr-4">
                                        <Info size={24} />
                                    </span>
                                    Policy Overview
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                                    BAUST maintains a standard dress code to foster discipline, professionalism, and a sense of unity among students. All students are required to adhere to the prescribed uniform and grooming standards while on campus.
                                </p>
                                
                                <div className="space-y-4">
                                    {[
                                        "Mandatory for all academic sessions",
                                        "Required during official ceremonies",
                                        "Specific designs for Summer & Winter",
                                        "Applies to all departments"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center space-x-3 text-sm font-medium text-slate-700">
                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Quick Tips */}
                        <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                            <h4 className="text-lg font-bold mb-4 flex items-center">
                                <AlertCircle className="mr-2 text-emerald-400" size={20} />
                                Important Note
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Students found violating the dress code may be denied entry to classes or campus premises. Please refer to the full PDF guide for detailed specifications on fabric, color, and design.
                            </p>
                        </div>

                        {/* Download CTA */}
                        <a 
                            href="/images/admission/Dress-Code-02-1.pdf" 
                            download
                            className="w-full flex items-center justify-center space-x-3 bg-white p-6 rounded-[30px] border border-slate-100 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all group"
                        >
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <Download size={24} />
                            </div>
                            <div className="text-left">
                                <span className="block text-slate-400 text-[10px] font-black uppercase tracking-widest">Offline Access</span>
                                <span className="font-bold text-slate-800">Download Guide</span>
                            </div>
                        </a>
                    </div>

                    {/* Right Column: PDF Preview */}
                    <div className="xl:col-span-8">
                        <div className="bg-white p-6 md:p-10 rounded-[50px] shadow-2xl border border-slate-100 overflow-hidden">
                            
                            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">Official Specification Guide</h3>
                                    <p className="text-sm text-slate-500">Visual specifications for male and female uniforms.</p>
                                </div>
                                <a 
                                    href="/images/admission/Dress-Code-02-1.pdf" 
                                    target="_blank"
                                    className="inline-flex items-center space-x-2 bg-slate-50 text-slate-600 px-6 py-3 rounded-2xl font-bold hover:bg-emerald-50 hover:text-emerald-700 transition-all text-sm"
                                >
                                    <span>Full View</span>
                                    <ExternalLink size={18} />
                                </a>
                            </div>

                            {/* PDF Container */}
                            <div className="rounded-[40px] border-4 border-slate-50 overflow-hidden bg-slate-50 shadow-inner">
                                <div className="bg-slate-100 px-6 py-3 flex items-center justify-between border-b border-slate-200">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Policy Document Preview</span>
                                </div>
                                <object 
                                    data="/images/admission/Dress-Code-02-1.pdf" 
                                    type="application/pdf"
                                    className="w-full h-[800px]"
                                >
                                    <div className="flex flex-col items-center justify-center h-[500px] p-12 text-center bg-white">
                                        <AlertCircle className="text-slate-200 mb-6" size={80} />
                                        <h4 className="text-slate-800 font-bold mb-2">Preview Unavailable</h4>
                                        <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
                                            Your browser doesn't support embedded PDF previews. Please use the download button to view the dress code policy.
                                        </p>
                                    </div>
                                </object>
                            </div>
                        </div>
                    </div>

                </div>

            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
