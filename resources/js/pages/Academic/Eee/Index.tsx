import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { EEE_TABS, EEE_DEPT_NAME, NOTICES, FacultyMember } from '@/data/eeeData';
import {
    ChevronLeft,
    ChevronRight,
    Cpu,
    BookOpen,
    Award,
    Briefcase,
    GraduationCap,
    FlaskConical,
    Users,
    Globe,
    Building2,
    Lightbulb,
    Layers,
    Target,
    Trophy,
    ShieldCheck,
    Sparkles,
    Zap,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-7 h-7" />,
    BookOpen: <BookOpen className="w-7 h-7" />,
    Award: <Award className="w-7 h-7" />,
    Briefcase: <Briefcase className="w-7 h-7" />,
    GraduationCap: <GraduationCap className="w-7 h-7" />,
    FlaskConical: <FlaskConical className="w-7 h-7" />,
    Users: <Users className="w-7 h-7" />,
    Globe: <Globe className="w-7 h-7" />,
    Building2: <Building2 className="w-7 h-7" />,
    Lightbulb: <Lightbulb className="w-7 h-7" />,
    Layers: <Layers className="w-7 h-7" />,
    Target: <Target className="w-7 h-7" />,
    Trophy: <Trophy className="w-7 h-7" />,
    ShieldCheck: <ShieldCheck className="w-7 h-7" />,
    Sparkles: <Sparkles className="w-7 h-7" />,
    Zap: <Zap className="w-7 h-7" />,
};

function renderHighlightIcon(name?: string | null) {
    if (name && ICON_MAP[name]) return ICON_MAP[name];
    return <Zap className="w-7 h-7" />;
}

interface SlideItem {
    id?: number;
    image: string;
    title?: string | null;
    subtitle?: string | null;
    badge?: string | null;
}

interface HighlightItem {
    id?: number;
    icon?: string | null;
    title: string;
    description: string;
}

interface StatItem {
    id?: number;
    value: string;
    label: string;
    icon?: string | null;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
    tagline?: string | null;
    established?: string | null;
    accreditation_badge?: string | null;
    accreditation_title?: string | null;
    accreditation_text?: string | null;
    about?: string | null;
    vision?: string | null;
    mission?: string | null;
    hod_name?: string | null;
    hod_designation?: string | null;
    hod_photo?: string | null;
    hod_message?: string | null;
}

interface Props {
    department?: DeptInfo | null;
    slides?: SlideItem[];
    highlights?: HighlightItem[];
    stats?: StatItem[];
    headOfDept: FacultyMember | null;
    facultyPreview: FacultyMember[];
    notices: any[];
}

const DEFAULT_SLIDES: SlideItem[] = [
    { image: "/images/eee/slides/freshers_reception_farewell_2026.jpg", title: "Fresher's Reception & Farewell Program-2026" },
    { image: "/images/eee/slides/creative_mind_expo_2.jpg", title: "BAUST Creative Mind Expo 2.0" },
    { image: "/images/eee/slides/industrial_visit.jpg", title: "Industrial Visit" },
    { image: "/images/eee/slides/faculty_students_with_vc.jpg", title: "Faculty and Students with Honorable Vice Chancellor" },
    { image: "/images/eee/slides/faculty_members_eee.jpg", title: "Faculty Members of Dept. of EEE" },
    { image: "/images/eee/slides/cultural_night.jpg", title: "Cultural Night" },
    { image: "/images/eee/slides/obe_training_program.jpg", title: "OBE Training Program, Dept. of EEE" },
    { image: "/images/eee/slides/symposium.jpg", title: "Symposium" },
];

const DEFAULT_HIGHLIGHTS: HighlightItem[] = [
    {
        icon: 'Award',
        title: 'BAETE Accredited OBE Curriculum',
        description: 'Washington Accord aligned Outcome Based Education ensuring global mobility and IEB recognition for graduates.',
    },
    {
        icon: 'Cpu',
        title: '11 State-of-the-Art Laboratories',
        description: 'Comprehensive facilities in power systems, electrical machines, switchgear protection, electronics, and digital signal processing.',
    },
    {
        icon: 'Zap',
        title: 'Active IEEE Student Branch & Research',
        description: 'Regular technical symposiums, research publishing in IEEE conferences, and inter-university project exhibitions.',
    },
    {
        icon: 'Briefcase',
        title: 'Direct Industry & Power Sector Partnerships',
        description: 'Hands-on industrial tours to power plants, railway electrical workshops, and high-voltage grid substations.',
    },
];

