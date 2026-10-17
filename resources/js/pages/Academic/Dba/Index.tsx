import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { DBA_TABS, DBA_DEPT_NAME, FacultyMember } from '@/data/dbaData';
import {
    BadgeCheck,
    ChevronLeft,
    ChevronRight,
    Award,
    Briefcase,
    GraduationCap,
    Users,
    Globe,
    Building2,
    Lightbulb,
    Layers,
    Target,
    Trophy,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    BookOpen,
    Play,
    ArrowRight,
    Calendar,
    CheckCircle2
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
    Award: <Award className="w-7 h-7" />,
    Briefcase: <Briefcase className="w-7 h-7" />,
    GraduationCap: <GraduationCap className="w-7 h-7" />,
    Users: <Users className="w-7 h-7" />,
    TrendingUp: <TrendingUp className="w-7 h-7" />,
    Globe: <Globe className="w-7 h-7" />,
    Building2: <Building2 className="w-7 h-7" />,
    Lightbulb: <Lightbulb className="w-7 h-7" />,
    Layers: <Layers className="w-7 h-7" />,
    Target: <Target className="w-7 h-7" />,
    Trophy: <Trophy className="w-7 h-7" />,
    ShieldCheck: <ShieldCheck className="w-7 h-7" />,
    Sparkles: <Sparkles className="w-7 h-7" />,
    BookOpen: <BookOpen className="w-7 h-7" />,
};

function renderHighlightIcon(name?: string | null) {
    if (name && ICON_MAP[name]) return ICON_MAP[name];
    return <Award className="w-7 h-7" />;
}

interface SlideItem {
    id?: number;
    image: string;
    title?: string | null;
    caption?: string | null;
}

interface HighlightItem {
    id?: number;
    icon?: string | null;
    title: string;
    text?: string | null;
    description?: string | null;
}

interface StatItem {
    id?: number;
    value: string;
    label: string;
}

interface NoticeItem {
    id: number;
    title: string;
    slug: string;
    published_at: string;
    attachment?: string | null;
}

interface FacilityItem {
    id: number;
    name: string;
    slug: string;
    description: string;
    images?: string[];
}

interface Props {
    department: any;
    slides: SlideItem[];
    highlights: HighlightItem[];
    stats: StatItem[];
    headOfDept?: FacultyMember | null;
    facultyPreview: FacultyMember[];
    notices: NoticeItem[];
    achievements?: any[];
    facilities?: FacilityItem[];
}

