import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME, FacultyMember } from '@/data/ceData';
import { BadgeCheck, ChevronLeft, ChevronRight, Building2 } from 'lucide-react';
import { deptIcon, pageText } from '@/lib/dept-icons';

interface SlideItem {
    id?: number;
    image: string;
    title?: string | null;
    subtitle?: string | null;
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

interface DeptInfo {
    id: number;
    slug: string;
    name: string;
    short_name: string;
    faculty?: string | null;
    tagline?: string | null;
    established?: string | null;
    about?: string | null;
    vision?: string | null;
    mission?: string | null;
    hod_name?: string | null;
    hod_designation?: string | null;
    hod_photo?: string | null;
    hod_message?: string | null;
    accreditation_badge?: string | null;
    accreditation_title?: string | null;
    accreditation_text?: string | null;
    page_texts?: Record<string, string> | null;
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

export default function CeIndex({ department, slides, highlights, stats, headOfDept, facultyPreview, notices }: Props) {
    const activeSlides = slides ?? [];
    const activeHighlights = highlights ?? [];
    const activeStats = stats ?? [];
    const shortName = department?.short_name || 'CE';
    const deptName = department?.name || CE_DEPT_NAME;

    const [isHeadMsgOpen, setIsHeadMsgOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const goSlide = (dir: number) => setCurrentSlide((p) => (p + dir + activeSlides.length) % activeSlides.length);

    useEffect(() => {
        if (activeSlides.length <= 1) return;
        const t = setInterval(() => setCurrentSlide((p) => (p + 1) % activeSlides.length), 5000);
        return () => clearInterval(t);
    }, [activeSlides.length]);

    const formatDate = (dateStr: string) => {
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return { day: '--', month: '' };
            const day = d.getDate().toString().padStart(2, '0');
            const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            return { day, month: months[d.getMonth()] };
        } catch {
            return { day: '--', month: '' };
        }
    };

    // Disable scrolling when modal is open
    useEffect(() => {
        if (isHeadMsgOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isHeadMsgOpen]);

    const hodName = department?.hod_name || headOfDept?.name || '';
    const hodDesignation = department?.hod_designation || headOfDept?.designation || 'Head of the Department';
    const hodPhoto = department?.hod_photo || headOfDept?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(hodName || shortName)}&background=059669&color=fff&size=176`;
    const hodMessage = department?.hod_message || '';
    const hodParagraphs = hodMessage.split(/\r?\n\s*\r?\n|\\n\\n/).map(p => p.trim()).filter(Boolean);

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${deptName} - BAUST`} />
            <Navbar />
            <PageHero title={deptName} subtitle={pageText(department, 'home_hero_subtitle', '') || null} compact={true} />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Home" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

