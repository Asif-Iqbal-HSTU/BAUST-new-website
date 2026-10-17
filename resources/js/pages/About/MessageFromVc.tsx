import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';

export default function MessageFromVC() {
    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Message from Vice Chancellor - BAUST" />
            <Navbar />

            {/* Hero Banner */}
            <PageHero title="Message from the Vice Chancellor" />

            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Profile Card */}
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

                    {/* Top accent stripe */}
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />

                    <div className="flex flex-col lg:flex-row">

                        {/* Left Sidebar — Profile */}
                        <div className="lg:w-72 xl:w-80 flex-shrink-0 flex flex-col items-center px-8 pt-10 pb-10 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gradient-to-b from-emerald-50/60 to-white">

                            {/* Portrait on TOP */}
                            <div className="relative mb-6">
                                {/* Outer decorative ring */}
                                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 opacity-20 blur-sm" />
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-300 to-green-500 opacity-30" />
                                <img
                                    src="/images/VC_Sir.jpeg"
                                    alt="Brig Gen Mohammad Mobarak Hossain Majumder, psc"
                                    className="relative w-52 h-64 lg:w-56 lg:h-72 object-cover object-top rounded-xl shadow-lg z-10"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>

                            {/* Name & Title below image */}
                            <div className="text-center w-full">
                                <h3 className="text-[17px] font-bold text-gray-900 leading-snug mb-1">Brig Gen Mohammad Mobarak Hossain Majumder, psc</h3>
                                <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mt-2 mb-4">Vice Chancellor</div>
                                <div className="w-full h-px bg-gray-100 mb-4" />
                                <p className="text-[13px] text-gray-500 leading-relaxed">
                                    Bangladesh Army University of Science and Technology (BAUST), Saidpur.
                                </p>
                            </div>
                        </div>

                        {/* Right Column — Message Content */}
                        <div className="flex-1 px-8 lg:px-12 py-10 lg:py-12">

                            {/* Opening quote decoration */}
                            <svg className="w-10 h-10 text-emerald-100 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>

                            <div className="space-y-5 text-gray-600 leading-8 text-[16.5px] text-justify">
                                <p>
                                    Bangladesh Army University of Science and Technology (BAUST), Saidpur was founded in 2015 by Bangladesh Army with due permission from the Govt and UGC. Patronized by Bangladesh Army, the University aspires to transform itself into a centre of excellence in Science, Engineering, Technology, Business Studies and Arts by offering innovative multi-disciplinary courses and extensive research facility to the young generation of the country and beyond. The mission of BAUST is to provide a state-of-the-art education and research facility to develop Human Resources (HR) for the socio economic well being of the society.
                                </p>
                                <p>
                                    To achieve the aforesaid vision and mission, we are oath-bound to provide needs-based education by experienced faculty members so as to produce quality HR who will be well-suited in the present-day requirement. Also, enough scopes will be created to undertake research and project work which will encourage students to utilize their full potential in innovation and creativity.
                                </p>
                                <p>
                                    Ample opportunity will be made available to nurture the students' hidden talents and broaden their outlook through various club and other co-curricular activities. Besides, a number of seminars, symposiums, workshops and short courses will be organized/ arranged so as to make the students confident and competent and keep pace with the latest technological trends. Above all, our all endeavour will be put into develop students' sense of responsibility and judgement, and most importantly they will be well prepared to take responsibilities of their own in various nation-building activities.
                                </p>
                            </div>

                            {/* Closing statement */}
                            <div className="mt-8 py-5 px-6 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl">
                                <p className="text-gray-800 font-medium italic text-[16px]">
                                    We welcome co-operation in this regard from all concerned.
                                </p>
                            </div>

                            {/* Signature block */}
                            <div className="mt-10 pt-8 border-t border-dashed border-gray-200 flex flex-col items-start gap-1">
                                <p className="text-gray-900 font-bold text-[18px]">Brig Gen Mohammad Mobarak Hossain Majumder, psc</p>
                                <p className="text-emerald-700 font-semibold text-[15px]">Vice Chancellor</p>
                                <p className="text-gray-500 text-[13px]">Bangladesh Army University of Science and Technology (BAUST)</p>
                                <p className="text-gray-500 text-[13px]">Saidpur.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
