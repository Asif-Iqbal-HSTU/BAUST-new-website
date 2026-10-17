// Shared shapes for the DB-driven department pages (resources/js/pages/Department),
// which mirror the CSE pages so every department has the same layout.
export type { FacultyMember } from '@/data/cseData';

export interface DeptTab {
    name: string;
    href?: string;
    children?: { name: string; href: string }[];
}

export interface DeptInfo {
    id: number;
    slug: string;
    name: string;
    short_name: string;
    faculty?: string | null;
    tagline?: string | null;
    established?: string | null;
    about?: string | null;
    vision?: string | null;
    mission?: string | null;
    hod_name?: string | null;
    hod_designation?: string | null;
    hod_photo?: string | null;
    hod_message?: string | null;
    accreditation_badge?: string | null;
    accreditation_title?: string | null;
    accreditation_text?: string | null;
}

/** Props every department page receives from DepartmentController::page(). */
export interface DeptPageProps {
    department: DeptInfo;
    tabs: DeptTab[];
}

export interface StatItem {
    id?: number;
    value: string;
    label: string;
}

export function deptShort(d: DeptInfo): string {
    return d.short_name || d.slug.toUpperCase();
}

export function deptBase(d: DeptInfo): string {
    return `/${d.slug}`;
}

/** Name of the department's student society tab, if it has one (last tab when present). */
export function societyTab(tabs: DeptTab[], d: DeptInfo): DeptTab | undefined {
    return tabs.find((t) => t.href === `${deptBase(d)}/clubs`);
}

export function avatarUrl(name: string, size = 128, bg = '059669'): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff&size=${size}&font-size=0.33`;
}
