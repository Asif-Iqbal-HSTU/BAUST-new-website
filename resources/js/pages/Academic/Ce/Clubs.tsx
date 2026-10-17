import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';
import { Users, Award, Calendar, CheckCircle, Sparkles, Leaf, Cpu } from 'lucide-react';

interface SocietyItem {
    id?: number;
    name: string;
    slug?: string;
    type?: string;
    description?: string | null;
    member_count?: string | null;
    established?: string | null;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    club?: SocietyItem | null;
    allClubs?: SocietyItem[];
    clubSlug?: string;
}

export default function CeClubs({ department, club, allClubs = [], clubSlug = 'esc' }: Props) {
    const isCeic = clubSlug === 'ceic';

    const ceicDetails = {
        name: "Civil Engineering Innovation Club (CEIC)",
        motto: "Designing Futures, Building Realities",
        established: "2021",
        memberCount: "200+ Members",
        description: "The Civil Engineering Innovation Club (CEIC) is a premier student platform at BAUST dedicated to engineering creativity, technical design, computer-aided drafting, and structural modeling. CEIC regularly hosts intra-departmental CAD speed drafting contests, bridge-building competitions, and industry guest lectures.",
        activities: [
            "Intra Dept. Drawing and CAD Contest (AutoCAD, Revit, ETABS)",
            "Bridge Building Model & Load-Bearing Competitions",
            "Structural Analysis & 3D Building Layout Workshops",
            "Sticker Design & Creative Branding Competitions",
            "Technical Seminars on Mega Infrastructure Projects in Bangladesh",
        ],
        advisors: [
            { role: "Chief Advisor", name: "Prof. Dr. Md. Mahmudul Hasan", title: "Dean & Head of Department" },
            { role: "Faculty Advisor", name: "Md. Izharul Haque Azad", title: "Assistant Professor" },
        ],
        committee: [
            { role: "President", name: "CEIC Student President" },
            { role: "Vice President", name: "CEIC Student Vice President" },
            { role: "General Secretary", name: "CEIC General Secretary" },
            { role: "Organizing Secretary", name: "CEIC Organizing Secretary" },
        ]
    };

    const escDetails = {
        name: "Environment and Sustainability Club (ESC)",
        motto: "Towards the sustainable environment: our earth our responsibility",
        established: "2023",
        memberCount: "150+ Members",
        description: "ESC is a pioneer club of the Department of Civil Engineering, established on 2nd September 2023 under the direct oversight of Dr. Md. Mahmudul Hasan. ESC provides a platform for students passionate about environmental stewardship to research green engineering materials, organize community cleanups, and champion eco-friendly infrastructure.",
        activities: [
            "Reuse of Plastic Materials Innovation Competition (18 Student Teams)",
            "Tree Plantation Drives & Campus Greening Campaigns",
            "Solid Waste Management & Circular Economy Workshops",
            "Sustainable Concrete & Eco-Brick Material Exhibitions",
            "Community Clean-Up and Environmental Awareness Initiatives",
        ],
        advisors: [
            { role: "Chief Advisor", name: "Prof. Dr. Md. Mahmudul Hasan", title: "Dean & Head of Department" },
            { role: "Advisor", name: "Punom Roy", title: "Lecturer, Dept. of Civil Engineering" },
            { role: "Co-Advisor", name: "Md. Kamrul Hasan Kawsar", title: "Lecturer, Dept. of Civil Engineering" },
        ],
        committee: [
            { role: "President", name: "Md. Siam Ur Sadik Khan", id: "17th Batch" },
            { role: "Vice-President", name: "Md. Nahid Hassan", id: "17th Batch" },
            { role: "General Secretary", name: "Arifin Zahan Swarony", id: "17th Batch" },
            { role: "Treasurer", name: "Saklain Mahmud Jissan", id: "19th Batch" },
            { role: "Organizing Secretary", name: "Parvej Alam & Abdullah Al Nayem", id: "19th & 20th Batch" },
            { role: "Media & Publication Secretary", name: "Sultan Mohammad Mubin & Ovijit Kumar Datta", id: "21st Batch" },
        ]
    };

    const currentData = isCeic ? ceicDetails : escDetails;

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${currentData.name} - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title={department?.name ? `Student Clubs - ${department.name}` : "Department of Civil Engineering (CE)"} 
                subtitle="Student Leadership, Innovation, and Environmental Sustainability" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Clubs" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
                
                {/* Switch Tabs */}
                <div className="flex border-b border-gray-200 max-w-md mx-auto bg-white rounded-2xl p-1.5 shadow-sm border">
                    <Link
                        href="/ce/clubs/esc"
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm rounded-xl transition-all ${
                            !isCeic 
                                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' 
                                : 'text-gray-500 hover:text-emerald-700 hover:bg-emerald-50'
                        }`}
                    >
                        <Leaf className="w-4 h-4" />
                        ESC Club
                    </Link>
                    <Link
                        href="/ce/clubs/ceic"
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm rounded-xl transition-all ${
                            isCeic 
                                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' 
                                : 'text-gray-500 hover:text-emerald-700 hover:bg-emerald-50'
                        }`}
                    >
                        <Cpu className="w-4 h-4" />
                        CEIC Club
                    </Link>
                </div>

                {/* Main Club Banner */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 sm:p-12">
                        <div className="flex items-center gap-5 mb-6">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-gray-100 shadow-md flex items-center justify-center flex-shrink-0 p-1.5 overflow-hidden">
                                <img 
                                    src={isCeic ? '/images/departments/ce/clubs/ceic-logo.jpg' : '/images/departments/ce/clubs/esc-logo.jpg'} 
                                    alt={`${currentData.name} Logo`} 
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                                    {isCeic ? 'Innovation & CAD Design' : 'Environment & Sustainability'}
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                                    {currentData.name}
                                </h2>
                            </div>
                        </div>

                        <div className="bg-emerald-50/60 text-emerald-900 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-emerald-100 inline-block mb-6">
                            Motto: &ldquo;{currentData.motto}&rdquo;
                        </div>

                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify max-w-4xl">
                            {currentData.description}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <Users className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Membership</p>
                                    <p className="text-sm sm:text-base font-extrabold text-gray-900">{currentData.memberCount}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Established</p>
                                    <p className="text-sm sm:text-base font-extrabold text-gray-900">{currentData.established}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                                <Sparkles className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Focus</p>
                                    <p className="text-sm sm:text-base font-extrabold text-gray-900">{isCeic ? 'CAD & Bridge Design' : 'Green Civil Engg'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activities & Initiatives */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Award className="text-emerald-700 w-6 h-6" />
                        <h3 className="text-2xl font-bold text-gray-900">Key Activities & Signature Events</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentData.activities.map((act, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-200 transition-all">
                                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                <span className="text-xs sm:text-sm font-semibold text-gray-700">{act}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Faculty Advisors & Student Committee */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Faculty Advisors */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                        <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-5 bg-emerald-500 rounded-full" />
                            Faculty Advisors
                        </h4>
                        <div className="space-y-4">
                            {currentData.advisors.map((adv, idx) => (
                                <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                                        {adv.role}
                                    </span>
                                    <h5 className="font-bold text-gray-900 text-base mt-2">{adv.name}</h5>
                                    <p className="text-xs text-gray-500 mt-0.5">{adv.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Student Executive Committee */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                        <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-5 bg-emerald-500 rounded-full" />
                            Student Executive Body
                        </h4>
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-emerald-200">
                            {currentData.committee.map((mem, idx) => (
                                <div key={idx} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{mem.role}</p>
                                        <h5 className="font-bold text-gray-900 text-sm">{mem.name}</h5>
                                    </div>
                                    {'id' in mem && (
                                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                                            {mem.id}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
