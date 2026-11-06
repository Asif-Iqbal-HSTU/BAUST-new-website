import React from 'react';
import {
    ArrowRight,
    ShieldCheck,
    GraduationCap,
    Building2,
    Sparkles,
    CheckCircle2
} from 'lucide-react';

interface ModernCardItem {
    id: string;
    badge: string;
    badgePulse?: boolean;
    image: string;
    imageAlt: string;
    icon: React.ElementType;
    title: string;
    tagline: string;
    summary: string;
    highlights: string[];
    primaryAction: {
        label: string;
        link: string;
    };
    quickChips: {
        label: string;
        link: string;
    }[];
    accentGradient: string;
    badgeStyle: string;
    iconBg: string;
}

const MODERN_CARDS: ModernCardItem[] = [
    {
        id: 'about',
        badge: 'Excellence & Heritage',
        badgePulse: false,
        image: '/images/campus-960.webp',
        imageAlt: 'BAUST Campus Saidpur',
        icon: ShieldCheck,
        title: 'About BAUST',
        tagline: 'Discipline • Knowledge • Morality',
        summary: 'Center of academic excellence in northern Bangladesh, patronized by the Bangladesh Army with UGC approval.',
        highlights: [
            'Patronized by Bangladesh Army & UGC recognized',
            '10 Engineering, Technology & Business departments',
            'Lush green, secure 50+ acre campus in Saidpur'
        ],
        primaryAction: {
            label: 'Explore BAUST Story',
            link: '/about/brief-history'
        },
        quickChips: [
            { label: 'Brief History', link: '/about/brief-history' },
            { label: 'Vision & Mission', link: '/about/vision-mission-objectives' },
            { label: 'Accreditation', link: '/about/accreditation' },
            { label: "VC's Message", link: '/about/message-from-vc' }
        ],
        accentGradient: 'from-emerald-600 via-teal-600 to-green-600',
        badgeStyle: 'bg-emerald-950/80 text-emerald-200 border-emerald-400/30',
        iconBg: 'bg-emerald-600 text-white shadow-emerald-600/30'
    },
    {
        id: 'admission',
        badge: 'Admissions Open • Winter 2027',
        badgePulse: true,
        image: '/images/hero/hero-2-960.webp',
        imageAlt: 'Students and Faculty at BAUST',
        icon: GraduationCap,
        title: 'Admissions',
        tagline: 'Step Toward a High-Impact Career',
        summary: 'Join leading undergraduate and graduate programs with world-class faculty, accredited labs, and industry links.',
        highlights: [
            'Direct online application with real-time tracking',
            'Merit scholarships & tuition fee waivers',
            'BAETE-accredited CSE, ME & IPE programs'
        ],
        primaryAction: {
            label: 'Apply Online Now',
            link: '/admission/apply-online-instruction/'
        },
        quickChips: [
            { label: 'Offered Programs', link: '/admission/program-offering' },
            { label: 'Requirements', link: '/admission/admission-requirements' },
            { label: 'Tuition & Fees', link: '/admission/tuition-fees' },
            { label: 'Waiver & Aid', link: '/admission/waiver-and-financial-aid' }
        ],
        accentGradient: 'from-green-600 via-emerald-600 to-teal-700',
        badgeStyle: 'bg-emerald-900/90 text-emerald-100 border-emerald-300/40',
        iconBg: 'bg-green-600 text-white shadow-green-600/30'
    },
    {
        id: 'facilities',
        badge: '4 Secure Residential Halls',
        badgePulse: false,
        image: '/images/halls/abbas_uddin_hall.jpg',
        imageAlt: 'Residential Hall at BAUST',
        icon: Building2,
        title: 'Hall Facilities & Campus',
        tagline: 'Safe, Vibrant Residential Living',
        summary: 'Comfortable, fully-secured on-campus living with 2 male and 2 female halls, modern dining, and high-speed Wi-Fi.',
        highlights: [
            'Separate male and female halls with provost supervision',
            'Central library, modern dining & campus Wi-Fi',
            '24/7 medical center, emergency care & sports grounds'
        ],
        primaryAction: {
            label: 'Explore Halls & Facilities',
            link: '/facilities#residential'
        },
        quickChips: [
            { label: 'Residential Halls', link: '/facilities#residential' },
            { label: 'Central Library', link: '/facilities/library' },
            { label: 'Laboratories', link: '/facilities#laboratories' },
            { label: 'Cafeteria & Health', link: '/facilities#cafeteria' }
        ],
        accentGradient: 'from-teal-600 via-emerald-700 to-green-700',
        badgeStyle: 'bg-teal-950/80 text-teal-200 border-teal-400/30',
        iconBg: 'bg-teal-600 text-white shadow-teal-600/30'
    }
];

const ModernShowcaseCard = ({ card }: { card: ModernCardItem }) => {
    const Icon = card.icon;

    return (
        <div
            className="
                group flex flex-col h-full bg-white rounded-2xl
                shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.14)]
                border border-gray-100 hover:border-emerald-200/80
                transition-all duration-300 transform hover:-translate-y-1.5
                overflow-hidden
            "
        >
            {/* Image Header with Badge Overlay */}
            <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-900">
                <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.82] group-hover:brightness-[0.9]"
                    loading="lazy"
                />
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <span
                        className={`
                            inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                            backdrop-blur-md border shadow-sm ${card.badgeStyle}
                        `}
                    >
                        {card.badgePulse && (
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
                            </span>
                        )}
                        {!card.badgePulse && <Sparkles className="w-3 h-3 text-emerald-300" />}
                        {card.badge}
                    </span>

                    {/* Floating Icon Pill */}
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4 text-white" />
                    </div>
                </div>

                {/* Bottom title & tagline over image */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-poppins font-bold text-xl sm:text-2xl tracking-tight drop-shadow-sm text-white">
                        {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-200/90 font-medium">
                        {card.tagline}
                    </p>
                </div>
            </div>

            {/* Card Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {card.summary}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-5">
                        {card.highlights.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-snug">{point}</span>
                            </div>
                        ))}
                    </div>

                    {/* Quick Access Chips */}
                    <div className="pt-3 border-t border-gray-100 mb-5">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
                            Quick Direct Links
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {card.quickChips.map((chip, idx) => (
                                <a
                                    key={idx}
                                    href={chip.link}
                                    className="
                                        text-xs px-2.5 py-1 rounded-md bg-emerald-50/70 hover:bg-emerald-600
                                        text-emerald-900 hover:text-white border border-emerald-100
                                        transition-all duration-200 font-medium
                                    "
                                >
                                    {chip.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Primary CTA Button */}
                <a
                    href={card.primaryAction.link}
                    className="
                        w-full group/btn inline-flex items-center justify-center gap-2
                        py-3 px-4 rounded-xl text-sm font-semibold text-white
                        bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700
                        shadow-md hover:shadow-lg shadow-emerald-700/15
                        transition-all duration-200
                    "
                >
                    <span>{card.primaryAction.label}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </a>
            </div>
        </div>
    );
};

export default function HeroFeatureGateways() {
    return (
        <section id="feature-gateways-container" className="relative z-30 -mt-10 sm:-mt-14 md:-mt-16 mb-6">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {MODERN_CARDS.map((card) => (
                        <ModernShowcaseCard key={card.id} card={card} />
                    ))}
                </div>
            </div>
        </section>
    );
}
