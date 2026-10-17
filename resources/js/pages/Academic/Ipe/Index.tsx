import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { IPE_TABS, IPE_DEPT_NAME, NOTICES, FacultyMember } from '@/data/ipeData';
import { 
    BadgeCheck, 
    ChevronLeft, 
    ChevronRight, 
    Flame, 
    Cpu, 
    Wrench, 
    Bot, 
    Building2, 
    GraduationCap, 
    Sparkles, 
    Target,
    TrendingUp,
    Network,
    Activity,
    Sliders
} from 'lucide-react';

interface SlideItem {
    id?: number;
    image: string;
    title: string;
    caption?: string | null;
}

interface HighlightItem {
    id?: number;
    icon?: string;
    title: string;
    text?: string | null;
    description?: string;
}

interface DepartmentData {
    id?: number;
    slug: string;
    name: string;
    short_name: string;
    faculty?: string | null;
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
    slides?: SlideItem[];
    highlights?: HighlightItem[];
    stats?: any[];
}

interface Props {
    department?: DepartmentData | null;
    headOfDept: FacultyMember | null;
    facultyPreview: FacultyMember[];
    notices: any[];
}

const DEFAULT_SLIDES: SlideItem[] = [
    { image: "/images/departments/ipe/slider/slide1.jpg", title: "B.Sc. in IPE is now IEB / BAETE Accredited Program of BAUST", caption: "Outcome-based education curriculum meeting international Washington Accord standards" },
    { image: "/images/departments/ipe/slider/slide2.jpg", title: "Celebrating Prof. Dr. Imtiaz Ahmed Choudhury's Recognition Among the World's Top 2% Researchers", caption: "Excellence in research, publications and global academic leadership" },
    { image: "/images/departments/ipe/slider/slide3.jpg", title: "IPE Faculty Members & Academic Leadership", caption: "Dedicated mentors shaping the future of industrial engineering" },
    { image: "/images/departments/ipe/slider/slide4.jpg", title: "Respected Chief of Army Staff and Faculty Members", caption: "Institutional visits and guidance from university trustees" },
    { image: "/images/departments/ipe/slider/slide5.jpg", title: "IPE Students with Adjunct Professor Dr. Abdullahil Azeem (BUET)", caption: "Distinguished guest lectures and interactive seminars" },
    { image: "/images/departments/ipe/slider/slide6.jpg", title: "Industrial Visit at Ventura Leatherware Mfy (BD) Ltd.", caption: "Bridging academic theory with real-world plant operations" },
    { image: "/images/departments/ipe/slider/slide7.jpg", title: "Seminar on Role of Industrial Engineers in Modern Economy", caption: "IEOM Student Chapter events fostering professional growth" },
];

const DEFAULT_HIGHLIGHTS = [
    {
        icon: 'TrendingUp',
        title: 'Production Optimization & Lean Manufacturing',
        description: 'Implementing Industry 4.0, Six Sigma, and Toyota Production System principles to eliminate waste and maximize shopfloor productivity.',
    },
    {
        icon: 'Network',
        title: 'Supply Chain & Operations Research',
        description: 'Advanced mathematical modeling and optimization for logistics networks, inventory control, and enterprise decision-making.',
    },
    {
        icon: 'Activity',
        title: 'Ergonomics & Occupational Safety',
        description: 'Human-centered workplace design, biomechanics analysis, and industrial safety compliance aligned with international standards.',
    },
    {
        icon: 'Sliders',
        title: 'CAD/CAM, CNC & Advanced Metrology',
        description: 'Parametric 3D solid modeling, CNC automated toolpaths, and high-precision dimensional quality verification.',
    },
];

function renderHighlightIcon(iconName?: string) {
    const props = { className: "w-7 h-7" };
    switch (iconName) {
        case 'TrendingUp':
            return <TrendingUp {...props} />;
        case 'Network':
            return <Network {...props} />;
        case 'Activity':
            return <Activity {...props} />;
        case 'Sliders':
            return <Sliders {...props} />;
        case 'Flame':
            return <Flame {...props} />;
        case 'Cpu':
            return <Cpu {...props} />;
        case 'Wrench':
            return <Wrench {...props} />;
        case 'Bot':
            return <Bot {...props} />;
        case 'Building2':
            return <Building2 {...props} />;
        case 'Sparkles':
            return <Sparkles {...props} />;
        case 'Target':
            return <Target {...props} />;
        case 'GraduationCap':
        default:
            return <GraduationCap {...props} />;
    }
}

