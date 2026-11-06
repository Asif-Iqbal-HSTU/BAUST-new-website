import React from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { ExternalLink, Send, Trash2 } from 'lucide-react';
import { AttachmentList, FilePicker, PRIORITY_STYLE, StatusBadge, type Attachment } from '@/components/update-requests';

interface Comment {
    id: number;
    body: string;
    status_change: string | null;
    created_at: string;
    user: { id: number; name: string; role: string } | null;
    attachments: Attachment[];
}

interface RequestData {
    id: number;
    reference: string;
    type: string;
    priority: string;
    title: string;
    page_url: string | null;
    location_detail: string | null;
    current_state: string | null;
    requested_change: string;
    reason: string | null;
    needed_by: string | null;
    status: string;
    developer_note: string | null;
    resolved_at: string | null;
    created_at: string;
    user: { id: number; name: string; email: string; role: string; department: string | null } | null;
    attachments: Attachment[];
    comments: Comment[];
}

interface Props {
    request: RequestData;
    isDeveloper: boolean;
    canWithdraw: boolean;
    types: Record<string, string>;
    priorities: Record<string, string>;
    statuses: Record<string, string>;
}

const card = 'rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900';
const input = 'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900';
const lbl = 'mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-500';

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <div className={lbl}>{label}</div>
            <div className="whitespace-pre-line text-sm text-neutral-800 dark:text-neutral-200">{children}</div>
        </div>
    );
}

