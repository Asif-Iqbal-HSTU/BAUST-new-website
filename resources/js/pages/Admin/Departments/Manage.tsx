import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ReorderHandle, { reorderRowClass } from '@/components/reorder-handle';
import { useDragReorder } from '@/hooks/use-drag-reorder';
import { type BreadcrumbItem, type SharedData } from '@/types';
import {
    Plus,
    Trash2,
    Save,
    ExternalLink,
    Building2,
    Layers,
    BookOpen,
    Cpu,
    Trophy,
    Users,
    Target,
    FileText,
    Globe
} from 'lucide-react';

interface Item { id: number; [k: string]: unknown }
interface Dept {
    slug: string;
    name: string;
    short_name: string;
    faculty: string | null;
    tagline: string | null;
    established: string | null;
    about: string | null;
    vision: string | null;
    mission: string | null;
    hod_name: string | null;
    hod_designation: string | null;
    hod_photo: string | null;
    hod_message: string | null;
    accreditation_badge?: string | null;
    accreditation_title?: string | null;
    accreditation_text?: string | null;
    page_texts?: Record<string, string> | null;
}

interface Props {
    department: Dept;
    slides: Item[];
    stats: Item[];
    highlights: Item[];
    curricula: Item[];
    laboratories: Item[];
    achievements: Item[];
    societies: Item[];
    obes: Item[];
    onlineResources?: Item[];
    researches?: Item[];
    studentVoices?: Item[];
    galleries?: Item[];
    alumni?: Item[];
    labPeople?: Item[];
    memberOptions?: { id: number; name: string; designation: string | null }[];
    iconOptions: string[];
    /** Current default text per page-text key used by this department's pages. */
    pageTextDefaults?: Record<string, string>;
}

const PAGE_TEXT_LABELS: Record<string, string> = {
    home_hero_subtitle: 'Home page — hero subtitle',
    staff_intro: 'Academic Staff page — intro paragraph',
    curriculum_intro: 'Curriculum page — intro paragraph',
    curriculum_obe_note: 'Curriculum page — OBE note',
    labs_intro: 'Laboratories page — intro paragraph (above the lab list)',
    research_intro: 'Research publications page — intro paragraph',
    achievements_intro: 'Achievements page — intro paragraph',
    alumni_intro: 'Alumni page — intro paragraph',
    society_intro: 'Society / Clubs page — intro paragraph',
    online_resources_intro: 'Online Resources page — intro paragraph',
    events_intro: 'Events page — intro paragraph',
    curriculum_subtitle: 'Curriculum page — banner subtitle',
    labs_subtitle: 'Laboratories page — banner subtitle',
    achievements_subtitle: 'Achievements page — banner subtitle',
    alumni_subtitle: 'Alumni page — banner subtitle',
    research_subtitle: 'Research publications page — banner subtitle',
    thesis_subtitle: 'Thesis / research projects page — banner subtitle',
    thesis_intro: 'Thesis / research projects page — intro paragraph',
    alumni_association_intro: 'Alumni association page — banner subtitle',
    gallery_subtitle: 'Photo gallery — banner subtitle',
    video_gallery_subtitle: 'Video gallery — banner subtitle',
};

const input = 'w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none';
const btn = 'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors';
const lbl = 'mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400';

type FieldDef = {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'select' | 'image' | 'file' | 'images';
    /** Plain values, or value/label pairs (e.g. a laboratory id shown by its name). */
    options?: (string | { value: string | number; label: string })[];
    /** Suggestions offered while typing in a text field. */
    suggestions?: string[];
    hint?: string;
    /** For list fields stored as objects: one row per line, values separated by " | ". */
    columns?: string[];
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-5 text-lg font-bold text-emerald-800 dark:text-emerald-300">{title}</h2>
            {children}
        </section>
    );
}