export default function EeeHome({
    department,
    slides: dbSlides,
    highlights: dbHighlights,
    stats: dbStats,
    headOfDept,
    facultyPreview,
    notices,
}: Props) {
    const [isHeadMsgOpen, setIsHeadMsgOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = dbSlides && dbSlides.length > 0 ? dbSlides : DEFAULT_SLIDES;
    const highlights = dbHighlights && dbHighlights.length > 0 ? dbHighlights : DEFAULT_HIGHLIGHTS;
    const stats = dbStats && dbStats.length > 0 ? dbStats : [
        { label: 'Current Students', value: '450+', icon: 'Users' },
        { label: 'Faculty & Staff', value: '35+', icon: 'GraduationCap' },
        { label: 'Modern Laboratories', value: '11', icon: 'Cpu' },
        { label: 'Career Placement', value: '96%', icon: 'Award' },
    ];

    const goSlide = (dir: number) => setCurrentSlide((p) => (p + dir + slides.length) % slides.length);
    useEffect(() => {
        if (slides.length <= 1) return;
        const iv = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 5000);
        return () => clearInterval(iv);
    }, [slides.length]);

    const activeNotices = notices && notices.length > 0 ? notices : NOTICES.map((n, i) => ({
        id: i,
        title: n.title,
        slug: '#',
        published_at: `2026-02-${n.date}`,
    }));

    const formatDate = (dateStr: string) => {
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) {
                const idx = dateStr.lastIndexOf('-');
                const day = idx !== -1 ? dateStr.substring(idx + 1) : '15';
                return { day, month: 'FEB' };
            }
            const day = d.getDate().toString().padStart(2, '0');
            const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            return { day, month: months[d.getMonth()] };
        } catch (e) {
            return { day: '15', month: 'FEB' };
        }
    };

    useEffect(() => {
        if (isHeadMsgOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isHeadMsgOpen]);

    const hodName = department?.hod_name || headOfDept?.name || 'Dr. Mst. Rubina Aktar';
    const hodDesignation = department?.hod_designation || headOfDept?.designation || 'Associate Professor and Head';
    const hodPhoto = department?.hod_photo || headOfDept?.photo || '/images/eee/members/mst_rubina_aktar.jpg';
    const hodMessage = department?.hod_message || `Welcome to the Department of Electrical and Electronic Engineering (EEE) at Bangladesh Army University of Science and Technology (BAUST), Saidpur.

Since our inception in 2015, we have been dedicated to providing a vibrant academic environment where students gain sound technical mastery and ethical values. With a faculty of seasoned educators and young researchers, together with eleven well-equipped modern laboratories, we offer students hands-on exposure to power generation, smart grids, electronic instrumentation, wireless communication, and embedded systems.

Our curriculum is fully aligned with BAETE Outcome Based Education (OBE) benchmarks, ensuring our graduates are ready for demanding careers in both national infrastructure and global technology sectors. I invite you to explore our department and join us in shaping the sustainable electrical future of our nation.`;

    const hodMessageParagraphs = hodMessage.split('\n\n').filter(Boolean);

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Department of EEE - BAUST" />
            <Navbar />
            <PageHero title="Department of Electrical and Electronic Engineering (EEE)" subtitle={null} compact={true} />
            <DeptSubNav departmentName={department?.name || EEE_DEPT_NAME} activeTab="Home" tabs={EEE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

                {/* Highlights Slider + intro card */}
                <section className="grid lg:grid-cols-3 gap-6 items-stretch">
                    <div className="lg:col-span-2 relative w-full h-[20rem] sm:h-[26rem] lg:h-auto lg:min-h-[26rem] rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
                        {slides.map((slide, idx) => (
                            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${slide.image}')` }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-transparent" />
                                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10">
                                    {slide.badge && (
                                        <span className="inline-block px-3 py-1 bg-emerald-500/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">
                                            {slide.badge}
                                        </span>
                                    )}
                                    <h3 className="text-white text-lg sm:text-2xl lg:text-3xl font-extrabold leading-snug drop-shadow-md max-w-3xl">
                                        {slide.title}
                                    </h3>
                                    {slide.subtitle && (
                                        <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl drop-shadow line-clamp-1">
                                            {slide.subtitle}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {slides.length > 1 && (
                            <>
                                <button type="button" onClick={() => goSlide(-1)} aria-label="Previous" className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100">
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button type="button" onClick={() => goSlide(1)} aria-label="Next" className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100">
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                                <div className="absolute bottom-4 right-5 z-20 flex gap-2">
                                    {slides.map((_, idx) => (
                                        <button key={idx} type="button" onClick={() => setCurrentSlide(idx)} aria-label={`Slide ${idx + 1}`} className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-7 bg-emerald-400' : 'w-2 bg-white/50 hover:bg-white/80'}`} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="lg:col-span-1 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
                        <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                        <div className="p-7 flex flex-col flex-grow justify-center">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-5">
                                <Zap className="w-9 h-9 text-emerald-600" strokeWidth={2} />
                            </div>
                            <span className="w-fit bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full mb-3">
                                {department?.accreditation_badge || 'IEB-BAETE'}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 leading-snug">
                                {department?.accreditation_title || 'Nurturing Electrical & Electronic Technical Excellence'}
                            </h3>
                            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                                {department?.accreditation_text || 'The B.Sc. in EEE program integrates core power electronics, electrical machines, semiconductor layout, and embedded systems to train technical leaders for the global power and technology domain.'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Two-column: Message from Head + Notices */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Message from Head */}
                    <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                        <div className="p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                Message from Head of Department
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-shrink-0 flex flex-col items-center">
                                    <div className="relative">
                                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-emerald-300 to-green-500 opacity-25" />
                                        <img
                                            src={hodPhoto}
                                            alt={hodName}
                                            className="relative w-44 h-44 object-cover object-top rounded-xl shadow-md z-10"
                                            onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(hodName)}&background=059669&color=fff&size=144`; }}
                                        />
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-900 mt-3 text-center leading-snug">{hodName}</h4>
                                    <p className="text-xs text-emerald-700 font-semibold mt-0.5 text-center">{hodDesignation}</p>
                                </div>
                                <div className="flex-1 text-gray-600 text-[15px] leading-relaxed text-justify relative">
                                    <p className="mb-4">
                                        Welcome to the Department of Electrical and Electronic Engineering (EEE) at BAUST.
                                    </p>
                                    <p className="line-clamp-6">
                                        {hodMessageParagraphs[1] || hodMessageParagraphs[0] || hodMessage}
                                    </p>
                                    <div className="mt-4 flex justify-end">
                                        <button 
                                            onClick={() => setIsHeadMsgOpen(true)}
                                            className="text-emerald-700 font-bold hover:underline flex items-center gap-1 group cursor-pointer"
                                        >
                                            Read full message
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notice Board */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="h-1.5 bg-gradient-to-r from-red-500 via-rose-400 to-red-600" />
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-red-500 rounded-full" />
                                    Notice Board
                                </h2>
                                <Link href="/archive/notices?department=eee" className="text-xs text-emerald-700 font-semibold hover:underline">
                                    View All →
                                </Link>
                            </div>
                            <div className="space-y-2.5">
                                {activeNotices.slice(0, 5).map((notice: any) => {
                                    const { day, month } = formatDate(notice.published_at);
                                    return (
                                        <Link
                                            key={notice.id}
                                            href={notice.slug !== '#' ? `/eee/events/${notice.slug}` : '#'}
                                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/50 transition-colors group cursor-pointer border border-transparent hover:border-emerald-100"
                                        >
                                            <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-emerald-100 text-emerald-800 flex flex-col items-center justify-center font-bold text-xs leading-tight group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                <span className="text-sm font-extrabold">{day}</span>
                                                <span className="text-[10px] uppercase font-semibold">{month}</span>
                                            </div>
                                            <p className="text-xs text-gray-700 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-relaxed flex-1 mt-0.5 font-medium">
                                                {notice.title}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Pillars / Highlights */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                            Why Study EEE at BAUST?
                        </h2>
                        <Link href="/eee/about" className="text-sm text-emerald-700 font-semibold hover:underline">
                            Explore Department Details →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((hl, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    {renderHighlightIcon(hl.icon)}
                                </div>
                                <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{hl.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed flex-grow">{hl.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-emerald-700/50">
                        {stats.map((stat, idx) => (
                            <div key={idx} className={idx !== 0 ? 'pl-8' : ''}>
                                <div className="text-3xl sm:text-4xl font-black text-emerald-300 mb-1">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-emerald-100 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Faculty Preview */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                            Faculty Members
                        </h2>
                        <Link href="/eee/faculty" className="text-sm text-emerald-700 font-semibold hover:underline">
                            View All Faculty →
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                        {facultyPreview.map((member) => (
                            <Link href={`/eee/faculty?profile=${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={member.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <div className="p-4 flex flex-col items-center text-center">
                                    <div className="relative mb-3">
                                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-emerald-300 to-green-500 opacity-0 group-hover:opacity-30 transition-opacity" />
                                        <img
                                            src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff&size=96`}
                                            alt={member.name}
                                            className="w-24 h-24 rounded-full object-cover object-top shadow-sm border-2 border-white"
                                            onError={(e) => {
                                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff&size=96`;
                                            }}
                                        />
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">{member.name}</h4>
                                    <p className="text-[11px] text-emerald-700 font-semibold mt-1">{member.designation}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </main>
            <Footer />

            {/* Head Message Modal */}
            {isHeadMsgOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 sm:py-12">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsHeadMsgOpen(false)} />
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
                        <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 flex-shrink-0" />
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                Message from Head of Department
                            </h3>
                            <button onClick={() => setIsHeadMsgOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer" title="Close">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6 sm:p-10 overflow-y-auto text-gray-600 text-base leading-relaxed space-y-4 text-justify scrollbar-thin scrollbar-thumb-emerald-200">
                            {hodMessageParagraphs.map((para, pIdx) => (
                                <p key={pIdx}>{para}</p>
                            ))}

                            <div className="pt-8 flex flex-col items-end">
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 mt-2">{hodName}</p>
                                    <p className="text-sm text-emerald-700 font-semibold">{hodDesignation}</p>
                                    <p className="text-[13px] text-gray-500 mt-1">
                                        Department of EEE, BAUST
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 bg-gray-50 border-t border-gray-100 flex justify-end flex-shrink-0">
                            <button 
                                onClick={() => setIsHeadMsgOpen(false)} 
                                className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95 group flex items-center gap-2 cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
