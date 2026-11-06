import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import {
    FlaskConical, BookOpen, Lightbulb, Phone, Download, ExternalLink,
    ArrowUpRight, Microscope, FileText, Newspaper,
} from 'lucide-react';

interface TeamMember {
    name: string;
    role: string;
    designation: string;
    phone: string;
    photo: string;
}

interface Stat {
    value: string;
    label: string;
}

interface DepartmentLink {
    name: string;
    short_name: string;
    link: string;
}

export interface ResearchContent {
    browser_title: string;
    hero: { title: string; subtitle: string };
    nav_labels: { cell: string; publications: string; projects: string };
    intro: {
        heading: string;
        paragraphs: string[];
        highlighted_phrase: string;
        stats: Stat[];
    };
    cell: {
        kicker: string;
        heading: string;
        description: string;
        team_members: TeamMember[];
    };
    publications: {
        kicker: string;
        heading: string;
        newsletter_badge: string;
        newsletter_title: string;
        newsletter_description: string;
        newsletter_pdf: string;
        view_button_label: string;
        download_button_label: string;
        departmental_heading: string;
        departmental_description: string;
    };
    projects: {
        kicker: string;
        heading: string;
        description: string;
    };
    departments: DepartmentLink[];
}

function avatar(name: string) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=059669&color=fff&size=128&font-size=0.33`;
}

/** Renders a paragraph, emphasising every occurrence of `phrase`. */
function highlight(text: string, phrase: string): React.ReactNode {
    if (!phrase || !text.includes(phrase)) return text;
    const parts = text.split(phrase);
    return parts.map((part, i) => (
        <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && <span className="font-semibold text-emerald-700">{phrase}</span>}
        </React.Fragment>
    ));
}

function SectionHeading({ icon: Icon, kicker, title }: { icon: React.ElementType; kicker: string; title: string }) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">{kicker}</p>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">{title}</h2>
            </div>
        </div>
    );
}

export default function ResearchIndex({ content }: { content: ResearchContent }) {
    const { intro, cell, publications, projects, departments } = content;

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={content.browser_title} />
            <Navbar />
            <PageHero title={content.hero.title} subtitle={content.hero.subtitle} compact={true} />

            {/* Quick-jump nav */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
                        {[
                            { id: 'cell', label: content.nav_labels.cell, icon: FlaskConical },
                            { id: 'publications', label: content.nav_labels.publications, icon: BookOpen },
                            { id: 'projects', label: content.nav_labels.projects, icon: Lightbulb },
                        ].map(({ id, label, icon: Icon }) => (
                            <a key={id} href={`#${id}`} className="whitespace-nowrap px-4 py-3 text-[13px] font-semibold text-gray-500 hover:text-emerald-700 border-b-2 border-transparent hover:border-emerald-300 transition-all flex items-center gap-1.5">
                                <Icon className="w-4 h-4" /> {label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

                {/* Intro */}
                <section className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                        <div className="p-8 sm:p-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Microscope className="w-6 h-6" /></div>
                                <h2 className="text-xl font-bold text-gray-900">{intro.heading}</h2>
                            </div>
                            {intro.paragraphs.map((p, i) => (
                                <p key={i} className={`${i > 0 ? 'mt-4 ' : ''}text-[15px] text-gray-600 leading-relaxed`}>
                                    {highlight(p, intro.highlighted_phrase)}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 content-start">
                        {intro.stats.map((s, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                                <div className="text-3xl font-black bg-gradient-to-br from-emerald-600 to-green-600 bg-clip-text text-transparent">{s.value}</div>
                                <div className="mt-1 text-xs font-semibold text-gray-500 leading-snug">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Research & Publication Cell */}
                <section id="cell" className="scroll-mt-24">
                    <SectionHeading icon={FlaskConical} kicker={cell.kicker} title={cell.heading} />
                    <p className="text-[15px] text-gray-600 leading-relaxed max-w-3xl">
                        {cell.description}
                    </p>
                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cell.team_members.map((m, i) => (
                            <div key={`${m.name}-${i}`} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                <div className="h-1 bg-gradient-to-r from-emerald-400 to-green-500" />
                                <div className="p-5 flex flex-col items-center text-center flex-grow">
                                    <img
                                        src={m.photo || avatar(m.name)}
                                        alt={m.name}
                                        loading="lazy"
                                        onError={(e) => { e.currentTarget.src = avatar(m.name); }}
                                        className="w-28 h-28 rounded-xl object-cover object-top shadow-sm mb-4 bg-gray-50"
                                    />
                                    {m.role && (
                                        <span className="inline-block bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full mb-2">{m.role}</span>
                                    )}
                                    <h3 className="text-[14px] font-bold text-gray-900 leading-snug">{m.name}</h3>
                                    <p className="mt-1 text-[11.5px] text-gray-500 leading-relaxed">{m.designation}</p>
                                    {m.phone && (
                                        <a href={`tel:${m.phone}`} className="mt-3 inline-flex items-center gap-1.5 text-emerald-700 text-[12px] font-semibold"><Phone className="w-3.5 h-3.5" /> {m.phone}</a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Publications */}
                <section id="publications" className="scroll-mt-24">
                    <SectionHeading icon={BookOpen} kicker={publications.kicker} title={publications.heading} />
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Newsletter feature */}
                        <div className="lg:col-span-1">
                            <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 rounded-3xl p-7 shadow-xl text-white relative overflow-hidden">
                                <Newspaper className="absolute -right-5 -bottom-5 w-40 h-40 text-white/10" />
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 bg-white/15 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"><Newspaper className="w-3.5 h-3.5" /> {publications.newsletter_badge}</div>
                                    <h3 className="text-xl font-extrabold leading-snug">{publications.newsletter_title}</h3>
                                    <p className="mt-2 text-emerald-50/90 text-sm leading-relaxed">{publications.newsletter_description}</p>
                                    {publications.newsletter_pdf && (
                                        <div className="mt-5 flex flex-wrap gap-2">
                                            <a href={publications.newsletter_pdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold text-sm px-4 py-2.5 rounded-xl shadow hover:gap-3 transition-all"><ExternalLink className="w-4 h-4" /> {publications.view_button_label}</a>
                                            <a href={publications.newsletter_pdf} download className="inline-flex items-center gap-2 bg-emerald-500/40 border border-white/30 text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-emerald-500/60 transition-all"><Download className="w-4 h-4" /> {publications.download_button_label}</a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Departmental publications note */}
                        <div className="lg:col-span-2 bg-white rounded-3xl shadow-md border border-gray-100 p-8">
                            <div className="flex items-center gap-3 mb-3">
                                <FileText className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-lg font-bold text-gray-900">{publications.departmental_heading}</h3>
                            </div>
                            <p className="text-[15px] text-gray-600 leading-relaxed">
                                {publications.departmental_description}
                            </p>
                            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {departments.map((d, i) => (
                                    <Link key={`${d.short_name}-${i}`} href={d.link} className="group flex items-center justify-between gap-2 bg-slate-50 hover:bg-emerald-50 rounded-xl px-4 py-3 border border-gray-100 hover:border-emerald-200 transition-all">
                                        <span className="min-w-0">
                                            <span className="block text-sm font-bold text-gray-800 group-hover:text-emerald-700">{d.short_name}</span>
                                            <span className="block text-[10.5px] text-gray-400 truncate">{d.name}</span>
                                        </span>
                                        <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-600 flex-shrink-0" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects */}
                <section id="projects" className="scroll-mt-24">
                    <SectionHeading icon={Lightbulb} kicker={projects.kicker} title={projects.heading} />
                    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8">
                        <p className="text-[15px] text-gray-600 leading-relaxed max-w-3xl">
                            {projects.description}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {departments.map((d, i) => (
                                <Link key={`${d.short_name}-${i}`} href={d.link} className="inline-flex items-center gap-2 bg-slate-50 text-gray-700 hover:text-emerald-700 text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 hover:border-emerald-300 shadow-sm hover:shadow transition-all">
                                    {d.short_name} <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
