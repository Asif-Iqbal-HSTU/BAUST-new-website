import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import DeptLabsBrowser, { type DeptLab } from '@/custom_components/DeptLabsBrowser';
import { CE_TABS, CE_DEPT_NAME } from '@/data/ceData';
import { pageText } from '@/lib/dept-icons';

interface Props {
    department?: { name: string; short_name: string; slug?: string; page_texts?: Record<string, string> | null } | null;
    lab?: DeptLab | null;
    allLabs?: DeptLab[];
    labSlug?: string | null;
}

export default function CeLaboratories({ department, lab, allLabs = [] }: Props) {
    const shortName = department?.short_name || 'CE';

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${lab?.name || 'Laboratories'} - ${shortName} - BAUST`} />
            <Navbar />
            <PageHero
                title={department?.name || "Department of Civil Engineering (CE)"}
                subtitle={pageText(department, 'labs_subtitle', `${allLabs.length} Specialized Laboratories & Testing Facilities`)}
                compact={true}
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Laboratories" tabs={CE_TABS} />
            <DeptLabsBrowser
                labs={allLabs}
                lab={lab}
                basePath="/ce/laboratories"
                shortName={shortName}
                intro={pageText(department, 'labs_intro', '')}
            />
            <Footer />
        </div>
    );
}
