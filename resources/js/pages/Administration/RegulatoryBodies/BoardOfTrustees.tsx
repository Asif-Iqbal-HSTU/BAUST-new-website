import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';

interface Member {
    name: string;
    designation: string;
    position: string;
    image: string;
}

const members: Member[] = [
    {
        name: "General Waker-Uz-Zaman, SBP, OSP, SGP, psc",
        designation: "Chief of Army Staff (CAS), Bangladesh Army",
        position: "Chairman",
        image: "/images/Board of trustees/BOT01.jpg"
    },
    {
        name: "Lt Gen Md Mainur Rahman, OSP, SUP, awc, psc",
        designation: "Chief of General Staff (CGS)",
        position: "Member",
        image: "/images/Board of trustees/BOT02.png"
    },
    {
        name: "Lt Gen Mohammad Shaheenul Haque, OSP, BSP, ndc, hdmc, psc",
        designation: "Quarter Master General (QMG)",
        position: "Member",
        image: "/images/Board of trustees/BOT03.jpg"
    },
    {
        name: "Maj Gen Md Mahbub-ul-Alam, BSP, ndc, afwc, psc, M.Phil, PhD",
        designation: "Vice Chancellor, BUP",
        position: "Member",
        image: "/images/Board of trustees/BOT04.jpg"
    },
    {
        name: "Maj Gen Md Abu Bakar Siddique Khan, ndc, afwc, psc, G+",
        designation: "Master General of Ordnance (MGO)",
        position: "Member",
        image: "/images/Board of trustees/BOT05.png"
    },
    {
        name: "Maj Gen Md Hakimuzzaman, SGP, ndc, afwc, psc",
        designation: "Commandant, MIST",
        position: "Member",
        image: "/images/Board of trustees/BOT06.png"
    },
    {
        name: "Maj Gen Md Hasan Uz Zaman, ndu, afwc, psc, M.Phil",
        designation: "Engineer in Chief (E-in-C)",
        position: "Member",
        image: "/images/Board of trustees/BOT07.png"
    },
    {
        name: "Maj Gen Md Sajedur Rahman, ndu, psc",
        designation: "Military Secretary (MS)",
        position: "Member",
        image: "/images/Board of trustees/BOT08.jpeg"
    },
    {
        name: "Maj Gen Mohd Hossain Al Morshed, ndc, afwc, psc",
        designation: "Adjutant General (AG)",
        position: "Member",
        image: "/images/Board of trustees/BOT09.jpg"
    },
    {
        name: "Maj Gen A B M Faisal Baten, ndc, psc",
        designation: "Area Commander, Rangpur Area",
        position: "Member",
        image: "/images/Board of trustees/BOT10.jpg"
    },
    {
        name: "Brig Gen Mohammad Mobarak Hossain Majumder, psc",
        designation: "Vice Chancellor, BAUST, Saidpur",
        position: "Member",
        image: "/images/Board of trustees/BOT11.jpeg"
    },
    {
        name: "Brig Gen Md Rashidul Islam, SUP, ndu, afwc, psc, M.Phil",
        designation: "Director, Army Welfare Trust (AWT)",
        position: "Member",
        image: "/images/Board of trustees/BOT12.png"
    },
    {
        name: "Brig Gen Md Lutfor Rahman, psc, PhD",
        designation: "Director, Education Directorate, Army Headquarters",
        position: "Member",
        image: "/images/Board of trustees/BOT13.jpg"
    },
    {
        name: "Brig Gen Md Anisur Rahman, ndc, afwc, psc (Retd)",
        designation: "Director Education Division",
        position: "Member",
        image: "/images/Board of trustees/BOT14.jpg"
    }
];

