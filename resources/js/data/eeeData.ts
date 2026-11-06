// Shared configuration for the EEE department pages

export const EEE_BASE_PATH = '/eee';

export const EEE_TABS = [
    { name: 'Home', href: `${EEE_BASE_PATH}` },
    {
        name: 'About',
        children: [
            { name: 'About EEE', href: `${EEE_BASE_PATH}/about` },
            { name: 'Vision & Mission', href: `${EEE_BASE_PATH}/vision-mission` },
        ]
    },
    {
        name: 'People',
        children: [
            { name: 'Faculty Members', href: `${EEE_BASE_PATH}/faculty` },
            { name: 'Academic Staff', href: `${EEE_BASE_PATH}/academic-staff` },
        ]
    },
    { name: 'Curriculum', href: `${EEE_BASE_PATH}/curriculum` },
    { name: 'Laboratories', href: `${EEE_BASE_PATH}/laboratories` },
    { name: 'Events', href: `${EEE_BASE_PATH}/events` },
    { name: 'Achievements', href: `${EEE_BASE_PATH}/achievements` },
    { name: 'Alumni', href: `${EEE_BASE_PATH}/alumni` },
    { name: 'EEE Society of BAUST', href: `${EEE_BASE_PATH}/eee-society` },
];

export const EEE_DEPT_NAME = 'Department of Electrical and Electronic Engineering (EEE)';

export interface FacultyMember {
    id: number;
    name: string;
    designation: string;
    is_head?: boolean;
    photo: string | null;
    phone?: string | null;
    email?: string | null;
    personal_email?: string | null;
    education?: string[] | null;
    type: 'permanent' | 'contractual' | 'adjunct';
    employment_type: 'faculty' | 'staff';
    status: 'active' | 'study_leave' | 'maternity_leave' | 'ex_faculty' | string;
    category: string | null;
    order?: number;
    biography?: string | null;
    experience?: string | null;
    research_interests?: string | null;
    publications?: string | null;
    department?: string;
}
