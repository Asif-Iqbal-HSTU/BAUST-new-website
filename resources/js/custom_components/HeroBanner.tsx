import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ArrowRight, GraduationCap, Users, Building2 } from 'lucide-react';
import HeroFeatureGateways from '@/custom_components/HeroFeatureGateways';

// University campus photos for the hero slideshow. Each has WebP copies 960, 1600 and
// 1920 px wide ("/images/hero/hero-1-1600.webp"); the original JPEGs stay for the gallery.
const SLIDES = [
    { base: "/images/hero/hero-1", alt: "BAUST campus", width: 1920, height: 1440 },
    { base: "/images/hero/hero-2", alt: "BAUST campus", width: 1920, height: 1280 },
    { base: "/images/hero/hero-3", alt: "BAUST campus", width: 1920, height: 1280 },
    { base: "/images/hero/hero-4", alt: "BAUST campus", width: 1920, height: 1280 },
    { base: "/images/hero/hero-5", alt: "BAUST campus", width: 1920, height: 1280 },
    { base: "/images/hero/hero-6", alt: "BAUST campus", width: 1920, height: 1280 },
    { base: "/images/hero/hero-7", alt: "BAUST campus", width: 1920, height: 1280 },
];
const slideSrcSet = (base: string) => `${base}-960.webp 960w, ${base}-1600.webp 1600w, ${base}-1920.webp 1920w`;
// The photo covers a fixed-height box (640/780/880/940 px), so on narrow screens it is
// drawn wider than the viewport.
const SLIDE_SIZES = '(max-width: 639px) 900px, (max-width: 1023px) 1320px, (max-width: 1439px) 1440px, 100vw';
// Fallbacks used when the page is rendered without server-provided stats.
const ACTIVE_STUDENTS = 3643;
const DEFAULT_FACULTY = 226;
const DEFAULT_DEPARTMENTS = 10;

// Counts from 0 up to `target` with an ease-out curve once `start` becomes true.
function useCountUp(target: number, start: boolean, duration = 2000) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!start) return;
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            setValue(target);
            return;
        }

        let frame: number;
        const startTime = performance.now();
        const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frame);
    }, [target, start, duration]);

    return value;
}

// Single animated stat row/column
interface StatItemProps {
    icon: React.ElementType;
    value: number;
    label: string;
    start: boolean;
    suffix?: string;
}

const StatItem = ({ icon: Icon, value, label, start, suffix = '+' }: StatItemProps) => {
    const count = useCountUp(value, start);

    return (
        <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left gap-2 lg:gap-4">
            <div className="flex-shrink-0 w-9 h-9 lg:w-12 lg:h-12 flex items-center justify-center rounded-lg bg-green-600/90 text-white shadow-lg">
                <Icon className="w-4 h-4 lg:w-6 lg:h-6" />
            </div>
            <div>
                <div className="font-poppins font-semibold text-xl sm:text-2xl lg:text-4xl leading-none tabular-nums">
                    {count.toLocaleString()}
                    <span className="text-green-400">{suffix}</span>
                </div>
                <div className="mt-1 text-[11px] sm:text-xs lg:text-sm font-light uppercase tracking-wider text-white/75">
                    {label}
                </div>
            </div>
        </div>
    );
};

