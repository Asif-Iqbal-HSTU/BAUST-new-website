import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { FileText, CheckCircle2, ClipboardList, GraduationCap, Stethoscope, User, AlertCircle, ExternalLink, Download } from "lucide-react";

export default function AdmissionRequirements() {
    const requiredDocuments = [
        "Admit card for the admission test",
        "Original copies of SSC Academic Transcript, Certificate, and Testimonial",
        "Original copies of HSC Academic Transcript, Certificate and Testimonial",
        "Photocopies of SSC & HSC Academic Transcripts",
        "8 copies of passport-size photograph",
        "Medical reports (Blood group, Blood for CBC, HBs. Ag, Urine R/E) from any reputed hospital/clinic/diagnostic center",
        "A copy of the parents’ PP-size photo",
        "A copy of the parent’s NID",
        "A copy of the Student’s Birth Certificate and NID",
        "Provisional certificate/testimonial from the head of the institution (if original HSC certificate is not available)"
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Head title="Admission Requirements - BAUST" />

            {/* Navigation */}
            <Navbar />

            {/* Page Header */}
            <PageHero title="Admission Requirements" subtitle="Eligibility & Required Documentation" />

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
                                    <h3 className="text-2xl font-bold text-slate-900">Engineering Programs</h3>
                                </div>
                                <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-4">CSE, EEE, ME, IPE, CE and ICT</p>
                                
                                <div className="space-y-6">
                                    <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                                        <h4 className="font-bold text-emerald-900 mb-3 flex items-center">
                                            <CheckCircle2 size={18} className="mr-2" />
                                            HSC / Alim or Equivalent
                                        </h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            Science Group with Mathematics, Physics, and Chemistry. Minimum GPA 3.0 (with additional subject). 
                                            Total GPA of SSC and HSC should be at least <span className="font-bold text-emerald-700 underline decoration-2 underline-offset-4">7.0</span>.
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                                            <CheckCircle2 size={18} className="mr-2 text-slate-400" />
                                            GCE O/A Level
                                        </h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            A-Level with Physics, Mathematics, Chemistry, and Functional English. Minimum GPA 3.0. 
                                            Total GPA of O-Level and A-Level should be at least <span className="font-bold text-slate-900">7.0</span>. 
                                            No 'F' grades allowed in any subject.
                                        </p>
                                    </div>

                                    <div className="bg-[#0f5132] p-6 rounded-2xl shadow-xl border border-emerald-400/20">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                <AlertCircle size={16} className="text-emerald-300" />
                                            </div>
                                            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Direct Admission</h4>
                                        </div>
                                        <p className="text-emerald-50 text-sm font-medium">
                                            Applicants with a total GPA of <span className="text-emerald-300 font-black text-lg">9.0</span> or more in HSC and SSC are eligible for direct admission without a test.
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
                                    <h3 className="text-2xl font-bold text-slate-900">Non-Engineering Programs</h3>
                                </div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">BBA, BBA in AIS, English, MBA, and MA in English</p>
                                
                                <div className="space-y-6">
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                                            <CheckCircle2 size={18} className="mr-2 text-slate-400" />
                                            HSC / Alim or Equivalent
                                        </h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            Minimum GPA 3.0 (with additional subject). 
                                            Total GPA of HSC and SSC should be at least <span className="font-bold text-slate-900 underline decoration-2 underline-offset-4">6.0</span>.
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                                            <CheckCircle2 size={18} className="mr-2 text-slate-400" />
                                            GCE O/A Level
                                        </h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            Minimum GPA 3.0 in both levels. 
                                            Total GPA of O-Level and A-Level should be at least <span className="font-bold text-slate-900">6.0</span>. 
                                            No 'F' grades allowed in any subject.
                                        </p>
                                    </div>

                                    <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-white/10">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                <AlertCircle size={16} className="text-slate-400" />
                                            </div>
                                            <h4 className="font-bold text-slate-400 uppercase tracking-wider text-xs">Direct Admission</h4>
                                        </div>
                                        <p className="text-slate-300 text-sm font-medium">
                                            Applicants with a total GPA of <span className="text-white font-black text-lg">8.0</span> or more in HSC and SSC are eligible for direct admission without a test.
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
                                    Required Documents
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
                                        href="http://admission.baust.edu.bd" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-2 bg-white text-[#0f5132] px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-lg active:scale-95"
                                    >
                                        <span>Apply Online Now</span>
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Medical Reports Helper */}
                        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-6 flex items-center">
                                <Stethoscope className="mr-3 text-emerald-600" size={24} />
                                Medical Tests Required
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                {["Blood Group", "Blood for CBC", "HBs. Ag", "Urine R/E"].map((test, idx) => (
                                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100 hover:border-emerald-200 transition-colors">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Test {idx+1}</p>
                                        <p className="text-slate-800 font-bold text-sm">{test}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Identification Helper */}
                        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-6 flex items-center">
                                <User className="mr-3 text-emerald-600" size={24} />
                                Identity Documents
                            </h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100/50">
                                    <span className="text-sm font-medium text-slate-700">Student's NID/Birth Cert.</span>
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100/50">
                                    <span className="text-sm font-medium text-slate-700">Parents' NID Copies</span>
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100/50">
                                    <span className="text-sm font-medium text-slate-700">Parent's PP Size Photo</span>
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* PDF Details Section */}
                <section className="mt-20">
                    <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-slate-100">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 text-center md:text-left">
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">Admission Detail - 24th Batch</h3>
                                <p className="text-slate-500">Official documentation for the current admission session.</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <a 
                                    href="/images/admission/Admission-Detail-24th-Batch.pdf" 
                                    target="_blank"
                                    className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors"
                                    title="Open in new tab"
                                >
                                    <ExternalLink size={24} />
                                </a>
                                <a 
                                    href="/images/admission/Admission-Detail-24th-Batch.pdf" 
                                    download
                                    className="flex items-center space-x-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                                >
                                    <Download size={20} />
                                    <span>Download PDF</span>
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
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Official Document Preview</span>
                            </div>
                            <object 
                                data="/images/admission/Admission-Detail-24th-Batch.pdf" 
                                type="application/pdf"
                                className="w-full h-[800px]"
                            >
                                <div className="flex flex-col items-center justify-center h-[400px] p-12 text-center">
                                    <AlertCircle className="text-slate-300 mb-4" size={64} />
                                    <p className="text-slate-500 font-medium max-w-sm mx-auto">Your browser cannot display this PDF preview directly. Please use the download button above.</p>
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
