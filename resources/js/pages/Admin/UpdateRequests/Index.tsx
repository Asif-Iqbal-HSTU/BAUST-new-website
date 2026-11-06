import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { MessageSquare, Paperclip, Plus, Search } from 'lucide-react';
import { PRIORITY_STYLE, StatusBadge } from '@/components/update-requests';

interface Row {
    id: number;
    reference: string;
    type: string;
    priority: string;
    title: string;
    page_url: string | null;
    status: string;
    needed_by: string | null;
    created_at: string;
    updated_at: string;
    attachments_count: number;
    comments_count: number;
    user: { name: string; email: string; role: string; department: string | null } | null;
}

interface Props {
    requests: { data: Row[]; links: { url: string | null; label: string; active: boolean }[] };
    counts: Record<string, number>;
    filters: { status?: string; type?: string; search?: string };
    isDeveloper: boolean;
    types: Record<string, string>;
    priorities: Record<string, string>;
    statuses: Record<string, string>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Update Requests', href: '/admin/update-requests' },
];

const OPEN = ['submitted', 'in_review', 'in_progress', 'needs_info'];

export default function Index({ requests, counts, filters, isDeveloper, types, statuses }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const total = Object.values(counts).reduce((a, b) => a + Number(b), 0);
    const open = OPEN.reduce((a, s) => a + Number(counts[s] ?? 0), 0);

    const go = (next: Partial<Props['filters']>) => {
        router.get('/admin/update-requests', { ...filters, ...next }, { preserveState: true, replace: true });
    };

    const tabs = [
        { key: '', label: 'All', count: total },
        { key: 'open', label: 'Open', count: open },
        ...Object.entries(statuses).map(([key, label]) => ({ key, label, count: Number(counts[key] ?? 0) })),
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Requests" />
            <div className="mx-auto w-full max-w-6xl space-y-5 p-4 md:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 dark:text-white">{isDeveloper ? 'Update Requests' : 'My Update Requests'}</h1>
                        <p className="text-sm text-neutral-500">
                            {isDeveloper ? 'Requests from all admins. Urgent and open ones are listed first.' : 'Ask the developer for any change on the website and follow its progress here.'}
                        </p>
                    </div>
                    <Link href="/admin/update-requests/create" className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700">
                        <Plus className="h-4 w-4" /> New request
                    </Link>
                </div>

                <div className="flex flex-wrap gap-2">
                    {tabs.map((t) => {
                        const active = (filters.status ?? '') === t.key;
                        return (
                            <button
                                key={t.key || 'all'}
                                onClick={() => go({ status: t.key || undefined })}
                                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${active ? 'bg-emerald-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-300'} border border-neutral-200 dark:border-neutral-800`}
                            >
                                {t.label} <span className="opacity-70">{t.count}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <form onSubmit={(e) => { e.preventDefault(); go({ search: search || undefined }); }} className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title, reference or page link" className="w-full rounded-lg border border-neutral-300 bg-white py-2 pl-9 pr-3 text-sm dark:border-neutral-700 dark:bg-neutral-900" />
                    </form>
                    <select value={filters.type ?? ''} onChange={(e) => go({ type: e.target.value || undefined })} className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900">
                        <option value="">All types</option>
                        {Object.entries(types).map(([v, t]) => <option key={v} value={v}>{t}</option>)}
                    </select>
                </div>

                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    {requests.data.length === 0 ? (
                        <div className="p-10 text-center text-sm text-neutral-500">
                            No requests here yet. <Link href="/admin/update-requests/create" className="font-semibold text-emerald-700 underline">Send your first request</Link>.
                        </div>
                    ) : (
                        <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {requests.data.map((r) => (
                                <li key={r.id}>
                                    <Link href={`/admin/update-requests/${r.id}`} className="flex flex-col gap-2 p-4 hover:bg-neutral-50 sm:flex-row sm:items-center sm:justify-between dark:hover:bg-neutral-800/40">
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-mono text-xs text-neutral-400">{r.reference}</span>
                                                <StatusBadge status={r.status} label={statuses[r.status] ?? r.status} />
                                                <span className={`text-[11px] font-bold uppercase ${PRIORITY_STYLE[r.priority] ?? ''}`}>{r.priority}</span>
                                            </div>
                                            <div className="mt-1 truncate text-sm font-bold text-gray-900 dark:text-white">{r.title}</div>
                                            <div className="truncate text-xs text-neutral-500">
                                                {types[r.type]?.split(' (')[0] ?? r.type}
                                                {r.page_url ? ` · ${r.page_url.replace(/^https?:\/\/[^/]+/, '') || '/'}` : ''}
                                                {isDeveloper && r.user ? ` · ${r.user.name}${r.user.department ? ` (${r.user.department.toUpperCase()})` : ''}` : ''}
                                            </div>
                                        </div>
                                        <div className="flex flex-shrink-0 items-center gap-4 text-xs text-neutral-500">
                                            {r.needed_by && <span>Needed by {new Date(r.needed_by).toLocaleDateString()}</span>}
                                            <span className="inline-flex items-center gap-1"><Paperclip className="h-3.5 w-3.5" />{r.attachments_count}</span>
                                            <span className="inline-flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" />{r.comments_count}</span>
                                            <span>{new Date(r.updated_at).toLocaleDateString()}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {requests.links.length > 3 && (
                    <div className="flex flex-wrap gap-1">
                        {requests.links.map((l, i) => (
                            <Link key={i} href={l.url ?? '#'} preserveScroll className={`rounded px-3 py-1 text-xs ${l.active ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-neutral-900'} ${l.url ? '' : 'pointer-events-none opacity-40'}`} dangerouslySetInnerHTML={{ __html: l.label }} />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
