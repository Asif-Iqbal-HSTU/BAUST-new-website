import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';
import { Camera, Image as ImageIcon, X, Maximize2 } from 'lucide-react';

interface GalleryAlbum {
    id: number;
    title: string;
    description?: string | null;
    category?: string | null;
    images?: string[] | null;
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
    albums: GalleryAlbum[];
}

const FALLBACK_ALBUMS: GalleryAlbum[] = [
    {
        id: 1,
        title: "Civil Engineering Survey Camp & Field Practices",
        category: "Field Survey & Practical Training",
        description: "Hands-on topographic mapping, leveling, theodolite operations, and field problem solving by Civil Engineering students.",
        images: [
            '/images/departments/ce/gallery/ce_photo_1.jpg',
            '/images/departments/ce/gallery/ce_photo_2.jpg',
            '/images/departments/ce/gallery/ce_photo_3.jpg',
            '/images/departments/ce/gallery/ce_photo_4.jpg',
        ],
        order: 1,
    },
    {
        id: 2,
        title: "Laboratory Facilities & Departmental Events",
        category: "Lab & Academic Facilities",
        description: "Modern laboratories, student experiments, technical competitions, and departmental ceremonies.",
        images: [
            '/images/departments/ce/gallery/ce_photo_5.jpg',
            '/images/departments/ce/gallery/ce_photo_6.jpg',
            '/images/departments/ce/gallery/ce_photo_7.jpg',
            '/images/departments/ce/gallery/ce_photo_8.jpg',
        ],
        order: 2,
    }
];

export default function CeGalleryPhotos({ department, albums = [] }: Props) {
    const list = albums.length > 0 ? albums : FALLBACK_ALBUMS;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Photo Gallery - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title="Photo Gallery" 
                subtitle="Field Camps, State-of-the-Art Laboratories, Student Life & Departmental Events" 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Gallery" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                
                {list.map((album, aIdx) => (
                    <section key={album.id ?? aIdx} className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200/80">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
                                    {album.category || 'Photo Album'}
                                </span>
                                <h3 className="text-2xl font-black text-gray-900 mt-2">{album.title}</h3>
                                {album.description && (
                                    <p className="text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">{album.description}</p>
                                )}
                            </div>
                            <span className="text-xs font-bold text-gray-400 self-start sm:self-auto">
                                {album.images?.length || 0} Photographs
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {album.images?.map((img, iIdx) => (
                                <div 
                                    key={iIdx}
                                    onClick={() => setSelectedImage(img)}
                                    className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 group cursor-pointer aspect-[4/3] bg-emerald-50/50"
                                >
                                    <img 
                                        src={img} 
                                        alt={`${album.title} - Photo ${iIdx + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-full bg-white/90 text-emerald-800 flex items-center justify-center shadow-lg">
                                            <Maximize2 className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

            </main>

            {/* Modal Lightbox */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <img 
                            src={selectedImage} 
                            alt="Full View" 
                            className="w-full h-full object-contain max-h-[85vh] rounded-2xl"
                        />
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
