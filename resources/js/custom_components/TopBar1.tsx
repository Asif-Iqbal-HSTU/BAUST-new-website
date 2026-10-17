import { Bell, Facebook, Youtube, Instagram, Linkedin, Phone, Mail } from "lucide-react";
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

// Ticker speed in pixels per second, and how long the first notice stays put before scrolling starts.
const MARQUEE_SPEED = 45;
const MARQUEE_START_DELAY = '3s';

const TopBar1 = () => {
    const { props } = usePage();
    const notices = (props as any).topScrollNotices || [];

    // Derive the loop duration from the measured width so the speed stays constant however many notices there are.
    const firstCopyRef = useRef<HTMLDivElement>(null);
    const [marqueeDuration, setMarqueeDuration] = useState<number | null>(null);

    useEffect(() => {
        const el = firstCopyRef.current;
        if (!el) return;
        const update = () => setMarqueeDuration(Math.max(20, el.offsetWidth / MARQUEE_SPEED));
        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => observer.disconnect();
    }, [notices.length]);

    // Left side (social + contact)
    const socialContactLinks = (
        <div className="flex items-center space-x-5 text-[12.5px] font-medium tracking-wide w-full max-w-none">
            <div className="flex items-center space-x-3.5 text-emerald-100/70">
                <a
                    href="https://www.facebook.com/baust.edu.bd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="BAUST Facebook"
                    className="hover:text-white transition-colors transform hover:scale-110"
                >
                    <Facebook className="w-[14px] h-[14px]" />
                </a>
                <a
                    href="https://www.youtube.com/@BAUSTSaidpurNilphamari"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    title="BAUST YouTube"
                    className="hover:text-white transition-colors transform hover:scale-110"
                >
                    <Youtube className="w-[14px] h-[14px]" />
                </a>
                <a
                    href="https://www.instagram.com/explore/locations/1015553879/bangladesh-army-university-of-science-and-technology---baust-saidpur/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="BAUST Instagram"
                    className="hover:text-white transition-colors transform hover:scale-110"
                >
                    <Instagram className="w-[14px] h-[14px]" />
                </a>
                <a
                    href="https://bd.linkedin.com/company/bangladesh-army-university-of-science-technology"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="BAUST LinkedIn"
                    className="hover:text-white transition-colors transform hover:scale-110"
                >
                    <Linkedin className="w-[14px] h-[14px]" />
                </a>
            </div>

            <div className="h-3.5 w-px bg-emerald-500/40 hidden sm:block"></div>

            <div className="flex items-center space-x-6">
                <a href="tel:+8801769675588" className="flex items-center space-x-2 hover:text-white transition-colors">
                    <Phone className="w-[13px] h-[13px] opacity-80" />
                    <span>+8801769675588</span>
                </a>
                <a href="mailto:info@baust.edu.bd" className="flex items-center space-x-2 hover:text-white transition-colors xl:whitespace-nowrap">
                    <Mail className="w-[13px] h-[13px] opacity-80" />
                    <span>info@baust.edu.bd</span>
                </a>
            </div>
        </div>
    );

    return (
        <div className="w-full bg-[#063320] text-emerald-50 z-50 relative border-b border-[#0a452d]">
            <div className="max-w-screen-xl mx-auto px-4 h-10 flex items-center justify-between">
                {/* Contact Info (Desktop Left) */}
                <div className="hidden md:flex flex-1 overflow-hidden">
                    {socialContactLinks}
                </div>

                {/* Notice Marquee - Right side on Desktop, Center on Mobile */}
                <div className="flex md:flex-none w-full md:w-[600px] xl:w-[750px] items-center text-[12.5px] bg-[#0a452d]/50 rounded-full px-4 py-1.5 space-x-3 border border-[#0f5132]/50 shadow-inner">
                    <div className="flex items-center gap-2 flex-shrink-0 bg-[#063320] px-2 py-0.5 rounded-full border border-emerald-500/30">
                        <Bell className="w-[13px] h-[13px] text-amber-400 animate-bounce" />
                        <span className="font-black text-[10px] text-emerald-400 uppercase tracking-tighter">Notices:</span>
                    </div>
                    <div className="overflow-hidden w-full relative h-[22px] flex items-center">
                        <div className="animate-marquee hover:[animation-play-state:paused] whitespace-nowrap flex flex-nowrap shrink-0 items-center absolute left-0 w-max"
                            style={{
                                animationDelay: MARQUEE_START_DELAY,
                                ...(marqueeDuration ? { animationDuration: `${marqueeDuration}s` } : {}),
                            }}
                        >
                            {notices.length > 0 ? (
                                <>
                                    {/* Copy 1 */}
                                    <div ref={firstCopyRef} className="flex shrink-0 items-center flex-nowrap space-x-12 pr-12">
                                        {notices.map((notice: any, idx: number) => (
                                            <Link 
                                                key={`c1-${idx}`} 
                                                href={`/archive/notices/${notice.slug}`}
                                                title={notice.title}
                                                className="shrink-0 whitespace-nowrap font-medium text-emerald-100/90 hover:text-white hover:underline tracking-wide transition-colors cursor-pointer"
                                            >
                                                {notice.title}
                                            </Link>
                                        ))}
                                    </div>
                                    {/* Copy 2 (for seamless loop) */}
                                    <div className="flex shrink-0 items-center flex-nowrap space-x-12 pr-12">
                                        {notices.map((notice: any, idx: number) => (
                                            <Link 
                                                key={`c2-${idx}`} 
                                                href={`/archive/notices/${notice.slug}`}
                                                title={notice.title}
                                                className="shrink-0 whitespace-nowrap font-medium text-emerald-100/90 hover:text-white hover:underline tracking-wide transition-colors cursor-pointer"
                                            >
                                                {notice.title}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <span className="font-semibold text-white/50 tracking-wide">No active scroll notices.</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Fallback - keep simple icons beside marquee if enough space */}
                <div className="md:hidden ml-3 flex-shrink-0">
                    <div className="flex space-x-2.5 text-emerald-200">
                        <a href="tel:+8801769675588" className="hover:text-white"><Phone className="w-[15px] h-[15px]" /></a>
                        <a href="mailto:info@baust.edu.bd" className="hover:text-white"><Mail className="w-[15px] h-[15px]" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar1;
