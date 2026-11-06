import {
    Activity, Award, Bot, BookOpen, Briefcase, Building2, Code, Coffee, Cpu, Eye, Flame, FlaskConical, Globe,
    GraduationCap, Handshake, Heart, Layers, Lightbulb, type LucideIcon, Megaphone, Network, ShieldCheck, Sliders,
    Sparkles, Star, Target, TrendingUp, Trophy, Users, Wrench, Zap,
} from 'lucide-react';

/**
 * Every icon the department admin offers (Admin\DepartmentController::manage
 * `iconOptions`). Public department pages resolve stored icon names here so an
 * icon picked in the admin always renders.
 */
export const DEPT_ICONS: Record<string, LucideIcon> = {
    GraduationCap, Users, Building2, Handshake, Sparkles, Target, Eye, Cpu, BookOpen, Award, Briefcase,
    FlaskConical, Globe, Lightbulb, Layers, Trophy, ShieldCheck, Code, Star, Zap, Heart, Coffee, Megaphone,
    Flame, Wrench, Bot, TrendingUp, Network, Activity, Sliders,
};

export function deptIcon(name: string | null | undefined, fallback: LucideIcon = Sparkles): LucideIcon {
    return (name && DEPT_ICONS[name]) || fallback;
}

/** Text a focal point set on the admin "Page Texts" tab, or the page's default. */
export function pageText(department: object | null | undefined, key: string, fallback: string): string {
    const texts = (department as { page_texts?: Record<string, string> | null } | null | undefined)?.page_texts;

    return texts?.[key]?.trim() || fallback;
}
