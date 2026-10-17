import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import {
    FlaskConical, BookOpen, Lightbulb, Users, Phone, Download, ExternalLink,
    ArrowUpRight, Microscope, FileText, Newspaper,
} from 'lucide-react';

interface Member {
    name: string;
    role: string;
    designation: string;
    phone: string;
    photo: string | null;
}

const TEAM: Member[] = [
    { name: 'Dr. Kazi Mohammad Anamoul Haque', role: 'Director', designation: 'Associate Professor (Chemistry), Department of Arts and Sciences', phone: '01769662706', photo: '/images/departments/as/faculty/as-dr-kazi-mohammad-anamoul-haque.jpg' },
    { name: 'Azra Sadia Sultana', role: 'Deputy Director', designation: 'Assistant Professor, Department of Electrical and Electronic Engineering', phone: '01912991530', photo: '/images/research/team/research-azra-sadia-sultana.jpg' },
    { name: 'Md. Ajgor Ali', role: 'Member', designation: 'Laboratory Technician, Department of Mechanical Engineering', phone: '01713419110', photo: '/images/research/team/research-md-ajgor-ali.jpg' },
    { name: 'Md. Sharier Hasan', role: 'Member', designation: 'Computer Operator', phone: '01722400520', photo: '/images/research/team/research-md-sharier-hasan.jpg' },
];

const DEPARTMENTS = [
    { name: 'Computer Science & Engineering', short: 'CSE', href: '/cse' },
    { name: 'Information & Communication Technology', short: 'ICT', href: '/ict' },
    { name: 'Electrical & Electronic Engineering', short: 'EEE', href: '/eee' },
    { name: 'Mechanical Engineering', short: 'ME', href: '/me' },
    { name: 'Industrial & Production Engineering', short: 'IPE', href: '/ipe' },
    { name: 'Civil Engineering', short: 'CE', href: '/ce' },
    { name: 'Business Administration', short: 'DBA', href: '/dba' },
    { name: 'Accounting & Information Systems', short: 'AIS', href: '/ais' },
    { name: 'English', short: 'ENG', href: '/eng' },
    { name: 'Arts & Sciences', short: 'A&S', href: '/as' },
];

const NEWSLETTER = '/images/research/BAUST-Newsletter-Issue-01.pdf';

