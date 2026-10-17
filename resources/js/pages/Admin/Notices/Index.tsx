import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { index, create, edit, destroy } from '@/routes/admin/notices';
 
interface Category {
    id: number;
    name: string;
}
 
interface PressCoverage {
    id: number;
    newspaper_name: string;
}

interface Notice {
    id: number;
    title: string;
    department: string | null;
    is_pinned: boolean;
    is_active: boolean;
    published_at: string;
    categories: Category[];
    press_coverages?: PressCoverage[];
}
 
interface PaginatedNotices {
    data: Notice[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
}
 
interface DeptItem {
    slug: string;
    name: string;
    short_name: string;
}

interface Props {
    notices: PaginatedNotices;
    filters: { department?: string; search?: string };
    departments?: DeptItem[];
}
 
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Manage Notices', href: '/admin/notices' },
];
 
export default function Index({ notices, filters, departments }: Props) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
 
    const [search, setSearch] = useState(filters.search || '');
 
    const handleFilterChange = (params: { department?: string; search?: string }) => {
        const query = {
            department: params.hasOwnProperty('department') ? params.department : filters.department,
            search: params.hasOwnProperty('search') ? params.search : filters.search,
        };
        router.get(
            index().url,
            query,
            { preserveState: true, replace: true }
        );
    };
 
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleFilterChange({ search });
    };
 
    const handleDelete = (id: number, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            router.delete(destroy(id).url);
        }
    };
 
    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        } catch {
            return dateStr;
        }
    };
 
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Notices" />
 
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">University Notices & Events</h1>
                        <p className="text-sm text-gray-500">Create, edit, and publish notices for departments and academic portals.</p>
                    </div>
 
                    <div className="flex items-center gap-2">
                        {(user.role === 'super_admin' || user.role === 'pro') && (
                            <Link
                                href="/admin/notices-archive-register"
                                className="inline-flex items-center justify-center px-4 py-2 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 font-medium text-sm rounded-lg transition-colors shadow-sm hover:bg-gray-50"
                            >
                                Press Archive Register
                            </Link>
                        )}
                        <Link
                            href={create()}
                            className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-750 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
                        >
                            Add Notice
                        </Link>
                    </div>
                </div>
 
                {/* Search & Filters */}
                <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-md w-full">
                        <input
                            type="text"
                            placeholder="Search notices..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="text-sm rounded-lg border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-gray-950 dark:text-white py-1.5 px-3 flex-grow focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        <button
                            type="submit"
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
                        >
                            Search
                        </button>
                    </form>
 
                    {(user.role === 'super_admin' || user.role === 'pro') && (
                        <div className="flex items-center gap-2">
                            <label htmlFor="dept-filter" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Department:
                            </label>
                            <select
                                id="dept-filter"
                                value={filters.department || ''}
                                onChange={e => handleFilterChange({ department: e.target.value })}
                                className="text-sm rounded-lg border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-gray-950 dark:text-white py-1.5 px-3 focus:ring-emerald-500 focus:border-emerald-500"
                            >
                                <option value="">All Departments</option>
                                {departments && departments.length > 0 ? (
                                    departments.map(d => (
                                        <option key={d.slug} value={d.slug}>
                                            {d.short_name || d.name} ({d.slug.toUpperCase()})
                                        </option>
                                    ))
                                ) : (
                                    <>
                                        <option value="cse">CSE</option>
                                        <option value="eee">EEE</option>
                                        <option value="ict">ICT</option>
                                        <option value="me">ME</option>
                                        <option value="ipe">IPE</option>
                                        <option value="ce">CE</option>
                                        <option value="dba">DBA</option>
                                        <option value="ais">AIS</option>
                                        <option value="eng">ENG</option>
                                        <option value="as">AS</option>
                                        <option value="mba">MBA</option>
                                    </>
                                )}
                            </select>
                        </div>
                    )}
                </div>
 
                {/* Table */}
                <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-850 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="py-3 px-6">Notice Title</th>
                                    <th className="py-3 px-6">Department</th>
                                    <th className="py-3 px-6">Published Date</th>
                                    <th className="py-3 px-6">Categories</th>
                                    <th className="py-3 px-6">Coverage</th>
                                    <th className="py-3 px-6">Status</th>
                                    <th className="py-3 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-neutral-800 text-sm text-gray-700 dark:text-gray-300">
                                {notices.data.length > 0 ? (
                                    notices.data.map((notice) => (
                                        <tr key={notice.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-850/50 transition-colors">
                                            <td className="py-4 px-6 max-w-md">
                                                <p className="font-bold text-gray-900 dark:text-white leading-snug">{notice.title}</p>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="uppercase inline-block bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2 py-0.5 rounded">
                                                    {notice.department || 'GLOBAL'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-gray-500">
                                                {formatDate(notice.published_at)}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-wrap gap-1">
                                                    {notice.categories.map((c) => (
                                                        <span key={c.id} className="text-[10px] bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded">
                                                            {c.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                {notice.press_coverages && notice.press_coverages.length > 0 ? (
                                                    <span className="inline-block bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-0.5 rounded">
                                                        {notice.press_coverages.length} paper{notice.press_coverages.length > 1 ? 's' : ''}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-300 dark:text-neutral-700 text-xs">—</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 space-x-1.5">
                                                {notice.is_pinned && (
                                                    <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                                        Pinned
                                                    </span>
                                                )}
                                                {notice.is_active ? (
                                                    <span className="inline-block bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-block bg-gray-100 text-gray-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                                        Draft
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-2">
                                                <Link
                                                    href={edit(notice.id)}
                                                    className="text-xs font-bold text-emerald-600 hover:text-emerald-750 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(notice.id, notice.title)}
                                                    className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="py-8 text-center text-gray-400">
                                            No notices found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
 
                    {/* Pagination */}
                    {notices.links && notices.links.length > 3 && (
                        <div className="border-t border-gray-100 dark:border-neutral-800 p-4 bg-gray-50/50 dark:bg-neutral-850/30 flex items-center justify-center gap-1.5 flex-wrap">
                            {notices.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    disabled={!link.url}
                                    className={`
                                        px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                                        ${link.active
                                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                                            : 'bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                                        }
                                        ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
                                    `}
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
