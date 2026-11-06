import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ChevronLeft,
    Calendar,
    ArrowRight,
    Quote,
    Award,
    ShieldCheck,
    ExternalLink
} from 'lucide-react';
import { Link } from '@inertiajs/react';

// Official Home Sliders from baust.edu.bd
const EVENT_SLIDES = [
    {
        id: 1,
        image: "/images/sliders/admission-winter-2027.jpg",
        title: "Admission Open For Winter 2027",
        date: "August 2026",
        category: "Admission Notice",
        badgeColor: "bg-emerald-600 text-white",
        description: "Applications are open for undergraduate & graduate programs with merit scholarships.",
        link: "/admission/apply-online-instruction"
    },
    {
        id: 2,
        image: "/images/sliders/19th-academic-council.jpeg",
        title: "19th Academic Council Meeting",
        date: "August 2026",
        category: "Academic Council",
        badgeColor: "bg-blue-600 text-white",
        description: "Deliberating on academic curricula, educational policies, and institutional standards.",
        link: "/administration/regulatory-bodies/academic-council"
    },
    {
        id: 3,
        image: "/images/sliders/15th-disciplinary-committee.jpeg",
        title: "15th Disciplinary Committee Meeting",
        date: "July 2026",
        category: "Disciplinary Committee",
        badgeColor: "bg-slate-700 text-white",
        description: "Convened at BAUST conference room presided over by the Honourable Vice Chancellor.",
        link: "/administration/regulatory-bodies/discipline-committee"
    },
    {
        id: 4,
        image: "/images/sliders/25th-finance-committee.jpeg",
        title: "25th Finance Committee Meeting",
        date: "June 2026",
        category: "Finance Committee",
        badgeColor: "bg-amber-600 text-white",
        description: "Reviewing institutional budget allocations, development funds, and financial planning.",
        link: "/administration/regulatory-bodies/finance-committee"
    },
    {
        id: 5,
        image: "/images/sliders/goc-visit.jpg",
        title: "GOC, 66 Infantry Division Visits BAUST",
        date: "April 2026",
        category: "Patronage & Visit",
        badgeColor: "bg-emerald-700 text-white",
        description: "Area Commander, Rangpur Area reviews university development, laboratories, and campus facilities.",
        link: "/about/brief-history"
    },
    {
        id: 6,
        image: "/images/sliders/pohela-boishakh.jpeg",
        title: "Pohela Boishakh 1433 Celebration",
        date: "April 2026",
        category: "Cultural Festival",
        badgeColor: "bg-rose-600 text-white",
        description: "Traditional Bengali New Year cultural festivities, music, and colorful celebrations.",
        link: "/facilities"
    },
    {
        id: 7,
        image: "/images/sliders/11th-raising-day.jpeg",
        title: "11th Raising Day of BAUST",
        date: "February 2026",
        category: "University Heritage",
        badgeColor: "bg-indigo-600 text-white",
        description: "Commemorating the founding anniversary and institutional milestones of BAUST Saidpur.",
        link: "/about/brief-history"
    }
];

