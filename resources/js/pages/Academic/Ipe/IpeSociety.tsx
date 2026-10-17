import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { IPE_TABS, IPE_DEPT_NAME } from '@/data/ipeData';
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
    { role: 'President', name: 'Prof. Dr. A.K.M. Nurul Amin, Head of Department' },
    { role: 'Faculty Advisor', name: 'Department Faculty Advisor, IPE' },
    { role: 'Student Body', name: 'Executive Committee, IEOM Student Chapter & IPE Club' },
];

const DEFAULT_ACTIVITIES = [
    'Annual Operations & Supply Chain Summit',
    'Lean Six Sigma Green Belt Preparation Sessions',
    'Industrial Study Tours to Manufacturing and Automotive Assembly Plants',
    'Case Study Competitions & Simulation Modeling Hackathons'
];

export default function IpeSociety({ department, society }: Props) {
    const committee = Array.isArray(society?.committee) && society.committee.length > 0 
        ? society.committee 
        : DEFAULT_COMMITTEE;

    const activities = Array.isArray(society?.activities) && society.activities.length > 0
        ? society.activities
        : DEFAULT_ACTIVITIES;

    const description = society?.description || "The IEOM Student Chapter and IPE Club of BAUST connects industrial engineering students with global research networks, Lean management workshops, industrial case study competitions, and multinational corporate mentorship.";

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`IPE Society - ${department?.short_name || 'IPE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={society?.name || `${department?.short_name || 'IPE'} Society of BAUST`} 
                subtitle="Student Leadership, Industrial Systems Innovation & Professional Excellence" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || IPE_DEPT_NAME} activeTab="IPE Society of BAUST" tabs={IPE_TABS} />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-12">
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{society?.name || 'IPE Society of BAUST'}</h2>
                                <p className="text-sm text-gray-500 mt-0.5">{department?.name || 'Department of Industrial and Production Engineering'}</p>
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