function Field({ def, value, iconOptions }: { def: FieldDef; value?: unknown; iconOptions: string[] }) {
    let v = '';
    if (Array.isArray(value)) {
        v = value.map((x) => {
            if (typeof x === 'string') return x;
            if (def.columns && x && typeof x === 'object') {
                const row = x as Record<string, unknown>;
                return def.columns.map((c) => (row[c] ?? '') as string).join(' | ').replace(/(\s\|\s)+$/, '');
            }
            return JSON.stringify(x);
        }).join('\n');
    } else if (value !== undefined && value !== null) {
        v = String(value);
    }

    if (def.type === 'images') {
        return (
            <label className="block sm:col-span-2">
                <span className={lbl}>{def.label}</span>
                {def.hint && <span className="mb-1 block text-[11px] text-neutral-400">{def.hint}</span>}
                <textarea name={def.key} defaultValue={v} rows={3} className={input} />
                <span className="mt-1.5 block text-[11px] text-neutral-500">Upload photos (added to the list above on save):</span>
                <input type="file" name={`${def.key}_upload[]`} accept="image/*" multiple className="text-xs" />
            </label>
        );
    }

    if (def.type === 'textarea') {
        return (
            <label className="block sm:col-span-2">
                <span className={lbl}>{def.label}</span>
                {def.hint && <span className="mb-1 block text-[11px] text-neutral-400">{def.hint}</span>}
                <textarea name={def.key} defaultValue={v} rows={3} className={input} />
            </label>
        );
    }

    if (def.type === 'select') {
        return (
            <label className="block">
                <span className={lbl}>{def.label}</span>
                <select name={def.key} defaultValue={v} className={input}>
                    {(def.options ?? iconOptions).map((o) => {
                        const opt = typeof o === 'string' ? { value: o, label: o } : o;
                        return <option key={opt.value} value={opt.value}>{opt.label}</option>;
                    })}
                </select>
                {def.hint && <span className="mt-1 block text-[11px] text-neutral-400">{def.hint}</span>}
            </label>
        );
    }

    if (def.type === 'image') {
        return (
            <div className="sm:col-span-2">
                <span className={lbl}>{def.label}</span>
                <div className="flex items-center gap-3">
                    {value ? <img src={v} alt="" className="h-12 w-12 rounded-lg object-cover" /> : null}
                    <input type="file" name={`${def.key}_file`} accept="image/*" className="text-xs" />
                </div>
            </div>
        );
    }

    if (def.type === 'file') {
        return (
            <div className="sm:col-span-2">
                <span className={lbl}>{def.label}</span>
                <div className="flex flex-col gap-1.5">
                    {value ? (
                        <a href={v} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-emerald-600 underline flex items-center gap-1">
                            <FileText className="h-3.5 w-3.5" /> View Current Document
                        </a>
                    ) : null}
                    <input type="file" name={`${def.key}_file`} accept=".pdf,application/pdf" className="text-xs" />
                </div>
            </div>
        );
    }

    return (
        <label className="block">
            <span className={lbl}>{def.label}</span>
            {def.hint && <span className="mb-1 block text-[11px] text-neutral-400">{def.hint}</span>}
            <input type={def.type === 'number' ? 'number' : 'text'} name={def.key} defaultValue={v} className={input} list={def.suggestions ? `${def.key}-suggestions` : undefined} />
            {def.suggestions && (
                <datalist id={`${def.key}-suggestions`}>
                    {def.suggestions.map((s) => <option key={s} value={s} />)}
                </datalist>
            )}
        </label>
    );
}

/** Which page texts are edited on which admin tab (shown above that tab's content). */
const TAB_TEXT_KEYS: Record<string, string[]> = {
    profile: ['staff_intro', 'events_intro'],
    slides_stats: ['home_hero_subtitle'],
    curricula: ['curriculum_subtitle', 'curriculum_intro', 'curriculum_obe_note'],
    laboratories: ['labs_subtitle', 'labs_intro'],
    achievements: ['achievements_subtitle', 'achievements_intro'],
    societies: ['society_intro'],
    online_resources: ['online_resources_intro'],
    researches: ['research_subtitle', 'research_intro', 'thesis_subtitle', 'thesis_intro'],
    galleries: ['gallery_subtitle', 'video_gallery_subtitle'],
    alumni: ['alumni_subtitle', 'alumni_intro', 'alumni_association_intro'],
};

