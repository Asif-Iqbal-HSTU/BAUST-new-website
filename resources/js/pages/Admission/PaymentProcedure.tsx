import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { Smartphone, ShieldCheck, Download, ExternalLink, AlertCircle, CheckCircle2, CreditCard } from "lucide-react";

export default function PaymentProcedure() {
    const bkashSteps = [
        "Open your bKash App and tap on 'Education Fee'",
        "Search for 'BAUST' and select it",
        "Enter your Student ID and desired payment details",
        "Check the amount and proceed with your bKash PIN",
        "Save the transaction ID and receipt for future reference"
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Head title="Payment Procedure - BAUST" />

            {/* Navigation */}
            <Navbar />

            {/* Page Header */}
            <PageHero title="Tuition Fee Payment Procedure" subtitle="Step-by-Step Payment Instructions" />

            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column: Instructions */}
                    <div className="lg:col-span-5 space-y-8">
                        
                        {/* bKash Payment Box */}
                        <section className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D12053]/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                            
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="bg-[#D12053] p-3 rounded-2xl text-white shadow-lg shadow-[#D12053]/20">
                                    <Smartphone size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">bKash Payment</h3>
                                    <p className="text-[#D12053] text-[10px] font-black uppercase tracking-[0.2em]">Mobile App Instruction</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {bkashSteps.map((step, idx) => (
                                    <div key={idx} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#D12053]/30 transition-colors">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D12053]/10 text-[#D12053] flex items-center justify-center font-black text-sm">
                                            {idx + 1}
                                        </div>
                                        <p className="text-sm font-medium text-slate-700 leading-snug">{step}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-start space-x-4">
                                <ShieldCheck className="text-emerald-600 mt-1" size={24} />
                                <div>
                                    <h4 className="font-bold text-emerald-900 text-sm">Secure Payment</h4>
                                    <p className="text-xs text-emerald-700/80 leading-relaxed">
                                        Always ensure you are paying to the official BAUST account. Double-check your Student ID before confirming.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Other Payment Info */}
                        <section className="bg-slate-900 text-white p-8 md:p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-6 flex items-center">
                                    <CreditCard className="mr-3 text-emerald-400" size={24} />
                                    Bank Payments
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                                    Tuition fees can also be paid at any branch of **Trust Bank Limited**. Use the official deposit slip and ensure your details are correctly mentioned.
                                </p>
                                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                                    <CheckCircle2 size={14} />
                                    <span>Authorized Channel</span>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: PDF Preview */}
                    <div className="lg:col-span-7">
                        <div className="bg-white p-6 md:p-10 rounded-[50px] shadow-2xl border border-slate-100 h-full">
                            
                            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">Official Procedure PDF</h3>
                                    <p className="text-sm text-slate-500">Detailed visual guide for all payment methods.</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <a 
                                        href="/images/admission/Tuition Fee Payment Procedure.pdf" 
                                        download
                                        className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                        title="Download PDF"
                                    >
                                        <Download size={24} />
                                    </a>
                                    <a 
                                        href="/images/admission/Tuition Fee Payment Procedure.pdf" 
                                        target="_blank"
                                        className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all shadow-sm"
                                        title="Full view"
                                    >
                                        <ExternalLink size={24} />
                                    </a>
                                </div>
                            </div>

                            {/* PDF Container */}
                            <div className="rounded-[40px] border-4 border-slate-50 overflow-hidden bg-slate-50 shadow-inner">
                                <div className="bg-slate-100 px-6 py-3 flex items-center justify-between border-b border-slate-200">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Document Preview</span>
                                </div>
                                <object 
                                    data="/images/admission/Tuition Fee Payment Procedure.pdf" 
                                    type="application/pdf"
                                    className="w-full h-[700px]"
                                >
                                    <div className="flex flex-col items-center justify-center h-[500px] p-12 text-center">
                                        <AlertCircle className="text-slate-300 mb-4" size={64} />
                                        <p className="text-slate-500 font-medium max-w-sm mx-auto">Your browser cannot display this PDF preview. Please use the download button above.</p>
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
