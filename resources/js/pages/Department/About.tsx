import React from 'react';
import DeptPageShell from '@/custom_components/DeptPageShell';
import { DeptPageProps, StatItem, deptShort } from '@/data/departmentData';

interface Props extends DeptPageProps {
    stats?: StatItem[];
}

export default function DepartmentAbout({ department, tabs, stats = [] }: Props) {
    const short = deptShort(department);
    const aboutParagraphs = (department.about || '').split('\n\n').filter(Boolean);

    return (
        <DeptPageShell department={department} tabs={tabs} activeTab={`About ${short}`} title={`About ${short}`}>
            <main className="flex-grow w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                    <div className="p-8 lg:p-14">

                        {/* Section Title */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{department.name}</h2>
                                {department.faculty && <p className="text-sm text-gray-500 mt-0.5">{department.faculty}</p>}
                            </div>
                        </div>

                        <div className="space-y-5 text-gray-600 leading-8 text-[16px] text-justify">
                            {aboutParagraphs.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}
                        </div>

                        {/* Quick Stats */}
                        {stats.length > 0 && (
                            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {stats.map((stat, idx) => (
                                    <div key={stat.id ?? idx} className="text-center p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100/50">
                                        <p className="text-2xl font-extrabold text-emerald-700">{stat.value}</p>
                                        <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </DeptPageShell>
    );
}