function PageTextsCard({ dept, keys, defaults, done }: {
    dept: Dept;
    keys: string[];
    defaults: Record<string, string>;
    done: (m: string) => void;
}) {
    const used = keys.filter((k) => k in defaults);
    if (used.length === 0) return null;

    const save = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.post(`/admin/departments/${dept.slug}/profile`, new FormData(e.currentTarget), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => done('Page texts saved.'),
        });
    };

    return (
        <form onSubmit={save} key={used.map((k) => `${k}:${dept.page_texts?.[k] ?? ''}`).join('|')}>
            <Card title="Texts on this page of the website">
                <p className="mb-4 text-sm text-neutral-500">
                    These are the texts currently shown on the website. Edit a box to change it; clear a box to go back to the original text.
                </p>
                <input type="hidden" name="name" value={dept.name} />
                <input type="hidden" name="short_name" value={dept.short_name} />
                <div className="grid gap-4">
                    {used.map((key) => {
                        const custom = dept.page_texts?.[key];
                        const original = defaults[key];
                        return (
                            <label key={key} className="block">
                                <span className={lbl}>
                                    {PAGE_TEXT_LABELS[key] ?? key}
                                    {custom ? <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Edited</span> : null}
                                </span>
                                <textarea
                                    name={`page_texts[${key}]`}
                                    defaultValue={custom || original}
                                    placeholder={original ? undefined : 'Not shown on the page unless you write something here'}
                                    rows={3}
                                    className={input}
                                />
                            </label>
                        );
                    })}
                </div>
                <button type="submit" className={`${btn} mt-5 bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm`}>
                    <Save className="h-4 w-4" /> Save Texts
                </button>
            </Card>
        </form>
    );
}

function VisibleToggle({ checked }: { checked: boolean }) {
    return (
        <label className="flex items-center gap-2 sm:col-span-2">
            <input type="hidden" name="is_active" value="0" />
            <input type="checkbox" name="is_active" value="1" defaultChecked={checked} className="h-4 w-4 accent-emerald-600" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Show on the website</span>
        </label>
    );
}

function Collection({
    title,
    slug,
    type,
    items,
    fields,
    iconOptions,
    done,
    describe,
    toggle = false
}: {
    title: string;
    slug: string;
    type: string;
    items: Item[];
    fields: FieldDef[];
    iconOptions: string[];
    done: (m: string) => void;
    describe: (i: Item) => string;
    /** Show a "visible on website" switch (collections with an is_active column). */
    toggle?: boolean;
}) {
    const [adding, setAdding] = useState(false);
    const [editing, setEditing] = useState<number | null>(null);
    const reorder = useDragReorder(items, `/admin/departments/${slug}/collection/${type}/reorder`, done);

    const submit = (e: React.FormEvent<HTMLFormElement>, url: string, cb: () => void) => {
        e.preventDefault();
        router.post(url, new FormData(e.currentTarget), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => { cb(); done('Saved successfully.'); }
        });
    };

    const remove = (id: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            router.delete(`/admin/departments/${slug}/collection/${type}/${id}`, {
                preserveScroll: true,
                onSuccess: () => done('Deleted successfully.')
            });
        }
    };

    return (
        <Card title={title}>
            <div className="space-y-3">
                {items.length > 1 && (
                    <p className="text-[11px] text-neutral-400">Drag rows by the handle (or use ↑ ↓) to change the order shown on the website.</p>
                )}
                {reorder.items.map((it, idx) => editing === it.id ? (
                    <form
                        key={it.id}
                        onSubmit={(e) => submit(e, `/admin/departments/${slug}/collection/${type}/${it.id}`, () => setEditing(null))}
                        className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 dark:border-emerald-900 dark:bg-emerald-950/20"
                    >
                        <div className="grid gap-3 sm:grid-cols-2">
                            {fields.map((f) => <Field key={f.key} def={f} value={it[f.key]} iconOptions={iconOptions} />)}
                            {toggle && <VisibleToggle checked={it.is_active !== false && it.is_active !== 0} />}
                        </div>
                        <div className="mt-3 flex gap-2">
                            <button type="submit" className={`${btn} bg-emerald-600 text-white hover:bg-emerald-700`}>
                                <Save className="h-4 w-4" /> Save
                            </button>
                            <button type="button" onClick={() => setEditing(null)} className={`${btn} bg-neutral-200 dark:bg-neutral-800`}>
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div
                        key={it.id}
                        {...reorder.rowProps(idx)}
                        className={`flex items-center justify-between gap-3 rounded-xl border border-neutral-200 p-3 dark:border-neutral-800 hover:border-emerald-200 transition-colors ${reorderRowClass(reorder.isDragging(idx), reorder.isOver(idx))}`}
                    >
                        <ReorderHandle index={idx} count={reorder.items.length} onUp={() => reorder.moveUp(idx)} onDown={() => reorder.moveDown(idx)} />
                        <span className="flex-1 truncate text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            {toggle && (it.is_active === false || it.is_active === 0) && (
                                <span className="mr-2 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-800 dark:bg-amber-950 dark:text-amber-300">Hidden</span>
                            )}
                            {describe(it)}
                        </span>
                        <div className="flex gap-2 flex-shrink-0">
                            <button onClick={() => setEditing(it.id)} className={`${btn} bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700`}>
                                Edit
                            </button>
                            <button onClick={() => remove(it.id)} className={`${btn} text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30`}>
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {items.length === 0 && !adding && (
                    <p className="text-xs text-neutral-400 italic py-2">No records found. Click &quot;Add new&quot; to create one.</p>
                )}
            </div>

            {adding ? (
                <form
                    onSubmit={(e) => submit(e, `/admin/departments/${slug}/collection/${type}`, () => setAdding(false))}
                    className="mt-4 rounded-xl border border-dashed border-emerald-300 p-4 dark:border-emerald-800"
                >
                    <div className="grid gap-3 sm:grid-cols-2">
                        {fields.map((f) => <Field key={f.key} def={f} iconOptions={iconOptions} />)}
                        {toggle && <VisibleToggle checked />}
                    </div>
                    <div className="mt-3 flex gap-2">
                        <button type="submit" className={`${btn} bg-emerald-600 text-white hover:bg-emerald-700`}>
                            <Plus className="h-4 w-4" /> Add
                        </button>
                        <button type="button" onClick={() => setAdding(false)} className={`${btn} bg-neutral-200 dark:bg-neutral-800`}>
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    onClick={() => setAdding(true)}
                    className={`${btn} mt-4 border border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300`}
                >
                    <Plus className="h-4 w-4" /> Add new
                </button>
            )}
        </Card>
    );
}

