import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { Target, Eye, Rocket, CheckCircle2, Award, Users, Globe, Lightbulb, ShieldCheck } from 'lucide-react';

export default function VisionMissionObjectives() {
    const objectives = [
        "To offer need based programs and important disciplines of Science, Technology, Social Science and Business for both undergraduate and graduate students.",
        "To strive for excellence by providing quality teaching through wide varieties of instructional approaches.",
        "To produce highly competent and global standard manpower in Science and Technology who will be proficient in communication skill, critical thinking and analytical abilities.",
        "To generate adequate resources to support the University’s instructions, research and extension pursuits.",
        "To provide timely, friendly and accessible support system that promotes partnership, and sense of shared responsibilities between students, faculty, alumni, and other stakeholders.",
        "To strive for the gradual expansion of faculties, departments, and programs in accordance with the need and in abidance with the Private University Act, 2010 (revised).",
        "To develop joint collaboration with similar universities, institutes and organizations, both at home and abroad and sign agreements and memorandum of understanding to this effect.",
        "To sensitize and infuse the core values of BAUST i.e. Integrity, Openness, Intellectual Curiosity, Commitment to Excellence, Self-Discipline, Sense of Responsibility, Diversity and Respect for others amongst the students.",
        "To carry out other necessary University works to meet the need of time."
    ];

    const missionPoints = [
        "Providing state of the art education to achieve disciplinary knowledge, problem solving skill, ability to lead and communication skill.",
        "Providing a collaborative environment enabling free exchange of ideas to flourish research, creativity and innovation.",
        "To remain updated and responsive to the diverse needs of society and transform in a sustainable way."
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title="Vision, Mission & Objectives - BAUST" />
            <Navbar />

            <PageHero 
                title="Vision, Mission & Objectives" 
                subtitle="The Core Identity of BAUST"
            />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                
                {/* Vision Section */}
                <section className="mb-24 relative">
                    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl opacity-60 pointer-events-none" />
                    
                    <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-emerald-100 flex flex-col lg:flex-row items-stretch">
                        <div className="lg:w-2/5 bg-emerald-900 p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
                            {/* Decorative background for vision */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
                                <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-md inline-block mb-6 border border-white/20 shadow-xl">
                                    <Eye className="w-12 h-12 text-emerald-400" />
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">OUR VISION</h2>
                                <div className="w-16 h-1.5 bg-emerald-400 mx-auto rounded-full" />
                            </div>
                        </div>
                        
                        <div className="lg:w-3/5 p-12 lg:p-20 flex flex-col justify-center">
                            <p className="text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed text-justify">
                                "The University aspires to transform into a <span className="text-emerald-700 font-bold">center of excellence</span> in Science, Engineering and Technology, Arts and Business Administration programs by providing innovative, multi-disciplinary courses to the young generation of the country and beyond."
                            </p>
                            <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed text-justify italic">
                                It endeavors to make the University a hub of knowledge and be recognized as a leading university of the country.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-emerald-600 mb-4">Our Commitment</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Mission Statement</h3>
                        <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full mt-6" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {missionPoints.map((point, index) => (
                            <div key={index} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-emerald-50 hover:border-emerald-200 transition-all duration-300 group hover:-translate-y-2">
                                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:rotate-6 transition-all duration-500">
                                    {index === 0 && <Award className="w-8 h-8 text-emerald-700 group-hover:text-white" />}
                                    {index === 1 && <Rocket className="w-8 h-8 text-emerald-700 group-hover:text-white" />}
                                    {index === 2 && <Target className="w-8 h-8 text-emerald-700 group-hover:text-white" />}
                                </div>
                                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                                    {point}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Objectives Section */}
                <section>
                    <div className="bg-emerald-900 rounded-[3rem] p-12 lg:p-20 text-white shadow-2xl relative overflow-hidden">
                        {/* Decorative background patterns */}
                        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
                        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
                        
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                                <div className="text-center md:text-left">
                                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest mb-2">Defining Our Path</h2>
                                    <h3 className="text-4xl md:text-5xl font-bold">Strategic Objectives</h3>
                                </div>
                                <div className="p-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                                    <ShieldCheck className="w-12 h-12 text-emerald-400" />
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-x-16 gap-y-10">
                                {objectives.map((obj, index) => (
                                    <div key={index} className="flex gap-6 group">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-black text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-lg">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <p className="text-emerald-50/90 text-lg leading-relaxed pt-1 group-hover:text-white transition-colors">
                                            {obj}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values Callout */}
                <div className="mt-24 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-100 rounded-full text-emerald-800 font-bold text-sm uppercase tracking-[0.2em] mb-8">
                        <Users className="w-5 h-5" />
                        <span>Core Values of BAUST</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 text-gray-500 font-medium">
                        {["Integrity", "Openness", "Intellectual Curiosity", "Commitment to Excellence", "Self-Discipline", "Responsibility", "Diversity", "Respect"].map((v, i) => (
                            <span key={i} className="px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:text-emerald-700 transition-all cursor-default">
                                {v}
                            </span>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
