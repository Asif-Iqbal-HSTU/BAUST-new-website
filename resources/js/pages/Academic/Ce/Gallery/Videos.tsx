import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';
import { Video, Film } from 'lucide-react';
import { pageText } from '@/lib/dept-icons';

interface GalleryVideo {
    id: number;
    title: string;
    description?: string | null;
    category?: string | null;
    video_url?: string | null;
    order: number;
}

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
}

interface Props {
    department?: DeptInfo | null;
    videos: GalleryVideo[];
}

const FALLBACK_VIDEOS: GalleryVideo[] = [
    {
        id: 1,
        title: "Civil Engineering Department Documentary - Part 1",
        category: "Department Overview",
        description: "State-of-the-art laboratory infrastructure, OBE curriculum, faculty facilities, and hands-on learning environment at BAUST Saidpur.",
        video_url: "/videos/ce/BAUST_CE.mp4",
        order: 1,
    },
    {
        id: 2,
        title: "Civil Engineering Department Documentary - Part 2",
        category: "Student Life & Field Activities",
        description: "Survey camp activities, student projects, extracurricular achievements, and campus life at the Department of Civil Engineering.",
        video_url: "/videos/ce/BAUST_CE 2.mp4",
        order: 2,
    }
];

/** Returns the embeddable URL for a YouTube link, or null for any other (local) video. */
function youtubeEmbedUrl(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function CeGalleryVideos({ department, videos = [] }: Props) {
    const list = videos.length > 0 ? videos : FALLBACK_VIDEOS;

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Video Gallery - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title="Video Gallery" 
                subtitle={pageText(department, 'video_gallery_subtitle', "Departmental Documentaries, Field Camps, Lab Tours, and Student Features")} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Gallery" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
                
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    <div className="relative z-10 max-w-3xl">
                        <span className="bg-emerald-500/30 text-emerald-200 text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-400/20">
                            Video Showcase
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-bold mt-4 leading-tight">
                            {department?.short_name || 'CE'} in Motion
                        </h2>
                        <p className="text-emerald-100/90 text-sm sm:text-base mt-4 leading-relaxed text-justify">
                            Watch our official departmental documentaries exploring the cutting-edge laboratories, survey camps, student innovations, and academic environment of Civil Engineering at BAUST.
                        </p>
                    </div>
                </div>

                {/* Videos Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {list.map((video, idx) => (
                        <div 
                            key={video.id ?? idx} 
                            className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden flex flex-col group hover:border-emerald-200 transition-all"
                        >
                            <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                            
                            {/* Video Player Box */}
                            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                                {video.video_url && youtubeEmbedUrl(video.video_url) ? (
                                    <iframe
                                        src={youtubeEmbedUrl(video.video_url)!}
                                        title={video.title}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        loading="lazy"
                                    />
                                ) : video.video_url ? (
                                    <video 
                                        controls 
                                        preload="metadata" 
                                        className="w-full h-full object-contain"
                                    >
                                        <source src={video.video_url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <div className="text-gray-400 flex flex-col items-center gap-2">
                                        <Film className="w-10 h-10" />
                                        <span className="text-xs">Video file unavailable</span>
                                    </div>
                                )}
                            </div>

                            {/* Info Area */}
                            <div className="p-7 space-y-3 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/60">
                                            {video.category || 'Documentary'}
                                        </span>
                                        <span className="text-xs text-gray-400 font-semibold">Video #{idx + 1}</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                        {video.title}
                                    </h3>

                                    {video.description && (
                                        <p className="text-sm text-gray-600 mt-2 leading-relaxed text-justify">
                                            {video.description}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-medium">
                                    <span className="flex items-center gap-1.5">
                                        <Video className="w-4 h-4 text-emerald-600" />
                                        {department?.name || CE_DEPT_NAME}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </main>
            <Footer />
        </div>
    );
}
