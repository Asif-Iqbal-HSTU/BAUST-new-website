import React, { useRef, useState } from 'react';
import { FileText, Film, Paperclip, X } from 'lucide-react';

export interface Attachment {
    id: number;
    url: string;
    original_name: string;
    mime: string | null;
    size: number;
    is_image: boolean;
    is_video: boolean;
}

export const STATUS_STYLE: Record<string, string> = {
    submitted: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
    in_review: 'bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300',
    in_progress: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    needs_info: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300',
    done: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    declined: 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
};

export const PRIORITY_STYLE: Record<string, string> = {
    low: 'text-neutral-500',
    normal: 'text-sky-700 dark:text-sky-400',
    high: 'text-amber-700 dark:text-amber-400',
    urgent: 'text-red-600 dark:text-red-400',
};

export function StatusBadge({ status, label }: { status: string; label: string }) {
    return <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${STATUS_STYLE[status] ?? ''}`}>{label}</span>;
}

export function formatSize(bytes: number): string {
    if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export const MAX_FILES = 10;
export const MAX_FILE_MB = 50;
export const MAX_TOTAL_MB = 95;
export const ACCEPT = 'image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip';

/** File picker with drag and drop, previews and size checks (files are sent with the form). */
export function FilePicker({ files, onChange, error }: { files: File[]; onChange: (files: File[]) => void; error?: string }) {
    const input = useRef<HTMLInputElement>(null);
    const [over, setOver] = useState(false);
    const [problem, setProblem] = useState<string | null>(null);

    const add = (list: FileList | null) => {
        if (!list) return;
        const next = [...files];
        for (const file of Array.from(list)) {
            if (file.size > MAX_FILE_MB * 1024 * 1024) {
                setProblem(`"${file.name}" is larger than ${MAX_FILE_MB} MB.`);
                continue;
            }
            if (next.length >= MAX_FILES) {
                setProblem(`You can attach up to ${MAX_FILES} files.`);
                break;
            }
            next.push(file);
        }
        const total = next.reduce((sum, f) => sum + f.size, 0);
        if (total > MAX_TOTAL_MB * 1024 * 1024) {
            setProblem(`All files together must stay under ${MAX_TOTAL_MB} MB. Share larger videos as a Google Drive link in the description.`);
            return;
        }
        if (next.length === files.length + list.length) setProblem(null);
        onChange(next);
    };

    return (
        <div>
            <div
                onDragOver={(e) => { e.preventDefault(); setOver(true); }}
                onDragLeave={() => setOver(false)}
                onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); }}
                onClick={() => input.current?.click()}
                className={`cursor-pointer rounded-xl border-2 border-dashed p-5 text-center transition-colors ${over ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' : 'border-neutral-300 hover:border-emerald-400 dark:border-neutral-700'}`}
            >
                <Paperclip className="mx-auto mb-1 h-5 w-5 text-emerald-600" />
                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Drop files here or click to choose</p>
                <p className="text-xs text-neutral-500">Screenshots, photos, videos, PDFs or documents · up to {MAX_FILES} files, {MAX_FILE_MB} MB each, {MAX_TOTAL_MB} MB in total</p>
                <input ref={input} type="file" multiple accept={ACCEPT} className="hidden" onChange={(e) => { add(e.target.files); e.target.value = ''; }} />
            </div>
            {(problem || error) && <p className="mt-1.5 text-xs font-semibold text-red-600">{problem || error}</p>}
            {files.length > 0 && (
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {files.map((file, i) => (
                        <li key={`${file.name}-${i}`} className="flex items-center gap-3 rounded-lg border border-neutral-200 p-2 dark:border-neutral-800">
                            {file.type.startsWith('image/') ? (
                                <img src={URL.createObjectURL(file)} alt="" className="h-10 w-10 flex-shrink-0 rounded object-cover" />
                            ) : (
                                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800">
                                    {file.type.startsWith('video/') ? <Film className="h-5 w-5 text-neutral-500" /> : <FileText className="h-5 w-5 text-neutral-500" />}
                                </span>
                            )}
                            <div className="min-w-0 flex-1">
                                <div className="truncate text-xs font-semibold">{file.name}</div>
                                <div className="text-[11px] text-neutral-500">{formatSize(file.size)}</div>
                            </div>
                            <button type="button" onClick={() => onChange(files.filter((_, j) => j !== i))} className="rounded p-1 text-neutral-400 hover:text-red-600" title="Remove">
                                <X className="h-4 w-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

/** Uploaded files: images and videos inline, other files as download links. */
export function AttachmentList({ files }: { files: Attachment[] }) {
    if (files.length === 0) return null;
    const media = files.filter((f) => f.is_image || f.is_video);
    const docs = files.filter((f) => !f.is_image && !f.is_video);

    return (
        <div className="space-y-3">
            {media.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {media.map((f) => (
                        <a key={f.id} href={f.url} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800" title={f.original_name}>
                            {f.is_image ? (
                                <img src={f.url} alt={f.original_name} className="h-36 w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                            ) : (
                                <video src={f.url} controls className="h-36 w-full bg-black object-contain" onClick={(e) => e.preventDefault()} />
                            )}
                            <div className="truncate px-2 py-1 text-[11px] text-neutral-500">{f.original_name}</div>
                        </a>
                    ))}
                </div>
            )}
            {docs.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                    {docs.map((f) => (
                        <li key={f.id}>
                            <a href={f.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold hover:border-emerald-400 dark:border-neutral-800">
                                <FileText className="h-4 w-4 text-emerald-600" /> {f.original_name} <span className="font-normal text-neutral-400">{formatSize(f.size)}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

