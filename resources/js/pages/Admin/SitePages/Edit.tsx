import React, { useMemo, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { ChevronDown, ChevronRight, ChevronUp, ExternalLink, GripVertical, Plus, RotateCcw, Save, Trash2, Upload } from 'lucide-react';

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
type Path = (string | number)[];

interface Props {
    page: { key: string; section: string; title: string; content: Json; updated_at: string | null };
    defaults: Json | null;
    publicUrl: string | null;
}

const input = 'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900';
const btn = 'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors';
const iconBtn = 'rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-25 dark:hover:bg-neutral-800';

/** Keys whose value is an uploaded image or document path. */
const FILE_KEY = /(image|photo|pdf|file|logo|src|avatar|picture|thumbnail|banner)$/i;
const IMAGE_VALUE = /\.(jpe?g|png|gif|webp|svg)(\?.*)?$/i;
/** Keys whose text is usually long enough for a text area. */
const LONG_KEY = /(text|description|body|paragraph|note|notes|message|about|intro|content|details|summary|answer|subtitle)$/i;

const humanize = (key: string) => {
    const words = key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').trim();
    return words.charAt(0).toUpperCase() + words.slice(1);
};

const isObject = (v: Json): v is { [key: string]: Json } => v !== null && typeof v === 'object' && !Array.isArray(v);

/** Value at a path, with list indexes falling back to the first item (for shapes). */
function shapeAt(root: Json | null, path: Path): Json | undefined {
    let cur: Json | undefined = root ?? undefined;
    for (const part of path) {
        if (cur === undefined || cur === null) return undefined;
        if (Array.isArray(cur)) cur = cur[typeof part === 'number' ? Math.min(part, cur.length - 1) : 0] ?? cur[0];
        else if (isObject(cur)) cur = cur[String(part)];
        else return undefined;
    }
    return cur;
}

/** An empty value with the same shape (strings blank, numbers 0, lists keep one blank item of objects). */
function blank(shape: Json | undefined): Json {
    if (shape === undefined || shape === null) return '';
    if (typeof shape === 'string') return '';
    if (typeof shape === 'number') return 0;
    if (typeof shape === 'boolean') return false;
    if (Array.isArray(shape)) return shape.length > 0 && isObject(shape[0]) ? [blank(shape[0])] : [];
    return Object.fromEntries(Object.entries(shape).map(([k, v]) => [k, blank(v)]));
}

function setAt(root: Json, path: Path, value: Json): Json {
    if (path.length === 0) return value;
    const [head, ...rest] = path;
    if (Array.isArray(root)) {
        const copy = [...root];
        copy[head as number] = setAt(copy[head as number], rest, value);
        return copy;
    }
    const obj = isObject(root) ? root : {};
    return { ...obj, [head]: setAt(obj[String(head)] ?? null, rest, value) };
}

function xsrfToken(): string {
    const match = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
}

/** First short text in an item, used as its title in a collapsed list. */
function summary(item: Json, index: number): string {
    if (typeof item === 'string') return item || `Item ${index + 1}`;
    if (isObject(item)) {
        for (const v of Object.values(item)) {
            if (typeof v === 'string' && v.trim() && !FILE_KEY.test(v) && v.length < 120 && !v.startsWith('/')) return v;
        }
        for (const v of Object.values(item)) {
            if (isObject(v) || Array.isArray(v)) return summary(v as Json, index);
        }
    }
    if (Array.isArray(item)) return item.filter((v) => typeof v === 'string').join(' · ').slice(0, 80) || `Item ${index + 1}`;
    return `Item ${index + 1}`;
}

interface NodeProps {
    label: string;
    fieldKey: string;
    value: Json;
    path: Path;
    defaults: Json | null;
    pageKey: string;
    onChange: (path: Path, value: Json) => void;
    depth: number;
}

function FileField({ value, path, pageKey, onChange }: { value: string; path: Path; pageKey: string; onChange: NodeProps['onChange'] }) {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const upload = async (file: File) => {
        setBusy(true);
        setError(null);
        const body = new FormData();
        body.append('file', file);
        try {
            const res = await fetch(`/admin/site-pages/${pageKey}/upload`, {
                method: 'POST',
                body,
                credentials: 'same-origin',
                headers: { Accept: 'application/json', 'X-XSRF-TOKEN': xsrfToken(), 'X-Requested-With': 'XMLHttpRequest' },
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.message || 'Upload failed');
            onChange(path, json.path);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Upload failed');
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            {value && IMAGE_VALUE.test(value) && <img src={value} alt="" className="h-14 w-14 rounded-lg border border-neutral-200 object-cover" />}
            <input type="text" value={value} onChange={(e) => onChange(path, e.target.value)} className={`${input} min-w-[12rem] flex-1`} placeholder="Path or link" />
            <label className={`${btn} cursor-pointer border border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300`}>
                <Upload className="h-4 w-4" /> {busy ? 'Uploading…' : 'Upload'}
                <input type="file" className="hidden" disabled={busy} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
            </label>
            {value && !IMAGE_VALUE.test(value) && (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-emerald-700 underline">Open</a>
            )}
            {error && <span className="w-full text-xs text-red-600">{error}</span>}
        </div>
    );
}

function ListField({ label, value, path, defaults, pageKey, onChange, depth }: NodeProps & { value: Json[] }) {
    const [open, setOpen] = useState<Record<number, boolean>>({});
    const [dragged, setDragged] = useState<number | null>(null);
    const objects = value.length > 0 ? isObject(value[0]) || Array.isArray(value[0]) : isObject(shapeAt(defaults, [...path, 0]) ?? null);

    const move = (from: number, to: number) => {
        if (to < 0 || to >= value.length || from === to) return;
        const next = [...value];
        const [item] = next.splice(from, 1);
        next.splice(to, 0, item);
        onChange(path, next);
    };
    const add = () => {
        const shape = value[0] ?? shapeAt(defaults, [...path, 0]);
        onChange(path, [...value, blank(shape)]);
        if (objects) setOpen((o) => ({ ...o, [value.length]: true }));
    };
    const remove = (index: number) => {
        if (!confirm('Remove this item?')) return;
        onChange(path, value.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">{label} <span className="font-medium normal-case text-neutral-400">({value.length})</span></div>
            {value.map((item, index) => (
                <div
                    key={index}
                    draggable
                    onDragStart={(e) => { setDragged(index); e.dataTransfer.effectAllowed = 'move'; }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); if (dragged !== null) move(dragged, index); setDragged(null); }}
                    onDragEnd={() => setDragged(null)}
                    className={`rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 ${dragged === index ? 'opacity-30' : ''}`}
                >
                    <div className="flex items-center gap-2 p-2">
                        <span className="cursor-grab p-1 text-neutral-400 active:cursor-grabbing" title="Drag to reorder"><GripVertical className="h-4 w-4" /></span>
                        {objects ? (
                            <button type="button" onClick={() => setOpen((o) => ({ ...o, [index]: !o[index] }))} className="flex min-w-0 flex-1 items-center gap-2 text-left text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                {open[index] ? <ChevronDown className="h-4 w-4 flex-shrink-0" /> : <ChevronRight className="h-4 w-4 flex-shrink-0" />}
                                <span className="truncate">{summary(item, index)}</span>
                            </button>
                        ) : (
                            <div className="flex-1">
                                <Node label="" fieldKey={label} value={item} path={[...path, index]} defaults={defaults} pageKey={pageKey} onChange={onChange} depth={depth + 1} />
                            </div>
                        )}
                        <button type="button" className={iconBtn} disabled={index === 0} onClick={() => move(index, index - 1)} title="Move up"><ChevronUp className="h-4 w-4" /></button>
                        <button type="button" className={iconBtn} disabled={index === value.length - 1} onClick={() => move(index, index + 1)} title="Move down"><ChevronDown className="h-4 w-4" /></button>
                        <button type="button" className={`${iconBtn} hover:text-red-600`} onClick={() => remove(index)} title="Remove"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    {objects && open[index] && (
                        <div className="border-t border-neutral-100 p-3 dark:border-neutral-800">
                            <Node label="" fieldKey="" value={item} path={[...path, index]} defaults={defaults} pageKey={pageKey} onChange={onChange} depth={depth + 1} />
                        </div>
                    )}
                </div>
            ))}
            <button type="button" onClick={add} className={`${btn} border border-dashed border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300`}>
                <Plus className="h-4 w-4" /> Add {label ? label.toLowerCase().replace(/s$/, '') : 'item'}
            </button>
        </div>
    );
}

function Node(props: NodeProps) {
    const { label, fieldKey, value, path, defaults, pageKey, onChange, depth } = props;

    if (Array.isArray(value)) return <ListField {...props} value={value} />;

    if (value === null) {
        const shape = shapeAt(defaults, path);
        return (
            <div className="space-y-1">
                {label && <span className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400">{label}</span>}
                <button type="button" onClick={() => onChange(path, blank(shape ?? ''))} className={`${btn} border border-dashed border-emerald-300 text-emerald-700`}>
                    <Plus className="h-4 w-4" /> Add {label.toLowerCase() || 'value'}
                </button>
            </div>
        );
    }

    if (isObject(value)) {
        const body = (
            <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(value).map(([k, v]) => {
                    const wide = Array.isArray(v) || isObject(v) || (typeof v === 'string' && (v.length > 60 || LONG_KEY.test(k) || FILE_KEY.test(k)));
                    return (
                        <div key={k} className={wide ? 'sm:col-span-2' : ''}>
                            <Node label={humanize(k)} fieldKey={k} value={v} path={[...path, k]} defaults={defaults} pageKey={pageKey} onChange={onChange} depth={depth + 1} />
                        </div>
                    );
                })}
            </div>
        );
        if (!label) return body;
        return (
            <fieldset className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                <legend className="px-1 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">{label}</legend>
                {body}
            </fieldset>
        );
    }

    const field = (() => {
        if (typeof value === 'boolean') {
            return <input type="checkbox" checked={value} onChange={(e) => onChange(path, e.target.checked)} className="h-4 w-4 accent-emerald-600" />;
        }
        if (typeof value === 'number') {
            return <input type="number" step="any" value={value} onChange={(e) => onChange(path, e.target.value === '' ? 0 : Number(e.target.value))} className={input} />;
        }
        if (FILE_KEY.test(fieldKey) || (IMAGE_VALUE.test(value) && value.startsWith('/'))) {
            return <FileField value={value} path={path} pageKey={pageKey} onChange={onChange} />;
        }
        if (value.length > 80 || value.includes('\n') || LONG_KEY.test(fieldKey)) {
            return <textarea value={value} onChange={(e) => onChange(path, e.target.value)} rows={Math.min(10, Math.max(2, Math.ceil(value.length / 90)))} className={input} />;
        }
        return <input type="text" value={value} onChange={(e) => onChange(path, e.target.value)} className={input} />;
    })();

    return (
        <label className="block">
            {label && <span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">{label}</span>}
            {field}
        </label>
    );
}

export default function Edit({ page, defaults, publicUrl }: Props) {
    const { flash } = usePage<SharedData & { flash?: { success?: string | null } }>().props;
    const [content, setContent] = useState<Json>(page.content);
    const [title, setTitle] = useState(page.title);
    const [saving, setSaving] = useState(false);
    const savedJson = useMemo(() => JSON.stringify(page.content), [page.content]);
    const dirty = JSON.stringify(content) !== savedJson || title !== page.title;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Website Pages', href: '/admin/site-pages' },
        { title: page.title, href: `/admin/site-pages/${page.key}` },
    ];

    const change = (path: Path, value: Json) => setContent((c) => setAt(c, path, value));

    const save = () => {
        setSaving(true);
        router.post(`/admin/site-pages/${page.key}`, { content: JSON.stringify(content), title }, {
            preserveScroll: true,
            onFinish: () => setSaving(false),
        });
    };

    const restore = () => {
        if (!confirm('Replace everything on this page with its original content? Your edits will be lost.')) return;
        router.post(`/admin/site-pages/${page.key}/reset`, {}, {
            preserveScroll: true,
            onSuccess: (p) => setContent((p.props as unknown as Props).page.content),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${page.title}`} />
            <div className="mx-auto w-full max-w-5xl space-y-5 p-4 pb-28 md:p-6 md:pb-28">
                <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:flex-row sm:items-end sm:justify-between dark:border-neutral-800 dark:bg-neutral-900">
                    <label className="block flex-1">
                        <span className="mb-1 block text-xs font-semibold text-neutral-600 dark:text-neutral-400">Page name (in the admin list)</span>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className={`${input} text-lg font-bold`} />
                    </label>
                    {publicUrl && (
                        <a href={publicUrl} target="_blank" rel="noopener noreferrer" className={`${btn} bg-emerald-700 text-white hover:bg-emerald-800`}>
                            <ExternalLink className="h-4 w-4" /> View page
                        </a>
                    )}
                </div>

                <p className="text-sm text-neutral-500">
                    Edit any text, add or remove list items (drag or use ↑ ↓ to reorder), and upload images or documents. Click <strong>Save changes</strong> to publish.
                </p>

                <div className="space-y-5">
                    {isObject(content) ? (
                        Object.entries(content).map(([k, v]) => (
                            <section key={k} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                                <h2 className="mb-4 text-base font-bold text-emerald-800 dark:text-emerald-300">{humanize(k)}</h2>
                                <Node label="" fieldKey={k} value={v} path={[k]} defaults={defaults} pageKey={page.key} onChange={change} depth={1} />
                            </section>
                        ))
                    ) : (
                        <Node label="" fieldKey="" value={content} path={[]} defaults={defaults} pageKey={page.key} onChange={change} depth={0} />
                    )}
                </div>
            </div>

            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/95">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
                    <span className="text-sm text-neutral-500">
                        {dirty ? 'You have unsaved changes.' : flash?.success ?? 'All changes saved.'}
                    </span>
                    <div className="flex gap-2">
                        {defaults && (
                            <button type="button" onClick={restore} className={`${btn} bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300`}>
                                <RotateCcw className="h-4 w-4" /> Restore original
                            </button>
                        )}
                        <button type="button" onClick={save} disabled={!dirty || saving} className={`${btn} bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50`}>
                            <Save className="h-4 w-4" /> {saving ? 'Saving…' : 'Save changes'}
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