// Stats card shown beside (desktop) or below (mobile/tablet) the hero text card
const StatsCard = ({ faculty, departments }: { faculty: number; departments: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    // Start counting only when the card scrolls into view.
    useEffect(() => {
        const el = ref.current;
        if (!el || !('IntersectionObserver' in window)) {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const stats = [
        { icon: GraduationCap, value: ACTIVE_STUDENTS, label: 'Active Students' },
        { icon: Users, value: faculty, label: 'Faculty Members' },
        { icon: Building2, value: departments, label: 'Departments', suffix: '' },
    ];

    return (
        <div
            ref={ref}
            className="
                w-full lg:w-72 xl:w-80 flex-shrink-0 rounded-xl
                bg-black/45 shadow-2xl border border-white/10 text-white
                p-4 sm:p-5 lg:p-8
            "
        >
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-white/10">
                {stats.map((stat) => (
                    <div key={stat.label} className="lg:py-5 lg:first:pt-0 lg:last:pb-0">
                        <StatItem {...stat} start={visible} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function HeroBanner({ stats }: { stats?: { faculty: number; departments: number } }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    // How many slides are in the DOM. Only the first is server-rendered (it is the page's LCP
    // image); each later photo is mounted one step before it is shown, so the other six don't
    // compete with it for bandwidth on page load.
    const [mountedSlides, setMountedSlides] = useState(1);

    // Slideshow logic using useEffect and setInterval
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                (prevSlide + 1) % SLIDES.length
            );
        }, 5000); // Change slide every 5 seconds (5000ms)

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        setMountedSlides((n) => Math.max(n, Math.min(currentSlide + 2, SLIDES.length)));
    }, [currentSlide]);

    return (
        <div className="relative">
            <section className="relative w-full h-[640px] sm:h-[780px] md:h-[880px] lg:h-[940px] overflow-hidden">
                {/* 1. SLIDESHOW BACKGROUND */}
                <div className="absolute inset-0">
                    {SLIDES.slice(0, mountedSlides).map((slide, index) => (
                        <img
                            key={index}
                            src={`${slide.base}-1600.webp`}
                            srcSet={slideSrcSet(slide.base)}
                            sizes={SLIDE_SIZES}
                            width={slide.width}
                            height={slide.height}
                            alt={slide.alt}
                            fetchPriority={index === 0 ? 'high' : 'low'}
                            decoding={index === 0 ? 'sync' : 'async'}
                            className={`
                            absolute inset-0 w-full h-full object-cover object-top sm:object-[center_16%] md:object-[center_10%]
                            transition-opacity duration-1000 ease-in-out
                            ${index === currentSlide ? 'opacity-100' : 'opacity-0'}
                        `}
                            // Optional: Add a dark overlay gradient for better text readability
                            style={{ filter: 'brightness(75%)' }}
                        />
                    ))}
                </div>

                {/* 2. CONTENT OVERLAY */}
                <div className="absolute inset-0 flex flex-col lg:flex-row items-stretch lg:items-center justify-center lg:justify-between gap-4 lg:gap-8 max-w-screen-xl mx-auto px-4 md:px-8 pb-16 md:pb-24">
                    {/* 3. TEXT CONTAINER (Clean Dark Overlay without Blur) */}
                    <div
                        className="
                        p-6 md:p-10 rounded-xl max-w-full md:max-w-3xl
                        bg-black/45 shadow-2xl border border-white/10
                        text-white
                    "
                    >
                        <h1 className="font-poppins font-semibold text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
                            Discipline. Knowledge. Morality.
                        </h1>
                        <p className="text-sm md:text-base mb-8 max-w-xl font-light">
                            Committed to academic excellence, moral values, and innovation to shape global citizens and future leaders.
                        </p>

                        {/* 4. CALL-TO-ACTION BUTTONS */}
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <a
                                href="#academics"
                                onClick={(e) => {
                                    const el = document.getElementById('academics');
                                    if (el) {
                                        e.preventDefault();
                                        el.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-lg text-white bg-green-600 hover:bg-green-700 transition duration-300"
                            >
                                View Programs
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </a>
                            <a
                                href="/apply"
                                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-sm font-medium rounded-lg text-white bg-transparent hover:bg-white hover:text-gray-900 transition duration-300"
                            >
                                Apply for Winter 2027
                            </a>
                        </div>
                    </div>

                    {/* 5. ANIMATED STATS CARD */}
                    <StatsCard
                        faculty={stats?.faculty ?? DEFAULT_FACULTY}
                        departments={stats?.departments ?? DEFAULT_DEPARTMENTS}
                    />
                </div>
            </section>

            {/* FEATURE GATEWAYS SECTION (WITH LIVE DESIGN TOGGLE) */}
            <HeroFeatureGateways />
        </div>
    );

}
