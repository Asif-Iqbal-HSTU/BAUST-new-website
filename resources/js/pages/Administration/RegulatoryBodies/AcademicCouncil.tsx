import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { User, Award, Mail, Phone, Briefcase, GraduationCap } from 'lucide-react';

export interface Member {
    position: string;
    name: string;
    designation: string;
    photo: string;
    phone?: string;
    email?: string;
}

export interface AcademicCouncilContent {
    hero: { title: string; subtitle: string };
    chairman_heading: string;
    chairman: Member | null;
    members_heading: string;
    members: Member[];
}

// Treat missing images and old "Portrait" text placeholders as no-image.
const isPlaceholderImage = (src?: string) => !src || /placehold\.co|text=portrait/i.test(src);

// Member photo with a graceful person-icon fallback (instead of a "Portrait" placeholder).
const MemberImage = ({ member, isChairman = false }: { member: Member; isChairman?: boolean }) => {
    const [failed, setFailed] = React.useState(false);
    const showFallback = failed || isPlaceholderImage(member.photo);

    return (
        <div className={`${isChairman ? 'w-32 sm:w-44' : 'w-24 sm:w-32 md:w-36'} aspect-square flex-shrink-0 relative overflow-hidden bg-emerald-50 border-r border-gray-50`}>
            {showFallback ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100">
                    <User className="w-1/2 h-1/2 text-emerald-600/70" strokeWidth={1.5} />
                </div>
            ) : (
                <img
                    src={member.photo}
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

            <h3 className={`font-bold text-gray-900 leading-tight mb-1 group-hover:text-emerald-700 transition-colors ${
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

export default function AcademicCouncil({ content }: { content: AcademicCouncilContent }) {
    const chairman = content.chairman;
    const members = content.members ?? [];

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${content.hero.title} - BAUST`} />
            <Navbar />

            <PageHero title={content.hero.title} subtitle={content.hero.subtitle} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Chairman Section */}
                {chairman && (
                    <div className="mb-24">
                        <div className="flex items-center justify-center gap-4 mb-12">
                            <div className="h-px bg-emerald-200 w-16" />
                            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-800">{content.chairman_heading}</h2>
                            <div className="h-px bg-emerald-200 w-16" />
                        </div>
                        <MemberCard member={chairman} isChairman={true} />
                    </div>
                )}

                {/* Ordinary Members Section */}
                <div>
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <div className="h-px bg-emerald-200 w-16" />
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-800">{content.members_heading}</h2>
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
