import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import {
    CreditCard,
    Calculator,
    GraduationCap,
    Clock,
    AlertCircle,
    Info,
    CheckCircle2,
    Briefcase,
    Languages,
    FileText,
    Receipt,
    ShieldAlert,
    ExternalLink,
    Download,
    Percent,
    ArrowRight,
    Building2,
    Calendar,
    Stethoscope,
    Sparkles,
    Check
} from "lucide-react";

export default function TuitionFees() {
    const [detailFilter, setDetailFilter] = useState<'all' | 'engr' | 'bba' | 'english'>('all');

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
            <Head title="Semester Fees & Payments - BAUST" />

            {/* Navigation */}
            <Navbar />

            {/* Page Header */}
            <PageHero 
                title="Semester Fees & Payments" 
                subtitle="Official Tuition Fees, Payment Schedules & Academic Policies" 
            />

            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                
                {/* Intro Hero Section */}
                <div className="max-w-4xl mx-auto mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-4">
                        <CreditCard size={15} className="text-emerald-600" />
                        <span>Approved by BAUST Syndicate & Finance Committee</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Tuition & Semester Fee Structure
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        Transparent breakdown of all academic costs, semester fees, detailed course expenses,
                        deadlines, and policies for undergraduate and graduate programs.
                    </p>

                    {/* Quick Section Jump Bar */}
                    <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-medium">
                        {[
                            { label: 'Engineering Programs', href: '#engineering' },
                            { label: 'Non-Engineering (BBA & English)', href: '#non-engineering' },
                            { label: 'Graduate Programs', href: '#graduate' },
                            { label: 'Itemized Fee Breakdown', href: '#detailed-fees' },
                            { label: 'Payment Deadlines & Fines', href: '#deadlines' },
                            { label: 'Repeater Fees', href: '#repeater' },
                            { label: 'Additional Fees', href: '#additional' },
                            { label: 'Scholarships & Waivers', href: '#scholarships' },
                        ].map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                className="px-3 py-1.5 bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-slate-700 shadow-xs transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="space-y-16 lg:space-y-20">

                    {/* ======================================================== */}
                    {/* 1. ENGINEERING PROGRAMS                                  */}
                    {/* ======================================================== */}
                    <section id="engineering" className="scroll-mt-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="bg-emerald-600 p-2.5 rounded-xl shadow-md shadow-emerald-600/20 text-white">
                                <Calculator size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">Engineering Programs</h3>
                                <p className="text-slate-500 text-sm">B.Sc. Engg. in CSE / EEE / ME / IPE / CE / ICT (4 Years • 8 Semesters)</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg border border-slate-200/80 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-900 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                            <th className="px-6 py-4">Ser No</th>
                                            <th className="px-6 py-4">Name of the Programs</th>
                                            <th className="px-6 py-4 text-center">Once at Admission<br/><span className="text-[11px] font-normal text-emerald-300 normal-case">(Including 1st Semester)</span></th>
                                            <th className="px-6 py-4 text-center">Per Semester<br/><span className="text-[11px] font-normal text-emerald-300 normal-case">(Remaining 7 Semesters)</span></th>
                                            <th className="px-6 py-4 text-right">Total Expenditure<br/><span className="text-[11px] font-normal text-emerald-300 normal-case">(Incl. Caution Money)</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        <tr className="hover:bg-emerald-50/50 transition-colors">
                                            <td className="px-6 py-5 font-bold text-slate-700">1</td>
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-900 text-base">B.Sc. Engg. in CSE / EEE / ME / IPE / CE / ICT</div>
                                                <div className="text-xs text-slate-500 mt-0.5">Faculty of ECE & Faculty of ME & CE</div>
                                            </td>
                                            <td className="px-6 py-5 text-center font-bold text-emerald-700 text-base">
                                                TK 65,000/-
                                            </td>
                                            <td className="px-6 py-5 text-center font-bold text-slate-700 text-base">
                                                TK 90,000/-
                                            </td>
                                            <td className="px-6 py-5 text-right font-black text-slate-900 text-xl">
                                                TK 6,95,000/-
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                                <span className="flex items-center gap-1.5">
                                    <Info size={14} className="text-emerald-600" />
                                    Total course fee includes <strong>Tk. 5,000/-</strong> as caution money (refundable after graduation).
                                </span>
                                <span className="text-slate-400">Total Credits: 160+ • 8 Semesters</span>
                            </div>
                        </div>
                    </section>


                    {/* ======================================================== */}
                    {/* 2. NON-ENGINEERING PROGRAMS                              */}
                    {/* ======================================================== */}
                    <section id="non-engineering" className="scroll-mt-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="bg-teal-600 p-2.5 rounded-xl shadow-md shadow-teal-600/20 text-white">
                                <Briefcase size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">Non-Engineering Programs</h3>
                                <p className="text-slate-500 text-sm">Faculty of Business Studies & Faculty of Science and Humanities</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg border border-slate-200/80 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-900 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                            <th className="px-6 py-4">Ser No</th>
                                            <th className="px-6 py-4">Name of the Programs</th>
                                            <th className="px-6 py-4 text-center">Once at Admission<br/><span className="text-[11px] font-normal text-teal-300 normal-case">(Including 1st Semester)</span></th>
                                            <th className="px-6 py-4 text-center">Per Semester<br/><span className="text-[11px] font-normal text-teal-300 normal-case">(Remaining 7 Semesters)</span></th>
                                            <th className="px-6 py-4 text-right">Total Expenditure<br/><span className="text-[11px] font-normal text-teal-300 normal-case">(Incl. Caution Money)</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        <tr className="hover:bg-teal-50/40 transition-colors">
                                            <td className="px-6 py-5 font-bold text-slate-700">1</td>
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-900 text-base">BBA (Bachelor of Business Administration)</div>
                                                <div className="text-xs text-slate-500">4 Years • 8 Semesters • 126 Credits</div>
                                            </td>
                                            <td className="px-6 py-5 text-center font-bold text-teal-700 text-base">
                                                TK 60,000/-
                                            </td>
                                            <td className="px-6 py-5 text-center font-bold text-slate-700 text-base">
                                                TK 66,429/-
                                            </td>
                                            <td className="px-6 py-5 text-right font-black text-slate-900 text-xl">
                                                TK 5,25,000/-
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-teal-50/40 transition-colors">
                                            <td className="px-6 py-5 font-bold text-slate-700">2</td>
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-900 text-base">BBA in Accounting & Information Systems (AIS)</div>
                                                <div className="text-xs text-slate-500">4 Years • 8 Semesters • 126 Credits</div>
                                            </td>
                                            <td className="px-6 py-5 text-center font-bold text-teal-700 text-base">
                                                TK 60,000/-
                                            </td>
                                            <td className="px-6 py-5 text-center font-bold text-slate-700 text-base">
                                                TK 66,429/-
                                            </td>
                                            <td className="px-6 py-5 text-right font-black text-slate-900 text-xl">
                                                TK 5,25,000/-
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-teal-50/40 transition-colors">
                                            <td className="px-6 py-5 font-bold text-slate-700">3</td>
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-900 text-base">B.A. (Hons) in English</div>
                                                <div className="text-xs text-slate-500">4 Years • 8 Semesters • 120 Credits</div>
                                            </td>
                                            <td className="px-6 py-5 text-center font-bold text-teal-700 text-base">
                                                TK 50,625/-
                                            </td>
                                            <td className="px-6 py-5 text-center font-bold text-slate-700 text-base">
                                                TK 57,054/-
                                            </td>
                                            <td className="px-6 py-5 text-right font-black text-slate-900 text-xl">
                                                TK 4,50,000/-
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                                <span className="flex items-center gap-1.5">
                                    <Info size={14} className="text-teal-600" />
                                    Total course fee includes <strong>Tk. 5,000/-</strong> as caution money (refundable after graduation).
                                </span>
                                <span className="text-slate-400">Regular 4-Year Bachelor Programs</span>
                            </div>
                        </div>
                    </section>


                    {/* ======================================================== */}
                    {/* 3. GRADUATE PROGRAMS (EMBA, MBA, MA)                     */}
                    {/* ======================================================== */}
                    <section id="graduate" className="scroll-mt-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="bg-[#0f5132] p-2.5 rounded-xl shadow-md shadow-emerald-900/20 text-white">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">Expenditure for Graduate Programs</h3>
                                <p className="text-slate-500 text-sm">Postgraduate Studies: EMBA, MBA Regular & MA in English (ELT)</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg border border-slate-200/80 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-900 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                            <th className="px-6 py-4" rowSpan={2}>Dept. / Program</th>
                                            <th className="px-6 py-4 text-center" rowSpan={2}>Duration</th>
                                            <th className="px-6 py-2 text-center border-b border-slate-800" colSpan={4}>Fee Structure in Taka</th>
                                            <th className="px-6 py-4 text-right" rowSpan={2}>Total Expenditure</th>
                                        </tr>
                                        <tr className="bg-slate-800 text-slate-200 text-xs font-medium uppercase tracking-wider">
                                            <th className="px-4 py-2.5 text-center">1st Sem (Admission)</th>
                                            <th className="px-4 py-2.5 text-center">2nd Sem</th>
                                            <th className="px-4 py-2.5 text-center">3rd Sem</th>
                                            <th className="px-4 py-2.5 text-center">4th Sem</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        <tr className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-900 text-base">Executive MBA (EMBA)</div>
                                                <span className="inline-block text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md mt-1">48 Credits</span>
                                            </td>
                                            <td className="px-6 py-5 text-center text-slate-600 font-medium whitespace-nowrap">
                                                1.5 Years<br /><span className="text-xs text-slate-400">(3 Semesters)</span>
                                            </td>
                                            <td className="px-4 py-5 text-center font-bold text-emerald-700">TK 46,000/-</td>
                                            <td className="px-4 py-5 text-center font-medium text-slate-700">TK 34,000/-</td>
                                            <td className="px-4 py-5 text-center font-medium text-slate-700">TK 40,000/-</td>
                                            <td className="px-4 py-5 text-center text-slate-300 font-bold">—</td>
                                            <td className="px-6 py-5 text-right font-black text-slate-900 text-lg">TK 1,20,000/-</td>
                                        </tr>

                                        <tr className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-900 text-base">MBA Regular (For BBA Graduates)</div>
                                                <span className="inline-block text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md mt-1">36 Credits</span>
                                            </td>
                                            <td className="px-6 py-5 text-center text-slate-600 font-medium whitespace-nowrap">
                                                1 Year<br /><span className="text-xs text-slate-400">(2 Semesters)</span>
                                            </td>
                                            <td className="px-4 py-5 text-center font-bold text-emerald-700">TK 46,000/-</td>
                                            <td className="px-4 py-5 text-center font-medium text-slate-700">TK 46,000/-</td>
                                            <td className="px-4 py-5 text-center text-slate-300 font-bold">—</td>
                                            <td className="px-4 py-5 text-center text-slate-300 font-bold">—</td>
                                            <td className="px-6 py-5 text-right font-black text-slate-900 text-lg">TK 92,000/-</td>
                                        </tr>

                                        <tr className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-900 text-base">MBA Regular (For Non-BBA Graduates)</div>
                                                <span className="inline-block text-xs font-semibold px-2 py-0.5 bg-purple-100 text-purple-800 rounded-md mt-1">60 Credits</span>
                                            </td>
                                            <td className="px-6 py-5 text-center text-slate-600 font-medium whitespace-nowrap">
                                                2 Years<br /><span className="text-xs text-slate-400">(4 Semesters)</span>
                                            </td>
                                            <td className="px-4 py-5 text-center font-bold text-emerald-700">TK 46,000/-</td>
                                            <td className="px-4 py-5 text-center font-medium text-slate-700">TK 34,000/-</td>
                                            <td className="px-4 py-5 text-center font-medium text-slate-700">TK 34,000/-</td>
                                            <td className="px-4 py-5 text-center font-medium text-slate-700">TK 34,000/-</td>
                                            <td className="px-6 py-5 text-right font-black text-slate-900 text-lg">TK 1,48,000/-</td>
                                        </tr>

                                        <tr className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-900 text-base">MA in English (ELT)</div>
                                                <span className="inline-block text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md mt-1">36 Credits</span>
                                            </td>
                                            <td className="px-6 py-5 text-center text-slate-600 font-medium whitespace-nowrap">
                                                1 Year<br /><span className="text-xs text-slate-400">(2 Semesters)</span>
                                            </td>
                                            <td className="px-4 py-5 text-center font-bold text-emerald-700">TK 46,000/-</td>
                                            <td className="px-4 py-5 text-center font-medium text-slate-700">TK 46,000/-</td>
                                            <td className="px-4 py-5 text-center text-slate-300 font-bold">—</td>
                                            <td className="px-4 py-5 text-center text-slate-300 font-bold">—</td>
                                            <td className="px-6 py-5 text-right font-black text-slate-900 text-lg">TK 92,000/-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>


                    {/* ======================================================== */}
                    {/* 4. DETAIL COURSE FEES FOR VARIOUS PROGRAMS (Breakdown)   */}
                    {/* ======================================================== */}
                    <section id="detailed-fees" className="scroll-mt-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-600 p-2.5 rounded-xl shadow-md shadow-blue-600/20 text-white">
                                    <Receipt size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">Detail Course Fees for Various Programs</h3>
                                    <p className="text-slate-500 text-sm">Itemized Fee Structure: During Admission vs. Per Semester</p>
                                </div>
                            </div>

                            {/* View Filter Pill */}
                            <div className="inline-flex p-1 bg-slate-200/80 rounded-xl text-xs font-semibold">
                                <button
                                    onClick={() => setDetailFilter('all')}
                                    className={`px-3 py-1.5 rounded-lg transition-all ${detailFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                                >
                                    All Programs
                                </button>
                                <button
                                    onClick={() => setDetailFilter('engr')}
                                    className={`px-3 py-1.5 rounded-lg transition-all ${detailFilter === 'engr' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                                >
                                    Engineering
                                </button>
                                <button
                                    onClick={() => setDetailFilter('bba')}
                                    className={`px-3 py-1.5 rounded-lg transition-all ${detailFilter === 'bba' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                                >
                                    BBA / AIS
                                </button>
                                <button
                                    onClick={() => setDetailFilter('english')}
                                    className={`px-3 py-1.5 rounded-lg transition-all ${detailFilter === 'english' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                                >
                                    English
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-900 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                            <th className="px-6 py-4" rowSpan={2}>Fee Particulars</th>
                                            {(detailFilter === 'all' || detailFilter === 'engr') && (
                                                <th className="px-4 py-2 text-center bg-slate-800 border-l border-slate-700" colSpan={2}>
                                                    Engineering (B.Sc.)
                                                </th>
                                            )}
                                            {(detailFilter === 'all' || detailFilter === 'bba') && (
                                                <th className="px-4 py-2 text-center bg-slate-850 border-l border-slate-700" colSpan={2}>
                                                    BBA & BBA in AIS
                                                </th>
                                            )}
                                            {(detailFilter === 'all' || detailFilter === 'english') && (
                                                <th className="px-4 py-2 text-center bg-slate-800 border-l border-slate-700" colSpan={2}>
                                                    B.A. (Hons) in English
                                                </th>
                                            )}
                                        </tr>
                                        <tr className="bg-slate-800 text-slate-300 text-xs font-medium uppercase tracking-wider">
                                            {(detailFilter === 'all' || detailFilter === 'engr') && (
                                                <>
                                                    <th className="px-3 py-2 text-center border-l border-slate-700 bg-slate-800">At Admission</th>
                                                    <th className="px-3 py-2 text-center bg-slate-800">Per Sem</th>
                                                </>
                                            )}
                                            {(detailFilter === 'all' || detailFilter === 'bba') && (
                                                <>
                                                    <th className="px-3 py-2 text-center border-l border-slate-700 bg-slate-850">At Admission</th>
                                                    <th className="px-3 py-2 text-center bg-slate-850">Per Sem</th>
                                                </>
                                            )}
                                            {(detailFilter === 'all' || detailFilter === 'english') && (
                                                <>
                                                    <th className="px-3 py-2 text-center border-l border-slate-700 bg-slate-800">At Admission</th>
                                                    <th className="px-3 py-2 text-center bg-slate-800">Per Sem</th>
                                                </>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        {[
                                            { item: "Admission Fee", engrAdm: "10,000", engrSem: "10,000", bbaAdm: "10,000", bbaSem: "10,000", engAdm: "10,000", engSem: "10,000" },
                                            { item: "Registration Fee", engrAdm: "5,000", engrSem: "5,000", bbaAdm: "5,000", bbaSem: "5,000", engAdm: "5,000", engSem: "5,000" },
                                            { item: "Establishment Fee", engrAdm: "10,000", engrSem: "27,000", bbaAdm: "10,000", bbaSem: "16,429", engAdm: "6,250", engSem: "12,679" },
                                            { item: "Tuition Fee", engrAdm: "30,000", engrSem: "40,000", bbaAdm: "26,250", bbaSem: "31,250", engAdm: "20,625", engSem: "25,625" },
                                            { item: "Laboratory Fee", engrAdm: "2,000", engrSem: "5,000", bbaAdm: "750", bbaSem: "750", engAdm: "750", engSem: "750" },
                                            { item: "Library Fee", engrAdm: "1,000", engrSem: "1,000", bbaAdm: "1,000", bbaSem: "1,000", engAdm: "1,000", engSem: "1,000" },
                                            { item: "Caution Fee (Refundable)", engrAdm: "5,000", engrSem: "———", bbaAdm: "5,000", bbaSem: "———", engAdm: "5,000", engSem: "———", isCaution: true },
                                            { item: "Student Activities Fee", engrAdm: "2,000", engrSem: "2,000", bbaAdm: "2,000", bbaSem: "2,000", engAdm: "2,000", engSem: "2,000" },
                                        ].map((row, idx) => (
                                            <tr key={idx} className={`hover:bg-slate-50 transition-colors ${row.isCaution ? 'bg-amber-50/40' : ''}`}>
                                                <td className="px-6 py-3.5 font-semibold text-slate-800">
                                                    {row.item}
                                                    {row.isCaution && (
                                                        <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Refundable</span>
                                                    )}
                                                </td>

                                                {(detailFilter === 'all' || detailFilter === 'engr') && (
                                                    <>
                                                        <td className="px-3 py-3.5 text-center font-medium text-slate-700 border-l border-slate-100">
                                                            {row.engrAdm !== "———" ? `${row.engrAdm}/-` : <span className="text-slate-300 font-bold">—</span>}
                                                        </td>
                                                        <td className="px-3 py-3.5 text-center font-medium text-slate-700">
                                                            {row.engrSem !== "———" ? `${row.engrSem}/-` : <span className="text-slate-300 font-bold">—</span>}
                                                        </td>
                                                    </>
                                                )}

                                                {(detailFilter === 'all' || detailFilter === 'bba') && (
                                                    <>
                                                        <td className="px-3 py-3.5 text-center font-medium text-slate-700 border-l border-slate-100">
                                                            {row.bbaAdm !== "———" ? `${row.bbaAdm}/-` : <span className="text-slate-300 font-bold">—</span>}
                                                        </td>
                                                        <td className="px-3 py-3.5 text-center font-medium text-slate-700">
                                                            {row.bbaSem !== "———" ? `${row.bbaSem}/-` : <span className="text-slate-300 font-bold">—</span>}
                                                        </td>
                                                    </>
                                                )}

                                                {(detailFilter === 'all' || detailFilter === 'english') && (
                                                    <>
                                                        <td className="px-3 py-3.5 text-center font-medium text-slate-700 border-l border-slate-100">
                                                            {row.engAdm !== "———" ? `${row.engAdm}/-` : <span className="text-slate-300 font-bold">—</span>}
                                                        </td>
                                                        <td className="px-3 py-3.5 text-center font-medium text-slate-700">
                                                            {row.engSem !== "———" ? `${row.engSem}/-` : <span className="text-slate-300 font-bold">—</span>}
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}

                                        {/* Subtotal Row */}
                                        <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                                            <td className="px-6 py-4 font-extrabold uppercase text-xs tracking-wider">
                                                Total Semester Cost
                                            </td>

                                            {(detailFilter === 'all' || detailFilter === 'engr') && (
                                                <>
                                                    <td className="px-3 py-4 text-center text-emerald-700 font-black border-l border-slate-200">
                                                        TK 65,000/-
                                                    </td>
                                                    <td className="px-3 py-4 text-center text-slate-900 font-bold">
                                                        TK 90,000/-
                                                    </td>
                                                </>
                                            )}

                                            {(detailFilter === 'all' || detailFilter === 'bba') && (
                                                <>
                                                    <td className="px-3 py-4 text-center text-teal-700 font-black border-l border-slate-200">
                                                        TK 60,000/-
                                                    </td>
                                                    <td className="px-3 py-4 text-center text-slate-900 font-bold">
                                                        TK 66,429/-
                                                    </td>
                                                </>
                                            )}

                                            {(detailFilter === 'all' || detailFilter === 'english') && (
                                                <>
                                                    <td className="px-3 py-4 text-center text-blue-700 font-black border-l border-slate-200">
                                                        TK 50,625/-
                                                    </td>
                                                    <td className="px-3 py-4 text-center text-slate-900 font-bold">
                                                        TK 57,054/-
                                                    </td>
                                                </>
                                            )}
                                        </tr>

                                        {/* Grand Total Course Fee Row */}
                                        <tr className="bg-emerald-950 text-white font-extrabold">
                                            <td className="px-6 py-4.5 uppercase text-xs sm:text-sm tracking-wider">
                                                Total Course Fee (With Caution Money)
                                            </td>

                                            {(detailFilter === 'all' || detailFilter === 'engr') && (
                                                <td className="px-3 py-4.5 text-center text-emerald-300 text-base sm:text-lg font-black border-l border-emerald-900" colSpan={2}>
                                                    TK 6,95,000/-
                                                </td>
                                            )}

                                            {(detailFilter === 'all' || detailFilter === 'bba') && (
                                                <td className="px-3 py-4.5 text-center text-teal-300 text-base sm:text-lg font-black border-l border-emerald-900" colSpan={2}>
                                                    TK 5,25,000/-
                                                </td>
                                            )}

                                            {(detailFilter === 'all' || detailFilter === 'english') && (
                                                <td className="px-3 py-4.5 text-center text-cyan-300 text-base sm:text-lg font-black border-l border-emerald-900" colSpan={2}>
                                                    TK 4,50,000/-
                                                </td>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>


                    {/* ======================================================== */}
                    {/* 5. MODE OF PAYMENT & FINE POLICIES                       */}
                    {/* ======================================================== */}
                    <section id="deadlines" className="scroll-mt-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                            
                            {/* Left: Mode of Payment Card */}
                            <div className="lg:col-span-7 bg-gradient-to-br from-[#0f5132] to-[#0a3822] text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                    <Clock size={160} />
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 rounded-xl bg-white/10 text-emerald-300 border border-white/15">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">Mode of Payment for all Programs</h3>
                                            <p className="text-xs text-emerald-200">Strict Compliance with Academic Calendar</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 text-emerald-50 text-sm leading-relaxed">
                                        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
                                            <div className="w-7 h-7 rounded-full bg-emerald-400 text-emerald-950 font-black flex items-center justify-center shrink-0 text-sm">
                                                1
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white mb-1">Standard Payment Window</h4>
                                                <p className="text-emerald-100/90 text-sm">
                                                    Students have to pay the required semester fees/charges of any semester within the 
                                                    <span className="text-white font-extrabold underline decoration-emerald-400 underline-offset-4 ml-1">
                                                        3rd week
                                                    </span> of each semester’s beginning.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-red-950/40 border border-red-400/20 backdrop-blur-xs">
                                            <div className="w-7 h-7 rounded-full bg-red-400 text-red-950 font-black flex items-center justify-center shrink-0 text-sm">
                                                2
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-red-200 mb-1">Late Payment Penalties (Defaulters)</h4>
                                                <ul className="space-y-1.5 text-red-100 text-sm">
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                                        <span>After 3rd week: <strong className="text-white">Tk. 500/-</strong> fine</span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                                        <span>After 5th week: <strong className="text-white">Tk. 1,000/-</strong> fine</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <span className="text-xs text-emerald-200/80">Payable via Trust Bank, bKash & Designated Counters</span>
                                    <Link
                                        href="/admission/tuition-fee-payment-procedure"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-md"
                                    >
                                        <span>Payment Procedure Guide</span>
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>

                            {/* Right: Repeater Fees Card */}
                            <div id="repeater" className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200/80 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                                            <ShieldAlert size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900">Semester Fees for Repeater</h3>
                                            <p className="text-xs text-slate-500">Applicable to Course & Semester Repeat Cases</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                                            <div>
                                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Faculty of ECE & ME/CE</span>
                                                <h4 className="font-bold text-slate-900">All Engineering Programs</h4>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xl font-black text-slate-900">TK 50,000/-</span>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                                            <div>
                                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Faculty of Business Studies</span>
                                                <h4 className="font-bold text-slate-900">BBA / BBA in AIS Programs</h4>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xl font-black text-slate-900">TK 35,000/-</span>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                                            <div>
                                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Faculty of Science & Humanities</span>
                                                <h4 className="font-bold text-slate-900">B.A. (Hons) in English</h4>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xl font-black text-slate-900">TK 30,000/-</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-xs text-amber-800 flex items-center gap-2">
                                    <Info size={14} className="shrink-0 text-amber-600" />
                                    <span>Repeaters must register with the Controller of Examinations within scheduled deadline.</span>
                                </div>
                            </div>

                        </div>
                    </section>


                    {/* ======================================================== */}
                    {/* 6. ADDITIONAL YEARLY FEES                                */}
                    {/* ======================================================== */}
                    <section id="additional" className="scroll-mt-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-md shadow-indigo-600/20 text-white">
                                <Stethoscope size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">Additional Yearly Fees</h3>
                                <p className="text-slate-500 text-sm">Mandatory Co-Curricular & Student Welfare Fees (Per Year)</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    sl: "1",
                                    particular: "Medical",
                                    description: "Medical Insurance & Campus Healthcare Access",
                                    amount: "300/-",
                                    period: "Per Year",
                                    color: "border-indigo-200 bg-indigo-50/30 text-indigo-900",
                                    badge: "bg-indigo-100 text-indigo-800"
                                },
                                {
                                    sl: "2",
                                    particular: "BNCC",
                                    description: "Bangladesh National Cadet Corps Platoon Activities",
                                    amount: "60/-",
                                    period: "Per Year",
                                    color: "border-emerald-200 bg-emerald-50/30 text-emerald-900",
                                    badge: "bg-emerald-100 text-emerald-800"
                                },
                                {
                                    sl: "3",
                                    particular: "Scout",
                                    description: "Rover Scout & Youth Leadership Development",
                                    amount: "25/-",
                                    period: "Per Year",
                                    color: "border-amber-200 bg-amber-50/30 text-amber-900",
                                    badge: "bg-amber-100 text-amber-800"
                                }
                            ].map((item, idx) => (
                                <div key={idx} className={`p-6 rounded-2xl border ${item.color} bg-white shadow-sm flex flex-col justify-between`}>
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${item.badge}`}>
                                                SL #{item.sl} • {item.particular}
                                            </span>
                                            <span className="text-xs font-semibold text-slate-400">{item.period}</span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 text-lg mb-1">{item.description}</h4>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-baseline justify-between">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Annual Fee</span>
                                        <span className="text-2xl font-black text-slate-900">TK {item.amount}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>


                    {/* ======================================================== */}
                    {/* 7. MERIT SCHOLARSHIP & FEE WAIVER                        */}
                    {/* ======================================================== */}
                    <section id="scholarships" className="scroll-mt-8">
                        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden">
                            <div className="absolute right-0 top-0 p-8 opacity-10 pointer-events-none">
                                <Sparkles size={200} />
                            </div>

                            <div className="max-w-3xl relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-4">
                                    <Percent size={14} />
                                    <span>Merit Recognition Scheme</span>
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
                                    Scholarship and Tuition Fee Waiver for Meritorious Students
                                </h3>
                                <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed mb-8">
                                    BAUST recognizes academic dedication and honors top performers. Students from each batch 
                                    securing 1st, 2nd, and 3rd position in each semester final examination receive substantial tuition fee waivers:
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-center">
                                        <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">1st Position</div>
                                        <div className="text-3xl sm:text-4xl font-black text-white">40%</div>
                                        <div className="text-xs text-emerald-200 mt-1">Tuition Fee Waiver</div>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-center">
                                        <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">2nd Position</div>
                                        <div className="text-3xl sm:text-4xl font-black text-white">30%</div>
                                        <div className="text-xs text-emerald-200 mt-1">Tuition Fee Waiver</div>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-center">
                                        <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">3rd Position</div>
                                        <div className="text-3xl sm:text-4xl font-black text-white">20%</div>
                                        <div className="text-xs text-emerald-200 mt-1">Tuition Fee Waiver</div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    <Link
                                        href="/admission/waiver-and-financial-aid"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg transition-colors"
                                    >
                                        <span>View All Waiver Policies (GPA & Freedom Fighter)</span>
                                        <ArrowRight size={16} />
                                    </Link>
                                    <a
                                        href="https://admission.baust.edu.bd/apply"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-colors"
                                    >
                                        <span>Apply Online Portal</span>
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* ======================================================== */}
                    {/* 8. CANDIDATE FORMALITIES & ADMISSION RULES               */}
                    {/* ======================================================== */}
                    <section className="bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-sm">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="bg-amber-500 p-2.5 rounded-xl shadow-md shadow-amber-500/20 text-white">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Admission Formalities & Regulations</h3>
                                <p className="text-slate-500 text-xs sm:text-sm">Mandatory Terms for Selected Candidates</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3.5">
                                <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Admission Deadline Compliance</h4>
                                    <p>Candidates have to complete admission formalities within the fixed period as announced by the Admission Committee. Any failure will warrant automatic cancellation of selection.</p>
                                </div>
                            </div>

                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3.5">
                                <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Mandatory Class Attendance</h4>
                                    <p>Attendance is mandatory from the first day of class. Any student failing to attend class within two consecutive weeks without approval will warrant cancellation of admission and forfeiture of fees.</p>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* ======================================================== */}
                    {/* 9. RELATED ADMISSION LINKS & RESOURCES                   */}
                    {/* ======================================================== */}
                    <section className="pt-6">
                        <div className="border-t border-slate-200 pt-10">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <FileText className="text-emerald-600" size={22} />
                                <span>Related Admission Resources</span>
                            </h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {[
                                    { title: "Apply Online Instruction", href: "/admission/apply-online-instruction" },
                                    { title: "Tuition Fee Payment Procedure", href: "/admission/tuition-fee-payment-procedure" },
                                    { title: "Admission Requirements", href: "/admission/admission-requirment" },
                                    { title: "Offered Programs", href: "/admission/program-offering" },
                                    { title: "Admission Procedure", href: "/admission/admission-procedure" },
                                    { title: "Waiver & Financial Aid", href: "/admission/waiver-and-financial-aid" },
                                    { title: "Credit Transfer Policy", href: "/admission/credit-transfer-policy" },
                                ].map((linkItem, idx) => (
                                    <Link
                                        key={idx}
                                        href={linkItem.href}
                                        className="p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all flex items-center justify-between group"
                                    >
                                        <span className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">
                                            {linkItem.title}
                                        </span>
                                        <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>

                            {/* Download Leaflet Banner */}
                            <div className="mt-8 p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3 text-center sm:text-left">
                                    <div className="p-3 bg-white/10 rounded-xl text-emerald-400">
                                        <Download size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base">Download Official Admission Leaflet</h4>
                                        <p className="text-xs text-slate-400">Official BAUST circular with fees, eligibility, and program highlights.</p>
                                    </div>
                                </div>
                                <a
                                    href="/images/admission/Leaflet.pdf"
                                    target="_blank"
                                    download
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors whitespace-nowrap"
                                >
                                    <Download size={15} />
                                    <span>Download PDF Leaflet</span>
                                </a>
                            </div>
                        </div>
                    </section>

                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
