import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import PsychologicalCounselingSection from '@/custom_components/PsychologicalCounselingSection';
import {
    Wifi, MonitorPlay, FlaskConical, BedDouble, UtensilsCrossed, BookOpen,
    ArrowRight, Users, Phone, ShieldCheck, ArrowUpRight,
    HeartPulse, Bus, Dumbbell, Trophy, Baby, Mail, UserCheck, Stethoscope,
    HeartHandshake,
} from 'lucide-react';

const HALLS = [
    {
        name: 'Abbas Uddin Ahmed Hall', abbr: 'AUAH', gender: 'Male', seats: 520,
        image: '/images/halls/abbas_uddin_hall.jpg',
        note: 'Named after the famous Bhawaiya folk-song composer and singer of Rangpur, Abbas Uddin Ahmed.',
    },
    {
        name: 'Bir Protik Taramon Bibi Hall', abbr: 'BPTBH', gender: 'Female', seats: 520,
        image: '/images/halls/taramon_bibi_hall.jpg',
        note: 'Named after Bir Protik Taramon Bibi, one of the two female freedom fighters of Bangladesh to receive the Bir Protik award. The hall also has an extension, BPTBH (Annex).',
    },
    {
        name: 'Shaheed Dr. Zikrul Haque Hall', abbr: 'SDZHH', gender: 'Male', seats: 448,
        image: '/images/halls/zikrul_haque_hall.jpg',
        note: 'A modern multi-storey residential hall for the male students of the university.',
    },
];

const PROVOSTS = [
    { hall: 'Abbas Uddin Ahmed Hall', name: 'Associate Prof. Md. Mahbub Rahman', phone: '01769662709' },
    { hall: 'Bir Protik Taramon Bibi Hall', name: 'Ashrafun Zannat', phone: '01623687772' },
    { hall: 'Bir Protik Taramon Bibi Hall (Annex)', name: 'Ananna Hoque Shathi', phone: '01759585645' },
    { hall: 'Shaheed Dr. Zikrul Haque Hall', name: 'Associate Prof. Dr. Md. Anowar Hossain', phone: '01769675568' },
];

const ASSISTANT_PROVOSTS = [
    { hall: 'Abbas Uddin Ahmed Hall', people: [{ name: 'Md. Jahangir Alam', phone: '01717657540' }] },
    {
        hall: 'Bir Protik Taramon Bibi Hall', people: [
            { name: 'Lecturer Tamanna Sharmin', phone: '01794972984' },
            { name: 'Munira Joynob Nur', phone: '01868310027' },
        ],
    },
    {
        hall: 'Bir Protik Taramon Bibi Hall (Annex)', people: [
            { name: 'Bipploby Guha Tuktuki', phone: '01317368636' },
            { name: 'Suraia Akter', phone: '01758300112' },
        ],
    },
    { hall: 'Shaheed Dr. Zikrul Haque Hall', people: [{ name: 'Lecturer Md. Masud Parves', phone: '01833810353' }] },
];

const MEDICAL_STAFF = [
    {
        name: 'Dr. Fowzia Jahan',
        designation: 'Medical Officer',
        qualification: 'MBBS, DMUD (Sylhet M.A.G. Osmani Medical College, Sylhet)',
        phone: '01769-675576',
        email: 'medicalcenter@baust.edu.bd',
        badge: 'Medical Officer',
    },
    {
        name: 'Md. Mozaffor Hossain',
        designation: 'Medical Assistant',
        qualification: 'Retired Sergeant, Bangladesh Army',
        phone: '01712-645975',
        email: null,
        badge: 'Medical Assistant',
    },
    {
        name: 'Lamia Aktar Limu',
        designation: 'Nurse (Female)',
        qualification: 'Diploma in Nursing Science and Midwifery (Nursing Institute, Kurigram)',
        phone: '01749-898473',
        email: 'limuaktar9@gmail.com',
        badge: 'Nurse (Female)',
    },
];

