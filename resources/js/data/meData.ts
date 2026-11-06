// Shared configuration for the ME department pages

export const ME_BASE_PATH = '/me';

export const ME_TABS = [
    { name: 'Home', href: `${ME_BASE_PATH}` },
    {
        name: 'About',
        children: [
            { name: 'About ME', href: `${ME_BASE_PATH}/about` },
            { name: 'Vision & Mission', href: `${ME_BASE_PATH}/vision-mission` },
        ]
    },
    {
        name: 'People',
        children: [
            { name: 'Faculty Members', href: `${ME_BASE_PATH}/faculty` },
            { name: 'Academic Staff', href: `${ME_BASE_PATH}/academic-staff` },
        ]
    },
    { name: 'Curriculum', href: `${ME_BASE_PATH}/curriculum` },
    { name: 'Laboratories', href: `${ME_BASE_PATH}/laboratories` },
    { name: 'Online Resources', href: `${ME_BASE_PATH}/online-resources` },
    { name: 'Alumni', href: `${ME_BASE_PATH}/alumni` },
    { name: 'Events', href: `${ME_BASE_PATH}/events` },
    { name: 'Achievements', href: `${ME_BASE_PATH}/achievements` },
    { name: 'ME Society of BAUST', href: `${ME_BASE_PATH}/me-society` },
];

export const ME_DEPT_NAME = 'Department of Mechanical Engineering (ME)';

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