export default function VCMessage() {
    const [currentEvent, setCurrentEvent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const totalEvents = EVENT_SLIDES.length;

    const nextEvent = () => {
        setCurrentEvent((prev) => (prev + 1) % totalEvents);
    };

    const prevEvent = () => {
        setCurrentEvent((prev) => (prev - 1 + totalEvents) % totalEvents);
    };

    // Auto-advance slides every 5s unless hovered
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentEvent((prev) => (prev + 1) % totalEvents);
        }, 5000);

        return () => clearInterval(interval);
    }, [totalEvents, isHovered]);

    const activeSlide = EVENT_SLIDES[currentEvent];

    return (
        <section className="relative py-14 sm:py-18 bg-gradient-to-b from-white via-slate-50/60 to-white">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
                
                {/* Two Equal-Height Elevated Executive Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    
                    {/* ======================================================== */}
                    {/* LEFT CARD: VICE CHANCELLOR'S MESSAGE                     */}
                    {/* ======================================================== */}
                    <div className="
                        group bg-white rounded-3xl p-6 sm:p-8 lg:p-9
                        border border-slate-200/80 hover:border-emerald-300
                        shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.12)]
                        transition-all duration-300 flex flex-col justify-between
                        relative overflow-hidden
                    ">
                        {/* Top decorative gradient line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600" />
                        
                        {/* Decorative watermark quote icon */}
                        <div className="absolute -top-4 -right-4 text-emerald-600/5 group-hover:text-emerald-600/10 transition-colors pointer-events-none">
                            <Quote size={150} />
                        </div>

                        <div>
                            {/* Card Header */}
                            <div className="flex items-center justify-between gap-3 mb-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold">
                                    <ShieldCheck size={14} className="text-emerald-600" />
                                    <span>Executive Leadership</span>
                                </div>
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                    Founded 2015
                                </span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                                Vice Chancellor's Message
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 mb-6">
                                Academic distinction, discipline, and human resource development
                            </p>

                            {/* Portrait & Message Body */}
                            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start mb-6">
                                {/* VC Portrait Frame */}
                                <div className="shrink-0 mx-auto sm:mx-0 relative">
                                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden ring-4 ring-emerald-500/15 shadow-md bg-slate-100">
                                        <img
                                            src="/images/VC_Sir-480.webp"
                                            width={480}
                                            height={518}
                                            loading="lazy"
                                            decoding="async"
                                            alt="Brig Gen Mohammad Mobarak Hossain Majumder, psc - Vice Chancellor BAUST"
                                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1.5 rounded-lg shadow-md" title="Army-Patronized Leadership">
                                        <Award size={14} />
                                    </div>
                                </div>

                                {/* Quote Excerpt */}
                                <div className="flex-1 space-y-3">
                                    <div className="relative pl-4 border-l-3 border-emerald-500 bg-emerald-50/40 p-3 rounded-r-xl">
                                        <p className="italic text-slate-800 text-sm font-medium leading-relaxed">
                                            "Patronized by Bangladesh Army, the University aspires to transform itself into a centre of excellence in Science, Engineering, Technology, Business Studies and Arts..."
                                        </p>
                                    </div>

                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                                        Bangladesh Army University of Science and Technology (BAUST), Saidpur was founded in 2015 by Bangladesh Army with due permission from the Govt and UGC to provide state-of-the-art education and research for socioeconomic well-being.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* VC Profile Footer Dock */}
                        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                            <div className="text-center sm:text-left">
                                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                                    Brig Gen Mohammad Mobarak Hossain Majumder, psc
                                </h3>
                                <p className="text-xs font-semibold text-emerald-700 mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Vice Chancellor, BAUST
                                </p>
                            </div>

                            <Link
                                href="/about/message-from-vc"
                                className="
                                    shrink-0 inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl
                                    bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700
                                    text-white text-xs font-semibold shadow-sm hover:shadow-md shadow-emerald-600/20
                                    transition-all duration-200 group/btn
                                "
                            >
                                <span>Read Full Message</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>


                    {/* ======================================================== */}
                    {/* RIGHT CARD: OFFICIAL BAUST HOME SLIDERS SHOWCASE        */}
                    {/* ======================================================== */}
                    <div 
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="
                            group bg-white rounded-3xl p-6 sm:p-8 lg:p-9
                            border border-slate-200/80 hover:border-emerald-300
                            shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.12)]
                            transition-all duration-300 flex flex-col justify-between
                            relative overflow-hidden
                        "
                    >
                        {/* Top decorative gradient line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-600 to-green-600" />

                        <div>
                            {/* Card Header with Slider Controls */}
                            <div className="flex items-center justify-between gap-3 mb-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200/80 text-xs font-semibold">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                                    </span>
                                    <span>Campus Spotlight</span>
                                </div>

                                {/* Slider Navigation Arrows & Counter */}
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono font-bold text-slate-400">
                                        0{currentEvent + 1} / 0{totalEvents}
                                    </span>
                                    <div className="inline-flex gap-1">
                                        <button
                                            onClick={prevEvent}
                                            className="w-7 h-7 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 flex items-center justify-center transition-all cursor-pointer"
                                            aria-label="Previous Slide"
                                        >
                                            <ChevronLeft size={15} />
                                        </button>
                                        <button
                                            onClick={nextEvent}
                                            className="w-7 h-7 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 flex items-center justify-center transition-all cursor-pointer"
                                            aria-label="Next Slide"
                                        >
                                            <ChevronRight size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                                Important Events
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 mb-6">
                                Academic meetings, campus activities & official developments
                            </p>

                            {/* Main Animated Slider Visual */}
                            <div className="relative h-56 sm:h-60 rounded-2xl overflow-hidden bg-slate-950 shadow-md">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeSlide.id}
                                        initial={{ opacity: 0, scale: 1.04 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute inset-0"
                                    >
                                        <img
                                            src={activeSlide.image}
                                            alt={activeSlide.title}
                                            className="w-full h-full object-cover object-center brightness-[0.85]"
                                            onError={(e) => {
                                                // Fallback if image fails
                                                e.currentTarget.src = "/images/campus-960.webp";
                                            }}
                                        />
                                        {/* Multi-stop gradient vignette */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

                                        {/* Floating Category & Date Badges */}
                                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                                            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs ${activeSlide.badgeColor}`}>
                                                {activeSlide.category}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-black/50 text-white backdrop-blur-md border border-white/20">
                                                <Calendar size={13} className="text-emerald-300" />
                                                <span>{activeSlide.date}</span>
                                            </span>
                                        </div>

                                        {/* Bottom Overlay Info with Clickable Link */}
                                        <div className="absolute bottom-3 left-4 right-4 text-white">
                                            <a 
                                                href={activeSlide.link}
                                                className="block group/link"
                                            >
                                                <h3 className="font-poppins font-bold text-lg sm:text-xl drop-shadow-sm text-white mb-1 leading-tight group-hover/link:text-emerald-300 transition-colors">
                                                    {activeSlide.title}
                                                </h3>
                                            </a>
                                            <p className="text-xs text-slate-200 line-clamp-1 font-normal opacity-90">
                                                {activeSlide.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Slider Progress Bar Indicators & Bottom Link */}
                        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                            {/* Segmented Progress Indicators */}
                            <div className="flex items-center gap-1.5">
                                {EVENT_SLIDES.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentEvent(idx)}
                                        className={`
                                            h-1.5 rounded-full transition-all duration-300 cursor-pointer
                                            ${idx === currentEvent ? 'w-7 bg-emerald-600' : 'w-2 bg-slate-200 hover:bg-slate-300'}
                                        `}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Direct Link to Notices & Events */}
                            <a
                                href="#notices"
                                onClick={(e) => {
                                    const el = document.getElementById('notices');
                                    if (el) {
                                        e.preventDefault();
                                        el.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors group/link"
                            >
                                <span>All Notices & Events</span>
                                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
