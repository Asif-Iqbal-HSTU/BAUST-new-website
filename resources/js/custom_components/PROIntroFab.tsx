import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { X, Phone, Mail, ArrowRight, Megaphone, Newspaper } from 'lucide-react';

const PRO = {
    name: 'Md. Shah Alam',
    title: 'Information Officer',
    role: 'Public Relations Officer, BAUST Saidpur',
    photo: '/images/offices/admission-office/2.jpg',
    phone: '01769-675588',
    email: 'info.officer@baust.edu.bd',
    profileHref: '/administration/offices/admission-office?profile=md-shah-alam',
};

export default function PROIntroFab() {
    // Lets the floating Apply Now button (bottom-right on mobile) stack above this one.
    useEffect(() => {
        document.body.classList.add('pro-fab-present');
        return () => document.body.classList.remove('pro-fab-present');
    }, []);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <>
            {/* Floating Action Button */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Meet the Public Relations Officer"
                className="fixed bottom-6 right-6 z-40 flex items-center justify-center group"
            >
                {/* Wave / ripple rings */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40 animate-ping [animation-delay:400ms]" />

                {/* Button body (heartbeat) */}
                <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-[#0f5132] text-white shadow-xl shadow-emerald-900/30 ring-4 ring-white animate-heartbeat group-hover:scale-105 transition-transform">
                    <Megaphone className="w-7 h-7" />
                </span>

                {/* Hover label */}
                <span className="absolute right-full mr-3 whitespace-nowrap px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-bold opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none shadow-lg">
                    Meet the PR Officer
                </span>
            </button>

            {/* Modal */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Public Relations Officer introduction"
                >
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
                        onClick={() => setOpen(false)}
                    />

                    <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-[popIn_0.25s_ease-out]">
                        {/* Header banner */}
                        <div className="relative h-28 bg-gradient-to-br from-emerald-600 via-emerald-500 to-[#0f5132]">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Close"
                                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div className="absolute -bottom-12 left-6">
                                <img
                                    src={PRO.photo}
                                    alt={PRO.name}
                                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg bg-gray-100"
                                    onError={(e: any) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x200/10B981/ffffff?text=PRO'; }}
                                />
                            </div>
                        </div>

                        <div className="pt-16 px-6 pb-6">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 mb-2">
                                <Newspaper className="w-3 h-3" />
                                Public Relations Office
                            </span>
                            <h3 className="text-xl font-black text-gray-900 leading-tight">{PRO.name}</h3>
                            <p className="text-sm font-semibold text-emerald-700">{PRO.title}</p>
                            <p className="text-xs text-gray-400 mb-4">{PRO.role}</p>

                            <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                All news, events, and official notices on this page are curated by the Public
                                Relations Office. Got a story to share, or press coverage of a BAUST event? Reach
                                out directly.
                            </p>

                            <div className="space-y-2 mb-5">
                                <a
                                    href={`tel:${PRO.phone.replace(/[^0-9+]/g, '')}`}
                                    className="flex items-center gap-2.5 text-sm font-semibold text-gray-700 hover:text-emerald-700 transition-colors"
                                >
                                    <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                                        <Phone className="w-3.5 h-3.5" />
                                    </span>
                                    {PRO.phone}
                                </a>
                                <a
                                    href={`mailto:${PRO.email}`}
                                    className="flex items-center gap-2.5 text-sm font-semibold text-gray-700 hover:text-emerald-700 transition-colors"
                                >
                                    <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                                        <Mail className="w-3.5 h-3.5" />
                                    </span>
                                    {PRO.email}
                                </a>
                            </div>

                            <Link
                                href={PRO.profileHref}
                                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#0f5132] hover:bg-emerald-800 text-white text-sm font-bold transition-colors shadow-md shadow-emerald-900/20"
                            >
                                View Full Profile
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
