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
    {
        name: 'Laboratories',
        children: [
            { name: 'Computer Programming and Operating system Lab', href: `${CSE_BASE_PATH}/laboratories/programming-os` },
            { name: 'Database and Data warehouse Lab', href: `${CSE_BASE_PATH}/laboratories/database` },
            { name: 'Digital and Embedded System Lab', href: `${CSE_BASE_PATH}/laboratories/digital-embedded` },
            { name: 'Network and Hardware Lab', href: `${CSE_BASE_PATH}/laboratories/network-hardware` },
            { name: 'Microprocessor and Interfacing Lab', href: `${CSE_BASE_PATH}/laboratories/microprocessor` }
        ]
    },
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
    status: 'active' | 'study_leave' | 'ex_faculty' | string;
    category: string | null;
}

export const NOTICES = [
    { date: '08', month: 'Feb', title: 'Publication of Results Summer 2025 (Regular) and Winter 2025 (Special)' },
    { date: '14', month: 'Jan', title: 'Final Examination Result of Summer 2025 (Regular) and Winter 2025 (Special)' },
    { date: '06', month: 'May', title: 'Seminar on "Shedding Light on the Black Box: The Role of Explainability in Machine Learning"' },
    { date: '27', month: 'Jun', title: 'Publication of Results Summer 2024 (CSE)' },
    { date: '29', month: 'Sep', title: 'Syllabus 2021_Course Leaflet' },
];
