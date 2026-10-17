import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { EEE_TABS, EEE_DEPT_NAME } from '@/data/eeeData';
import { Cpu, Zap, Activity, Radio, Settings, CheckCircle, Image as ImageIcon, Wrench } from 'lucide-react';

interface LabDetails {
    id?: number;
    name: string;
    slug?: string;
    description: string;
    equipment?: string[] | null;
    objectives?: string[] | null;
    images?: string[] | null;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    lab?: LabDetails | null;
    allLabs?: LabDetails[];
    labSlug?: string;
}

function getLabIcon(index: number) {
    const icons = [Zap, Activity, Cpu, Radio, Wrench, Settings];
    return icons[index % icons.length];
}

export default function EeeLaboratory({ department, lab: labProp, allLabs = [], labSlug }: Props) {
    const labsList = allLabs && allLabs.length > 0 ? allLabs : [];
    const initialLab = labProp || (labSlug ? labsList.find(l => l.slug === labSlug) : null) || labsList[0];
    const [selectedLab, setSelectedLab] = useState<LabDetails | null>(initialLab || null);
    const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);

    const equipment = Array.isArray(selectedLab?.equipment) ? selectedLab.equipment : [];
    const objectives = Array.isArray(selectedLab?.objectives) ? selectedLab.objectives : [];
    const images = Array.isArray(selectedLab?.images) ? selectedLab.images : [];

    const handleSelectLab = (item: LabDetails) => {
        setSelectedLab(item);
        setSelectedImageIdx(0);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Laboratories - ${department?.short_name || 'EEE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={`${department?.short_name || 'EEE'} Laboratory Facilities`} 
                subtitle="High-Voltage, Electronics, Machines & Computational Engineering Laboratories" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || EEE_DEPT_NAME} activeTab="Laboratories" tabs={EEE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
                
                {/* Introduction */}
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-3">
                        <Zap className="text-emerald-600 w-8 h-8" />
                        Hands-On Engineering Laboratories
                    </h2>
                    <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                        The Department of {department?.name || 'Electrical and Electronic Engineering'} at BAUST houses 11 state-of-the-art engineering laboratories. Designed to bridge the gap between classroom theory and real-world implementation, these facilities empower students with hardware debugging, high-voltage testing, and advanced simulation competencies.
                    </p>
                </div>

                {/* Interactive Featured Lab Section */}
                {selectedLab && (
                    <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                        <div className="p-6 sm:p-8 lg:p-12">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                Interactive Lab Explorer
                            </h3>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Left List: Selectable Tabs */}
                                <div className="lg:col-span-4 space-y-2 max-h-[580px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                                    {labsList.map((labItem, idx) => {
                                        const Icon = getLabIcon(idx);
                                        const isSelected = selectedLab?.name === labItem.name || selectedLab?.slug === labItem.slug;
                                        return (
                                            <button
                                                key={labItem.id ?? idx}
                                                onClick={() => handleSelectLab(labItem)}
                                                className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl text-left border transition-all duration-300 cursor-pointer ${
                                                    isSelected 
                                                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100'
                                                        : 'bg-gray-50/60 border-gray-100 text-gray-700 hover:bg-emerald-50/50 hover:text-emerald-800'
                                                }`}
                                            >
                                                <div className={`p-2 rounded-xl flex-shrink-0 ${isSelected ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                                                    <Icon size={18} />
                                                </div>
                                                <span className="text-xs sm:text-sm font-bold leading-tight line-clamp-2">{labItem.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Right Panel: Detailed view */}
                                <div className="lg:col-span-8 bg-gray-50/40 border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
                                    {/* Lab Title & Description */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full">
                                                Laboratory Facility
                                            </span>
                                        </div>
                                        <h4 className="text-2xl font-black text-gray-900 mb-3">{selectedLab.name}</h4>
                                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify whitespace-pre-line">{selectedLab.description}</p>
                                    </div>

                                    {/* Photos Carousel/Gallery if available */}
                                    {images.length > 0 && (
                                        <div className="space-y-3 pt-2">
                                            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-100">
                                                <img 
                                                    src={images[selectedImageIdx] || images[0]} 
                                                    alt={selectedLab.name}
                                                    className="w-full h-full object-cover transition-all duration-500"
                                                    onError={(e) => {
                                                        e.currentTarget.src = '/images/placeholder.jpg';
                                                    }}
                                                />
                                            </div>
                                            {images.length > 1 && (
                                                <div className="flex gap-2 overflow-x-auto pb-1">
                                                    {images.map((img, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setSelectedImageIdx(i)}
                                                            className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                                                                selectedImageIdx === i ? 'border-emerald-600 scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                                                            }`}
                                                        >
                                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Equipment & Objectives Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200/60">
                                        {/* Equipment */}
                                        <div>
                                            <h5 className="font-extrabold text-[12px] uppercase tracking-widest text-emerald-800 mb-3 flex items-center gap-2">
                                                <Settings size={14} className="text-emerald-600" />
                                                Equipment & Workstations
                                            </h5>
                                            {equipment.length > 0 ? (
                                                <ul className="space-y-2">
                                                    {equipment.map((item, idx) => (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                                            <span className="text-xs font-semibold text-gray-700 leading-snug">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-xs text-gray-400 italic">Equipped with specialized testing benches and instrument suites.</p>
                                            )}
                                        </div>

                                        {/* Objectives */}
                                        <div>
                                            <h5 className="font-extrabold text-[12px] uppercase tracking-widest text-slate-800 mb-3 flex items-center gap-2">
                                                <CheckCircle size={14} className="text-emerald-600" />
                                                Practical Objectives
                                            </h5>
                                            {objectives.length > 0 ? (
                                                <ul className="space-y-2">
                                                    {objectives.map((obj, idx) => (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                                            <span className="text-xs font-semibold text-gray-700 leading-snug">{obj}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-xs text-gray-400 italic">Practical experimentation aligned with Outcome-Based Education (OBE).</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Complete Grid of 11 Laboratories */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">All Laboratories ({labsList.length})</h3>
                        <div className="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {labsList.map((labItem, idx) => {
                            const labImages = Array.isArray(labItem.images) ? labItem.images : [];
                            const mainImg = labImages.length > 0 ? labImages[0] : null;

                            return (
                                <div 
                                    key={labItem.id ?? idx} 
                                    onClick={() => {
                                        handleSelectLab(labItem);
                                        window.scrollTo({ top: 380, behavior: 'smooth' });
                                    }}
                                    className={`bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col overflow-hidden cursor-pointer ${
                                        selectedLab?.name === labItem.name ? 'ring-2 ring-emerald-500' : ''
                                    }`}
                                >
                                    {mainImg && (
                                        <div className="relative h-44 overflow-hidden bg-gray-100">
                                            <img 
                                                src={mainImg} 
                                                alt={labItem.name} 
                                                loading="lazy" 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            />
                                            {labImages.length > 1 && (
                                                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                    +{labImages.length - 1} more
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                            {(idx + 1).toString().padStart(2, '0')}
                                        </div>
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                                            {labItem.name}
                                        </h4>
                                        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3 mb-4">
                                            {labItem.description}
                                        </p>
                                        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-emerald-600">
                                            <span>Explore Details</span>
                                            <span>&rarr;</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
