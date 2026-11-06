import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import DeptLabsBrowser, { type DeptLab } from '@/custom_components/DeptLabsBrowser';
import { IPE_TABS, IPE_DEPT_NAME } from '@/data/ipeData';
import { pageText } from '@/lib/dept-icons';

interface Props {
    department?: { name: string; short_name: string; slug?: string; page_texts?: Record<string, string> | null } | null;
    lab?: DeptLab | null;
    allLabs?: DeptLab[];
    labSlug?: string | null;
}

/** Seeded IPE photos live under /images/departments/ipe/laboratory/. */
function normalizeImage(src: string): string {
    return src.startsWith('/images/ipe/laboratories/')
        ? src.replace('/images/ipe/laboratories/', '/images/departments/ipe/laboratory/')
        : src;
}

export default function IpeLaboratory({ department, lab, allLabs = [] }: Props) {
    const shortName = department?.short_name || 'IPE';

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`${lab?.name || 'Laboratories'} - ${shortName} - BAUST`} />
            <Navbar />
            <PageHero
                title={lab?.name || 'Laboratories'}
                subtitle={pageText(department, 'labs_subtitle', 'Hands-on Learning in State-of-the-Art Industrial & Production Facilities')}
                compact={true}
            />
            <DeptSubNav departmentName={department?.name || IPE_DEPT_NAME} activeTab="Laboratories" tabs={IPE_TABS} />
            <DeptLabsBrowser
                labs={allLabs}
                lab={lab}
                basePath="/ipe/laboratories"
                shortName={shortName}
                intro={pageText(department, 'labs_intro', '')}
                imageSrc={normalizeImage}
            />
            <Footer />
        </div>
    );
}
