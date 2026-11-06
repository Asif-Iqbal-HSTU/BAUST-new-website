import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ReorderHandle, { reorderRowClass } from '@/components/reorder-handle';
import { useDragReorder } from '@/hooks/use-drag-reorder';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Plus, Trash2, Save } from 'lucide-react';

interface Member {
    id: number;
    name: string;
    designation: string | null;
    photo: string | null;
    phone: string | null;
    email: string | null;
    education: string[] | null;
    tier: number;
    order: number;
}
interface Props { office: { slug: string; name: string }; members: Member[] }

const input = 'w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none';
const btn = 'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors';
const lbl = 'mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400';
const TIERS = [
    { v: 1, t: 'Tier 1 — Head' },
    { v: 2, t: 'Tier 2' },
    { v: 3, t: 'Tier 3 — Directorate/Deputies' },
    { v: 4, t: 'Tier 4 — Officers & Staff' },
];

function Form({ office, member, onDone }: { office: string; member?: Member; onDone: () => void }) {
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = member ? `/admin/offices/${office}/members/${member.id}` : `/admin/offices/${office}/members`;
        router.post(url, new FormData(e.currentTarget), { preserveScroll: true, forceFormData: true, onSuccess: onDone });
    };
    return (
        <form onSubmit={submit} className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 dark:border-emerald-900 dark:bg-emerald-950/20">
            <div className="grid gap-3 sm:grid-cols-2">
                <label className="block sm:col-span-2"><span className={lbl}>Name</span><input name="name" defaultValue={member?.name ?? ''} className={input} required /></label>
                <label className="block"><span className={lbl}>Designation</span><input name="designation" defaultValue={member?.designation ?? ''} className={input} /></label>
                <label className="block"><span className={lbl}>Tier</span><select name="tier" defaultValue={member?.tier ?? 4} className={input}>{TIERS.map((t) => <option key={t.v} value={t.v}>{t.t}</option>)}</select></label>
                <label className="block"><span className={lbl}>Phone</span><input name="phone" defaultValue={member?.phone ?? ''} className={input} /></label>
                <label className="block sm:col-span-2"><span className={lbl}>Email (one per line)</span><textarea name="email" defaultValue={member?.email ?? ''} rows={2} className={input} /></label>
                <label className="block sm:col-span-2"><span className={lbl}>Education (one per line)</span><textarea name="education" defaultValue={(member?.education ?? []).join('\n')} rows={2} className={input} /></label>
                <div className="sm:col-span-2"><span className={lbl}>Photo</span><div className="flex items-center gap-3">{member?.photo ? <img src={member.photo} alt="" className="h-12 w-12 rounded-lg object-cover" /> : null}<input type="file" name="photo_file" accept="image/*" className="text-xs" /></div></div>
            </div>
            <div className="mt-3 flex gap-2">
                <button className={`${btn} bg-emerald-600 text-white hover:bg-emerald-700`}><Save className="h-4 w-4" /> Save</button>
                <button type="button" onClick={onDone} className={`${btn} bg-neutral-200 dark:bg-neutral-800`}>Cancel</button>
            </div>
        </form>
    );
}

function TierGroup({ office, tier, members, editing, setEditing, remove, done }: {
    office: string;
    tier: { v: number; t: string };
    members: Member[];
    editing: number | null;
    setEditing: (id: number) => void;
    remove: (id: number) => void;
    done: (m: string) => void;
}) {
    const reorder = useDragReorder(members, `/admin/offices/${office}/members/reorder`, (m) => done(m));
    if (members.length === 0) return null;

    return (
        <div>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-500">{tier.t}</h2>
            <div className="space-y-3">
                {reorder.items.map((m, idx) => editing === m.id ? (
                    <Form key={m.id} office={office} member={m} onDone={() => done('Saved.')} />
                ) : (
                    <div
                        key={m.id}
                        {...reorder.rowProps(idx)}
                        className={`flex items-center justify-between gap-3 rounded-xl border border-neutral-200 p-3 dark:border-neutral-800 ${reorderRowClass(reorder.isDragging(idx), reorder.isOver(idx))}`}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <ReorderHandle index={idx} count={reorder.items.length} onUp={() => reorder.moveUp(idx)} onDown={() => reorder.moveDown(idx)} />
                            <div className="min-w-0"><div className="truncate text-sm font-semibold text-neutral-800 dark:text-neutral-200">{m.name}</div><div className="truncate text-xs text-neutral-500">{m.designation}</div></div>
                        </div>
                        <div className="flex flex-shrink-0 gap-2">
                            <button onClick={() => setEditing(m.id)} className={`${btn} bg-neutral-100 dark:bg-neutral-800`}>Edit</button>
                            <button onClick={() => remove(m.id)} className={`${btn} text-red-600`}><Trash2 className="h-4 w-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Manage({ office, members }: Props) {
    const [toast, setToast] = useState<string | null>(null);
    const [adding, setAdding] = useState(false);
    const [editing, setEditing] = useState<number | null>(null);
    const done = (m: string) => { setAdding(false); setEditing(null); setToast(m); window.setTimeout(() => setToast(null), 2000); };
    const remove = (id: number) => { if (confirm('Delete this member?')) router.delete(`/admin/offices/${office.slug}/members/${id}`, { preserveScroll: true, onSuccess: () => done('Deleted.') }); };
    const isSuperAdmin = (usePage<SharedData>().props.auth?.user as { role?: string } | undefined)?.role === 'super_admin';
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        ...(isSuperAdmin ? [{ title: 'Offices', href: '/admin/offices' }] : []),
        { title: office.name, href: `/admin/offices/${office.slug}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Manage ${office.name}`} />
            {toast && <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl">{toast}</div>}
            <div className="mx-auto w-full max-w-3xl p-4 md:p-6">
                <h1 className="mb-1 text-2xl font-bold text-emerald-800 dark:text-emerald-300">{office.name}</h1>
                <p className="mb-6 text-sm text-neutral-500">Tier 1 shows at the top, tier 3 as the directorate/deputies row, tier 4 as the staff grid. Drag members by the handle (or use ↑ ↓) to sort them within a tier; change a member’s tier with Edit.</p>

                <div className="space-y-6">
                    {TIERS.map((tier) => (
                        <TierGroup
                            key={tier.v}
                            office={office.slug}
                            tier={tier}
                            members={members.filter((m) => (m.tier ?? 4) === tier.v)}
                            editing={editing}
                            setEditing={setEditing}
                            remove={remove}
                            done={done}
                        />
                    ))}
                </div>

                {adding ? (
                    <div className="mt-4"><Form office={office.slug} onDone={() => done('Added.')} /></div>
                ) : (
                    <button onClick={() => setAdding(true)} className={`${btn} mt-4 border border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300`}><Plus className="h-4 w-4" /> Add member</button>
                )}
            </div>
        </AppLayout>
    );
}
