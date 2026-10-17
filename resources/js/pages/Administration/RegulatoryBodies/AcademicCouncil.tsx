import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { User, Award, Mail, Phone, Briefcase, GraduationCap } from 'lucide-react';

interface Member {
    name: string;
    designation: string;
    position: string;
    image: string;
    phone?: string;
    email?: string;
}

const councilMembers: Member[] = [
    {
        name: "Brig Gen Mohammad Mobarak Hossain Majumder, psc",
        designation: "Vice Chancellor",
        position: "Chairman",
        image: "/images/Academic Council/Mobarak.jpeg",
        phone: "+8801769675550 (Off)",
        email: "vc@baust.edu.bd"
    },
    {
        name: "Brig Gen Abdul Wares Khan, sup, psc",
        designation: "Commandant, EMEC&S, Saidpur Cantonment",
        position: "Member",
        image: "https://placehold.co/400x400/0f5132/ffffff?text=Portrait",
    },
    {
        name: "Prof. Dr. Mohammad Ali",
        designation: "Professor, Dept. of ME, BUET",
        position: "Member",
        image: "/images/Academic Council/mohammad ali.jpg",
    },
    {
        name: "Prof. Dr. Muhammad Masroor Ali",
        designation: "Professor, Dept. of CSE, BUET",
        position: "Member",
        image: "/images/Academic Council/masroor.jpg",
    },
    {
        name: "Prof. Dr. Md. Aynal Haque",
        designation: "Professor, Dept. EEE, BUET",
        position: "Member",
        image: "/images/Academic Council/aynal.jpg",
    },
    {
        name: "Prof. Dr. Mohammad Thoufiqul Islam",
        designation: "Professor, Dept. of Management, DU",
        position: "Member",
        image: "/images/Academic Council/thoufiqul.jpg",
    },
    {
        name: "Prof. Md. Jahurul Islam",
        designation: "Dean, Faculty of SH, BAUST",
        position: "Member",
        image: "/images/Academic Council/jahurul.jpg",
        phone: "01717142817",
        email: "dean_sh@baust.edu.bd"
    },
    {
        name: "Prof. Dr. Imtiaz Ahmed Choudhury",
        designation: "Professor, Head of the ME Dept., and Dean, Faculty of ME",
        position: "Member",
        image: "/images/Academic Council/imtiaz.jpg",
        phone: "+8801769675557",
        email: "headipe@baust.edu.bd"
    },
    {
        name: "Prof. Dr. Md. Shah Alam",
        designation: "Dean, Faculty of BS, BAUST",
        position: "Member",
        image: "/images/Academic Council/shah alam.jpg",
    },
    {
        name: "Prof. Dr. S.M. Jahangir Alam",
        designation: "Professor, Dept. of CSE, BAUST",
        position: "Member",
        image: "/images/Academic Council/jahangir.jpg",
    },
    {
        name: "Prof. Dr. Mahmudul Hasan",
        designation: "Head, Dept. of CE, BAUST",
        position: "Member",
        image: "/images/Academic Council/mahmudul.jpg",
    },
    {
        name: "Associate Prof. Dr. Mst. Rubina Aktar",
        designation: "Head, Dept. of EEE, BAUST",
        position: "Member",
        image: "/images/Academic Council/rubina.jpg",
    },
    {
        name: "Associate Professor Md. Mizanur Rahman",
        designation: "Head, Dept. of Arts & Sciences, BAUST",
        position: "Member",
        image: "/images/Academic Council/mizanur.jpg",
    },
    {
        name: "Associate Prof. Engr. Md. Mamun Hossain",
        designation: "Head, Dept. of Information and Communication Engineering (ICT), BAUST",
        position: "Member",
        image: "/images/Academic Council/mamun.jpeg",
        phone: "01769675577",
        email: "mhossain@baust.edu.bd"
    },
    {
        name: "Associate Professor Dr. Md Nakib Hayat Chowdhury",
        designation: "Associate Professor and Head (CSE), BAUST",
        position: "Member",
        image: "/images/Academic Council/nakib.jpg",
        phone: "01703899959",
        email: "nakib@baust.edu.bd"
    },
    {
        name: "Associate Prof. Dr. Md. Anowar Hossain",
        designation: "Head, BBA, BAUST",
        position: "Member",
        image: "/images/Academic Council/anowar.jpg",
    },
    {
        name: "Associate Prof. Md. Ashikullah",
        designation: "Head, English, BAUST",
        position: "Member",
        image: "/images/Academic Council/ashikullah.jpg",
    },
    {
        name: "Assistant Prof. Rakibul Islam",
        designation: "Head, AIS, BAUST",
        position: "Member",
        image: "/images/Academic Council/rakibul.jpg",
        phone: "01723913191",
        email: "headais@baust.edu.bd"
    },
    {
        name: "Md. Ariful Alam",
        designation: "Assistant Professor and Head, Department of IPE, BAUST",
        position: "Member",
        image: "/images/Academic Council/ariful.jpg",
    },
    {
        name: "Col Chowdhury Saif Uddin Kawsar, PBGM, Sigs (LPR)",
        designation: "Registrar, BAUST",
        position: "Member Secretary",
        image: "/images/Academic Council/kawsar.jpeg",
    }
];

