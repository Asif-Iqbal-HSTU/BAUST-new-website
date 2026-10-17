import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { CalendarDays, Building2, GraduationCap, ShieldCheck, Sparkles, Flag } from 'lucide-react';

interface BriefHistoryRecord {
    id: number;
    title: string | null;
    content: string | null;
    image_path: string | null;
    order: number;
}

const glass = 'bg-white/55 backdrop-blur-2xl border border-white/60 shadow-[0_10px_40px_-12px_rgba(2,44,34,0.18)]';

const stats = [
    { icon: CalendarDays, value: '15 Feb 2015', label: 'Established' },
    { icon: GraduationCap, value: '10', label: 'Departments' },
    { icon: Building2, value: '05', label: 'Faculties' },
    { icon: Flag, value: 'Army', label: 'Welfare Trust' },
];

export default function BriefHistory({ histories }: { histories: BriefHistoryRecord[] }) {
    const lead = histories[0];

    return (
        <div className="relative min-h-screen flex flex-col font-sans bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white overflow-x-clip">
            <Head title="Brief History - BAUST" />

            <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-32 -left-24 w-[38rem] h-[38rem] bg-emerald-300/40 rounded-full blur-[120px]" />
                <div className="absolute top-1/3 -right-32 w-[34rem] h-[34rem] bg-teal-300/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-lime-200/40 rounded-full blur-[120px]" />
            </div>

            <Navbar />
            <PageHero title="Brief History" subtitle="Bangladesh Army University of Science & Technology · Since 2015" />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-20">

                {/* Intro + hero image */}
                <section className="grid lg:grid-cols-5 gap-8 items-stretch">
                    <div className={`${glass} lg:col-span-3 rounded-[2.5rem] p-9 lg:p-12 flex flex-col justify-center`}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600/10 text-emerald-800 text-xs font-bold uppercase tracking-[0.2em] mb-6 w-fit">
                            <Sparkles className="w-4 h-4" /> Our Journey
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-emerald-950 tracking-tight mb-6 leading-tight">
                            The pioneer technical institute of the Armed Forces
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed text-justify">
                            {lead?.content ??
                                'Bangladesh Army University of Science & Technology (BAUST) started its journey on 15th February 2015 at Saidpur Cantonment, sponsored by the Bangladesh Army Welfare Trust.'}
                        </p>
                    </div>
                    {lead?.image_path && (
                        <div className="lg:col-span-2 relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/50 min-h-[16rem]">
                            <img src={lead.image_path} alt="Inauguration of BAUST" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 to-transparent" />
                            <div className="absolute bottom-0 p-6">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/90 text-white text-xs font-bold">
                                    <CalendarDays className="w-4 h-4" /> Inaugurated 15 Feb 2015
                                </span>
                            </div>
                        </div>
                    )}
                </section>

                {/* Stats band */}
                <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((s, i) => (
                        <div key={i} className={`${glass} rounded-3xl p-6 flex flex-col items-center text-center gap-3`}>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                                <s.icon className="w-7 h-7 text-white" />
                            </div>
                            <div className="text-2xl font-black bg-gradient-to-br from-emerald-600 to-teal-500 bg-clip-text text-transparent">{s.value}</div>
                            <div className="text-sm font-semibold text-gray-600 leading-snug">{s.label}</div>
                        </div>
                    ))}
                </section>

                {/* History sections (DB-driven, alternating) */}
                {histories.length === 0 ? (
                    <div className="text-center text-gray-500 py-16"><p className="text-xl">Content is being updated. Please check back later.</p></div>
                ) : (
                    <div className="space-y-16">
                        {histories.map((h, index) => {
                            const imageLeft = index % 2 === 0;
                            return (
                                <section
                                    key={h.id}
                                    className={`${glass} rounded-[2.5rem] overflow-hidden flex flex-col ${imageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                                >
                                    {h.image_path && (
                                        <div className="lg:w-1/2 relative group min-h-[16rem]">
                                            <img
                                                src={h.image_path}
                                                alt={h.title ?? 'BAUST History'}
                                                loading="lazy"
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                            />
                                        </div>
                                    )}
                                    <div className={`${h.image_path ? 'lg:w-1/2' : 'w-full'} p-9 lg:p-14 flex flex-col justify-center`}>
                                        <div className="flex items-center gap-3 mb-5">
                                            <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center shadow-lg">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            {h.title && <h3 className="text-2xl lg:text-3xl font-black text-emerald-950 leading-tight">{h.title}</h3>}
                                        </div>
                                        {h.content && <p className="text-gray-700 text-lg leading-relaxed text-justify">{h.content}</p>}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}

                {/* Closing badge */}
                <section>
                    <div className="relative rounded-[2.75rem] overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 text-white p-10 lg:p-14 text-center shadow-2xl">
                        <div aria-hidden className="absolute inset-0 opacity-30 pointer-events-none">
                            <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-emerald-500/30 rounded-full blur-[110px] translate-x-1/3 -translate-y-1/3" />
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                            <ShieldCheck className="w-12 h-12 text-emerald-300 mb-5" />
                            <h3 className="text-2xl lg:text-3xl font-black mb-3">Serving the nation through quality education</h3>
                            <p className="text-emerald-100/85 text-lg max-w-3xl">
                                In full compliance with the Private University Act 2010, BAUST continues to spread technical education
                                across the country under the patronage of the Bangladesh Army Welfare Trust.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
