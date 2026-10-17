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
    {
        name: 'Laboratories',
        children: [
            { name: 'Strength of Materials Lab', href: `${ME_BASE_PATH}/laboratories/strength-of-materials-lab` },
            { name: 'Mechanics of Machinery Lab', href: `${ME_BASE_PATH}/laboratories/mechanics-of-machinery-lab` },
            { name: 'Thermodynamics Lab', href: `${ME_BASE_PATH}/laboratories/thermodynamics-lab` },
            { name: 'Heat Engine Lab', href: `${ME_BASE_PATH}/laboratories/heat-engine-lab` },
            { name: 'Heat Transfer Lab', href: `${ME_BASE_PATH}/laboratories/heat-transfer-lab` },
            { name: 'Refrigeration and Air Conditioning Lab', href: `${ME_BASE_PATH}/laboratories/refrigeration-and-air-conditioning-lab-2` },
            { name: 'Fluid Mechanics and Machinery Lab', href: `${ME_BASE_PATH}/laboratories/fluid-mechanics-and-machinery-lab` },
            { name: 'CAD & Simulation Lab', href: `${ME_BASE_PATH}/laboratories/cad-and-simulation-lab` },
            { name: 'Machine Shop and Production Process Lab', href: `${ME_BASE_PATH}/laboratories/machine-shop-and-production-process-lab-2` },
            { name: 'Welding Shop', href: `${ME_BASE_PATH}/laboratories/welding-shop-2` },
            { name: 'Foundry Shop', href: `${ME_BASE_PATH}/laboratories/foundry-shop` },
            { name: 'Measurement and Instrumentation Lab', href: `${ME_BASE_PATH}/laboratories/measurement-and-instrumentation-lab-2` },
            { name: 'Materials and Metallurgy Lab', href: `${ME_BASE_PATH}/laboratories/materials-and-metallurgy-lab` },
            { name: 'Drawing Lab', href: `${ME_BASE_PATH}/laboratories/drawing-lab-2` },
        ]
    },
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
    { date: '20', month: 'Feb', title: 'Publication of Results Summer 2025 (Regular) and Winter 2025 (Special)' },
    { date: '06', month: 'Feb', title: 'Final Examination Result of Summer 2025 (Regular) and Winter 2025 (Special)' },
    { date: '18', month: 'Jan', title: 'Workshop on Advanced SolidWorks 3D Modeling and CFD Analysis' },
    { date: '10', month: 'Jan', title: 'Industrial Visit of 8th Batch ME Students to Barapukuria Coal Power Plant' },
    { date: '04', month: 'Jan', title: 'Orientation Program for Spring 2026 Batch of ME Department' },
];
