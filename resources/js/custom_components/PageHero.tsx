import React from 'react';

interface PageHeroProps {
    title: string;
    subtitle?: string | null;
    compact?: boolean;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle = "Bangladesh Army University of Science & Technology", compact = false }) => {
    return (
        <div className={`relative overflow-hidden bg-[#0f5132] ${compact ? 'py-8' : 'py-14'}`}>
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />
            </div>
            <div className={`relative max-w-screen-xl mx-auto px-6 text-center`}>
                {subtitle && (
                    <p className="text-emerald-300 text-sm font-bold uppercase tracking-[0.25em] mb-4">{subtitle}</p>
                )}
                <h1 className={`${compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-bold text-white mb-3 leading-tight drop-shadow-sm`}>
                    {title}
                </h1>
                <div className="w-20 h-1 bg-emerald-400 mx-auto rounded-full mt-4" />
            </div>
        </div>
    );
};

export default PageHero;
