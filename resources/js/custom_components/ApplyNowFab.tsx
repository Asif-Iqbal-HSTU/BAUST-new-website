import { ArrowUpRight, GraduationCap } from 'lucide-react';

export const APPLY_URL = 'https://admission.baust.edu.bd/apply';

/**
 * Floating "Apply Now" button for phones and tablets (the desktop header has its own).
 * Hidden while the mobile menu is open (`hidden`) and while a person profile modal is
 * open (ProfileModal adds `profile-modal-open` to <body>; see resources/css/app.css).
 */
export default function ApplyNowFab({ hidden = false }: { hidden?: boolean }) {
    return (
        <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apply Now for admission"
            aria-hidden={hidden}
            tabIndex={hidden ? -1 : undefined}
            className={`apply-fab xl:hidden fixed z-[60] right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] group touch-manipulation transition-all duration-300 ${
                hidden ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'
            }`}
        >
            {/* soft pulse halo */}
            <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping [animation-duration:2.4s]" aria-hidden="true" />
            <span className="relative flex items-center gap-2.5 pl-2 pr-5 py-2 rounded-full bg-gradient-to-r from-[#0f5132] via-emerald-600 to-green-500 text-white font-bold text-[15px] tracking-wide shadow-xl shadow-emerald-900/30 ring-2 ring-white/90 active:scale-95 transition-transform">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm">
                    <GraduationCap className="w-5 h-5" />
                </span>
                Apply Now
                <ArrowUpRight className="w-4 h-4 opacity-80 group-active:translate-x-0.5 group-active:-translate-y-0.5 transition-transform" />
            </span>
        </a>
    );
}
