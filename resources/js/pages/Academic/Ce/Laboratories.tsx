import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';
import { Settings, Info, CheckCircle, Monitor, FlaskConical, ChevronRight, Building2 } from 'lucide-react';

interface LabData {
    id?: number;
    slug: string;
    name: string;
    description: string;
    images: string[];
    equipment: string[];
    objectives: string[];
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    lab?: LabData | null;
    allLabs?: LabData[];
    labSlug?: string;
}

export default function CeLaboratories({ department, lab, allLabs = [], labSlug }: Props) {
    const activeLab = lab || (allLabs.length > 0 ? allLabs[0] : null);

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${activeLab ? activeLab.name : 'Laboratories'} - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={department?.name || "Department of Civil Engineering (CE)"} 
                subtitle="11 State-of-the-Art Specialized Laboratories & Testing Facilities" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Laboratories" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Sticky Sidebar List of all 11 labs */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-md sticky top-24">
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                                <FlaskConical className="w-5 h-5 text-emerald-600" />
                                <h3 className="font-bold text-gray-900 text-base">CE Laboratories</h3>
                                <span className="ml-auto text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                                    {allLabs.length}
                                </span>
                            </div>
                            <div className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-emerald-200">
                                {allLabs.map((item, idx) => {
                                    const isCurrent = activeLab && activeLab.slug === item.slug;
                                    return (
                                        <Link
                                            key={item.id ?? idx}
                                            href={`/ce/laboratories/${item.slug}`}
                                            className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all text-left group ${
                                                isCurrent
                                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                                    : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                                            }`}
                                        >
                                            <span className="line-clamp-1 flex-1 pr-2">{item.name}</span>
                                            <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isCurrent ? 'translate-x-0.5' : 'opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5'}`} />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Active Lab Details Area */}
                    <div className="lg:col-span-3 space-y-8">
                        {activeLab ? (
                            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-lg space-y-8">
                                
                                {/* Lab Title & Header */}
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black">
                                            <Building2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                                                Specialized Testing Facility
                                            </span>
                                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                                                {activeLab.name}
                                            </h2>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-4 text-justify">
                                        {activeLab.description}
                                    </p>
                                </div>

                                {/* Images Gallery */}
                                {activeLab.images && activeLab.images.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                                            <Monitor className="w-4 h-4 text-emerald-600" />
                                            Laboratory Equipment & Facility Gallery ({activeLab.images.length} Photos)
                                        </h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {activeLab.images.map((img, idx) => (
                                                <div key={idx} className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 group h-44">
                                                    <img
                                                        src={img}
                                                        alt={`${activeLab.name} apparatus ${idx + 1}`}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Equipment & Objectives 2-column */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                                    {/* Equipment List */}
                                    <div className="bg-emerald-50/40 rounded-2xl p-6 border border-emerald-100/60">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Settings className="w-5 h-5 text-emerald-700" />
                                            <h3 className="font-bold text-gray-900 text-base">Key Instruments & Equipment</h3>
                                        </div>
                                        <ul className="space-y-2.5">
                                            {activeLab.equipment && activeLab.equipment.length > 0 ? (
                                                activeLab.equipment.map((eq, i) => (
                                                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                                                        <span>{eq}</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-xs text-gray-500">Equipment details available upon inquiry.</li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Objectives List */}
                                    <div className="bg-teal-50/40 rounded-2xl p-6 border border-teal-100/60">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Info className="w-5 h-5 text-teal-700" />
                                            <h3 className="font-bold text-gray-900 text-base">Learning Objectives & Outcomes</h3>
                                        </div>
                                        <ul className="space-y-2.5">
                                            {activeLab.objectives && activeLab.objectives.length > 0 ? (
                                                activeLab.objectives.map((obj, i) => (
                                                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                                                        <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                                                        <span>{obj}</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-xs text-gray-500">Objectives aligned with OBE Washington Accord criteria.</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                                <p className="text-gray-500">No laboratory selected.</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