function avatar(name: string) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=059669&color=fff&size=128&font-size=0.33`;
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

export default function ResearchIndex() {
    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Research & Publication - BAUST" />
            <Navbar />
            <PageHero title="Research & Publication" subtitle="Advancing knowledge through research, publications and innovation" compact={true} />

            {/* Quick-jump nav */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
                        {[
                            { id: 'cell', label: 'Research & Publication Cell', icon: FlaskConical },
                            { id: 'publications', label: 'Publications', icon: BookOpen },
                            { id: 'projects', label: 'Projects', icon: Lightbulb },
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
                                <h2 className="text-xl font-bold text-gray-900">Research at BAUST</h2>
                            </div>
                            <p className="text-[15px] text-gray-600 leading-relaxed">
                                Bangladesh Army University of Science and Technology (BAUST) is committed to advancing knowledge through quality research and scholarly publication. Across its faculties and departments, teachers and students engage in research that addresses real engineering, scientific and business challenges — supported and coordinated by the university's <span className="font-semibold text-emerald-700">Research and Publication Cell</span>.
                            </p>
                            <p className="mt-4 text-[15px] text-gray-600 leading-relaxed">
                                The Cell promotes a vibrant research culture, oversees the university's publications and newsletter, and facilitates collaboration, dissemination and recognition of research output across every department.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 content-start">
                        {[
                            { v: '10', l: 'Departments engaged in research' },
                            { v: '6', l: 'Faculties across disciplines' },
                            { v: '01', l: 'University newsletter issues' },
                            { v: '∞', l: 'Ideas in progress' },
                        ].map((s, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                                <div className="text-3xl font-black bg-gradient-to-br from-emerald-600 to-green-600 bg-clip-text text-transparent">{s.v}</div>
                                <div className="mt-1 text-xs font-semibold text-gray-500 leading-snug">{s.l}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Research & Publication Cell */}
                <section id="cell" className="scroll-mt-24">
                    <SectionHeading icon={FlaskConical} kicker="The Cell" title="Research & Publication Cell" />
                    <p className="text-[15px] text-gray-600 leading-relaxed max-w-3xl">
                        The Research and Publication Cell coordinates research activities and scholarly publishing across the university. It is administered by a Director and Deputy Director, supported by a dedicated team.
                    </p>
                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {TEAM.map((m) => (
                            <div key={m.name} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                <div className="h-1 bg-gradient-to-r from-emerald-400 to-green-500" />
                                <div className="p-5 flex flex-col items-center text-center flex-grow">
                                    <img
                                        src={m.photo || avatar(m.name)}
                                        alt={m.name}
                                        loading="lazy"
                                        onError={(e) => { e.currentTarget.src = avatar(m.name); }}
                                        className="w-28 h-28 rounded-xl object-cover object-top shadow-sm mb-4 bg-gray-50"
                                    />
                                    <span className="inline-block bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full mb-2">{m.role}</span>
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
                    <SectionHeading icon={BookOpen} kicker="Scholarly Output" title="Publications" />
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Newsletter feature */}
                        <div className="lg:col-span-1">
                            <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 rounded-3xl p-7 shadow-xl text-white relative overflow-hidden">
                                <Newspaper className="absolute -right-5 -bottom-5 w-40 h-40 text-white/10" />
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 bg-white/15 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"><Newspaper className="w-3.5 h-3.5" /> Newsletter</div>
                                    <h3 className="text-xl font-extrabold leading-snug">BAUST Newsletter — Issue 01</h3>
                                    <p className="mt-2 text-emerald-50/90 text-sm leading-relaxed">Highlights of academic and research activities across the university.</p>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        <a href={NEWSLETTER} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold text-sm px-4 py-2.5 rounded-xl shadow hover:gap-3 transition-all"><ExternalLink className="w-4 h-4" /> View</a>
                                        <a href={NEWSLETTER} download className="inline-flex items-center gap-2 bg-emerald-500/40 border border-white/30 text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-emerald-500/60 transition-all"><Download className="w-4 h-4" /> Download</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Departmental publications note */}
                        <div className="lg:col-span-2 bg-white rounded-3xl shadow-md border border-gray-100 p-8">
                            <div className="flex items-center gap-3 mb-3">
                                <FileText className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-lg font-bold text-gray-900">Departmental Publications</h3>
                            </div>
                            <p className="text-[15px] text-gray-600 leading-relaxed">
                                Research papers, journal articles and conference publications are produced across all departments of BAUST. Explore the work of each department to learn more about their faculty, research areas and scholarly contributions.
                            </p>
                            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {DEPARTMENTS.map((d) => (
                                    <Link key={d.short} href={d.href} className="group flex items-center justify-between gap-2 bg-slate-50 hover:bg-emerald-50 rounded-xl px-4 py-3 border border-gray-100 hover:border-emerald-200 transition-all">
                                        <span className="min-w-0">
                                            <span className="block text-sm font-bold text-gray-800 group-hover:text-emerald-700">{d.short}</span>
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
                    <SectionHeading icon={Lightbulb} kicker="Innovation" title="Projects" />
                    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8">
                        <p className="text-[15px] text-gray-600 leading-relaxed max-w-3xl">
                            Students and faculty across every department undertake academic and applied projects — from software systems and electronics to mechanical, industrial and civil engineering, and business research. Discover departmental projects and capstone work through the department pages below.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {DEPARTMENTS.map((d) => (
                                <Link key={d.short} href={d.href} className="inline-flex items-center gap-2 bg-slate-50 text-gray-700 hover:text-emerald-700 text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 hover:border-emerald-300 shadow-sm hover:shadow transition-all">
                                    {d.short} <ArrowUpRight className="w-4 h-4" />
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
