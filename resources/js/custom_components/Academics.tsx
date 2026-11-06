import React from "react";
import {
    Laptop,
    PlugZap,
    Network,
    Cog,
    Factory,
    Ruler,
    Briefcase,
    Calculator,
    GraduationCap,
    BookOpen,
    FlaskConical,
    ArrowUpRight,
    ChevronRight,
} from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Academics() {
    return (
        <section id="academics" className="py-20 bg-gradient-to-b from-[#fafafa] via-white to-[#fafafa] dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 scroll-mt-6 relative overflow-hidden">
            {/* Ambient background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/5 via-emerald-500/[0.02] to-transparent pointer-events-none blur-3xl" />

            <div className="max-w-screen-xl mx-auto px-4 md:px-8 relative z-10">
                {/* Modern Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 mb-3 tracking-wide uppercase shadow-xs">
                        <GraduationCap size={14} className="text-emerald-600 dark:text-emerald-400" />
                        Academic Excellence
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Our Academics
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Explore our accredited faculties, industry-aligned engineering disciplines, and career-oriented degree programs designed for tomorrow's leaders.
                    </p>
                </div>

                {/* Grid of Faculties and Programs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* FECE */}
                    <div className="bg-white dark:bg-gray-800/90 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-xs hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group">
                        <div>
                            <div className="overflow-hidden relative aspect-[16/10] bg-gray-100 dark:bg-gray-700">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    src="/images/departments/cse/laboratory/computer-programming-and-operating-system-lab/2.jpg"
                                    alt="Faculty of Electrical and Computer Engineering"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 dark:bg-gray-900/95 backdrop-blur-xs text-emerald-800 dark:text-emerald-300 shadow-xs border border-white/40 dark:border-gray-700/40">
                                    Engineering & Technology
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    <Link
                                        href="/fece"
                                        className="inline-flex items-start justify-between w-full gap-2 group/title hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                                    >
                                        <span className="leading-snug">Faculty of Electrical and Computer Engineering (FECE)</span>
                                        <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover/title:bg-emerald-600 group-hover/title:text-white group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all shadow-xs mt-0.5">
                                            <ArrowUpRight size={15} />
                                        </span>
                                    </Link>
                                </h3>

                                <ul className="space-y-1.5 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/60">
                                    <li>
                                        <Link
                                            href="/cse"
                                            className="flex items-center gap-3 p-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-all duration-200 group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all shadow-xs">
                                                <Laptop size={16} />
                                            </div>
                                            <span className="flex-1 leading-snug">Computer Science and Engineering (CSE)</span>
                                            <ChevronRight size={14} className="text-gray-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/eee"
                                            className="flex items-center gap-3 p-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-all duration-200 group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all shadow-xs">
                                                <PlugZap size={16} />
                                            </div>
                                            <span className="flex-1 leading-snug">Electrical and Electronic Engineering (EEE)</span>
                                            <ChevronRight size={14} className="text-gray-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/ict"
                                            className="flex items-center gap-3 p-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-all duration-200 group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all shadow-xs">
                                                <Network size={16} />
                                            </div>
                                            <span className="flex-1 leading-snug">Information and Communication Technology (ICT)</span>
                                            <ChevronRight size={14} className="text-gray-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* FME */}
                    <div className="bg-white dark:bg-gray-800/90 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-xs hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group">
                        <div>
                            <div className="overflow-hidden relative aspect-[16/10] bg-gray-100 dark:bg-gray-700">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    src="/images/departments/me/slider/slide1.jpg"
                                    alt="Faculty of Mechanical Engineering"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 dark:bg-gray-900/95 backdrop-blur-xs text-emerald-800 dark:text-emerald-300 shadow-xs border border-white/40 dark:border-gray-700/40">
                                    Mechanical & Industry
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    <Link
                                        href="/fme"
                                        className="inline-flex items-start justify-between w-full gap-2 group/title hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                                    >
                                        <span className="leading-snug">Faculty of Mechanical Engineering (FME)</span>
                                        <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover/title:bg-emerald-600 group-hover/title:text-white group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all shadow-xs mt-0.5">
                                            <ArrowUpRight size={15} />
                                        </span>
                                    </Link>
                                </h3>

                                <ul className="space-y-1.5 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/60">
                                    <li>
                                        <Link
                                            href="/me"
                                            className="flex items-center gap-3 p-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-all duration-200 group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all shadow-xs">
                                                <Cog size={16} />
                                            </div>
                                            <span className="flex-1 leading-snug">Department of Mechanical Engineering (ME)</span>
                                            <ChevronRight size={14} className="text-gray-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/ipe"
                                            className="flex items-center gap-3 p-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-all duration-200 group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all shadow-xs">
                                                <Factory size={16} />
                                            </div>
                                            <span className="flex-1 leading-snug">Department of Industrial and Production Engineering (IPE)</span>
                                            <ChevronRight size={14} className="text-gray-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* FCE */}
                    <div className="bg-white dark:bg-gray-800/90 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-xs hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group">
                        <div>
                            <div className="overflow-hidden relative aspect-[16/10] bg-gray-100 dark:bg-gray-700">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    src="/images/departments/ce/laboratory/fluid-mechanics-lab/1.jpg"
                                    alt="Faculty of Civil Engineering"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 dark:bg-gray-900/95 backdrop-blur-xs text-emerald-800 dark:text-emerald-300 shadow-xs border border-white/40 dark:border-gray-700/40">
                                    Civil & Infrastructure
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    <Link
                                        href="/fce"
                                        className="inline-flex items-start justify-between w-full gap-2 group/title hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                                    >
                                        <span className="leading-snug">Faculty of Civil Engineering (FCE)</span>
                                        <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover/title:bg-emerald-600 group-hover/title:text-white group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all shadow-xs mt-0.5">
                                            <ArrowUpRight size={15} />
                                        </span>
                                    </Link>
                                </h3>

                                <ul className="space-y-1.5 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/60">
                                    <li>
                                        <Link
                                            href="/ce"
                                            className="flex items-center gap-3 p-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-all duration-200 group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all shadow-xs">
                                                <Ruler size={16} />
                                            </div>
                                            <span className="flex-1 leading-snug">Department of Civil Engineering (CE)</span>
                                            <ChevronRight size={14} className="text-gray-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* FBS */}
                    <div className="bg-white dark:bg-gray-800/90 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-xs hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group">
                        <div>
                            <div className="overflow-hidden relative aspect-[16/10] bg-gray-100 dark:bg-gray-700">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    src="/images/departments/dba/slider/slide1.jpeg"
                                    alt="Faculty of Business Studies"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 dark:bg-gray-900/95 backdrop-blur-xs text-emerald-800 dark:text-emerald-300 shadow-xs border border-white/40 dark:border-gray-700/40">
                                    Business & Management
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    <Link
                                        href="/fbs"
                                        className="inline-flex items-start justify-between w-full gap-2 group/title hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                                    >
                                        <span className="leading-snug">Faculty of Business Studies (FBS)</span>
                                        <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover/title:bg-emerald-600 group-hover/title:text-white group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all shadow-xs mt-0.5">
                                            <ArrowUpRight size={15} />
                                        </span>
                                    </Link>
                                </h3>

                                <ul className="space-y-1.5 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/60">
                                    <li>
                                        <Link
                                            href="/dba"
                                            className="flex items-center gap-3 p-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-all duration-200 group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all shadow-xs">
                                                <Briefcase size={16} />
                                            </div>
                                            <span className="flex-1 leading-snug">Department of Business Administration (DBA)</span>
                                            <ChevronRight size={14} className="text-gray-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/ais"
                                            className="flex items-center gap-3 p-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-all duration-200 group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all shadow-xs">
                                                <Calculator size={16} />
                                            </div>
                                            <span className="flex-1 leading-snug">Department of Accounting and Information Systems (AIS)</span>
                                            <ChevronRight size={14} className="text-gray-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/mba"
                                            className="flex items-center gap-3 p-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-all duration-200 group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all shadow-xs">
                                                <GraduationCap size={16} />
                                            </div>
                                            <span className="flex-1 leading-snug">Master of Business Administration (MBA) Program</span>
                                            <ChevronRight size={14} className="text-gray-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* FSH */}
                    <div className="bg-white dark:bg-gray-800/90 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-xs hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group">
                        <div>
                            <div className="overflow-hidden relative aspect-[16/10] bg-gray-100 dark:bg-gray-700">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    src="/images/departments/eng/slider/slide1.jpg"
                                    alt="Faculty of Science and Humanities"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 dark:bg-gray-900/95 backdrop-blur-xs text-emerald-800 dark:text-emerald-300 shadow-xs border border-white/40 dark:border-gray-700/40">
                                    Humanities & Sciences
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    <Link
                                        href="/fsh"
                                        className="inline-flex items-start justify-between w-full gap-2 group/title hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                                    >
                                        <span className="leading-snug">Faculty of Science and Humanities (FSH)</span>
                                        <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover/title:bg-emerald-600 group-hover/title:text-white group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all shadow-xs mt-0.5">
                                            <ArrowUpRight size={15} />
                                        </span>
                                    </Link>
                                </h3>

                                <ul className="space-y-1.5 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/60">
                                    <li>
                                        <Link
                                            href="/eng"
                                            className="flex items-center gap-3 p-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-all duration-200 group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all shadow-xs">
                                                <BookOpen size={16} />
                                            </div>
                                            <span className="flex-1 leading-snug">Department of English</span>
                                            <ChevronRight size={14} className="text-gray-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/ma-elt"
                                            className="flex items-center gap-3 p-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-all duration-200 group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all shadow-xs">
                                                <GraduationCap size={16} />
                                            </div>
                                            <span className="flex-1 leading-snug">MA in English (ELT)</span>
                                            <ChevronRight size={14} className="text-gray-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/as"
                                            className="flex items-center gap-3 p-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-all duration-200 group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all shadow-xs">
                                                <FlaskConical size={16} />
                                            </div>
                                            <span className="flex-1 leading-snug">Department of Arts and Sciences (Physics, Chemistry, Math, Sociology, Bangla)</span>
                                            <ChevronRight size={14} className="text-gray-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Programs We Offer */}
                    <div className="relative rounded-2xl border border-emerald-900/40 shadow-xs hover:shadow-xl hover:shadow-emerald-950/20 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group">
                        {/* Background Image with Deep Overlay */}
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            style={{ backgroundImage: "url('/images/hero/hero-2.jpg')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/92 via-emerald-950/92 to-gray-950/96 backdrop-blur-[1px]" />

                        <div className="relative p-6 flex flex-col h-full justify-between z-10 text-white">
                            <div>
                                <div className="flex items-center justify-between mb-2.5">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                        <GraduationCap size={13} />
                                        All Degrees
                                    </span>
                                    <span className="text-[11px] text-emerald-300/80 font-medium">11 Programs</span>
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-white mb-3">
                                    Programs We Offer
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                                    <Link
                                        href="/cse"
                                        className="flex items-center gap-2 p-1.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors group/item"
                                    >
                                        <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">
                                            <Laptop size={12} />
                                        </div>
                                        <span className="truncate font-medium">B.Sc. in CSE</span>
                                    </Link>
                                    <Link
                                        href="/eee"
                                        className="flex items-center gap-2 p-1.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors group/item"
                                    >
                                        <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">
                                            <PlugZap size={12} />
                                        </div>
                                        <span className="truncate font-medium">B.Sc. in EEE</span>
                                    </Link>
                                    <Link
                                        href="/ict"
                                        className="flex items-center gap-2 p-1.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors group/item"
                                    >
                                        <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">
                                            <Network size={12} />
                                        </div>
                                        <span className="truncate font-medium">B.Sc. in ICT</span>
                                    </Link>
                                    <Link
                                        href="/me"
                                        className="flex items-center gap-2 p-1.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors group/item"
                                    >
                                        <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">
                                            <Cog size={12} />
                                        </div>
                                        <span className="truncate font-medium">B.Sc. in ME</span>
                                    </Link>
                                    <Link
                                        href="/ipe"
                                        className="flex items-center gap-2 p-1.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors group/item"
                                    >
                                        <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">
                                            <Factory size={12} />
                                        </div>
                                        <span className="truncate font-medium">B.Sc. in IPE</span>
                                    </Link>
                                    <Link
                                        href="/ce"
                                        className="flex items-center gap-2 p-1.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors group/item"
                                    >
                                        <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">
                                            <Ruler size={12} />
                                        </div>
                                        <span className="truncate font-medium">B.Sc. in CE</span>
                                    </Link>
                                    <Link
                                        href="/eng"
                                        className="flex items-center gap-2 p-1.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors group/item"
                                    >
                                        <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">
                                            <BookOpen size={12} />
                                        </div>
                                        <span className="truncate font-medium">BA in English</span>
                                    </Link>
                                    <Link
                                        href="/dba"
                                        className="flex items-center gap-2 p-1.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors group/item"
                                    >
                                        <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">
                                            <Briefcase size={12} />
                                        </div>
                                        <span className="truncate font-medium">BBA</span>
                                    </Link>
                                    <Link
                                        href="/ais"
                                        className="flex items-center gap-2 p-1.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors group/item"
                                    >
                                        <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">
                                            <Calculator size={12} />
                                        </div>
                                        <span className="truncate font-medium">BBA in AIS</span>
                                    </Link>
                                    <Link
                                        href="/mba"
                                        className="flex items-center gap-2 p-1.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors group/item"
                                    >
                                        <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">
                                            <GraduationCap size={12} />
                                        </div>
                                        <span className="truncate font-medium">MBA</span>
                                    </Link>
                                    <Link
                                        href="/ma-elt"
                                        className="flex items-center gap-2 p-1.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors group/item sm:col-span-2"
                                    >
                                        <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">
                                            <FlaskConical size={12} />
                                        </div>
                                        <span className="truncate font-medium">MA in English (ELT)</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-white/10">
                                <Link
                                    href="/admission"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-white transition-colors group/adm"
                                >
                                    <span>Explore Admission Eligibility</span>
                                    <ChevronRight size={14} className="group-hover/adm:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
