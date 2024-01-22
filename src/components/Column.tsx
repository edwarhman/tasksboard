'use client'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";

export default function Column({ id, title, items, className }: { id: string, title: string, items: any[], className?: string }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={`bg-zinc-600 p-1 grid gap-1 rounded-md ${className}`}>
            <div>{title}</div>
            {items.map((item) => (
                <div className="bg-zinc-900 p-1 rounded-md" key={item.title}>{item.title}</div>
            ))}
        </div>
    )
}