export default function IpeHome({ department, headOfDept, facultyPreview = [], notices = [] }: Props) {
    const [isHeadMsgOpen, setIsHeadMsgOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const rawSlides: SlideItem[] = (department?.slides && department.slides.length > 0)
        ? department.slides
        : DEFAULT_SLIDES;

    const slides: SlideItem[] = rawSlides.map(s => {
        let img = s.image || '';
        img = img.replace('/images/ipe/slides/', '/images/departments/ipe/slider/');
        img = img.replace(/slide_(\d+)\.jpg/, 'slide$1.jpg');
        return {
            ...s,
            image: img
        };
    });

    const highlights = (department?.highlights && department.highlights.length > 0)
        ? department.highlights.map(h => ({
            icon: h.icon || 'TrendingUp',
            title: h.title,
            description: h.text || h.description || '',
        }))
        : DEFAULT_HIGHLIGHTS;

    const activeNotices = notices && notices.length > 0 ? notices : NOTICES.map((n, i) => ({
        id: i,
        title: n.title,
        slug: '#',
        published_at: `2026-02-${n.date}`
    }));

    const goSlide = (dir: number) => setCurrentSlide((p) => (p + dir + slides.length) % slides.length);

    useEffect(() => {
        if (slides.length <= 1) return;
        const t = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 5000);
        return () => clearInterval(t);
    }, [slides.length]);

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
        } catch {
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

    const hodName = headOfDept?.name || department?.hod_name || 'Dr. Md. Mamunur Rashid';
    const hodDesignation = headOfDept?.designation || department?.hod_designation || 'Head of the Department';
    const hodPhoto = headOfDept?.photo || department?.hod_photo || '/images/ipe/members/dr._md._mamunur_rashid.jpg';
    const hodMessage = department?.hod_message || `Welcome to the Department of Industrial and Production Engineering (IPE) at Bangladesh Army University of Science and Technology (BAUST), Saidpur. Established in 2015, the Department of IPE has been striving to produce world-class engineers capable of solving complex industrial and operational challenges.

Industrial and Production Engineering is a multi-disciplinary engineering field that integrates engineering design, manufacturing technology, supply chain management, human factors, and operations research to optimize production systems, enhance product quality, and drive economic growth.

Our curriculum is designed in compliance with Outcome-Based Education (OBE) guidelines and accredited by BAETE under the Washington Accord. With 12 dedicated laboratories, state-of-the-art computational facilities, and active student chapters like IEOM, we prepare students to lead in competitive global markets.

We welcome aspiring engineers to join us and embark on an exciting and fulfilling educational journey.`;

    const hodMessageParagraphs = hodMessage.split('\n\n').filter(Boolean);

    const accreditationBadge = department?.accreditation_badge || 'BAETE Accredited';
    const accreditationTitle = department?.accreditation_title || 'Accredited by the Board of Accreditation for Engineering and Technical Education (BAETE)';
    const accreditationText = department?.accreditation_text || 'The B.Sc. in Industrial and Production Engineering program is accredited by the Board of Accreditation for Engineering and Technical Education (BAETE) under the Washington Accord.';

    return (
        <div className="min-h-screen flex flex-col font-['Inter',sans-serif]" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Department of IPE - BAUST" />
            <Navbar />
            <PageHero title="Department of Industrial and Production Engineering (IPE)" subtitle={null} compact={true} />
            <DeptSubNav departmentName={IPE_DEPT_NAME} activeTab="Home" tabs={IPE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

                {/* Highlights Slider + Accreditation, side by side */}
                <section className="grid lg:grid-cols-3 gap-6 items-stretch">
                    <div className="lg:col-span-2 relative w-full h-[20rem] sm:h-[26rem] lg:h-auto lg:min-h-[26rem] rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
                        {slides.map((slide, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            >
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.currentTarget;
                                        if (target.src.includes('/images/ipe/slides/')) {
                                            target.src = target.src.replace('/images/ipe/slides/', '/images/departments/ipe/slider/');
                                        } else if (target.src.includes('slide_')) {
                                            target.src = target.src.replace(/slide_(\d+)\.jpg/, 'slide$1.jpg');
                                        }
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-transparent" />
                                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 z-10">
                                    <h3 className="text-white text-lg sm:text-2xl lg:text-3xl font-extrabold leading-snug drop-shadow-md max-w-3xl">{slide.title}</h3>
                                    {slide.caption && (
                                        <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl line-clamp-2 drop-shadow">{slide.caption}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => goSlide(-1)} aria-label="Previous" className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button type="button" onClick={() => goSlide(1)} aria-label="Next" className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-4 right-5 z-20 flex gap-2">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setCurrentSlide(idx)}
                                    aria-label={`Slide ${idx + 1}`}
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-7 bg-emerald-400' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Accreditation card */}
                    <div className="lg:col-span-1 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
                        <div className="h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
                        <div className="p-7 flex flex-col flex-grow justify-center">
                            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mb-5">
                                <BadgeCheck className="w-9 h-9 text-amber-600" strokeWidth={2} />
                            </div>
                            <span className="w-fit bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full mb-3">{accreditationBadge}</span>
                            <h3 className="text-lg font-bold text-gray-900 leading-snug">{accreditationTitle}</h3>
                            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                                {accreditationText}
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
                                            className="relative w-44 h-44 object-cover object-top rounded-xl shadow-md z-10 bg-gray-50"
                                            onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(hodName)}&background=059669&color=fff&size=176`; }}
                                        />
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-900 mt-3 text-center leading-snug">{hodName}</h4>
                                    <p className="text-xs text-emerald-700 font-semibold mt-0.5">{hodDesignation}</p>
                                </div>
                                <div className="flex-1 text-gray-600 text-[15px] leading-relaxed text-justify relative">
                                    <p className="mb-4">
                                        {hodMessageParagraphs[0] || 'Welcome to the Department of Industrial and Production Engineering (IPE) at BAUST.'}
                                    </p>
                                    <p className="line-clamp-6">
                                        {hodMessageParagraphs[1] || 'Industrial and Production Engineering integrates modern manufacturing, operations research, quality control, and supply chain logistics to prepare students for top leadership roles.'}
                                    </p>
                                    <div className="mt-4 flex justify-end">
                                        <button 
                                            onClick={() => setIsHeadMsgOpen(false || true)}
                                            className="text-emerald-700 font-bold hover:underline flex items-center gap-1 group"
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
                        <div className="p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-red-500 rounded-full" />
                                    Notice Board
                                </h2>
                                <Link href="/archive/notices?department=ipe" className="text-xs text-emerald-700 font-bold hover:underline cursor-pointer">View All →</Link>
                            </div>
                            <div className="space-y-3">
                                {activeNotices.map((notice, idx) => {
                                    const { day, month } = formatDate(notice.published_at);
                                    return (
                                        <Link 
                                            key={idx} 
                                            href={notice.slug && notice.slug !== '#' ? `/archive/notices/${notice.slug}` : '/archive/notices?department=ipe'}
                                            className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100"
                                        >
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex flex-col items-center justify-center group-hover:scale-105 transition-transform">
                                                <span className="text-red-700 text-sm font-extrabold leading-none">{day}</span>
                                                <span className="text-red-500 text-[10px] font-bold uppercase">{month}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-[14px] font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-red-700 transition-colors">
                                                    {notice.title}
                                                </h4>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why IPE at BAUST? */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
                        Why IPE at <span className="text-emerald-700">BAUST</span>?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                    {renderHighlightIcon(item.icon)}
                                </div>
                                <h3 className="text-[15px] font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-[13px] text-gray-500 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Faculty Preview */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Our Faculty</h2>
                        <Link href="/ipe/faculty" className="text-sm font-bold text-emerald-700 hover:underline">View All →</Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                        {facultyPreview.map((member) => (
                            <div key={member.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <div className="p-4 flex flex-col items-center text-center">
                                    <div className="relative mb-3">
                                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-emerald-300 to-green-500 opacity-0 group-hover:opacity-30 transition-opacity" />
                                        <img
                                            src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff&size=96`}
                                            alt={member.name}
                                            className="w-24 h-24 rounded-full object-cover object-top shadow-sm border-2 border-white bg-gray-50"
                                            onError={(e) => {
                                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff&size=96`;
                                            }}
                                        />
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">{member.name}</h4>
                                    <p className="text-[11px] text-emerald-700 font-semibold mt-1">{member.designation}</p>
                                </div>
                            </div>
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
                            <button onClick={() => setIsHeadMsgOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600" title="Close">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6 sm:p-10 overflow-y-auto text-gray-600 text-base leading-relaxed space-y-4 text-justify scrollbar-thin scrollbar-thumb-emerald-200">
                            {hodMessageParagraphs.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}

                            <div className="pt-8 flex flex-col items-end">
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 mt-2">{hodName}</p>
                                    <p className="text-sm text-emerald-700 font-semibold">{hodDesignation}</p>
                                    <p className="text-[13px] text-gray-500 mt-1">
                                        Department of IPE, BAUST
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 bg-gray-50 border-t border-gray-100 flex justify-end flex-shrink-0">
                            <button 
                                onClick={() => setIsHeadMsgOpen(false)} 
                                className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95 group flex items-center gap-2"
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
