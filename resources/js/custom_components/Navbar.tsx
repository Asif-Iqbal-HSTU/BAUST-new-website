import React, { useState, useEffect, useRef } from "react";
import GreenButton from '@/custom_components/GreenButton';
import TopBar1 from '@/custom_components/TopBar1';
import ApplyNowFab, { APPLY_URL } from '@/custom_components/ApplyNowFab';
import { ChevronDown, Menu, X, ChevronRight } from "lucide-react";

import { Link, usePage } from '@inertiajs/react';

const mainNavItems = [
    { name: "Home", href: "/" },
    {
        name: "About BAUST",
        children: [
            { name: "Brief History", href: "/about/brief-history" },
            { name: "Message from Chief of Army Staff", href: "/about/message-from-chief-of-army-staff" },
            { name: "Message From VC", href: "/about/message-from-vc" },
            { name: "Vision, Mission & Objectives", href: "/about/vision-mission-objectives" },
            { name: "Accreditation", href: "/about/accreditation" },
            { name: "Photo Gallery", href: "/gallery" }
        ]
    },
    {
        name: "Administration",
        children: [
            {
                name: "Regulatory Bodies",
                children: [
                    { name: "Board of Trustees", href: "/administration/regulatory-bodies/board-of-trustees/" },
                    { name: "Syndicate Members", href: "/administration/regulatory-bodies/syndicate-members/" },
                    { name: "Academic Council", href: "/administration/regulatory-bodies/academic-council/" },
                    { name: "Finance Committee", href: "/administration/regulatory-bodies/finance-committee/" },
                    { name: "Discipline Committee", href: "/administration/regulatory-bodies/discipline-committee/" }
                ]
            },
            {
                name: "Offices",
                children: [
                    { name: "VC’s Office", href: "/administration/offices/vc" },
                    { name: "Pro-VC’s Office", href: "/administration/offices/pro-vc" },
                    { name: "Office of the Treasurer", href: "/administration/offices/treasurer" },
                    { name: "Office of the Registrar", href: "/administration/offices/registrar" },
                    { name: "Controller of Examination", href: "/administration/offices/controller-of-examination" },
                    { name: "ICT Wing & Archive", href: "/administration/offices/ict-wing-archive" },
                    { name: "Deans of Faculties", href: "/administration/offices/deans-of-faculties" },
                    { name: "Proctor’s Office", href: "/administration/offices/proctors-office" },
                    { name: "Office of The Adviser of Students’ Welfare (ASW)", href: "/administration/offices/asw" },
                    { name: "Admission Office", href: "/administration/offices/admission-office" },
                    { name: "Office of the Librarian", href: "/administration/offices/librarian" },
                    { name: "Complaint Committee", href: "/administration/offices/complaint-committee" }
                ]
            }
        ]
    },
    {
        name: "Academic",
        children: [
            {
                name: "Faculty of Electrical and Computer Engineering (FECE)",
                children: [
                    { name: "FECE Dean’s Office", href: "/fece" },
                    { name: "Computer Science and Engineering (CSE)", href: "/cse" },
                    { name: "Information and Communication Technology (ICT)", href: "/ict" },
                    { name: "Electrical and Electronic Engineering (EEE)", href: "/eee" }
                ]
            },
            {
                name: "Faculty of Mechanical Engineering (FME)",
                children: [
                    { name: "FME Dean’s Office", href: "/fme" },
                    { name: "Department of Mechanical Engineering (ME)", href: "/me" },
                    { name: "Department of Industrial and Production Engineering (IPE)", href: "/ipe" }
                ]
            },
            {
                name: "Faculty of Civil Engineering (FCE)",
                children: [
                    { name: "FCE Dean’s Office", href: "/fce" },
                    { name: "Department of Civil Engineering (CE)", href: "/ce" }
                ]
            },
            {
                name: "Faculty of Business Studies (FBS)",
                children: [
                    { name: "FBS Dean’s Office", href: "/fbs" },
                    { name: "Department of Business Administration (DBA)", href: "/dba" },
                    { name: "Department of Accounting & Information Systems (AIS)", href: "/ais" },
                    { name: "Master of Business Administration (MBA) Program", href: "/mba" }
                ]
            },
            {
                name: "Faculty of Science and Humanities (FSH)",
                children: [
                    { name: "FSH Dean’s Office", href: "/fsh" },
                    { name: "Department of English", href: "/eng" },
                    { name: "MA in English (ELT)", href: "/ma-elt" },
                    { name: "Department of Arts & Sciences (A&S)", href: "/as" }
                ]
            },
            { name: "Academic Calendar", href: "/about/academic-calendar/" },
            { name: "Syllabus", href: "/academic/syllabus/" }
        ]
    },
    {
        name: "Facilities",
        children: [
            { name: "Campus Facilities", href: "/facilities" },
            { name: "Wifi Campus", href: "/facilities#wifi" },
            { name: "Multimedia Classroom", href: "/facilities#multimedia" },
            { name: "Modern Laboratories", href: "/facilities#laboratories" },
            { name: "Central Library", href: "/facilities/library" },
            { name: "Residential Facilities (Male/Female)", href: "/facilities#residential" },
            { name: "Cafeteria", href: "/facilities#cafeteria" },
            { name: "Medical Center", href: "/facilities#medical" },
            { name: "Psychological Counseling", href: "/facilities#counseling" },
            { name: "Transport", href: "/facilities#transport" },
            { name: "Playground", href: "/facilities#playground" },
            { name: "Co-Curricular Activity", href: "/facilities#co-curricular" },
            { name: "Day Care Center", href: "/facilities#day-care" },
            { name: "Fire Safety", href: "/facilities#fire-safety" }
        ]
    },
    {
        name: "Admission",
        children: [
            { name: "Apply Online Instruction & Leaflet", href: "/admission/apply-online-instruction/" },
            { name: "Admission Notice", href: "/archive/notices?category=admission-notice" },
            { name: "Offered Programs", href: "/admission/program-offering/" },
            { name: "Admission Requirements", href: "/admission/admission-requirements" },
            { name: "Admission Procedure", href: "/admission/admission-procedure/" },
            { name: "Semester Fees & Payments", href: "/admission/tuition-fees/" },
            { name: "Waiver and Financial Aid", href: "/admission/waiver-and-financial-aid/" },
            { name: "Tuition Fee Payment Procedure", href: "/admission/tuition-fee-payment-procedure/" },
            { name: "Dress Code", href: "/admission/dress-code" },
            { name: "Academic Calendar-2026", href: "/admission/academic-calendar" },
            { name: "Credit Transfer Policy", href: "/admission/credit-transfer-policy" },
            { name: "Admission Cancel Policy", href: "/admission/cancel-policy" },
            { name: "Students Data Center", href: "http://103.7.193.2:76/" }
        ]
    },
    {
        name: "Research",
        children: [
            { name: "Research & Publication", href: "/research" },
            { name: "Research & Publication Cell", href: "/research#cell" },
            { name: "Publications", href: "/research#publications" },
            { name: "Projects", href: "/research#projects" }
        ]
    },
    {
        name: "Archive",
        children: [
            { name: "All Notices", href: "/archive/notices" },
            { name: "Admission Notice", href: "/archive/notices?category=admission-notice" },
            { name: "Class/Exam Notice", href: "/archive/notices?category=exam-notice" },
            { name: "Job Notice", href: "/archive/notices?category=job-notice" },
            { name: "Tender Notice", href: "/archive/notices?category=tender-notice" },
            { name: "News & Events", href: "/archive/notices?category=news-events" },
            { name: "Upcoming Events", href: "/archive/notices?category=upcoming-events" },
            { name: "Conference & Workshops", href: "/archive/notices?category=conference-workshops" },
            { name: "Achievements", href: "/archive/notices?category=achievements" },
            { name: "Top Scroll Notice", href: "/archive/notices?category=top-scroll-notice" },
            { name: "Photo Gallery", href: "/gallery" },
            { name: "Alumni", href: "/alumni/" }
        ]
    }
];

