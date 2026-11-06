import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Send } from 'lucide-react';
import { FilePicker } from '@/components/update-requests';

interface Props {
    prefill: { page_url: string };
    types: Record<string, string>;
    priorities: Record<string, string>;
}

const input = 'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900';
const lbl = 'mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300';
const hint = 'mt-1 block text-[11px] text-neutral-500';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Update Requests', href: '/admin/update-requests' },
    { title: 'New request', href: '/admin/update-requests/create' },
];

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">{n}</span>
                {title}
            </h2>
            <div className="space-y-4">{children}</div>
        </section>
    );
}

export default function Create({ prefill, types, priorities }: Props) {
    const { data, setData, post, processing, errors, progress } = useForm({
        type: 'content',
        priority: 'normal',
        title: '',
        page_url: prefill.page_url || '',
        location_detail: '',
        current_state: '',
        requested_change: '',
        reason: '',
        needed_by: '',
        attachments: [] as File[],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/update-requests', { forceFormData: true });
    };

    const fileError = Object.entries(errors).find(([k]) => k.startsWith('attachments'))?.[1];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New update request" />
            <form onSubmit={submit} className="mx-auto w-full max-w-3xl space-y-5 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Request an update</h1>
                    <p className="text-sm text-neutral-500">
                        Tell the developer what should change on the website and where. The clearer the page, section and wording, the faster it gets done.
                    </p>
                </div>

                <Step n={1} title="What kind of request?">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                            <span className={lbl}>Type</span>
                            <select value={data.type} onChange={(e) => setData('type', e.target.value)} className={input}>
                                {Object.entries(types).map(([v, t]) => <option key={v} value={v}>{t}</option>)}
                            </select>
                        </label>
                        <label className="block">
                            <span className={lbl}>Priority</span>
                            <select value={data.priority} onChange={(e) => setData('priority', e.target.value)} className={input}>
                                {Object.entries(priorities).map(([v, t]) => <option key={v} value={v}>{t}</option>)}
                            </select>
                        </label>
                    </div>
                    <label className="block">
                        <span className={lbl}>Short title <span className="text-emerald-600">*</span></span>
                        <input value={data.title} onChange={(e) => setData('title', e.target.value)} className={input} placeholder="e.g. Update the HOD photo on the CSE home page" required />
                        {errors.title && <span className="text-xs text-red-600">{errors.title}</span>}
                    </label>
                </Step>

                <Step n={2} title="Where on the website?">
                    <label className="block">
                        <span className={lbl}>Page link</span>
                        <input value={data.page_url} onChange={(e) => setData('page_url', e.target.value)} className={input} placeholder="https://baust.edu.bd/cse/faculty" />
                        <span className={hint}>Open the page in your browser and copy the address bar. Leave empty for a new page or a general request.</span>
                        {errors.page_url && <span className="text-xs text-red-600">{errors.page_url}</span>}
                    </label>
                    <label className="block">
                        <span className={lbl}>Which part of the page?</span>
                        <input value={data.location_detail} onChange={(e) => setData('location_detail', e.target.value)} className={input} placeholder='e.g. "Message from Head" box, 2nd paragraph · or · Faculty list, card of Dr. X' />
                        <span className={hint}>Name the section, heading, card or button so it can be found quickly. A screenshot below helps a lot.</span>
                    </label>
                </Step>

                <Step n={3} title="What should change?">
                    <label className="block">
                        <span className={lbl}>What is there now</span>
                        <textarea value={data.current_state} onChange={(e) => setData('current_state', e.target.value)} rows={3} className={input} placeholder="Copy the current text, or describe what you see / what goes wrong" />
                    </label>
                    <label className="block">
                        <span className={lbl}>What it should be <span className="text-emerald-600">*</span></span>
                        <textarea value={data.requested_change} onChange={(e) => setData('requested_change', e.target.value)} rows={5} className={input} placeholder="The exact new text, the new behaviour, or the idea in detail" required />
                        {errors.requested_change && <span className="text-xs text-red-600">{errors.requested_change}</span>}
                    </label>
                    <label className="block">
                        <span className={lbl}>Why (optional)</span>
                        <textarea value={data.reason} onChange={(e) => setData('reason', e.target.value)} rows={2} className={input} placeholder="e.g. new HOD joined on 1 Nov · accreditation renewed · students reported the link is broken" />
                    </label>
                    <label className="block sm:w-1/2">
                        <span className={lbl}>Needed by (optional)</span>
                        <input type="date" value={data.needed_by} onChange={(e) => setData('needed_by', e.target.value)} className={input} min={new Date().toISOString().slice(0, 10)} />
                        {errors.needed_by && <span className="text-xs text-red-600">{errors.needed_by}</span>}
                    </label>
                </Step>

                <Step n={4} title="Screenshots, photos, videos or documents">
                    <FilePicker files={data.attachments} onChange={(files) => setData('attachments', files)} error={fileError} />
                </Step>

                <div className="flex items-center justify-end gap-3">
                    {progress && <span className="text-xs text-neutral-500">Uploading… {progress.percentage}%</span>}
                    <Link href="/admin/update-requests" className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold dark:border-neutral-700">Cancel</Link>
                    <button type="submit" disabled={processing} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50">
                        <Send className="h-4 w-4" /> {processing ? 'Sending…' : 'Send to developer'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
