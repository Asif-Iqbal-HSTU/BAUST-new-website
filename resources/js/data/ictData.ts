// Shared configuration for the ICT department pages

export const ICT_BASE_PATH = '/ict';

export const ICT_TABS = [
    { name: 'Home', href: `${ICT_BASE_PATH}` },
    {
        name: 'About',
        children: [
            { name: 'About ICT', href: `${ICT_BASE_PATH}/about` },
            { name: 'Vision & Mission', href: `${ICT_BASE_PATH}/vision-mission` },
        ]
    },
    {
        name: 'People',
        children: [
            { name: 'Faculty Members', href: `${ICT_BASE_PATH}/faculty` },
            { name: 'Academic Staff', href: `${ICT_BASE_PATH}/academic-staff` },
        ]
    },
    { name: 'Curriculum', href: `${ICT_BASE_PATH}/curriculum` },
    { name: 'Laboratories', href: `${ICT_BASE_PATH}/laboratories` },
    { name: 'Events', href: `${ICT_BASE_PATH}/events` },
    { name: 'Research', href: `${ICT_BASE_PATH}/research` },
    { name: 'Achievements', href: `${ICT_BASE_PATH}/achievements` },
    { name: 'Alumni', href: `${ICT_BASE_PATH}/alumni` },
    { name: 'ICT Society', href: `${ICT_BASE_PATH}/ict-society` },
];

export const ICT_DEPT_NAME = 'Department of Information and Communication Technology (ICT)';

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
    biography?: string | null;
    experience?: string | null;
    research_interests?: string | null;
    publications?: string | null;
    department?: string;
}

/** Department profile row (`departments` table) as passed by the controller. */
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
    page_texts?: Record<string, string> | null;
}