const utilityNavItems = [
    { name: "IQAC", href: "/iqac" },
    { name: "Library", href: "/facilities/library" },
    { name: "Journal", href: "https://journal.baust.edu.bd" },
    { name: "PRO", href: "/public-relations" },
    { name: "Consultancy & Testing", href: "/consultancy" },
    {
        name: "Management Systems",
        children: [
            { name: "Smart Campus (For Admin & Faculty members)", href: "https://ems.baust.edu.bd" },
            { name: "Smart Campus (Students)", href: "https://student.baust.edu.bd" },
            { name: "Hall Management System", href: "https://hall.baust.edu.bd" },
            { name: "BAUST Management System", href: "https://management.baust.edu.bd" },
        ],
    },
    { name: "Contact", href: "/contact-us/" },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openMobileDropdowns, setOpenMobileDropdowns] = useState<Record<string, boolean>>({});

    const toggleMobileDropdown = (name: string) => {
        setOpenMobileDropdowns(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    const renderMobileMenu = (items: any[], level = 0) => {
        return (
            <ul className={`flex flex-col space-y-1.5 mt-2 ${level > 0 ? 'pl-4 border-l border-emerald-100/30' : ''}`}>
                {items.map((child, idx) => {
                    if (child.children) {
                        const isOpen = openMobileDropdowns[child.name];
                        return (
                            <li key={idx}>
                                <button
                                    type="button"
                                    onClick={() => toggleMobileDropdown(child.name)}
                                    aria-expanded={!!isOpen}
                                    className="flex w-full justify-between items-center gap-3 py-2.5 text-left text-[14px] font-bold text-gray-700 active:text-[#0f5132] touch-manipulation"
                                >
                                    <span>{child.name}</span>
                                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#0f5132]' : 'text-gray-400'}`} />
                                </button>
                                {isOpen && <div className="mb-2">{renderMobileMenu(child.children, level + 1)}</div>}
                            </li>
                        );
                    }
                    return (
                        <li key={idx}>
                            <Link href={child.href} onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-[13.5px] font-medium text-gray-600 active:text-[#0f5132] touch-manipulation">
                                {child.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <header className="w-full relative z-50 antialiased shadow-sm border-b border-gray-200 font-[Inter,sans-serif]">
            {/* TIER 1: Top Bar */}
            <TopBar1 />

            {/* TIER 2: Brand & Utilities */}
            <div className="bg-white px-4 py-2.5 xl:py-6 relative z-40 transition-all duration-300">
                <div className="max-w-screen-xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-6">
                    {/* Mobile / tablet: compact brand + menu button */}
                    <div className="xl:hidden w-full flex items-center justify-between gap-3">
                        <Link href="/" className="flex items-center gap-3 min-w-0" aria-label="BAUST, Saidpur - Home">
                            <img src="/images/logo.png" className="w-12 h-12 object-contain flex-shrink-0" alt="BAUST Logo" />
                            <span className="text-[1.35rem] font-bold text-[#0f5132] font-serif leading-tight truncate">BAUST, Saidpur</span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="bg-gray-100 p-2.5 rounded-xl text-gray-800 hover:bg-[#0f5132] hover:text-white transition-all shadow-sm active:scale-95 touch-manipulation flex-shrink-0"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>

                    {/* Desktop: full logo area */}
                    <Link href="/" className="hidden xl:flex items-center space-x-4 transition-transform hover:scale-[1.01] flex-shrink-0 group">
                        <img src="/images/logo.png" className="w-[70px] h-[70px] md:w-[85px] md:h-[85px] object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300" alt="BAUST Logo" onError={(e: any) => { e.target.onerror = null; e.target.src = "https://placehold.co/85x85/10B981/ffffff?text=BAUST"; }} />
                        <div className="flex flex-col">
                            <span className="text-[1.35rem] md:text-[1.65rem] font-bold text-[#0f5132] leading-tight drop-shadow-sm font-serif">
                                Bangladesh Army University of
                            </span>
                            <span className="text-lg md:text-[1.35rem] font-semibold text-gray-800 leading-tight">
                                Science and Technology (BAUST), Saidpur
                            </span>
                        </div>
                    </Link>

                    {/* Right Hand Side (Desktop Utilities + CTA) */}
                    <div className="hidden xl:flex flex-col items-end space-y-4 pt-1">
                        <div className="flex rounded-full bg-slate-50 border border-gray-200/60 shadow-inner px-5 py-2 items-center space-x-5 text-[12.5px] font-bold text-gray-600 backdrop-blur-sm">
                            {utilityNavItems.map((item, idx) => {
                                if (item.children) {
                                    return (
                                        <div key={idx} className="relative group/util">
                                            <button className="flex items-center relative hover:text-[#0f5132] transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 group-hover/util:after:w-full after:h-[2px] after:bg-[#0f5132] after:transition-all focus:outline-none">
                                                {item.name}
                                                <ChevronDown className="w-3 h-3 ml-1 opacity-70 group-hover/util:opacity-100 group-hover/util:-rotate-180 transition-transform duration-300" />
                                            </button>
                                            <div className="absolute right-0 mt-0 pt-3 top-full invisible opacity-0 translate-y-2 group-hover/util:visible group-hover/util:opacity-100 group-hover/util:translate-y-0 transition-all duration-300 pointer-events-none group-hover/util:pointer-events-auto z-50">
                                                <div className="w-[260px] bg-white rounded-xl border border-gray-100/50 shadow-2xl ring-1 ring-black/5 divide-y divide-gray-50 overflow-hidden">
                                                    {item.children.map((child, cIdx) => (
                                                        <a
                                                            key={cIdx}
                                                            href={child.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block px-4 py-2.5 text-[13px] font-semibold text-gray-600 hover:text-[#0f5132] hover:bg-emerald-50/60 transition-colors"
                                                        >
                                                            {child.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                const isExternal = item.href.startsWith('http');
                                const Component = isExternal ? 'a' : Link;
                                return (
                                    <Component
                                        key={idx}
                                        href={item.href}
                                        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                        className="relative hover:text-[#0f5132] transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#0f5132] after:transition-all"
                                    >
                                        {item.name}
                                    </Component>
                                );
                            })}
                        </div>
                        <div className="hover:-translate-y-0.5 transition-transform duration-300">
                            <GreenButton href={APPLY_URL} target="_blank" rel="noopener noreferrer">Apply Now</GreenButton>
                        </div>
                    </div>

                </div>
            </div>

            {/* TIER 3: Primary Navigation Desktop */}
            <div className="hidden xl:block bg-[#0f5132] shadow-md relative z-30">
                <div className="max-w-screen-xl mx-auto px-4">
                    <ul className="flex items-center space-x-2 relative w-full justify-center">
                        {mainNavItems.map((item, index) => {
                            const hasChildren = !!(item.children && item.children.length > 0);
                            const isMegaMenu = hasChildren && item.children.some((c: any) => c.children && c.children.length > 0);

                            return (
                                <li key={index} className={`group ${isMegaMenu ? 'static' : 'relative'}`}>
                                    {item.href ? (
                                        <Link href={item.href} className="peer flex items-center py-4 px-5 text-[15px] font-bold text-emerald-50 hover:text-white hover:bg-[#0a3622] transition-all">
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <button className="peer flex items-center py-4 px-5 text-[15px] font-bold text-emerald-50 group-hover:text-white group-hover:bg-[#0a3622] transition-all focus:outline-none">
                                            {item.name}
                                            <ChevronDown className="w-[15px] h-[15px] ml-2 opacity-70 group-hover:opacity-100 group-hover:-rotate-180 transition-transform duration-300" />
                                        </button>
                                    )}

                                    {/* Dropdown Container */}
                                    {hasChildren && (
                                        <div className={`absolute left-0 mt-0 py-1.5 top-full invisible opacity-0 translate-y-3 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75 pointer-events-none group-hover:pointer-events-auto shadow-2xl ${isMegaMenu ? 'w-full' : 'w-[280px]'}`}>
                                            <div className="bg-white rounded-b-xl border border-gray-100/50 overflow-hidden ring-1 ring-black/5 divide-y divide-gray-50 max-h-[75vh] overflow-y-auto">
                                                {isMegaMenu ? (
                                                    // Mega Menu Layout
                                                    <div className="grid grid-cols-4 gap-x-12 gap-y-10 p-10 w-full min-h-[300px]">
                                                        {item.children.map((col: any, cIdx: number) => (
                                                            <div key={cIdx} className="flex flex-col min-w-0 break-inside-avoid h-full">
                                                                {col.children ? (
                                                                    <>
                                                                        <h4 className="flex items-center space-x-2 text-[13.5px] font-bold uppercase tracking-wider text-[#0f5132] mb-4 pb-2 border-b-2 border-emerald-100/50">{col.name}</h4>
                                                                        <ul className="flex justify-start flex-col space-y-3 relative z-10">
                                                                            {col.children.map((link: any, lIdx: number) => (
                                                                                <li key={lIdx}>
                                                                                    <Link href={link.href} className="text-gray-600 hover:text-[#0f5132] hover:font-bold font-medium text-[14px] leading-snug block hover:translate-x-1.5 transition-all w-full">
                                                                                        {link.name}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </>
                                                                ) : (
                                                                    <div className="pt-6 mt-auto">
                                                                        <Link href={col.href} className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 hover:bg-[#0f5132] hover:text-white text-[#0f5132] group/link transition-all duration-300 h-full shadow-sm hover:shadow-md">
                                                                            <span className="font-bold text-sm leading-tight pr-2">{col.name}</span>
                                                                            <ChevronRight className="w-[18px] h-[18px] opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all flex-shrink-0" />
                                                                        </Link>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    // Standard Dropdown Layout
                                                    <ul className="flex flex-col py-1">
                                                        {item.children.map((child: any, cIdx: number) => (
                                                            <li key={cIdx} className="relative group/sub">
                                                                <Link href={child.href} className="block px-6 py-3 text-[14px] font-semibold text-gray-700 hover:bg-emerald-50/50 hover:text-[#0f5132] transition-colors relative before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#0f5132] before:opacity-0 hover:before:opacity-100 before:transition-opacity">
                                                                    {child.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* TIER 3: Mobile Nav Slide Menu */}
            {/* Rendered in the page flow (no nested scroll boxes) so taps land where the finger is after scrolling. */}
            {mobileMenuOpen && (
            <div className="xl:hidden bg-white shadow-inner border-t border-gray-100/80 ring-1 ring-black/5">
                <div className="px-5 py-6 mb-6">
                    <ul className="flex flex-col space-y-2">
                        {mainNavItems.map((item, index) => {
                            const isOpen = openMobileDropdowns[item.name];
                            return (
                                <li key={index} className="border-b border-gray-100/70 last:border-0 pb-2">
                                    {item.href ? (
                                        <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-3 font-bold text-gray-800 active:text-[#0f5132] text-[15px] touch-manipulation">
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <button type="button" onClick={() => toggleMobileDropdown(item.name)} aria-expanded={!!isOpen} className="flex w-full justify-between items-center py-3 font-bold text-gray-800 active:text-[#0f5132] text-[15px] touch-manipulation">
                                            <span>{item.name}</span>
                                            <div className={`bg-gray-50 p-1.5 rounded-md transition-colors ${isOpen ? 'bg-[#0f5132]/10' : ''}`}>
                                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0f5132]' : 'text-gray-500'}`} />
                                            </div>
                                        </button>
                                    )}
                                    {isOpen && item.children && <div className="mb-2">{renderMobileMenu(item.children)}</div>}
                                </li>
                            );
                        })}
                    </ul>

                    {/* Utility Links for Mobile */}
                    <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200">
                        <h4 className="text-[12px] font-bold tracking-widest text-[#0f5132]/50 uppercase mb-4 pl-1">Quick Portals</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-8">
                            {utilityNavItems.flatMap((item, idx) => {
                                if (item.children) {
                                    return item.children.map((child, cIdx) => (
                                        <li key={`${idx}-${cIdx}`}>
                                            <a
                                                href={child.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex font-bold text-[13.5px] items-center text-gray-700 hover:text-white bg-gray-50/80 hover:bg-[#0f5132] border border-gray-200/60 px-4 py-3 rounded-xl transition-all shadow-sm"
                                            >
                                                {child.name}
                                            </a>
                                        </li>
                                    ));
                                }

                                const isExternal = item.href.startsWith('http');
                                const Component = isExternal ? 'a' : Link;
                                return (
                                    <li key={idx}>
                                        <Component
                                            href={item.href}
                                            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                            className="flex font-bold text-[13.5px] items-center text-gray-700 hover:text-white bg-gray-50/80 hover:bg-[#0f5132] border border-gray-200/60 px-4 py-3 rounded-xl transition-all shadow-sm"
                                        >
                                            {item.name}
                                        </Component>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            )}

            <ApplyNowFab hidden={mobileMenuOpen} />
        </header>
    );
}