                {/* Highlights Slider + OBE card, side by side */}
                <section className="grid lg:grid-cols-3 gap-6 items-stretch">
                    <div className="lg:col-span-2 relative w-full h-[20rem] sm:h-[26rem] lg:h-auto lg:min-h-[26rem] rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
                        {activeSlides.length === 0 && (
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 flex flex-col justify-end p-6 sm:p-10">
                                <h3 className="text-white text-lg sm:text-2xl lg:text-3xl font-extrabold leading-snug max-w-3xl">{deptName}</h3>
                                {department?.tagline && <p className="text-white/80 text-sm sm:text-base mt-2 max-w-2xl">{department.tagline}</p>}
                            </div>
                        )}
                        {activeSlides.map((slide, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            >
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${slide.image}')` }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-transparent" />
                                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10">
                                    {slide.title && (
                                        <h3 className="text-white text-lg sm:text-2xl lg:text-3xl font-extrabold leading-snug drop-shadow-md max-w-3xl">{slide.title}</h3>
                                    )}
                                    {(slide.caption || slide.subtitle) && (
                                        <p className="text-white/80 text-sm sm:text-base mt-2 max-w-2xl">{slide.caption || slide.subtitle}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {activeSlides.length > 1 && (
                            <>
                                <button type="button" onClick={() => goSlide(-1)} aria-label="Previous" className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100">
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button type="button" onClick={() => goSlide(1)} aria-label="Next" className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100">
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                                <div className="absolute bottom-4 right-5 z-20 flex gap-2">
                                    {activeSlides.map((_, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => setCurrentSlide(idx)}
                                            aria-label={`Slide ${idx + 1}`}
                                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-7 bg-emerald-400' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* OBE program card */}
                    <div className="lg:col-span-1 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
                        <div className="h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
                        <div className="p-7 flex flex-col flex-grow justify-center">
                            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mb-5">
                                <BadgeCheck className="w-9 h-9 text-amber-600" strokeWidth={2} />
                            </div>
                            <span className="w-fit bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full mb-3">
                                {department?.accreditation_badge || 'OBE Curriculum'}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 leading-snug">
                                {department?.accreditation_title || 'Outcome-Based Education Program'}
                            </h3>
                            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                                {department?.accreditation_text || 'The Department of Civil Engineering offers a 4-year undergraduate B.Sc. in Civil Engineering program designed in line with Outcome-Based Education (OBE) principles.'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Quick Stats Grid */}
                {activeStats.length > 0 && <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {activeStats.map((st, idx) => (
                        <div key={st.id ?? idx} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="text-3xl sm:text-4xl font-black text-emerald-700">{st.value}</div>
                            <div className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">{st.label}</div>
                        </div>
                    ))}
                </div>}

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
                                    <p className="text-xs text-emerald-700 font-semibold mt-0.5 text-center">{hodDesignation}</p>
                                </div>
                                <div className="flex-1 text-gray-600 text-[15px] leading-relaxed text-justify relative">
                                    {hodParagraphs.slice(0, 2).map((p, idx) => (
                                        <p key={idx} className={idx === 0 ? "mb-4" : "line-clamp-6"}>
                                            {p}
                                        </p>
                                    ))}
                                    {hodParagraphs.length > 0 && <div className="mt-4 flex justify-end">
                                        <button 
                                            onClick={() => setIsHeadMsgOpen(true)}
                                            className="text-emerald-700 font-bold hover:underline flex items-center gap-1 group cursor-pointer"
                                        >
                                            Read full message
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </button>
                                    </div>}
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
                                <Link href="/archive/notices?department=ce" className="text-xs text-emerald-700 font-bold hover:underline cursor-pointer">View All →</Link>
                            </div>
                            <div className="space-y-3">
                                {notices && notices.length > 0 ? (
                                    notices.map((notice, idx) => {
                                        const { day, month } = formatDate(notice.published_at);
                                        return (
                                            <Link 
                                                key={idx} 
                                                href={`/ce/events/${notice.slug}`}
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
                                    })
                                ) : (
                                    <p className="text-xs text-gray-500 py-6 text-center">No recent departmental notices.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why CE at BAUST? */}
                {activeHighlights.length > 0 && <div>
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
                        Why {shortName} at <span className="text-emerald-700">BAUST</span>?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {activeHighlights.map((item, idx) => (
                            <div key={item.id ?? idx} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                    {(() => { const Icon = deptIcon(item.icon, Building2); return <Icon className="w-7 h-7" />; })()}
                                </div>
                                <h3 className="text-[15px] font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-[13px] text-gray-500 leading-relaxed">{item.text || item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>}

                {/* Faculty Preview */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Our Faculty</h2>
                        <Link href="/ce/faculty" className="text-sm font-bold text-emerald-700 hover:underline cursor-pointer">View All →</Link>
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
                            {hodParagraphs.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}

                            <div className="pt-8 flex flex-col items-end">
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 mt-2">{hodName}</p>
                                    <p className="text-sm text-emerald-700 font-semibold">{hodDesignation}</p>
                                    <p className="text-[13px] text-gray-500 mt-1">
                                        {deptName}, BAUST
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
