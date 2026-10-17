import React, { useEffect, useRef, useState } from 'react';
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Code,
    Link as LinkIcon,
    Unlink,
    RemoveFormatting,
    Undo,
    Redo,
    Eye,
    Code2
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: string;
    label?: string;
    helperText?: string;
    error?: string;
}

export default function RichTextEditor({
    value = '',
    onChange,
    placeholder = 'Start typing...',
    minHeight = '180px',
    label,
    helperText,
    error
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isSourceMode, setIsSourceMode] = useState(false);
    const [sourceHtml, setSourceHtml] = useState(value || '');
    const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({});

    // Keep editor content in sync with external value without triggering re-render cursor jumps
    useEffect(() => {
        if (!isSourceMode && editorRef.current) {
            if (editorRef.current.innerHTML !== (value || '')) {
                editorRef.current.innerHTML = value || '';
            }
        }
        setSourceHtml(value || '');
    }, [value, isSourceMode]);

    const updateActiveFormats = () => {
        if (typeof document === 'undefined') return;
        setActiveFormats({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
            strikeThrough: document.queryCommandState('strikeThrough'),
            insertUnorderedList: document.queryCommandState('insertUnorderedList'),
            insertOrderedList: document.queryCommandState('insertOrderedList'),
        });
    };

    const exec = (command: string, value: string | undefined = undefined) => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
        document.execCommand(command, false, value);
        updateContent();
        updateActiveFormats();
    };

    const updateContent = () => {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            // Clean empty paragraphs or break tags
            const cleaned = html === '<p><br></p>' || html === '<br>' ? '' : html;
            setSourceHtml(cleaned);
            onChange(cleaned);
        }
    };

    const handleInput = () => {
        updateContent();
        updateActiveFormats();
    };

    const handleKeyUp = () => {
        updateActiveFormats();
    };

    const handleMouseUp = () => {
        updateActiveFormats();
    };

    const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setSourceHtml(val);
        onChange(val);
    };

    const toggleSourceMode = () => {
        if (isSourceMode) {
            // Switching back to visual
            setIsSourceMode(false);
            setTimeout(() => {
                if (editorRef.current) {
                    editorRef.current.innerHTML = sourceHtml;
                }
            }, 0);
        } else {
            // Switching to source
            if (editorRef.current) {
                setSourceHtml(editorRef.current.innerHTML);
            }
            setIsSourceMode(true);
        }
    };

    const insertLink = () => {
        const url = prompt('Enter URL (e.g. https://example.com):');
        if (url) {
            const validUrl = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')
                ? url
                : `https://${url}`;
            exec('createLink', validUrl);
        }
    };

    // Calculate word & character counts
    const getStats = () => {
        const text = (sourceHtml || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const chars = text.length;
        const words = text ? text.split(' ').length : 0;
        return { chars, words };
    };

    const { chars, words } = getStats();

    return (
        <div className="w-full flex flex-col space-y-1.5">
            {label && (
                <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                        {label}
                    </label>
                    <button
                        type="button"
                        onClick={toggleSourceMode}
                        className={`text-[11px] font-semibold flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                            isSourceMode
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-100 dark:hover:bg-neutral-800'
                        }`}
                        title={isSourceMode ? 'Switch to Visual WYSIWYG Editor' : 'Switch to HTML Code Mode'}
                    >
                        {isSourceMode ? (
                            <>
                                <Eye className="w-3 h-3" />
                                <span>Visual View</span>
                            </>
                        ) : (
                            <>
                                <Code2 className="w-3 h-3" />
                                <span>HTML Source</span>
                            </>
                        )}
                    </button>
                </div>
            )}

            <div
                className={`
                    w-full rounded-xl border overflow-hidden transition-all duration-200 bg-white dark:bg-neutral-900 shadow-sm
                    ${error 
                        ? 'border-red-400 dark:border-red-600 ring-1 ring-red-400' 
                        : 'border-gray-300 dark:border-neutral-700 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20'
                    }
                `}
            >
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-0.5 p-1.5 bg-gray-50/90 dark:bg-neutral-800/90 border-b border-gray-200 dark:border-neutral-700 select-none">
                    <button
                        type="button"
                        onClick={() => exec('bold')}
                        disabled={isSourceMode}
                        className={`p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none ${
                            activeFormats.bold ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shadow-xs' : ''
                        }`}
                        title="Bold (Ctrl+B)"
                    >
                        <Bold className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => exec('italic')}
                        disabled={isSourceMode}
                        className={`p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none ${
                            activeFormats.italic ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shadow-xs' : ''
                        }`}
                        title="Italic (Ctrl+I)"
                    >
                        <Italic className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => exec('underline')}
                        disabled={isSourceMode}
                        className={`p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none ${
                            activeFormats.underline ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shadow-xs' : ''
                        }`}
                        title="Underline (Ctrl+U)"
                    >
                        <Underline className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => exec('strikeThrough')}
                        disabled={isSourceMode}
                        className={`p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none ${
                            activeFormats.strikeThrough ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shadow-xs' : ''
                        }`}
                        title="Strikethrough"
                    >
                        <Strikethrough className="w-4 h-4" />
                    </button>

                    <div className="w-px h-5 bg-gray-300 dark:bg-neutral-700 mx-1" />

                    <button
                        type="button"
                        onClick={() => exec('formatBlock', '<h2>')}
                        disabled={isSourceMode}
                        className="p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                        title="Heading 2"
                    >
                        <Heading2 className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => exec('formatBlock', '<h3>')}
                        disabled={isSourceMode}
                        className="p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                        title="Heading 3"
                    >
                        <Heading3 className="w-4 h-4" />
                    </button>

                    <div className="w-px h-5 bg-gray-300 dark:bg-neutral-700 mx-1" />

                    <button
                        type="button"
                        onClick={() => exec('insertUnorderedList')}
                        disabled={isSourceMode}
                        className={`p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none ${
                            activeFormats.insertUnorderedList ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shadow-xs' : ''
                        }`}
                        title="Bullet List"
                    >
                        <List className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => exec('insertOrderedList')}
                        disabled={isSourceMode}
                        className={`p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none ${
                            activeFormats.insertOrderedList ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shadow-xs' : ''
                        }`}
                        title="Numbered List"
                    >
                        <ListOrdered className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => exec('formatBlock', '<blockquote>')}
                        disabled={isSourceMode}
                        className="p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                        title="Blockquote"
                    >
                        <Quote className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => exec('formatBlock', '<pre>')}
                        disabled={isSourceMode}
                        className="p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                        title="Code Block"
                    >
                        <Code className="w-4 h-4" />
                    </button>

                    <div className="w-px h-5 bg-gray-300 dark:bg-neutral-700 mx-1" />

                    <button
                        type="button"
                        onClick={insertLink}
                        disabled={isSourceMode}
                        className="p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                        title="Insert Link"
                    >
                        <LinkIcon className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => exec('unlink')}
                        disabled={isSourceMode}
                        className="p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                        title="Remove Link"
                    >
                        <Unlink className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => exec('removeFormat')}
                        disabled={isSourceMode}
                        className="p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                        title="Clear Formatting"
                    >
                        <RemoveFormatting className="w-4 h-4" />
                    </button>

                    <div className="w-px h-5 bg-gray-300 dark:bg-neutral-700 mx-1" />

                    <button
                        type="button"
                        onClick={() => exec('undo')}
                        disabled={isSourceMode}
                        className="p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => exec('redo')}
                        disabled={isSourceMode}
                        className="p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                        title="Redo (Ctrl+Y)"
                    >
                        <Redo className="w-4 h-4" />
                    </button>
                </div>

                {/* Editor Content Area */}
                {isSourceMode ? (
                    <textarea
                        value={sourceHtml}
                        onChange={handleSourceChange}
                        style={{ minHeight }}
                        className="w-full p-4 font-mono text-xs text-gray-800 dark:text-gray-200 bg-gray-50/50 dark:bg-neutral-950 focus:outline-none resize-y"
                        placeholder="Enter or paste raw HTML code here..."
                    />
                ) : (
                    <div
                        ref={editorRef}
                        contentEditable
                        onInput={handleInput}
                        onKeyUp={handleKeyUp}
                        onMouseUp={handleMouseUp}
                        style={{ minHeight }}
                        data-placeholder={placeholder}
                        className="rich-content p-4 text-sm text-gray-800 dark:text-gray-100 focus:outline-none overflow-y-auto font-sans leading-relaxed
                            [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-gray-900 dark:[&_h2]:text-white [&_h2]:my-2
                            [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-gray-900 dark:[&_h3]:text-white [&_h3]:my-2
                            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2
                            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2
                            [&_li]:my-0.5
                            [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:my-2 [&_blockquote]:text-gray-600 dark:[&_blockquote]:text-gray-300
                            [&_pre]:bg-gray-100 dark:[&_pre]:bg-neutral-800 [&_pre]:p-2.5 [&_pre]:rounded-lg [&_pre]:font-mono [&_pre]:text-xs [&_pre]:my-2
                            [&_a]:text-emerald-600 [&_a]:underline
                            empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none"
                    />
                )}

                {/* Footer Bar with Stats */}
                <div className="flex items-center justify-between px-3 py-1.5 text-[11px] text-gray-400 border-t border-gray-100 dark:border-neutral-800 bg-gray-50/40 dark:bg-neutral-950/40">
                    <span className="font-medium">
                        {isSourceMode ? 'HTML Source Mode' : 'WYSIWYG Rich Editor'}
                    </span>
                    <span className="space-x-2 font-mono">
                        <span>{words} words</span>
                        <span>•</span>
                        <span>{chars} chars</span>
                    </span>
                </div>
            </div>

            {helperText && !error && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
            )}
            {error && (
                <p className="text-xs text-red-500 font-semibold">{error}</p>
            )}
        </div>
    );
}
