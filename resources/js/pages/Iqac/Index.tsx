import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import IqacSlider, { type Slide } from './Slider';
import {
    ShieldCheck, Target, Eye, Award, Users, BookOpen, GraduationCap,
    ClipboardCheck, Building2, FlaskConical, Layers, RefreshCw, Landmark,
    LifeBuoy, CalendarDays, ArrowRight, Quote, CheckCircle2, Sparkles,
    Mail, MapPin, UserRound, type LucideIcon,
} from 'lucide-react';

// Frosted-glass surface used across the page
const glass =
    'bg-white/55 backdrop-blur-2xl border border-white/60 shadow-[0_10px_40px_-12px_rgba(2,44,34,0.18)]';

// Icon keys stored per QA area map to these lucide components (fallback: ShieldCheck).
const QA_ICONS: Record<string, LucideIcon> = {
    Landmark, BookOpen, GraduationCap, Building2, ClipboardCheck,
    LifeBuoy, Users, FlaskConical, Layers, RefreshCw, ShieldCheck, Award, Target,
};

type Member = {
    name: string;
    role: string;
    affiliation: string | null;
    credentials: string | null;
    photo?: string | null;
    lead?: boolean;
};

interface IqacData {
    about: { heading: string; paragraphs: string[] };
    stats: { value: string; label: string }[];
    director: {
        name: string; role: string; affiliation: string;
        credentials: string; photo: string | null; message: string[];
    };
    vision: string;
    mission: string;
    qaAreas: { icon: string; label: string }[];
    obe: { heading: string; description: string; points: string[] };
    members: Member[];
    events: { date: string; title: string }[];
    notices: string[];
    slides: Slide[];
    contact: { address: string; email: string; office: string };
}

function initials(name: string): string {
    const parts = name.replace(/\(.*?\)/g, '').trim().split(/\s+/).filter(Boolean);
    const pick = parts.filter((p) => !/^(dr\.?|prof\.?|md\.?|mr\.?|mrs\.?)$/i.test(p));
    const src = pick.length ? pick : parts;
    return (src[0]?.[0] ?? '') + (src[src.length - 1]?.[0] ?? '');
}

// Photo avatar that gracefully falls back to initials if the image is missing.
function Avatar({
    name,
    photo,
    className,
    initialsClassName = 'bg-gradient-to-br from-emerald-500 to-teal-500',
    textClassName = 'text-white',
}: {
    name: string;
    photo?: string | null;
    className: string;
    initialsClassName?: string;
    textClassName?: string;
}) {
    const [failed, setFailed] = React.useState(false);
    if (photo && !failed) {
        return (
            <img
                src={photo}
                alt={name}
                loading="lazy"
                onError={() => setFailed(true)}
                className={`${className} object-cover object-top`}
            />
        );
    }
    return (
        <div className={`${className} flex items-center justify-center font-black ${initialsClassName} ${textClassName}`}>
            {initials(name)}
        </div>
    );
}