export default function Manage({
    department: d,
    slides,
    stats,
    highlights,
    curricula = [],
    laboratories = [],
    achievements = [],
    societies = [],
    obes = [],
    onlineResources = [],
    researches = [],
    studentVoices = [],
    galleries = [],
    alumni = [],
    labPeople = [],
    memberOptions = [],
    iconOptions,
    pageTextDefaults = {}
}: Props) {
    const { auth } = usePage<SharedData>().props;
    const role = (auth?.user as { role?: string } | undefined)?.role;
    const [activeTab, setActiveTab] = useState<'profile' | 'slides_stats' | 'curricula' | 'laboratories' | 'achievements' | 'societies' | 'obes' | 'online_resources' | 'researches' | 'student_voices' | 'galleries' | 'alumni'>('profile');
    const [toast, setToast] = useState<string | null>(null);

    const flash = (m: string) => {
        setToast(m);
        window.setTimeout(() => setToast(null), 2500);
    };

    const saveProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.post(`/admin/departments/${d.slug}/profile`, new FormData(e.currentTarget), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => flash('Department profile saved.')
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        ...(role === 'super_admin' ? [{ title: 'Departments', href: '/admin/departments' }] : []),
        { title: d.short_name, href: `/admin/departments/${d.slug}` },
    ];

    const tabs = [
        { id: 'profile', label: 'Profile & Info', icon: Building2 },
        { id: 'slides_stats', label: 'Slider & Highlights', icon: Layers },
        { id: 'curricula', label: `Curricula (${curricula.length})`, icon: BookOpen },
        { id: 'laboratories', label: `Laboratories (${laboratories.length})`, icon: Cpu },
        { id: 'achievements', label: `Achievements (${achievements.length})`, icon: Trophy },
        { id: 'societies', label: `Clubs & Societies (${societies.length})`, icon: Users },
        { id: 'obes', label: `OBE / PEO / PLO (${obes.length})`, icon: Target },
        { id: 'online_resources', label: `Online Resources (${onlineResources.length})`, icon: Globe },
        { id: 'researches', label: `Research & Thesis (${researches.length})`, icon: BookOpen },
        { id: 'student_voices', label: `Student Voices (${studentVoices.length})`, icon: Users },
        { id: 'galleries', label: `Photos & Videos (${galleries.length})`, icon: Trophy },
        { id: 'alumni', label: `Alumni Info (${alumni.length})`, icon: Users },
    ] as const;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Manage ${d.short_name}`} />
            {toast && (
                <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl animate-fade-in">
                    {toast}
                </div>
            )}

            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                {d.short_name} Department Admin
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{d.name}</h1>
                        <p className="text-sm text-neutral-500 mt-1">Manage public profile, curricula, laboratories, achievements, and societies.</p>
                    </div>
                    <a
                        href={`/${d.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${btn} bg-emerald-700 text-white hover:bg-emerald-800 w-fit shadow-sm`}
                    >
                        <ExternalLink className="h-4 w-4" />
                        View Live Department Page
                    </a>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-200 dark:border-neutral-800">
                    {tabs.map(t => {
                        const Icon = t.icon;
                        const active = activeTab === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => setActiveTab(t.id)}
                                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                                    active
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-none'
                                        : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800'
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {t.label}
                            </button>
                        );
                    })}
                </div>

                <PageTextsCard dept={d} keys={TAB_TEXT_KEYS[activeTab] ?? []} defaults={pageTextDefaults} done={flash} />

                {/* Tab 1: Profile */}
                {activeTab === 'profile' && (
                    <form onSubmit={saveProfile}>
                        <Card title="Department Profile & Accreditations">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="block"><span className={lbl}>Name</span><input name="name" defaultValue={d.name} className={input} required /></label>
                                <label className="block"><span className={lbl}>Short name</span><input name="short_name" defaultValue={d.short_name} className={input} required /></label>
                                <label className="block"><span className={lbl}>Faculty</span><input name="faculty" defaultValue={d.faculty ?? ''} className={input} /></label>
                                <label className="block"><span className={lbl}>Established Year</span><input name="established" defaultValue={d.established ?? ''} className={input} /></label>
                                <label className="block sm:col-span-2"><span className={lbl}>Tagline</span><input name="tagline" defaultValue={d.tagline ?? ''} className={input} /></label>
                                <label className="block sm:col-span-2"><span className={lbl}>About Department</span><textarea name="about" defaultValue={d.about ?? ''} rows={4} className={input} /></label>
                                <label className="block"><span className={lbl}>Vision</span><textarea name="vision" defaultValue={d.vision ?? ''} rows={3} className={input} /></label>
                                <label className="block"><span className={lbl}>Mission</span><textarea name="mission" defaultValue={d.mission ?? ''} rows={3} className={input} /></label>
                                <label className="block"><span className={lbl}>Head of Department Name</span><input name="hod_name" defaultValue={d.hod_name ?? ''} className={input} /></label>
                                <label className="block"><span className={lbl}>Head Designation</span><input name="hod_designation" defaultValue={d.hod_designation ?? ''} className={input} /></label>
                                <label className="block sm:col-span-2"><span className={lbl}>Head Message</span><textarea name="hod_message" defaultValue={d.hod_message ?? ''} rows={4} className={input} /></label>
                                <div className="sm:col-span-2"><span className={lbl}>Head Photo</span><div className="flex items-center gap-3">{d.hod_photo ? <img src={d.hod_photo} alt="" className="h-14 w-14 rounded-lg object-cover" /> : null}<input type="file" name="hod_photo_file" accept="image/*" className="text-xs" /></div></div>
                                <label className="block sm:col-span-2"><span className={lbl}>Accreditation Badge Text</span><input name="accreditation_badge" defaultValue={d.accreditation_badge ?? ''} placeholder="e.g. BAETE Accredited" className={input} /></label>
                                <label className="block sm:col-span-2"><span className={lbl}>Accreditation Title</span><input name="accreditation_title" defaultValue={d.accreditation_title ?? ''} placeholder="e.g. IEB BAETE 'Graded A' Accredited Program" className={input} /></label>
                                <label className="block sm:col-span-2"><span className={lbl}>Accreditation Description</span><textarea name="accreditation_text" defaultValue={d.accreditation_text ?? ''} rows={2} placeholder="Accreditation details displayed on the department homepage..." className={input} /></label>
                            </div>
                            <button type="submit" className={`${btn} mt-5 bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm`}>
                                <Save className="h-4 w-4" /> Save Profile
                            </button>
                        </Card>
                    </form>
                )}

                {/* Tab 2: Slides, Stats & Highlights */}
                {activeTab === 'slides_stats' && (
                    <div className="space-y-6">
                        <Collection
                            title="Home Slider"
                            slug={d.slug}
                            type="slides"
                            items={slides}
                            iconOptions={iconOptions}
                            done={flash}
                            describe={(i) => (i.title as string) || (i.image as string)}
                            fields={[
                                { key: 'image', label: 'Image', type: 'image' },
                                { key: 'title', label: 'Title', type: 'text' },
                                { key: 'caption', label: 'Caption', type: 'text' }
                            ]}
                        />
                        <Collection
                            title="Quick Stats"
                            slug={d.slug}
                            type="stats"
                            items={stats}
                            iconOptions={iconOptions}
                            done={flash}
                            describe={(i) => `${i.value} — ${i.label}`}
                            fields={[
                                { key: 'value', label: 'Value (e.g. 500+)', type: 'text' },
                                { key: 'label', label: 'Label (e.g. Students)', type: 'text' }
                            ]}
                        />
                        <Collection
                            title="Highlights"
                            slug={d.slug}
                            type="highlights"
                            items={highlights}
                            iconOptions={iconOptions}
                            done={flash}
                            describe={(i) => i.title as string}
                            fields={[
                                { key: 'icon', label: 'Icon', type: 'select' },
                                { key: 'title', label: 'Title', type: 'text' },
                                { key: 'text', label: 'Description', type: 'text' }
                            ]}
                        />
                    </div>
                )}

                {/* Tab 3: Curricula */}
                {activeTab === 'curricula' && (
                    <Collection
                        title="Department Curricula & Syllabi"
                        slug={d.slug}
                        type="curricula"
                        toggle
                        items={curricula}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `${i.title} (${i.year || 'Current'})`}
                        fields={[
                            { key: 'title', label: 'Syllabus Title', type: 'text' },
                            { key: 'year', label: 'Version / Year (e.g. 2019)', type: 'text' },
                            { key: 'degree', label: 'Degree Awarded', type: 'text' },
                            { key: 'duration', label: 'Duration (e.g. 4 Years)', type: 'text' },
                            { key: 'credits', label: 'Total Credits (e.g. 160+ Credits)', type: 'text' },
                            { key: 'description', label: 'Overview Description', type: 'textarea' },
                            { key: 'highlights', label: 'Curriculum Highlights (One item per line)', type: 'textarea', hint: 'Enter each bullet point on a separate line' },
                            { key: 'file', label: 'Syllabus Document (PDF)', type: 'file' }
                        ]}
                    />
                )}

                {/* Tab 4: Laboratories */}
                {activeTab === 'laboratories' && (
                    <div className="space-y-6">
<Collection
                        title="Department Laboratories"
                        slug={d.slug}
                        type="laboratories"
                        toggle
                        items={laboratories}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `${i.name} (/${i.slug})`}
                        fields={[
                            { key: 'name', label: 'Laboratory Name', type: 'text' },
                            { key: 'slug', label: 'URL Slug (e.g. programming-os)', type: 'text', hint: 'Leave blank to auto-generate from name' },
                            { key: 'description', label: 'About the Laboratory', type: 'textarea' },
                            { key: 'equipment', label: 'Equipment List (One per line)', type: 'textarea', hint: 'Enter each piece of equipment on a separate line' },
                            { key: 'objectives', label: 'Learning Objectives (One per line)', type: 'textarea', hint: 'Enter each objective on a separate line' },
                            { key: 'images', label: 'Photos (one URL per line)', type: 'images', hint: 'Delete a line to remove a photo, or upload new photos below' }
                        ]}
                    />
                        <Collection
                            title="Laboratory In-charges & Team"
                            slug={d.slug}
                            type="lab_people"
                            toggle
                            items={labPeople}
                            iconOptions={iconOptions}
                            done={flash}
                            describe={(i) => `${(laboratories.find((l) => l.id === i.laboratory_id)?.name as string) ?? 'Laboratory'} — ${i.role}: ${i.name}`}
                            fields={[
                                {
                                    key: 'laboratory_id',
                                    label: 'Laboratory',
                                    type: 'select',
                                    options: laboratories.map((l) => ({ value: l.id, label: l.name as string })),
                                },
                                { key: 'role', label: 'Role', type: 'text', suggestions: ['Lab In-charge', 'Assistant Lab In-charge', 'Lab Coordinator', 'Lab Assistant', 'Lab Technician', 'Lab Attendant'] },
                                {
                                    key: 'member_id',
                                    label: 'Pick from faculty & staff (optional)',
                                    type: 'select',
                                    options: [{ value: '', label: '— Not a listed member / type below —' }, ...memberOptions.map((m) => ({ value: m.id, label: m.designation ? `${m.name} — ${m.designation}` : m.name }))],
                                    hint: 'Fills in the name, designation, photo, phone and email below when they are left empty.',
                                },
                                { key: 'name', label: 'Name', type: 'text' },
                                { key: 'designation', label: 'Designation', type: 'text' },
                                { key: 'phone', label: 'Phone', type: 'text' },
                                { key: 'email', label: 'Email', type: 'text' },
                                { key: 'photo', label: 'Photo', type: 'image' },
                            ]}
                        />
                    </div>
                )}

                {/* Tab 5: Achievements */}
                {activeTab === 'achievements' && (
                    <Collection
                        title="Notable Achievements & Awards"
                        slug={d.slug}
                        type="achievements"
                        toggle
                        items={achievements}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `${i.title} [${i.type || 'Award'}]`}
                        fields={[
                            { key: 'title', label: 'Achievement Title', type: 'text' },
                            { key: 'type', label: 'Type / Tag (e.g. National Champion)', type: 'text' },
                            { key: 'icon', label: 'Icon', type: 'select' },
                            { key: 'color', label: 'Color Theme', type: 'select', options: ['emerald', 'blue', 'purple', 'amber', 'pink', 'rose', 'indigo'] },
                            { key: 'team_title', label: 'Team Name (e.g. Team HAKO)', type: 'text' },
                            { key: 'description', label: 'Brief Description', type: 'textarea' },
                            { key: 'details', label: 'Extra Details', type: 'textarea' },
                            { key: 'team_members', label: 'Team Members (one per line: Name | Batch)', type: 'textarea', columns: ['name', 'batch'], hint: 'e.g. Maria Mehedy | CSE 8th Batch' },
                            { key: 'link', label: 'External Press Link / Proof URL', type: 'text' }
                        ]}
                    />
                )}

                {/* Tab 6: Clubs & Societies */}
                {activeTab === 'societies' && (
                    <Collection
                        title="Clubs & Alumni Societies"
                        slug={d.slug}
                        type="societies"
                        toggle
                        items={societies}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `${i.name} (${i.type})`}
                        fields={[
                            { key: 'name', label: 'Society / Club Name', type: 'text' },
                            { key: 'slug', label: 'Slug (e.g. cse-society)', type: 'text' },
                            { key: 'type', label: 'Category', type: 'select', options: ['society', 'club', 'alumni'] },
                            { key: 'member_count', label: 'Member Count (e.g. 500+ Members)', type: 'text' },
                            { key: 'established', label: 'Established Year (e.g. Est. 2015)', type: 'text' },
                            { key: 'description', label: 'About Society', type: 'textarea' },
                            { key: 'activities', label: 'Activities (one per line: Title | Icon | Description)', type: 'textarea', columns: ['title', 'icon', 'description'], hint: `e.g. Study Tours | BookOpen | Educational visits. Icons: ${iconOptions.join(', ')}` },
                            { key: 'committee', label: 'Committee (one per line: Role | Name | Designation | Photo URL)', type: 'textarea', columns: ['role', 'name', 'designation', 'image'], hint: 'e.g. President | Dr. A. Rahman | Professor, Dept. of CSE | /storage/members/a.jpg (photo optional)' },
                            { key: 'committee_pdf', label: 'Executive Committee / Constitution PDF', type: 'file' }
                        ]}
                    />
                )}

                {/* Tab 7: OBE Objectives */}
                {activeTab === 'obes' && (
                    <Collection
                        title="Outcome Based Education (PEO & PLO)"
                        slug={d.slug}
                        type="obes"
                        toggle
                        items={obes}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `${i.code} — ${i.title || (i.description as string)?.slice(0, 40)}`}
                        fields={[
                            { key: 'type', label: 'Objective Type', type: 'select', options: ['peo', 'plo'] },
                            { key: 'code', label: 'Identifier Code (e.g. PEO-1, PLO1)', type: 'text' },
                            { key: 'title', label: 'Title / Competency', type: 'text' },
                            { key: 'description', label: 'Outcome Description', type: 'textarea' }
                        ]}
                    />
                )}

                {/* Tab 8: Online Resources */}
                {activeTab === 'online_resources' && (
                    <Collection
                        title="Online Resources & Materials"
                        slug={d.slug}
                        type="online_resources"
                        toggle
                        items={onlineResources}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `${i.title} (${i.category || 'General'})`}
                        fields={[
                            { key: 'title', label: 'Resource Title', type: 'text' },
                            { key: 'link', label: 'Google Drive / External URL', type: 'text', hint: 'Direct shareable Google Drive link or download URL' },
                            { key: 'category', label: 'Category / Semester', type: 'text', hint: 'e.g. 1st Year 1st Semester, Lecture Notes, Reference Books' },
                            { key: 'description', label: 'Brief Description', type: 'textarea' }
                        ]}
                    />
                )}

                {/* Tab 9: Research & Thesis */}
                {activeTab === 'researches' && (
                    <Collection
                        title="Research Publications & Thesis Projects"
                        slug={d.slug}
                        type="researches"
                        toggle
                        items={researches}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `[${(i.type as string)?.toUpperCase()}] ${i.title}`}
                        fields={[
                            { key: 'type', label: 'Type', type: 'select', options: ['publication', 'thesis'] },
                            { key: 'category', label: 'Category', type: 'text', hint: 'e.g. Journal Paper, Conference Paper, Undergrad Thesis 2024' },
                            { key: 'title', label: 'Paper / Thesis Title', type: 'text' },
                            { key: 'authors', label: 'Authors / Students', type: 'textarea', hint: 'Names of authors or student team members' },
                            { key: 'journal_conference', label: 'Journal / Publisher / Conference', type: 'text' },
                            { key: 'year', label: 'Year', type: 'text' },
                            { key: 'supervisor', label: 'Supervisor (for thesis)', type: 'text' },
                            { key: 'students_info', label: 'Student IDs (for thesis)', type: 'text' },
                            { key: 'link', label: 'Paper / Abstract URL', type: 'text' },
                            { key: 'pdf_file', label: 'Full Paper / Abstract PDF', type: 'file' }
                        ]}
                    />
                )}

                {/* Tab 10: Student Voice */}
                {activeTab === 'student_voices' && (
                    <Collection
                        title="Student Voices & Testimonials"
                        slug={d.slug}
                        type="student_voices"
                        toggle
                        items={studentVoices}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `${i.student_name} (${i.batch || 'Student'})`}
                        fields={[
                            { key: 'student_name', label: 'Student Name', type: 'text' },
                            { key: 'student_id', label: 'Student ID', type: 'text' },
                            { key: 'batch', label: 'Batch / Year (e.g. 1st Batch, Level-4)', type: 'text' },
                            { key: 'title', label: 'Story Headline / Title', type: 'text' },
                            { key: 'quote', label: 'Student Reflection / Testimonial Text', type: 'textarea' },
                            { key: 'profile_link', label: 'Social / Portfolio Link (Facebook/LinkedIn)', type: 'text' },
                            { key: 'image', label: 'Student Photo', type: 'image' }
                        ]}
                    />
                )}

                {/* Tab 11: Galleries (Photos & Videos) */}
                {activeTab === 'galleries' && (
                    <Collection
                        title="Photo & Video Galleries"
                        slug={d.slug}
                        type="galleries"
                        toggle
                        items={galleries}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `[${(i.type as string)?.toUpperCase()}] ${i.title}`}
                        fields={[
                            { key: 'type', label: 'Gallery Media Type', type: 'select', options: ['photo', 'video'] },
                            { key: 'title', label: 'Album / Video Title', type: 'text' },
                            { key: 'category', label: 'Category / Occasion', type: 'text', hint: 'e.g. Field Survey, Department Life, Lab Facilities' },
                            { key: 'description', label: 'Description / Captions', type: 'textarea' },
                            { key: 'images', label: 'Photos (one URL per line)', type: 'images', hint: 'Delete a line to remove a photo, or upload new photos below' },
                            { key: 'video_url', label: 'Video URL (Local MP4 path or YouTube)', type: 'text', hint: 'e.g. /videos/ce/BAUST_CE.mp4' }
                        ]}
                    />
                )}

                {/* Tab 12: Alumni Information */}
                {activeTab === 'alumni' && (
                    <Collection
                        title="Alumni Information (Job Holders & Higher Studies)"
                        slug={d.slug}
                        type="alumni"
                        toggle
                        items={alumni}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `[${(i.type as string) === 'higher_study' ? 'Higher Study' : 'Job Holder'}] ${i.name} (${i.batch || ''})`}
                        fields={[
                            { key: 'type', label: 'Type', type: 'select', options: ['job_holder', 'higher_study'] },
                            { key: 'name', label: 'Alumnus Full Name', type: 'text' },
                            { key: 'batch', label: 'Batch (e.g. 10th, 11th)', type: 'text' },
                            { key: 'passing_year', label: 'Passing / Graduation Year (e.g. 2024)', type: 'text' },
                            { key: 'designation', label: 'Position / Degree', type: 'text', hint: 'Job title (e.g. BOQ Coordinator) OR degree (e.g. MSc in CE)' },
                            { key: 'organization', label: 'Organization / Institution', type: 'text', hint: 'Company (e.g. Maam Intl) OR university (e.g. KUET)' },
                            { key: 'image', label: 'Photo', type: 'image' }
                        ]}
                    />
                )}
            </div>
        </AppLayout>
    );
}
