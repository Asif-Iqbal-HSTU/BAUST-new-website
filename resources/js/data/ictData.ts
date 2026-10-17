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

export const NOTICES = [
    { date: '19', month: 'Feb', title: 'Joyful Celebration of 10th Raising Day & Pitha Utshab by the ICT Department' },
    { date: '05', month: 'Feb', title: 'Publication of Results Summer 2025 (Regular) and Winter 2025 (Special)' },
    { date: '14', month: 'Jan', title: 'Final Examination Result of Summer 2025 (Regular) and Winter 2025 (Special)' },
    { date: '27', month: 'Jan', title: 'Publication of Results Summer 2024 (ICT)' },
    { date: '13', month: 'Jun', title: 'Publication of Results Final Winter 2024 (ICT)' },
];