export default function Index({
    department,
    slides,
    highlights,
    stats,
    headOfDept,
    facultyPreview,
    notices,
    achievements,
    facilities,
}: Props) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const activeSlides = slides && slides.length > 0 ? slides : [
        { image: '/images/departments/dba/slider/slide1.jpeg', title: 'Welcoming the DBA 23rd Batch!', caption: 'A new beginning awaits future business leaders at BAUST' },
        { image: '/images/departments/dba/slider/slide2.jpeg', title: 'With Honorable VC Sir', caption: 'Nurturing excellence and integrity in management education' },
        { image: '/images/departments/dba/slider/slide3.jpeg', title: 'Faculty Members with Freshers', caption: 'Collaborative academic community' },
    ];

    useEffect(() => {
        if (activeSlides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [activeSlides.length]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Department of Business Administration (DBA) - BAUST" />
            <Navbar />
            <PageHero
                title="Department of Business Administration"
                subtitle="Faculty of Business Studies • BAUST Saidpur"
                compact={true}
            />
            <DeptSubNav departmentName={DBA_DEPT_NAME} activeTab="Home" tabs={DBA_TABS} />

            <main className="flex-grow max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                {/* 1. Hero Slider Section */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-14 bg-gray-900 border border-emerald-900/20 group">
                    <div className="relative h-[340px] sm:h-[440px] md:h-[500px] w-full">
                        {activeSlides.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                    index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                }`}
                            >
                                <img
                                    src={slide.image}
                                    alt={slide.title || 'DBA Slide'}
                                    className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                                {(slide.title || slide.caption) && (
                                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white max-w-3xl">
                                        {slide.title && (
                                            <h3 className="text-xl sm:text-3xl md:text-4xl font-black mb-2 tracking-tight text-white drop-shadow-md">
                                                {slide.title}
                                            </h3>
                                        )}
                                        {slide.caption && (
                                            <p className="text-emerald-200 text-sm sm:text-base md:text-lg font-medium drop-shadow">
                                                {slide.caption}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {activeSlides.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                aria-label="Previous Slide"
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextSlide}
                                aria-label="Next Slide"
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                            <div className="absolute bottom-4 right-6 flex space-x-2">
                                {activeSlides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                        className={`h-2.5 rounded-full transition-all ${
                                            index === currentSlide ? 'w-8 bg-emerald-400' : 'w-2.5 bg-white/50 hover:bg-white/80'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* 2. Key Stats Bar */}
                {stats && stats.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-sm text-center hover:shadow-md hover:border-emerald-300 transition-all group"
                            >
                                <div className="text-3xl sm:text-4xl font-black text-emerald-700 mb-1 group-hover:scale-105 transition-transform">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 3. HoD Message & Department Intro */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
                    {/* Head of Department Card */}
                    <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-50 rounded-bl-full -z-0" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 text-emerald-700 text-xs font-black uppercase tracking-widest mb-4">
                                <Sparkles className="w-4 h-4" />
                                Message from the Head
                            </div>
                            <div className="flex items-center gap-5 mb-6">
                                <img
                                    src={department?.hod_photo || headOfDept?.photo || '/images/departments/dba/faculty/dba-dr-md-anowar-hossain.jpg'}
                                    alt={department?.hod_name || headOfDept?.name || 'Head of Department'}
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-emerald-500 shadow-md flex-shrink-0"
                                    onError={(e) => {
                                        (e.target as HTMLElement).setAttribute('src', 'https://ui-avatars.com/api/?name=Anowar+Hossain&background=059669&color=fff');
                                    }}
                                />
                                <div>
                                    <h4 className="text-lg sm:text-xl font-black text-gray-900 leading-snug">
                                        {department?.hod_name || headOfDept?.name || 'Dr. Md. Anowar Hossain'}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-emerald-700 font-bold mt-1">
                                        {department?.hod_designation || headOfDept?.designation || 'Associate Professor & Head'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">Department of Business Administration</p>
                                </div>
                            </div>
                            <blockquote className="text-gray-600 text-sm sm:text-base leading-relaxed italic border-l-4 border-emerald-500 pl-4 py-1 mb-6">
                                "{department?.hod_message || 'Our mission is to nurture capable, ethical, and industry-ready business professionals through an outcome-based curriculum and modern experiential learning.'}"
                            </blockquote>
                        </div>
                        <div className="relative z-10 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <Link
                                href="/dba/about"
                                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                            >
                                Read Full Message <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/dba/faculty"
                                className="text-xs text-gray-500 hover:text-emerald-700 font-semibold"
                            >
                                Meet All Faculty →
                            </Link>
                        </div>
                    </div>

                    {/* Department Overview */}
                    <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full mb-4">
                                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                                Premier Business Education
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-4">
                                Shaping Visionary Corporate Leaders & Entrepreneurs
                            </h3>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                                {department?.about ||
                                    'The Bachelor of Business Administration (BBA) program at BAUST provides modern, rigorous business education preparing students as agile professionals to meet the demands of national and multinational corporations.'}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                                    <Target className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h5 className="font-bold text-gray-900 text-sm">4 Major Specializations</h5>
                                        <p className="text-xs text-gray-600 mt-0.5">Finance, Marketing, Human Resource Management & Accounting</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h5 className="font-bold text-gray-900 text-sm">132 Credit Hours OBE</h5>
                                        <p className="text-xs text-gray-600 mt-0.5">Outcome-based syllabus aligned with global corporate standards</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
                            <Link
                                href="/dba/curriculum"
                                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-200"
                            >
                                Explore Curriculum
                            </Link>
                            <Link
                                href="/dba/facilities"
                                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all"
                            >
                                Facilities & Classrooms
                            </Link>
                            <Link
                                href="/dba/achievements"
                                className="px-5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl transition-all border border-amber-200"
                            >
                                DBA Achievers
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 4. Department Highlights Grid */}
                {highlights && highlights.length > 0 && (
                    <div className="mb-16">
                        <div className="text-center max-w-2xl mx-auto mb-10">
                            <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                                Why Study Business Administration at BAUST?
                            </h3>
                            <p className="text-gray-500 text-sm mt-2">
                                Distinctive educational pillars powering future business excellence.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {highlights.map((h, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                                            {renderHighlightIcon(h.icon)}
                                        </div>
                                        <h4 className="font-extrabold text-gray-900 text-base mb-2">{h.title}</h4>
                                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{h.text || h.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 5. Faculty Members Carousel / Grid Preview */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
                                <Users className="w-4 h-4" /> Academic Leadership
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Distinguished Faculty</h3>
                        </div>
                        <Link
                            href="/dba/faculty"
                            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                        >
                            View All 24 Members <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                        {facultyPreview.slice(0, 8).map((member) => (
                            <div
                                key={member.id}
                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center p-5 group flex flex-col items-center justify-between"
                            >
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 border-2 border-emerald-500 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff`}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLElement).setAttribute('src', `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff`);
                                        }}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm sm:text-base text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                                        {member.name}
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-gray-500 mt-1 line-clamp-2">
                                        {member.designation}
                                    </p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-gray-50 w-full">
                                    <Link
                                        href="/dba/faculty"
                                        className="text-[11px] font-bold text-emerald-600 hover:text-emerald-800"
                                    >
                                        View Profile →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="sm:hidden text-center mt-6">
                        <Link
                            href="/dba/faculty"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                        >
                            View All 24 Members <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* 6. Facilities & Modern Classrooms Showcase */}
                {facilities && facilities.length > 0 && (
                    <div className="mb-16">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
                                    <Building2 className="w-4 h-4" /> World-Class Infrastructure
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Modern Facilities</h3>
                            </div>
                            <Link
                                href="/dba/facilities"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                            >
                                All Facilities <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {facilities.map((fac) => (
                                <div
                                    key={fac.id}
                                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                                >
                                    <div className="h-44 overflow-hidden relative bg-emerald-50">
                                        <img
                                            src={fac.images && fac.images[0] ? fac.images[0] : '/images/departments/dba/slider/slide5.jpeg'}
                                            alt={fac.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-3 left-4 text-white font-bold text-sm drop-shadow">
                                            {fac.name}
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col justify-between flex-grow">
                                        <p className="text-gray-500 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                                            {fac.description}
                                        </p>
                                        <Link
                                            href={`/dba/facilities/${fac.slug}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-800 mt-auto"
                                        >
                                            View Equipment & Details <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 7. Latest Notices & Events */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
                                <Calendar className="w-4 h-4" /> Announcements & Highlights
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Latest from DBA</h3>
                        </div>
                        <Link
                            href="/dba/events"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                        >
                            View All News <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {notices.slice(0, 6).map((notice) => {
                            const date = new Date(notice.published_at);
                            return (
                                <div
                                    key={notice.id}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-xl text-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                <span className="text-xs font-black block">
                                                    {isNaN(date.getTime()) ? '15' : date.toLocaleString('default', { day: '2-digit' })}
                                                </span>
                                                <span className="text-[10px] font-bold uppercase block">
                                                    {isNaN(date.getTime()) ? 'JUL' : date.toLocaleString('default', { month: 'short' })}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-400 font-semibold">
                                                {!isNaN(date.getTime()) ? date.getFullYear() : '2026'}
                                            </span>
                                        </div>
                                        <Link href={`/dba/events/${notice.slug}`}>
                                            <h4 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mb-3">
                                                {notice.title}
                                            </h4>
                                        </Link>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <Link
                                            href={`/dba/events/${notice.slug}`}
                                            className="text-xs font-bold text-emerald-600 hover:text-emerald-800 inline-flex items-center gap-1"
                                        >
                                            Read More <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 8. Video Showcase Section */}
                <div className="bg-gradient-to-r from-gray-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-16 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-6">
                            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/30">
                                Campus Experience
                            </span>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mt-4 mb-4 leading-tight">
                                Experience Academic Life & Career Growth at BAUST
                            </h3>
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                                Watch our university overview showcasing state-of-the-art campus facilities, interactive smart classrooms, business club activities, and the inspiring atmosphere nurturing business minds.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="https://www.youtube.com/watch?v=qz0gn1vm22E"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-900/50"
                                >
                                    <Play className="w-4 h-4 fill-white" /> Watch on YouTube
                                </a>
                                <Link
                                    href="/dba/about"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-all border border-white/20"
                                >
                                    Learn More About DBA
                                </Link>
                            </div>
                        </div>
                        <div className="lg:col-span-6">
                            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video bg-black relative">
                                <iframe
                                    src="https://www.youtube-nocookie.com/embed/qz0gn1vm22E?rel=0"
                                    title="BAUST Campus & Business Education Showcase"
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 9. Direct Sub-Page Navigation Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Link
                        href="/dba/curriculum"
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all text-center group"
                    >
                        <BookOpen className="w-8 h-8 text-emerald-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <h5 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700">Curriculum</h5>
                        <p className="text-[11px] text-gray-500 mt-0.5">Syllabus 2022 & 2020</p>
                    </Link>
                    <Link
                        href="/dba/research/publications"
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all text-center group"
                    >
                        <Globe className="w-8 h-8 text-emerald-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <h5 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700">Research</h5>
                        <p className="text-[11px] text-gray-500 mt-0.5">Publications & Projects</p>
                    </Link>
                    <Link
                        href="/dba/alumni"
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all text-center group"
                    >
                        <GraduationCap className="w-8 h-8 text-emerald-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <h5 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700">Alumni</h5>
                        <p className="text-[11px] text-gray-500 mt-0.5">Corporate Placements</p>
                    </Link>
                    <Link
                        href="/dba/clubs"
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all text-center group"
                    >
                        <Briefcase className="w-8 h-8 text-emerald-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <h5 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700">Business Club</h5>
                        <p className="text-[11px] text-gray-500 mt-0.5">Competitions & Events</p>
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
