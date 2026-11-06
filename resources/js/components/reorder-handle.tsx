import { ChevronDown, ChevronUp, GripVertical } from 'lucide-react';

/** Grip + ↑/↓ controls for a row in a drag-and-drop ordered admin list (see useDragReorder). */
export default function ReorderHandle({ index, count, onUp, onDown }: { index: number; count: number; onUp: () => void; onDown: () => void }) {
    return (
        <div className="flex flex-shrink-0 items-center gap-1">
            <span
                className="cursor-grab rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-emerald-600 active:cursor-grabbing dark:hover:bg-neutral-800"
                title="Drag up or down to reorder"
            >
                <GripVertical className="h-4 w-4" />
            </span>
            <div className="flex flex-col">
                <button
                    type="button"
                    disabled={index === 0}
                    onClick={onUp}
                    className={`rounded p-0.5 text-gray-400 transition-colors hover:text-emerald-600 ${index === 0 ? 'cursor-not-allowed opacity-20' : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800'}`}
                    title="Move up"
                >
                    <ChevronUp className="h-3 w-3" />
                </button>
                <button
                    type="button"
                    disabled={index === count - 1}
                    onClick={onDown}
                    className={`rounded p-0.5 text-gray-400 transition-colors hover:text-emerald-600 ${index === count - 1 ? 'cursor-not-allowed opacity-20' : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800'}`}
                    title="Move down"
                >
                    <ChevronDown className="h-3 w-3" />
                </button>
            </div>
        </div>
    );
}

/** Row classes while dragging, matching Manage Members. */
export function reorderRowClass(dragging: boolean, over: boolean): string {
    if (dragging) return 'opacity-30 bg-emerald-50/70 dark:bg-emerald-950/40';
    if (over) return 'border-t-2 border-t-emerald-500';
    return '';
}
