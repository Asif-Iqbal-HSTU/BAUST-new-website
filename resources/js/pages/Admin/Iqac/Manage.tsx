import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Plus, Trash2, Save, ImageIcon } from 'lucide-react';

interface Item {
    id: number;
    [key: string]: unknown;
}

interface Settings {
    [key: string]: unknown;
}

interface Props {
    settings: Settings;
    slides: Item[];
    stats: Item[];
    qaAreas: Item[];
    obePoints: Item[];
    members: Item[];
    events: Item[];
    notices: Item[];
    iconOptions: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'IQAC Manager', href: '/admin/iqac' },
];

type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'select' | 'image';
type FieldDef = { key: string; label: string; type: FieldType; options?: string[] };

const input =
    'w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none';
const btn =
    'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors';

function Toast({ message }: { message: string | null }) {
    if (!message) return null;
    return (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl">
            {message}
        </div>
    );
}

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
    return (
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-5">
                <h2 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">{title}</h2>
                {subtitle && <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>}
            </div>
            {children}
        </section>
    );
}

function ItemField({ def, defaultValue, iconOptions }: { def: FieldDef; defaultValue?: unknown; iconOptions: string[] }) {
    const common = { name: def.key, defaultValue: (defaultValue as string) ?? '' };
    if (def.type === 'textarea') {
        return (
            <label className="block">
                <span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">{def.label}</span>
                <textarea {...common} rows={2} className={input} />
            </label>
        );
    }
    if (def.type === 'checkbox') {
        return (
            <label className="flex items-center gap-2 pt-6">
                <input type="checkbox" name={def.key} defaultChecked={Boolean(defaultValue)} className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">{def.label}</span>
            </label>
        );
    }
    if (def.type === 'select') {
        return (
            <label className="block">
                <span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">{def.label}</span>
                <select {...common} className={input}>
                    {(def.options ?? iconOptions).map((o) => (
                        <option key={o} value={o}>{o}</option>
                    ))}
                </select>
            </label>
        );
    }
    if (def.type === 'image') {
        return (
            <div className="sm:col-span-2">
                <span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">{def.label}</span>
                <div className="flex items-center gap-3">
                    {defaultValue ? (
                        <img src={defaultValue as string} alt="" className="h-14 w-14 rounded-lg object-cover" />
                    ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                            <ImageIcon className="h-5 w-5 text-neutral-400" />
                        </div>
                    )}
                    <input type="file" name={`${def.key}_file`} accept="image/*" className="text-xs" />
                </div>
            </div>
        );
    }
    return (
        <label className="block">
            <span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">{def.label}</span>
            <input type={def.type === 'number' ? 'number' : 'text'} {...common} className={input} />
        </label>
    );
}

function CollectionEditor({
    title,
    subtitle,
    type,
    items,
    fields,
    iconOptions,
    onDone,
    describe,
}: {
    title: string;
    subtitle?: string;
    type: string;
    items: Item[];
    fields: FieldDef[];
    iconOptions: string[];
    onDone: (msg: string) => void;
    describe: (item: Item) => string;
}) {
    const [adding, setAdding] = useState(false);
    const [editing, setEditing] = useState<number | null>(null);

    const submit = (e: React.FormEvent<HTMLFormElement>, url: string, done: () => void) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        router.post(url, fd, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                done();
                onDone('Saved.');
            },
        });
    };

    const remove = (id: number) => {
        if (!confirm('Delete this item?')) return;
        router.delete(`/admin/iqac/collection/${type}/${id}`, {
            preserveScroll: true,
            onSuccess: () => onDone('Deleted.'),
        });
    };

    return (
        <SectionCard title={title} subtitle={subtitle}>
            <div className="space-y-3">
                {items.map((item) =>
                    editing === item.id ? (
                        <form
                            key={item.id}
                            onSubmit={(e) => submit(e, `/admin/iqac/collection/${type}/${item.id}`, () => setEditing(null))}
                            className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 dark:border-emerald-900 dark:bg-emerald-950/20"
                        >
                            <div className="grid gap-3 sm:grid-cols-2">
                                {fields.map((f) => (
                                    <ItemField key={f.key} def={f} defaultValue={item[f.key]} iconOptions={iconOptions} />
                                ))}
                            </div>
                            <div className="mt-3 flex gap-2">
                                <button type="submit" className={`${btn} bg-emerald-600 text-white hover:bg-emerald-700`}>
                                    <Save className="h-4 w-4" /> Save
                                </button>
                                <button type="button" onClick={() => setEditing(null)} className={`${btn} bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300`}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 p-3 dark:border-neutral-800">
                            <span className="truncate text-sm text-neutral-700 dark:text-neutral-300">{describe(item)}</span>
                            <div className="flex flex-shrink-0 gap-2">
                                <button onClick={() => setEditing(item.id)} className={`${btn} bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300`}>
                                    Edit
                                </button>
                                <button onClick={() => remove(item.id)} className={`${btn} text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30`}>
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ),
                )}
            </div>

            {adding ? (
                <form
                    onSubmit={(e) => submit(e, `/admin/iqac/collection/${type}`, () => setAdding(false))}
                    className="mt-4 rounded-xl border border-dashed border-emerald-300 p-4 dark:border-emerald-800"
                >
                    <div className="grid gap-3 sm:grid-cols-2">
                        {fields.map((f) => (
                            <ItemField key={f.key} def={f} iconOptions={iconOptions} />
                        ))}
                    </div>
                    <div className="mt-3 flex gap-2">
                        <button type="submit" className={`${btn} bg-emerald-600 text-white hover:bg-emerald-700`}>
                            <Plus className="h-4 w-4" /> Add
                        </button>
                        <button type="button" onClick={() => setAdding(false)} className={`${btn} bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300`}>
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <button onClick={() => setAdding(true)} className={`${btn} mt-4 border border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300`}>
                    <Plus className="h-4 w-4" /> Add new
                </button>
            )}
        </SectionCard>
    );
}

