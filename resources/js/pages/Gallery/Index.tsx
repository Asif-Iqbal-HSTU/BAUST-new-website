import React, { useState, useMemo, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import { 
    Camera, 
    Image as ImageIcon, 
    X, 
    ChevronLeft, 
    ChevronRight, 
    Maximize2, 
    Download, 
    Building2, 
    GraduationCap, 
    Award, 
    Sparkles, 
    Users, 
    Search
} from 'lucide-react';

export interface GalleryPhoto {
    id: string | number;
    title: string;
    category: 'campus' | 'academics' | 'events' | 'student-life' | 'facilities';
    categoryLabel: string;
    image: string;
    description?: string;
    tag?: string;
}

interface DbGalleryItem {
    id: number;
    title: string;
    description?: string | null;
    category?: string | null;
    images?: string[] | null;
    department?: {
        name: string;
        short_name: string;
    } | null;
}

interface Props {
    dbGalleries?: DbGalleryItem[];
}

const CURATED_PHOTOS: GalleryPhoto[] = [
    // Campus & Architecture
    {
        id: 'c1',
        title: 'BAUST Main Academic & Administrative Complex',
        category: 'campus',
        categoryLabel: 'Campus & Architecture',
        image: '/images/hero/hero-1.jpg',
        description: 'The monumental main academic building and administrative headquarters of BAUST in Saidpur Cantonment.',
        tag: 'Main Campus'
    },
    {
        id: 'c2',
        title: 'Lush Green University Grounds & Courtyard',
        category: 'campus',
        categoryLabel: 'Campus & Architecture',
        image: '/images/campus.jpeg',
        description: 'Serene, natural greenery and open lawns creating an inspiring academic atmosphere.',
        tag: 'Campus Green'
    },
    {
        id: 'c3',
        title: 'Architectural Perspective & Plaza Walkways',
        category: 'campus',
        categoryLabel: 'Campus & Architecture',
        image: '/images/hero/hero-4.jpg',
        description: 'Modern campus infrastructure with wide walkways, trees, and student meeting points.',
        tag: 'Architecture'
    },
    {
        id: 'c4',
        title: 'Eco-Friendly Campus & Botanical Spaces',
        category: 'campus',
        categoryLabel: 'Campus & Architecture',
        image: '/images/green_campus.jpg',
        description: 'A sustainable, clean environment recognized across the region for its ecological balance.',
        tag: 'Green Campus'
    },
    {
        id: 'c5',
        title: 'Central University Pavilion & Facade',
        category: 'campus',
        categoryLabel: 'Campus & Architecture',
        image: '/images/hero/hero-7.jpg',
        description: 'State-of-the-art campus buildings designed for multidisciplinary education.',
        tag: 'Infrastructure'
    },

    // Academics & Labs
    {
        id: 'a1',
        title: 'Central Library Spacious Reading & Research Hall',
        category: 'academics',
        categoryLabel: 'Academics & Labs',
        image: '/images/library-reading-room.jpg',
        description: 'Air-conditioned central reading room equipped with academic literature, research journals, and digital study stations.',
        tag: 'Central Library'
    },
    {
        id: 'a2',
        title: 'Civil Engineering Topographic Survey Camp',
        category: 'academics',
        categoryLabel: 'Academics & Labs',
        image: '/images/departments/ce/gallery/ce_photo_1.jpg',
        description: 'Civil Engineering students conducting precision theodolite, total station, and leveling field exercises.',
        tag: 'Survey Camp'
    },
    {
        id: 'a3',
        title: 'Advanced Materials & Concrete Technology Lab',
        category: 'academics',
        categoryLabel: 'Academics & Labs',
        image: '/images/departments/ce/gallery/ce_photo_5.jpg',
        description: 'Experimental testing of structural integrity, compression, and material tensile strengths.',
        tag: 'Engineering Lab'
    },
    {
        id: 'a4',
        title: 'Hydraulics & Fluid Mechanics Testing Flume',
        category: 'academics',
        categoryLabel: 'Academics & Labs',
        image: '/images/departments/ce/gallery/ce_photo_6.jpg',
        description: 'Undergraduate engineering students performing hydraulic velocity and flow simulation experiments.',
        tag: 'Fluid Lab'
    },
    {
        id: 'a5',
        title: 'Precision Geospatial Mapping & Field Training',
        category: 'academics',
        categoryLabel: 'Academics & Labs',
        image: '/images/departments/ce/gallery/ce_photo_3.jpg',
        description: 'Hands-on training preparing future engineers for large-scale infrastructure construction projects.',
        tag: 'Field Training'
    },
    {
        id: 'a6',
        title: 'IEB / BAETE Official Engineering Accreditation',
        category: 'academics',
        categoryLabel: 'Academics & Labs',
        image: '/images/departments/cse/slider/ieb-accreditation.jpg',
        description: 'Official board certification validating outcome-based education standards of BAUST engineering degrees.',
        tag: 'Accreditation'
    },
    {
        id: 'a7',
        title: 'Computer Science & Software Development Center',
        category: 'academics',
        categoryLabel: 'Academics & Labs',
        image: '/images/hero/hero-2.jpg',
        description: 'High-speed networking lab dedicated to programming, algorithm design, and software engineering.',
        tag: 'Computing Lab'
    },

    // Ceremonies & Events
    {
        id: 'e1',
        title: 'National Girls Programming Contest Winners',
        category: 'events',
        categoryLabel: 'Ceremonies & Events',
        image: '/images/departments/cse/slider/girls-programming-contest.png',
        description: 'BAUST competitive programming team celebrating outstanding victory at the national stage.',
        tag: 'National Award'
    },
    {
        id: 'e2',
        title: 'National Robotics Championship Runners-Up',
        category: 'events',
        categoryLabel: 'Ceremonies & Events',
        image: '/images/departments/cse/slider/robotics-runners-up.png',
        description: 'Engineering innovation team awarded runners-up trophy for automated robotics and IoT prototypes.',
        tag: 'Robotics'
    },
    {
        id: 'e3',
        title: 'Honor & Felicitation with Vice Chancellor',
        category: 'events',
        categoryLabel: 'Ceremonies & Events',
        image: '/images/departments/cse/slider/with-vc.jpeg',
        description: 'Vice Chancellor and faculty heads felicitating student achievers for national accolades.',
        tag: 'Honors'
    },
    {
        id: 'e4',
        title: 'University Convocation & Degree Award Ceremony',
        category: 'events',
        categoryLabel: 'Ceremonies & Events',
        image: '/images/hero/hero-3.jpg',
        description: 'Proud graduates, faculty dignitaries, and families commemorating academic excellence.',
        tag: 'Convocation'
    },
    {
        id: 'e5',
        title: 'Annual Cultural Festival & Gala Presentation',
        category: 'events',
        categoryLabel: 'Ceremonies & Events',
        image: '/images/hero/hero-5.jpg',
        description: 'Vibrant cultural performances, drama, music, and campus celebrations.',
        tag: 'Cultural Festival'
    },

    // Halls & Student Life
    {
        id: 's1',
        title: 'Abbas Uddin Male Residential Hall',
        category: 'student-life',
        categoryLabel: 'Halls & Student Life',
        image: '/images/halls/abbas_uddin_hall.jpg',
        description: 'Modern residential complex for male students featuring high-speed Starlink WiFi, reading rooms, and indoor games.',
        tag: 'Male Residence'
    },
    {
        id: 's2',
        title: 'Taramon Bibi Female Residential Hall',
        category: 'student-life',
        categoryLabel: 'Halls & Student Life',
        image: '/images/halls/taramon_bibi_hall.jpg',
        description: 'Safe, fully secured female student hall with 24/7 surveillance, dining halls, and leisure spaces.',
        tag: 'Female Residence'
    },
    {
        id: 's3',
        title: 'Dr. Zikrul Haque Student Residential Hall',
        category: 'student-life',
        categoryLabel: 'Halls & Student Life',
        image: '/images/halls/zikrul_haque_hall.jpg',
        description: 'Spacious on-campus student residence fostering peer collaboration and camaraderie.',
        tag: 'Student Hall'
    },
    {
        id: 's4',
        title: 'Modern University Cafeteria & Dining Hall',
        category: 'student-life',
        categoryLabel: 'Halls & Student Life',
        image: '/images/facilities/cafeteria.jpg',
        description: 'Hygienic multi-cuisine dining hall and outdoor seating area for students, faculty, and visitors.',
        tag: 'Cafeteria'
    },
    {
        id: 's5',
        title: 'Outdoor Sports & Athletics Complex',
        category: 'student-life',
        categoryLabel: 'Halls & Student Life',
        image: '/images/outdoor_games.jpg',
        description: 'Inter-departmental cricket, football, basketball tournaments, and physical fitness activities.',
        tag: 'Sports & Games'
    },
    {
        id: 's6',
        title: 'Student Clubs & Co-Curricular Societies',
        category: 'student-life',
        categoryLabel: 'Halls & Student Life',
        image: '/images/cocurricular.jpg',
        description: 'Active debate, photography, cultural, and robotics clubs nurturing multidimensional talent.',
        tag: 'Clubs'
    },

    // Facilities & Healthcare
    {
        id: 'f1',
        title: 'BAUST Modern Commuter Transport Bus Fleet',
        category: 'facilities',
        categoryLabel: 'Campus Facilities',
        image: '/images/facilities/transport_bus.jpg',
        description: 'Safe and comfortable commuter bus service linking Saidpur Cantonment, Rangpur, Dinajpur, and surrounding areas.',
        tag: 'Transport'
    },
    {
        id: 'f2',
        title: 'BAUST Medical Center & Clinical Consultation',
        category: 'facilities',
        categoryLabel: 'Campus Facilities',
        image: '/images/facilities/medical_center_main.jpg',
        description: '24/7 healthcare facility providing consultation, pathology support, and emergency medical services.',
        tag: 'Medical Center'
    },
    {
        id: 'f3',
        title: 'Medical Center Patient Observation & Emergency Care',
        category: 'facilities',
        categoryLabel: 'Campus Facilities',
        image: '/images/facilities/medical_center_bed.jpg',
        description: 'Equipped observation beds, vital monitoring, emergency oxygen supply, and ambulance coordination.',
        tag: 'Emergency Care'
    },
    {
        id: 'f4',
        title: 'Campus Fire Safety & Hazard Response Preparedness',
        category: 'facilities',
        categoryLabel: 'Campus Facilities',
        image: '/images/firesafety.jpg',
        description: 'Certified firefighting infrastructure and regular safety drills conducted across all university facilities.',
        tag: 'Safety & Security'
    },
    {
        id: 'f5',
        title: 'BAUST Day Care Center',
        category: 'facilities',
        categoryLabel: 'Campus Facilities',
        image: '/images/daycare.jpg',
        description: 'Dedicated childcare facility supporting faculty, officers, and staff members.',
        tag: 'Day Care'
    }
];

const CATEGORIES = [
    { id: 'all', label: 'All Photos', icon: ImageIcon },
    { id: 'campus', label: 'Campus & Architecture', icon: Building2 },
    { id: 'academics', label: 'Academics & Labs', icon: GraduationCap },
    { id: 'events', label: 'Ceremonies & Events', icon: Award },
    { id: 'student-life', label: 'Student Life & Halls', icon: Users },
    { id: 'facilities', label: 'Campus Facilities', icon: Sparkles },
];

export default function GalleryIndex({ dbGalleries = [] }: Props) {
    const [activeTab, setActiveTab] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Merge database gallery photos if available
    const allPhotos = useMemo(() => {
        const list = [...CURATED_PHOTOS];

        dbGalleries.forEach((album) => {
            if (album.images && Array.isArray(album.images)) {
                album.images.forEach((imgUrl, idx) => {
                    // Check if already in curated list
                    if (!list.some(p => p.image === imgUrl)) {
                        list.push({
                            id: `db-${album.id}-${idx}`,
                            title: album.title || 'Department Gallery Photo',
                            category: 'academics',
                            categoryLabel: album.category || 'Academics & Labs',
                            image: imgUrl,
                            description: album.description || '',
                            tag: album.department?.short_name || 'Department'
                        });
                    }
                });
            }
        });

        return list;
    }, [dbGalleries]);

    // Filter photos based on tab and search
    const filteredPhotos = useMemo(() => {
        return allPhotos.filter((photo) => {
            const matchesTab = activeTab === 'all' || photo.category === activeTab;
            const matchesSearch = searchQuery.trim() === '' || 
                photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (photo.description && photo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (photo.tag && photo.tag.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesTab && matchesSearch;
        });
    }, [allPhotos, activeTab, searchQuery]);

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (lightboxIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setLightboxIndex(null);
            } else if (e.key === 'ArrowLeft') {
                setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
            } else if (e.key === 'ArrowRight') {
                setLightboxIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, filteredPhotos.length]);

    const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : filteredPhotos.length - 1);
        }
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex(lightboxIndex < filteredPhotos.length - 1 ? lightboxIndex + 1 : 0);
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-gray-800">
            <Head>
                <title>Photo Gallery - Bangladesh Army University of Science & Technology (BAUST)</title>
                <meta name="description" content="Explore photos of BAUST campus life, modern laboratories, convocation ceremonies, residential halls, medical center, and vibrant extracurricular activities." />
            </Head>

            <Navbar />

            {/* Page Hero */}
            <PageHero 
                title="University Photo Gallery"
                subtitle="Capturing Moments, Milestones & Everyday Campus Life at BAUST"
                compact={true}
            />

            {/* Breadcrumb Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto">
                    <Link href="/" className="hover:text-emerald-700 font-medium transition-colors">Home</Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-emerald-700 font-semibold">Photo Gallery</span>
                </div>
            </div>

            <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
                
                {/* Stats / Highlight Pills Banner */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xl sm:text-2xl font-black text-gray-900 leading-none">Scenic</span>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Green Campus Plaza</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xl sm:text-2xl font-black text-gray-900 leading-none">Modern</span>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Engineering Labs</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            <Award className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xl sm:text-2xl font-black text-gray-900 leading-none">National</span>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Contest Champions</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xl sm:text-2xl font-black text-gray-900 leading-none">Vibrant</span>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Halls & Social Life</p>
                        </div>
                    </div>
                </div>

                {/* Filter Controls & Search */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        
                        {/* Filter Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                            {CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                const isActive = activeTab === cat.id;
                                const count = cat.id === 'all' 
                                    ? allPhotos.length 
                                    : allPhotos.filter(p => p.category === cat.id).length;

                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setActiveTab(cat.id);
                                            setLightboxIndex(null);
                                        }}
                                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                                            isActive 
                                                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20' 
                                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    >
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                                        <span>{cat.label}</span>
                                        <span className={`px-1.5 py-0.2 text-[11px] rounded-full font-bold ${
                                            isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                                        }`}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search Bar */}
                        <div className="relative min-w-[240px] shrink-0">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search photos by title or tag..."
                                className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-gray-800 placeholder-gray-400"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                    </div>
                </div>

                {/* Photos Grid */}
                {filteredPhotos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredPhotos.map((photo, index) => (
                            <div
                                key={photo.id}
                                onClick={() => setLightboxIndex(index)}
                                className="group bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col hover:-translate-y-1"
                            >
                                {/* Image Wrapper */}
                                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                                    <img
                                        src={photo.image}
                                        alt={photo.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://placehold.co/600x450/0f5132/ffffff?text=BAUST+Gallery';
                                        }}
                                    />
                                    
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                                        <div className="flex justify-end">
                                            <span className="bg-white/90 backdrop-blur-sm text-emerald-900 p-2 rounded-full shadow-lg">
                                                <Maximize2 className="w-4 h-4" />
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full inline-block mb-1">
                                                {photo.categoryLabel}
                                            </span>
                                            <p className="text-white text-xs line-clamp-2 leading-relaxed">
                                                {photo.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tag Badge */}
                                    {photo.tag && (
                                        <div className="absolute top-3 left-3 group-hover:opacity-0 transition-opacity duration-200">
                                            <span className="bg-emerald-800/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                                                {photo.tag}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Caption Details */}
                                <div className="p-4 flex flex-col flex-1 justify-between">
                                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                                        {photo.title}
                                    </h3>
                                    
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                                        <span className="font-medium text-emerald-700">{photo.categoryLabel}</span>
                                        <span className="text-emerald-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                                            View Photo →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm my-8">
                        <Camera className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h4 className="text-lg font-bold text-gray-800 mb-1">No Photos Found</h4>
                        <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
                            No photos matched your search criteria "{searchQuery}". Try selecting another category or clearing your search.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setActiveTab('all');
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-xl text-sm font-bold hover:bg-emerald-800 transition-colors shadow-sm"
                        >
                            Reset Filter
                        </button>
                    </div>
                )}

                {/* Additional University Highlights Note */}
                <div className="mt-12 bg-gradient-to-r from-emerald-900 to-teal-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="space-y-2 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5" /> Media Coverage & Publications
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold">Have Event Photos to Share?</h3>
                        <p className="text-sm text-emerald-100/80 max-w-xl">
                            University clubs, department coordinators, and society leaders can submit high-resolution coverage photographs to the Public Relations Officer for inclusion in the institutional gallery archive.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                        <Link
                            href="/public-relations"
                            className="px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-sm hover:bg-emerald-50 transition-colors shadow-md text-center"
                        >
                            Public Relations Office
                        </Link>
                        <Link
                            href="/archive/notices?category=news-events"
                            className="px-5 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white border border-emerald-700 font-bold text-sm transition-colors text-center"
                        >
                            News & Events Archive
                        </Link>
                    </div>
                </div>

            </main>

            {/* Lightbox Modal */}
            {activePhoto && lightboxIndex !== null && (
                <div 
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 select-none animate-in fade-in duration-200"
                    onClick={() => setLightboxIndex(null)}
                >
                    {/* Top Control Bar */}
                    <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3">
                            <span className="bg-emerald-900/90 text-emerald-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                {activePhoto.categoryLabel}
                            </span>
                            <span className="text-xs text-gray-300 font-medium hidden sm:inline">
                                Photo {lightboxIndex + 1} of {filteredPhotos.length}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <a
                                href={activePhoto.image}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                title="Open Full Size"
                            >
                                <Download className="w-5 h-5" />
                            </a>
                            <button
                                onClick={() => setLightboxIndex(null)}
                                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                title="Close (Esc)"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Previous Button */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-emerald-700 text-white backdrop-blur-sm transition-all shadow-lg hover:scale-110 active:scale-95"
                        aria-label="Previous Photo"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-emerald-700 text-white backdrop-blur-sm transition-all shadow-lg hover:scale-110 active:scale-95"
                        aria-label="Next Photo"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Image and Caption Container */}
                    <div 
                        className="relative max-w-5xl max-h-[88vh] flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={activePhoto.image}
                            alt={activePhoto.title}
                            className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                        />

                        {/* Caption Box */}
                        <div className="mt-4 text-center max-w-2xl px-4">
                            <h4 className="text-white text-base sm:text-lg font-bold">
                                {activePhoto.title}
                            </h4>
                            {activePhoto.description && (
                                <p className="text-gray-300 text-xs sm:text-sm mt-1 leading-relaxed">
                                    {activePhoto.description}
                                </p>
                            )}
                        </div>
                    </div>

                </div>
            )}

            <Footer />
        </div>
    );
}
