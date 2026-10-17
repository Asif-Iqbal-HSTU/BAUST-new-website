// Shared configuration for the IPE department pages

export const IPE_BASE_PATH = '/ipe';

export const IPE_TABS = [
    { name: 'Home', href: `${IPE_BASE_PATH}` },
    {
        name: 'About',
        children: [
            { name: 'About IPE', href: `${IPE_BASE_PATH}/about` },
            { name: 'Vision & Mission', href: `${IPE_BASE_PATH}/vision-mission` },
        ]
    },
    {
        name: 'People',
        children: [
            { name: 'Faculty Members', href: `${IPE_BASE_PATH}/faculty` },
            { name: 'Academic Staff', href: `${IPE_BASE_PATH}/academic-staff` },
        ]
    },
    { name: 'Curriculum', href: `${IPE_BASE_PATH}/curriculum` },
    {
        name: 'Laboratories',
        children: [
            { name: 'Machine Shop and Production Process Lab', href: `${IPE_BASE_PATH}/laboratories/production-process-lab` },
            { name: 'Foundry and Welding Shop', href: `${IPE_BASE_PATH}/laboratories/simulation-lab` },
            { name: 'Engineering Drawing Lab', href: `${IPE_BASE_PATH}/laboratories/engineering-drawing-lab` },
            { name: 'CAD and Simulation Lab', href: `${IPE_BASE_PATH}/laboratories/cad-cam-lab` },
            { name: 'Materials Handling & Maintenance Engineering Lab', href: `${IPE_BASE_PATH}/laboratories/machine-tool-lab` },
            { name: 'Ergonomics & Safety Management Lab', href: `${IPE_BASE_PATH}/laboratories/ergonomics-safety-management-lab` },
            { name: 'Measurement, Instrumentation and Quality Control Lab', href: `${IPE_BASE_PATH}/laboratories/measurement-quality-control-lab` },
            { name: 'Metallurgy Lab', href: `${IPE_BASE_PATH}/laboratories/metrology-lab` },
            { name: 'Strength of Materials Lab', href: `${IPE_BASE_PATH}/laboratories/strength-of-materials-lab` },
            { name: 'Mechanics of Machinery Lab', href: `${IPE_BASE_PATH}/laboratories/mechanics-of-machinery-lab` },
            { name: 'Fluid Mechanics and Machinery Lab', href: `${IPE_BASE_PATH}/laboratories/fluid-mechanics-and-machinery-lab` },
            { name: 'Thermodynamics & Heat Transfer Lab', href: `${IPE_BASE_PATH}/laboratories/thermodynamics-heat-transfer-lab` },
        ]
    },
    { name: 'Online Resources', href: `${IPE_BASE_PATH}/online-resources` },
    { name: 'Alumni', href: `${IPE_BASE_PATH}/alumni` },
    { name: 'Events', href: `${IPE_BASE_PATH}/events` },
    { name: 'Achievements', href: `${IPE_BASE_PATH}/achievements` },
    { name: 'IPE Society of BAUST', href: `${IPE_BASE_PATH}/ipe-society` },
];

export const IPE_DEPT_NAME = 'Department of Industrial and Production Engineering (IPE)';

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
    { date: '21', month: 'Feb', title: 'Publication of Results Summer 2025 (Regular) and Winter 2025 (Special)' },
    { date: '07', month: 'Feb', title: 'Final Examination Result of Summer 2025 (Regular) and Winter 2025 (Special)' },
    { date: '22', month: 'Jan', title: 'Seminar on Supply Chain Management & Industry 4.0 Applications' },
    { date: '15', month: 'Jan', title: 'Industrial Tour to Walton Hi-Tech Industries PLC' },
    { date: '05', month: 'Jan', title: 'Lean Six Sigma Green Belt Certification Workshop' },
];
//
