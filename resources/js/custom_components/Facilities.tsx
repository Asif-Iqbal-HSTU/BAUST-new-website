import React, { useRef, useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    BookOpen,
    FlaskConical,
    BedDouble,
    MonitorPlay,
    Wifi,
    UtensilsCrossed,
    Dumbbell,
    HeartPulse,
    Bus,
    ArrowRight,
    Trophy,
    Baby,
    ShieldCheck,
    Leaf,
    Landmark,
} from 'lucide-react';

interface FacilityItem {
    id: string;
    category: string;
    badge: string;
    title: string;
    description: string;
    image: string;
    link: string;
    buttonText: string;
    icon: React.ElementType;
}

const FACILITIES: FacilityItem[] = [
    {
        id: 'wifi',
        category: 'Digital Connectivity',
        badge: 'Starlink Powered',
        title: 'Wifi Campus',
        description: 'Equipped with next-generation Starlink satellite internet and optical fiber. Active network expansion is underway to achieve 100% seamless coverage across every corner of the campus.',
        image: '/images/green_campus.jpg',
        link: '/facilities#wifi',
        buttonText: 'View Wifi & Coverage',
        icon: Wifi,
    },
    {
        id: 'multimedia',
        category: 'Smart Learning',
        badge: 'Digital Classrooms',
        title: 'Multimedia Classroom',
        description: 'Equipped with modern multimedia projectors and interactive audiovisual setups to visualize theoretical and engineering concepts.',
        image: '/images/departments/ce/laboratory/computer-lab/1.jpg',
        link: '/facilities#multimedia',
        buttonText: 'Explore Classrooms',
        icon: MonitorPlay,
    },
    {
        id: 'laboratories',
        category: 'Hands-on Learning',
        badge: '40+ Modern Labs',
        title: 'Modern Laboratories',
        description: 'Over 40 advanced engineering, science, and computing laboratories equipped with state-of-the-art experimental and simulation facilities.',
        image: '/images/departments/cse/laboratory/network-and-hardware-lab/2.jpg',
        link: '/facilities#laboratories',
        buttonText: 'View Laboratories',
        icon: FlaskConical,
    },
    {
        id: 'library',
        category: 'Academic & Research',
        badge: 'Central Library',
        title: 'Central Library',
        description: 'Vast collection of reference books, international journals, digital databases, e-resources, and quiet reading zones to foster research.',
        image: '/images/library-reading-room.jpg',
        link: '/facilities/library',
        buttonText: 'Explore Library',
        icon: BookOpen,
    },
    {
        id: 'residential',
        category: 'Student Accommodation',
        badge: '100% Residential',
        title: 'Residential Facilities',
        description: 'Dedicated on-campus halls (Abbas Uddin Ahmed Hall, Bir Protik Taramon Bibi Hall & Shaheed Dr. Zikrul Haque Hall) with 100% residential capacity.',
        image: '/images/halls/abbas_uddin_hall.jpg',
        link: '/facilities#residential',
        buttonText: 'View Residential',
        icon: BedDouble,
    },
    {
        id: 'cafeteria',
        category: 'Dining & Social',
        badge: 'Campus Dining',
        title: 'Cafeteria',
        description: 'Well-furnished cafeteria offering fresh breakfast, lunch, snacks, and tea in a clean, welcoming environment for students and staff.',
        image: '/images/facilities/cafeteria.jpg',
        link: '/facilities#cafeteria',
        buttonText: 'View Cafeteria',
        icon: UtensilsCrossed,
    },
    {
        id: 'medical',
        category: 'Health & Well-being',
        badge: 'On-Campus Clinic',
        title: 'Medical Center',
        description: 'Dedicated healthcare clinic providing free doctor consultations, 24/7 residential emergency care, oxygen support, and essential medicines led by Medical Officer Dr. Fowzia Jahan.',
        image: '/images/facilities/medical_center_main.jpg',
        link: '/facilities#medical',
        buttonText: 'View Staff & Contacts',
        icon: HeartPulse,
    },
    {
        id: 'transport',
        category: 'Student Commute',
        badge: 'University Buses',
        title: 'Transport',
        description: 'Reliable fleet of university buses connecting Saidpur, Rangpur, and adjacent regions to ensure safe and timely commutes.',
        image: '/images/facilities/transport_bus.jpg',
        link: '/facilities#transport',
        buttonText: 'Transport Services',
        icon: Bus,
    },
    {
        id: 'playground',
        category: 'Sports & Athletics',
        badge: 'Sports Grounds',
        title: 'Playground',
        description: 'Expansive sports grounds where students play football, cricket, volleyball, and badminton, alongside annual sporting tournaments.',
        image: '/images/outdoor_games.jpg',
        link: '/facilities#playground',
        buttonText: 'View Playground',
        icon: Dumbbell,
    },
    {
        id: 'co-curricular',
        category: 'Student Life & Clubs',
        badge: 'Societies & Events',
        title: 'Co-Curricular Activity',
        description: 'Active student participation in debates, quizzes, Olympiads, cultural galas, seminars, athletics, and university clubs.',
        image: '/images/cocurricular.jpg',
        link: '/facilities#co-curricular',
        buttonText: 'Explore Activities',
        icon: Trophy,
    },
    {
        id: 'day-care',
        category: 'Family Care',
        badge: 'Childcare Center',
        title: 'Day Care Center',
        description: 'Situated at Bir Protik Taramon Bibi Hall, providing guided care, nourishment, play, and rest for children of faculty and staff.',
        image: '/images/daycare.jpg',
        link: '/facilities#day-care',
        buttonText: 'Day Care Details',
        icon: Baby,
    },
    {
        id: 'fire-safety',
        category: 'Safety & Security',
        badge: '24/7 Protection',
        title: 'Fire Safety',
        description: 'Robust fire safety framework including modern smoke detectors, fire extinguishers, emergency alarms, and regular evacuation drills.',
        image: '/images/firesafety.jpg',
        link: '/facilities#fire-safety',
        buttonText: 'Safety Framework',
        icon: ShieldCheck,
    },
    {
        id: 'green-campus',
        category: 'Environment',
        badge: 'Eco-Friendly',
        title: 'Green Campus',
        description: 'Lush green landscape, scenic botanical gardens, and an eco-friendly open environment fostering peace of mind and academic focus.',
        image: '/images/green_campus.jpg',
        link: '/facilities',
        buttonText: 'Campus Tour',
        icon: Leaf,
    },
    {
        id: 'bank',
        category: 'Financial Services',
        badge: 'Trust Bank & ATM',
        title: 'Bank Facility',
        description: 'Convenient on-campus banking booth and automated teller machine (ATM) ensuring seamless fee payment and financial transactions.',
        image: '/images/facilities/bank_facility.jpeg',
        link: '/facilities',
        buttonText: 'Banking Services',
        icon: Landmark,
    },
];

