import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { Phone, Mail, GraduationCap } from 'lucide-react';
import ProfileModal, { getProfileSlug } from '@/custom_components/ProfileModal';

interface StaffMember {
    id: number;
    name: string;
    designation: string | null;
    photo: string | null;
    phone: string | null;
    email: string | null;
    education?: string[];
    tier: number;
}

interface ExtendedStaffMember extends StaffMember {
    department: string;
    type: 'permanent' | 'adjunct' | 'staff';
    status: 'active' | 'study_leave';
    category: string | null;
    biography?: string | null;
    experience?: string | null;
    research?: string | null;
    publications?: string | null;
    specialization?: string | null;
}

interface Office { slug: string; name: string; subtitle: string }

function PersonCard({ member, onClick, featured = false }: { member: StaffMember; onClick?: () => void; featured?: boolean }) {
    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer ${featured ? 'ring-2 ring-emerald-500/20' : ''}`}
        >
            <div className={`h-1 bg-gradient-to-r from-emerald-400 to-green-500 ${featured ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`} />
            <div className="p-5 flex flex-col items-center text-center flex-grow">
                <div className="relative mb-4">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-emerald-300 to-green-500 opacity-0 group-hover:opacity-25 transition-opacity" />
                    <img
                        src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff&size=160&font-size=0.33`}
                        alt={member.name}
                        className={`relative rounded-xl object-cover object-top shadow-sm z-10 bg-gray-50 ${featured ? 'w-40 h-40' : 'w-36 h-36'}`}
                        onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff&size=160&font-size=0.33`;
                        }}
                    />
                </div>

                <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-1">{member.name}</h3>
                <div className="mb-3">
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full">
                        {member.designation}
                    </span>
                </div>

                <div className="w-full space-y-1.5 text-left border-t border-gray-100 pt-3 mt-1">
                    {member.phone && (
                        <div className="flex items-start gap-2">
                            <Phone className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-[11px] text-gray-500 break-words whitespace-pre-line">{member.phone}</p>
                        </div>
                    )}
                    {member.email && (
                        <div className="flex items-start gap-2">
                            <Mail className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-[11px] text-gray-500 break-words whitespace-pre-line">{member.email}</p>
                        </div>
                    )}
                </div>

                {member.education && member.education.length > 0 && (
                    <div className="w-full border-t border-gray-100 pt-3 mt-auto">
                        <div className="flex items-start gap-2">
                            <GraduationCap className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div className="flex flex-col">
                                {member.education.map((edu, idx) => (
                                    <p key={idx} className="text-[11px] text-gray-400 leading-relaxed italic text-left">{edu}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function TierLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-emerald-200 w-12" />
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-800">{children}</h2>
            <div className="h-px bg-emerald-200 w-12" />
        </div>
    );
}

export default function OfficeShow({ office, members }: { office: Office; members: StaffMember[] }) {
    const [selectedMember, setSelectedMember] = React.useState<ExtendedStaffMember | null>(null);

    const extend = React.useCallback(
        (s: StaffMember): ExtendedStaffMember => ({
            ...s,
            department: office.slug,
            type: 'staff',
            status: 'active',
            category: 'staff',
            education: s.education || [],
            biography: `${s.name} serves as ${s.designation} at the ${office.name}, BAUST.`,
            experience: `• ${s.designation}, ${office.name}, BAUST`,
            research: '',
            publications: '',
            specialization: '',
        }),
        [office],
    );

    const tier = (t: number) => members.filter((m) => m.tier === t);
    const head = tier(1)[0];
    const secondTier = tier(2);
    const thirdTier = tier(3);
    const staff = members.filter((m) => m.tier >= 4);

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const profileSlug = params.get('profile');
        if (profileSlug) {
            const match = members.find((m) => getProfileSlug(m.name) === profileSlug);
            if (match) setSelectedMember(extend(match));
        }
    }, [members, extend]);

    const handleCloseModal = () => {
        setSelectedMember(null);
        const url = new URL(window.location.href);
        url.searchParams.delete('profile');
        window.history.replaceState({}, '', url.pathname + url.search);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${office.name} - BAUST`} />
            <Navbar />
            <PageHero title={office.name} subtitle={office.subtitle} compact={true} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
                {members.length === 0 && (
                    <div className="text-center text-gray-500 py-16"><p className="text-xl">Content is being updated. Please check back later.</p></div>
                )}

                {head && (
                    <section>
                        <TierLabel>Head of Office</TierLabel>
                        <div className="max-w-xs mx-auto">
                            <PersonCard member={head} featured onClick={() => setSelectedMember(extend(head))} />
                        </div>
                    </section>
                )}

                {secondTier.length > 0 && (
                    <section>
                        <div className="max-w-xs mx-auto grid gap-6">
                            {secondTier.map((m) => (
                                <PersonCard key={m.id} member={m} featured onClick={() => setSelectedMember(extend(m))} />
                            ))}
                        </div>
                    </section>
                )}

                {thirdTier.length > 0 && (
                    <section>
                        <TierLabel>Directorate &amp; Deputies</TierLabel>
                        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {thirdTier.map((m) => (
                                <PersonCard key={m.id} member={m} onClick={() => setSelectedMember(extend(m))} />
                            ))}
                        </div>
                    </section>
                )}

                {staff.length > 0 && (
                    <section>
                        {(head || thirdTier.length > 0) && <TierLabel>Officers &amp; Staff</TierLabel>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {staff.map((m) => (
                                <PersonCard key={m.id} member={m} onClick={() => setSelectedMember(extend(m))} />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />

            <ProfileModal member={selectedMember} onClose={handleCloseModal} />
        </div>
    );
}
