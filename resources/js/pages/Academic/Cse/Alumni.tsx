import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CSE_TABS, CSE_DEPT_NAME } from '@/data/cseData';
import { Users, Award, Briefcase, GraduationCap, Star, Zap, BookOpen, Coffee, Heart } from 'lucide-react';

interface ActivityItem {
    title: string;
    icon?: any;
    description: string;
}

interface CommitteeMember {
    role: string;
    name: string;
    designation: string;
    image?: string | null;
}

interface AlumniData {
    id?: number;
    name: string;
    slug?: string;
    description?: string | null;
    member_count?: string | null;
    activities?: ActivityItem[] | null;
    committee?: CommitteeMember[] | null;
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

const ICON_MAP: Record<string, any> = {
    Users,
    GraduationCap,
    Zap,
    Award,
    BookOpen,
    Briefcase,
    Star,
    Coffee,
    Heart,
};

const DEFAULT_ACTIVITIES: ActivityItem[] = [
    { title: "Seminars & Workshops", icon: Users, description: "Regular academic and technical sessions with industry experts." },
    { title: "Study Tours", icon: GraduationCap, description: "Educational trips to leading tech hubs and research centers." },
    { title: "Software Fair", icon: Zap, description: "Showcasing innovative software projects developed by students." },
    { title: "Electronics Fair", icon: Zap, description: "Displaying hardware and embedded systems innovations." },
    { title: "Math Olympiad", icon: Award, description: "Competitive math challenges to sharpen analytical skills." },
    { title: "Informatics Olympiad", icon: BookOpen, description: "Programming and logic-based competitions." },
    { title: "Job Fair", icon: Briefcase, description: "Connecting final year students with top-tier employers." },
    { title: "Career Counseling", icon: Star, description: "Guidance on professional paths and industry requirements." },
    { title: "Gaming Competition", icon: Zap, description: "E-sports events for recreational engagement." },
    { title: "Programming Contest", icon: Zap, description: "Intense coding challenges to foster problem-solving." },
    { title: "Quiz Competition", icon: BookOpen, description: "Broadening general knowledge and academic awareness." },
    { title: "Cultural Program", icon: Coffee, description: "Annual events celebrating arts and university culture." },
    { title: "Blood Donation", icon: Heart, description: "Social responsibility initiatives for the community." },
];

const DEFAULT_COMMITTEE: CommitteeMember[] = [
    {
        role: "Treasurer",
        name: "Fatima Jahan Sarmin",
        designation: "Lecturer, Dept. of CSE",
        image: "/storage/members/dr-md-nakib-hayat-chowdhury.jpg",
    },
    {
        role: "Vice President (VP)",
        name: "Nahid Sidique",
        designation: "Student, 1st batch",
        image: null,
    }
];

export default function Alumni({ department, alumni }: Props) {
    const title = alumni?.name || "Alumni & CSE Society";
    const description = alumni?.description || "The CSE Alumni Association and the CSE Society of BAUST work together to bridge the gap between academic excellence and professional success. Our activities are designed to nurture talent, encourage social responsibility, and build a lifelong network of engineering professionals.";
    const activities = (alumni?.activities && alumni.activities.length > 0) ? alumni.activities : DEFAULT_ACTIVITIES;
    const committee = (alumni?.committee && alumni.committee.length > 0) ? alumni.committee : DEFAULT_COMMITTEE;

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${title} - BAUST`} />
            <Navbar />
            <PageHero 
                title={title} 
                subtitle="Fostering Connections, Empowering Future Leaders" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.name || CSE_DEPT_NAME} activeTab="Alumni" tabs={CSE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Introduction */}
                <div className="max-w-3xl mb-20">
                    <h2 className="text-4xl font-black text-gray-900 mb-6">Building a Legacy</h2>
                    <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                        {description}
                    </p>
                </div>

                {/* Activities Section */}
                <section className="mb-24">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Activities</h2>
                            <p className="text-gray-500 font-medium">Core events and initiatives organized by the society</p>
                        </div>
                        <div className="hidden md:block h-px flex-grow ml-12 bg-gradient-to-r from-emerald-100 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {activities.map((act, idx) => {
                            const IconComponent = (typeof act.icon === 'string' ? ICON_MAP[act.icon] : act.icon) || Zap;
                            return (
                                <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                        <IconComponent size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{act.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{act.description}</p>
                                </div>
                            );
                        })}
                        {/* More card */}
                        <div className="bg-emerald-600 p-8 rounded-3xl shadow-lg flex flex-col justify-center text-white relative overflow-hidden group">
                            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                <Zap size={150} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 relative z-10">And More...</h3>
                            <p className="text-emerald-100 text-sm leading-relaxed relative z-10">
                                Other activities as decided by the executive committee to ensure the continuous growth of our community.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Committee Section */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Meet Your Committee</h2>
                        <div className="h-px flex-grow bg-emerald-100" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                        {committee.map((person, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all flex items-center gap-6 group">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-emerald-50 flex-shrink-0 relative flex items-center justify-center">
                                    {person.image ? (
                                        <img 
                                            src={person.image} 
                                            alt={person.name} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <Users className="w-10 h-10 text-emerald-600" />
                                    )}
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
                                </div>
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-2">
                                        {person.role}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{person.name}</h3>
                                    <p className="text-gray-500 text-sm font-medium">{person.designation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer Message */}
                <div className="mt-24 p-10 bg-white rounded-[2rem] border border-emerald-100 shadow-inner text-center">
                    <Heart className="mx-auto text-emerald-500 w-12 h-12 mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Join the Community</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Whether you are a fresh graduate or a seasoned professional, your journey with BAUST doesn't end at graduation. Stay connected and contribute to the next generation of engineers.
                    </p>
                    <a
                        href="/cse/cse-society"
                        className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200"
                    >
                        Learn More About Society
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    );
}
