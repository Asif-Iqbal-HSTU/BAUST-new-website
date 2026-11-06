import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram, Linkedin, GraduationCap, Building2, ExternalLink } from 'lucide-react';

const phoneGroups = [
    {
        title: 'Admission Support',
        icon: GraduationCap,
        numbers: [
            { label: null, number: '+8801769675588' },
            { label: null, number: '+8801769675554' },
            { label: null, number: '+8801786278922' },
        ],
    },
    {
        title: 'Administration & HR',
        icon: Building2,
        numbers: [
            { label: 'Admin', number: '+8801769675559' },
            { label: 'HR', number: '+8801769662732' },
        ],
    },
];

const emails = ['registrar@baust.edu.bd', 'info@baust.edu.bd'];

const socials = [
    { name: 'Facebook', href: 'https://www.facebook.com/baust.edu.bd/', icon: Facebook },
    { name: 'YouTube', href: 'https://www.youtube.com/@BAUSTSaidpurNilphamari', icon: Youtube },
    { name: 'Instagram', href: 'https://www.instagram.com/explore/locations/1015553879/bangladesh-army-university-of-science-and-technology---baust-saidpur/', icon: Instagram },
    { name: 'LinkedIn', href: 'https://bd.linkedin.com/company/bangladesh-army-university-of-science-technology', icon: Linkedin },
];

const mapQuery = encodeURIComponent('Bangladesh Army University of Science and Technology, Saidpur Cantonment');

export default function Contact() {
    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Contact Us - BAUST" />
            <Navbar />

            <PageHero title="Contact Us" subtitle="We'd love to hear from you" />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Intro */}
                <div className="max-w-3xl mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Get in Touch</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Have a question about admissions, academics or anything else at BAUST? Reach out through any of the channels below and our team will be glad to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Address */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6">
                            <MapPin size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Campus Address</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Bangladesh Army University of Science & Technology<br />
                            Saidpur Cantonment,<br />
                            Saidpur, Bangladesh
                        </p>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                        >
                            Get Directions <ExternalLink size={14} />
                        </a>
                    </div>

                    {/* Phone */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6">
                            <Phone size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Phone</h3>
                        <div className="space-y-5">
                            {phoneGroups.map((group) => (
                                <div key={group.title}>
                                    <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                                        <group.icon size={16} className="text-emerald-600" />
                                        {group.title}
                                    </p>
                                    <ul className="space-y-1">
                                        {group.numbers.map(({ label, number }) => (
                                            <li key={number}>
                                                <a href={`tel:${number}`} className="text-gray-700 hover:text-emerald-700 transition-colors">
                                                    {number}
                                                    {label && <span className="text-gray-400"> ({label})</span>}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Email & Social */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6">
                            <Mail size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Email</h3>
                        <ul className="space-y-2 mb-8">
                            {emails.map((email) => (
                                <li key={email}>
                                    <a href={`mailto:${email}`} className="text-gray-700 hover:text-emerald-700 transition-colors break-all">
                                        {email}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Follow Us</h3>
                        <div className="flex gap-3">
                            {socials.map(({ name, href, icon: Icon }) => (
                                <a
                                    key={name}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={name}
                                    className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-12 rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white">
                    <iframe
                        title="BAUST location map"
                        src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`}
                        className="w-full h-[400px] border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