export default function IqacIndex({ iqac }: { iqac: IqacData }) {
    const { about, stats, director, vision, mission, qaAreas, obe, members, events, notices, slides, contact } = iqac;

    return (
        <div className="relative min-h-screen flex flex-col font-sans bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white overflow-x-clip">
            <Head title="Institutional Quality Assurance Cell (IQAC) - BAUST" />

            {/* Ambient colour field that the frosted glass reads against */}
            <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-32 -left-24 w-[38rem] h-[38rem] bg-emerald-300/40 rounded-full blur-[120px]" />
                <div className="absolute top-1/3 -right-32 w-[34rem] h-[34rem] bg-teal-300/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-lime-200/40 rounded-full blur-[120px]" />
            </div>

            <Navbar />
            <PageHero title="Institutional Quality Assurance Cell" subtitle="IQAC · Outcome-Based Education · Since 2017" />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-24">

                {/* Highlights slider */}
                {slides.length > 0 && <IqacSlider slides={slides} />}

                {/* Intro + stats */}
                <section className="grid lg:grid-cols-5 gap-8 items-stretch">
                    <div className={`${glass} lg:col-span-3 rounded-[2.5rem] p-9 lg:p-12`}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600/10 text-emerald-800 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                            <Sparkles className="w-4 h-4" /> Quality First
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-emerald-950 tracking-tight mb-6">
                            {about.heading}
                        </h2>
                        <div className="space-y-4">
                            {about.paragraphs.map((p, i) => (
                                <p key={i} className="text-gray-700 text-lg leading-relaxed text-justify">{p}</p>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-2 gap-5">
                        {stats.map((s, i) => (
                            <div key={i} className={`${glass} rounded-3xl p-6 flex flex-col justify-center`}>
                                <div className="text-4xl font-black bg-gradient-to-br from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                                    {s.value}
                                </div>
                                <div className="mt-2 text-sm font-semibold text-gray-600 leading-snug">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Director's message */}
                <section>
                    <div className={`${glass} rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row`}>
                        <div className="lg:w-2/5 relative p-10 lg:p-12 flex flex-col items-center justify-center text-center bg-gradient-to-br from-emerald-900 to-emerald-800 text-white overflow-hidden">
                            <div aria-hidden className="absolute inset-0 opacity-20">
                                <div className="absolute -top-10 -left-10 w-56 h-56 bg-emerald-400 rounded-full blur-3xl" />
                                <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-teal-300 rounded-full blur-3xl" />
                            </div>
                            <div className="relative z-10">
                                <Avatar
                                    name={director.name}
                                    photo={director.photo}
                                    className="w-32 h-32 rounded-3xl border border-white/25 shadow-2xl mx-auto text-4xl"
                                    initialsClassName="bg-white/10 backdrop-blur-md"
                                    textClassName="text-emerald-100"
                                />
                                <h3 className="mt-6 text-2xl font-black leading-tight">{director.name}</h3>
                                <p className="mt-2 text-emerald-300 font-semibold">{director.role}</p>
                                {director.affiliation && (
                                    <p className="mt-1 text-sm text-emerald-100/80">{director.affiliation}</p>
                                )}
                                {director.credentials && (
                                    <p className="mt-4 text-xs text-emerald-100/70 leading-relaxed">{director.credentials}</p>
                                )}
                            </div>
                        </div>

                        <div className="lg:w-3/5 p-10 lg:p-14 relative">
                            <Quote className="w-12 h-12 text-emerald-200 mb-4" />
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 mb-4">Message from the Director</p>
                            <div className="space-y-4 text-gray-700 text-lg leading-relaxed text-justify">
                                {director.message.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision & Mission */}
                <section className="grid md:grid-cols-2 gap-8">
                    <div className={`${glass} rounded-[2.5rem] p-10 lg:p-12 group hover:-translate-y-1 transition-transform duration-300`}>
                        <div className="w-16 h-16 rounded-2xl bg-emerald-600/10 flex items-center justify-center mb-7 group-hover:bg-emerald-600 transition-colors duration-300">
                            <Eye className="w-8 h-8 text-emerald-700 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-2xl font-black text-emerald-950 mb-4">Our Vision</h3>
                        <p className="text-gray-700 text-lg leading-relaxed">{vision}</p>
                    </div>

                    <div className={`${glass} rounded-[2.5rem] p-10 lg:p-12 group hover:-translate-y-1 transition-transform duration-300`}>
                        <div className="w-16 h-16 rounded-2xl bg-teal-600/10 flex items-center justify-center mb-7 group-hover:bg-teal-600 transition-colors duration-300">
                            <Target className="w-8 h-8 text-teal-700 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-2xl font-black text-emerald-950 mb-4">Our Mission</h3>
                        <p className="text-gray-700 text-lg leading-relaxed">{mission}</p>
                    </div>
                </section>

                {/* Quality Assurance Areas */}
                {qaAreas.length > 0 && (
                    <section>
                        <div className="text-center mb-14">
                            <h2 className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-600 mb-3">Our Coverage</h2>
                            <h3 className="text-3xl lg:text-4xl font-black text-emerald-950">Quality Assurance Areas</h3>
                            <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full mt-5" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                            {qaAreas.map((area, i) => {
                                const Icon = QA_ICONS[area.icon] ?? ShieldCheck;
                                return (
                                    <div
                                        key={i}
                                        className={`${glass} rounded-3xl p-6 flex flex-col items-center text-center gap-4 hover:-translate-y-1.5 hover:bg-white/75 transition-all duration-300`}
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-700 leading-snug">{area.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* OBE Corner highlight */}
                <section>
                    <div className="relative rounded-[2.75rem] overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 text-white p-10 lg:p-16 shadow-2xl">
                        <div aria-hidden className="absolute inset-0 opacity-30 pointer-events-none">
                            <div className="absolute top-0 right-0 w-[34rem] h-[34rem] bg-emerald-500/30 rounded-full blur-[110px] translate-x-1/3 -translate-y-1/3" />
                            <div className="absolute bottom-0 left-0 w-[26rem] h-[26rem] bg-teal-400/20 rounded-full blur-[90px] -translate-x-1/4 translate-y-1/3" />
                        </div>
                        <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                                    <Award className="w-4 h-4" /> OBE Corner
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-black leading-tight mb-5">{obe.heading}</h3>
                                <p className="text-emerald-100/85 text-lg leading-relaxed">{obe.description}</p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {obe.points.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm font-semibold text-emerald-50">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team / Organogram */}
                {members.length > 0 && (
                    <section>
                        <div className="text-center mb-14">
                            <h2 className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-600 mb-3">Organogram</h2>
                            <h3 className="text-3xl lg:text-4xl font-black text-emerald-950">The IQAC Team</h3>
                            <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full mt-5" />
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {members.map((m, i) => (
                                <div
                                    key={i}
                                    className={`${glass} rounded-3xl p-7 flex flex-col hover:-translate-y-1.5 transition-all duration-300 ${
                                        m.lead ? 'ring-2 ring-emerald-400/50' : ''
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Avatar
                                            name={m.name}
                                            photo={m.photo}
                                            className={`w-16 h-16 rounded-2xl text-xl shadow-lg flex-shrink-0 ${
                                                m.lead ? 'ring-2 ring-emerald-300' : ''
                                            }`}
                                            initialsClassName={
                                                m.lead
                                                    ? 'bg-gradient-to-br from-emerald-600 to-teal-500'
                                                    : 'bg-gradient-to-br from-emerald-500/90 to-teal-400/90'
                                            }
                                        />
                                        <div className="min-w-0">
                                            <h4 className="font-black text-emerald-950 leading-tight">{m.name}</h4>
                                            <p className="text-sm font-bold text-emerald-600 mt-0.5">{m.role}</p>
                                        </div>
                                    </div>
                                    {m.affiliation && (
                                        <p className="mt-4 text-sm font-semibold text-gray-700">{m.affiliation}</p>
                                    )}
                                    {m.credentials && (
                                        <p className="mt-2 text-xs text-gray-500 leading-relaxed">{m.credentials}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Activities + Notices */}
                <section className="grid lg:grid-cols-5 gap-8 items-start">
                    {/* Events timeline */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-11 h-11 rounded-2xl bg-emerald-600/10 flex items-center justify-center">
                                <CalendarDays className="w-6 h-6 text-emerald-700" />
                            </div>
                            <h3 className="text-2xl font-black text-emerald-950">Activities &amp; Events</h3>
                        </div>
                        <div className="space-y-4">
                            {events.map((e, i) => (
                                <div
                                    key={i}
                                    className={`${glass} rounded-2xl p-6 flex gap-5 items-start hover:bg-white/75 transition-colors duration-300`}
                                >
                                    <div className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold whitespace-nowrap">
                                        {e.date}
                                    </div>
                                    <p className="text-gray-700 font-semibold leading-snug">{e.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notices */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-11 h-11 rounded-2xl bg-teal-600/10 flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6 text-teal-700" />
                            </div>
                            <h3 className="text-2xl font-black text-emerald-950">Notices</h3>
                        </div>
                        <div className={`${glass} rounded-3xl p-4 divide-y divide-emerald-100/70`}>
                            {notices.map((n, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 group cursor-default">
                                    <ArrowRight className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                                    <p className="text-sm font-semibold text-gray-700 leading-snug group-hover:text-emerald-800 transition-colors">
                                        {n}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section>
                    <div className={`${glass} rounded-[2.5rem] p-9 lg:p-12 grid md:grid-cols-3 gap-8`}>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6 text-emerald-700" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1">Address</p>
                                <p className="text-gray-700 font-semibold leading-snug">{contact.address}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center flex-shrink-0">
                                <Mail className="w-6 h-6 text-emerald-700" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1">Email</p>
                                <p className="text-gray-700 font-semibold leading-snug">{contact.email}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center flex-shrink-0">
                                <UserRound className="w-6 h-6 text-emerald-700" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1">Office</p>
                                <p className="text-gray-700 font-semibold leading-snug">{contact.office}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
