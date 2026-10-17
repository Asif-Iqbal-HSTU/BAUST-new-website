import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { update, store, index } from '@/routes/admin/members';
import RichTextEditor from '@/custom_components/RichTextEditor';
import { parseAreasOfInterest } from '@/custom_components/ProfileModal';
import {
    User,
    Briefcase,
    Mail,
    Phone,
    GraduationCap,
    Award,
    Layers,
    BookOpen,
    Image,
    Sparkles,
    CheckCircle2,
    ArrowLeft,
    Save,
    Trash2,
    Plus,
    Trophy,
    Presentation,
    FileText,
    Users,
    AlertCircle,
    X,
    ExternalLink,
} from 'lucide-react';

interface DeptItem {
    name: string;
    short_name?: string;
    slug: string;
}

interface Member {
    id: number;
    name: string;
    designation: string;
    is_head?: boolean;
    department: string;
    type: string;
    employment_type: string;
    status: string;
    category: string | null;
    biography?: string | null;
    experience?: string | null;
    research?: string | null;
    publications?: string | null;
    achievements?: string | null;
    seminars?: string | null;
    training?: string | null;
    others?: string | null;
    areas_of_interest?: string[] | null;
    phone: string | null;
    email: string | null;
    personal_email: string | null;
    education: string[];
    order: number;
    photo: string | null;
}

interface Props {
    member: Member | null;
    departments: (string | DeptItem)[];
}

type DossierTab = 'biography' | 'experience' | 'research' | 'publications' | 'achievements' | 'seminars' | 'training' | 'others';

interface FormState {
    _method: string;
    name: string;
    designation: string;
    is_head: boolean;
    department: string;
    type: string;
    employment_type: string;
    status: string;
    category: string;
    areas_of_interest: string[];
    biography: string;
    experience: string;
    research: string;
    publications: string;
    achievements: string;
    seminars: string;
    training: string;
    others: string;
    phone: string;
    email: string;
    personal_email: string;
    education: string[];
    order: number;
    photo_file: File | null;
    photo_url: string;
    clear_photo: boolean;
}

interface PhoneItem {
    number: string;
    tag: string;
    customTag?: string;
}

const PRESET_PHONE_TAGS = ['Official', 'Personal', 'WhatsApp', 'HoD / Office', 'Emergency', 'Other'];

function parsePhoneString(phoneStr: string | null | undefined): PhoneItem[] {
    if (!phoneStr || !phoneStr.trim()) {
        return [{ number: '', tag: 'Official', customTag: '' }];
    }
    const parts = phoneStr.split(/[,;\n]+/).map(p => p.trim()).filter(Boolean);
    if (parts.length === 0) {
        return [{ number: '', tag: 'Official', customTag: '' }];
    }
    return parts.map(part => {
        const match = part.match(/^(.*?)\s*\((.*?)\)$/);
        if (match) {
            const rawTag = match[2].trim();
            const matched = PRESET_PHONE_TAGS.find(t => t.toLowerCase() === rawTag.toLowerCase());
            if (matched) {
                return { number: match[1].trim(), tag: matched, customTag: '' };
            }
            return { number: match[1].trim(), tag: 'Other', customTag: rawTag };
        }
        return { number: part, tag: 'Official', customTag: '' };
    });
}

function formatPhoneItems(items: PhoneItem[]): string {
    return items
        .filter(item => item.number && item.number.trim())
        .map(item => {
            const num = item.number.trim();
            const finalTag = item.tag === 'Other' ? (item.customTag?.trim() || '') : (item.tag?.trim() || '');
            return finalTag ? `${num} (${finalTag})` : num;
        })
        .join(', ');
}

function parseEmailsString(emailsStr: string | null | undefined): string[] {
    if (!emailsStr || !emailsStr.trim()) {
        return [''];
    }
    const parts = emailsStr.split(/[,;\n]+/).map(e => e.trim()).filter(Boolean);
    return parts.length > 0 ? parts : [''];
}

function formatEmailsList(emails: string[]): string {
    return emails.map(e => e.trim()).filter(Boolean).join(', ');
}

