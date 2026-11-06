import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { 
    FileText, 
    ExternalLink, 
    AlertCircle, 
    CheckCircle2, 
    Download, 
    Eye, 
    Maximize2, 
    X, 
    Calendar, 
    Sparkles
} from "lucide-react";

export interface ApplyOnlineInstructionContent {
    meta_title: string;
    hero: { title: string };
    instructions: {
        heading: string;
        lead_text: string;
        body_text: string;
        official_link_label: string;
        official_link_text: string;
        portal_url: string;
        portal_button_label: string;
    };
    leaflet: {
        badge_text: string;
        heading: string;
        description: string;
        highlights: { label: string; value: string }[];
        leaflet_image: string;
        download_file_name: string;
        view_button_label: string;
        download_button_label: string;
        preview_bar_label: string;
        expand_label: string;
        image_alt: string;
        hover_label: string;
        tip_text: string;
        open_in_new_tab_label: string;
        lightbox_title: string;
        lightbox_subtitle: string;
        lightbox_image_alt: string;
        open_in_new_tab_tooltip: string;
        close_tooltip: string;
    };
    important_note: { heading: string; text: string };
    procedure_guide: { heading: string; badge_text: string; guide_image: string; image_alt: string };
    next_steps: { heading: string; steps: string[] };
}

