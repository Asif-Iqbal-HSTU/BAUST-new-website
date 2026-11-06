// Shared configuration for the CSE department pages

export const CSE_BASE_PATH = '/cse';

export const CSE_TABS = [
    { name: 'Home', href: `${CSE_BASE_PATH}` },
    {
        name: 'About',
        children: [
            { name: 'About CSE', href: `${CSE_BASE_PATH}/about` },
            { name: 'Vision & Mission', href: `${CSE_BASE_PATH}/vision-mission` },
        ]
    },
    {
        name: 'People',
        children: [
            { name: 'Faculty Members', href: `${CSE_BASE_PATH}/faculty` },
            { name: 'Academic Staff', href: `${CSE_BASE_PATH}/academic-staff` },
        ]
    },
    { name: 'Curriculum', href: `${CSE_BASE_PATH}/curriculum` },
    { name: 'Laboratories', href: `${CSE_BASE_PATH}/laboratories` },
    { name: 'Alumni', href: `${CSE_BASE_PATH}/alumni` },
    { name: 'Events', href: `${CSE_BASE_PATH}/events` },
    {
        name: 'Research',
        children: [
            { name: 'Publications', href: '/research#publications' },
            { name: 'Research Areas', href: '/research#projects' }
        ]
    },
    { name: 'Achievements', href: `${CSE_BASE_PATH}/achievements` },
    { name: 'CSE Society of BAUST', href: `${CSE_BASE_PATH}/cse-society` },
];

export const CSE_DEPT_NAME = 'Department of Computer Science and Engineering (CSE)';

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
    biography?: string | null;
    experience?: string | null;
    research?: string | null;
    publications?: string | null;
    achievements?: string | null;
    seminars?: string | null;
    training?: string | null;
    others?: string | null;
    areas_of_interest?: string[] | string | null;
    specialization?: string | null;
    order?: number;
    department?: string;
    type: 'permanent' | 'contractual' | 'adjunct';
    employment_type: 'faculty' | 'staff';
    status: 'active' | 'study_leave' | 'maternity_leave' | 'ex_faculty' | string;
    category: string | null;
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