const MemberCard = ({ member, isChairman = false }: { member: Member, isChairman?: boolean }) => (
    <div className={`relative group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-row h-full ${isChairman ? 'md:max-w-4xl mx-auto ring-2 ring-emerald-500/20' : ''}`}>
        {/* Vertical Accent Stripe */}
        <div className={`w-1 flex-shrink-0 bg-gradient-to-b ${isChairman ? 'from-emerald-600 via-green-400 to-emerald-700' : 'from-emerald-500 to-green-400'}`} />

        {/* Image Container - Reduced size for a more compact modern look */}
        <div className={`${isChairman ? 'w-32 sm:w-44' : 'w-24 sm:w-32 md:w-36'} aspect-square flex-shrink-0 relative overflow-hidden bg-emerald-50 border-r border-gray-50`}>
            <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/400x400/0f5132/ffffff?text=Portrait";
                }}
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-emerald-900/5 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Content Side - Reduced padding for compact design */}
        <div className={`flex-grow ${isChairman ? 'p-6 sm:p-8' : 'p-4 sm:p-5'} flex flex-col justify-center`}>
            <div className="mb-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    isChairman 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
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
            
            <p className="text-gray-600 text-xs sm:text-sm leading-snug font-medium line-clamp-2">
                {member.designation}
            </p>
        </div>
    </div>
);

export default function BoardOfTrustees() {
    const chairman = members.find(m => m.position === 'Chairman');
    const ordinaryMembers = members.filter(m => m.position !== 'Chairman');

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Board of Trustees - BAUST" />
            <Navbar />

            <PageHero
                title="Board of Trustees"
                subtitle="Regulatory Bodies of BAUST"
            />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">


                {/* Chairman Section */}
                {chairman && (
                    <div className="mb-20">
                        <div className="flex items-center justify-center mb-10">
                            <div className="h-px bg-emerald-200 w-16" />
                            <h2 className="mx-6 text-sm font-bold uppercase tracking-[0.3em] text-emerald-800">The Chairman</h2>
                            <div className="h-px bg-emerald-200 w-16" />
                        </div>
                        <MemberCard member={chairman} isChairman={true} />
                    </div>
                )}

                {/* Grid for Members */}
                <div className="mb-20">
                    <div className="flex items-center justify-center mb-10">
                        <div className="h-px bg-emerald-200 w-16" />
                        <h2 className="mx-6 text-sm font-bold uppercase tracking-[0.3em] text-emerald-800">Board Members</h2>
                        <div className="h-px bg-emerald-200 w-16" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {ordinaryMembers.map((member, index) => (
                            <MemberCard key={index} member={member} />
                        ))}
                    </div>
                </div>

                {/* Call to Action Section */}
                <div className="mt-16 bg-[#0f5132] rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[30rem] h-[30rem] bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[20rem] h-[20rem] bg-white/5 rounded-full blur-2xl" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold mb-6">Administrative Governance</h3>
                            <p className="text-emerald-100/90 leading-relaxed text-lg mb-8">
                                BAUST is governed by several regulatory bodies that work together to maintain academic standards, financial health, and institutional integrity.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 bg-white text-emerald-900 font-bold rounded-2xl hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl active:scale-95">
                                    Administration
                                </button>
                                <button className="px-8 py-4 border-2 border-emerald-400/50 text-emerald-100 font-bold rounded-2xl hover:bg-white/10 transition-all active:scale-95">
                                    Academic Council
                                </button>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                                    <div className="text-3xl font-bold mb-1">2015</div>
                                    <div className="text-emerald-300 text-xs font-bold uppercase tracking-widest">Established</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                                    <div className="text-3xl font-bold mb-1">14</div>
                                    <div className="text-emerald-300 text-xs font-bold uppercase tracking-widest">Board Members</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                                    <div className="text-3xl font-bold mb-1">Army</div>
                                    <div className="text-emerald-300 text-xs font-bold uppercase tracking-widest">Patronized By</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                                    <div className="text-3xl font-bold mb-1">Saidpur</div>
                                    <div className="text-emerald-300 text-xs font-bold uppercase tracking-widest">Campus</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
