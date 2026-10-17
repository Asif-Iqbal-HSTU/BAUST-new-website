import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { IPE_TABS, IPE_DEPT_NAME } from '@/data/ipeData';
import { GraduationCap, Building } from 'lucide-react';

interface CommitteeMember {
    role: string;
    name: string;
}

interface AlumniData {
    id?: number;
    name: string;
    description: string;
    committee?: CommitteeMember[] | null;
    activities?: string[] | null;
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

const DEFAULT_DESTINATIONS = [
    'Multinational Electronics & White Goods Manufacturing (Walton, Samsung, Singer)',
    'Apparel, Garments & Textile Supply Chains (Beximco, Square, DBL Group)',
    'Pharmaceuticals Production & Quality Assurance (Square, Incepta, Beximco Pharma)',
    'Global Shipping, Freight Forwarding & Logistics Networks',
    'Prestige Graduate Research Programs (North America, Europe, Australia)',
    'Bangladesh Civil Service (BCS) Cadres & Public Administration'
];

export default function IpeAlumni({ department, alumni }: Props) {
    const destinations = Array.isArray(alumni?.activities) && alumni.activities.length > 0
        ? alumni.activities
        : DEFAULT_DESTINATIONS;

    const description = alumni?.description || "Our alumni are representing BAUST across various fields globally. From key roles in supply chain strategy, factory operations planning, lean manufacturing consultancy, and corporate management positions, IPE graduates have established themselves as valuable technical assets.";

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Alumni - ${department?.short_name || 'IPE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={alumni?.name || `${department?.short_name || 'IPE'} Alumni Network`} 
                subtitle="Global Footprint of BAUST Industrial and Production Engineers" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || IPE_DEPT_NAME} activeTab="Alumni" tabs={IPE_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{alumni?.name || 'IPE Alumni Association'}</h2>
                                <p className="text-sm text-gray-500 mt-0.5">{department?.name || 'Department of Industrial and Production Engineering'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-10">
                            <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed text-justify">
                                <p>{description}</p>
                                <p>
                                    Through regular seminars, mock interview drives, industry workshops, and technical mentoring networks, the IPE Alumni Network plays a vital role in preparing current students for graduation and professional certification.
                                </p>
                            </div>

                            <div className="bg-emerald-50/60 rounded-3xl p-6 sm:p-8 border border-emerald-100 flex flex-col justify-center space-y-4">
                                <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                                    <Building className="w-5 h-5 text-emerald-700" />
                                    Notable Career Sectors
                                </h3>
                                <div className="space-y-3">
                                    {destinations.map((dest, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm text-gray-700 font-semibold leading-snug">{dest}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
