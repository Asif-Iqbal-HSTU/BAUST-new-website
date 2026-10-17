import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Plus, Megaphone, Clock, CheckCircle2, XCircle, Radio } from 'lucide-react';

interface MediaRequest {
    id: number;
    event_name: string;
    organizing_unit: string;
    event_date: string;
    location: string | null;
    contact_name: string;
    contact_mobile: string;
    status: string;
    receive_no: string | null;
    submitted_by?: { id: number; name: string; department: string | null } | null;
    handled_by?: { id: number; name: string } | null;
}

interface PaginatedRequests {
    data: MediaRequest[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    requests: PaginatedRequests;
    filters: { status?: string };
    isManager: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Media Coverage Requests', href: '/admin/media-requests' },
];

const STATUS_STYLES: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800',
    received: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-indigo-100 text-indigo-800',
    completed: 'bg-green-100 text-green-800',
    declined: 'bg-gray-200 text-gray-600',
};

const STATUS_LABELS: Record<string, string> = {
    pending: 'Pending',
    received: 'Received',
    in_progress: 'In Progress',
    completed: 'Completed',
    declined: 'Declined',
};

function formatDate(dateStr: string) {
    try {
        return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
        return dateStr;
    }
}

export default function Index({ requests, filters, isManager }: Props) {
    const handleFilter = (status: string) => {
        router.get('/admin/media-requests', status ? { status } : {}, { preserveState: true, replace: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Media Coverage Requests" />

            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Megaphone className="w-6 h-6 text-emerald-600" />
                            Media Coverage Requests
                        </h1>
                        <p className="text-sm text-gray-500">
                            {isManager
                                ? 'Requisitions submitted by departments and offices, per the PR & Media Coverage Policy (Appendix A).'
                                : 'Request PR Office coverage for your event at least 3 working days ahead.'}
                        </p>
                    </div>

                    <Link
                        href="/admin/media-requests/create"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        New Request
                    </Link>
                </div>

                {isManager && (
                    <div className="flex flex-wrap gap-2">
                        {['', 'pending', 'received', 'in_progress', 'completed', 'declined'].map((s) => (
                            <button
                                key={s || 'all'}
                                onClick={() => handleFilter(s)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                                    (filters.status || '') === s
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                                }`}
                            >
                                {s ? STATUS_LABELS[s] : 'All'}
                            </button>
                        ))}
                    </div>
                )}

                <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-850 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="py-3 px-6">Event</th>
                                    <th className="py-3 px-6">Organizing Unit</th>
                                    <th className="py-3 px-6">Event Date</th>
                                    <th className="py-3 px-6">Contact</th>
                                    {isManager && <th className="py-3 px-6">Submitted By</th>}
                                    <th className="py-3 px-6">Receive No.</th>
                                    <th className="py-3 px-6">Status</th>
                                    <th className="py-3 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-neutral-800 text-sm text-gray-700 dark:text-gray-300">
                                {requests.data.length > 0 ? (
                                    requests.data.map((r) => (
                                        <tr key={r.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-850/50 transition-colors">
                                            <td className="py-4 px-6 max-w-xs">
                                                <p className="font-bold text-gray-900 dark:text-white leading-snug">{r.event_name}</p>
                                                {r.location && <p className="text-xs text-gray-400">{r.location}</p>}
                                            </td>
                                            <td className="py-4 px-6">{r.organizing_unit}</td>
                                            <td className="py-4 px-6 text-gray-500">{formatDate(r.event_date)}</td>
                                            <td className="py-4 px-6">
                                                <p className="font-semibold">{r.contact_name}</p>
                                                <p className="text-xs text-gray-400">{r.contact_mobile}</p>
                                            </td>
                                            {isManager && (
                                                <td className="py-4 px-6 text-gray-500">
                                                    {r.submitted_by?.name}
                                                    {r.submitted_by?.department && (
                                                        <span className="block text-[10px] uppercase text-gray-400">{r.submitted_by.department}</span>
                                                    )}
                                                </td>
                                            )}
                                            <td className="py-4 px-6 font-mono text-xs">{r.receive_no || '—'}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${STATUS_STYLES[r.status] || 'bg-gray-100 text-gray-600'}`}>
                                                    {r.status === 'pending' && <Clock className="w-3 h-3" />}
                                                    {r.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                                                    {r.status === 'declined' && <XCircle className="w-3 h-3" />}
                                                    {r.status === 'received' && <Radio className="w-3 h-3" />}
                                                    {STATUS_LABELS[r.status] || r.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-2">
                                                <Link
                                                    href={`/admin/media-requests/${r.id}/edit`}
                                                    className="text-xs font-bold text-emerald-600 hover:text-emerald-750 hover:underline"
                                                >
                                                    {isManager ? 'Manage' : 'View'}
                                                </Link>
                                                {isManager && r.status === 'pending' && (
                                                    <button
                                                        onClick={() => router.post(`/admin/media-requests/${r.id}/receive`)}
                                                        className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                                                    >
                                                        Mark Received
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={isManager ? 8 : 7} className="py-8 text-center text-gray-400">
                                            No media coverage requests found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {requests.links && requests.links.length > 3 && (
                        <div className="border-t border-gray-100 dark:border-neutral-800 p-4 bg-gray-50/50 dark:bg-neutral-850/30 flex items-center justify-center gap-1.5 flex-wrap">
                            {requests.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                        link.active
                                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                                            : 'bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
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
