import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import {
    BookOpen,
    Clock,
    UserCheck,
    Globe,
    Library,
    PhoneCall,
    Mail,
    Phone,
    ArrowUpRight,
    CheckCircle2,
    Search,
    Award,
    Compass,
    Monitor,
    Zap,
    Settings,
    Factory,
    HardHat,
    Briefcase,
    BookText,
    ExternalLink,
    ShieldAlert,
    MapPin,
    Calendar,
    ChevronRight,
} from 'lucide-react';

interface Stat {
    value: string;
    label: string;
}

interface EResource {
    name: string;
    url: string;
}

interface DepartmentCollection {
    name: string;
    code: string;
    description: string;
}

interface SeasonalSchedule {
    title: string;
    time: string;
    description: string;
    date_range: string;
}

interface WeeklyDay {
    days: string;
    status: string;
    closed: boolean;
}

interface MembershipStep {
    title: string;
    description: string;
}

interface GalleryPhoto {
    title: string;
    caption: string;
    image: string;
    image_alt: string;
    fallback_image: string;
}

interface ContactMethod {
    label: string;
    value: string;
    link: string;
}

export interface LibraryContent {
    browser_title: string;
    hero: { title: string; subtitle: string };
    stats: Stat[];
    tab_labels: {
        overview: string;
        membership: string;
        resources: string;
        collections: string;
        gallery: string;
    };
    overview: {
        badge: string;
        heading: string;
        paragraphs: string[];
        catalog_button_label: string;
        catalog_link: string;
        image: string;
        image_alt: string;
        fallback_image: string;
        mission_title: string;
        mission_text: string;
        vision_title: string;
        vision_text: string;
    };
    opening_hours: {
        badge: string;
        heading: string;
        description: string;
        seasonal_schedules: SeasonalSchedule[];
        weekly_title: string;
        weekly_days: WeeklyDay[];
        location: string;
    };
    membership: {
        badge: string;
        heading: string;
        description: string;
        steps: MembershipStep[];
        account_title: string;
        account_text: string;
        account_button_label: string;
        account_link: string;
    };
    policies: {
        kicker: string;
        heading: string;
        description: string;
        rule_label: string;
        rules: string[];
    };
    e_resources: {
        badge: string;
        heading: string;
        description: string;
        wiley_title: string;
        wiley_text: string;
        wiley_catalogue_label: string;
        wiley_catalogue_link: string;
        image: string;
        image_alt: string;
        fallback_image: string;
        consortium_heading: string;
        consortium_description: string;
        consortium_resources: EResource[];
        open_access_heading: string;
        open_access_description: string;
        open_access_resources: EResource[];
    };
    collections: {
        badge: string;
        heading: string;
        description: string;
        departments: DepartmentCollection[];
        card_footer_label: string;
        search_button_label: string;
        search_link: string;
        cta_heading: string;
        cta_description: string;
        cta_button_label: string;
        cta_link: string;
    };
    gallery: {
        kicker: string;
        heading: string;
        description: string;
        photos: GalleryPhoto[];
    };
    contacts: {
        kicker: string;
        heading: string;
        description: string;
        contact_name: string;
        contact_designation: string;
        contact_office: string;
        contact_methods: ContactMethod[];
    };
}

