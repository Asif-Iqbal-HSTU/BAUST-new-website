import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { EEE_TABS, EEE_DEPT_NAME } from '@/data/eeeData';
import { Users, Activity, Award, CheckCircle } from 'lucide-react';

interface CommitteeMember {
    role: string;
    name: string;
}

interface SocietyData {
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
    society?: SocietyData | null;
}

const DEFAULT_COMMITTEE: CommitteeMember[] = [
    { role: 'Chief Patron', name: 'Brig Gen Md Hafizur Rahman, afwc, psc (Retd), Vice Chancellor' },
    { role: 'President', name: 'Dr. Mst. Rubina Aktar, Head of Department' },
    { role: 'Faculty Advisor', name: 'Md. Mehedi Hasan, Assistant Professor' },
    { role: 'Student Body', name: 'Executive Committee, EEE Society' },
];

const DEFAULT_ACTIVITIES = [
    'Annual EEE Fest, Robotics Olympiad & Tech Expo',
    'Industrial tours to Kaptai Hydroelectric, Syedpur Railway, and Grid Substations',
    'Technical workshops on PCB Design, MATLAB, Proteus, and Embedded Systems',
    'Sports tournaments, Cultural festivals, and Raising Day celebrations'
];

export default function EeeSociety({ department, society }: Props) {
    const committee = Array.isArray(society?.committee) && society.committee.length > 0 
        ? society.committee 
        : DEFAULT_COMMITTEE;

    const activities = Array.isArray(society?.activities) && society.activities.length > 0
        ? society.activities
        : DEFAULT_ACTIVITIES;

    const description = society?.description || "The EEE Society of BAUST is the official student body representing all electrical engineering students. It bridges classroom learning with real-world leadership, cultural vibrancy, technical workshops, and national project competitions.";

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`EEE Society - ${department?.short_name || 'EEE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={society?.name || `${department?.short_name || 'EEE'} Society of BAUST`} 
                subtitle="Student Leadership, Technical Innovation & Cultural Excellence" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || EEE_DEPT_NAME} activeTab="EEE Society of BAUST" tabs={EEE_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{society?.name || 'EEE Society of BAUST'}</h2>
                                <p className="text-sm text-gray-500 mt-0.5">{department?.name || 'Department of Electrical and Electronic Engineering'}</p>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-600 leading-8 text-[15px] sm:text-[16px] text-justify whitespace-pre-line mb-10">
                            <p>{description}</p>
                        </div>

                        {/* Executive Committee */}
                        <div className="mb-10">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-emerald-600" />
                                Executive Advisory Committee
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {committee.map((member, idx) => (
                                    <div key={idx} className="p-4 rounded-2xl bg-gray-50/60 border border-gray-100 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">{member.role}</p>
                                            <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Key Society Activities */}
                        <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100 p-6 sm:p-8">
                            <h3 className="text-base font-bold text-emerald-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-700" />
                                Key Society Activities
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                                {activities.map((act, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5">
                                        <CheckCircle size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                                        <span className="leading-snug">{act}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
