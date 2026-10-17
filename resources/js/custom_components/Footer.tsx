import React from 'react';
import { Facebook, Youtube, Instagram, Linkedin, MapPin, Phone, Mail, ChevronRight, ArrowUp, Eye, Users } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

type SiteStats = { online: number; totalViews: number };

export default function Footer() {
    const { siteStats } = usePage<{ siteStats?: SiteStats }>().props;

    return (
        <footer className="bg-gray-950 text-gray-300 pt-16 pb-8 border-t-[6px] border-green-600 relative font-sans">
            {/* Floating 'Back to Top' Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="absolute -top-6 right-8 bg-green-600 hover:bg-green-500 text-white p-3 rounded-full shadow-lg transition-transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-500/50"
                aria-label="Back to Top"
            >
                <ArrowUp size={24} />
            </button>

            <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* 1. About BAUST */}
                <div className="space-y-6">
                    <div>
                        <img
                            src="/images/logo.png"
                            alt="BAUST Logo"
                            className="h-20 w-auto mb-4 inline-block bg-white rounded-xl p-2 shadow-md"
                        />
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Bangladesh Army University of Science & Technology (BAUST), the pioneer technical institute of the Armed Forces, started its journey on 15th February 2015.
                        </p>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex space-x-3">
                        <a
                            href="https://www.facebook.com/baust.edu.bd/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            title="BAUST Facebook"
                            className="bg-gray-800 hover:bg-green-600 p-2.5 rounded-lg transition-colors text-white"
                        >
                            <Facebook size={18} />
                        </a>
                        <a
                            href="https://www.youtube.com/@BAUSTSaidpurNilphamari"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                            title="BAUST YouTube"
                            className="bg-gray-800 hover:bg-green-600 p-2.5 rounded-lg transition-colors text-white"
                        >
                            <Youtube size={18} />
                        </a>
                        <a
                            href="https://www.instagram.com/explore/locations/1015553879/bangladesh-army-university-of-science-and-technology---baust-saidpur/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            title="BAUST Instagram"
                            className="bg-gray-800 hover:bg-green-600 p-2.5 rounded-lg transition-colors text-white"
                        >
                            <Instagram size={18} />
                        </a>
                        <a
                            href="https://bd.linkedin.com/company/bangladesh-army-university-of-science-technology"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            title="BAUST LinkedIn"
                            className="bg-gray-800 hover:bg-green-600 p-2.5 rounded-lg transition-colors text-white"
                        >
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>

                {/* 2. Contact Us */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-green-600 after:rounded-full">Contact Us</h3>

                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex items-start space-x-3">
                            <MapPin className="text-green-500 mt-1 shrink-0" size={18} />
                            <span>Saidpur Cantonment,<br />Saidpur, Bangladesh</span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <div className="flex items-start space-x-3">
                                <Phone className="text-green-500 mt-0.5 shrink-0" size={18} />
                                <div>
                                    <span className="block text-white font-medium mb-1">Admission Support:</span>
                                    <span className="block hover:text-green-400">+8801769675588</span>
                                    <span className="block hover:text-green-400">+8801769675554</span>
                                    <span className="block hover:text-green-400">+8801786278922</span>
                                </div>
                            </div>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <div className="flex items-start space-x-3">
                                <Phone className="text-green-500 mt-0.5 shrink-0" size={18} />
                                <div>
                                    <span className="block text-white font-medium mb-1">Administration & HR:</span>
                                    <span className="block hover:text-green-400">+8801769675559 (Admin)</span>
                                    <span className="block hover:text-green-400">+8801769662732 (HR)</span>
                                </div>
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <Mail className="text-green-500 mt-0.5 shrink-0" size={18} />
                            <div>
                                <a href="mailto:registrar@baust.edu.bd" className="block hover:text-green-400 transition-colors">registrar@baust.edu.bd</a>
                                <a href="mailto:info@baust.edu.bd" className="block hover:text-green-400 transition-colors">info@baust.edu.bd</a>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* 3. Resources & Links */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-green-600 after:rounded-full">Quick Links</h3>

                    <ul className="space-y-3 text-sm">
                        {[
                            { name: 'Notice Board', href: '/archive/notices', isExternal: false },
                            { name: 'News & Events', href: '/archive/notices?category=news-events', isExternal: false },
                            { name: 'Photo Gallery', href: '/gallery', isExternal: false },
                            { name: 'University Library', href: '/facilities/library', isExternal: false },
                            { name: 'Admission Notice', href: '/archive/notices?category=admission-notice', isExternal: false },
                            { name: 'Apply Online', href: 'https://admission.baust.edu.bd/apply', isExternal: true }
                        ].map((link, i) => (
                            <li key={i}>
                                {link.isExternal ? (
                                    <a 
                                        href={link.href} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex items-center text-gray-400 hover:text-green-400 hover:translate-x-1 duration-200 transition-all"
                                    >
                                        <ChevronRight size={16} className="text-green-600 mr-2 shrink-0" />
                                        <span>{link.name}</span>
                                    </a>
                                ) : (
                                    <Link 
                                        href={link.href} 
                                        className="flex items-center text-gray-400 hover:text-green-400 hover:translate-x-1 duration-200 transition-all"
                                    >
                                        <ChevronRight size={16} className="text-green-600 mr-2 shrink-0" />
                                        <span>{link.name}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 4. Affiliations & Approved By */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-green-600 after:rounded-full">Approved By</h3>

                    <div className="flex flex-col space-y-4">
                        <a href="https://moedu.gov.bd/" target="_blank" rel="noopener noreferrer" className="group flex items-center p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors border border-gray-800 hover:border-green-600/50">
                            <span className="shrink-0 w-11 h-11 mr-3 bg-white rounded-md p-1 flex items-center justify-center">
                                <img src="/images/footer/govt-seal-bangladesh.svg" alt="Government Seal of Bangladesh" className="w-full h-full object-contain" loading="lazy" />
                            </span>
                            <p className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors leading-snug">
                                Ministry of Education <br />
                                <span className="text-xs text-gray-500 font-normal">Govt. of the People's Republic of Bangladesh</span>
                            </p>
                        </a>

                        <a href="https://ugc.gov.bd/" target="_blank" rel="noopener noreferrer" className="group flex items-center p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors border border-gray-800 hover:border-green-600/50">
                            <span className="shrink-0 w-11 h-11 mr-3 bg-white rounded-md p-1 flex items-center justify-center">
                                <img src="/images/footer/ugc-logo.svg" alt="University Grants Commission of Bangladesh logo" className="w-full h-full object-contain" loading="lazy" />
                            </span>
                            <p className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors leading-snug">
                                UGC <br />
                                <span className="text-xs text-gray-500 font-normal">University Grants Commission</span>
                            </p>
                        </a>

                        <div className="grid grid-cols-2 gap-4">
                            <a href="https://www.army.mil.bd/" target="_blank" rel="noopener noreferrer" title="Bangladesh Army" className="group flex items-center justify-center p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors border border-gray-800 hover:border-green-600/50">
                                <span className="w-16 h-16 bg-white rounded-md p-1 flex items-center justify-center">
                                    <img src="/images/footer/bangladesh-army-logo.webp" alt="Bangladesh Army logo" className="w-full h-full object-contain" loading="lazy" />
                                </span>
                            </a>
                            <a href="https://www.baete.org.bd/" target="_blank" rel="noopener noreferrer" title="BAETE - Board of Accreditation for Engineering and Technical Education" className="group flex items-center justify-center p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors border border-gray-800 hover:border-green-600/50">
                                <span className="w-16 h-16 bg-white rounded-md p-1 flex items-center justify-center">
                                    <img src="/images/footer/baete-logo.png" alt="BAETE logo" className="w-full h-full object-contain" loading="lazy" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            {/* Visitor Counter */}
            {siteStats && (
                <div className="max-w-screen-xl mx-auto px-4 mt-12 flex flex-wrap justify-center gap-3 text-sm">
                    <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                        </span>
                        <Users size={16} className="text-green-500" />
                        <span className="text-gray-400">Online Now:</span>
                        <span className="font-semibold text-white tabular-nums">{siteStats.online.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2">
                        <Eye size={16} className="text-green-500" />
                        <span className="text-gray-400">Total Page Views:</span>
                        <span className="font-semibold text-white tabular-nums">{siteStats.totalViews.toLocaleString()}</span>
                    </div>
                </div>
            )}

            {/* Bottom Bar: Copyright & Credit */}
            <div className="max-w-screen-xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Bangladesh Army University of Science and Technology (BAUST). All Rights Reserved.</p>
                <p className="mt-4 md:mt-0 flex items-center space-x-1">
                    <span>Developed by</span>
                    {/* Link intentionally left blank for now: add href="https://…" target="_blank" rel="noopener noreferrer" when ready. */}
                    <a className="text-green-500 tracking-wide hover:text-green-400 font-medium ml-1">
                        Md. Asif Iqbal, Asst. Software Engineer, BAUST
                    </a>
                </p>
            </div>
        </footer>
    );
}