export default function ApplyOnlineInstruction({ content }: { content: ApplyOnlineInstructionContent }) {
    const { hero, instructions, leaflet, important_note, procedure_guide, next_steps } = content;
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsLightboxOpen(false);
            }
        };

        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isLightboxOpen]);

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Head title={content.meta_title} />

            {/* Navigation */}
            <Navbar />

            {/* Page Header */}
            <PageHero title={hero.title} />

            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column: Instructions Content */}
                    <div className="lg:col-span-7 space-y-8">
                        <section className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500" />
                            
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                    <span className="p-2 bg-emerald-100 text-emerald-700 rounded-lg mr-4">
                                        <FileText size={24} />
                                    </span>
                                    {instructions.heading}
                                </h2>

                                <div className="space-y-6 text-slate-600 leading-relaxed">
                                    <p className="text-lg font-medium text-slate-800">
                                        {instructions.lead_text}
                                    </p>
                                    
                                    <p>
                                        {instructions.body_text}
                                    </p>

                                    <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-white p-3 rounded-xl shadow-sm">
                                                <ExternalLink className="text-emerald-600" size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-wider text-emerald-800/50">{instructions.official_link_label}</p>
                                                <p className="font-bold text-slate-900">{instructions.official_link_text}</p>
                                            </div>
                                        </div>
                                        <a 
                                            href={instructions.portal_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto bg-[#0f5132] hover:bg-[#0a3622] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-95 text-center flex items-center justify-center space-x-2"
                                        >
                                            <span>{instructions.portal_button_label}</span>
                                            <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Admission Leaflet Card */}
                        <section className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50/60 rounded-full -mr-24 -mt-24 pointer-events-none transition-transform group-hover:scale-110 duration-500" />
                            
                            <div className="relative z-10">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                    <div>
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-2">
                                            <Sparkles size={14} className="text-emerald-600" />
                                            <span>{leaflet.badge_text}</span>
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{leaflet.heading}</h3>
                                        <p className="text-slate-500 text-sm mt-1">{leaflet.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-2xl">
                                            <FileText size={28} />
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Highlights Pill Bar */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                                    {leaflet.highlights.map((item, idx) => {
                                        const HighlightIcon = idx === 0 ? Calendar : Sparkles;

                                        return (
                                            <div key={idx} className="flex items-center gap-2.5 text-slate-700">
                                                <HighlightIcon size={16} className="text-emerald-600 shrink-0" />
                                                <span><strong>{item.label}</strong> {item.value}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsLightboxOpen(true)}
                                        className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3.5 rounded-xl font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-95 text-sm cursor-pointer"
                                    >
                                        <Maximize2 size={18} />
                                        <span>{leaflet.view_button_label}</span>
                                    </button>
                                    <a 
                                        href={leaflet.leaflet_image} 
                                        download={leaflet.download_file_name}
                                        className="flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3.5 rounded-xl font-bold transition-all active:scale-95 text-sm"
                                    >
                                        <Download size={18} />
                                        <span>{leaflet.download_button_label}</span>
                                    </a>
                                </div>

                                {/* Leaflet Image Preview */}
                                <div 
                                    onClick={() => setIsLightboxOpen(true)}
                                    className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950/5 group/preview cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Browser-like title bar */}
                                    <div className="bg-slate-100 px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                            <span className="text-xs font-semibold text-slate-600 ml-2">{leaflet.preview_bar_label}</span>
                                        </div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                                            <Eye size={13} /> {leaflet.expand_label}
                                        </span>
                                    </div>

                                    {/* Image Container with Hover Overlay */}
                                    <div className="relative overflow-hidden bg-slate-100">
                                        <img 
                                            src={leaflet.leaflet_image}
                                            alt={leaflet.image_alt}
                                            className="w-full h-auto object-contain transition-transform duration-500 group-hover/preview:scale-[1.02]"
                                        />
                                        <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                            <span className="bg-white/95 text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2">
                                                <Maximize2 size={16} className="text-emerald-600" />
                                                {leaflet.hover_label}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                                    <span>{leaflet.tip_text}</span>
                                    <a 
                                        href={leaflet.leaflet_image} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-emerald-700 hover:text-emerald-800 font-bold inline-flex items-center gap-1 hover:underline"
                                    >
                                        <span>{leaflet.open_in_new_tab_label}</span>
                                        <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Important Note Card */}
                        <section className="bg-orange-50 p-8 rounded-3xl border border-orange-100 shadow-sm relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-orange-600 group-hover:scale-110 transition-transform duration-500">
                                <AlertCircle size={80} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center">
                                    <AlertCircle className="mr-3 text-orange-600" size={24} />
                                    {important_note.heading}
                                </h3>
                                <p className="text-orange-800 font-bold text-lg leading-relaxed">
                                    {important_note.text}
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Visual Reference */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="relative">
                            {/* Decorative background for image */}
                            <div className="absolute -inset-4 bg-emerald-600/5 rounded-[40px] rotate-2" />
                            
                            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-white">
                                <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">{procedure_guide.heading}</span>
                                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">{procedure_guide.badge_text}</span>
                                </div>
                                <img 
                                    src={procedure_guide.guide_image}
                                    alt={procedure_guide.image_alt}
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>

                        {/* Quick Tips or Summary */}
                        <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-4 px-2">{next_steps.heading}</h4>
                            <ul className="space-y-4">
                                {next_steps.steps.map((step, idx) => (
                                    <li key={idx} className="flex items-center space-x-3 text-slate-600 group">
                                        <div className="bg-emerald-50 text-emerald-600 p-1 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <span className="text-sm font-medium">{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </main>

            {/* Fullscreen Lightbox Modal */}
            {isLightboxOpen && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <div 
                        className="relative w-full max-w-6xl max-h-[96vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
                                    <FileText size={18} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm sm:text-base leading-tight">{leaflet.lightbox_title}</h3>
                                    <p className="text-xs text-slate-400 hidden sm:block">{leaflet.lightbox_subtitle}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <a 
                                    href={leaflet.leaflet_image} 
                                    download={leaflet.download_file_name}
                                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                                >
                                    <Download size={14} />
                                    <span>{leaflet.download_button_label}</span>
                                </a>
                                <a 
                                    href={leaflet.leaflet_image} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    title={leaflet.open_in_new_tab_tooltip}
                                >
                                    <ExternalLink size={16} />
                                </a>
                                <button 
                                    type="button"
                                    onClick={() => setIsLightboxOpen(false)}
                                    className="p-2 rounded-lg bg-white/10 hover:bg-red-500 text-white transition-colors cursor-pointer"
                                    title={leaflet.close_tooltip}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Image Body - Scrollable */}
                        <div className="overflow-auto p-3 sm:p-6 bg-slate-900/5 flex items-center justify-center max-h-[calc(96vh-60px)]">
                            <img 
                                src={leaflet.leaflet_image}
                                alt={leaflet.lightbox_image_alt}
                                className="w-full h-auto max-w-full rounded-lg shadow-lg object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
}
