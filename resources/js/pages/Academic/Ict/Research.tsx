import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { ICT_TABS, ICT_DEPT_NAME, type DeptInfo } from '@/data/ictData';
import { pageText } from '@/lib/dept-icons';
import { Award, BookOpen, Download, ExternalLink, FileText, GraduationCap } from 'lucide-react';

interface ResearchItem {
    id: number;
    type: 'publication' | 'thesis' | string;
    category?: string | null;
    title: string;
    authors?: string | null;
    journal_conference?: string | null;
    year?: string | number | null;
    link?: string | null;
    pdf_file?: string | null;
    supervisor?: string | null;
    students_info?: string | null;
}

interface Props {
    department?: DeptInfo | null;
    researches?: ResearchItem[];
}

function ResearchCard({ item }: { item: ResearchItem }) {
    const isThesis = item.type === 'thesis';
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 flex-shrink-0">
                    {isThesis ? <GraduationCap size={22} /> : <BookOpen size={22} />}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        {item.category && (
                            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full">{item.category}</span>
                        )}
                        {item.year && <span className="text-[11px] font-bold text-gray-400">{item.year}</span>}
                    </div>
                    <h4 className="font-bold text-gray-900 leading-snug mb-1">{item.title}</h4>
                    {item.authors && <p className="text-sm text-gray-600">{item.authors}</p>}
                    {item.journal_conference && <p className="text-sm text-gray-500 italic">{item.journal_conference}</p>}
                    {item.supervisor && (
                        <p className="text-xs text-gray-500 mt-2"><span className="font-semibold text-gray-700">Supervisor:</span> {item.supervisor}</p>
                    )}
                    {item.students_info && (
                        <p className="text-xs text-gray-500 mt-1 whitespace-pre-line"><span className="font-semibold text-gray-700">Students:</span> {item.students_info}</p>
                    )}
                    {(item.link || item.pdf_file) && (
                        <div className="flex flex-wrap gap-4 mt-4">
                            {item.link && (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800">
                                    <ExternalLink size={14} /> View Online
                                </a>
                            )}
                            {item.pdf_file && (
                                <a href={item.pdf_file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800">
                                    <Download size={14} /> PDF
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function IctResearch({ department, researches = [] }: Props) {
    const shortName = department?.short_name || 'ICT';
    const publications = researches.filter(r => r.type !== 'thesis');
    const theses = researches.filter(r => r.type === 'thesis');
    const areas = Array.from(new Set(researches.map(r => r.category?.trim()).filter((c): c is string => !!c)));

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Research - ${shortName} - BAUST`} />
            <Navbar />
            <PageHero
                title="Research & Publications"
                subtitle={pageText(department, 'research_subtitle', "Advancing Knowledge and Engineering Solutions")}
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
                        <p className="text-gray-600 text-base leading-relaxed text-justify whitespace-pre-line">
                            {pageText(department, 'research_intro', `Research in the ${department?.name || 'Department of Information and Communication Technology'} focuses on bridging communication infrastructures with computer intelligence models. Our faculty and student groups engage in collaborative work designed to solve national challenges while publishing in peer-reviewed journals and international conferences.`)}
                        </p>
                        {areas.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-6">
                                {areas.map(area => (
                                    <span key={area} className="bg-teal-50 text-teal-700 border border-teal-100 text-xs font-bold px-3 py-1 rounded-full">{area}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {publications.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold text-gray-950 mb-8 flex items-center gap-2">
                            <Award className="text-emerald-600" />
                            Publications
                        </h3>
                        <div className="grid grid-cols-1 gap-5">
                            {publications.map(item => <ResearchCard key={item.id} item={item} />)}
                        </div>
                    </section>
                )}

                {theses.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold text-gray-950 mb-8 flex items-center gap-2">
                            <GraduationCap className="text-emerald-600" />
                            Theses & Projects
                        </h3>
                        <div className="grid grid-cols-1 gap-5">
                            {theses.map(item => <ResearchCard key={item.id} item={item} />)}
                        </div>
                    </section>
                )}

                {researches.length === 0 && (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center text-gray-400">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-40" />
                        <p className="text-lg font-medium">Publications and theses will be listed here soon.</p>
                    </div>
                )}

            </main>
            <Footer />
        </div>
    );
}
