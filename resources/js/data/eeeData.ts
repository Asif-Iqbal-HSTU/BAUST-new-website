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
    { date: '19', month: 'Feb', title: 'Publication of Results Summer 2025 (Regular) and Winter 2025 (Special)' },
    { date: '05', month: 'Feb', title: 'Final Examination Result of Summer 2025 (Regular) and Winter 2025 (Special)' },
    { date: '25', month: 'Jan', title: ' বাউস্ট, ইইই বিভাগের ৬ষ্ঠ, ৭ম ব্যাচের শিক্ষার্থীরা সৈয়দপুর রেলওয়ে ওয়ার্কসপে শিক্ষাসফর' },
    { date: '12', month: 'Jan', title: 'Solar Photovoltaic Systems for Sustainable Development in Bangladesh' },
    { date: '08', month: 'Jan', title: 'Prospect of Antenna Research' },
];
