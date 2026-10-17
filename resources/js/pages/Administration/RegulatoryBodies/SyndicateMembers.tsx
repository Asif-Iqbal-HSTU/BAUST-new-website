import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { User, Award, Mail, Phone, Briefcase, GraduationCap, MapPin } from 'lucide-react';

interface Member {
    name: string;
    designation: string;
    position: string;
    image: string;
    phone?: string;
    email?: string;
}

const syndicateMembers: Member[] = [
    {
        name: "Brig Gen Mohammad Mobarak Hossain Majumder, psc",
        designation: "Vice Chancellor",
        position: "Chairman",
        image: "/images/Syndicate Members/Syn1.jpeg",
        phone: "+8801769675550",
        email: "vc@baust.edu.bd"
    },
    {
        name: "Lt Col Dr. Md Shameem Reza (Retd)",
        designation: "Treasurer, BAUST",
        position: "Member",
        image: "/images/Syndicate Members/Syn2.jpeg",
        phone: "01769675555",
        email: "treasurer@baust.edu.bd"
    },
    {
        name: "Dr. Maglub Al Nur",
        designation: "Professor, ME, BUET",
        position: "Member",
        image: "/images/Syndicate Members/Syn3.jpg",
        phone: "01711020042",
        email: "maglub@me.buet.edu.bd"
    },
    {
        name: "Professor Md. Jahurul Islam",
        designation: "Dean, Faculty of SH, BAUST",
        position: "Member",
        image: "/images/Syndicate Members/Syn4.jpg",
        phone: "01717142817",
        email: "dean_sh@baust.edu.bd"
    },
    {
        name: "Professor Dr. Imtiaz Ahmed Choudhury",
        designation: "Head, Dept. of ME, BAUST",
        position: "Member",
        image: "/images/Syndicate Members/Syn5.jpg",
        phone: "01726644025, 01721241869",
        email: "headme@baust.edu.bd"
    },
    {
        name: "Md. Mahbubul Hoque Patwary",
        designation: "Additional Secretary (University), Secondary and Higher Education Division, Ministry of Education, Dhaka",
        position: "Member",
        image: "/images/Syndicate Members/Syn6.jpg",
        phone: "01712901556",
        email: "addsec.university@shed.gov.bd"
    },
    {
        name: "Brig Gen Md Anisur Rahman, ndc, afwc, psc (Retd)",
        designation: "AWT (Education Div), Dhaka Cantt",
        position: "Member",
        image: "https://placehold.co/400x400/0f5132/ffffff?text=Portrait",
        phone: "01726156256",
        email: "edndivawt@gmail.com"
    },
    {
        name: "Brigadier General Md Rashidul Islam, SUP, ndu, afwc, psc, M.Phil",
        designation: "Managing Director, AWT, Dhaka Cantt",
        position: "Member",
        image: "https://placehold.co/400x400/0f5132/ffffff?text=Portrait",
        phone: "01769012554",
        email: "wrrehabsec@gmail.com"
    },
    {
        name: "Col Muhammad Rubayat Zamil, BSP",
        designation: "Colonel Admin, Rangpur Area",
        position: "Member",
        image: "/images/Syndicate Members/Syn7.jpg",
        phone: "01769-662070",
        email: "rubayat37bma@gmail.com"
    },
    {
        name: "Dr. M. Abdul Hannan",
        designation: "Professor, Dept of Law University of Rajshahi",
        position: "Member",
        image: "/images/Syndicate Members/Syn8.jpg",
        phone: "01712138057",
        email: "mahannan.law@ru.ac.bd, ahannanlaw@yahoo.com"
    },
    {
        name: "Col Chowdhury Saif Uddin Kawsar, PBGM, Sigs (LPR)",
        designation: "Registrar, BAUST",
        position: "Member Secretary",
        image: "/images/Syndicate Members/Syn9.jpeg",
        phone: "01769675551(Office)",
        email: "registrar@baust.edu.bd (Office)"
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

        {/* Content Side - Reduced padding for compact design */}
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

            {/* Contact Details - More compact icons and layout */}
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

export default function SyndicateMembers() {
    const chairman = syndicateMembers.find(m => m.position === 'Chairman');
    const members = syndicateMembers.filter(m => m.position !== 'Chairman');

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Syndicate Members - BAUST" />
            <Navbar />

            <PageHero 
                title="Syndicate Members" 
                subtitle="Regulatory Body of the University"
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
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-800">Syndicate Members</h2>
                        <div className="h-px bg-emerald-200 w-16" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
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