// Treat missing images and old "Portrait" text placeholders as no-image.
const isPlaceholderImage = (src?: string) => !src || /placehold\.co|text=portrait/i.test(src);

// Member photo with a graceful person-icon fallback (instead of a "Portrait" placeholder).
const MemberImage = ({ member, isChairman = false }: { member: Member; isChairman?: boolean }) => {
    const [failed, setFailed] = React.useState(false);
    const showFallback = failed || isPlaceholderImage(member.image);

    return (
        <div className={`${isChairman ? 'w-32 sm:w-44' : 'w-24 sm:w-32 md:w-36'} aspect-square flex-shrink-0 relative overflow-hidden bg-emerald-50 border-r border-gray-50`}>
            {showFallback ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100">
                    <User className="w-1/2 h-1/2 text-emerald-600/70" strokeWidth={1.5} />
                </div>
            ) : (
                <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={() => setFailed(true)}
                />
            )}
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-emerald-900/5 group-hover:bg-transparent transition-colors duration-500" />
        </div>
    );
};

const MemberCard = ({ member, isChairman = false }: { member: Member, isChairman?: boolean }) => (
    <div className={`relative group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-row h-full ${isChairman ? 'md:max-w-4xl mx-auto ring-2 ring-emerald-500/20' : ''}`}>
        {/* Vertical Accent Stripe */}
        <div className={`w-1 flex-shrink-0 bg-gradient-to-b ${isChairman ? 'from-emerald-600 via-green-400 to-emerald-700' : 'from-emerald-500 to-green-400'}`} />

        {/* Member photo with person-icon fallback */}
        <MemberImage member={member} isChairman={isChairman} />

        {/* Content Side */}
        <div className={`flex-grow ${isChairman ? 'p-6 sm:p-8' : 'p-4 sm:p-5'} flex flex-col justify-center`}>
            <div className="mb-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    isChairman 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                    : member.position === 'Member Secretary'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-emerald-50 text-emerald-700'
                }`}>
                    {member.position}
                </span>
            </div>

            <h3 className={`font-black text-gray-900 leading-tight mb-1 group-hover:text-emerald-700 transition-colors ${
                isChairman ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
            }`}>
                {member.name}
            </h3>
            
            <p className="text-gray-600 text-xs sm:text-sm leading-snug font-medium mb-3 line-clamp-2">
                {member.designation}
            </p>

            {/* Contact Details */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-auto">
                {member.phone && (
                    <div className="flex items-center gap-2 text-gray-500 group/item hover:text-emerald-700 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-emerald-600/70" />
                        <span className="text-[11px] sm:text-xs font-semibold">{member.phone}</span>
                    </div>
                )}
                {member.email && (
                    <div className="flex items-center gap-2 text-gray-500 group/item hover:text-emerald-700 transition-colors">
                        <Mail className="w-3.5 h-3.5 text-emerald-600/70" />
                        <span className="text-[11px] sm:text-xs font-semibold truncate max-w-[150px] sm:max-w-[200px]">{member.email}</span>
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default function AcademicCouncil() {
    const chairman = councilMembers.find(m => m.position === 'Chairman');
    const members = councilMembers.filter(m => m.position !== 'Chairman');

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Academic Council - BAUST" />
            <Navbar />

            <PageHero 
                title="Academic Council" 
                subtitle="The Apex Academic Regulatory Body"
            />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Chairman Section */}
                {chairman && (
                    <div className="mb-24">
                        <div className="flex items-center justify-center gap-4 mb-12">
                            <div className="h-px bg-emerald-200 w-16" />
                            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-800">The Chairman</h2>
                            <div className="h-px bg-emerald-200 w-16" />
                        </div>
                        <MemberCard member={chairman} isChairman={true} />
                    </div>
                )}

                {/* Ordinary Members Section */}
                <div>
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <div className="h-px bg-emerald-200 w-16" />
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-800">Council Members</h2>
                        <div className="h-px bg-emerald-200 w-16" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {members.map((member, index) => (
                            <MemberCard key={index} member={member} />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
