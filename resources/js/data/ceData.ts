// Shared configuration for the CE department pages

export const CE_BASE_PATH = '/ce';

export const CE_TABS = [
    { name: 'Home', href: `${CE_BASE_PATH}` },
    {
        name: 'About',
        children: [
            { name: 'About CE', href: `${CE_BASE_PATH}/about` },
            { name: 'Vision & Mission', href: `${CE_BASE_PATH}/vision-mission` },
        ]
    },
    {
        name: 'People',
        children: [
            { name: 'Faculty Members', href: `${CE_BASE_PATH}/faculty` },
            { name: 'Academic Staff', href: `${CE_BASE_PATH}/academic-staff` },
        ]
    },
    { name: 'Curriculum', href: `${CE_BASE_PATH}/curriculum` },
    { name: 'Laboratories', href: `${CE_BASE_PATH}/laboratories` },
    { name: 'Events', href: `${CE_BASE_PATH}/events` },
    {
        name: 'Research',
        children: [
            { name: 'Publications', href: `${CE_BASE_PATH}/research/publications` },
            { name: 'Thesis Projects', href: `${CE_BASE_PATH}/research/thesis-projects` },
        ]
    },
    { name: 'Achievements', href: `${CE_BASE_PATH}/achievements` },
    {
        name: 'Alumni',
        children: [
            { name: 'Alumni Information', href: `${CE_BASE_PATH}/alumni/information` },
            { name: 'Alumni Association', href: `${CE_BASE_PATH}/alumni/association` },
        ]
    },
    { name: 'Clubs', href: `${CE_BASE_PATH}/clubs` },
    { name: 'Student Voice', href: `${CE_BASE_PATH}/student-voice` },
    {
        name: 'Gallery',
        children: [
            { name: 'Photos', href: `${CE_BASE_PATH}/gallery/photos` },
            { name: 'Videos', href: `${CE_BASE_PATH}/gallery/videos` },
        ]
    },
    { name: 'Online Resources', href: `${CE_BASE_PATH}/online-resources` },
];

export const CE_DEPT_NAME = 'Department of Civil Engineering (CE)';

export interface FacultyMember {
    id: number;
    name: string;
    designation: string;
    is_head?: boolean;
    photo: string | null;
    phone?: string | null;
    email?: string | null;
    personal_email?: string | null;
    education: string[];
    type: 'permanent' | 'contractual' | 'adjunct';
    employment_type: 'faculty' | 'staff';
    status: 'active' | 'study_leave' | 'ex_faculty' | string;
    category: string | null;
    order?: number;
    areas_of_interest?: string[] | string | null;
    specialization?: string | null;
    biography?: string | null;
    experience?: string | null;
    research?: string | null;
    publications?: string | null;
    achievements?: string | null;
    seminars?: string | null;
    training?: string | null;
    others?: string | null;
}

export interface SocietyActivity {
    title: string;
    icon?: string | null;
    description?: string | null;
}

export interface SocietyCommitteeMember {
    role?: string | null;
    name: string;
    designation?: string | null;
    image?: string | null;
}

export interface SocietyData {
    id?: number;
    name: string;
    slug: string;
    type: 'society' | 'club' | 'alumni' | string;
    description?: string | null;
    member_count?: string | null;
    established?: string | null;
    committee_pdf?: string | null;
    activities?: (SocietyActivity | string)[] | null;
    committee?: SocietyCommitteeMember[] | null;
}

/** Activities are `{title, icon, description}` from the admin; older seeds stored plain strings. */
export function societyActivities(society?: SocietyData | null): SocietyActivity[] {
    return (society?.activities ?? [])
        .map(a => (typeof a === 'string' ? { title: a } : a))
        .filter(a => a && a.title);
}

export interface AlumniPerson {
    id: number;
    type: 'job_holder' | 'higher_study';
    name: string;
    batch?: string | null;
    passing_year?: string | null;
    designation?: string | null;
    organization?: string | null;
    image?: string | null;
}

export interface AchievementItem {
    id?: number;
    title: string;
    type?: string | null;
    icon?: string | null;
    color?: string | null;
    description?: string | null;
    details?: string | null;
    team_title?: string | null;
    team_members?: { name: string; batch?: string | null }[] | null;
    link?: string | null;
}

/** Static class map for the admin's achievement colours (Tailwind needs literal class names). */
export const ACHIEVEMENT_COLORS: Record<string, { badge: string; icon: string; border: string }> = {
    emerald: { badge: 'bg-emerald-100 text-emerald-800', icon: 'bg-emerald-50 text-emerald-600', border: 'hover:border-emerald-200' },
    blue: { badge: 'bg-blue-100 text-blue-800', icon: 'bg-blue-50 text-blue-600', border: 'hover:border-blue-200' },
    purple: { badge: 'bg-purple-100 text-purple-800', icon: 'bg-purple-50 text-purple-600', border: 'hover:border-purple-200' },
    amber: { badge: 'bg-amber-100 text-amber-800', icon: 'bg-amber-50 text-amber-600', border: 'hover:border-amber-200' },
    pink: { badge: 'bg-pink-100 text-pink-800', icon: 'bg-pink-50 text-pink-600', border: 'hover:border-pink-200' },
    rose: { badge: 'bg-rose-100 text-rose-800', icon: 'bg-rose-50 text-rose-600', border: 'hover:border-rose-200' },
    indigo: { badge: 'bg-indigo-100 text-indigo-800', icon: 'bg-indigo-50 text-indigo-600', border: 'hover:border-indigo-200' },
};

export function achievementColor(color?: string | null) {
    return ACHIEVEMENT_COLORS[color ?? ''] ?? ACHIEVEMENT_COLORS.emerald;
}