export default function Facilities() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollButtons = () => {
        if (!sliderRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setCanScrollLeft(scrollLeft > 5);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        updateScrollButtons();
        slider.addEventListener('scroll', updateScrollButtons, { passive: true });
        window.addEventListener('resize', updateScrollButtons);

        return () => {
            slider.removeEventListener('scroll', updateScrollButtons);
            window.removeEventListener('resize', updateScrollButtons);
        };
    }, []);

    const slide = (direction: 'left' | 'right') => {
        if (!sliderRef.current) return;

        const container = sliderRef.current;
        const firstCard = container.querySelector<HTMLElement>('[data-facility-card]');
        const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 340; // card width + gap

        if (direction === 'left') {
            if (container.scrollLeft <= 10) {
                container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            }
        } else {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            if (scrollLeft + clientWidth >= scrollWidth - 15) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                    
                    {/* Left Column: Description & Heading */}
                    <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 pt-1">
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">
                            Campus Life & Facilities
                        </p>
                        
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4 inline-block relative pb-2">
                            Experience Our Facilities
                            <span className="absolute bottom-0 left-0 w-16 h-1 bg-green-500 rounded-full"></span>
                        </h2>

                        <p className="text-gray-600 text-[15px] leading-relaxed mb-8 mt-2 text-justify">
                            Explore BAUST's modern campus facilities designed to support academic excellence, hands-on engineering research, and vibrant student life. From state-of-the-art laboratories and multimedia classrooms to 100% residential halls, a central library, transport network, playgrounds, and comprehensive healthcare in an inspiring, student-centered environment.
                        </p>

                        <div>
                            <Link
                                href="/facilities"
                                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 group"
                            >
                                <span>Explore All Facilities</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Carousel Track & Top Navigation Arrows */}
                    <div className="w-full lg:flex-1 min-w-0 flex flex-col">
                        
                        {/* Top-Right Carousel Navigation Arrows */}
                        <div className="flex items-center justify-between mb-4 pr-1">
                            <span className="text-xs font-semibold text-gray-400">
                                Showing {FACILITIES.length} Campus Facilities
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => slide('left')}
                                    aria-label="Previous facility"
                                    className="w-10 h-10 rounded-full bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 border border-gray-200 hover:border-green-300 flex items-center justify-center transition-all duration-150 active:scale-95 shadow-xs cursor-pointer"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => slide('right')}
                                    aria-label="Next facility"
                                    className="w-10 h-10 rounded-full bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 border border-gray-200 hover:border-green-300 flex items-center justify-center transition-all duration-150 active:scale-95 shadow-xs cursor-pointer"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Horizontal Cards Slider */}
                        <div
                            ref={sliderRef}
                            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            {FACILITIES.map((facility) => {
                                const IconComponent = facility.icon;
                                return (
                                    <div
                                        key={facility.id}
                                        data-facility-card
                                        className="snap-start shrink-0 w-[290px] sm:w-[320px] bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                                    >
                                        <div>
                                            {/* Facility Image */}
                                            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                                                <img
                                                    src={facility.image}
                                                    alt={facility.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-emerald-100">
                                                    {facility.badge}
                                                </div>
                                            </div>

                                            {/* Card Content */}
                                            <div className="p-5 sm:p-6 pb-2">
                                                <span className="block text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-2">
                                                    {facility.category}
                                                </span>
                                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-green-700 transition-colors">
                                                    {facility.title}
                                                </h3>
                                                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed line-clamp-3">
                                                    {facility.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Bottom Action Button */}
                                        <div className="p-5 sm:p-6 pt-3">
                                            <Link
                                                href={facility.link}
                                                className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors duration-150"
                                            >
                                                <IconComponent className="w-4 h-4" />
                                                <span>{facility.buttonText}</span>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