function StringListField({ label, name, values }: { label: string; name: string; values: string[] }) {
    const [items, setItems] = useState<string[]>(values.length ? values : ['']);
    return (
        <div>
            <span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">{label}</span>
            <div className="space-y-2">
                {items.map((v, i) => (
                    <div key={i} className="flex gap-2">
                        <textarea
                            name={`${name}[]`}
                            rows={2}
                            value={v}
                            onChange={(e) => setItems((prev) => prev.map((x, j) => (j === i ? e.target.value : x)))}
                            className={input}
                        />
                        <button
                            type="button"
                            onClick={() => setItems((prev) => (prev.length > 1 ? prev.filter((_, j) => j !== i) : ['']))}
                            className={`${btn} h-fit text-red-600 hover:bg-red-50`}
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={() => setItems((p) => [...p, ''])} className={`${btn} mt-2 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300`}>
                <Plus className="h-4 w-4" /> Add paragraph
            </button>
        </div>
    );
}

function SettingsEditor({ settings, onDone }: { settings: Settings; onDone: (m: string) => void }) {
    const s = (k: string): string => (settings[k] as string) ?? '';
    const arr = (k: string): string[] => (Array.isArray(settings[k]) ? (settings[k] as string[]) : []);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        router.post('/admin/iqac/settings', fd, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => onDone('Page content saved.'),
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <SectionCard title="About" subtitle="Intro heading and paragraphs">
                <div className="space-y-4">
                    <label className="block">
                        <span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">Heading</span>
                        <input name="about_heading" defaultValue={s('about_heading')} className={input} />
                    </label>
                    <StringListField label="Paragraphs" name="about_paragraphs" values={arr('about_paragraphs')} />
                </div>
            </SectionCard>

            <SectionCard title="Director's Message">
                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block"><span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">Name</span><input name="director_name" defaultValue={s('director_name')} className={input} /></label>
                    <label className="block"><span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">Role</span><input name="director_role" defaultValue={s('director_role')} className={input} /></label>
                    <label className="block"><span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">Affiliation</span><input name="director_affiliation" defaultValue={s('director_affiliation')} className={input} /></label>
                    <label className="block"><span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">Credentials</span><input name="director_credentials" defaultValue={s('director_credentials')} className={input} /></label>
                    <div className="sm:col-span-2">
                        <span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">Photo</span>
                        <div className="flex items-center gap-3">
                            {s('director_photo') ? <img src={s('director_photo')} alt="" className="h-16 w-16 rounded-lg object-cover" /> : null}
                            <input type="file" name="director_photo_file" accept="image/*" className="text-xs" />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <StringListField label="Message paragraphs" name="director_message" values={arr('director_message')} />
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="Vision & Mission">
                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block"><span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">Vision</span><textarea name="vision_text" defaultValue={s('vision_text')} rows={4} className={input} /></label>
                    <label className="block"><span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">Mission</span><textarea name="mission_text" defaultValue={s('mission_text')} rows={4} className={input} /></label>
                </div>
            </SectionCard>

            <SectionCard title="OBE Corner">
                <div className="space-y-4">
                    <label className="block"><span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">Heading</span><input name="obe_heading" defaultValue={s('obe_heading')} className={input} /></label>
                    <label className="block"><span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">Description</span><textarea name="obe_description" defaultValue={s('obe_description')} rows={3} className={input} /></label>
                    <p className="text-xs text-neutral-500">Manage the OBE checklist points in the “OBE Points” section below.</p>
                </div>
            </SectionCard>

            <SectionCard title="Contact">
                <div className="grid gap-4 sm:grid-cols-3">
                    <label className="block"><span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">Address</span><input name="contact_address" defaultValue={s('contact_address')} className={input} /></label>
                    <label className="block"><span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">Email</span><input name="contact_email" defaultValue={s('contact_email')} className={input} /></label>
                    <label className="block"><span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">Office</span><input name="contact_office" defaultValue={s('contact_office')} className={input} /></label>
                </div>
            </SectionCard>

            <button type="submit" className={`${btn} bg-emerald-600 text-white hover:bg-emerald-700`}>
                <Save className="h-4 w-4" /> Save page content
            </button>
        </form>
    );
}

export default function Manage({ settings, slides, stats, qaAreas, obePoints, members, events, notices, iconOptions }: Props) {
    const [toast, setToast] = useState<string | null>(null);
    const flash = (m: string) => {
        setToast(m);
        window.setTimeout(() => setToast(null), 2500);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="IQAC Manager" />
            <Toast message={toast} />

            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-black text-emerald-800 dark:text-emerald-300">IQAC Page Manager</h1>
                    <p className="mt-1 text-sm text-neutral-500">Edit every section of the public /iqac page. Changes go live immediately.</p>
                </div>

                <SettingsEditor settings={settings} onDone={flash} />

                <CollectionEditor
                    title="Highlights Slider"
                    subtitle="Top-of-page image carousel"
                    type="slides"
                    items={slides}
                    iconOptions={iconOptions}
                    onDone={flash}
                    describe={(i) => `${i.title as string}${i.date_label ? ` — ${i.date_label}` : ''}`}
                    fields={[
                        { key: 'image', label: 'Image', type: 'image' },
                        { key: 'title', label: 'Title', type: 'text' },
                        { key: 'date_label', label: 'Date label', type: 'text' },
                        { key: 'order', label: 'Order', type: 'number' },
                    ]}
                />

                <CollectionEditor
                    title="Stats"
                    subtitle="The four stat tiles"
                    type="stats"
                    items={stats}
                    iconOptions={iconOptions}
                    onDone={flash}
                    describe={(i) => `${i.value as string} — ${i.label as string}`}
                    fields={[
                        { key: 'value', label: 'Value', type: 'text' },
                        { key: 'label', label: 'Label', type: 'text' },
                        { key: 'order', label: 'Order', type: 'number' },
                    ]}
                />

                <CollectionEditor
                    title="Quality Assurance Areas"
                    type="qa-areas"
                    items={qaAreas}
                    iconOptions={iconOptions}
                    onDone={flash}
                    describe={(i) => `${i.icon as string} · ${i.label as string}`}
                    fields={[
                        { key: 'icon', label: 'Icon', type: 'select' },
                        { key: 'label', label: 'Label', type: 'text' },
                        { key: 'order', label: 'Order', type: 'number' },
                    ]}
                />

                <CollectionEditor
                    title="OBE Points"
                    subtitle="Checklist inside the OBE Corner"
                    type="obe-points"
                    items={obePoints}
                    iconOptions={iconOptions}
                    onDone={flash}
                    describe={(i) => i.text as string}
                    fields={[
                        { key: 'text', label: 'Text', type: 'text' },
                        { key: 'order', label: 'Order', type: 'number' },
                    ]}
                />

                <CollectionEditor
                    title="Team / Organogram"
                    type="members"
                    items={members}
                    iconOptions={iconOptions}
                    onDone={flash}
                    describe={(i) => `${i.name as string} — ${i.role as string}`}
                    fields={[
                        { key: 'photo', label: 'Photo', type: 'image' },
                        { key: 'name', label: 'Name', type: 'text' },
                        { key: 'role', label: 'Role', type: 'text' },
                        { key: 'affiliation', label: 'Affiliation', type: 'text' },
                        { key: 'credentials', label: 'Credentials', type: 'textarea' },
                        { key: 'is_lead', label: 'Highlight as lead (director)', type: 'checkbox' },
                        { key: 'order', label: 'Order', type: 'number' },
                    ]}
                />

                <CollectionEditor
                    title="Activities & Events"
                    type="events"
                    items={events}
                    iconOptions={iconOptions}
                    onDone={flash}
                    describe={(i) => `${i.date_label ? `${i.date_label} — ` : ''}${i.title as string}`}
                    fields={[
                        { key: 'date_label', label: 'Date label', type: 'text' },
                        { key: 'title', label: 'Title', type: 'text' },
                        { key: 'order', label: 'Order', type: 'number' },
                    ]}
                />

                <CollectionEditor
                    title="Notices"
                    type="notices"
                    items={notices}
                    iconOptions={iconOptions}
                    onDone={flash}
                    describe={(i) => i.text as string}
                    fields={[
                        { key: 'text', label: 'Text', type: 'textarea' },
                        { key: 'order', label: 'Order', type: 'number' },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
