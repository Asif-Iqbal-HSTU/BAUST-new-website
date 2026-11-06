import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';
import { Users, Award, Briefcase, GraduationCap, Star, Zap, BookOpen, Coffee, Heart, Phone, Building2 } from 'lucide-react';

interface ActivityItem {
    title: string;
    description: string;
}

interface CommitteeMember {
    role: string;
    name: string;
    contact?: string | null;
}

interface AlumniData {
    id?: number;
    name: string;
    slug?: string;
    description?: string | null;
    member_count?: string | null;
    established?: string | null;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    alumni?: AlumniData | null;
}

const DEFAULT_ACTIVITIES: ActivityItem[] = [
    { title: "Technical Seminars & Workshops", description: "Regular sessions and industry tutorials with leading professional civil engineers." },
    { title: "Field Trips & Site Visits", description: "Coordinating practical visits to ongoing megaprojects and infrastructure sites." },
    { title: "Job Fairs & Career Mentoring", description: "Connecting fresh graduates with recruiters in consulting, government, and construction." },
    { title: "Reunions & Annual Picnics", description: "Social and cultural gatherings strengthening unity and camaraderie among alumni batches." },
    { title: "Research & Innovation Support", description: "Providing guidance and sponsorship for undergraduate thesis projects and research." },
    { title: "Community Service & Blood Drives", description: "Participating in humanitarian initiatives, environmental cleanup, and emergency relief." },
];

const DEFAULT_COMMITTEE: CommitteeMember[] = [
    { role: "President", name: "Md. Abu Helal", contact: "01795748743" },
    { role: "Coordinator & Treasurer", name: "Zubair Reaz", contact: "01774516589" },
    { role: "VP (Liaison & PR)", name: "Urnisha Roy Chowdhury", contact: "01792929263" },
    { role: "VP (Research & Dev)", name: "Md. Abdul Malek", contact: "01837691013" },
    { role: "VP (Member Relation)", name: "Rifat Ara", contact: "01797734845" },
    { role: "Secretary General", name: "Md. Waqar Ahmed Imteaz", contact: "01974604857" },
    { role: "Joint Secretary General", name: "Md. Abu Syied Hasan", contact: "01319998499" },
    { role: "Secretary (Publication)", name: "Md. Sayedur Rahman Mahin", contact: "01623455479" },
    { role: "Secretary (Finance)", name: "Arpita Deb Roy", contact: "01777293767" },
];

export default function CeAlumni({ department, alumni }: Props) {
    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Alumni - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={department?.name ? `Alumni Association - ${department.name}` : "Department of Civil Engineering (CE)"} 
                subtitle="Bridging Past, Present, and Future Civil Engineers" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Alumni" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
                
                {/* Intro Hero Banner */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 sm:p-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                                <Users className="w-7 h-7" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                                    Official Alumni Network
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {alumni?.name || 'Civil Engineering Alumni Association'}
                                </h2>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify max-w-4xl">
                            {alumni?.description || "To establish a dynamic and forward-looking alumni network for the Department of Civil Engineering at BAUST, Saidpur—one that fosters social, cultural, academic, and professional engagement among graduates. Our mission is to strengthen the bonds of unity and fellowship among alumni, while also supporting the continuous development of our department into a leading center of excellence in civil and infrastructure engineering. Through collaboration and contribution, we aim to play an active role in national development."}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <GraduationCap className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Membership</p>
                                    <p className="text-sm sm:text-base font-extrabold text-gray-900">{alumni?.member_count || '100+ Graduates'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Building2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Established</p>
                                    <p className="text-sm sm:text-base font-extrabold text-gray-900">{alumni?.established || '2023'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                                <Briefcase className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Industry Sectors</p>
                                    <p className="text-sm sm:text-base font-extrabold text-gray-900">Government & Megaprojects</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Activities */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Zap className="text-emerald-700 w-6 h-6" />
                        <h3 className="text-2xl font-bold text-gray-900">Alumni Activities & Initiatives</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {DEFAULT_ACTIVITIES.map((act, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
                                    {idx + 1}
                                </div>
                                <h4 className="font-bold text-gray-900 text-base mb-2">{act.title}</h4>
                                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed text-justify">{act.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Executive Committee */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        <div className="flex items-center gap-3 mb-8">
                            <Award className="w-6 h-6 text-emerald-700" />
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Alumni Executive Committee</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Elected leadership team guiding alumni initiatives and student mentorship</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {DEFAULT_COMMITTEE.map((m, idx) => (
                                <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between hover:border-emerald-200 transition-colors">
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                                            {m.role}
                                        </span>
                                        <h4 className="font-bold text-gray-900 text-base mt-2">{m.name}</h4>
                                    </div>
                                    {m.contact && (
                                        <div className="mt-3 pt-2 border-t border-gray-200/50 flex items-center gap-1.5 text-xs text-gray-500">
                                            <Phone className="w-3.5 h-3.5 text-emerald-600" />
                                            <span>{m.contact}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