const LAB_GALLERY = [
    '/images/departments/cse/laboratory/network-and-hardware-lab/2.jpg',
    '/images/departments/cse/laboratory/database-and-data-warehouse-lab/2.jpg',
    '/images/departments/eee/laboratory/electrical-machine-laboratory/1.jpg',
    '/images/departments/eee/laboratory/power-electronics-lab/1.jpeg',
    '/images/departments/me/laboratory/cad-and-simulation-lab/1.jpg',
    '/images/departments/ipe/laboratory/simulation-lab/1.jpg',
    '/images/departments/ipe/laboratory/measurement-quality-control-lab/1.jpg',
    '/images/departments/ce/laboratory/fluid-mechanics-lab/1.jpg',
];

const DEPT_LABS = [
    { dept: 'CSE', href: '/cse/laboratories/computer-programming-and-operating-system-lab' },
    { dept: 'ICT', href: '/ict/laboratories' },
    { dept: 'EEE', href: '/eee/laboratories' },
    { dept: 'ME', href: '/me/laboratories' },
    { dept: 'IPE', href: '/ipe/laboratories' },
    { dept: 'CE', href: '/ce/laboratories' },
];

const NAV_SECTIONS = [
    { id: 'wifi', label: 'Wi-Fi Campus', icon: Wifi },
    { id: 'multimedia', label: 'Multimedia Classroom', icon: MonitorPlay },
    { id: 'laboratories', label: 'Modern Laboratories', icon: FlaskConical },
    { id: 'residential', label: 'Residential Halls', icon: BedDouble },
    { id: 'library', label: 'Central Library', icon: BookOpen },
    { id: 'cafeteria', label: 'Cafeteria', icon: UtensilsCrossed },
    { id: 'medical', label: 'Medical Center', icon: HeartPulse },
    { id: 'counseling', label: 'Psychological Counseling', icon: HeartHandshake },
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'playground', label: 'Playground', icon: Dumbbell },
    { id: 'co-curricular', label: 'Co-Curricular', icon: Trophy },
    { id: 'day-care', label: 'Day Care Center', icon: Baby },
    { id: 'fire-safety', label: 'Fire Safety', icon: ShieldCheck },
];

function SectionHeading({ icon: Icon, kicker, title }: { icon: React.ElementType; kicker: string; title: string }) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">{kicker}</p>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">{title}</h2>
            </div>
        </div>
    );
}

