import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    ShieldCheck,
    Award,
    Cpu,
    Coins,
    Building2,
    Rocket,
    GraduationCap,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Clock,
    Users,
    ChevronRight,
    HeartPulse,
    Compass,
} from 'lucide-react';

type CategoryKey = 'all' | 'academics' | 'campus' | 'career';

interface Pillar {
    id: string;
    category: 'academics' | 'campus' | 'career';
    categoryLabel: string;
    icon: React.ElementType;
    badge: string;
    title: string;
    tagline: string;
    description: string;
    highlights: string[];
    link: string;
    linkText: string;
    color: {
        badgeBg: string;
        badgeText: string;
        iconBg: string;
        iconText: string;
        borderHover: string;
        accentGlow: string;
    };
}

const PILLARS: Pillar[] = [
    {
        id: 'discipline',
        category: 'campus',
        categoryLabel: 'Discipline & Governance',
        icon: ShieldCheck,
        badge: 'Army Welfare Trust',
        title: 'Disciplined Campus & Zero Session-Jam',
        tagline: '100% Punctual Academic Calendar',
        description: 'Under the patronage of the Bangladesh Army Welfare Trust, BAUST guarantees an orderly, politics-free, and ragging-free campus with a strict calendar ensuring timely graduation.',
        highlights: [
            'Guaranteed session-jam free academic progression',
            '24/7 security & peaceful environment inside Saidpur Cantonment',
            'Strict anti-ragging & drug-free campus policies',
        ],
        link: '/about/brief-history',
        linkText: 'Learn About Governance',
        color: {
            badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
            badgeText: 'text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/60',
            iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white',
            borderHover: 'group-hover:border-emerald-500/40',
            accentGlow: 'from-emerald-500/10',
        },
    },
    {
        id: 'accreditation',
        category: 'academics',
        categoryLabel: 'Global Accreditation',
        icon: Award,
        badge: 'IEB & BAETE Accredited',
        title: 'Accredited Engineering Excellence',
        tagline: 'Washington Accord Aligned Curriculum',
        description: 'Engineering programs (CSE, ME, IPE) are accredited by the Institution of Engineers, Bangladesh (IEB) and BAETE, validating global educational equivalence and professional recognition.',
        highlights: [
            'Outcome-Based Education (OBE) aligned with global standards',
            'IEB & BAETE accreditation for engineering disciplines',
            'UGC approved degrees recognized by worldwide universities',
        ],
        link: '/about/accreditation',
        linkText: 'View Accreditation Status',
        color: {
            badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
            badgeText: 'text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/60',
            iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white',
            borderHover: 'group-hover:border-blue-500/40',
            accentGlow: 'from-blue-500/10',
        },
    },
    {
        id: 'waivers',
        category: 'career',
        categoryLabel: 'Scholarships & Aid',
        icon: Coins,
        badge: 'Up to 100% Waiver',
        title: 'Generous Merit Scholarships & Waivers',
        tagline: 'Rewarding Talent & Assisting Families',
        description: 'We believe talent should thrive without financial hindrance. BAUST grants up to 100% tuition waivers for GPA 5.00 holders, continuous semester merit awards, and dedicated quota benefits.',
        highlights: [
            '100% tuition waiver for Golden GPA 5.00 in SSC & HSC',
            'Semester-wise merit waivers for top GPA achievers in every batch',
            'Dedicated waivers for military personnel wards and freedom fighters',
        ],
        link: '/admission/waiver-and-financial-aid',
        linkText: 'Check Waiver Policies',
        color: {
            badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
            badgeText: 'text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/60',
            iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white',
            borderHover: 'group-hover:border-amber-500/40',
            accentGlow: 'from-amber-500/10',
        },
    },
    {
        id: 'laboratories',
        category: 'academics',
        categoryLabel: 'Practical Innovation',
        icon: Cpu,
        badge: '40+ Specialized Labs',
        title: 'Cutting-Edge Laboratories & Research',
        tagline: 'Theory Transformed into Practice',
        description: 'Equipped with modern CNC machinery, fluid mechanics apparatus, robotics kits, and computing clusters with high-speed internet to mentor future innovators and researchers.',
        highlights: [
            '40+ specialized labs spanning Computing, Mechanical, Civil & EEE',
            'High-speed optical fiber connectivity',
            'Active research mentorship and IEEE Student Branch activities',
        ],
        link: '/facilities#laboratories',
        linkText: 'Explore Laboratories',
        color: {
            badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
            badgeText: 'text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/60',
            iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white',
            borderHover: 'group-hover:border-purple-500/40',
            accentGlow: 'from-purple-500/10',
        },
    },
    {
        id: 'residential',
        category: 'campus',
        categoryLabel: 'Campus Community',
        icon: Building2,
        badge: '100% Residential Living',
        title: 'Serene Halls & Holistic Student Life',
        tagline: 'A True Home Away From Home',
        description: 'Dedicated on-campus halls for male and female students with high-speed Wi-Fi, hygienic cafeteria dining, indoor gymnasiums, sports grounds, and on-campus healthcare.',
        highlights: [
            'Separate residential halls: Abbas Uddin, Taramon Bibi & Dr. Zikrul Haque',
            'Full campus healthcare center with 24/7 medical & ambulance service',
            'Vibrant student clubs: Programming, Robotics, Debating & Cultural',
        ],
        link: '/facilities#residential',
        linkText: 'View Residential Life',
        color: {
            badgeBg: 'bg-teal-50 dark:bg-teal-950/60',
            badgeText: 'text-teal-700 dark:text-teal-300 border-teal-200/60 dark:border-teal-800/60',
            iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:bg-teal-600 group-hover:text-white',
            borderHover: 'group-hover:border-teal-500/40',
            accentGlow: 'from-teal-500/10',
        },
    },
    {
        id: 'career',
        category: 'career',
        categoryLabel: 'Career & Industry',
        icon: Rocket,
        badge: 'Industry & Defense',
        title: 'Career Pathways & Military Linkages',
        tagline: 'Prepared for National & Global Impact',
        description: 'Graduates excel across leading multinational corporations, tech giants, telecom operators, and receive distinct guidance for Armed Forces Technical Commission and overseas graduate studies.',
        highlights: [
            'Direct grooming & pathway guidance for Armed Forces Commissioning',
            'Strong industry partnerships, internships & hands-on practical training',
            'Thriving alumni network across prestigious MNCs & engineering bodies',
        ],
        link: '/admission',
        linkText: 'Explore Admission Gateways',
        color: {
            badgeBg: 'bg-indigo-50 dark:bg-indigo-950/60',
            badgeText: 'text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/60',
            iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white',
            borderHover: 'group-hover:border-indigo-500/40',
            accentGlow: 'from-indigo-500/10',
        },
    },
];

