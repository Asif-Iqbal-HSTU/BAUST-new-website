import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';

interface ObeItem {
    id?: number;
    type?: string;
    code: string;
    title?: string | null;
    description: string;
}

interface DeptInfo {
    id: number;
    slug: string;
    name: string;
    short_name: string;
    vision?: string | null;
    mission?: string | null;
}

interface Props {
    department?: DeptInfo | null;
    peos?: ObeItem[];
    plos?: ObeItem[];
}

export default function CeVisionMission({ department, peos: peosProp, plos: plosProp }: Props) {
    const activePeos = peosProp ?? [];
    const activePlos = plosProp ?? [];
    const shortName = department?.short_name || 'CE';

    const visionText = department?.vision || '';
    const missionText = department?.mission || '';
    const missionPoints = missionText.split(/\r?\n|\\n/).filter(pt => pt.trim().length > 0);

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Vision & Mission - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero title={department?.name || "Department of Civil Engineering (CE)"} subtitle={null} compact={true} />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Vision & Mission" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">

                {/* Department Vision & Mission */}
                {(visionText || missionPoints.length > 0) && <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                            Vision & Mission of the Department
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6">
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm">Vision</span>
                                </div>
                                <p className="text-gray-600 text-[15px] leading-relaxed mt-3 text-justify">
                                    {visionText}
                                </p>
                            </div>
                            <div className="relative bg-teal-50/60 border border-teal-100 rounded-2xl p-6">
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-teal-600 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm">Mission</span>
                                </div>
                                <div className="space-y-2 text-gray-600 text-[14px] leading-relaxed mt-3">
                                    {missionPoints.map((pt, idx) => (
                                        <p key={idx}>{pt}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

                {/* Program Educational Objectives (PEOs) */}
                {activePeos.length > 0 && <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                Program Educational Objectives (PEOs)
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Four years after graduation, the graduates of the {shortName} undergraduate program are expected to attain the following:
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {activePeos.map((peo, idx) => (
                                <div key={peo.id ?? idx} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="min-w-[4.25rem] px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center flex-shrink-0 whitespace-nowrap shadow-sm">
                                            {peo.code || `PEO-${idx + 1}`}
                                        </span>
                                        {peo.title && (
                                            <h3 className="font-bold text-gray-900 text-base">{peo.title}</h3>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed text-justify">
                                        {peo.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}

                {/* Program Learning Outcomes (PLOs) */}
                {activePlos.length > 0 && <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                Program Learning Outcomes (PLOs)
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                The {shortName} undergraduate program prepares students to attain the following {activePlos.length} Washington Accord graduate attributes upon graduation:
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activePlos.map((plo, idx) => (
                                <div key={plo.id ?? idx} className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all">
                                    <div className="min-w-[3.5rem] px-2.5 py-1.5 h-9 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm whitespace-nowrap">
                                        {plo.code || `PLO${idx + 1}`}
                                    </div>
                                    <div className="flex-1">
                                        {plo.title && (
                                            <h4 className="text-sm font-bold text-gray-900 mb-1">{plo.title}</h4>
                                        )}
                                        <p className="text-xs text-gray-600 leading-relaxed text-justify">
                                            {plo.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}

            </main>
            <Footer />
        </div>
    );
}
