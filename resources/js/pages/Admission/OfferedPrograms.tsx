import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { GraduationCap, BookOpen, Clock, Users, ExternalLink, Info, CheckCircle2 } from "lucide-react";

export default function OfferedPrograms() {
    const undergradPrograms = [
        { sl: 1, name: "B.Sc. Engineering in Computer Science and Engineering (CSE)", credits: 161 },
        { sl: 2, name: "B.Sc. Engineering in Electrical and Electronic Engineering (EEE)", credits: 161 },
        { sl: 3, name: "B.Sc. Engineering in Mechanical Engineering (ME)", credits: 160 },
        { sl: 4, name: "B.Sc. Engineering in Industrial and Production Engineering (IPE)", credits: 160 },
        { sl: 5, name: "B.Sc. Engineering in Civil Engineering (CE)", credits: 160 },
        { sl: 6, name: "B.Sc. Engineering in Information and Communication Technology (ICT)", credits: 160 },
        { sl: 7, name: "Bachelor of Business Administration (BBA)", credits: 140 },
        { sl: 8, name: "BBA in Accounting & Information Systems (AIS)", credits: 132 },
        { sl: 9, name: "B.A. (Hons) in English", credits: 140 },
    ];

    const graduatePrograms = [
        { sl: 1, name: "Executive MBA (EMBA)", credits: "48 Credit", duration: "1.5 Years (3 Semesters)" },
        { sl: 2, name: "MBA Regular (For BBA Graduate)", credits: "36 Credit", duration: "1 Year (2 Semesters)" },
        { sl: 3, name: "MBA (For Other Graduate)", credits: "60 Credit", duration: "2 Years (4 Semesters)" },
        { sl: 4, name: "MA in English (ELT)", credits: "36 Credit", duration: "1 Year (2 Semesters)" },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Head title="Offered Programs - BAUST" />

            {/* Navigation */}
            <Navbar />

            {/* Page Header */}
            <PageHero title="Offered Programs" subtitle="Academic Degrees & Courses" />

            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Explore Our Academic Degrees</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Bangladesh Army University of Science and Technology (BAUST) is offering a wide range of undergraduate and graduate programs designed to prepare students for the challenges of the modern world.
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
                                <h3 className="text-2xl font-bold text-slate-900">Undergraduate Programs</h3>
                                <p className="text-slate-500 text-sm">4-Year Degree Programs (8 Semesters)</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100">
                                            <th className="px-8 py-5 text-sm font-black uppercase tracking-wider text-slate-500">Sl. No.</th>
                                            <th className="px-8 py-5 text-sm font-black uppercase tracking-wider text-slate-500">Program Name</th>
                                            <th className="px-8 py-5 text-sm font-black uppercase tracking-wider text-slate-500 text-right">Total Credits</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {undergradPrograms.map((program) => (
                                            <tr key={program.sl} className="hover:bg-emerald-50/30 transition-colors group">
                                                <td className="px-8 py-5 text-slate-500 font-medium">{program.sl.toString().padStart(2, '0')}</td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        <span className="text-slate-900 font-semibold">{program.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-bold">
                                                        {program.credits} Credits
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
                                <h3 className="text-2xl font-bold text-slate-900">Graduate Programs</h3>
                                <p className="text-slate-500 text-sm">Postgraduate & Professional Degrees</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {graduatePrograms.map((program) => (
                                <div key={program.sl} className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/40 border border-slate-100 hover:border-emerald-200 hover:shadow-emerald-100/50 transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-slate-50 text-slate-400 font-black p-2 rounded-xl text-xs group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                            #{program.sl}
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
                                        <span>Required: <b className="text-slate-700">{program.credits}</b></span>
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
                                    Admission Overview
                                </h3>
                                <div className="space-y-6 text-emerald-50/80 leading-relaxed">
                                    <p className="text-lg font-medium text-white">
                                        The admission process at BAUST is highly competitive and merit-based.
                                    </p>
                                    <p>
                                        Each department currently accepts only <strong className="text-emerald-300">100 students*</strong> in each semester to maintain the highest quality of education and personalized attention.
                                    </p>
                                    <div className="pt-6 border-t border-white/10">
                                        <p className="text-xs italic opacity-70">
                                            *3 percent of the total seats are reserved for children of Freedom Fighters, and another 3 percent for meritorious candidates from remote and underdeveloped areas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Application CTA */}
                        <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border border-slate-100 flex flex-col justify-between items-center text-center">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-6">
                                <ExternalLink size={40} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Apply?</h3>
                                <p className="text-slate-500 text-sm mb-8">Start your journey with BAUST today by filling out our online form.</p>
                            </div>
                            <a 
                                href="http://admission.baust.edu.bd" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/20 active:scale-95 flex items-center justify-center space-x-2"
                            >
                                <span>Apply Online</span>
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
