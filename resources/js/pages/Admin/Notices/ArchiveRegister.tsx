import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ArchiveIcon, ExternalLink, Printer } from 'lucide-react';

interface Coverage {
    id: number;
    newspaper_name: string;
    url: string | null;
    clipping_file: string | null;
    published_date: string | null;
    hardcopy_archive_page: string | null;
    remarks: string | null;
}

interface Entry {
    id: number;
    title: string;
    slug: string;
    press_release_no: string | null;
    published_at: string;
    press_coverages: Coverage[];
}

interface PaginatedEntries {
    data: Entry[];
    links: { url: string | null; label: string; active: boolean }[];
    total: number;
}

interface Props {
    entries: PaginatedEntries;
    filters: { search?: string };
}

function formatDate(dateStr: string | null) {
    if (!dateStr) return '—';
    try {
        return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
        return dateStr;
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Manage Notices', href: '/admin/notices' },
    { title: 'Press Release Archive Register', href: '#' },
];

export default function ArchiveRegister({ entries, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/notices-archive-register', search ? { search } : {}, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Press Release Archive Register" />

            <div className="p-6 max-w-7xl mx-auto space-y-6 print:p-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <ArchiveIcon className="w-6 h-6 text-emerald-600" />
                            Press Release Archive Register
                        </h1>
                        <p className="text-sm text-gray-500">Per policy §4.1 — serial, date, title, media coverage, and hardcopy archive location.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Search title..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="text-sm rounded-lg border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-gray-950 dark:text-white py-1.5 px-3 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            <button type="submit" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors">
                                Search
                            </button>
                        </form>
                        <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm">
                            <Printer className="w-4 h-4" />
                            Print
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-sm overflow-hidden print:border-0 print:shadow-none">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-850 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="py-3 px-4">Sl.</th>
                                    <th className="py-3 px-4">PR No.</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Title</th>
                                    <th className="py-3 px-4"># Media</th>
                                    <th className="py-3 px-4">Media Names / Publish Dates</th>
                                    <th className="py-3 px-4">Hardcopy Page</th>
                                    <th className="py-3 px-4">Remarks</th>
                                    <th className="py-3 px-4 print:hidden">Link</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-neutral-800 text-gray-700 dark:text-gray-300">
                                {entries.data.length > 0 ? (
                                    entries.data.map((entry, idx) => (
                                        <tr key={entry.id} className="align-top hover:bg-gray-50/50 dark:hover:bg-neutral-850/50 transition-colors">
                                            <td className="py-3 px-4 font-mono text-xs">{idx + 1}</td>
                                            <td className="py-3 px-4 font-mono text-xs">{entry.press_release_no || '—'}</td>
                                            <td className="py-3 px-4 text-gray-500 whitespace-nowrap">{formatDate(entry.published_at)}</td>
                                            <td className="py-3 px-4 max-w-xs font-semibold text-gray-900 dark:text-white">{entry.title}</td>
                                            <td className="py-3 px-4">{entry.press_coverages.length}</td>
                                            <td className="py-3 px-4">
                                                <ul className="space-y-1">
                                                    {entry.press_coverages.map(c => (
                                                        <li key={c.id} className="text-xs">
                                                            <span className="font-semibold">{c.newspaper_name}</span>
                                                            {c.published_date && <span className="text-gray-400"> — {formatDate(c.published_date)}</span>}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="py-3 px-4">
                                                <ul className="space-y-1">
                                                    {entry.press_coverages.map(c => (
                                                        <li key={c.id} className="text-xs">{c.hardcopy_archive_page || '—'}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="py-3 px-4">
                                                <ul className="space-y-1">
                                                    {entry.press_coverages.map(c => (
                                                        <li key={c.id} className="text-xs text-gray-400">{c.remarks || '—'}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="py-3 px-4 print:hidden">
                                                <div className="space-y-1">
                                                    {entry.press_coverages.map(c => (
                                                        <a key={c.id} href={c.url || c.clipping_file || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                                                            <ExternalLink className="w-3 h-3" /> Open
                                                        </a>
                                                    ))}
                                                    <Link href={`/admin/notices/${entry.id}/edit`} className="block text-xs font-bold text-emerald-600 hover:underline">
                                                        Edit
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={9} className="py-8 text-center text-gray-400">
                                            No press releases with recorded coverage yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {entries.links && entries.links.length > 3 && (
                        <div className="border-t border-gray-100 dark:border-neutral-800 p-4 bg-gray-50/50 dark:bg-neutral-850/30 flex items-center justify-center gap-1.5 flex-wrap print:hidden">
                            {entries.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                        link.active ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm' : 'bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
