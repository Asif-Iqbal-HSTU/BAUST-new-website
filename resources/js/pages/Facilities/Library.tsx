import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { 
    BookOpen, 
    Clock, 
    UserCheck, 
    Globe, 
    Library, 
    PhoneCall, 
    Mail, 
    Phone, 
    ArrowUpRight, 
    CheckCircle2, 
    Search, 
    Award, 
    Compass, 
    Monitor, 
    Zap, 
    Settings, 
    Factory, 
    HardHat, 
    Briefcase, 
    BookText, 
    ExternalLink, 
    ShieldAlert,
    MapPin,
    Calendar,
    ChevronRight,
    FileText
} from 'lucide-react';

interface EResource {
    name: string;
    url: string;
}

interface DepartmentCollection {
    name: string;
    code: string;
    description: string;
}

export default function LibraryRedesign() {
    const [activeTab, setActiveTab] = useState<'overview' | 'membership' | 'resources' | 'collections' | 'gallery'>('overview');

    const tabs = [
        { id: 'overview', name: 'Overview & Hours', icon: BookOpen },
        { id: 'membership', name: 'Membership & Policy', icon: UserCheck },
        { id: 'resources', name: 'E-Resources', icon: Globe },
        { id: 'collections', name: 'Collections Overview', icon: Library },
        { id: 'gallery', name: 'Gallery & Contacts', icon: PhoneCall },
    ] as const;

    // E-Resources
    const basLicobResources: EResource[] = [
        { name: "American Institute of Physics (AIP)", url: "https://aip.scitation.org/" },
        { name: "American Physical Society", url: "https://journals.aps.org/search" },
        { name: "American Society of Agricultural & Biological Engineers (ASABE)", url: "https://elibrary.asabe.org/" },
        { name: "American Society of Civil Engineers (ASCE)", url: "https://ascelibrary.org/" },
        { name: "American Society of Mechanical Engineers (ASME)", url: "https://asmedigitalcollection.asme.org/" },
        { name: "Cambridge University Press (CUP)", url: "https://www.cambridge.org/core" },
        { name: "De Gruyter Online Journals (inc LIS)", url: "https://www.degruyter.com/search?t1=BB" },
        { name: "EBSCO including CMMC", url: "https://search.ebscohost.com/" },
        { name: "Indian Journals", url: "http://www.indianjournals.com/" },
        { name: "International Forestry Review", url: "https://www.cabi.org/ifr/" },
        { name: "Nature Publishing Group", url: "https://www.nature.com/" },
        { name: "Oxford Journals", url: "https://academic.oup.com/journals" },
        { name: "Project MUSE eBooks", url: "https://muse.jhu.edu/" },
        { name: "Project MUSE Journals", url: "https://muse.jhu.edu/" },
        { name: "Springer Link", url: "https://link.springer.com/" },
    ];

    const openAccessResources: EResource[] = [
        { name: "AGORA Portal", url: "https://www.fao.org/agora/en/" },
        { name: "ARDI Database", url: "https://www.wipo.int/ardi/en/#" },
        { name: "HINARI Access to Research", url: "https://www.who.int/hinari/en/" },
        { name: "OARE Environmental Science", url: "https://www.unep.org/explore-topics/environment-under-review/what-we-do/information-management/online-access-research" },
        { name: "Goali Law Resources", url: "http://www.ilo.org/goali/lang--en/index.htm" },
        { name: "Bangladesh Journals Online (BanglaJOL)", url: "https://www.banglajol.info/" },
        { name: "Directory of Open Access Books (DOAB)", url: "https://www.doabooks.org/" },
        { name: "Indian Open Access Journals (Open Science)", url: "https://www.opensciencepublications.com/" },
    ];

    // Departmental Collections
    const departments: DepartmentCollection[] = [
        { name: "Computer Science and Engineering", code: "CSE", description: "Comprehensive books on algorithms, software engineering, databases, AI, web development, and networking.", },
        { name: "Electrical and Electronic Engineering", code: "EEE", description: "Reference volumes on power systems, telecommunication, signal processing, and electronics engineering.", },
        { name: "Mechanical Engineering", code: "ME", description: "Core textbooks on thermodynamics, fluid mechanics, fluid dynamics, design, and automotive technologies.", },
        { name: "Industrial and Production Engineering", code: "IPE", description: "Standard works on operations research, manufacturing processes, supply chain management, and safety protocols.", },
        { name: "Civil Engineering", code: "CE", description: "Essential books covering structural design, geotechnics, environmental engineering, and concrete technology.", },
        { name: "Business Administration", code: "BBA", description: "Diverse materials on marketing, organizational behavior, financial accounting, strategic management, and economics.", },
        { name: "Department of English", code: "ENGLISH", description: "Classical and modern literature, linguistics, grammar guides, communications, and language development texts.", },
    ];

    const getDeptIcon = (code: string) => {
        switch (code) {
            case 'CSE': return <Monitor className="w-6 h-6 text-emerald-600" />;
            case 'EEE': return <Zap className="w-6 h-6 text-emerald-600" />;
            case 'ME': return <Settings className="w-6 h-6 text-emerald-600" />;
            case 'IPE': return <Factory className="w-6 h-6 text-emerald-600" />;
            case 'CE': return <HardHat className="w-6 h-6 text-emerald-600" />;
            case 'BBA': return <Briefcase className="w-6 h-6 text-emerald-600" />;
            case 'ENGLISH': return <BookText className="w-6 h-6 text-emerald-600" />;
            default: return <BookOpen className="w-6 h-6 text-emerald-600" />;
        }
    };

    const userPolicies = [
        "All personal bags, coats, jackets, umbrellas, etc. are to be kept in the pigeonhole near the security desk before entry.",
        "Group study, gossiping, loud discussions, eating, drinking, and smoking are strictly prohibited inside the library premises.",
        "Students are requested to handle all library property (fittings, furniture, equipment, books, journals, CDs, PCs) with extreme care.",
        "Mobile phones must be kept on silent/switched off mode. Phone conversations are strictly prohibited inside the reading rooms.",
        "No book shall be issued to students for reading room use or home loan within the last 30 minutes before the daily closing time.",
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Central Library - BAUST" />
            <Navbar />

            <PageHero 
                title="Central Library" 
                subtitle="The Knowledge Resource & Research Hub of BAUST" 
            />

            {/* Quick Metrics / Hero Sub-banner */}
            <div className="bg-emerald-900 text-white py-6 border-b border-emerald-800 shadow-md">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="border-r border-emerald-800 last:border-r-0 py-2">
                        <div className="text-3xl font-black text-emerald-300">10,000+</div>
                        <div className="text-xs uppercase tracking-wider text-emerald-100 font-semibold mt-1">Printed Books</div>
                    </div>
                    <div className="border-r border-emerald-800 last:border-r-0 py-2">
                        <div className="text-3xl font-black text-emerald-300">15+</div>
                        <div className="text-xs uppercase tracking-wider text-emerald-100 font-semibold mt-1">BAS-LiCoB Databases</div>
                    </div>
                    <div className="border-r border-emerald-800 last:border-r-0 py-2">
                        <div className="text-3xl font-black text-emerald-300">3,500+</div>
                        <div className="text-xs uppercase tracking-wider text-emerald-100 font-semibold mt-1">Wiley E-Books</div>
                    </div>
                    <div className="py-2">
                        <div className="text-3xl font-black text-emerald-300">100%</div>
                        <div className="text-xs uppercase tracking-wider text-emerald-100 font-semibold mt-1">Digitized Access</div>
                    </div>
                </div>
            </div>

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* TAB SWITCHER */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-2 rounded-[2.2rem] shadow-lg border border-emerald-100 flex flex-wrap justify-center gap-1.5 md:gap-2 max-w-full overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-[13.5px] font-bold transition-all duration-300 cursor-pointer ${
                                        isActive 
                                            ? 'bg-[#0f5132] text-white shadow-md shadow-emerald-950/20' 
                                            : 'text-gray-600 hover:text-[#0f5132] hover:bg-emerald-50'
                                    }`}
                                >
                                    <Icon size={17} />
                                    <span>{tab.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* TAB CONTENT - OVERVIEW */}
                {activeTab === 'overview' && (
                    <div className="space-y-16 animate-[fadeIn_0.5s_ease-out]">
                        
                        {/* Intro Grid */}
                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                            <div className="w-full lg:w-1/2 space-y-6">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                                    <Award size={12} />
                                    The Heart of BAUST
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                                    Welcome to the Knowledge Resource Center
                                </h2>
                                <p className="text-gray-600 text-[16.5px] leading-relaxed text-justify">
                                    Bangladesh Army University of Science and Technology (BAUST), Saidpur, hosts a modern and resourceful library designed to meet the academic, research, and general learning needs of students, faculty members, and staff. The library acts as the heart of our institution, preserving research results and providing critical access to literature for lesson preparation and academic advancement.
                                </p>
                                <p className="text-gray-600 text-[16.5px] leading-relaxed text-justify">
                                    Our catalog is fully integrated with digital databases and houses a vast and diverse physical collection of textbooks, references, monographs, and periodicals.
                                </p>
                                
                                <div className="pt-4 flex flex-wrap gap-4">
                                    <a 
                                        href="http://library.baust.edu.bd/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#0f5132] hover:bg-[#0a3622] text-white px-6 py-3.5 rounded-2xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group"
                                    >
                                        <span>OPAC Online Catalog</span>
                                        <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </a>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 relative">
                                <div className="absolute inset-0 bg-emerald-600/10 rounded-[2.5rem] -translate-x-2.5 translate-y-2.5 z-0 pointer-events-none" />
                                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border border-emerald-50 bg-emerald-50/50">
                                    <img 
                                        src="https://www.baust.edu.bd/wp-content/uploads/2021/12/Photo-650x488.jpg" 
                                        alt="BAUST Library Interior" 
                                        className="w-full h-auto object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://placehold.co/650x488/0f5132/ffffff?text=BAUST+Central+Library";
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Vision & Mission Split Cards */}
                        <div className="grid md:grid-cols-2 gap-8 pt-6">
                            {/* Mission */}
                            <div className="bg-white rounded-[2.5rem] border border-emerald-100/50 p-10 md:p-12 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[3rem] -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500 pointer-events-none" />
                                <div className="relative z-10 space-y-6">
                                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800">
                                        <Compass className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900">Our Mission</h3>
                                    <p className="text-gray-600 leading-relaxed text-justify">
                                        To provide comprehensive information resources, research databases, and modern services in support of the research, teaching, and learning needs of the entire BAUST community, fostering a culture of academic rigor and curiosity.
                                    </p>
                                </div>
                            </div>

                            {/* Vision */}
                            <div className="bg-white rounded-[2.5rem] border border-emerald-100/50 p-10 md:p-12 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[3rem] -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500 pointer-events-none" />
                                <div className="relative z-10 space-y-6">
                                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800">
                                        <Award className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900">Our Vision</h3>
                                    <p className="text-gray-600 leading-relaxed text-justify">
                                        To build a world-class Knowledge Resource Centre and deliver innovative learning services, digital library solutions, and rich collections utilizing the latest 21st-century technological advancements for research and learning communities.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Library Hours Layout */}
                        <div className="bg-emerald-900 text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 opacity-10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 blur-[80px] translate-y-1/2 -translate-x-1/2" />
                            
                            <div className="relative z-10 space-y-10">
                                <div className="text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                                        <Clock size={12} />
                                        Timing Schedule
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black">Official Library Operating Hours</h3>
                                    <p className="text-emerald-200/80 text-sm max-w-xl mt-2">
                                        The library maintains regular operating hours during weekdays and select hours on weekends to maximize student accessibility.
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {/* Summer Timings */}
                                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 flex flex-col justify-between h-full">
                                        <div className="space-y-4">
                                            <div className="text-emerald-300 text-xs font-black uppercase tracking-wider">Summer Schedule</div>
                                            <div className="text-2xl font-extrabold">08:00 AM - 06:00 PM</div>
                                            <p className="text-emerald-100/70 text-xs leading-relaxed">
                                                Applicable from 01 March to 14 November. Extended evening hours to support student learning.
                                            </p>
                                        </div>
                                        <div className="mt-6 flex items-center gap-2 text-emerald-300 text-xs font-bold">
                                            <Calendar size={14} />
                                            <span>01 Mar – 14 Nov</span>
                                        </div>
                                    </div>

                                    {/* Winter Timings */}
                                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 flex flex-col justify-between h-full">
                                        <div className="space-y-4">
                                            <div className="text-emerald-300 text-xs font-black uppercase tracking-wider">Winter Schedule</div>
                                            <div className="text-2xl font-extrabold">08:30 AM - 04:30 PM</div>
                                            <p className="text-emerald-100/70 text-xs leading-relaxed">
                                                Applicable from 15 November to 28 February. Adjusting to winter seasonal daylight hours.
                                            </p>
                                        </div>
                                        <div className="mt-6 flex items-center gap-2 text-emerald-300 text-xs font-bold">
                                            <Calendar size={14} />
                                            <span>15 Nov – 28 Feb</span>
                                        </div>
                                    </div>

                                    {/* Days Open */}
                                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 flex flex-col justify-between h-full sm:col-span-2 lg:col-span-1">
                                        <div className="space-y-4">
                                            <div className="text-emerald-300 text-xs font-black uppercase tracking-wider">Weekly Coverage</div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between border-b border-white/10 pb-1.5 text-[15px] font-bold">
                                                    <span>Sunday – Thursday</span>
                                                    <span className="text-emerald-300 font-extrabold">Open</span>
                                                </div>
                                                <div className="flex justify-between border-b border-white/10 pb-1.5 text-[15px] font-bold">
                                                    <span>Saturday</span>
                                                    <span className="text-emerald-300 font-extrabold">10 AM - 02 PM</span>
                                                </div>
                                                <div className="flex justify-between text-[15px] font-bold">
                                                    <span>Friday</span>
                                                    <span className="text-red-300 font-extrabold">Closed</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center gap-2 text-emerald-300 text-xs font-bold">
                                            <MapPin size={14} />
                                            <span>Main Campus, Library Hall</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* TAB CONTENT - MEMBERSHIP & POLICY */}
                {activeTab === 'membership' && (
                    <div className="space-y-16 animate-[fadeIn_0.5s_ease-out]">
                        
                        {/* Membership Procedure */}
                        <div className="bg-white rounded-[3rem] border border-emerald-100 p-10 md:p-16 shadow-sm flex flex-col lg:flex-row gap-12 items-center">
                            <div className="w-full lg:w-1/2 space-y-6">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                                    <UserCheck size={12} />
                                    Access & Enrollment
                                </span>
                                <h2 className="text-3xl font-black text-gray-900 leading-tight">
                                    Library Membership Procedure
                                </h2>
                                <p className="text-gray-600 text-base leading-relaxed">
                                    Becoming a member of the BAUST Central Library allows you to borrow physical resources, access digital e-resource kiosks, and utilize the study cubicles.
                                </p>
                                
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center font-bold text-emerald-800 flex-shrink-0">1</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Automatic Registration</h4>
                                            <p className="text-sm text-gray-600">All students, faculty members, and officers are automatically registered upon admission or onboarding by the library administration.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center font-bold text-emerald-800 flex-shrink-0">2</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Semester Course Validation</h4>
                                            <p className="text-sm text-gray-600">Student library membership validity is dynamically extended each semester, dependent upon valid registration of academic courses.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center font-bold text-emerald-800 flex-shrink-0">3</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">University Smart Card ID</h4>
                                            <p className="text-sm text-gray-600">Smart Cards serve as the official library barcode access key. Borrowing requires verification at the circulation counter.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 bg-emerald-50 rounded-[2.5rem] p-10 border border-emerald-100 flex flex-col justify-center text-center space-y-6">
                                <Award className="w-16 h-16 text-emerald-800 mx-auto" />
                                <h3 className="text-2xl font-bold text-emerald-950">Library Database Account</h3>
                                <p className="text-sm text-gray-700 leading-relaxed max-w-sm mx-auto">
                                    You can check your borrowing history, search book availability, and request reservations online through our integrated web catalog.
                                </p>
                                <div className="pt-2">
                                    <a 
                                        href="http://library.baust.edu.bd/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#0f5132] hover:bg-[#0a3622] text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 text-sm"
                                    >
                                        <span>Access Database</span>
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Rules and Policies */}
                        <div className="space-y-8">
                            <div className="text-center max-w-xl mx-auto space-y-3">
                                <span className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">Guidelines</span>
                                <h3 className="text-3xl font-black text-gray-900">Library User Policies</h3>
                                <p className="text-gray-500 text-sm">
                                    We maintain a strict academic environment inside the library. Users are requested to read and abide by the following library rules.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {userPolicies.map((policy, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-white p-8 rounded-[2rem] border border-gray-100/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group h-full"
                                    >
                                        <div className="space-y-4">
                                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 font-bold text-sm">
                                                {index === 4 ? <Clock size={16} /> : <ShieldAlert size={16} />}
                                            </div>
                                            <p className="text-gray-600 text-[14.5px] leading-relaxed">
                                                {policy}
                                            </p>
                                        </div>
                                        <div className="pt-6 text-xs text-gray-400 font-bold uppercase tracking-wider">
                                            Rule No. {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}

                {/* TAB CONTENT - E-RESOURCES */}
                {activeTab === 'resources' && (
                    <div className="space-y-16 animate-[fadeIn_0.5s_ease-out]">
                        
                        {/* E-Resources Introduction */}
                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                            <div className="w-full lg:w-1/2 space-y-6">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                                    <Globe size={12} />
                                    Digital Consortium
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                                    Access Electronic & Online Databases
                                </h2>
                                <p className="text-gray-600 text-base leading-relaxed text-justify">
                                    To support advanced research, graduation projects, and course preparation, BAUST provides high-speed terminal connections to global electronic journals, databases, and library consortia. E-resource access is configured via campus IP addresses, allowing automatic authorization when browsing within the university network.
                                </p>
                                
                                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100/80 space-y-3">
                                    <h4 className="font-extrabold text-emerald-950 flex items-center gap-2">
                                        <CheckCircle2 size={18} className="text-emerald-700" />
                                        Wiley UGC Consortium E-Books
                                    </h4>
                                    <p className="text-gray-700 text-[13.5px] leading-relaxed text-justify">
                                        BAUST Library subscribes to **3,500 Wiley online e-books** in perpetual mode (lifetime access) covering life, health, physical sciences, social sciences, and the humanities through the UDL Consortium.
                                    </p>
                                    <div className="pt-2">
                                        <a 
                                            href="https://www.wileyindia.com/Wiley_Online_Resources/UGC%20Bangladesh/UGC%20Bangladesh.html"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 hover:text-emerald-950 hover:underline"
                                        >
                                            <span>Download Wiley Books Catalogue</span>
                                            <ChevronRight size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 relative">
                                <div className="absolute inset-0 bg-emerald-600/10 rounded-[2.5rem] translate-x-2.5 -translate-y-2.5 z-0 pointer-events-none" />
                                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border border-emerald-50 bg-emerald-50/50">
                                    <img 
                                        src="https://www.baust.edu.bd/wp-content/uploads/2021/12/e-resource-corner-1.jpg" 
                                        alt="E-Resource Corner at BAUST" 
                                        className="w-full h-auto object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://placehold.co/650x488/0f5132/ffffff?text=E-Resource+Corner";
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* LiCoB Resources List */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-1.5 bg-emerald-600 rounded-full" />
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-wider">i) BAS-LiCoB Consortium Journals & Databases</h3>
                                <div className="flex-grow h-px bg-gray-200" />
                            </div>
                            <p className="text-gray-500 text-sm">
                                Formerly known as the Bangladesh INASP-PERI Consortium (BIPC), these premium scientific research databases are accessible inside the campus IP network.
                              </p>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {basLicobResources.map((res, i) => (
                                    <a 
                                        key={i}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex items-center justify-between group"
                                    >
                                        <span className="text-[13.5px] font-bold text-gray-700 group-hover:text-emerald-800 transition-colors pr-2 leading-tight">
                                            {res.name}
                                        </span>
                                        <ArrowUpRight size={16} className="text-gray-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Open Access Resources List */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-1.5 bg-emerald-600 rounded-full" />
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-wider">ii) Open Access (Free) Academic Portals</h3>
                                <div className="flex-grow h-px bg-gray-200" />
                            </div>
                            <p className="text-gray-500 text-sm">
                                Free, public repository systems recommended for research, reference material, thesis compiling, and general education resources.
                            </p>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {openAccessResources.map((res, i) => (
                                    <a 
                                        key={i}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex items-center justify-between group"
                                    >
                                        <span className="text-[13.5px] font-bold text-gray-700 group-hover:text-emerald-800 transition-colors pr-2 leading-tight">
                                            {res.name}
                                        </span>
                                        <ArrowUpRight size={16} className="text-gray-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>
                )}

                {/* TAB CONTENT - COLLECTIONS OVERVIEW */}
                {activeTab === 'collections' && (
                    <div className="space-y-12 animate-[fadeIn_0.5s_ease-out]">
                        
                        <div className="max-w-3xl space-y-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                                <Library size={12} />
                                Academic Holdings
                            </span>
                            <h2 className="text-3xl font-black text-gray-900">
                                Departmental Book Holdings & Catalogs
                            </h2>
                            <p className="text-gray-600 text-base leading-relaxed text-justify">
                                BAUST Central Library holds dedicated sections containing reference text and specialized books mapping exactly to the curricula of all active departments. Detailed physical book registers and computerized databases are organized for:
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {departments.map((dept, i) => (
                                <div 
                                    key={i} 
                                    className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-500 group relative flex flex-col justify-between h-full"
                                >
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                                {getDeptIcon(dept.code)}
                                            </div>
                                            <span className="text-[10px] font-black tracking-widest text-[#0f5132]/60 uppercase bg-emerald-50/50 px-2.5 py-1 rounded-md border border-emerald-100/30">
                                                {dept.code}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="text-xl font-extrabold text-gray-900 group-hover:text-emerald-800 transition-colors">
                                                {dept.name}
                                            </h4>
                                            <p className="text-gray-500 text-[13.5px] leading-relaxed">
                                                {dept.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-4 border-t border-dashed border-gray-100 flex items-center justify-between">
                                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Reference Available</span>
                                        <a 
                                            href="http://library.baust.edu.bd/" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-xs font-black text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group/link"
                                        >
                                            <span>Search Books</span>
                                            <ChevronRight size={14} className="transition-transform group-hover/link:translate-x-0.5" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Catalog CTA */}
                        <div className="bg-emerald-900 rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-800 via-emerald-900 to-[#052214] opacity-50 z-0" />
                            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                                <Search className="w-12 h-12 text-emerald-300 mx-auto" />
                                <h3 className="text-2xl md:text-3xl font-black">Search the OPAC Catalog System</h3>
                                <p className="text-emerald-100/70 text-sm leading-relaxed">
                                    Already have a specific title or author in mind? Access our online library management system to perform direct keyword query search and reservation.
                                </p>
                                <div className="pt-2">
                                    <a 
                                        href="http://library.baust.edu.bd/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-md text-sm"
                                    >
                                        <span>Launch Online Search Catalog</span>
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* TAB CONTENT - GALLERY & CONTACTS */}
                {activeTab === 'gallery' && (
                    <div className="space-y-16 animate-[fadeIn_0.5s_ease-out]">
                        
                        {/* Gallery Section */}
                        <div className="space-y-8">
                            <div className="text-center max-w-xl mx-auto space-y-3">
                                <span className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">Visuals</span>
                                <h3 className="text-3xl font-black text-gray-900">Library Gallery</h3>
                                <p className="text-gray-500 text-sm">
                                    Explore images of the reading room, library stacks, and e-resource kiosks.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Photo 1 */}
                                <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 relative flex flex-col">
                                    <div className="overflow-hidden relative flex-grow aspect-video bg-emerald-50 flex items-center justify-center">
                                        <img 
                                            src="https://www.baust.edu.bd/wp-content/uploads/2021/12/Photo-650x488.jpg" 
                                            alt="Library Reading Room" 
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-750"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://placehold.co/650x488/0f5132/ffffff?text=Reading+Hall";
                                            }}
                                        />
                                    </div>
                                    <div className="p-6 text-center border-t border-gray-50 bg-white">
                                        <h4 className="font-extrabold text-gray-800 text-[15px]">Central Reading Hall</h4>
                                        <p className="text-xs text-gray-400 mt-1">Spacious & quiet reading environment</p>
                                    </div>
                                </div>

                                {/* Photo 2 */}
                                <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 relative flex flex-col">
                                    <div className="overflow-hidden relative flex-grow aspect-video bg-emerald-50 flex items-center justify-center">
                                        <img 
                                            src="https://www.baust.edu.bd/wp-content/uploads/2021/12/e-resource-corner-1.jpg" 
                                            alt="E-Resource Desk" 
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-750"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://placehold.co/650x488/0f5132/ffffff?text=E-Resources";
                                            }}
                                        />
                                    </div>
                                    <div className="p-6 text-center border-t border-gray-50 bg-white">
                                        <h4 className="font-extrabold text-gray-800 text-[15px]">E-Resource Corner</h4>
                                        <p className="text-xs text-gray-400 mt-1">Broadband access terminals & journals</p>
                                    </div>
                                </div>

                                {/* Photo 3 */}
                                <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 relative flex flex-col">
                                    <div className="overflow-hidden relative flex-grow aspect-video bg-emerald-50 flex items-center justify-center">
                                        <img 
                                            src="https://www.baust.edu.bd/wp-content/uploads/2021/12/Photo-1-650x488.jpg" 
                                            alt="Book Shelves Stacks" 
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-750"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://placehold.co/650x488/0f5132/ffffff?text=Book+Shelves";
                                            }}
                                        />
                                    </div>
                                    <div className="p-6 text-center border-t border-gray-50 bg-white">
                                        <h4 className="font-extrabold text-gray-800 text-[15px]">Book Shelf Stacks</h4>
                                        <p className="text-xs text-gray-400 mt-1">Physical catalog index of 10,000+ volumes</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contacts Section */}
                        <div className="space-y-8 pt-4">
                            <div className="text-center max-w-xl mx-auto space-y-3">
                                <span className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">Assistance</span>
                                <h3 className="text-3xl font-black text-gray-900">Library Contacts</h3>
                                <p className="text-gray-500 text-sm">
                                    Need help with borrowing accounts, registering smart cards, or e-resource access? Contact our librarian office.
                                </p>
                            </div>

                            <div className="max-w-xl mx-auto bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-10 shadow-lg relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[3rem] pointer-events-none" />
                                
                                <div className="space-y-6 relative z-10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800">
                                        <PhoneCall size={26} />
                                    </div>

                                    <div className="space-y-1">
                                        <h4 className="text-2xl font-black text-gray-900">Md. Saiful Alom Milon</h4>
                                        <p className="text-[#0f5132] font-bold text-sm">Deputy Librarian</p>
                                        <p className="text-xs text-gray-400 font-semibold uppercase mt-0.5">BAUST Library Administration</p>
                                    </div>

                                    <div className="w-full pt-6 border-t border-gray-100 flex flex-col gap-4 text-left">
                                        <a 
                                            href="mailto:central_library@baust.edu.bd" 
                                            className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-emerald-50/50 group/item transition-colors"
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-[#0f5132] group-hover/item:bg-[#0f5132] group-hover/item:text-white transition-all">
                                                <Mail size={16} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Email Address</span>
                                                <span className="text-sm font-bold text-gray-700">central_library@baust.edu.bd</span>
                                            </div>
                                        </a>

                                        <a 
                                            href="tel:+8801769662699" 
                                            className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-emerald-50/50 group/item transition-colors"
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-[#0f5132] group-hover/item:bg-[#0f5132] group-hover/item:text-white transition-all">
                                                <Phone size={16} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Office Mobile</span>
                                                <span className="text-sm font-bold text-gray-700">+88 01769-662699</span>
                                            </div>
                                        </a>

                                        <a 
                                            href="tel:+8801992371721" 
                                            className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-emerald-50/50 group/item transition-colors"
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-[#0f5132] group-hover/item:bg-[#0f5132] group-hover/item:text-white transition-all">
                                                <Phone size={16} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Personal Mobile</span>
                                                <span className="text-sm font-bold text-gray-700">+88 01992-371721</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

            </main>

            <Footer />
        </div>
    );
}
