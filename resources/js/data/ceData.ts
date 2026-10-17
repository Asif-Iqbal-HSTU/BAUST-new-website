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
    {
        name: 'Clubs',
        children: [
            { name: 'CEIC Club', href: `${CE_BASE_PATH}/clubs/ceic` },
            { name: 'ESC Club', href: `${CE_BASE_PATH}/clubs/esc` },
        ]
    },
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

export const NOTICES = [
    { date: '18', month: 'Jul', title: 'Publication of Results Summer 2025 (Regular) and Winter 2025 (Special)' },
    { date: '28', month: 'Jun', title: 'Building Future Engineers: Thesis Pre-Defense Session Held at BAUST Civil Engineering Department' },
    { date: '20', month: 'Jun', title: 'BAUST Creative Minds Expo 2.0: Inspiring Innovation for a Sustainable Future' },
    { date: '15', month: 'Jun', title: 'Board Viva Organized by Department of Civil Engineering, BAUST, Saidpur' },
    { date: '10', month: 'Jun', title: 'Prize Giving Ceremony of AutoCAD & Waste to Wealth Competitions Successfully Held' },
    { date: '05', month: 'Jun', title: 'Seminar on Earthquake Risk & Mitigation Measures Held at Department of Civil Engineering' },
];
