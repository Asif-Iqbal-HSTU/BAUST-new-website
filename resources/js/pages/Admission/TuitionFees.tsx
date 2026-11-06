import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import SeoHead from '@/components/seo-head';
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

interface ProgramFeeSection {
    heading: string;
    subheading: string;
    table_headings: {
        serial_heading: string;
        program_heading: string;
        admission_heading: string;
        admission_subheading: string;
        per_semester_heading: string;
        per_semester_subheading: string;
        total_heading: string;
        total_subheading: string;
    };
    programs: {
        program_name: string;
        program_details: string;
        admission_fee: string;
        per_semester_fee: string;
        total_fee: string;
    }[];
    caution_note_prefix: string;
    caution_amount: string;
    caution_note_suffix: string;
    footer_label: string;
}

export interface TuitionFeesContent {
    meta_title: string;
    hero: { title: string; subtitle: string };
    intro: {
        badge_text: string;
        heading: string;
        description: string;
        jump_links: { label: string; target_link: string }[];
    };
    engineering_programs: ProgramFeeSection;
    non_engineering_programs: ProgramFeeSection;
    graduate_programs: {
        heading: string;
        subheading: string;
        program_heading: string;
        duration_heading: string;
        fee_structure_heading: string;
        semester_headings: string[];
        total_heading: string;
        programs: {
            program_name: string;
            credits: string;
            duration: string;
            duration_detail: string;
            semester_fees: string[];
            total_fee: string;
        }[];
    };
    detailed_fees: {
        heading: string;
        subheading: string;
        all_filter_label: string;
        particulars_heading: string;
        at_admission_heading: string;
        per_semester_heading: string;
        refundable_badge_label: string;
        semester_total_label: string;
        course_total_label: string;
        programs: {
            filter_label: string;
            column_heading: string;
            semester_total_at_admission: string;
            semester_total_per_semester: string;
            course_total: string;
        }[];
        rows: {
            particular: string;
            is_refundable: boolean;
            fees: { at_admission: string; per_semester: string }[];
        }[];
    };
    payment_mode: {
        heading: string;
        subheading: string;
        standard_window: {
            title: string;
            text_before_highlight: string;
            highlight: string;
            text_after_highlight: string;
        };
        late_penalties: {
            title: string;
            fines: { label: string; amount: string; suffix: string }[];
        };
        payment_channels_text: string;
        payment_guide_button_label: string;
        payment_guide_link: string;
    };
    repeater_fees: {
        heading: string;
        subheading: string;
        items: { faculty: string; program: string; fee: string }[];
        note: string;
    };
    additional_fees: {
        heading: string;
        subheading: string;
        serial_prefix: string;
        amount_label: string;
        items: { particular: string; description: string; amount: string; period: string }[];
    };
    scholarships: {
        badge_text: string;
        heading: string;
        description: string;
        positions: { position: string; waiver: string; waiver_label: string }[];
        waiver_policies_button_label: string;
        waiver_policies_link: string;
        apply_button_label: string;
        apply_url: string;
    };
    formalities: {
        heading: string;
        subheading: string;
        items: { title: string; description: string }[];
    };
    related_resources: {
        heading: string;
        links: { title: string; link: string }[];
        leaflet_banner: {
            heading: string;
            description: string;
            button_label: string;
            leaflet_pdf: string;
        };
    };
}

/** Per-section accent styling (chrome only) for the undergraduate fee tables. */
const PROGRAM_TABLE_STYLES = {
    engineering: {
        id: 'engineering',
        Icon: Calculator,
        iconBox: 'bg-emerald-600 p-2.5 rounded-xl shadow-md shadow-emerald-600/20 text-white',
        subLabel: 'text-[11px] font-normal text-emerald-300 normal-case',
        rowHover: 'hover:bg-emerald-50/50 transition-colors',
        details: 'text-xs text-slate-500 mt-0.5',
        admissionFee: 'px-6 py-5 text-center font-bold text-emerald-700 text-base',
        infoIcon: 'text-emerald-600',
    },
    nonEngineering: {
        id: 'non-engineering',
        Icon: Briefcase,
        iconBox: 'bg-teal-600 p-2.5 rounded-xl shadow-md shadow-teal-600/20 text-white',
        subLabel: 'text-[11px] font-normal text-teal-300 normal-case',
        rowHover: 'hover:bg-teal-50/40 transition-colors',
        details: 'text-xs text-slate-500',
        admissionFee: 'px-6 py-5 text-center font-bold text-teal-700 text-base',
        infoIcon: 'text-teal-600',
    },
} as const;

