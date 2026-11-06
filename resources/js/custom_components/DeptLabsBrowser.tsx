import React from 'react';
import { Link } from '@inertiajs/react';
import { Settings, Info, CheckCircle, Monitor, FlaskConical, ChevronRight, Building2, Mail, Phone, Users } from 'lucide-react';

export interface DeptLabPerson {
    id: number;
    role: string;
    name: string;
    designation?: string | null;
    phone?: string | null;
    email?: string | null;
    photo?: string | null;
}

export interface DeptLab {
    id?: number;
    /** The lab's in-charge and team, managed in the admin Laboratories tab. */
    people?: DeptLabPerson[] | null;
    slug: string;
    name: string;
    description?: string | null;
    images?: string[] | null;
    equipment?: string[] | null;
    objectives?: string[] | null;
}

interface Props {
    /** All published labs, in display order (sidebar). */
    labs: DeptLab[];
    /** The lab being shown; defaults to the first one. */
    lab?: DeptLab | null;
    /** URL prefix for a lab, e.g. `/ce/laboratories` → `/ce/laboratories/{slug}`. */
    basePath: string;
    shortName: string;
    /** Optional paragraph above the browser (the department's "labs intro" page text). */
    intro?: string | null;
    /** Rewrites stored image paths (e.g. legacy folders) before display. */
    imageSrc?: (src: string) => string;
}

const list = (v: string[] | null | undefined) => (Array.isArray(v) ? v.filter(Boolean) : []);

/**
 * Department laboratories page body, shared by every department: a sticky list
 * of all labs on the left and the selected lab's description, photos,
 * equipment and objectives on the right. Everything comes from the labs the
 * focal point manages in the admin "Laboratories" tab.
 */
export default function DeptLabsBrowser({ labs, lab, basePath, shortName, intro, imageSrc = (s) => s }: Props) {
    const activeLab = lab || labs[0] || null;
    const images = list(activeLab?.images).map(imageSrc);
    const equipment = list(activeLab?.equipment);
    const objectives = list(activeLab?.objectives);
    const people = Array.isArray(activeLab?.people) ? activeLab.people : [];

    return (
        <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            {intro && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify whitespace-pre-line">{intro}</p>
                </div>
            )}

            {activeLab ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sticky sidebar list of all labs */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-md sticky top-24">
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                                <FlaskConical className="w-5 h-5 text-emerald-600" />
                                <h3 className="font-bold text-gray-900 text-base">{shortName} Laboratories</h3>
                                <span className="ml-auto text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                                    {labs.length}
                                </span>
                            </div>
                            <div className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1">
                                {labs.map((item, idx) => {
                                    const isCurrent = activeLab.slug === item.slug;
                                    return (
                                        <Link
                                            key={item.id ?? idx}
                                            href={`${basePath}/${item.slug}`}
                                            preserveScroll
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

                    {/* Selected lab */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-lg space-y-8">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Laboratory</span>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">{activeLab.name}</h2>
                                    </div>
                                </div>
                                {activeLab.description && (
                                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-4 text-justify whitespace-pre-line">
                                        {activeLab.description}
                                    </p>
                                )}
                            </div>

                            {images.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                                        <Monitor className="w-4 h-4 text-emerald-600" />
                                        Laboratory Equipment & Facility Gallery ({images.length} Photos)
                                    </h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {images.map((img, idx) => (
                                            <div key={idx} className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 group h-44">
                                                <img
                                                    src={img}
                                                    alt={`${activeLab.name} photo ${idx + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(equipment.length > 0 || objectives.length > 0) && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                                    {equipment.length > 0 && (
                                        <div className="bg-emerald-50/40 rounded-2xl p-6 border border-emerald-100/60">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Settings className="w-5 h-5 text-emerald-700" />
                                                <h3 className="font-bold text-gray-900 text-base">Key Instruments & Equipment</h3>
                                            </div>
                                            <ul className="space-y-2.5">
                                                {equipment.map((eq, i) => (
                                                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                                                        <span>{eq}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {objectives.length > 0 && (
                                        <div className="bg-teal-50/40 rounded-2xl p-6 border border-teal-100/60">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Info className="w-5 h-5 text-teal-700" />
                                                <h3 className="font-bold text-gray-900 text-base">Learning Objectives & Outcomes</h3>
                                            </div>
                                            <ul className="space-y-2.5">
                                                {objectives.map((obj, i) => (
                                                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                                                        <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                                                        <span>{obj}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {people.length > 0 && (
                                <div className="pt-4 border-t border-gray-100">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-emerald-600" />
                                        Laboratory Team
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {people.map((person) => (
                                            <div key={person.id} className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                                                {person.photo ? (
                                                    <img src={person.photo} alt={person.name} className="h-16 w-16 flex-shrink-0 rounded-xl object-cover object-top shadow-sm" loading="lazy" />
                                                ) : (
                                                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg font-black text-emerald-700">
                                                        {person.name.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w)).slice(-2).map((w) => w[0]).join('').toUpperCase()}
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <span className="inline-block rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{person.role}</span>
                                                    <div className="mt-1 font-bold text-gray-900 leading-snug">{person.name}</div>
                                                    {person.designation && <div className="text-xs text-gray-600">{person.designation}</div>}
                                                    <div className="mt-1.5 space-y-0.5 text-xs">
                                                        {person.phone && (
                                                            <a href={`tel:${person.phone.split(/[,;]/)[0].trim()}`} className="flex items-center gap-1.5 text-gray-600 hover:text-emerald-700">
                                                                <Phone className="w-3 h-3" /> {person.phone}
                                                            </a>
                                                        )}
                                                        {person.email && (
                                                            <a href={`mailto:${person.email.split(/[,;\s]/)[0]}`} className="flex items-center gap-1.5 break-all text-gray-600 hover:text-emerald-700">
                                                                <Mail className="w-3 h-3" /> {person.email}
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                    <p className="text-gray-500">No laboratories have been published yet.</p>
                </div>
            )}
        </main>
    );
}
