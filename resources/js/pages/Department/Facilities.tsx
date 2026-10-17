import React from 'react';
import { Link } from '@inertiajs/react';
import DeptPageShell from '@/custom_components/DeptPageShell';
import { DeptPageProps, deptBase, deptShort } from '@/data/departmentData';
import { Cpu, Server, Network, Terminal, Settings, Info, CheckCircle, Monitor, ArrowRight } from 'lucide-react';

interface LabData {
    id?: number;
    name: string;
    description: string;
    images: string[];
    equipment: string[];
    objectives: string[];
    slug: string;
}

interface Props extends DeptPageProps {
    lab?: LabData | null;
    allLabs?: LabData[];
    labSlug: string;
}

export default function DepartmentFacilities({ department, tabs, lab, allLabs = [] }: Props) {
    const short = deptShort(department);

    if (!lab) {
        return (
            <DeptPageShell department={department} tabs={tabs} activeTab="Facilities" title={`Facilities - ${short}`}>
                <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Facilities Coming Soon</h3>
                        <p className="text-gray-500">Details of the department's facilities will be published here.</p>
                    </div>
                </main>
            </DeptPageShell>
        );
    }

    const images = Array.isArray(lab.images) ? lab.images : [];
    const equipment = Array.isArray(lab.equipment) ? lab.equipment : [];
    const objectives = Array.isArray(lab.objectives) ? lab.objectives : [];

    return (
        <DeptPageShell
            department={department}
            tabs={tabs}
            activeTab={lab.name}
            title={`${lab.name} - ${short}`}
            heroTitle={lab.name}
            heroSubtitle="Hands-on Learning in State-of-the-Art Facilities"
        >

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Side */}
                    <div className="lg:col-span-2">
                        <section className="mb-12">
                            <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                <Info className="text-emerald-600" />
                                About the Facility
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm whitespace-pre-line">
                                {lab.description}
                            </p>
                        </section>

                        {images.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <Monitor className="text-emerald-600" />
                                    Gallery
                                </h2>
                                <div className={`grid gap-6 ${images.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                    {images.map((img, idx) => (
                                        <div key={idx} className="group relative rounded-[2.5rem] overflow-hidden bg-gray-100 border border-gray-100 shadow-lg aspect-video">
                                            <img 
                                                src={img} 
                                                alt={`${lab.name} View ${idx + 1}`} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar / Sidebar Info */}
                    <div className="space-y-8">
                        {/* Equipment List */}
                        {equipment.length > 0 && (
                            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                                        <Settings size={20} />
                                    </div>
                                    <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm">Equipment & Resources</h3>
                                </div>
                                <ul className="space-y-4">
                                    {equipment.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Objectives List */}
                        {objectives.length > 0 && (
                            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl">
                                <div className="flex items-center gap-3 mb-6 text-emerald-400">
                                    <CheckCircle size={24} />
                                    <h3 className="font-bold uppercase tracking-widest text-sm">Learning Objectives</h3>
                                </div>
                                <ul className="space-y-5">
                                    {objectives.map((obj, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded-md border border-emerald-800/50">
                                                0{idx + 1}
                                            </span>
                                            <span className="text-sm text-slate-300 font-medium leading-relaxed">{obj}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* All Labs Navigation */}
                        {allLabs.length > 0 && (
                            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 px-2">Other Department Facilities</h4>
                                <div className="space-y-1">
                                    {allLabs.map(l => (
                                        <Link
                                            key={l.slug}
                                            href={`${deptBase(department)}/facilities/${l.slug}`}
                                            className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors ${
                                                l.slug === lab.slug
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            <span className="truncate pr-2">{l.name}</span>
                                            <ArrowRight size={14} className="flex-shrink-0" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </DeptPageShell>
    );
}
