import { router } from '@inertiajs/react';
import type React from 'react';
import { useEffect, useState } from 'react';

/**
 * Drag-and-drop (plus ↑/↓) ordering for an admin list, as on Manage Members:
 * the list reorders locally and the new id sequence is POSTed to `url` as
 * `ordered_ids`, which the server saves as order 1..n.
 */
export function useDragReorder<T extends { id: number }>(source: T[], url: string, onSaved?: (message: string) => void) {
    const [items, setItems] = useState<T[]>(source);
    const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
    const [overIdx, setOverIdx] = useState<number | null>(null);

    // Follow the server's list after saves, additions and deletions (keyed on
    // content, so a fresh `[]` default prop doesn't re-trigger every render).
    const sourceKey = JSON.stringify(source);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setItems(source), [sourceKey]);

    const persist = (next: T[]) => {
        setItems(next);
        router.post(url, { ordered_ids: next.map((i) => i.id) }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => onSaved?.('Display order updated.'),
            onError: () => {
                setItems(source);
                onSaved?.('Could not update the order. Please try again.');
            },
        });
    };

    const move = (from: number, to: number) => {
        if (from === to || to < 0 || to >= items.length) return;
        const next = [...items];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        persist(next);
    };

    const rowProps = (index: number) => ({
        draggable: true,
        onDragStart: (e: React.DragEvent) => {
            setDraggedIdx(index);
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', String(index));
        },
        onDragOver: (e: React.DragEvent) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            if (overIdx !== index) setOverIdx(index);
        },
        onDrop: (e: React.DragEvent) => {
            e.preventDefault();
            if (draggedIdx !== null) move(draggedIdx, index);
            setDraggedIdx(null);
            setOverIdx(null);
        },
        onDragEnd: () => {
            setDraggedIdx(null);
            setOverIdx(null);
        },
    });

    return {
        items,
        rowProps,
        moveUp: (index: number) => move(index, index - 1),
        moveDown: (index: number) => move(index, index + 1),
        isDragging: (index: number) => draggedIdx === index,
        isOver: (index: number) => overIdx === index && draggedIdx !== index,
    };
}