export default function FacilitiesIndex() {
    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Campus Facilities - BAUST" />
            <Navbar />
            <PageHero title="Campus Facilities" subtitle="Everything a modern campus needs — connectivity, classrooms, laboratories, residence and dining" compact={true} />

            {/* Quick-jump nav */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
                        {NAV_SECTIONS.map(({ id, label, icon: Icon }) => (
                            <a key={id} href={`#${id}`} className="whitespace-nowrap px-4 py-3 text-[13px] font-semibold text-gray-500 hover:text-emerald-700 border-b-2 border-transparent hover:border-emerald-300 transition-all flex items-center gap-1.5">
                                <Icon className="w-4 h-4" /> {label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

                {/* Hero band */}
                <section className="relative h-[300px] sm:h-[380px] rounded-3xl overflow-hidden shadow-2xl border border-white/60">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/green_campus.jpg')" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-900/30 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-8 sm:p-10 text-white max-w-3xl">
                        <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight drop-shadow">A campus built for learning and living</h1>
                        <p className="mt-3 text-sm sm:text-base text-gray-100/90 leading-relaxed">BAUST offers 100% residential facilities, campus-wide high-speed internet, modern multimedia classrooms and well-equipped laboratories — a complete environment for academic and personal growth.</p>
                    </div>
                </section>

                {/* Wi-Fi */}
                <section id="wifi" className="scroll-mt-24 grid lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <SectionHeading icon={Wifi} kicker="Next-Gen Connectivity" title="Wi-Fi Campus (Starlink Enabled)" />
                        <p className="text-[15px] text-gray-600 leading-relaxed">
                            Reliable high-speed internet is essential to modern education and engineering research. BAUST is proud to integrate advanced <span className="font-semibold text-emerald-700">Starlink satellite internet</span> alongside dedicated optical fiber lines, bringing low-latency, high-bandwidth connectivity to our students and faculty.
                        </p>
                        <p className="mt-4 text-[15px] text-gray-600 leading-relaxed">
                            Wi-Fi access points are actively operational throughout major academic complexes, departmental laboratories, and student residential halls. To ensure every student enjoys uninterrupted connectivity, our IT & Networking team is actively expanding infrastructure to resolve occasional dead zones and deliver complete, 100% blanket wireless coverage across every corner of the campus grounds.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {['Starlink Satellite Connectivity', 'Dedicated Optical Fiber', 'Halls & Lab Coverage', 'Ongoing Blanket Expansion'].map((t) => (
                                <span key={t} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-emerald-100"><Wifi className="w-3.5 h-3.5" /> {t}</span>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl border border-white/60">
                        <img src="/images/departments/cse/laboratory/computer-programming-and-operating-system-lab/2.jpg" alt="Connected campus" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                </section>

                {/* Multimedia */}
                <section id="multimedia" className="scroll-mt-24 grid lg:grid-cols-2 gap-8 items-center">
                    <div className="h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl border border-white/60">
                        <img src="/images/departments/ce/laboratory/computer-lab/1.jpg" alt="Multimedia classroom" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div>
                        <SectionHeading icon={MonitorPlay} kicker="Teaching & Learning" title="Multimedia Classroom" />
                        <p className="text-[15px] text-gray-600 leading-relaxed">
                            Visualising theoretical concepts is vital to fully understanding engineering. Every classroom is equipped with high-quality modern multimedia projectors, allowing teachers to present animations, images and e-books that make complex topics clear.
                        </p>
                        <p className="mt-4 text-[15px] text-gray-600 leading-relaxed">
                            Multimedia facilities are also available in the computer programming and simulation laboratories. This lets a teacher reach every student effectively while reducing time spent on the board.
                        </p>
                    </div>
                </section>

                {/* Modern Laboratories */}
                <section id="laboratories" className="scroll-mt-24">
                    <SectionHeading icon={FlaskConical} kicker="Hands-on Learning" title="Modern Laboratories" />
                    <p className="text-[15px] text-gray-600 leading-relaxed max-w-3xl">
                        Every department runs well-equipped, modern laboratories where students turn theory into practice — from programming and hardware labs to electrical machines, thermodynamics, simulation and materials testing.
                    </p>

                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {LAB_GALLERY.map((src, i) => (
                            <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-gray-100 group">
                                <img src={src} alt={`Laboratory ${i + 1}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <p className="text-sm font-semibold text-gray-500 mb-3">Explore laboratories by department</p>
                        <div className="flex flex-wrap gap-3">
                            {DEPT_LABS.map(({ dept, href }) => (
                                <Link key={dept} href={href} className="inline-flex items-center gap-2 bg-white text-gray-700 hover:text-emerald-700 text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 hover:border-emerald-300 shadow-sm hover:shadow transition-all">
                                    {dept} Labs <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Residential */}
                <section id="residential" className="scroll-mt-24">
                    <SectionHeading icon={BedDouble} kicker="Campus Life" title="Residential Facilities" />
                    <p className="text-[15px] text-gray-600 leading-relaxed max-w-3xl">
                        The university believes campus life is central to a student's development. BAUST offers <span className="font-semibold text-emerald-700">100% residential facilities</span> across three halls, creating an environment that nurtures study, culture and interaction among students, staff and intellectuals.
                    </p>

                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                        {HALLS.map((h) => (
                            <div key={h.abbr} className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
                                <div className="h-52 sm:h-56 relative bg-gray-100">
                                    <img src={h.image} alt={h.name} loading="lazy" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white ${h.gender === 'Female' ? 'bg-rose-500' : 'bg-emerald-600'}`}>{h.gender}</span>
                                    <div className="absolute bottom-3 left-4 text-white">
                                        <p className="text-lg font-extrabold drop-shadow">{h.abbr}</p>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-[15px] font-bold text-gray-900 leading-snug">{h.name}</h3>
                                    <div className="mt-2 inline-flex items-center gap-1.5 text-emerald-700 text-sm font-bold"><Users className="w-4 h-4" /> {h.seats} seats</div>
                                    <p className="mt-3 text-[13px] text-gray-500 leading-relaxed">{h.note}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Life in the halls */}
                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { t: 'Shared community living', d: '3–4 students per room on a community basis.' },
                            { t: 'Common amenities', d: 'TV room, wide balcony, indoor games and dining in every hall.' },
                            { t: 'Round-the-clock security', d: 'Top-quality security ensured by the university’s own guards.', icon: ShieldCheck },
                            { t: 'Healthy dining', d: 'Food quality and nutrition are strictly maintained for students’ health.' },
                        ].map((f) => (
                            <div key={f.t} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">{f.icon ? <f.icon className="w-5 h-5" /> : <BedDouble className="w-5 h-5" />}</div>
                                <h4 className="text-sm font-bold text-gray-900">{f.t}</h4>
                                <p className="mt-1 text-[12.5px] text-gray-500 leading-relaxed">{f.d}</p>
                            </div>
                        ))}
                    </div>

                    {/* Provost contacts */}
                    <div className="mt-8 grid lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 bg-emerald-50/60 border-b border-emerald-100">
                                <h3 className="text-sm font-bold text-emerald-900">Hall Provosts</h3>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {PROVOSTS.map((p) => (
                                    <div key={p.hall} className="px-6 py-3.5 flex items-center justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="text-[13px] font-semibold text-gray-800 leading-snug">{p.name}</p>
                                            <p className="text-[11.5px] text-gray-400">{p.hall}</p>
                                        </div>
                                        <a href={`tel:${p.phone}`} className="flex items-center gap-1.5 text-emerald-700 text-[12.5px] font-semibold flex-shrink-0"><Phone className="w-3.5 h-3.5" /> {p.phone}</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 bg-emerald-50/60 border-b border-emerald-100">
                                <h3 className="text-sm font-bold text-emerald-900">Assistant Provosts</h3>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {ASSISTANT_PROVOSTS.map((g) => (
                                    <div key={g.hall} className="px-6 py-3.5">
                                        <p className="text-[11.5px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">{g.hall}</p>
                                        {g.people.map((p) => (
                                            <div key={p.name} className="flex items-center justify-between gap-4 py-0.5">
                                                <p className="text-[13px] text-gray-700 leading-snug">{p.name}</p>
                                                <a href={`tel:${p.phone}`} className="flex items-center gap-1.5 text-emerald-700 text-[12.5px] font-semibold flex-shrink-0"><Phone className="w-3.5 h-3.5" /> {p.phone}</a>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cafeteria */}
                <section id="cafeteria" className="scroll-mt-24 grid lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <SectionHeading icon={UtensilsCrossed} kicker="Dining" title="Cafeteria" />
                        <p className="text-[15px] text-gray-600 leading-relaxed">
                            The university has a well-furnished cafeteria inside the campus for students, teachers and staff. Breakfast, tea, lunch and a range of fast foods are available throughout the working hours of the day.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {['Breakfast', 'Tea & snacks', 'Lunch', 'Fast food'].map((t) => (
                                <span key={t} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-emerald-100"><UtensilsCrossed className="w-3.5 h-3.5" /> {t}</span>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl border border-white/60">
                        <img src="/images/facilities/cafeteria.jpg" alt="Cafeteria and campus dining" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                </section>

                {/* Library card -> existing page */}
                <section id="library" className="scroll-mt-24">
                    <Link href="/facilities/library" className="block group">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 p-8 sm:p-10 shadow-xl">
                            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
                                <div className="max-w-2xl">
                                    <div className="inline-flex items-center gap-2 bg-white/15 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"><BookOpen className="w-3.5 h-3.5" /> Central Library</div>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">A resource-rich Central Library</h2>
                                    <p className="mt-3 text-emerald-50/90 text-sm leading-relaxed">Explore the library's collection overview, e-resources, membership procedure, opening hours, user policy and photo gallery.</p>
                                </div>
                                <span className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold text-sm px-6 py-3 rounded-xl shadow-lg group-hover:gap-3 transition-all flex-shrink-0">Visit the Library <ArrowRight className="w-4 h-4" /></span>
                            </div>
                            <BookOpen className="absolute -right-6 -bottom-6 w-48 h-48 text-white/10" />
                        </div>
                    </Link>
                </section>
                {/* Medical Center */}
                <section id="medical" className="scroll-mt-24 space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md border border-white/60 group">
                                <img
                                    src="/images/facilities/medical_center_main.jpg"
                                    alt="BAUST Medical Center - Doctor Consultation"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>
                            <div className="h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md border border-white/60 group">
                                <img
                                    src="/images/facilities/medical_center_bed.jpg"
                                    alt="BAUST Medical Center - Emergency Patient Care & Observation"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <div>
                            <SectionHeading icon={HeartPulse} kicker="Health & Wellness" title="Medical Center" />
                            <p className="text-[15px] text-gray-600 leading-relaxed">
                                Established to ensure prompt emergency and routine in-house healthcare, the BAUST Medical Center provides free medical consultations, essential medicines, first-aid, oxygen support, and nebulization for students, faculty, and staff.
                            </p>
                            <p className="mt-4 text-[15px] text-gray-600 leading-relaxed">
                                A registered medical officer and trained nursing staff are available round-the-clock for residential students and on campus during university hours, with specialized referral links to CMH and higher medical centers.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                {['Qualified Medical Officer', '24/7 Residential Support', 'Oxygen & Nebulizer Support', 'First-Aid & Emergency Treatment', 'Essential Medicines'].map((t) => (
                                    <span key={t} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-emerald-100">
                                        <HeartPulse className="w-3.5 h-3.5" /> {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Medical Center Personnel & Contacts */}
                    <div className="bg-gradient-to-br from-white to-emerald-50/40 rounded-3xl border border-emerald-100/80 p-6 sm:p-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                            <div>
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
                                    <Stethoscope className="w-3.5 h-3.5" /> Healthcare Team
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
                                    Medical Center Personnel & Emergency Contacts
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    For emergency in-house medical assistance, primary health check-ups, and student medical queries.
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href="tel:01769675576"
                                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition-colors"
                                >
                                    <Phone className="w-4 h-4" /> Emergency: 01769-675576
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                            {MEDICAL_STAFF.map((person) => (
                                <div
                                    key={person.name}
                                    className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-100">
                                                {person.badge}
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
                                                <UserCheck className="w-4 h-4" />
                                            </div>
                                        </div>

                                        <h4 className="text-base font-bold text-gray-900 leading-snug">
                                            {person.name}
                                        </h4>
                                        <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                                            {person.designation}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-2.5 leading-relaxed">
                                            {person.qualification}
                                        </p>
                                    </div>

                                    <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                                        <a
                                            href={`tel:${person.phone.replace(/[^0-9]/g, '')}`}
                                            className="flex items-center gap-2.5 text-xs font-semibold text-gray-800 hover:text-emerald-700 transition-colors group"
                                        >
                                            <span className="w-7 h-7 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition-colors">
                                                <Phone className="w-3.5 h-3.5" />
                                            </span>
                                            <span>{person.phone}</span>
                                        </a>

                                        {person.email && (
                                            <a
                                                href={`mailto:${person.email}`}
                                                className="flex items-center gap-2.5 text-xs font-medium text-gray-600 hover:text-emerald-700 transition-colors group"
                                            >
                                                <span className="w-7 h-7 rounded-lg bg-gray-50 group-hover:bg-emerald-50 text-gray-500 group-hover:text-emerald-700 flex items-center justify-center transition-colors">
                                                    <Mail className="w-3.5 h-3.5" />
                                                </span>
                                                <span className="truncate">{person.email}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Psychological Counseling & Guidance Cell */}
                <PsychologicalCounselingSection />

                {/* Transport */}
                <section id="transport" className="scroll-mt-24 grid lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <SectionHeading icon={Bus} kicker="Student Commute" title="Transport Facility" />
                        <p className="text-[15px] text-gray-600 leading-relaxed">
                            The university operates a dedicated fleet of modern buses connecting Saidpur, Rangpur, Parbatipur, and surrounding transit points with scheduled morning and evening services.
                        </p>
                        <p className="mt-4 text-[15px] text-gray-600 leading-relaxed">
                            This transportation network ensures safe, punctual, and convenient daily commuting for non-resident students, faculty, and administrative personnel.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {['Saidpur–Rangpur Route', 'Safe & Punctual Schedule', 'Dedicated Fleet', 'Affordable Student Passes'].map((t) => (
                                <span key={t} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-emerald-100">
                                    <Bus className="w-3.5 h-3.5" /> {t}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl border border-white/60">
                        <img src="/images/facilities/transport_bus.jpg" alt="BAUST University Bus Fleet" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                </section>

                {/* Playground */}
                <section id="playground" className="scroll-mt-24 grid lg:grid-cols-2 gap-8 items-center">
                    <div className="h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl border border-white/60">
                        <img src="/images/outdoor_games.jpg" alt="University Playground" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div>
                        <SectionHeading icon={Dumbbell} kicker="Sports & Athletics" title="University Playground" />
                        <p className="text-[15px] text-gray-600 leading-relaxed">
                            BAUST has its own spacious playground where students participate in various sports including football, cricket, badminton, and volleyball.
                        </p>
                        <p className="mt-4 text-[15px] text-gray-600 leading-relaxed">
                            The university regularly hosts inter-department football and cricket tournaments, athletic competitions, and sports meets to cultivate physical fitness, teamwork, and healthy competition.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {['Football & Cricket Ground', 'Badminton & Volleyball Courts', 'Inter-Department Tournaments', 'Annual Sports Meet'].map((t) => (
                                <span key={t} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-emerald-100">
                                    <Dumbbell className="w-3.5 h-3.5" /> {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Co-Curricular Activity */}
                <section id="co-curricular" className="scroll-mt-24 grid lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <SectionHeading icon={Trophy} kicker="Student Life & Clubs" title="Co-Curricular Activity" />
                        <p className="text-[15px] text-gray-600 leading-relaxed">
                            At BAUST, co-curricular engagement is an integral part of holistic education. Students participate in diverse university clubs, cultural programs, scientific Olympiads, programming contests, and debating championships.
                        </p>
                        <p className="mt-4 text-[15px] text-gray-600 leading-relaxed">
                            These voluntary, social, and philanthropic pursuits provide opportunities to develop leadership skills, public speaking confidence, and lifelong friendships.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {['Debate & Quiz Clubs', 'Programming & Robotics', 'Cultural Fest & Gala', 'Social Welfare Initiatives'].map((t) => (
                                <span key={t} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-emerald-100">
                                    <Trophy className="w-3.5 h-3.5" /> {t}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl border border-white/60">
                        <img src="/images/cocurricular.jpg" alt="Co-Curricular Activities" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                </section>

                {/* Day Care Center */}
                <section id="day-care" className="scroll-mt-24 grid lg:grid-cols-2 gap-8 items-center">
                    <div className="h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl border border-white/60">
                        <img src="/images/daycare.jpg" alt="Day Care Center" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div>
                        <SectionHeading icon={Baby} kicker="Childcare & Family" title="Day Care Center" />
                        <p className="text-[15px] text-gray-600 leading-relaxed">
                            BAUST operates a dedicated Daycare Centre for the care and nourishment of the children of faculty members and staff. Situated on the ground floor of Bir Protik Taramon Bibi Hall, it offers a secure, child-friendly environment.
                        </p>
                        <p className="mt-4 text-[15px] text-gray-600 leading-relaxed">
                            The Daycare Center provides children with spaces to play freely, rest, and engage in guided early-learning activities under attentive supervision.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {['Bir Protik Taramon Bibi Hall', 'Safe Play & Rest Areas', 'Guided Activities', 'Trained Caregivers'].map((t) => (
                                <span key={t} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-emerald-100">
                                    <Baby className="w-3.5 h-3.5" /> {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Fire Safety */}
                <section id="fire-safety" className="scroll-mt-24 grid lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <SectionHeading icon={ShieldCheck} kicker="Safety & Emergency" title="Fire Safety Framework" />
                        <p className="text-[15px] text-gray-600 leading-relaxed">
                            BAUST provides a robust fire safety framework to ensure the wellbeing of everyone across the university and safeguard university assets.
                        </p>
                        <p className="mt-4 text-[15px] text-gray-600 leading-relaxed">
                            The campus is equipped with certified fire detection systems, high-grade fire extinguishers in every corridor and laboratory, marked evacuation routes, and routinely scheduled safety drills.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {['Smoke Detectors & Alarms', 'Extinguishers in All Buildings', 'Emergency Exit Signage', 'Periodic Fire Drills'].map((t) => (
                                <span key={t} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-emerald-100">
                                    <ShieldCheck className="w-3.5 h-3.5" /> {t}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl border border-white/60">
                        <img src="/images/firesafety.jpg" alt="Fire Safety Facilities" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
