import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { XCircle, Info, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

const REFUND_RULES = [
    { ser: 1, when: 'Before commencement of the classes', refund: '100% of the Establishment Fees and 100% of the Semester Fee' },
    { ser: 2, when: 'Within the 1st week of commencement of the classes', refund: 'The Caution Money, 75% of the Establishment Fee and the Semester Fee' },
    { ser: 3, when: 'Within 2 weeks of commencement of the classes', refund: 'The Caution Money, 50% of the Establishment Fee and the Semester Fee' },
    { ser: 4, when: 'After 2 weeks of commencement of the classes', refund: 'Caution Money only' },
];

export default function CancelPolicy() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Head title="Admission Cancel Policy - BAUST" />
            <Navbar />
            <PageHero title="Admission Cancellation Policy" subtitle="Cancellation guidelines & refund schedule" />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
                    {/* Overview */}
                    <div className="xl:col-span-4 space-y-8">
                        <section className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 text-emerald-600 group-hover:scale-110 transition-transform duration-700"><XCircle size={140} /></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                    <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl mr-4"><Info size={24} /></span>
                                    1.7 &nbsp;Cancellation of Admission
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    The cancellation of admission is <span className="font-semibold text-slate-800">not permissible</span>. However, under special circumstances, such cancellation may be considered as per the guidelines shown here.
                                </p>
                                <div className="mt-6 space-y-3">
                                    {['Applies to special circumstances only', 'Refund depends on timing of cancellation', 'Caution money treated separately'].map((t) => (
                                        <div key={t} className="flex items-center space-x-3 text-sm font-medium text-slate-700">
                                            <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" /><span>{t}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl">
                            <h4 className="text-lg font-bold mb-3 flex items-center"><AlertCircle className="mr-2 text-emerald-400" size={20} />Reference</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">SOP, Academic Guideline, October 2020. For any cancellation request, please contact the Admission Office.</p>
                        </div>
                    </div>

                    {/* Refund schedule */}
                    <div className="xl:col-span-8">
                        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
                            <div className="px-8 py-6 bg-emerald-50/60 border-b border-emerald-100 flex items-center gap-3">
                                <Clock className="text-emerald-700" size={22} />
                                <div>
                                    <h3 className="text-lg font-bold text-emerald-900">Refund Schedule</h3>
                                    <p className="text-xs text-emerald-700/70">Refundable amount by time of cancellation</p>
                                </div>
                            </div>

                            {/* Desktop table */}
                            <table className="w-full text-sm hidden md:table">
                                <thead>
                                    <tr className="text-left text-slate-400 text-[11px] uppercase tracking-widest border-b border-slate-100">
                                        <th className="px-8 py-4 font-bold">Ser</th>
                                        <th className="px-2 py-4 font-bold">Description</th>
                                        <th className="px-8 py-4 font-bold">Refundable</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {REFUND_RULES.map((r) => (
                                        <tr key={r.ser} className="hover:bg-slate-50/60 align-top">
                                            <td className="px-8 py-5 text-slate-400 font-bold">{r.ser}</td>
                                            <td className="px-2 py-5 text-slate-800 font-semibold">{r.when}</td>
                                            <td className="px-8 py-5 text-slate-600 leading-relaxed">{r.refund}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Mobile cards */}
                            <div className="md:hidden divide-y divide-slate-50">
                                {REFUND_RULES.map((r) => (
                                    <div key={r.ser} className="p-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">{r.ser}</span>
                                            <p className="font-semibold text-slate-800 text-sm">{r.when}</p>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed pl-9">{r.refund}</p>
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
