import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
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
    iconOptions: string[];
}

const input = 'w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none';
const btn = 'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors';
const lbl = 'mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400';

type FieldDef = {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'select' | 'image' | 'file';
    options?: string[];
    hint?: string;
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
        v = value.map(x => typeof x === 'string' ? x : JSON.stringify(x)).join('\n');
    } else if (value !== undefined && value !== null) {
        v = String(value);
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
            <input type={def.type === 'number' ? 'number' : 'text'} name={def.key} defaultValue={v} className={input} />
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
    describe
}: {
    title: string;
    slug: string;
    type: string;
    items: Item[];
    fields: FieldDef[];
    iconOptions: string[];
    done: (m: string) => void;
    describe: (i: Item) => string;
}) {
    const [adding, setAdding] = useState(false);
    const [editing, setEditing] = useState<number | null>(null);

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
                {items.map((it) => editing === it.id ? (
                    <form
                        key={it.id}
                        onSubmit={(e) => submit(e, `/admin/departments/${slug}/collection/${type}/${it.id}`, () => setEditing(null))}
                        className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 dark:border-emerald-900 dark:bg-emerald-950/20"
                    >
                        <div className="grid gap-3 sm:grid-cols-2">
                            {fields.map((f) => <Field key={f.key} def={f} value={it[f.key]} iconOptions={iconOptions} />)}
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
                    <div key={it.id} className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 p-3 dark:border-neutral-800 hover:border-emerald-200 transition-colors">
                        <span className="truncate text-sm font-medium text-neutral-700 dark:text-neutral-300">
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
    iconOptions
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
                        <h1 className="text-2xl font-black text-gray-900 dark:text-white">{d.name}</h1>
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
                                { key: 'caption', label: 'Caption', type: 'text' },
                                { key: 'order', label: 'Order', type: 'number' }
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
                                { key: 'label', label: 'Label (e.g. Students)', type: 'text' },
                                { key: 'order', label: 'Order', type: 'number' }
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
                                { key: 'text', label: 'Description', type: 'text' },
                                { key: 'order', label: 'Order', type: 'number' }
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
                            { key: 'file', label: 'Syllabus Document (PDF)', type: 'file' },
                            { key: 'order', label: 'Display Order', type: 'number' }
                        ]}
                    />
                )}

                {/* Tab 4: Laboratories */}
                {activeTab === 'laboratories' && (
                    <Collection
                        title="Department Laboratories"
                        slug={d.slug}
                        type="laboratories"
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
                            { key: 'images', label: 'Image URLs (One per line)', type: 'textarea', hint: 'e.g. /images/departments/cse/laboratory/programming-os/2.jpg' },
                            { key: 'order', label: 'Display Order', type: 'number' }
                        ]}
                    />
                )}

                {/* Tab 5: Achievements */}
                {activeTab === 'achievements' && (
                    <Collection
                        title="Notable Achievements & Awards"
                        slug={d.slug}
                        type="achievements"
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
                            { key: 'link', label: 'External Press Link / Proof URL', type: 'text' },
                            { key: 'order', label: 'Display Order', type: 'number' }
                        ]}
                    />
                )}

                {/* Tab 6: Clubs & Societies */}
                {activeTab === 'societies' && (
                    <Collection
                        title="Clubs & Alumni Societies"
                        slug={d.slug}
                        type="societies"
                        items={societies}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `${i.name} (${i.type})`}
                        fields={[
                            { key: 'name', label: 'Society / Club Name', type: 'text' },
                            { key: 'slug', label: 'Slug (e.g. cse-society)', type: 'text' },
                            { key: 'type', label: 'Category', type: 'select', options: ['society', 'alumni'] },
                            { key: 'member_count', label: 'Member Count (e.g. 500+ Members)', type: 'text' },
                            { key: 'established', label: 'Established Year (e.g. Est. 2015)', type: 'text' },
                            { key: 'description', label: 'About Society', type: 'textarea' },
                            { key: 'committee_pdf', label: 'Executive Committee / Constitution PDF', type: 'file' },
                            { key: 'order', label: 'Display Order', type: 'number' }
                        ]}
                    />
                )}

                {/* Tab 7: OBE Objectives */}
                {activeTab === 'obes' && (
                    <Collection
                        title="Outcome Based Education (PEO & PLO)"
                        slug={d.slug}
                        type="obes"
                        items={obes}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `${i.code} — ${i.title || (i.description as string)?.slice(0, 40)}`}
                        fields={[
                            { key: 'type', label: 'Objective Type', type: 'select', options: ['peo', 'plo'] },
                            { key: 'code', label: 'Identifier Code (e.g. PEO-1, PLO1)', type: 'text' },
                            { key: 'title', label: 'Title / Competency', type: 'text' },
                            { key: 'description', label: 'Outcome Description', type: 'textarea' },
                            { key: 'order', label: 'Display Order', type: 'number' }
                        ]}
                    />
                )}

                {/* Tab 8: Online Resources */}
                {activeTab === 'online_resources' && (
                    <Collection
                        title="Online Resources & Materials"
                        slug={d.slug}
                        type="online_resources"
                        items={onlineResources}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `${i.title} (${i.category || 'General'})`}
                        fields={[
                            { key: 'title', label: 'Resource Title', type: 'text' },
                            { key: 'link', label: 'Google Drive / External URL', type: 'text', hint: 'Direct shareable Google Drive link or download URL' },
                            { key: 'category', label: 'Category / Semester', type: 'text', hint: 'e.g. 1st Year 1st Semester, Lecture Notes, Reference Books' },
                            { key: 'description', label: 'Brief Description', type: 'textarea' },
                            { key: 'order', label: 'Display Order', type: 'number' }
                        ]}
                    />
                )}

                {/* Tab 9: Research & Thesis */}
                {activeTab === 'researches' && (
                    <Collection
                        title="Research Publications & Thesis Projects"
                        slug={d.slug}
                        type="researches"
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
                            { key: 'pdf_file', label: 'Full Paper / Abstract PDF', type: 'file' },
                            { key: 'order', label: 'Display Order', type: 'number' }
                        ]}
                    />
                )}

                {/* Tab 10: Student Voice */}
                {activeTab === 'student_voices' && (
                    <Collection
                        title="Student Voices & Testimonials"
                        slug={d.slug}
                        type="student_voices"
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
                            { key: 'image', label: 'Student Photo', type: 'image' },
                            { key: 'order', label: 'Display Order', type: 'number' }
                        ]}
                    />
                )}

                {/* Tab 11: Galleries (Photos & Videos) */}
                {activeTab === 'galleries' && (
                    <Collection
                        title="Photo & Video Galleries"
                        slug={d.slug}
                        type="galleries"
                        items={galleries}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `[${(i.type as string)?.toUpperCase()}] ${i.title}`}
                        fields={[
                            { key: 'type', label: 'Gallery Media Type', type: 'select', options: ['photo', 'video'] },
                            { key: 'title', label: 'Album / Video Title', type: 'text' },
                            { key: 'category', label: 'Category / Occasion', type: 'text', hint: 'e.g. Field Survey, Department Life, Lab Facilities' },
                            { key: 'description', label: 'Description / Captions', type: 'textarea' },
                            { key: 'images', label: 'Photo URLs (one per line)', type: 'textarea', hint: 'Enter photo URLs, one per line (e.g. /images/departments/ce/gallery/ce_photo_1.jpg)' },
                            { key: 'video_url', label: 'Video URL (Local MP4 path or YouTube)', type: 'text', hint: 'e.g. /videos/ce/BAUST_CE.mp4' },
                            { key: 'order', label: 'Display Order', type: 'number' }
                        ]}
                    />
                )}

                {/* Tab 12: Alumni Information */}
                {activeTab === 'alumni' && (
                    <Collection
                        title="Alumni Information (Job Holders & Higher Studies)"
                        slug={d.slug}
                        type="alumni"
                        items={alumni}
                        iconOptions={iconOptions}
                        done={flash}
                        describe={(i) => `[${(i.type as string) === 'higher_study' ? 'Higher Study' : 'Job Holder'}] ${i.name} (${i.batch || ''})`}
                        fields={[
                            { key: 'type', label: 'Type', type: 'select', options: ['job_holder', 'higher_study'] },
                            { key: 'name', label: 'Alumnus Full Name', type: 'text' },
                            { key: 'batch', label: 'Batch (e.g. 10th, 11th)', type: 'text' },
                            { key: 'passing_year', label: 'Passing / Graduation Year (e.g. 2024)', type: 'text' },
                            { key: 'designation', label: 'Position / Institution / Degree', type: 'text', hint: 'Job title & company (e.g. BOQ Coordinator, Maam Intl) OR degree & institution (e.g. MSc in CE, KUET)' },
                            { key: 'order', label: 'Display Order', type: 'number' }
                        ]}
                    />
                )}
            </div>
        </AppLayout>
    );
}
