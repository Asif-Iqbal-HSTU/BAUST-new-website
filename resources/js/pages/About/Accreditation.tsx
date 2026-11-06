import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { CheckCircle2, Clock, AlertCircle, Award, ShieldCheck, GraduationCap, FileSearch, X, Zap, Monitor, Settings, Factory, HardHat, Briefcase, BookText, TrendingUp } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';

interface Program {
    name: string;
    ugc: boolean;
    status: 'Accredited' | 'Applied' | 'Under Process' | 'Yet to Apply';
    remarks: string;
    type: 'Engineering' | 'Non-Engineering';
    certificate?: string;
}

const getProgramIcon = (name: string) => {
    switch (name.toUpperCase()) {
        case 'EEE': return <Zap className="w-8 h-8" />;
        case 'CSE': return <Monitor className="w-8 h-8" />;
        case 'ME': return <Settings className="w-8 h-8" />;
        case 'IPE': return <Factory className="w-8 h-8" />;
        case 'CE': return <HardHat className="w-8 h-8" />;
        case 'BBA': return <Briefcase className="w-8 h-8" />;
        case 'ENGLISH': return <BookText className="w-8 h-8" />;
        case 'MBA': return <TrendingUp className="w-8 h-8" />;
        default: return <GraduationCap className="w-8 h-8" />;
    }
};

const programs: Program[] = [
    { name: "EEE", ugc: true, status: "Applied", remarks: "Visit Completed", type: "Engineering" },
    { name: "CSE", ugc: true, status: "Accredited", remarks: "Accredited by IEB (12 Feb 2023)", type: "Engineering" },
    { name: "ME", ugc: true, status: "Accredited", remarks: "Accredited by IEB (12 Feb 2023)", type: "Engineering" },
    { 
        name: "IPE", 
        ugc: true, 
        status: "Accredited", 
        remarks: "Accredited by IEB-BAETE (17 Oct 2022)", 
        type: "Engineering",
        certificate: "/images/BAETE-Approval-Certificate-of-IPE-Dept.-BAUST-Saidpur-1024x750.jpg"
    },
    { name: "CE", ugc: true, status: "Yet to Apply", remarks: "Application Under Process", type: "Engineering" },
    { name: "BBA", ugc: true, status: "Under Process", remarks: "BAC Accreditation", type: "Non-Engineering" },
    { name: "English", ugc: true, status: "Under Process", remarks: "BAC Accreditation", type: "Non-Engineering" },
    { name: "MBA", ugc: true, status: "Under Process", remarks: "BAC Accreditation", type: "Non-Engineering" }
];

const StatusBadge = ({ status }: { status: Program['status'] }) => {
    switch (status) {
        case 'Accredited':
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-emerald-200">
                    <CheckCircle2 size={12} />
                    Accredited
                </span>
            );
        case 'Applied':
        case 'Under Process':
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-amber-100">
                    <Clock size={12} />
                    {status}
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-400 text-white text-[11px] font-bold uppercase tracking-wider">
                    <AlertCircle size={12} />
                    {status}
                </span>
            );
    }
};

const ProgramCard = ({ program, onShowCert }: { program: Program, onShowCert: (url: string) => void }) => (
    <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
        {/* Hover Decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[3rem] -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 text-emerald-700 group-hover:text-white transition-all duration-500">
                    {getProgramIcon(program.name)}
                </div>
                <StatusBadge status={program.status} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                {program.name}
            </h3>
            
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 mb-6 bg-emerald-50 px-3 py-1 rounded-lg w-fit">
                <ShieldCheck size={16} />
                UGC Approved
            </div>

            <div className="mt-auto pt-6 border-t border-dashed border-gray-100 flex items-center justify-between">
                <p className="text-gray-500 text-sm italic leading-relaxed max-w-[80%]">
                    {program.remarks}
                </p>
                {program.certificate && (
                    <button 
                        onClick={() => onShowCert(program.certificate!)}
                        className="p-2 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-600 hover:text-white transition-all group/btn flex items-center gap-2"
                        title="View Certificate"
                    >
                        <FileSearch size={20} className="transition-transform group-hover/btn:scale-110" />
                    </button>
                )}
            </div>
        </div>
    </div>
);

export default function Accreditation() {
    const [selectedCert, setSelectedCert] = useState<string | null>(null);
    const engineering = programs.filter(p => p.type === 'Engineering');
    const nonEngineering = programs.filter(p => p.type === 'Non-Engineering');

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Accreditation - BAUST" />
            <Navbar />

            <PageHero 
                title="Accreditation Status" 
                subtitle="Commitment to Academic Excellence"
            />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                
                {/* Intro Section */}
                <div className="max-w-3xl mb-20">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">Quality Assurance & Global Recognition</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        BAUST is committed to maintaining the highest standards of education. Our programs are approved by the University Grants Commission (UGC) of Bangladesh and are undergoing accreditation processes by prestigious bodies like IEB-BAETE and BAC to ensure our graduates are globally competitive.
                    </p>
                </div>

                {/* Engineering Section */}
                <section className="mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1.5 bg-emerald-600 rounded-full" />
                        <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">Engineering Programs</h2>
                        <div className="flex-grow h-px bg-gray-200" />
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {engineering.map((p, i) => (
                            <ProgramCard key={i} program={p} onShowCert={setSelectedCert} />
                        ))}
                    </div>
                </section>

                {/* Non-Engineering Section */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1.5 bg-amber-500 rounded-full" />
                        <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">Non-Engineering Programs</h2>
                        <div className="flex-grow h-px bg-gray-200" />
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {nonEngineering.map((p, i) => (
                            <ProgramCard key={i} program={p} onShowCert={setSelectedCert} />
                        ))}
                    </div>
                </section>

                {/* Trust Section */}
                <div className="mt-32 bg-emerald-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 opacity-10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 blur-[80px] translate-y-1/2 -translate-x-1/2" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl">
                            <div className="inline-block px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                                Why Accreditation Matters
                            </div>
                            <h3 className="text-4xl font-bold mb-6">Global Standards, Local Excellence</h3>
                            <p className="text-emerald-100/80 text-lg leading-relaxed">
                                Accreditation by IEB-BAETE ensures that our engineering programs meet international benchmarks (Washington Accord), making our graduates eligible for professional engineering status and postgraduate studies worldwide.
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/20 flex flex-col items-center">
                            <Award className="w-20 h-20 text-emerald-400 mb-6" />
                            <div className="text-5xl font-black mb-2">100%</div>
                            <div className="text-emerald-300 font-bold uppercase tracking-widest text-sm text-center">UGC Approved<br/>Programs</div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Certificate Modal */}
            <Transition show={!!selectedCert} as={React.Fragment}>
                <Dialog as="div" className="relative z-[60]" onClose={() => setSelectedCert(null)}>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={React.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-[2.5rem] bg-white shadow-2xl transition-all relative">
                                    <button 
                                        onClick={() => setSelectedCert(null)}
                                        className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-red-500 hover:text-white rounded-full transition-all z-20"
                                    >
                                        <X size={24} />
                                    </button>
                                    
                                    <div className="p-2 sm:p-4">
                                        <div className="bg-emerald-50 rounded-[2rem] p-4 flex items-center justify-center">
                                            <img 
                                                src={selectedCert || ''} 
                                                alt="BAETE Accreditation Certificate" 
                                                className="max-w-full h-auto rounded-xl shadow-lg border border-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-emerald-900 p-6 text-center">
                                        <p className="text-emerald-100 font-bold uppercase tracking-widest text-xs">
                                            Official BAETE Accreditation Certificate - IPE Department
                                        </p>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Footer />
        </div>
    );
}
