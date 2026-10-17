import React from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import Navbar from "@/custom_components/Navbar";
import GreenButton from "@/custom_components/GreenButton";
import WhiteButton from "@/custom_components/WhiteButton";
import HeroBanner from '@/custom_components/HeroBanner';
import VCMessage from '@/custom_components/VCMessage';
import Academics from '@/custom_components/Academics';
import Facilities from '@/custom_components/Facilities';
import NoticesAndEvents, { NoticeItem, NewsEventItem } from '@/custom_components/NoticesAndEvents';
import WhyChooseBAUST from '@/custom_components/WhyChooseBAUST';
import Footer from '@/custom_components/Footer';

interface HomeProps {
    notices?: NoticeItem[];
    newsEvents?: NewsEventItem[];
    stats?: { faculty: number; departments: number };
}

export default function Home({ notices = [], newsEvents = [], stats }: HomeProps) {
    return (
        <>
            <Head title="BAUST - Bangladesh Army University of Science and Technology" />

            <Navbar />

            <HeroBanner stats={stats} />

            <VCMessage />

            <Academics />

            <Facilities />

            <NoticesAndEvents notices={notices} newsEvents={newsEvents} />

            {/* Why Choose BAUST Section */}
            <WhyChooseBAUST />

            {/* Gallery Section */}
            {/*            <section className="py-16 bg-gray-100">
                <h2 className="text-3xl font-bold text-center text-gray-800">Life at BAUST</h2>
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
                    {[1,2,3,4,5,6,7,8].map((i) => (
                        <div key={i} className="relative group">
                            <img src={`/images/gallery${i}.jpeg`} alt="Campus" className="rounded-xl shadow-md group-hover:opacity-80 transition"/>
                        </div>
                    ))}
                </div>
            </section>*/}

            <Footer />
        </>

    );
}