const fullUrl = (url: string) => (/^https?:\/\//.test(url) ? url : url.startsWith('/') ? url : `https://${url}`);

export default function Show({ request: r, isDeveloper, canWithdraw, types, priorities, statuses }: Props) {
    const { auth } = usePage<SharedData>().props;
    const reply = useForm({ body: '', attachments: [] as File[] });
    const triage = useForm({ status: r.status, developer_note: '' });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Update Requests', href: '/admin/update-requests' },
        { title: r.reference, href: `/admin/update-requests/${r.id}` },
    ];

    const sendReply = (e: React.FormEvent) => {
        e.preventDefault();
        reply.post(`/admin/update-requests/${r.id}/comments`, { forceFormData: true, preserveScroll: true, onSuccess: () => reply.reset() });
    };
    const saveTriage = (e: React.FormEvent) => {
        e.preventDefault();
        triage.post(`/admin/update-requests/${r.id}/status`, { preserveScroll: true, onSuccess: () => triage.setData('developer_note', '') });
    };
    const withdraw = () => {
        if (confirm(isDeveloper ? 'Delete this request and its files?' : 'Withdraw this request?')) router.delete(`/admin/update-requests/${r.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${r.reference} · ${r.title}`} />
            <div className="mx-auto grid w-full max-w-6xl gap-5 p-4 md:p-6 lg:grid-cols-3">
                <div className="space-y-5 lg:col-span-2">
                    <div className={card}>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs text-neutral-400">{r.reference}</span>
                            <StatusBadge status={r.status} label={statuses[r.status] ?? r.status} />
                            <span className={`text-[11px] font-bold uppercase ${PRIORITY_STYLE[r.priority] ?? ''}`}>{priorities[r.priority]?.split(' —')[0] ?? r.priority} priority</span>
                        </div>
                        <h1 className="mt-2 text-xl font-black text-gray-900 dark:text-white">{r.title}</h1>
                        <p className="mt-1 text-xs text-neutral-500">
                            {types[r.type] ?? r.type} · sent {new Date(r.created_at).toLocaleString()}
                            {r.user ? ` by ${r.user.name}${r.user.department ? ` (${r.user.department.toUpperCase()})` : ''}` : ''}
                        </p>

                        {r.developer_note && (
                            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                                <div className="mb-1 text-[11px] font-bold uppercase tracking-wider">Developer's latest response</div>
                                <div className="whitespace-pre-line">{r.developer_note}</div>
                            </div>
                        )}

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <Detail label="Page">
                                {r.page_url ? (
                                    <a href={fullUrl(r.page_url)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 break-all text-emerald-700 underline">
                                        {r.page_url} <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                                    </a>
                                ) : '—'}
                            </Detail>
                            <Detail label="Part of the page">{r.location_detail || '—'}</Detail>
                        </div>
                        <div className="mt-4 space-y-4">
                            {r.current_state && <Detail label="What is there now">{r.current_state}</Detail>}
                            <Detail label="What it should be">{r.requested_change}</Detail>
                            {r.reason && <Detail label="Why">{r.reason}</Detail>}
                            {r.needed_by && <Detail label="Needed by">{new Date(r.needed_by).toLocaleDateString()}</Detail>}
                        </div>
                        {r.attachments.length > 0 && (
                            <div className="mt-5">
                                <div className={lbl}>Attachments</div>
                                <AttachmentList files={r.attachments} />
                            </div>
                        )}
                    </div>

                    {/* Conversation */}
                    <div className={card}>
                        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">Conversation</h2>
                        {r.comments.length === 0 && <p className="mb-4 text-sm text-neutral-500">No replies yet.</p>}
                        <ul className="space-y-4">
                            {r.comments.map((c) => {
                                const fromDeveloper = c.user?.role === 'super_admin';
                                return (
                                    <li key={c.id} className={`rounded-xl p-3 ${fromDeveloper ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-neutral-50 dark:bg-neutral-800/50'}`}>
                                        <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
                                            <span className="font-bold text-neutral-800 dark:text-neutral-200">{c.user?.id === auth.user.id ? 'You' : c.user?.name ?? 'Someone'}{fromDeveloper ? ' (developer)' : ''}</span>
                                            <span className="text-neutral-400">{new Date(c.created_at).toLocaleString()}</span>
                                            {c.status_change && <StatusBadge status={c.status_change} label={`→ ${statuses[c.status_change] ?? c.status_change}`} />}
                                        </div>
                                        <div className="whitespace-pre-line text-sm text-neutral-800 dark:text-neutral-200">{c.body}</div>
                                        {c.attachments.length > 0 && <div className="mt-2"><AttachmentList files={c.attachments} /></div>}
                                    </li>
                                );
                            })}
                        </ul>

                        <form onSubmit={sendReply} className="mt-5 space-y-3 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                            {r.status === 'needs_info' && !isDeveloper && (
                                <p className="rounded-lg bg-orange-50 p-2 text-xs font-semibold text-orange-800 dark:bg-orange-950/40 dark:text-orange-300">The developer needs more information. Your reply sends the request back for review.</p>
                            )}
                            <textarea value={reply.data.body} onChange={(e) => reply.setData('body', e.target.value)} rows={3} className={input} placeholder={isDeveloper ? 'Reply to the requester…' : 'Add details or answer the developer…'} required />
                            {reply.errors.body && <span className="text-xs text-red-600">{reply.errors.body}</span>}
                            <FilePicker files={reply.data.attachments} onChange={(files) => reply.setData('attachments', files)} error={Object.entries(reply.errors).find(([k]) => k.startsWith('attachments'))?.[1]} />
                            <div className="flex justify-end">
                                <button type="submit" disabled={reply.processing} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50">
                                    <Send className="h-4 w-4" /> {reply.processing ? 'Sending…' : 'Send reply'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="space-y-5">
                    {isDeveloper && (
                        <form onSubmit={saveTriage} className={`${card} space-y-3`}>
                            <h2 className="text-base font-bold text-gray-900 dark:text-white">Developer</h2>
                            <label className="block">
                                <span className={lbl}>Status</span>
                                <select value={triage.data.status} onChange={(e) => triage.setData('status', e.target.value)} className={input}>
                                    {Object.entries(statuses).map(([v, t]) => <option key={v} value={v}>{t}</option>)}
                                </select>
                            </label>
                            <label className="block">
                                <span className={lbl}>Response to the requester</span>
                                <textarea value={triage.data.developer_note} onChange={(e) => triage.setData('developer_note', e.target.value)} rows={4} className={input} placeholder="e.g. Done — the new photo is live. · Which semester's syllabus should replace it?" />
                            </label>
                            <button type="submit" disabled={triage.processing} className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50">
                                {triage.processing ? 'Saving…' : 'Update request'}
                            </button>
                            {r.user && <p className="text-xs text-neutral-500">Requester: {r.user.name} · {r.user.email}</p>}
                        </form>
                    )}

                    <div className={`${card} space-y-2 text-sm`}>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">Progress</h2>
                        <p className="text-neutral-600 dark:text-neutral-400">Status: <StatusBadge status={r.status} label={statuses[r.status] ?? r.status} /></p>
                        {r.resolved_at && <p className="text-neutral-600 dark:text-neutral-400">Closed {new Date(r.resolved_at).toLocaleString()}</p>}
                        <Link href="/admin/update-requests/create" className="block text-sm font-semibold text-emerald-700 underline">Send another request</Link>
                        {canWithdraw && (
                            <button type="button" onClick={withdraw} className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:underline">
                                <Trash2 className="h-4 w-4" /> {isDeveloper ? 'Delete request' : 'Withdraw request'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
