import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { DBA_TABS, DBA_DEPT_NAME } from '@/data/dbaData';
import { Users, Award, BookOpen, Briefcase, Zap, Heart, Megaphone, TrendingUp, Compass, Calendar } from 'lucide-react';

interface ActivityItem {
    title: string;
    description: string;
}

interface CommitteeMember {
    role: string;
    name: string;
    designation?: string | null;
    image?: string | null;
}

interface ClubData {
    id?: number;
    name: string;
    slug?: string;
    description?: string | null;
    member_count?: string | null;
    established?: string | null;
    activities?: ActivityItem[] | string | null;
    committee?: CommitteeMember[] | string | null;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    club?: ClubData | null;
}

const DEFAULT_ACTIVITIES: ActivityItem[] = [
    { title: "Business Case Competitions & Hackathons", description: "Hands-on simulations where student teams analyze complex real-world corporate challenges and pitch strategic solutions to industry judges." },
    { title: "Corporate Guest Lectures & CXO Fireside Chats", description: "Interactive dialogue sessions with managing directors, chief marketing officers, and startup founders from leading multinationals." },
    { title: "Leadership Grooming & Presentation Bootcamps", description: "Intensive workshops on public speaking, executive pitch decks, PowerPoint mastery, and professional business etiquette." },
    { title: "Annual Business Fest & Startup Idea Expo", description: "The premier student business carnival featuring product marketing battles, elevator pitch contests, and live corporate stalls." },
    { title: "Industrial & Port Logistics Study Tours", description: "Experiential field trips to manufacturing plants, sea ports, and supply chain fulfillment hubs across the country." },
    { title: "Social Responsibility & Community Drives", description: "Philanthropic initiatives, winter clothes distribution, and financial literacy workshops for rural communities in northern Bangladesh." },
];

const DEFAULT_COMMITTEE: CommitteeMember[] = [
    { role: "President", name: "Tahmid Hasan", designation: "BBA 11th Batch" },
    { role: "Vice President", name: "Nusrat Jahan", designation: "BBA 11th Batch" },
    { role: "General Secretary", name: "Rafid Zaman", designation: "BBA 12th Batch" },
    { role: "Joint Secretary", name: "Sadia Rahman", designation: "BBA 12th Batch" },
    { role: "Organizing Secretary", name: "Tanvir Ahmed", designation: "BBA 13th Batch" },
];

export default function DbaClubs({ department, club }: Props) {
    const parseData = (val: any, fallback: any) => {
        if (!val) return fallback;
        if (typeof val === 'string') {
            try {
                return JSON.parse(val);
            } catch (e) {
                return fallback;
            }
        }
        return val;
    };

    const activities: ActivityItem[] = parseData(club?.activities, DEFAULT_ACTIVITIES);
    const committee: CommitteeMember[] = parseData(club?.committee, DEFAULT_COMMITTEE);

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Business Club - ${department?.short_name || 'DBA'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={club?.name || "BAUST Business Club (BBC)"} 
                subtitle="The Hub of Student Leadership, Case Solving, and Entrepreneurial Spirit" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || DBA_DEPT_NAME} activeTab="Business Club" tabs={DBA_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

                {/* Hero Card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 sm:p-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                                <Zap className="w-7 h-7" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                                    Student Co-Curricular Platform
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                                    {club?.name || 'BAUST Business Club'}
                                </h2>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed text-base text-justify">
                            {club?.description || 'The BAUST Business Club is the premier student-led organization representing the Department of Business Administration. Designed as a springboard for future executives, entrepreneurs, and thinkers, the club equips undergraduates with pragmatic skills in business case analysis, executive presentations, branding, and event organization.'}
                        </p>

                        {/* Quick Metrics */}
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
                                <p className="text-2xl font-black text-emerald-700">{club?.member_count || '250+'}</p>
                                <p className="text-xs text-gray-500 uppercase font-semibold mt-1">Active Members</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-center">
                                <p className="text-2xl font-black text-blue-700">15+</p>
                                <p className="text-xs text-gray-500 uppercase font-semibold mt-1">Events Annually</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-center col-span-2 sm:col-span-1">
                                <p className="text-2xl font-black text-purple-700">{club?.established || '2016'}</p>
                                <p className="text-xs text-gray-500 uppercase font-semibold mt-1">Established</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Activities */}
                <div className="space-y-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                            Club Programs
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                            Signature Co-Curricular Initiatives
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activities.map((act, idx) => (
                            <div 
                                key={idx}
                                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group"
                            >
                                <div className="space-y-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                                        0{idx + 1}
                                    </div>
                                    <h4 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                        {act.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        {act.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Executive Committee */}
                {committee.length > 0 && (
                    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl space-y-8">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                Student Leadership
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                                Club Executive Committee
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {committee.map((member, idx) => (
                                <div 
                                    key={idx}
                                    className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-md">
                                        {member.role}
                                    </span>
                                    <h4 className="text-base font-bold text-gray-900 mt-2">{member.name}</h4>
                                    {member.designation && (
                                        <p className="text-xs text-gray-500 mt-0.5">{member.designation}</p>
                                    )}
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