function ProgramFeeTable({ section, styles }: { section: ProgramFeeSection; styles: (typeof PROGRAM_TABLE_STYLES)[keyof typeof PROGRAM_TABLE_STYLES] }) {
    const h = section.table_headings;
    const Icon = styles.Icon;

    return (
        <section id={styles.id} className="scroll-mt-8">
            <div className="flex items-center space-x-3 mb-6">
                <div className={styles.iconBox}>
                    <Icon size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-slate-900">{section.heading}</h3>
                    <p className="text-slate-500 text-sm">{section.subheading}</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-slate-200/80 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                <th className="px-6 py-4">{h.serial_heading}</th>
                                <th className="px-6 py-4">{h.program_heading}</th>
                                <th className="px-6 py-4 text-center">{h.admission_heading}<br/><span className={styles.subLabel}>{h.admission_subheading}</span></th>
                                <th className="px-6 py-4 text-center">{h.per_semester_heading}<br/><span className={styles.subLabel}>{h.per_semester_subheading}</span></th>
                                <th className="px-6 py-4 text-right">{h.total_heading}<br/><span className={styles.subLabel}>{h.total_subheading}</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {section.programs.map((program, idx) => (
                                <tr key={idx} className={styles.rowHover}>
                                    <td className="px-6 py-5 font-bold text-slate-700">{idx + 1}</td>
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-slate-900 text-base">{program.program_name}</div>
                                        <div className={styles.details}>{program.program_details}</div>
                                    </td>
                                    <td className={styles.admissionFee}>
                                        {program.admission_fee}
                                    </td>
                                    <td className="px-6 py-5 text-center font-bold text-slate-700 text-base">
                                        {program.per_semester_fee}
                                    </td>
                                    <td className="px-6 py-5 text-right font-black text-slate-900 text-xl">
                                        {program.total_fee}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                    <span className="flex items-center gap-1.5">
                        <Info size={14} className={styles.infoIcon} />
                        {section.caution_note_prefix} <strong>{section.caution_amount}</strong> {section.caution_note_suffix}
                    </span>
                    <span className="text-slate-400">{section.footer_label}</span>
                </div>
            </div>
        </section>
    );
}

/** Empty cells (or the legacy "———" marker) render as a muted dash. */
const isEmptyFee = (value: string | undefined) => !value || !value.trim() || value.trim() === '———';

const GRADUATE_CREDIT_BADGES = [
    'bg-emerald-100 text-emerald-800',
    'bg-blue-100 text-blue-800',
    'bg-purple-100 text-purple-800',
    'bg-amber-100 text-amber-800',
];

const DETAIL_HEADER_BG = ['bg-slate-800', 'bg-slate-850'];
const DETAIL_SEMESTER_TOTAL_COLORS = ['text-emerald-700', 'text-teal-700', 'text-blue-700'];
const DETAIL_COURSE_TOTAL_COLORS = ['text-emerald-300', 'text-teal-300', 'text-cyan-300'];

const ADDITIONAL_FEE_STYLES = [
    { color: 'border-indigo-200 bg-indigo-50/30 text-indigo-900', badge: 'bg-indigo-100 text-indigo-800' },
    { color: 'border-emerald-200 bg-emerald-50/30 text-emerald-900', badge: 'bg-emerald-100 text-emerald-800' },
    { color: 'border-amber-200 bg-amber-50/30 text-amber-900', badge: 'bg-amber-100 text-amber-800' },
];

export default function TuitionFees({ content }: { content: TuitionFeesContent }) {
    const { hero, intro, graduate_programs: grad, detailed_fees: detail, payment_mode: payment, repeater_fees: repeater, additional_fees: additional, scholarships, formalities, related_resources: related } = content;

    // 'all' or the index of a program column in detailed_fees.programs
    const [detailFilter, setDetailFilter] = useState<'all' | number>('all');
    const visibleDetailPrograms = detail.programs
        .map((program, idx) => ({ program, idx }))
        .filter(({ idx }) => detailFilter === 'all' || detailFilter === idx);

    const filterButtonClass = (active: boolean) =>
        `px-3 py-1.5 rounded-lg transition-all ${active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`;

    const renderDetailFee = (value: string | undefined) =>
        !isEmptyFee(value) ? `${value}/-` : <span className="text-slate-300 font-bold">—</span>;

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
            <SeoHead title={content.meta_title} />

            {/* Navigation */}
            <Navbar />

            {/* Page Header */}
            <PageHero 
                title={hero.title} 
                subtitle={hero.subtitle} 
            />

            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                
                {/* Intro Hero Section */}
                <div className="max-w-4xl mx-auto mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-4">
                        <CreditCard size={15} className="text-emerald-600" />
                        <span>{intro.badge_text}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        {intro.heading}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        {intro.description}
                    </p>

                    {/* Quick Section Jump Bar */}
                    <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-medium">
                        {intro.jump_links.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.target_link}
                                className="px-3 py-1.5 bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-slate-700 shadow-xs transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="space-y-16 lg:space-y-20">

                    {/* 1. ENGINEERING PROGRAMS */}
                    <ProgramFeeTable section={content.engineering_programs} styles={PROGRAM_TABLE_STYLES.engineering} />

                    {/* 2. NON-ENGINEERING PROGRAMS */}
                    <ProgramFeeTable section={content.non_engineering_programs} styles={PROGRAM_TABLE_STYLES.nonEngineering} />


                    {/* ======================================================== */}
                    {/* 3. GRADUATE PROGRAMS (EMBA, MBA, MA)                     */}
                    {/* ======================================================== */}
                    <section id="graduate" className="scroll-mt-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="bg-[#0f5132] p-2.5 rounded-xl shadow-md shadow-emerald-900/20 text-white">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">{grad.heading}</h3>
                                <p className="text-slate-500 text-sm">{grad.subheading}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg border border-slate-200/80 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-900 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                            <th className="px-6 py-4" rowSpan={2}>{grad.program_heading}</th>
                                            <th className="px-6 py-4 text-center" rowSpan={2}>{grad.duration_heading}</th>
                                            <th className="px-6 py-2 text-center border-b border-slate-800" colSpan={grad.semester_headings.length}>{grad.fee_structure_heading}</th>
                                            <th className="px-6 py-4 text-right" rowSpan={2}>{grad.total_heading}</th>
                                        </tr>
                                        <tr className="bg-slate-800 text-slate-200 text-xs font-medium uppercase tracking-wider">
                                            {grad.semester_headings.map((semester, idx) => (
                                                <th key={idx} className="px-4 py-2.5 text-center">{semester}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        {grad.programs.map((program, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-5">
                                                    <div className="font-bold text-slate-900 text-base">{program.program_name}</div>
                                                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 ${GRADUATE_CREDIT_BADGES[idx % GRADUATE_CREDIT_BADGES.length]} rounded-md mt-1`}>{program.credits}</span>
                                                </td>
                                                <td className="px-6 py-5 text-center text-slate-600 font-medium whitespace-nowrap">
                                                    {program.duration}<br /><span className="text-xs text-slate-400">{program.duration_detail}</span>
                                                </td>
                                                {grad.semester_headings.map((_, semIdx) => {
                                                    const fee = program.semester_fees[semIdx];

                                                    if (isEmptyFee(fee)) {
                                                        return <td key={semIdx} className="px-4 py-5 text-center text-slate-300 font-bold">—</td>;
                                                    }

                                                    return (
                                                        <td key={semIdx} className={semIdx === 0 ? 'px-4 py-5 text-center font-bold text-emerald-700' : 'px-4 py-5 text-center font-medium text-slate-700'}>
                                                            {fee}
                                                        </td>
                                                    );
                                                })}
                                                <td className="px-6 py-5 text-right font-black text-slate-900 text-lg">{program.total_fee}</td>
                                            </tr>
                                        ))}
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
                                    <h3 className="text-2xl font-bold text-slate-900">{detail.heading}</h3>
                                    <p className="text-slate-500 text-sm">{detail.subheading}</p>
                                </div>
                            </div>

                            {/* View Filter Pill */}
                            <div className="inline-flex p-1 bg-slate-200/80 rounded-xl text-xs font-semibold">
                                <button
                                    onClick={() => setDetailFilter('all')}
                                    className={filterButtonClass(detailFilter === 'all')}
                                >
                                    {detail.all_filter_label}
                                </button>
                                {detail.programs.map((program, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setDetailFilter(idx)}
                                        className={filterButtonClass(detailFilter === idx)}
                                    >
                                        {program.filter_label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-900 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                            <th className="px-6 py-4" rowSpan={2}>{detail.particulars_heading}</th>
                                            {visibleDetailPrograms.map(({ program, idx }) => (
                                                <th key={idx} className={`px-4 py-2 text-center ${DETAIL_HEADER_BG[idx % DETAIL_HEADER_BG.length]} border-l border-slate-700`} colSpan={2}>
                                                    {program.column_heading}
                                                </th>
                                            ))}
                                        </tr>
                                        <tr className="bg-slate-800 text-slate-300 text-xs font-medium uppercase tracking-wider">
                                            {visibleDetailPrograms.map(({ idx }) => {
                                                const bg = DETAIL_HEADER_BG[idx % DETAIL_HEADER_BG.length];

                                                return (
                                                    <React.Fragment key={idx}>
                                                        <th className={`px-3 py-2 text-center border-l border-slate-700 ${bg}`}>{detail.at_admission_heading}</th>
                                                        <th className={`px-3 py-2 text-center ${bg}`}>{detail.per_semester_heading}</th>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        {detail.rows.map((row, rowIdx) => (
                                            <tr key={rowIdx} className={`hover:bg-slate-50 transition-colors ${row.is_refundable ? 'bg-amber-50/40' : ''}`}>
                                                <td className="px-6 py-3.5 font-semibold text-slate-800">
                                                    {row.particular}
                                                    {row.is_refundable && (
                                                        <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">{detail.refundable_badge_label}</span>
                                                    )}
                                                </td>

                                                {visibleDetailPrograms.map(({ idx }) => (
                                                    <React.Fragment key={idx}>
                                                        <td className="px-3 py-3.5 text-center font-medium text-slate-700 border-l border-slate-100">
                                                            {renderDetailFee(row.fees[idx]?.at_admission)}
                                                        </td>
                                                        <td className="px-3 py-3.5 text-center font-medium text-slate-700">
                                                            {renderDetailFee(row.fees[idx]?.per_semester)}
                                                        </td>
                                                    </React.Fragment>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* Subtotal Row */}
                                        <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                                            <td className="px-6 py-4 font-extrabold uppercase text-xs tracking-wider">
                                                {detail.semester_total_label}
                                            </td>

                                            {visibleDetailPrograms.map(({ program, idx }) => (
                                                <React.Fragment key={idx}>
                                                    <td className={`px-3 py-4 text-center ${DETAIL_SEMESTER_TOTAL_COLORS[idx % DETAIL_SEMESTER_TOTAL_COLORS.length]} font-black border-l border-slate-200`}>
                                                        {program.semester_total_at_admission}
                                                    </td>
                                                    <td className="px-3 py-4 text-center text-slate-900 font-bold">
                                                        {program.semester_total_per_semester}
                                                    </td>
                                                </React.Fragment>
                                            ))}
                                        </tr>

                                        {/* Grand Total Course Fee Row */}
                                        <tr className="bg-emerald-950 text-white font-extrabold">
                                            <td className="px-6 py-4.5 uppercase text-xs sm:text-sm tracking-wider">
                                                {detail.course_total_label}
                                            </td>

                                            {visibleDetailPrograms.map(({ program, idx }) => (
                                                <td key={idx} className={`px-3 py-4.5 text-center ${DETAIL_COURSE_TOTAL_COLORS[idx % DETAIL_COURSE_TOTAL_COLORS.length]} text-base sm:text-lg font-black border-l border-emerald-900`} colSpan={2}>
                                                    {program.course_total}
                                                </td>
                                            ))}
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
                                            <h3 className="text-2xl font-bold">{payment.heading}</h3>
                                            <p className="text-xs text-emerald-200">{payment.subheading}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 text-emerald-50 text-sm leading-relaxed">
                                        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
                                            <div className="w-7 h-7 rounded-full bg-emerald-400 text-emerald-950 font-black flex items-center justify-center shrink-0 text-sm">
                                                1
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white mb-1">{payment.standard_window.title}</h4>
                                                <p className="text-emerald-100/90 text-sm">
                                                    {payment.standard_window.text_before_highlight}
                                                    <span className="text-white font-extrabold underline decoration-emerald-400 underline-offset-4 ml-1">
                                                        {payment.standard_window.highlight}
                                                    </span> {payment.standard_window.text_after_highlight}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-red-950/40 border border-red-400/20 backdrop-blur-xs">
                                            <div className="w-7 h-7 rounded-full bg-red-400 text-red-950 font-black flex items-center justify-center shrink-0 text-sm">
                                                2
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-red-200 mb-1">{payment.late_penalties.title}</h4>
                                                <ul className="space-y-1.5 text-red-100 text-sm">
                                                    {payment.late_penalties.fines.map((fine, idx) => (
                                                        <li key={idx} className="flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                                            <span>{fine.label} <strong className="text-white">{fine.amount}</strong> {fine.suffix}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <span className="text-xs text-emerald-200/80">{payment.payment_channels_text}</span>
                                    <Link
                                        href={payment.payment_guide_link}
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-md"
                                    >
                                        <span>{payment.payment_guide_button_label}</span>
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
                                            <h3 className="text-2xl font-bold text-slate-900">{repeater.heading}</h3>
                                            <p className="text-xs text-slate-500">{repeater.subheading}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {repeater.items.map((item, idx) => (
                                            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                                                <div>
                                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">{item.faculty}</span>
                                                    <h4 className="font-bold text-slate-900">{item.program}</h4>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xl font-black text-slate-900">{item.fee}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-xs text-amber-800 flex items-center gap-2">
                                    <Info size={14} className="shrink-0 text-amber-600" />
                                    <span>{repeater.note}</span>
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
                                <h3 className="text-2xl font-bold text-slate-900">{additional.heading}</h3>
                                <p className="text-slate-500 text-sm">{additional.subheading}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {additional.items.map((item, idx) => {
                                const style = ADDITIONAL_FEE_STYLES[idx % ADDITIONAL_FEE_STYLES.length];

                                return (
                                    <div key={idx} className={`p-6 rounded-2xl border ${style.color} bg-white shadow-sm flex flex-col justify-between`}>
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${style.badge}`}>
                                                    {additional.serial_prefix}{idx + 1} • {item.particular}
                                                </span>
                                                <span className="text-xs font-semibold text-slate-400">{item.period}</span>
                                            </div>
                                            <h4 className="font-bold text-slate-900 text-lg mb-1">{item.description}</h4>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-baseline justify-between">
                                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{additional.amount_label}</span>
                                            <span className="text-2xl font-black text-slate-900">{item.amount}</span>
                                        </div>
                                    </div>
                                );
                            })}
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
                                    <span>{scholarships.badge_text}</span>
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
                                    {scholarships.heading}
                                </h3>
                                <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed mb-8">
                                    {scholarships.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    {scholarships.positions.map((position, idx) => (
                                        <div key={idx} className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-center">
                                            <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">{position.position}</div>
                                            <div className="text-3xl sm:text-4xl font-black text-white">{position.waiver}</div>
                                            <div className="text-xs text-emerald-200 mt-1">{position.waiver_label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    <Link
                                        href={scholarships.waiver_policies_link}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg transition-colors"
                                    >
                                        <span>{scholarships.waiver_policies_button_label}</span>
                                        <ArrowRight size={16} />
                                    </Link>
                                    <a
                                        href={scholarships.apply_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-colors"
                                    >
                                        <span>{scholarships.apply_button_label}</span>
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
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{formalities.heading}</h3>
                                <p className="text-slate-500 text-xs sm:text-sm">{formalities.subheading}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
                            {formalities.items.map((item, idx) => (
                                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3.5">
                                    <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>


                    {/* ======================================================== */}
                    {/* 9. RELATED ADMISSION LINKS & RESOURCES                   */}
                    {/* ======================================================== */}
                    <section className="pt-6">
                        <div className="border-t border-slate-200 pt-10">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <FileText className="text-emerald-600" size={22} />
                                <span>{related.heading}</span>
                            </h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {related.links.map((linkItem, idx) => (
                                    <Link
                                        key={idx}
                                        href={linkItem.link}
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
                                        <h4 className="font-bold text-base">{related.leaflet_banner.heading}</h4>
                                        <p className="text-xs text-slate-400">{related.leaflet_banner.description}</p>
                                    </div>
                                </div>
                                <a
                                    href={related.leaflet_banner.leaflet_pdf}
                                    target="_blank"
                                    download
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors whitespace-nowrap"
                                >
                                    <Download size={15} />
                                    <span>{related.leaflet_banner.button_label}</span>
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
