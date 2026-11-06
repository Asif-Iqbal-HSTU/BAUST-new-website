import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/custom_components/Navbar';
import Footer from '@/custom_components/Footer';
import PageHero from '@/custom_components/PageHero';
import DeptSubNav from '@/custom_components/DeptSubNav';
import { CE_TABS, CE_DEPT_NAME, AlumniPerson } from '@/data/ceData';
import { Briefcase, GraduationCap, Search } from 'lucide-react';
import { pageText } from '@/lib/dept-icons';

type Alumnus = AlumniPerson;

interface DeptInfo {
    id: number;
    name: string;
    short_name: string;
    slug: string;
    page_texts?: Record<string, string> | null;
}

interface Props {
    department?: DeptInfo | null;
    jobHolders: Alumnus[];
    higherStudies: Alumnus[];
}

export default function CeAlumniInfo({ department, jobHolders = [], higherStudies = [] }: Props) {
    const [activeSection, setActiveSection] = useState<'all' | 'job_holders' | 'higher_studies'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filterAlumni = (list: Alumnus[]) => {
        return list.filter(a =>
            a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (a.batch && a.batch.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (a.designation && a.designation.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (a.organization && a.organization.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (a.passing_year && a.passing_year.includes(searchTerm))
        );
    };

    const filteredJobs = filterAlumni(jobHolders);
    const filteredStudies = filterAlumni(higherStudies);
    const shortName = department?.short_name || 'CE';

    const renderName = (item: Alumnus, bg: string) => {
        const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=${bg}&color=fff&size=64`;
        return (
            <div className="flex items-center gap-3">
                <img
                    src={item.image || avatar}
                    alt={item.name}
                    className="w-9 h-9 rounded-full object-cover object-top flex-shrink-0 bg-gray-100"
                    onError={(e) => { e.currentTarget.src = avatar; }}
                />
                <span>{item.name}</span>
            </div>
        );
    };

    const renderPosition = (item: Alumnus) => (
        <>
            {item.designation && <span className="block">{item.designation}</span>}
            {item.organization && <span className="block text-xs text-gray-500">{item.organization}</span>}
            {!item.designation && !item.organization && '—'}
        </>
    );

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
            <Head title={`Alumni Information - ${department?.short_name || 'CE'} - BAUST`} />
            <Navbar />
            <PageHero 
                title="Alumni Information" 
                subtitle={pageText(department, 'alumni_subtitle', `Celebrating the Professional Careers & Global Academic Pathways of BAUST ${shortName} Graduates`)} 
                compact={true} 
            />
            <DeptSubNav departmentName={department?.short_name || CE_DEPT_NAME} activeTab="Alumni" tabs={CE_TABS} />

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
                
                {/* Header Card */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    <div className="relative z-10 max-w-3xl">
                        <span className="bg-emerald-500/30 text-emerald-200 text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-400/20">
                            Graduate Outcomes
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black mt-4 leading-tight">
                            Alumni Career & Higher Studies Directory
                        </h2>
                        <p className="text-emerald-100/90 text-sm sm:text-base mt-4 leading-relaxed text-justify">
                            {pageText(department, 'alumni_intro', 'Our graduates excel as structural engineers, project managers, and researchers in renowned multinational organizations like Abdul Monem Limited, EIMS, ACI, and prestigious universities worldwide.')}
                        </p>
                    </div>
                </div>

                {/* Filter and Search */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text"
                            placeholder="Search alumni by name, batch, role, or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setActiveSection('all')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                activeSection === 'all'
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            All ({jobHolders.length + higherStudies.length})
                        </button>
                        <button
                            onClick={() => setActiveSection('job_holders')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                activeSection === 'job_holders'
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Job Holders ({jobHolders.length})
                        </button>
                        <button
                            onClick={() => setActiveSection('higher_studies')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                activeSection === 'higher_studies'
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Higher Studies ({higherStudies.length})
                        </button>
                    </div>
                </div>

                {/* Section 1: Job Holders */}
                {(activeSection === 'all' || activeSection === 'job_holders') && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
                        <div className="p-6 sm:p-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Alumni in Industry & Employment</h3>
                                    <p className="text-xs text-gray-500">Graduates employed in top construction, infrastructure, and engineering firms</p>
                                </div>
                            </div>

                            <div className="overflow-x-auto rounded-2xl border border-gray-100">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-emerald-50/80 text-emerald-900 font-bold border-b border-gray-100">
                                            <th className="p-4 w-16 text-center">SL</th>
                                            <th className="p-4 w-28">Batch</th>
                                            <th className="p-4 w-24">Year</th>
                                            <th className="p-4">Alumnus Name</th>
                                            <th className="p-4">Position & Organization</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 text-gray-700">
                                        {filteredJobs.length > 0 ? (
                                            filteredJobs.map((item, idx) => (
                                                <tr key={item.id ?? idx} className="hover:bg-emerald-50/30 transition-colors">
                                                    <td className="p-4 text-center font-bold text-gray-400">{idx + 1}</td>
                                                    <td className="p-4">
                                                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                                                            {item.batch || '—'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 font-semibold text-gray-500">{item.passing_year || '—'}</td>
                                                    <td className="p-4 font-bold text-gray-900">{renderName(item, '059669')}</td>
                                                    <td className="p-4 text-gray-600 font-medium">{renderPosition(item)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="p-8 text-center text-gray-400">No matching job records found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Section 2: Higher Studies */}
                {(activeSection === 'all' || activeSection === 'higher_studies') && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="h-2 w-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-600" />
                        <div className="p-6 sm:p-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Alumni in Higher Studies (MSc / MBA)</h3>
                                    <p className="text-xs text-gray-500">Graduates pursuing advanced post-graduate degrees at reputed national and global universities</p>
                                </div>
                            </div>

                            <div className="overflow-x-auto rounded-2xl border border-gray-100">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-teal-50/80 text-teal-900 font-bold border-b border-gray-100">
                                            <th className="p-4 w-16 text-center">SL</th>
                                            <th className="p-4 w-28">Batch</th>
                                            <th className="p-4 w-24">Year</th>
                                            <th className="p-4">Alumnus Name</th>
                                            <th className="p-4">Postgraduate Program & Institution</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 text-gray-700">
                                        {filteredStudies.length > 0 ? (
                                            filteredStudies.map((item, idx) => (
                                                <tr key={item.id ?? idx} className="hover:bg-teal-50/30 transition-colors">
                                                    <td className="p-4 text-center font-bold text-gray-400">{idx + 1}</td>
                                                    <td className="p-4">
                                                        <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                                                            {item.batch || '—'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 font-semibold text-gray-500">{item.passing_year || '—'}</td>
                                                    <td className="p-4 font-bold text-gray-900">{renderName(item, '0d9488')}</td>
                                                    <td className="p-4 text-teal-900 font-medium">{renderPosition(item)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="p-8 text-center text-gray-400">No matching higher studies records found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

            </main>
            <Footer />
        </div>
    );
}
