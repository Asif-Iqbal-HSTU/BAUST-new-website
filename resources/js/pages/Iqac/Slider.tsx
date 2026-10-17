import React from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Play, Pause } from 'lucide-react';

export type Slide = { img: string; title: string; date: string };

export default function IqacSlider({ slides }: { slides: Slide[] }) {
    const n = slides.length;
    const [index, setIndex] = React.useState(0);
    const [playing, setPlaying] = React.useState(true);
    const [hovered, setHovered] = React.useState(false);

    const go = React.useCallback((dir: number) => setIndex((p) => (p + dir + n) % n), [n]);

    React.useEffect(() => {
        if (!playing || hovered) return;
        const t = setInterval(() => setIndex((p) => (p + 1) % n), 5000);
        return () => clearInterval(t);
    }, [playing, hovered, n]);

    return (
        <section aria-roledescription="carousel" aria-label="IQAC activities and highlights">
            <div
                className="relative w-full h-[21rem] sm:h-[27rem] lg:h-[34rem] rounded-[2rem] overflow-hidden border border-white/50 shadow-[0_20px_60px_-20px_rgba(2,44,34,0.45)] group"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Slides */}
                {slides.map((s, i) => (
                    <div
                        key={s.img}
                        className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
                            i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                        aria-hidden={i !== index}
                    >
                        <img
                            src={s.img}
                            alt={s.title}
                            loading={i === 0 ? 'eager' : 'lazy'}
                            className={`w-full h-full object-cover transition-transform ease-out ${
                                i === index ? 'scale-110 duration-[6000ms]' : 'scale-100 duration-0'
                            }`}
                        />
                        {/* Scrim for text legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/35 to-emerald-950/5" />
                    </div>
                ))}

                {/* Highlights chip */}
                <div className="absolute top-5 left-5 z-30">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold uppercase tracking-[0.2em]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Activities &amp; Highlights
                    </span>
                </div>

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 z-30 p-6 sm:p-9 lg:p-12">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold mb-4 shadow-lg">
                            <CalendarDays className="w-4 h-4" />
                            {slides[index].date}
                        </div>
                        <h3
                            key={index}
                            className="text-white text-xl sm:text-2xl lg:text-4xl font-black leading-tight drop-shadow-lg [animation:iqacSlideUp_0.6s_ease-out]"
                        >
                            {slides[index].title}
                        </h3>
                    </div>
                </div>

                {/* Prev / Next */}
                <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous slide"
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next slide"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots + play/pause */}
                <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-9 z-30 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        {slides.map((s, i) => (
                            <button
                                key={s.img}
                                type="button"
                                onClick={() => setIndex(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                aria-current={i === index}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    i === index ? 'w-7 bg-emerald-400' : 'w-2 bg-white/50 hover:bg-white/80'
                                }`}
                            />
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => setPlaying((p) => !p)}
                        aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
                        className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-colors"
                    >
                        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            <style>{`@keyframes iqacSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </section>
    );
}
