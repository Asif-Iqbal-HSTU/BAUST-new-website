// Shared configuration for the Department of Business Administration (DBA) pages

export const DBA_BASE_PATH = '/dba';

export const DBA_TABS = [
    { name: 'Home', href: `${DBA_BASE_PATH}` },
    {
        name: 'About',
        children: [
            { name: 'About DBA', href: `${DBA_BASE_PATH}/about` },
            { name: 'Vision & Mission', href: `${DBA_BASE_PATH}/vision-mission` },
        ]
    },
    {
        name: 'People',
        children: [
            { name: 'Faculty Members', href: `${DBA_BASE_PATH}/faculty` },
            { name: 'Academic Staff', href: `${DBA_BASE_PATH}/academic-staff` },
        ]
    },
    { name: 'Curriculum', href: `${DBA_BASE_PATH}/curriculum` },
    {
        name: 'Facilities',
        children: [
            { name: 'Smart Classrooms', href: `${DBA_BASE_PATH}/facilities/smart-classrooms` },
            { name: 'Computer & Business Analytics Lab', href: `${DBA_BASE_PATH}/facilities/computer-business-analytics-lab` },
            { name: 'Seminar Library & Case Study Room', href: `${DBA_BASE_PATH}/facilities/seminar-library` }
        ]
    },
    { name: 'Events', href: `${DBA_BASE_PATH}/events` },
    {
        name: 'Research',
        children: [
            { name: 'Publications', href: `${DBA_BASE_PATH}/research/publications` },
            { name: 'Research & Theses', href: `${DBA_BASE_PATH}/research/projects` }
        ]
    },
    { name: 'DBA Achievers', href: `${DBA_BASE_PATH}/achievements` },
    { name: 'Online Education', href: `${DBA_BASE_PATH}/online-resources` },
    { name: 'Alumni', href: `${DBA_BASE_PATH}/alumni` },
    { name: 'Business Club', href: `${DBA_BASE_PATH}/clubs` },
];

export const DBA_DEPT_NAME = 'Department of Business Administration (DBA)';

export interface FacultyMember {
    id: number;
    name: string;
    designation: string;
    is_head?: boolean;
    photo: string | null;
    phone?: string | null;
    email?: string | null;
    personal_email?: string | null;
    education?: string[];
    type: 'permanent' | 'contractual' | 'adjunct';
    employment_type: 'faculty' | 'staff';
    status: 'active' | 'study_leave' | 'ex_faculty' | string;
    category?: string | null;
    order?: number;
}
