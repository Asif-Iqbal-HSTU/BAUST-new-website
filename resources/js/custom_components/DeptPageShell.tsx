import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import type { DeptInfo, DeptTab } from '@/data/departmentData';

const GREEN_WASH = 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)';

interface Props {
    department: DeptInfo;
    tabs: DeptTab[];
    activeTab: string;
    title: string;
    heroTitle?: string;
    heroSubtitle?: string | null;
    background?: string;
    /** Rendered after the footer (modals). */
    overlay?: React.ReactNode;
    children: React.ReactNode;
}

/** Page chrome shared by all department pages - identical to the CSE pages. */
export default function DeptPageShell({ department, tabs, activeTab, title, heroTitle, heroSubtitle = null, background = GREEN_WASH, overlay, children }: Props) {
    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background }}>
            <Head title={`${title} - BAUST`} />
            <Navbar />
            <PageHero title={heroTitle || department.name} subtitle={heroSubtitle} compact={true} />
            <DeptSubNav departmentName={department.name} activeTab={activeTab} tabs={tabs} />
            {children}
            <Footer />
            {overlay}
        </div>
    );
}