const STATS = [
    { label: 'Established by Army Trust', value: '2015', icon: Clock },
    { label: 'Academic Departments', value: '10', icon: GraduationCap },
    { label: 'Advanced Laboratories', value: '40+', icon: Cpu },
    { label: 'Session-Jam Free Record', value: '100%', icon: ShieldCheck },
];

export default function WhyChooseBAUST() {
    const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

    const filteredPillars = activeCategory === 'all'
        ? PILLARS
        : PILLARS.filter((p) => p.category === activeCategory);

    return (
        <section id="why-choose-baust" className="py-20 lg:py-28 bg-[#fafafa] dark:bg-gray-900 relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[22rem] bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60 mb-4 tracking-wide uppercase shadow-xs">
                        <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400" />
                        The BAUST Advantage
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Why Choose <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">BAUST?</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Combining the disciplined environment of Saidpur Cantonment with accredited technical curricula, cutting-edge laboratories, and a student-centric culture of excellence.
                    </p>

                    {/* Trust Assurance Pills */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-gray-800 shadow-xs border border-gray-200/70 dark:border-gray-700">
                            <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
                            Army Welfare Trust Patronage
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-gray-800 shadow-xs border border-gray-200/70 dark:border-gray-700">
                            <Award size={14} className="text-blue-600 dark:text-blue-400" />
                            IEB & BAETE Accredited Programs
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-gray-800 shadow-xs border border-gray-200/70 dark:border-gray-700">
                            <Clock size={14} className="text-amber-600 dark:text-amber-400" />
                            Zero Session-Jam Guarantee
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-gray-800 shadow-xs border border-gray-200/70 dark:border-gray-700">
                            <Building2 size={14} className="text-teal-600 dark:text-teal-400" />
                            Lush Green, Secure Cantonment Campus
                        </span>
                    </div>
                </div>

                {/* Category Filter Tabs */}
                {/* 2x2 grid on phones (a centred, scrolling row clipped the first tab), one row from sm up */}
                <div className="flex justify-center mb-10">
                    <div className="grid grid-cols-2 w-full max-w-md sm:max-w-none sm:w-auto sm:inline-flex p-1.5 rounded-2xl bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700 shadow-xs gap-1">
                        {[
                            { key: 'all', label: 'All Strengths' },
                            { key: 'academics', label: 'Academics & Labs' },
                            { key: 'campus', label: 'Discipline & Campus' },
                            { key: 'career', label: 'Waivers & Careers' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveCategory(tab.key as CategoryKey)}
                                className={`px-3 sm:px-4 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-center transition-all duration-200 whitespace-nowrap cursor-pointer touch-manipulation ${
                                    activeCategory === tab.key
                                        ? 'bg-emerald-600 text-white shadow-xs'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filteredPillars.map((p) => {
                        const Icon = p.icon;
                        return (
                            <div
                                key={p.id}
                                className={`group relative bg-white dark:bg-gray-800 rounded-3xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${p.color.borderHover}`}
                            >
                                {/* Subtle Corner Glow */}
                                <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${p.color.accentGlow} to-transparent rounded-bl-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />

                                <div className="relative z-10">
                                    {/* Top Bar: Icon + Badge */}
                                    <div className="flex items-center justify-between gap-3 mb-5">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xs ${p.color.iconBg}`}>
                                            <Icon size={24} />
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border tracking-wide uppercase ${p.color.badgeBg} ${p.color.badgeText}`}>
                                            {p.badge}
                                        </span>
                                    </div>

                                    {/* Titles */}
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                        {p.title}
                                    </h3>
                                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                                        {p.tagline}
                                    </p>

                                    {/* Description */}
                                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {p.description}
                                    </p>

                                    {/* Key Bullet Points */}
                                    <ul className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700/60 space-y-2.5">
                                        {p.highlights.map((h, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                                                <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                                <span className="leading-snug">{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card Footer Link */}
                                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700/60 relative z-10">
                                    <Link
                                        href={p.link}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 group/link transition-colors"
                                    >
                                        <span>{p.linkText}</span>
                                        <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Stats Ribbon Strip */}
                <div className="mt-14 lg:mt-20 bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 rounded-3xl p-8 sm:p-10 shadow-xl text-white relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                        {STATS.map((s, idx) => {
                            const StatIcon = s.icon;
                            return (
                                <div key={idx} className={`pt-4 md:pt-0 ${idx % 2 === 0 ? '' : 'sm:border-l-0'} flex flex-col items-center justify-center`}>
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3 text-emerald-300 shadow-inner">
                                        <StatIcon size={20} />
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                                        {s.value}
                                    </div>
                                    <div className="text-xs sm:text-sm text-emerald-200/90 font-medium mt-1">
                                        {s.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Call to Action Banner */}
                <div className="mt-10 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200/80 dark:border-gray-700 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="max-w-xl text-center md:text-left">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            Join Our Next Academic Cohort
                        </span>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                            Ready to Begin Your Future at BAUST?
                        </h4>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Apply online for undergraduate and graduate programs or review complete tuition fee waiver structures.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                        <Link
                            href="/admission"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <span>Apply Online Now</span>
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/admission/tuition-fees"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold text-sm transition-all duration-200"
                        >
                            <span>Tuition Fees & Waivers</span>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
