import React, { useEffect, useState } from 'react';
import { 
    Phone, 
    Mail, 
    GraduationCap, 
    Link2, 
    X, 
    Award, 
    Briefcase, 
    BookOpen, 
    Layers, 
    Trophy, 
    Presentation, 
    FileText, 
    Users, 
    Sparkles 
} from 'lucide-react';

export interface FacultyMember {
    id: number;
    name: string;
    designation: string;
    photo: string | null;
    phone?: string | null;
    email?: string | null;
    personal_email?: string | null;
    education: string[];
    biography?: string | null;
    experience?: string | null;
    research?: string | null;
    publications?: string | null;
    achievements?: string | null;
    seminars?: string | null;
    training?: string | null;
    others?: string | null;
    areas_of_interest?: string[] | string | null;
    specialization?: string | null;
    department: string;
    type: string;
    employment_type?: string;
    status: 'active' | 'study_leave' | 'maternity_leave' | 'ex_faculty' | string;
    category: string | null;
}

export function getProfileSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/^(dr\s+md\s+|dr\.\s+md\.\s+|dr\.\s+|prof\.\s+|mr\.\s+|ms\.\s+|mrs\.\s+|col\.\s+|major\.\s+|sgt\.\s+)/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export function parseAreasOfInterest(val: unknown): string[] {
    if (!val) return [];

    let rawList: unknown[] = [];
    if (Array.isArray(val)) {
        rawList = val;
    } else if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            try {
                const parsed = JSON.parse(trimmed);
                if (Array.isArray(parsed)) {
                    rawList = parsed;
                } else {
                    rawList = [trimmed];
                }
            } catch {
                rawList = trimmed.replace(/^[\[\s]+|[\]\s]+$/g, '').split(',');
            }
        } else {
            rawList = trimmed.split(',');
        }
    }

    const result: string[] = [];
    for (const item of rawList) {
        if (item === null || item === undefined) continue;
        let str = String(item).trim();
        // Remove brackets, quotes (single, double, curly), and normalize
        str = str.replace(/[\[\]"']/g, '').replace(/[\u201C\u201D\u2018\u2019]/g, '').trim();
        if (str && !result.includes(str)) {
            result.push(str);
        }
    }
    return result;
}

interface ProfileModalProps {
    member: FacultyMember | null;
    onClose: () => void;
}

type TabType = 'overview' | 'experience' | 'publications' | 'research' | 'achievements' | 'seminars' | 'training' | 'others';

export default function ProfileModal({ member, onClose }: ProfileModalProps) {
    if (!member) return null;

    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [copied, setCopied] = useState(false);

    const getShareUrl = () => {
        const slug = getProfileSlug(member.name);
        return `${window.location.origin}${window.location.pathname}?profile=${slug}`;
    };

    const handleCopyLink = () => {
        const url = getShareUrl();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch(() => {
                    fallbackCopyText(url);
                });
        } else {
            fallbackCopyText(url);
        }
    };

    const fallbackCopyText = (text: string) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textArea);
    };

    // Safe HTML sanitizer stripping executable scripts, event handlers, and javascript links
    const sanitizeHtml = (html: string): string => {
        if (!html) return '';
        if (typeof window === 'undefined') return html;

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const disallowedTags = ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button'];
        disallowedTags.forEach(tag => {
            const elements = doc.querySelectorAll(tag);
            elements.forEach(el => el.remove());
        });

        const allElements = doc.querySelectorAll('*');
        allElements.forEach(el => {
            const attrs = Array.from(el.attributes);
            for (const attr of attrs) {
                const name = attr.name.toLowerCase();
                const val = attr.value.toLowerCase().trim();
                if (name.startsWith('on') || val.startsWith('javascript:') || val.startsWith('data:text/html')) {
                    el.removeAttribute(attr.name);
                }
            }
            if (el.tagName.toLowerCase() === 'a') {
                el.setAttribute('target', '_blank');
                el.setAttribute('rel', 'noopener noreferrer');
            }
        });

        return doc.body.innerHTML;
    };

    const isHtmlContent = (str: string | null | undefined): boolean => {
        if (!str) return false;
        return /<[a-z][\s\S]*>/i.test(str);
    };

    const renderTabContent = (content: string | null | undefined) => {
        if (!content || !content.trim()) {
            return <p className="text-gray-400 italic text-sm">No details provided yet.</p>;
        }

        if (isHtmlContent(content)) {
            const clean = sanitizeHtml(content);
            return (
                <div
                    className="prose rich-content max-w-none text-gray-700 leading-relaxed font-sans"
                    dangerouslySetInnerHTML={{ __html: clean }}
                />
            );
        }

        return formatText(content);
    };

    // Helper to format raw markdown and unstructured table listings beautifully
    const formatText = (text: string | null | undefined) => {
        if (!text) return <p className="text-gray-400 italic">No details provided yet.</p>;

        // Split text by markdown sections (starts with ###)
        const rawSections = text.split(/(?=###\s+)/);

        return rawSections.map((sec, secIdx) => {
            const lines = sec.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            if (lines.length === 0) return null;

            // Extract section title
            let sectionTitle = '';
            let contentLines = lines;
            if (lines[0].startsWith('###')) {
                sectionTitle = lines[0].replace(/^###\s*/, '');
                contentLines = lines.slice(1);
            }

            interface StructuredItem {
                rawLines: string[];
                items: string[][];
            }

            const subsections: { title?: string; data: StructuredItem }[] = [];
            let currentSubsection: { title?: string; data: StructuredItem } = {
                data: { rawLines: [], items: [] }
            };

            let currentItemFields: string[] = [];

            for (const line of contentLines) {
                // If it is a subsection header (ends with ":" and doesn't start with http/https)
                if (line.endsWith(':') && !line.startsWith('http') && line.length < 50) {
                    if (currentItemFields.length > 0) {
                        currentSubsection.data.items.push(currentItemFields);
                        currentItemFields = [];
                    }
                    if (currentSubsection.data.rawLines.length > 0 || currentSubsection.data.items.length > 0) {
                        subsections.push(currentSubsection);
                    }
                    currentSubsection = {
                        title: line.slice(0, -1),
                        data: { rawLines: [], items: [] }
                    };
                    continue;
                }

                // Check if line is a numbered item trigger (e.g. "1.", "2. Title")
                const itemMatch = line.match(/^(\d+)\.(?:\s+(.*))?$/);

                if (itemMatch) {
                    if (currentItemFields.length > 0) {
                        currentSubsection.data.items.push(currentItemFields);
                    }
                    currentItemFields = [];
                    
                    const trailingText = itemMatch[2];
                    if (trailingText && trailingText.trim().length > 0) {
                        currentItemFields.push(trailingText.trim());
                    } else {
                        currentItemFields.push(line); // push indicator so length > 0
                    }
                    continue;
                }

                if (currentItemFields.length > 0) {
                    currentItemFields.push(line);
                } else {
                    currentSubsection.data.rawLines.push(line);
                }
            }

            // Save the last item
            if (currentItemFields.length > 0) {
                currentSubsection.data.items.push(currentItemFields);
            }
            if (currentSubsection.data.rawLines.length > 0 || currentSubsection.data.items.length > 0) {
                subsections.push(currentSubsection);
            }

            // Helper to clean up table header noise
            const isTableHeader = (str: string) => {
                const clean = str.toLowerCase().trim();
                return /^(sl\.?\s*no\.?|s\.l\.?\s*no\.?|sl\.?|s\.l\.?|no\.?|role|article\s+title|paper\s+title|book\s+title|journal|publisher|year\s+of\s+reviewing|reviewing\s+year|year|tenure|duration|from|to|total|membership\s+(no\.?|number)|member\s+id|links?|urls?|course\s+(code|title)|semester|credits?|organization|activity|title\s+of\s+seminar|name\s+of\s+the\s+training|institute|achievements?\s+and\s+awards|co-authors?|authors?|volume|issue|pages?|page\s+no\.?|issn|isbn|doi|designation|dept\.?|department|links?|organization|university|institute\s+activity|professional\s+profile|social\s+networking|teaching\s+courses)$/i.test(clean);
            };

            const isDateOrDuration = (str: string) => {
                const clean = str.trim();
                if (/^\d{4}\s*-\s*\d{4}$/.test(clean) || /^\d{4}$/.test(clean)) return true;
                if (/\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i.test(clean)) return true;
                if (/^\d{1,4}[/.-]\d{1,2}[/.-]\d{2,4}$/.test(clean)) return true;
                if (/^\d+\s*(days?|hours?|weeks?|months?|years?)/i.test(clean)) return true;
                return false;
            };

            const parseCardFields = (fields: string[]) => {
                const urls: string[] = [];
                const dates: string[] = [];
                const textFields: string[] = [];

                fields.forEach(f => {
                    const clean = f.trim();
                    if (/^\d+\.$/.test(clean)) {
                        return; // Skip raw item number line
                    }
                    if (clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('www.')) {
                        urls.push(clean.startsWith('www.') ? 'https://' + clean : clean);
                    } else if (isDateOrDuration(clean)) {
                        dates.push(clean);
                    } else if (!isTableHeader(clean)) {
                        textFields.push(clean);
                    }
                });

                const title = textFields[0] || dates[0] || urls[0] || 'Detail Info';
                const organization = textFields[1] || undefined;
                const date = dates[0] || undefined;
                const details = [
                    ...textFields.slice(2),
                    ...dates.slice(1)
                ];

                return { title, organization, date, details, urls };
            };

            return (
                <div key={secIdx} className="mb-6 last:mb-0">
                    {sectionTitle && (
                        <h4 className="text-xs font-bold text-emerald-800 bg-emerald-50 border-l-4 border-emerald-600 px-3 py-1.5 rounded-r-md uppercase tracking-wider mb-4 mt-6 first:mt-0">
                            {sectionTitle}
                        </h4>
                    )}

                    {subsections.map((subsec, subIdx) => {
                        const cleanRawLines = subsec.data.rawLines.filter(l => !isTableHeader(l));

                        return (
                            <div key={subIdx} className="mb-5 last:mb-0">
                                {subsec.title && (
                                    <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-4 mb-2">
                                        {subsec.title}
                                    </h5>
                                )}

                                {/* Render Raw Lines */}
                                {cleanRawLines.length > 0 && (
                                    <div className="space-y-1.5 mb-3">
                                        {cleanRawLines.map((line, lIdx) => {
                                            const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');
                                            const isHeadingLike = line.length < 50 && !line.endsWith('.') && !line.includes(',') && !isBullet && !line.startsWith('http');
                                            
                                            if (isBullet) {
                                                const cleanText = line.replace(/^[•\-*]\s*/, '');
                                                return (
                                                    <div key={lIdx} className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed">
                                                        <span className="text-emerald-500 font-extrabold mt-1">•</span>
                                                        <span>{cleanText}</span>
                                                    </div>
                                                );
                                            }
                                            
                                            if (isHeadingLike) {
                                                return (
                                                    <h6 key={lIdx} className="text-[13px] font-bold text-gray-800 mt-3 mb-1 first:mt-0">
                                                        {line}
                                                    </h6>
                                                );
                                            }

                                            return (
                                                <p key={lIdx} className="text-gray-600 text-sm leading-relaxed text-justify">
                                                    {line}
                                                </p>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Render Items (Cards) */}
                                {subsec.data.items.length > 0 && (
                                    <div className="grid grid-cols-1 gap-3.5 mt-2">
                                        {subsec.data.items.map((itemFields, itemIdx) => {
                                            const card = parseCardFields(itemFields);

                                            return (
                                                <div 
                                                    key={itemIdx}
                                                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-3 relative overflow-hidden group"
                                                >
                                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-70 group-hover:opacity-100 transition-opacity" />
                                                    
                                                    <div className="flex-1 min-w-0 pl-1">
                                                        <h6 className="text-[14px] font-bold text-gray-900 leading-snug">
                                                            {card.title}
                                                        </h6>
                                                        {card.organization && (
                                                            <p className="text-xs text-emerald-700 font-semibold mt-1">
                                                                {card.organization}
                                                            </p>
                                                        )}
                                                        {card.details.length > 0 && (
                                                            <div className="mt-2 space-y-1">
                                                                {card.details.map((det, dIdx) => (
                                                                    <p key={dIdx} className="text-[11px] text-gray-500 leading-relaxed">
                                                                        {det}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {card.urls.map((url, uIdx) => (
                                                            <a 
                                                                key={uIdx}
                                                                href={url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold mt-2 mr-3 hover:underline"
                                                            >
                                                                <Link2 className="w-3.5 h-3.5" />
                                                                <span>Link {card.urls.length > 1 ? uIdx + 1 : ''}</span>
                                                            </a>
                                                        ))}
                                                    </div>

                                                    {card.date && (
                                                        <div className="flex-shrink-0 self-start sm:self-center">
                                                            <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                                                                {card.date}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            );
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
            <BodyClass name="profile-modal-open" />
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in" 
                onClick={onClose} 
            />

            {/* Modal Box */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl xl:max-w-7xl max-h-[92vh] overflow-y-auto overscroll-contain md:overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300 z-10 border border-gray-100">
                
                {/* Left Side: Photo & Contact Info */}
                <div className="w-full md:w-80 bg-gray-50 border-r border-gray-100 flex flex-col items-center p-6 sm:p-8 flex-shrink-0">
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors z-20 md:hidden"
                        title="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Photo */}
                    <div className="relative mb-5 group">
                        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-emerald-300 to-green-500 opacity-20 blur-sm" />
                        <img
                            src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff&size=160&font-size=0.33`}
                            alt={member.name}
                            className="relative w-40 h-40 rounded-2xl object-cover object-top shadow-md z-10 bg-white"
                            onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff&size=160&font-size=0.33`;
                            }}
                        />
                    </div>

                    {/* Name & Title */}
                    <h3 className="text-lg font-bold text-gray-900 text-center leading-snug mb-1 px-2">{member.name}</h3>
                    <p className="text-xs text-emerald-700 font-extrabold uppercase tracking-widest bg-emerald-100/50 px-3 py-1 rounded-full mb-6">
                        {member.designation}
                    </p>

                    {/* Contact Details */}
                    <div className="w-full space-y-3.5 border-t border-gray-200/60 pt-5 mt-auto text-left">
                        {member.email && (
                            <div className="flex items-start gap-2.5">
                                <Mail className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email</p>
                                    <p className="text-xs text-gray-600 font-medium break-all whitespace-pre-line leading-snug">{member.email}</p>
                                </div>
                            </div>
                        )}
                        {member.personal_email && (
                            <div className="flex items-start gap-2.5">
                                <Mail className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Personal / Alternate Email</p>
                                    <div className="space-y-0.5 mt-0.5">
                                        {member.personal_email.split(/[,;\n]+/).map((em, idx) => {
                                            const clean = em.trim();
                                            if (!clean) return null;
                                            return (
                                                <a
                                                    key={idx}
                                                    href={`mailto:${clean}`}
                                                    className="block text-xs text-gray-600 hover:text-emerald-600 font-medium break-all transition-colors"
                                                >
                                                    {clean}
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                        {member.phone && (
                            <div className="flex items-start gap-2.5">
                                <Phone className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Contact Phone</p>
                                    <div className="space-y-1 mt-0.5">
                                        {member.phone.split(/[,;\n]+/).map((ph, idx) => {
                                            const clean = ph.trim();
                                            if (!clean) return null;
                                            const match = clean.match(/^(.*?)\s*\((.*?)\)$/);
                                            const num = match ? match[1].trim() : clean;
                                            const tag = match ? match[2].trim() : null;
                                            return (
                                                <div key={idx} className="flex items-center gap-1.5 flex-wrap">
                                                    <a
                                                        href={`tel:${num.replace(/\s+/g, '')}`}
                                                        className="text-xs text-gray-600 hover:text-emerald-600 font-medium transition-colors"
                                                    >
                                                        {num}
                                                    </a>
                                                    {tag && (
                                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60">
                                                            {tag}
                                                        </span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Navigation & Detailed Tabs */}
                <div className="flex-grow flex flex-col min-w-0 min-h-0 md:max-h-[92vh]">
                    {/* Header Controls */}
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2">
                            {member.specialization && (
                                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-blue-100">
                                    {member.specialization}
                                </span>
                            )}
                            {member.status === 'study_leave' && (
                                <span className="bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-100">
                                    On Study Leave
                                </span>
                            )}
                            {member.status === 'maternity_leave' && (
                                <span className="bg-pink-50 text-pink-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-pink-100">
                                    On Maternity Leave
                                </span>
                            )}
                            {member.status === 'ex_faculty' && (
                                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200">
                                    Ex-Member
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2.5">
                            {/* Copy Link Button */}
                            <button
                                onClick={handleCopyLink}
                                className={`
                                    px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 border
                                    ${copied 
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-800'
                                    }
                                `}
                                title="Copy direct link to this profile"
                            >
                                <Link2 className="w-3.5 h-3.5" />
                                {copied ? 'Copied!' : 'Copy Link'}
                            </button>

                            <button 
                                onClick={onClose} 
                                className="hidden md:flex p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                title="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Tab Definitions & Navigation */}
                    {(() => {
                        const checkHasContent = (val: string | null | undefined): boolean => {
                            if (!val) return false;
                            const clean = val.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
                            return clean.length > 0;
                        };

                        const areas: string[] = parseAreasOfInterest(member.areas_of_interest);

                        const tabsList = [
                            {
                                id: 'overview' as TabType,
                                label: 'Overview',
                                icon: Award,
                                hasData: Boolean(checkHasContent(member.biography) || (member.education && member.education.length > 0) || areas.length > 0),
                                content: member.biography,
                            },
                            {
                                id: 'experience' as TabType,
                                label: 'Experience',
                                icon: Briefcase,
                                hasData: checkHasContent(member.experience),
                                content: member.experience,
                            },
                            {
                                id: 'publications' as TabType,
                                label: 'Publications',
                                icon: BookOpen,
                                hasData: checkHasContent(member.publications),
                                content: member.publications,
                            },
                            {
                                id: 'research' as TabType,
                                label: 'Research Interests',
                                icon: Layers,
                                hasData: checkHasContent(member.research),
                                content: member.research,
                            },
                            {
                                id: 'achievements' as TabType,
                                label: 'Achievements',
                                icon: Trophy,
                                hasData: checkHasContent(member.achievements),
                                content: member.achievements,
                            },
                            {
                                id: 'seminars' as TabType,
                                label: 'Seminars & Workshops',
                                icon: Presentation,
                                hasData: checkHasContent(member.seminars),
                                content: member.seminars,
                            },
                            {
                                id: 'training' as TabType,
                                label: 'Training',
                                icon: FileText,
                                hasData: checkHasContent(member.training),
                                content: member.training,
                            },
                            {
                                id: 'others' as TabType,
                                label: 'Others',
                                icon: Users,
                                hasData: checkHasContent(member.others),
                                content: member.others,
                            },
                        ];

                        const currentTabObj = tabsList.find(t => t.id === activeTab) || tabsList[0];

                        return (
                            <>
                                {/* Tab Navigation Bar */}
                                <div className="flex bg-gray-50/50 border-b border-gray-100 px-4 sm:px-6 overflow-x-auto scrollbar-none flex-shrink-0">
                                    {tabsList.map((tab) => {
                                        const IconComp = tab.icon;
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`
                                                    flex items-center gap-1.5 sm:gap-2 py-3 px-3 sm:px-4 border-b-2 font-bold text-[11px] sm:text-xs tracking-wide uppercase transition-all duration-200 whitespace-nowrap cursor-pointer relative
                                                    ${isActive 
                                                        ? 'border-emerald-600 text-emerald-800 bg-white/50' 
                                                        : 'border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-100/40'
                                                    }
                                                `}
                                            >
                                                <IconComp className="w-3.5 h-3.5" />
                                                <span>{tab.label}</span>
                                                {tab.hasData && (
                                                    <span 
                                                        className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-emerald-400'}`} 
                                                        title="Content available"
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Tab Panel Content */}
                                <div className="p-6 sm:p-8 md:overflow-y-auto overscroll-contain flex-grow min-h-0 scrollbar-thin scrollbar-thumb-gray-200">
                                    {activeTab === 'overview' ? (
                                        <div className="space-y-6 animate-in fade-in duration-200">
                                            {/* Biography */}
                                            {member.biography && checkHasContent(member.biography) && (
                                                <div>
                                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Academic Biography</h4>
                                                    {renderTabContent(member.biography)}
                                                </div>
                                            )}

                                            {/* Areas of Interest */}
                                            {areas.length > 0 && (
                                                <div>
                                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                                        <Sparkles className="w-4 h-4 text-emerald-600" />
                                                        Areas of Interest
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {areas.map((interest, iIdx) => (
                                                            <span key={iIdx} className="text-xs font-semibold px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
                                                                {interest}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Education */}
                                            {member.education && member.education.length > 0 && (
                                                <div>
                                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                                                        Academic Degrees & Qualifications
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {member.education.map((edu, idx) => (
                                                            <li key={idx} className="text-sm text-gray-700 leading-relaxed font-medium bg-emerald-50/25 px-4 py-2.5 rounded-xl border border-emerald-100/60 flex items-start gap-2.5">
                                                                <span className="text-emerald-600 font-bold mt-0.5">•</span>
                                                                <span>{edu}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {!member.biography && (!member.education || member.education.length === 0) && areas.length === 0 && (
                                                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-3 text-gray-300">
                                                        <Award className="w-6 h-6" />
                                                    </div>
                                                    <h5 className="text-sm font-bold text-gray-600 mb-1">No Overview Provided</h5>
                                                    <p className="text-xs text-gray-400 max-w-xs">Overview details have not been submitted for this profile yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="animate-in fade-in duration-200">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                                {currentTabObj.label}
                                            </h4>
                                            {currentTabObj.hasData ? (
                                                <div className="overflow-x-auto">
                                                    {renderTabContent(currentTabObj.content)}
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
                                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-3 text-gray-300">
                                                        {React.createElement(currentTabObj.icon, { className: 'w-7 h-7' })}
                                                    </div>
                                                    <h5 className="text-sm font-bold text-gray-600 mb-1">
                                                        No {currentTabObj.label} Recorded
                                                    </h5>
                                                    <p className="text-xs text-gray-400 max-w-xs">
                                                        Information for this section has not been published on the faculty record yet.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </>
                        );
                    })()}
                </div>

            </div>
        </div>
    );
}

/** Adds a class to <body> while mounted (used to hide the floating Apply Now button behind profile modals). */
function BodyClass({ name }: { name: string }) {
    useEffect(() => {
        document.body.classList.add(name);
        return () => document.body.classList.remove(name);
    }, [name]);

    return null;
}
