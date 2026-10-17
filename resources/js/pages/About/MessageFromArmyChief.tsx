import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';

const PDF_URL = "/Message from Chief of Army Staff - Bangladesh Army University of Science and Technology (BAUST), Saidpur (1).pdf";

export default function MessageFromArmyChief() {
    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Message from Chief of Army Staff - BAUST" />
            <Navbar />

            {/* Hero Banner */}
            <PageHero title="Message from Chief of Army Staff" />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">

                {/* Profile + Message Card */}
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

                    {/* Top accent stripe */}
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />

                    <div className="flex flex-col lg:flex-row">

                        {/* Left Sidebar — Profile */}
                        <div className="lg:w-72 xl:w-80 flex-shrink-0 flex flex-col items-center px-8 pt-10 pb-10 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gradient-to-b from-emerald-50/60 to-white">

                            {/* Portrait on TOP */}
                            <div className="relative mb-6">
                                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 opacity-20 blur-sm" />
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-300 to-green-500 opacity-30" />
                                <img
                                    src="/images/Army Chief.jpg"
                                    alt="GENERAL WAKER-UZ-ZAMAN"
                                    className="relative w-52 h-64 lg:w-56 lg:h-72 object-cover object-top rounded-xl shadow-lg z-10"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>

                            {/* Name & Title below image */}
                            <div className="text-center w-full">
                                <h3 className="text-[17px] font-bold text-gray-900 leading-snug mb-1">GENERAL WAKER-UZ-ZAMAN</h3>
                                <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mt-2">Chief of Army Staff</div>
                                <p className="text-gray-500 font-medium text-xs mt-2 uppercase tracking-wider">and</p>
                                <div className="inline-block bg-green-50 text-green-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Chairman, Board of Trustees</div>
                                <div className="w-full h-px bg-gray-100 mb-4" />
                                <p className="text-[13px] text-gray-500 leading-relaxed">
                                    Bangladesh Army University of Science and Technology (BAUST), Saidpur.
                                </p>
                            </div>
                        </div>

                        {/* Right Column — Message */}
                        <div className="flex-1 px-8 lg:px-12 py-10 lg:py-12">

                            <svg className="w-10 h-10 text-emerald-100 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>

                            <div className="space-y-5 text-gray-600 leading-8 text-[16.5px] text-justify">
                                <p>
                                    Bangladesh Army has been playing a unique role in nation-building and development of the education system in Bangladesh. An enlightened student devotes his/her merit and potentials to bring positive changes and selflessly contributes for the nation. Therefore, we would like to set examples of imparting quality education infused with morality and humanity for all students. In continuation of this effort, Bangladesh Army University of Science and Technology (BAUST), Saidpur was established in 2015.
                                </p>
                                <p>
                                    In an era of rapid technological advancement, the mission of Bangladesh Army University of Science and Technology (BAUST), Saidpur, is to produce graduates who are innovative, adaptable, and ready to meet the global challenges of the 21st century. We are committed to providing a secure, serene, and highly disciplined academic environment that is conducive to focused learning, research, and personal growth. With a distinguished faculty, highly motivating facilities, and a rigorous outcome-based curriculum, BAUST offers an excellent educational experience.
                                </p>
                                <p>
                                    As the Chairman of the Board of Trustees of Bangladesh Army University of Science and Technology (BAUST), Saidpur, I really feel honoured to shoulder these responsibilities. I would also like to invite the students, faculties and people from all walks of life to be a part of our journey towards transforming a nation enlightened with quality education, morality and humanity.
                                </p>
                            </div>

                            {/* Closing blessing */}
                            <div className="mt-8 py-5 px-6 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl">
                                <p className="text-gray-800 font-semibold text-[16px] italic">
                                    May Allah bless us all.
                                </p>
                            </div>

                            {/* Signature block */}
                            <div className="mt-10 pt-8 border-t border-dashed border-gray-200 flex flex-col items-start gap-1">
                                <p className="text-gray-900 font-bold text-[18px]">GENERAL WAKER-UZ-ZAMAN</p>
                                <p className="text-emerald-700 font-semibold text-[15px]">Chief of Army Staff</p>
                                <p className="text-gray-500 text-[13px]">and</p>
                                <p className="text-emerald-700 font-semibold text-[15px]">Chairman, Board of Trustees, BAUST, Saidpur</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PDF Viewer Section */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Official Document</h2>
                                <p className="text-sm text-gray-500 mt-0.5">Message from the Chief of Army Staff — Original PDF</p>
                            </div>
                            <a
                                href={PDF_URL}
                                download
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white bg-[#0f5132] hover:bg-[#0a3622] transition-colors text-sm font-semibold shadow-sm hover:shadow-md"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download PDF
                            </a>
                        </div>
                        <div className="w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-50" style={{ height: '800px' }}>
                            <iframe
                                src={`${PDF_URL}#view=FitH`}
                                className="w-full h-full"
                                title="Message from Chief of Army Staff PDF"
                            >
                                <p className="p-6 text-gray-600">Your browser does not support PDFs. <a href={PDF_URL} className="text-emerald-700 underline font-semibold">Download the PDF here.</a></p>
                            </iframe>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