/** Swap a broken image for its configured placeholder (once, to avoid loops). */
function imageFallback(fallback: string) {
    return (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (fallback && e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
    };
}

export default function LibraryRedesign({ content }: { content: LibraryContent }) {
    const [activeTab, setActiveTab] = useState<'overview' | 'membership' | 'resources' | 'collections' | 'gallery'>('overview');
    const { overview, opening_hours: hours, membership, policies, e_resources: eres, collections, gallery, contacts } = content;

    const tabs = [
        { id: 'overview', name: content.tab_labels.overview, icon: BookOpen },
        { id: 'membership', name: content.tab_labels.membership, icon: UserCheck },
        { id: 'resources', name: content.tab_labels.resources, icon: Globe },
        { id: 'collections', name: content.tab_labels.collections, icon: Library },
        { id: 'gallery', name: content.tab_labels.gallery, icon: PhoneCall },
    ] as const;

    const getDeptIcon = (code: string) => {
        switch (code.toUpperCase()) {
            case 'CSE': return <Monitor className="w-6 h-6 text-emerald-600" />;
            case 'EEE': return <Zap className="w-6 h-6 text-emerald-600" />;
            case 'ME': return <Settings className="w-6 h-6 text-emerald-600" />;
            case 'IPE': return <Factory className="w-6 h-6 text-emerald-600" />;
            case 'CE': return <HardHat className="w-6 h-6 text-emerald-600" />;
            case 'BBA': return <Briefcase className="w-6 h-6 text-emerald-600" />;
            case 'ENGLISH': return <BookText className="w-6 h-6 text-emerald-600" />;
            default: return <BookOpen className="w-6 h-6 text-emerald-600" />;
        }
    };

    const resourceGrid = (resources: EResource[]) => (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((res, i) => (
                <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex items-center justify-between group"
                >
                    <span className="text-[13.5px] font-bold text-gray-700 group-hover:text-emerald-800 transition-colors pr-2 leading-tight">
                        {res.name}
                    </span>
                    <ArrowUpRight size={16} className="text-gray-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                </a>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={content.browser_title} />
            <Navbar />

            <PageHero
                title={content.hero.title}
                subtitle={content.hero.subtitle}
            />

            {/* Quick Metrics / Hero Sub-banner */}
            <div className="bg-emerald-900 text-white py-6 border-b border-emerald-800 shadow-md">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {content.stats.map((stat, i) => (
                        <div key={i} className="border-r border-emerald-800 last:border-r-0 py-2">
                            <div className="text-3xl font-black text-emerald-300">{stat.value}</div>
                            <div className="text-xs uppercase tracking-wider text-emerald-100 font-semibold mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* TAB SWITCHER */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-2 rounded-[2.2rem] shadow-lg border border-emerald-100 flex flex-wrap justify-center gap-1.5 md:gap-2 max-w-full overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-[13.5px] font-bold transition-all duration-300 cursor-pointer ${
                                        isActive
                                            ? 'bg-[#0f5132] text-white shadow-md shadow-emerald-950/20'
                                            : 'text-gray-600 hover:text-[#0f5132] hover:bg-emerald-50'
                                    }`}
                                >
                                    <Icon size={17} />
                                    <span>{tab.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* TAB CONTENT - OVERVIEW */}
                {activeTab === 'overview' && (
                    <div className="space-y-16 animate-[fadeIn_0.5s_ease-out]">

                        {/* Intro Grid */}
                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                            <div className="w-full lg:w-1/2 space-y-6">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                                    <Award size={12} />
                                    {overview.badge}
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                                    {overview.heading}
                                </h2>
                                {overview.paragraphs.map((p, i) => (
                                    <p key={i} className="text-gray-600 text-[16.5px] leading-relaxed text-justify">
                                        {p}
                                    </p>
                                ))}

                                {overview.catalog_link && (
                                    <div className="pt-4 flex flex-wrap gap-4">
                                        <a
                                            href={overview.catalog_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-[#0f5132] hover:bg-[#0a3622] text-white px-6 py-3.5 rounded-2xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group"
                                        >
                                            <span>{overview.catalog_button_label}</span>
                                            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="w-full lg:w-1/2 relative">
                                <div className="absolute inset-0 bg-emerald-600/10 rounded-[2.5rem] -translate-x-2.5 translate-y-2.5 z-0 pointer-events-none" />
                                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border border-emerald-50 bg-emerald-50/50">
                                    <img
                                        src={overview.image || overview.fallback_image}
                                        alt={overview.image_alt}
                                        className="w-full h-auto object-cover"
                                        onError={imageFallback(overview.fallback_image)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Vision & Mission Split Cards */}
                        <div className="grid md:grid-cols-2 gap-8 pt-6">
                            {[
                                { icon: Compass, title: overview.mission_title, text: overview.mission_text },
                                { icon: Award, title: overview.vision_title, text: overview.vision_text },
                            ].map(({ icon: Icon, title, text }, i) => (
                                <div key={i} className="bg-white rounded-[2.5rem] border border-emerald-100/50 p-10 md:p-12 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[3rem] -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500 pointer-events-none" />
                                    <div className="relative z-10 space-y-6">
                                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800">
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900">{title}</h3>
                                        <p className="text-gray-600 leading-relaxed text-justify">
                                            {text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Library Hours Layout */}
                        <div className="bg-emerald-900 text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 opacity-10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 blur-[80px] translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10 space-y-10">
                                <div className="text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                                        <Clock size={12} />
                                        {hours.badge}
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black">{hours.heading}</h3>
                                    <p className="text-emerald-200/80 text-sm max-w-xl mt-2">
                                        {hours.description}
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {/* Seasonal Timings */}
                                    {hours.seasonal_schedules.map((schedule, i) => (
                                        <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 flex flex-col justify-between h-full">
                                            <div className="space-y-4">
                                                <div className="text-emerald-300 text-xs font-black uppercase tracking-wider">{schedule.title}</div>
                                                <div className="text-2xl font-extrabold">{schedule.time}</div>
                                                <p className="text-emerald-100/70 text-xs leading-relaxed">
                                                    {schedule.description}
                                                </p>
                                            </div>
                                            <div className="mt-6 flex items-center gap-2 text-emerald-300 text-xs font-bold">
                                                <Calendar size={14} />
                                                <span>{schedule.date_range}</span>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Days Open */}
                                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 flex flex-col justify-between h-full sm:col-span-2 lg:col-span-1">
                                        <div className="space-y-4">
                                            <div className="text-emerald-300 text-xs font-black uppercase tracking-wider">{hours.weekly_title}</div>
                                            <div className="space-y-2">
                                                {hours.weekly_days.map((day, i) => (
                                                    <div
                                                        key={i}
                                                        className={`flex justify-between text-[15px] font-bold ${i < hours.weekly_days.length - 1 ? 'border-b border-white/10 pb-1.5' : ''}`}
                                                    >
                                                        <span>{day.days}</span>
                                                        <span className={`${day.closed ? 'text-red-300' : 'text-emerald-300'} font-extrabold`}>{day.status}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center gap-2 text-emerald-300 text-xs font-bold">
                                            <MapPin size={14} />
                                            <span>{hours.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* TAB CONTENT - MEMBERSHIP & POLICY */}
                {activeTab === 'membership' && (
                    <div className="space-y-16 animate-[fadeIn_0.5s_ease-out]">

                        {/* Membership Procedure */}
                        <div className="bg-white rounded-[3rem] border border-emerald-100 p-10 md:p-16 shadow-sm flex flex-col lg:flex-row gap-12 items-center">
                            <div className="w-full lg:w-1/2 space-y-6">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                                    <UserCheck size={12} />
                                    {membership.badge}
                                </span>
                                <h2 className="text-3xl font-black text-gray-900 leading-tight">
                                    {membership.heading}
                                </h2>
                                <p className="text-gray-600 text-base leading-relaxed">
                                    {membership.description}
                                </p>

                                <div className="space-y-4">
                                    {membership.steps.map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center font-bold text-emerald-800 flex-shrink-0">{i + 1}</div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{step.title}</h4>
                                                <p className="text-sm text-gray-600">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 bg-emerald-50 rounded-[2.5rem] p-10 border border-emerald-100 flex flex-col justify-center text-center space-y-6">
                                <Award className="w-16 h-16 text-emerald-800 mx-auto" />
                                <h3 className="text-2xl font-bold text-emerald-950">{membership.account_title}</h3>
                                <p className="text-sm text-gray-700 leading-relaxed max-w-sm mx-auto">
                                    {membership.account_text}
                                </p>
                                {membership.account_link && (
                                    <div className="pt-2">
                                        <a
                                            href={membership.account_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-[#0f5132] hover:bg-[#0a3622] text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 text-sm"
                                        >
                                            <span>{membership.account_button_label}</span>
                                            <ExternalLink size={14} />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Rules and Policies */}
                        <div className="space-y-8">
                            <div className="text-center max-w-xl mx-auto space-y-3">
                                <span className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">{policies.kicker}</span>
                                <h3 className="text-3xl font-black text-gray-900">{policies.heading}</h3>
                                <p className="text-gray-500 text-sm">
                                    {policies.description}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {policies.rules.map((policy, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-8 rounded-[2rem] border border-gray-100/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group h-full"
                                    >
                                        <div className="space-y-4">
                                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 font-bold text-sm">
                                                {index === 4 ? <Clock size={16} /> : <ShieldAlert size={16} />}
                                            </div>
                                            <p className="text-gray-600 text-[14.5px] leading-relaxed">
                                                {policy}
                                            </p>
                                        </div>
                                        <div className="pt-6 text-xs text-gray-400 font-bold uppercase tracking-wider">
                                            {policies.rule_label} {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}

                {/* TAB CONTENT - E-RESOURCES */}
                {activeTab === 'resources' && (
                    <div className="space-y-16 animate-[fadeIn_0.5s_ease-out]">

                        {/* E-Resources Introduction */}
                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                            <div className="w-full lg:w-1/2 space-y-6">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                                    <Globe size={12} />
                                    {eres.badge}
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                                    {eres.heading}
                                </h2>
                                <p className="text-gray-600 text-base leading-relaxed text-justify">
                                    {eres.description}
                                </p>

                                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100/80 space-y-3">
                                    <h4 className="font-extrabold text-emerald-950 flex items-center gap-2">
                                        <CheckCircle2 size={18} className="text-emerald-700" />
                                        {eres.wiley_title}
                                    </h4>
                                    <p className="text-gray-700 text-[13.5px] leading-relaxed text-justify">
                                        {eres.wiley_text}
                                    </p>
                                    {eres.wiley_catalogue_link && (
                                        <div className="pt-2">
                                            <a
                                                href={eres.wiley_catalogue_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 hover:text-emerald-950 hover:underline"
                                            >
                                                <span>{eres.wiley_catalogue_label}</span>
                                                <ChevronRight size={14} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 relative">
                                <div className="absolute inset-0 bg-emerald-600/10 rounded-[2.5rem] translate-x-2.5 -translate-y-2.5 z-0 pointer-events-none" />
                                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border border-emerald-50 bg-emerald-50/50">
                                    <img
                                        src={eres.image || eres.fallback_image}
                                        alt={eres.image_alt}
                                        className="w-full h-auto object-cover"
                                        onError={imageFallback(eres.fallback_image)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* LiCoB Resources List */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-1.5 bg-emerald-600 rounded-full" />
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-wider">{eres.consortium_heading}</h3>
                                <div className="flex-grow h-px bg-gray-200" />
                            </div>
                            <p className="text-gray-500 text-sm">
                                {eres.consortium_description}
                            </p>

                            {resourceGrid(eres.consortium_resources)}
                        </div>

                        {/* Open Access Resources List */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-1.5 bg-emerald-600 rounded-full" />
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-wider">{eres.open_access_heading}</h3>
                                <div className="flex-grow h-px bg-gray-200" />
                            </div>
                            <p className="text-gray-500 text-sm">
                                {eres.open_access_description}
                            </p>

                            {resourceGrid(eres.open_access_resources)}
                        </div>

                    </div>
                )}

                {/* TAB CONTENT - COLLECTIONS OVERVIEW */}
                {activeTab === 'collections' && (
                    <div className="space-y-12 animate-[fadeIn_0.5s_ease-out]">

                        <div className="max-w-3xl space-y-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                                <Library size={12} />
                                {collections.badge}
                            </span>
                            <h2 className="text-3xl font-black text-gray-900">
                                {collections.heading}
                            </h2>
                            <p className="text-gray-600 text-base leading-relaxed text-justify">
                                {collections.description}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {collections.departments.map((dept, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-500 group relative flex flex-col justify-between h-full"
                                >
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                                {getDeptIcon(dept.code)}
                                            </div>
                                            <span className="text-[10px] font-black tracking-widest text-[#0f5132]/60 uppercase bg-emerald-50/50 px-2.5 py-1 rounded-md border border-emerald-100/30">
                                                {dept.code}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="text-xl font-extrabold text-gray-900 group-hover:text-emerald-800 transition-colors">
                                                {dept.name}
                                            </h4>
                                            <p className="text-gray-500 text-[13.5px] leading-relaxed">
                                                {dept.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-4 border-t border-dashed border-gray-100 flex items-center justify-between">
                                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{collections.card_footer_label}</span>
                                        {collections.search_link && (
                                            <a
                                                href={collections.search_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-black text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group/link"
                                            >
                                                <span>{collections.search_button_label}</span>
                                                <ChevronRight size={14} className="transition-transform group-hover/link:translate-x-0.5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Catalog CTA */}
                        <div className="bg-emerald-900 rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-800 via-emerald-900 to-[#052214] opacity-50 z-0" />
                            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                                <Search className="w-12 h-12 text-emerald-300 mx-auto" />
                                <h3 className="text-2xl md:text-3xl font-black">{collections.cta_heading}</h3>
                                <p className="text-emerald-100/70 text-sm leading-relaxed">
                                    {collections.cta_description}
                                </p>
                                {collections.cta_link && (
                                    <div className="pt-2">
                                        <a
                                            href={collections.cta_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-md text-sm"
                                        >
                                            <span>{collections.cta_button_label}</span>
                                            <ExternalLink size={14} />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                )}

                {/* TAB CONTENT - GALLERY & CONTACTS */}
                {activeTab === 'gallery' && (
                    <div className="space-y-16 animate-[fadeIn_0.5s_ease-out]">

                        {/* Gallery Section */}
                        <div className="space-y-8">
                            <div className="text-center max-w-xl mx-auto space-y-3">
                                <span className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">{gallery.kicker}</span>
                                <h3 className="text-3xl font-black text-gray-900">{gallery.heading}</h3>
                                <p className="text-gray-500 text-sm">
                                    {gallery.description}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {gallery.photos.map((photo, i) => (
                                    <div key={i} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 relative flex flex-col">
                                        <div className="overflow-hidden relative flex-grow aspect-video bg-emerald-50 flex items-center justify-center">
                                            <img
                                                src={photo.image || photo.fallback_image}
                                                alt={photo.image_alt || photo.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-750"
                                                onError={imageFallback(photo.fallback_image)}
                                            />
                                        </div>
                                        <div className="p-6 text-center border-t border-gray-50 bg-white">
                                            <h4 className="font-extrabold text-gray-800 text-[15px]">{photo.title}</h4>
                                            <p className="text-xs text-gray-400 mt-1">{photo.caption}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contacts Section */}
                        <div className="space-y-8 pt-4">
                            <div className="text-center max-w-xl mx-auto space-y-3">
                                <span className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">{contacts.kicker}</span>
                                <h3 className="text-3xl font-black text-gray-900">{contacts.heading}</h3>
                                <p className="text-gray-500 text-sm">
                                    {contacts.description}
                                </p>
                            </div>

                            <div className="max-w-xl mx-auto bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-10 shadow-lg relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[3rem] pointer-events-none" />

                                <div className="space-y-6 relative z-10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800">
                                        <PhoneCall size={26} />
                                    </div>

                                    <div className="space-y-1">
                                        <h4 className="text-2xl font-black text-gray-900">{contacts.contact_name}</h4>
                                        <p className="text-[#0f5132] font-bold text-sm">{contacts.contact_designation}</p>
                                        <p className="text-xs text-gray-400 font-semibold uppercase mt-0.5">{contacts.contact_office}</p>
                                    </div>

                                    <div className="w-full pt-6 border-t border-gray-100 flex flex-col gap-4 text-left">
                                        {contacts.contact_methods.map((method, i) => {
                                            const MethodIcon = method.link.startsWith('mailto:') ? Mail : Phone;
                                            return (
                                                <a
                                                    key={i}
                                                    href={method.link}
                                                    className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-emerald-50/50 group/item transition-colors"
                                                >
                                                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-[#0f5132] group-hover/item:bg-[#0f5132] group-hover/item:text-white transition-all">
                                                        <MethodIcon size={16} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{method.label}</span>
                                                        <span className="text-sm font-bold text-gray-700">{method.value}</span>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

            </main>

            <Footer />
        </div>
    );
}
