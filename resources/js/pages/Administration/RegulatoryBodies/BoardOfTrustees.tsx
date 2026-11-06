import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';

export interface Member {
    position: string;
    name: string;
    designation: string;
    photo: string;
}

export interface GovernanceStat {
    value: string;
    label: string;
}

export interface BoardOfTrusteesContent {
    hero: { title: string; subtitle: string };
    chairman_heading: string;
    chairman: Member | null;
    members_heading: string;
    members: Member[];
    governance: {
        heading: string;
        description: string;
        primary_button_label: string;
        secondary_button_label: string;
        stats: GovernanceStat[];
    };
}

const MemberCard = ({ member, isChairman = false }: { member: Member, isChairman?: boolean }) => (
    <div className={`relative group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-row h-full ${isChairman ? 'md:max-w-4xl mx-auto ring-2 ring-emerald-500/20' : ''}`}>
        {/* Vertical Accent Stripe */}
        <div className={`w-1 flex-shrink-0 bg-gradient-to-b ${isChairman ? 'from-emerald-600 via-green-400 to-emerald-700' : 'from-emerald-500 to-green-400'}`} />

        {/* Image Container - Reduced size for a more compact modern look */}
        <div className={`${isChairman ? 'w-32 sm:w-44' : 'w-24 sm:w-32 md:w-36'} aspect-square flex-shrink-0 relative overflow-hidden bg-emerald-50 border-r border-gray-50`}>
            <img
                src={member.photo}
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

export default function BoardOfTrustees({ content }: { content: BoardOfTrusteesContent }) {
    const chairman = content.chairman;
    const ordinaryMembers = content.members ?? [];
    const governance = content.governance;

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${content.hero.title} - BAUST`} />
            <Navbar />

            <PageHero title={content.hero.title} subtitle={content.hero.subtitle} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">


                {/* Chairman Section */}
                {chairman && (
                    <div className="mb-20">
                        <div className="flex items-center justify-center mb-10">
                            <div className="h-px bg-emerald-200 w-16" />
                            <h2 className="mx-6 text-sm font-bold uppercase tracking-[0.3em] text-emerald-800">{content.chairman_heading}</h2>
                            <div className="h-px bg-emerald-200 w-16" />
                        </div>
                        <MemberCard member={chairman} isChairman={true} />
                    </div>
                )}

                {/* Grid for Members */}
                <div className="mb-20">
                    <div className="flex items-center justify-center mb-10">
                        <div className="h-px bg-emerald-200 w-16" />
                        <h2 className="mx-6 text-sm font-bold uppercase tracking-[0.3em] text-emerald-800">{content.members_heading}</h2>
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
                            <h3 className="text-3xl font-bold mb-6">{governance.heading}</h3>
                            <p className="text-emerald-100/90 leading-relaxed text-lg mb-8">
                                {governance.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 bg-white text-emerald-900 font-bold rounded-2xl hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl active:scale-95">
                                    {governance.primary_button_label}
                                </button>
                                <button className="px-8 py-4 border-2 border-emerald-400/50 text-emerald-100 font-bold rounded-2xl hover:bg-white/10 transition-all active:scale-95">
                                    {governance.secondary_button_label}
                                </button>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="grid grid-cols-2 gap-4">
                                {(governance.stats ?? []).map((stat, index) => (
                                    <div key={index} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                                        <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                        <div className="text-emerald-300 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
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