const RANK_OPTIONS = [
    { value: 'professor', label: 'Professor' },
    { value: 'associate_professor', label: 'Associate Professor' },
    { value: 'assistant_professor', label: 'Assistant Professor' },
    { value: 'lecturer', label: 'Lecturer' },
    { value: 'teaching_assistant', label: 'Teaching Assistant' },
    { value: 'academic_officer', label: 'Academic Officer' },
    { value: 'academic_staff', label: 'Academic Staff' },
] as const;

function rankLabel(value: string): string {
    return RANK_OPTIONS.find(opt => opt.value === value)?.label || value;
}

export default function Form({ member, departments = [] }: Props) {
    const isEdit = !!member;
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const [activeDossierTab, setActiveDossierTab] = useState<DossierTab>('biography');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manage Members', href: '/admin/members' },
        { title: isEdit ? `Edit: ${member.name}` : 'Add New Member', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm<FormState>({
        _method: isEdit ? 'PUT' : 'POST',
        name: member?.name || '',
        designation: member?.designation || rankLabel('professor'),
        is_head: member?.is_head || false,
        department: (member?.department || user.department || 'cse') as string,
        type: member?.type || 'permanent',
        employment_type: member?.employment_type || 'faculty',
        status: member?.status || 'active',
        category: member?.category || 'professor',
        areas_of_interest: parseAreasOfInterest(member?.areas_of_interest),
        biography: member?.biography || '',
        experience: member?.experience || '',
        research: member?.research || '',
        publications: member?.publications || '',
        achievements: member?.achievements || '',
        seminars: member?.seminars || '',
        training: member?.training || '',
        others: member?.others || '',
        phone: member?.phone || '',
        email: member?.email || '',
        personal_email: member?.personal_email || '',
        education: member?.education && member.education.length > 0 ? member.education : [''],
        order: member?.order !== undefined ? member.order : 10,
        photo_file: null as File | null,
        photo_url: member?.photo && !member.photo.startsWith('/storage/') ? member.photo : '',
        clear_photo: false,
    });

    const [photoPreview, setPhotoPreview] = useState<string | null>(member?.photo || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setPhotoPreview(member?.photo || null);
        if (member?.photo && !member.photo.startsWith('/storage/')) {
            setData('photo_url', member.photo);
        }
    }, [member?.photo]);

    const [personalEmailList, setPersonalEmailList] = useState<string[]>(() =>
        parseEmailsString(member?.personal_email)
    );
    const [phoneList, setPhoneList] = useState<PhoneItem[]>(() =>
        parsePhoneString(member?.phone)
    );

    const updateEmailItem = (index: number, val: string) => {
        if (val.includes(',') || val.includes(';') || val.includes('\n')) {
            const split = val.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean);
            const updated = [...personalEmailList];
            updated.splice(index, 1, ...(split.length > 0 ? split : ['']));
            setPersonalEmailList(updated);
            setData('personal_email', formatEmailsList(updated));
        } else {
            const updated = [...personalEmailList];
            updated[index] = val;
            setPersonalEmailList(updated);
            setData('personal_email', formatEmailsList(updated));
        }
    };

    const addEmailItem = () => {
        const updated = [...personalEmailList, ''];
        setPersonalEmailList(updated);
    };

    const removeEmailItem = (index: number) => {
        const updated = personalEmailList.filter((_, i) => i !== index);
        const final = updated.length > 0 ? updated : [''];
        setPersonalEmailList(final);
        setData('personal_email', formatEmailsList(final));
    };

    const updatePhoneItem = (index: number, field: keyof PhoneItem, val: string) => {
        const updated = [...phoneList];
        updated[index] = { ...updated[index], [field]: val };
        setPhoneList(updated);
        setData('phone', formatPhoneItems(updated));
    };

    const addPhoneItem = (presetTag: string = 'Personal') => {
        const updated = [...phoneList, { number: '', tag: presetTag, customTag: '' }];
        setPhoneList(updated);
    };

    const removePhoneItem = (index: number) => {
        const updated = phoneList.filter((_, i) => i !== index);
        const final = updated.length > 0 ? updated : [{ number: '', tag: 'Official', customTag: '' }];
        setPhoneList(final);
        setData('phone', formatPhoneItems(final));
    };

    const [areasInputString, setAreasInputString] = useState<string>(() => {
        const parsed = parseAreasOfInterest(member?.areas_of_interest);
        return parsed.join(', ');
    });

    const handleAreasInputChange = (val: string) => {
        setAreasInputString(val);
        const tags = val
            .split(/[,;\n]+/)
            .map(s => s.replace(/[\[\]"']/g, '').trim())
            .filter(Boolean);
        setData('areas_of_interest', tags);
    };

    const handleRemoveAreaTag = (tagToRemove: string) => {
        const current = Array.isArray(data.areas_of_interest) ? data.areas_of_interest : [];
        const updated = current.filter(t => t !== tagToRemove);
        setData('areas_of_interest', updated);
        setAreasInputString(updated.join(', '));
    };

    const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('photo_file', file);
        if (file) {
            setData('photo_url', '');
            setData('clear_photo', false);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handlePhotoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setData('photo_url', val);
        if (val) {
            setData('photo_file', null);
            setData('clear_photo', false);
            setPhotoPreview(val);
        }
    };

    const handleClearPhoto = () => {
        setData('clear_photo', true);
        setData('photo_file', null);
        setData('photo_url', '');
        setPhotoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleEducationChange = (idx: number, val: string) => {
        const list = [...data.education];
        list[idx] = val;
        setData('education', list);
    };

    const handleAddEducationField = () => {
        setData('education', [...data.education, '']);
    };

    const handleRemoveEducationField = (idx: number) => {
        const list = [...data.education];
        list.splice(idx, 1);
        setData('education', list.length > 0 ? list : ['']);
    };

    const [feedbackModal, setFeedbackModal] = useState<{
        isOpen: boolean;
        type: 'success' | 'error';
        title: string;
        message: string;
        details?: string[];
    } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const submitOptions = {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                const isEx = data.status === 'ex_faculty';
                const statusLabel = isEx
                    ? 'Ex-Member'
                    : data.status === 'study_leave'
                    ? 'On Study Leave'
                    : 'Active Member';

                setData('photo_file', null);
                setData('clear_photo', false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }

                setFeedbackModal({
                    isOpen: true,
                    type: 'success',
                    title: isEdit ? 'Profile Updated Successfully!' : 'Member Added Successfully!',
                    message: isEdit
                        ? `${data.name}'s profile has been updated. Member status is now set to "${statusLabel}".`
                        : `${data.name} has been added to the directory with status "${statusLabel}".`,
                });
            },
            onError: (errs: Record<string, string>) => {
                const errorMessages = Object.entries(errs).map(([field, msg]) => {
                    const cleanField = field.replace('_', ' ').toUpperCase();
                    return `${cleanField}: ${msg}`;
                });

                setFeedbackModal({
                    isOpen: true,
                    type: 'error',
                    title: 'Submission Failed',
                    message: 'Could not save the profile. Please check the errors below:',
                    details: errorMessages.length > 0 ? errorMessages : ['An unexpected error occurred. Please verify your inputs.'],
                });
            },
        };

        if (isEdit) {
            post(update(member.id).url, submitOptions);
        } else {
            post(store().url, submitOptions);
        }
    };

    const dossierTabs: { id: DossierTab; label: string; icon: React.ElementType; count: number; placeholder: string }[] = [
        {
            id: 'biography',
            label: 'Biography',
            icon: Award,
            count: (data.biography || '').replace(/<[^>]*>/g, '').trim().length,
            placeholder: 'Write comprehensive academic biography, leadership background, educational milestones, and honors...'
        },
        {
            id: 'experience',
            label: 'Experience',
            icon: Briefcase,
            count: (data.experience || '').replace(/<[^>]*>/g, '').trim().length,
            placeholder: 'Detail professional appointments, academic tenure, industry positions, and administrative responsibilities...'
        },
        {
            id: 'publications',
            label: 'Publications',
            icon: BookOpen,
            count: (data.publications || '').replace(/<[^>]*>/g, '').trim().length,
            placeholder: 'List journals, conference proceedings, book chapters, and patents with active links and citation details...'
        },
        {
            id: 'research',
            label: 'Research Interests',
            icon: Layers,
            count: (data.research || '').replace(/<[^>]*>/g, '').trim().length,
            placeholder: 'Highlight core research domains, funded projects, specialized laboratories, and focus areas...'
        },
        {
            id: 'achievements',
            label: 'Achievements & Awards',
            icon: Trophy,
            count: (data.achievements || '').replace(/<[^>]*>/g, '').trim().length,
            placeholder: 'List scholarships, fellowships, best paper awards, research grants, and honors...'
        },
        {
            id: 'seminars',
            label: 'Seminars & Workshops',
            icon: Presentation,
            count: (data.seminars || '').replace(/<[^>]*>/g, '').trim().length,
            placeholder: 'Detail seminars, conferences, symposiums, and workshops attended or organized...'
        },
        {
            id: 'training',
            label: 'Training & Certifications',
            icon: FileText,
            count: (data.training || '').replace(/<[^>]*>/g, '').trim().length,
            placeholder: 'List professional training programs, industrial attachments, and certifications...'
        },
        {
            id: 'others',
            label: 'Others / Memberships',
            icon: Users,
            count: (data.others || '').replace(/<[^>]*>/g, '').trim().length,
            placeholder: 'List scientific society memberships, institute activities, extracurricular mentorships...'
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? `Edit Member - ${member.name}` : 'Add Member - Academic Directory'} />

            <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200 dark:border-neutral-800">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                                {isEdit ? 'Directory Member Editor' : 'New Directory Profile'}
                            </span>
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Department: {String(data.department).toUpperCase()}
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {isEdit ? member.name : 'Add Faculty / Academic Member'}
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            Manage full directory bio, contact info, qualifications, and rich modal dossiers.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Link
                            href={index()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors shadow-xs"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back to Members</span>
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* SECTION 1: Identity & Basic Position */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                    <User className="w-4 h-4" />
                                </div>
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                    1. Basic & Academic Identity
                                </h2>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">Core Identifiers</span>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Full Name */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                    Full Name <span className="text-emerald-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Dr. Md Nakib Hayat Chowdhury"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                    required
                                />
                                {errors.name && <p className="text-xs text-red-500 font-semibold">{errors.name}</p>}
                            </div>

                            {/* Designation */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                    Academic Designation <span className="text-emerald-600">*</span>
                                </label>
                                <select
                                    value={data.category || ''}
                                    onChange={e => {
                                        const code = e.target.value;
                                        setData('category', code);
                                        setData('designation', rankLabel(code));
                                    }}
                                    className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                >
                                    {RANK_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {errors.designation && <p className="text-xs text-red-500 font-semibold">{errors.designation}</p>}
                                <p className="text-[11px] text-gray-400">Also sets Rank / Category in the section below automatically.</p>
                            </div>

                            {/* Department Scope */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                    Department Scope <span className="text-emerald-600">*</span>
                                </label>
                                {user.role === 'super_admin' ? (
                                    <select
                                        value={data.department}
                                        onChange={e => setData('department', e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                    >
                                        {departments.map((d, idx) => {
                                            const slug = typeof d === 'string' ? d : d.slug;
                                            const label = typeof d === 'string' ? d.toUpperCase() : (d.short_name || d.name || d.slug.toUpperCase());
                                            return (
                                                <option key={slug || idx} value={slug}>
                                                    {label} ({slug.toUpperCase()})
                                                </option>
                                            );
                                        })}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        value={String(data.department).toUpperCase()}
                                        disabled
                                        className="w-full rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-800 text-sm text-gray-500 px-3.5 py-2.5 cursor-not-allowed"
                                    />
                                )}
                                {errors.department && <p className="text-xs text-red-500 font-semibold">{errors.department}</p>}
                            </div>

                            {/* Display Order */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                    Display Priority Order <span className="text-emerald-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={data.order}
                                    onChange={e => setData('order', parseInt(e.target.value) || 0)}
                                    className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                    required
                                />
                                <p className="text-[11px] text-gray-400">Lower numbers appear first on the faculty roster (e.g. 1 = HOD).</p>
                                {errors.order && <p className="text-xs text-red-500 font-semibold">{errors.order}</p>}
                            </div>

                            {/* Head of Department */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                    Head of Department
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setData('is_head', !data.is_head)}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-colors cursor-pointer ${
                                        data.is_head
                                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                                            : 'bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700 text-gray-500 dark:text-gray-400'
                                    }`}
                                >
                                    <span>{data.is_head ? 'Yes, Head of Dept' : 'Not Head of Dept'}</span>
                                    <span className={`w-9 h-5 rounded-full relative transition-colors ${data.is_head ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-neutral-700'}`}>
                                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${data.is_head ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                    </span>
                                </button>
                                <p className="text-[11px] text-gray-400">Highlights this member with the "Head of Dept" featured card on the department's Faculty page.</p>
                            </div>

                            {/* Areas of Interest */}
                            <div className="space-y-2 md:col-span-2 p-4 bg-emerald-50/40 dark:bg-neutral-800/40 rounded-2xl border border-emerald-100 dark:border-neutral-800">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>Areas of Interest (Pill Tags)</span>
                                    </label>
                                    {Array.isArray(data.areas_of_interest) && data.areas_of_interest.length > 0 && (
                                        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/70 px-2 py-0.5 rounded-full">
                                            {data.areas_of_interest.length} {data.areas_of_interest.length === 1 ? 'tag' : 'tags'}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    placeholder="e.g. Climate change and global environment, Environmental Impact Assessment, Water treatment"
                                    value={areasInputString}
                                    onChange={e => handleAreasInputChange(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                />
                                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                    Enter comma or newline-separated research topics. Displayed as modern pill tags on faculty profile cards and popup modals.
                                </p>
                                {Array.isArray(data.areas_of_interest) && data.areas_of_interest.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {data.areas_of_interest.map((tag, tIdx) => (
                                            <span
                                                key={tIdx}
                                                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs group"
                                            >
                                                <span>{tag}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveAreaTag(tag)}
                                                    className="w-3.5 h-3.5 rounded-full hover:bg-emerald-200/70 inline-flex items-center justify-center text-emerald-600 hover:text-emerald-900 transition-colors cursor-pointer"
                                                    title={`Remove "${tag}"`}
                                                >
                                                    <X className="w-2.5 h-2.5" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: Role, Category & Employment Status */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                    <Briefcase className="w-4 h-4" />
                                </div>
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                    2. Role, Category & Status
                                </h2>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">Categorization</span>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Appointment Type (tenure) - tab style buttons */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                    Appointment Type <span className="text-emerald-600">*</span>
                                </label>
                                <div className="inline-flex flex-wrap gap-2 p-1.5 rounded-xl bg-gray-100 dark:bg-neutral-800/70 border border-gray-200 dark:border-neutral-700 w-fit">
                                    {([
                                        { value: 'permanent', label: 'Permanent' },
                                        { value: 'contractual', label: 'Contractual' },
                                        { value: 'adjunct', label: 'Adjunct' },
                                    ] as const).map(opt => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setData('type', opt.value)}
                                            className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all duration-200 cursor-pointer ${
                                                data.type === opt.value
                                                    ? 'bg-emerald-600 text-white shadow-md'
                                                    : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-neutral-700'
                                            }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                                {errors.type && <p className="text-xs text-red-500 font-semibold">{errors.type}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {/* Employment Type */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Employment Type <span className="text-emerald-600">*</span>
                                    </label>
                                    <select
                                        value={data.employment_type}
                                        onChange={e => setData('employment_type', e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                    >
                                        <option value="faculty">Faculty</option>
                                        <option value="staff">Academic Staff / Officer</option>
                                    </select>
                                    {errors.employment_type && <p className="text-xs text-red-500 font-semibold">{errors.employment_type}</p>}
                                </div>

                                {/* Category / Rank */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Rank / Category <span className="text-emerald-600">*</span>
                                    </label>
                                    <select
                                        value={data.category || ''}
                                        disabled
                                        className="w-full rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-800 text-sm text-gray-500 px-3.5 py-2.5 cursor-not-allowed"
                                    >
                                        {RANK_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                    {errors.category && <p className="text-xs text-red-500 font-semibold">{errors.category}</p>}
                                    <p className="text-[11px] text-gray-400">Automatically set from Academic Designation above.</p>
                                </div>

                                {/* Member Status */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Member Status <span className="text-emerald-600">*</span>
                                    </label>
                                    <select
                                        value={data.status || 'active'}
                                        onChange={e => setData('status', e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                    >
                                        <option value="active">Active Member</option>
                                        <option value="study_leave">On Study Leave</option>
                                        <option value="ex_faculty">Ex-Member (Former Faculty / Staff)</option>
                                    </select>
                                    {errors.status && <p className="text-xs text-red-500 font-semibold">{errors.status}</p>}
                                    <p className="text-[11px] text-gray-400">
                                        Ex-Members are routed automatically: teaching ranks (Professor - Teaching Assistant) go to the Ex Faculty archive, other ranks go to the Academic Staff/Officer Ex Employee archive.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: Contact Channels */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                    3. Official & Personal Contact Details
                                </h2>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">Communication Channels</span>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Official BAUST Email */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                    <span>Official Email (BAUST)</span>
                                    <span className="text-[11px] font-normal text-gray-400">(Primary institutional email)</span>
                                </label>
                                <div className="relative max-w-xl">
                                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                                    <input
                                        type="text"
                                        placeholder="e.g. username@baust.edu.bd"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white pl-10 pr-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                    />
                                </div>
                                {errors.email && <p className="text-xs text-red-500 font-semibold">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                                {/* Personal / Alternate Emails */}
                                <div className="bg-gray-50/60 dark:bg-neutral-800/40 rounded-2xl p-4 sm:p-5 border border-gray-200 dark:border-neutral-800 space-y-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <div>
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                                                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                                                <span>Personal / Alternate Email(s)</span>
                                            </h3>
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                                                Add multiple personal or research emails. Comma-separated entries are automatically handled.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addEmailItem}
                                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white dark:bg-neutral-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer flex-shrink-0"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            <span>Add Email</span>
                                        </button>
                                    </div>

                                    <div className="space-y-2.5">
                                        {personalEmailList.map((em, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <div className="relative flex-grow">
                                                    <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                                                    <input
                                                        type="text"
                                                        placeholder={`Alternate email ${idx + 1} (e.g. personal@gmail.com)`}
                                                        value={em}
                                                        onChange={e => updateEmailItem(idx, e.target.value)}
                                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs sm:text-sm text-gray-900 dark:text-white pl-9 pr-3 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                                    />
                                                </div>
                                                {personalEmailList.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeEmailItem(idx)}
                                                        title="Remove this email"
                                                        className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors cursor-pointer flex-shrink-0"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {errors.personal_email && <p className="text-xs text-red-500 font-semibold">{errors.personal_email}</p>}
                                </div>

                                {/* Contact Phone Numbers with Tags */}
                                <div className="bg-gray-50/60 dark:bg-neutral-800/40 rounded-2xl p-4 sm:p-5 border border-gray-200 dark:border-neutral-800 space-y-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <div>
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                                                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                                                <span>Contact Numbers with Tags</span>
                                            </h3>
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                                                Add multiple contact numbers with labels (Official, Personal, WhatsApp, etc.).
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => addPhoneItem('Personal')}
                                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white dark:bg-neutral-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer flex-shrink-0"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            <span>Add Number</span>
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {phoneList.map((ph, idx) => (
                                            <div key={idx} className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-700/80 space-y-2 shadow-2xs">
                                                <div className="flex items-center gap-2">
                                                    <div className="relative flex-grow">
                                                        <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                                                        <input
                                                            type="text"
                                                            placeholder="e.g. +880 1712-345678"
                                                            value={ph.number}
                                                            onChange={e => updatePhoneItem(idx, 'number', e.target.value)}
                                                            className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs sm:text-sm text-gray-900 dark:text-white pl-9 pr-3 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                                        />
                                                    </div>

                                                    <select
                                                        value={ph.tag}
                                                        onChange={e => updatePhoneItem(idx, 'tag', e.target.value)}
                                                        className="w-36 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs text-gray-800 dark:text-gray-200 px-2.5 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors flex-shrink-0"
                                                    >
                                                        {PRESET_PHONE_TAGS.map(t => (
                                                            <option key={t} value={t}>{t}</option>
                                                        ))}
                                                    </select>

                                                    {phoneList.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removePhoneItem(idx)}
                                                            title="Remove this phone number"
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>

                                                {ph.tag === 'Other' && (
                                                    <div className="pl-1">
                                                        <input
                                                            type="text"
                                                            placeholder="Specify custom tag (e.g. Office PABX, Desk Phone)"
                                                            value={ph.customTag || ''}
                                                            onChange={e => updatePhoneItem(idx, 'customTag', e.target.value)}
                                                            className="w-full rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50/80 dark:bg-neutral-800 text-xs text-gray-900 dark:text-white px-3 py-1.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {errors.phone && <p className="text-xs text-red-500 font-semibold">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 4: Photograph & Education */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                    <GraduationCap className="w-4 h-4" />
                                </div>
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                    4. Photograph & Educational Background
                                </h2>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">Visuals & Degrees</span>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Photo Upload & Preview */}
                            <div className="flex flex-col sm:flex-row items-start gap-6 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-950/40">
                                <div className="flex-shrink-0 flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-md bg-white dark:bg-neutral-900 relative">
                                        <img
                                            src={photoPreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'Member')}&background=059669&color=fff&size=160&font-size=0.33`}
                                            alt="Preview"
                                            className="w-full h-full object-cover object-top"
                                            onError={(e) => {
                                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'Member')}&background=059669&color=fff&size=160&font-size=0.33`;
                                            }}
                                        />
                                    </div>
                                    {photoPreview && (
                                        <button
                                            type="button"
                                            onClick={handleClearPhoto}
                                            className="mt-2 text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Remove</span>
                                        </button>
                                    )}
                                </div>

                                <div className="flex-grow space-y-3.5 w-full">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                            Upload Photo File (JPG, PNG - Max 2MB)
                                        </label>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoFileChange}
                                            className="w-full text-xs text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-gray-200 dark:file:border-neutral-700 file:text-xs file:font-bold file:bg-white dark:file:bg-neutral-800 file:text-emerald-700 dark:file:text-emerald-400 hover:file:bg-emerald-50 cursor-pointer"
                                        />
                                        {errors.photo_file && <p className="text-xs text-red-500 font-semibold">{errors.photo_file}</p>}
                                    </div>

                                    <div className="relative flex py-1 items-center">
                                        <div className="flex-grow border-t border-gray-200 dark:border-neutral-800"></div>
                                        <span className="flex-shrink mx-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">OR DIRECT URL</span>
                                        <div className="flex-grow border-t border-gray-200 dark:border-neutral-800"></div>
                                    </div>

                                    <div className="space-y-1">
                                        <input
                                            type="text"
                                            placeholder="e.g. /storage/members/dr-nakib.jpg or https://..."
                                            value={data.photo_url}
                                            onChange={handlePhotoUrlChange}
                                            className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                        />
                                        {errors.photo_url && <p className="text-xs text-red-500 font-semibold">{errors.photo_url}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Educational Qualifications List */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                            Academic Degrees & Qualifications
                                        </h3>
                                        <p className="text-[11px] text-gray-400">List completed degrees in reverse chronological order.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddEducationField}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>Add Degree</span>
                                    </button>
                                </div>

                                <div className="space-y-2.5">
                                    {data.education.map((edu, idx) => (
                                        <div key={idx} className="flex items-center gap-2.5">
                                            <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-500 text-xs font-bold flex items-center justify-center flex-shrink-0">
                                                {idx + 1}
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="e.g. Ph.D. in Computer Science & Engineering (University of Malaya, 2021)"
                                                value={edu}
                                                onChange={e => handleEducationChange(idx, e.target.value)}
                                                className="flex-grow rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                            />
                                            {data.education.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveEducationField(idx)}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors cursor-pointer"
                                                    title="Remove degree"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 5: Detailed Academic & Research Dossier (Rich Text Tabs) */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                        5. Academic Dossier (Rich Text Profile Tabs)
                                    </h2>
                                    <p className="text-[11px] text-gray-500">
                                        Displayed in the public profile popup modal when visitors click on the faculty card.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Dossier Tabs Bar */}
                        <div className="flex border-b border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-950/40 px-4 overflow-x-auto scrollbar-none">
                            {dossierTabs.map(tab => {
                                const Icon = tab.icon;
                                const isActive = activeDossierTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveDossierTab(tab.id)}
                                        className={`flex items-center gap-2 py-3 px-4 border-b-2 font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                                            isActive
                                                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-300 bg-white dark:bg-neutral-900'
                                                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                                        }`}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        <span>{tab.label}</span>
                                        {tab.count > 0 && (
                                            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                                Active
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Tab Contents Housing RichTextEditor */}
                        <div className="p-6">
                            {dossierTabs.map(tab => {
                                if (activeDossierTab !== tab.id) return null;
                                return (
                                    <div key={tab.id} className="space-y-2 animate-in fade-in duration-200">
                                        <RichTextEditor
                                            value={data[tab.id] || ''}
                                            onChange={val => setData(tab.id, val)}
                                            label={tab.label}
                                            placeholder={tab.placeholder}
                                            minHeight="220px"
                                            helperText={`Supports bold, italic, headings, bulleted/numbered lists, quotes, and web links for ${tab.label.toLowerCase()}.`}
                                            error={errors[tab.id]}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Form Action Bar */}
                    <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-gray-300 dark:border-neutral-800 shadow-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>All fields are stored directly in the database.</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href={index()}
                                className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
                            >
                                <Save className="w-4 h-4" />
                                <span>{processing ? 'Saving Changes...' : isEdit ? 'Update Directory Profile' : 'Publish Member Profile'}</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Feedback Modal (Success / Error) */}
            {feedbackModal?.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-neutral-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-neutral-800 space-y-5 animate-in zoom-in-95 duration-200">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                {feedbackModal.type === 'success' ? (
                                    <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                ) : (
                                    <div className="p-3 rounded-2xl bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400">
                                        <AlertCircle className="w-6 h-6" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {feedbackModal.title}
                                    </h3>
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                        {feedbackModal.type === 'success' ? 'Database Updated' : 'Action Required'}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFeedbackModal(null)}
                                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
                            <p>{feedbackModal.message}</p>

                            {feedbackModal.type === 'success' && (
                                <div className="p-3 rounded-xl bg-gray-50 dark:bg-neutral-800/60 border border-gray-200 dark:border-neutral-700/60 flex items-center justify-between text-xs">
                                    <span className="text-gray-500 dark:text-gray-400 font-medium">Current Status:</span>
                                    <span className={`font-bold px-2.5 py-0.5 rounded-full ${
                                        data.status === 'ex_faculty'
                                            ? 'bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300 border border-slate-300 dark:border-neutral-700'
                                            : data.status === 'study_leave'
                                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200'
                                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200'
                                    }`}>
                                        {data.status === 'ex_faculty' ? 'Ex-Member' : data.status === 'study_leave' ? 'On Study Leave' : 'Active Member'}
                                    </span>
                                </div>
                            )}

                            {feedbackModal.details && feedbackModal.details.length > 0 && (
                                <ul className="space-y-1.5 max-h-40 overflow-y-auto p-3 rounded-xl bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-xs text-red-700 dark:text-red-300">
                                    {feedbackModal.details.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-1.5">
                                            <span className="font-bold">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            {feedbackModal.type === 'success' ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setFeedbackModal(null)}
                                        className="px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
                                    >
                                        Stay on this Page
                                    </button>
                                    <Link
                                        href={index()}
                                        className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md hover:shadow-emerald-600/20"
                                    >
                                        <span>Manage Members List</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </Link>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setFeedbackModal(null)}
                                    className="px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer"
                                >
                                    Dismiss and Fix
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
