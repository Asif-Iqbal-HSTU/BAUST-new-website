import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';
import { Quote, ExternalLink, Award, User, Sparkles, GraduationCap } from 'lucide-react';

interface StudentVoiceItem {
    id: number;
    student_name: string;
    student_id?: string | null;
    batch?: string | null;
    title?: string | null;
    image?: string | null;
    profile_link?: string | null;
    quote?: string | null;
    order: number;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    voices: StudentVoiceItem[];
}

const FALLBACK_VOICES: StudentVoiceItem[] = [
    {
        id: 1,
        student_name: "Abu Helal",
        student_id: "200105023",
        batch: "Student of 1st Batch, CE, BAUST",
        title: "The Civil Engineering Journey — Student Perspective",
        image: "https://baust.edu.bd/ce/wp-content/uploads/sites/26/2023/12/411534913_716464300512745_1030433681170754741_n.jpg",
        profile_link: "https://www.facebook.com/abu.helal.75286",
        quote: "A vibrant reflection on academic growth, engineering ethics, hands-on survey camps, and building lasting camaraderie at the Department of Civil Engineering, BAUST Saidpur. The department provided not only comprehensive theoretical knowledge in structural analysis, geotechnical mechanics, and hydraulics, but also practical exposure to live construction materials, surveying instrument handling, and engineering problem-solving. My professors and mentors continuously inspired me to strive for research excellence and higher studies.",
        order: 1,
    }
];

export default function CeStudentVoice({ department, voices = [] }: Props) {
    const list = voices.length > 0 ? voices : FALLBACK_VOICES;
    const featured = list[0];

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Student Voice - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title="Student Voice" 
                subtitle={`Authentic Experiences, Reflections, and Journeys of ${department?.short_name || 'CE'} Students`} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Student Voice" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
                
                {/* Featured Student Voice Hero */}
                {featured && (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                        <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                        <div className="p-8 sm:p-14">
                            <div className="flex flex-col lg:flex-row items-center gap-10">
                                {featured.image && (
                                    <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-xl border-4 border-emerald-50 flex-shrink-0 relative group">
                                        <img 
                                            src={featured.image} 
                                            alt={featured.student_name} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                            <span className="text-white text-xs font-bold">{featured.student_name}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-6 flex-1 text-left">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full border border-emerald-200">
                                            Featured Voice
                                        </span>
                                        <span className="text-xs font-semibold text-gray-400">
                                            {featured.batch || 'Civil Engineering'}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                                        {featured.title || 'The Civil Engineering Journey — Student Perspective'}
                                    </h2>

                                    <div className="relative pl-6 border-l-4 border-emerald-500">
                                        <Quote className="w-8 h-8 text-emerald-200 absolute -top-4 -left-3 pointer-events-none" />
                                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-justify italic">
                                            &ldquo;{featured.quote}&rdquo;
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{featured.student_name}</h4>
                                            <p className="text-xs text-gray-500 font-medium">
                                                Student ID: {featured.student_id} • {featured.batch}
                                            </p>
                                        </div>

                                        {featured.profile_link && (
                                            <a
                                                href={featured.profile_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all active:scale-95"
                                            >
                                                <span>Connect on Social</span>
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Additional Student Perspectives */}
                {list.length > 1 && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-emerald-700" />
                            <h3 className="text-2xl font-bold text-gray-900">More Student Experiences</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {list.slice(1).map((voice, idx) => (
                                <div key={voice.id ?? idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all space-y-4">
                                    <h4 className="font-bold text-gray-900 text-lg">{voice.title}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed text-justify italic">&ldquo;{voice.quote}&rdquo;</p>
                                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{voice.student_name}</p>
                                            <p className="text-xs text-gray-500">{voice.batch}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </main>
            <Footer />
        </div>
    );
}
