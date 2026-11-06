import React from 'react';
import DeptPageShell from '@/custom_components/DeptPageShell';
import DeptLabsBrowser, { type DeptLab } from '@/custom_components/DeptLabsBrowser';
import { DeptInfo, DeptPageProps, deptBase, deptShort } from '@/data/departmentData';
import { pageText } from '@/lib/dept-icons';

interface Props extends DeptPageProps {
    department: DeptInfo & { page_texts?: Record<string, string> | null };
    lab?: DeptLab | null;
    allLabs?: DeptLab[];
    labSlug: string;
}

export default function DepartmentFacilities({ department, tabs, lab, allLabs = [] }: Props) {
    const short = deptShort(department);

    return (
        <DeptPageShell
            department={department}
            tabs={tabs}
            activeTab={lab?.name ?? 'Facilities'}
            title={`${lab?.name ?? 'Facilities'} - ${short}`}
            heroTitle={lab?.name ?? `${short} Facilities`}
            heroSubtitle={pageText(department, 'labs_subtitle', 'Hands-on Learning in State-of-the-Art Facilities')}
        >
            <DeptLabsBrowser
                labs={allLabs}
                lab={lab}
                basePath={`${deptBase(department)}/facilities`}
                shortName={short}
                intro={pageText(department, 'labs_intro', '')}
            />
        </DeptPageShell>
    );
}
