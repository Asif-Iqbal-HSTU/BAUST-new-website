import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';

interface TabItem {
    name: string;
    href?: string;
    children?: { name: string; href: string }[];
}

interface DeptSubNavProps {
    departmentName: string;
    activeTab: string;
    tabs: TabItem[];
}

const DeptSubNav: React.FC<DeptSubNavProps> = ({ departmentName, activeTab, tabs }) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    const toggleDropdown = (name: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenDropdown(prev => (prev === name ? null : name));
    };

    const activeTabWithChildren = tabs.find(t => t.name === openDropdown && t.children && t.children.length > 0);

    return (
        <div ref={navRef} className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Tab navigation bar with horizontal scroll */}
                <nav className="flex items-center gap-1 overflow-x-auto lg:overflow-visible scrollbar-hide py-1 -mb-px" aria-label="Department Navigation">
                    {tabs.map((tab) => {
                        const hasChildren = !!(tab.children && tab.children.length > 0);
                        const isChildActive = tab.children?.some(c => c.name === activeTab);
                        const isActive = tab.name === activeTab || isChildActive;
                        const isOpen = openDropdown === tab.name;

                        return (
                            <div key={tab.name} className="relative group flex-shrink-0">
                                {tab.href && !hasChildren ? (
                                    <Link
                                        href={tab.href}
                                        onClick={() => setOpenDropdown(null)}
                                        className={`
                                            whitespace-nowrap px-4 py-3 text-[13px] font-semibold border-b-2 transition-all duration-200 flex items-center gap-1
                                            ${isActive
                                                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                                                : 'border-transparent text-gray-500 hover:text-emerald-700 hover:border-emerald-300 hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        {tab.name}
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={(e) => toggleDropdown(tab.name, e)}
                                        aria-expanded={isOpen}
                                        aria-haspopup="true"
                                        className={`
                                            whitespace-nowrap px-4 py-3 text-[13px] font-semibold border-b-2 transition-all duration-200 flex items-center gap-1.5 cursor-pointer touch-manipulation
                                            ${isActive || isOpen
                                                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/70'
                                                : 'border-transparent text-gray-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        <span>{tab.name}</span>
                                        {hasChildren && (
                                            <ChevronDown 
                                                size={14} 
                                                className={`transition-transform duration-200 ${
                                                    isOpen 
                                                        ? 'rotate-180 text-emerald-700' 
                                                        : 'opacity-60 group-hover:rotate-180'
                                                }`} 
                                            />
                                        )}
                                    </button>
                                )}

                                {/* Desktop Dropdown (Anchored to tab, visible on lg screens) */}
                                {hasChildren && (
                                    <div 
                                        className={`
                                            absolute left-0 top-full pt-1 transition-all duration-200 z-50 min-w-[220px] hidden lg:block
                                            ${isOpen 
                                                ? 'visible opacity-100 translate-y-0' 
                                                : 'invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0'
                                            }
                                        `}
                                    >
                                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                                            {tab.children?.map((child) => {
                                                const isCurrent = child.name === activeTab;
                                                return (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        onClick={() => setOpenDropdown(null)}
                                                        className={`
                                                            flex items-center justify-between px-4 py-2.5 text-[12.5px] font-medium transition-colors
                                                            ${isCurrent 
                                                                ? 'bg-emerald-50 text-emerald-700 border-l-2 border-emerald-600 font-bold' 
                                                                : 'text-gray-600 hover:bg-emerald-50/50 hover:text-emerald-700'
                                                            }
                                                        `}
                                                    >
                                                        <span>{child.name}</span>
                                                        {isCurrent && <ChevronRight size={13} className="text-emerald-600" />}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Mobile Submenu Drawer / Popover (Outside overflow-x-auto nav to prevent vertical clipping) */}
                {openDropdown && activeTabWithChildren && (
                    <div className="lg:hidden border-t border-gray-100 bg-white/98 backdrop-blur-md px-4 py-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                                    {activeTabWithChildren.name}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setOpenDropdown(null)}
                                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                aria-label="Close"
                            >
                                <X size={15} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                            {activeTabWithChildren.children?.map((child) => {
                                const isCurrent = child.name === activeTab;
                                return (
                                    <Link
                                        key={child.name}
                                        href={child.href}
                                        onClick={() => setOpenDropdown(null)}
                                        className={`
                                            flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all touch-manipulation
                                            ${isCurrent
                                                ? 'bg-emerald-600 text-white shadow-sm'
                                                : 'bg-gray-50 text-gray-700 border border-gray-100 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/50'
                                            }
                                        `}
                                    >
                                        <span>{child.name}</span>
                                        <ChevronRight size={14} className={isCurrent ? 'text-white' : 'text-emerald-600 opacity-60'} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeptSubNav;
