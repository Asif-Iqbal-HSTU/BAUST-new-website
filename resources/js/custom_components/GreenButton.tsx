import React from "react";

interface GreenButtonProps {
    href: string;
    children: React.ReactNode;
    target?: string;
    rel?: string;
    className?: string;
}

export default function GreenButton({ href, children, target, rel, className }: GreenButtonProps) {
    return (
        <a
            href={href}
            target={target}
            rel={rel}
            className={className || "bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors inline-block"}
        >
            {children}
        </a>
    );
}
