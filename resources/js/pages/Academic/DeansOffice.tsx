import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { 
    Phone, 
    Mail, 
    GraduationCap, 
    MapPin, 
    Building2, 
    ExternalLink, 
    Award, 
    ArrowRight, 
    Users, 
    BookOpen,
    ShieldCheck
} from 'lucide-react';
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

interface DepartmentItem {
    id: number;
    slug: string;
    short_name: string;
    name: string;
    tagline: string | null;
    hod_name: string | null;
    hod_designation: string | null;
    hod_photo: string | null;
}

interface FacultyMeta {
    code: string;
    name: string;
    title: string;
    tagline: string;
    about: string;
    location: string;
    phone: string;
    email: string;
    department_slugs: string[];
}

interface OtherFaculty {
    slug: string;
    code: string;
    title: string;
}

interface Props {
    office: {
        slug: string;
        name: string;
        subtitle: string;
    };
    faculty: FacultyMeta;
    departments: DepartmentItem[];
    otherFaculties: OtherFaculty[];
    members: StaffMember[];
}

export default function DeansOffice({ office, faculty, departments, otherFaculties, members }: Props) {
    const [selectedMember, setSelectedMember] = React.useState<ExtendedStaffMember | null>(null);

    const extend = React.useCallback(
        (s: StaffMember): ExtendedStaffMember => ({
            ...s,
            department: faculty.code,
            type: 'staff',
            status: 'active',
            category: s.tier === 1 ? 'dean' : s.tier === 2 ? 'coordinator' : 'staff',
            education: s.education || [],
            biography: `${s.name} serves as ${s.designation || 'Staff'} at the ${office.name}, Bangladesh Army University of Science and Technology (BAUST).`,
            experience: `• ${s.designation || 'Staff'}, ${office.name}, BAUST`,
            research: '',
            publications: '',
            specialization: s.education && s.education.length > 0 ? s.education.join(', ') : '',
        }),
        [faculty.code, office.name],
    );

    const dean = members.find((m) => m.tier === 1) || members[0];
    const coordinators = members.filter((m) => m.tier === 2);
    const staff = members.filter((m) => m.tier >= 3);

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
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Head title={`${office.name} - BAUST`} />
            <Navbar />

            {/* Hero Section */}
            <PageHero 
                title={faculty.name} 
                subtitle={`${office.name} • Academic Leadership & Governance`} 
                compact={true} 
            />

            {/* Breadcrumb Navigation */}
            <div className="bg-white border-b border-gray-100 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-xs font-medium text-gray-500">
                        <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-400">Academic</span>
                        <span>/</span>
                        <Link href="/administration/offices/deans-of-faculties" className="hover:text-emerald-700 transition-colors">
                            Deans of Faculties
                        </Link>
                        <span>/</span>
                        <span className="text-emerald-800 font-semibold">{faculty.code}</span>
                    </nav>
                </div>
            </div>

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                {/* Faculty Overview & Contact Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    {/* About Faculty */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-emerald-100 text-emerald-800 font-extrabold text-xs tracking-wider uppercase px-3 py-1 rounded-full">
                                    {faculty.code}
                                </span>
                                <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                    Accredited Academic Faculty
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
                                {faculty.name}
                            </h2>
                            <p className="text-emerald-800/90 font-medium text-sm sm:text-base leading-relaxed mb-4">
                                {faculty.tagline}
                            </p>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                {faculty.about}
                            </p>
                        </div>

                        {/* Quick Stats or Department Count */}
                        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                                    <BookOpen className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 block font-medium">Departments</span>
                                    <span className="text-sm font-bold text-gray-800">{departments.length} Academic Depts</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                                    <Users className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 block font-medium">Office Team</span>
                                    <span className="text-sm font-bold text-gray-800">{members.length} Officers & Staff</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Office Contact Info Card */}
                    <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-white rounded-3xl p-8 shadow-md flex flex-col justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-emerald-700/50 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full mb-5">
                                <Building2 className="w-3.5 h-3.5" />
                                Dean's Secretariat
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">Office Contact</h3>
                            <p className="text-emerald-200/80 text-xs leading-relaxed mb-6">
                                Official communication and administrative enquiries for {faculty.code}.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <span className="text-[11px] text-emerald-300/80 uppercase font-bold tracking-wider block">Office Location</span>
                                        <span className="text-xs text-emerald-50 leading-relaxed block">{faculty.location}</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <span className="text-[11px] text-emerald-300/80 uppercase font-bold tracking-wider block">Official Telephone</span>
                                        <a href={`tel:${faculty.phone}`} className="text-xs text-emerald-50 hover:text-white transition-colors block">
                                            {faculty.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <span className="text-[11px] text-emerald-300/80 uppercase font-bold tracking-wider block">Official Email</span>
                                        <a href={`mailto:${faculty.email}`} className="text-xs text-emerald-50 hover:text-white transition-colors block break-all">
                                            {faculty.email}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-emerald-700/50">
                            <span className="text-[11px] text-emerald-300/70 block">
                                Office Hours: Sunday – Thursday (9:00 AM – 5:00 PM)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Dean Executive Showcase */}
                {dean && (
                    <div className="mb-14">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-6 w-1.5 bg-emerald-600 rounded-full" />
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Dean of the Faculty</h2>
                        </div>

                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 hover:shadow-md transition-all duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                                {/* Dean Photo */}
                                <div className="md:col-span-4 flex flex-col items-center">
                                    <div className="relative group cursor-pointer" onClick={() => setSelectedMember(extend(dean))}>
                                        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 opacity-30 group-hover:opacity-60 transition duration-300 blur-xs" />
                                        <img
                                            src={dean.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(dean.name)}&background=059669&color=fff&size=256&font-size=0.33`}
                                            alt={dean.name}
                                            className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl object-cover object-top shadow-md z-10 bg-gray-50 border-2 border-white"
                                            onError={(e) => {
                                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(dean.name)}&background=059669&color=fff&size=256&font-size=0.33`;
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Dean Information */}
                                <div className="md:col-span-8 flex flex-col items-start text-left">
                                    <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                                        <Award className="w-3.5 h-3.5" />
                                        Executive Academic Dean
                                    </div>

                                    <h3 
                                        onClick={() => setSelectedMember(extend(dean))}
                                        className="text-2xl sm:text-3xl font-extrabold text-gray-900 hover:text-emerald-700 transition-colors cursor-pointer mb-2"
                                    >
                                        {dean.name}
                                    </h3>

                                    <p className="text-emerald-800 font-semibold text-base mb-4">
                                        {dean.designation}
                                    </p>

                                    {/* Education & Qualifications */}
                                    {dean.education && dean.education.length > 0 && (
                                        <div className="mb-5 space-y-1.5">
                                            {dean.education.map((edu, idx) => (
                                                <div key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                                                    <GraduationCap className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                                    <span>{edu}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Contacts */}
                                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 my-2 border-t border-b border-gray-100 text-xs text-gray-600">
                                        {dean.phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                                <span className="font-medium">{dean.phone}</span>
                                            </div>
                                        )}
                                        {dean.email && (
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                                <a href={`mailto:${dean.email}`} className="font-medium hover:text-emerald-700 transition-colors break-all">
                                                    {dean.email}
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedMember(extend(dean))}
                                            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all duration-200"
                                        >
                                            View Full Profile & Biography
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                        <a
                                            href={`mailto:${dean.email || faculty.email}`}
                                            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                                        >
                                            Send Email
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Coordinators & Officers Section */}
                {coordinators.length > 0 && (
                    <div className="mb-14">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-6 w-1.5 bg-emerald-600 rounded-full" />
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Faculty Coordinators & Officers</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coordinators.map((c) => (
                                <div
                                    key={c.id}
                                    onClick={() => setSelectedMember(extend(c))}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <img
                                                src={c.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=059669&color=fff&size=128&font-size=0.33`}
                                                alt={c.name}
                                                className="w-16 h-16 rounded-xl object-cover object-top border border-gray-100 shadow-xs"
                                                onError={(e) => {
                                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=059669&color=fff&size=128&font-size=0.33`;
                                                }}
                                            />
                                            <div>
                                                <h4 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                                    {c.name}
                                                </h4>
                                                <span className="inline-block text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full mt-1">
                                                    {c.designation || 'Coordinator'}
                                                </span>
                                            </div>
                                        </div>

                                        {c.education && c.education.length > 0 && (
                                            <div className="mb-3 space-y-1 text-xs text-gray-500">
                                                {c.education.map((edu, idx) => (
                                                    <div key={idx} className="flex items-start gap-1.5">
                                                        <GraduationCap className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                                                        <span>{edu}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-1">
                                        {c.phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-3.5 h-3.5 text-gray-400" />
                                                <span>{c.phone}</span>
                                            </div>
                                        )}
                                        {c.email && (
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="truncate">{c.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Office Staff Section */}
                {staff.length > 0 && (
                    <div className="mb-14">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-6 w-1.5 bg-emerald-600 rounded-full" />
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Office Secretariat & Staff</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {staff.map((s) => (
                                <div
                                    key={s.id}
                                    onClick={() => setSelectedMember(extend(s))}
                                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center gap-4 group"
                                >
                                    <img
                                        src={s.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=059669&color=fff&size=100&font-size=0.33`}
                                        alt={s.name}
                                        className="w-14 h-14 rounded-xl object-cover object-top border border-gray-100 shadow-xs flex-shrink-0"
                                        onError={(e) => {
                                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=059669&color=fff&size=100&font-size=0.33`;
                                        }}
                                    />
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                                            {s.name}
                                        </h4>
                                        <span className="text-xs text-gray-500 block">
                                            {s.designation || 'Staff'}
                                        </span>
                                        {s.phone && (
                                            <span className="text-[11px] text-emerald-800 font-medium block mt-0.5">
                                                {s.phone}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Affiliated Academic Departments Section */}
                {departments.length > 0 && (
                    <div className="mb-14">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-1.5 bg-emerald-600 rounded-full" />
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                                    Academic Departments under {faculty.code}
                                </h2>
                            </div>
                            <span className="text-xs text-gray-400 font-medium hidden sm:inline-block">
                                Click any department to explore its portal
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {departments.map((dept) => (
                                <Link
                                    key={dept.id}
                                    href={`/${dept.slug}`}
                                    className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100/90 hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="bg-emerald-100 text-emerald-800 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                                                {dept.short_name}
                                            </span>
                                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug mb-2">
                                            {dept.name}
                                        </h3>

                                        {dept.tagline && (
                                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                                                {dept.tagline}
                                            </p>
                                        )}
                                    </div>

                                    {/* HOD Info */}
                                    {dept.hod_name && (
                                        <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                                            {dept.hod_photo && (
                                                <img 
                                                    src={dept.hod_photo} 
                                                    alt={dept.hod_name} 
                                                    className="w-9 h-9 rounded-full object-cover border border-gray-200" 
                                                />
                                            )}
                                            <div className="min-w-0">
                                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Head of Department</span>
                                                <span className="text-xs font-semibold text-gray-800 truncate block">{dept.hod_name}</span>
                                            </div>
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* University Faculties Directory Switcher */}
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-3xl p-6 sm:p-8">
                    <div className="text-center max-w-2xl mx-auto mb-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                            Academic Leadership Directory
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mt-1">
                            Explore Other Academic Faculty Offices
                        </h3>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/administration/offices/deans-of-faculties"
                            className="bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-200 text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 shadow-xs"
                        >
                            All Deans of Faculties
                        </Link>
                        {otherFaculties.map((f) => (
                            <Link
                                key={f.slug}
                                href={`/${f.slug}`}
                                className="bg-white hover:bg-emerald-700 hover:text-white text-gray-700 border border-gray-200 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-xs"
                            >
                                {f.title} ({f.code})
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            {/* Profile Modal for Dean and Staff */}
            {selectedMember && (
                <ProfileModal
                    member={selectedMember}
                    onClose={handleCloseModal}
                />
            )}

            <Footer />
        </div>
    );
}
