import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import DeptLabsBrowser, { type DeptLab } from '@/custom_components/DeptLabsBrowser';
import { EEE_TABS, EEE_DEPT_NAME } from '@/data/eeeData';
import { pageText } from '@/lib/dept-icons';

interface Props {
    department?: { name: string; short_name: string; slug?: string; page_texts?: Record<string, string> | null } | null;
    lab?: DeptLab | null;
    allLabs?: DeptLab[];
    labSlug?: string | null;
}

export default function EeeLaboratory({ department, lab, allLabs = [] }: Props) {
    const shortName = department?.short_name || 'EEE';

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Laboratories - ${shortName} - BAUST`} />
            <Navbar />
            <PageHero
                title={`${shortName} Laboratory Facilities`}
                subtitle={pageText(department, 'labs_subtitle', "High-Voltage, Electronics, Machines & Computational Engineering Laboratories")}
                compact={true}
            />
            <DeptSubNav departmentName={department?.short_name || EEE_DEPT_NAME} activeTab="Laboratories" tabs={EEE_TABS} />
            <DeptLabsBrowser
                labs={allLabs}
                lab={lab}
                basePath="/eee/laboratories"
                shortName={shortName}
                intro={pageText(department, 'labs_intro', `The ${department?.name || 'Department of Electrical and Electronic Engineering'} at BAUST houses ${allLabs.length} state-of-the-art engineering laboratories. Designed to bridge the gap between classroom theory and real-world implementation, these facilities empower students with hardware debugging, high-voltage testing, and advanced simulation competencies.`)}
            />
            <Footer />
        </div>
    );
}
