import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { ICT_TABS, ICT_DEPT_NAME } from '@/data/ictData';
import { Cpu, ShieldAlert, Award, BookOpen, GraduationCap, Users } from 'lucide-react';

const RESEARCH_AREAS = [
    {
        title: "Wireless & Mobile Communications",
        icon: Cpu,
        description: "5G/6G communication systems, cognitive radio networks, antenna propagation, and cellular signal modulation optimizations."
    },
    {
        title: "Cryptography & Cybersecurity",
        icon: ShieldAlert,
        description: "Intrusion detection systems, data privacy, threat modeling in cloud networks, and lightweight cryptography for IoT."
    },
    {
        title: "Machine Learning & CV",
        icon: GraduationCap,
        description: "Deep learning models, natural language processing, computer vision applications in medical imaging and agricultural automation."
    },
    {
        title: "IoT & Embedded Systems",
        icon: BookOpen,
        description: "Smart city grid automation, hardware-in-the-loop simulation, low-power sensor interfacing, and robotics control systems."
    }
];

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

export default function IctResearch({ department }: { department?: DeptInfo | null }) {
    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Research - ICT - BAUST" />
            <Navbar />
            <PageHero 
                title="Research & Publications" 
                subtitle="Advancing Knowledge and Engineering Solutions" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.name || ICT_DEPT_NAME} activeTab="Research" tabs={ICT_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

                {/* Research Overview */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                            Research Overview
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed text-justify">
                            Research in the Department of Information and Communication Technology focuses on bridging communication infrastructures with computer intelligence models. Our faculty and student groups engage in collaborative work designed to solve national challenges while publishing in peer-reviewed journals and international conferences.
                        </p>
                    </div>
                </div>

                {/* Vision/Mission of Research Committee */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-600" />
                    <div className="p-8 lg:p-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-teal-500 rounded-full" />
                            Research Committee Objectives
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative bg-teal-50/60 border border-teal-100 rounded-2xl p-6">
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-teal-600 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">Vision</span>
                                </div>
                                <p className="text-gray-600 text-[14px] leading-relaxed mt-3">
                                    To nurture an outstanding research ecosystem that drives local technological innovations, supports modern telecom and IT industry requirements, and upholds academic integrity.
                                </p>
                            </div>
                            <div className="relative bg-cyan-50/60 border border-cyan-100 rounded-2xl p-6">
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-cyan-600 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">Mission</span>
                                </div>
                                <ul className="text-gray-600 text-[14px] leading-relaxed mt-3 space-y-2 list-disc pl-4">
                                    <li>Provide seed funding and mentorship to student-led engineering research.</li>
                                    <li>Promote ethics, peer review publications, and patent applications.</li>
                                    <li>Facilitate industry-academia joint workshops and project collaborations.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Research Areas */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-950 mb-8 flex items-center gap-2">
                        <Award className="text-emerald-600" />
                        Proposed Research Areas
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {RESEARCH_AREAS.map((area, idx) => {
                            const Icon = area.icon;
                            return (
                                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 flex-shrink-0">
                                            <Icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">{area.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{area.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Ethics Guidelines */}
                <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                        <Users size={120} />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-400">
                            Research Ethics & Compliance
                        </h3>
                        <p className="text-slate-300 leading-relaxed text-sm">
                            The department maintains high academic standards. All research proposals must undergo ethical scrutiny by the Department Research Committee to guarantee safety, transparency, copyright verification, and absolute confidentiality where applicable.
                        </p>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
