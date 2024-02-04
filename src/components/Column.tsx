'use client'
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableItem from "./SortableItem";
import { Card } from "./Card";
import { IColumnItem } from "@/services/boards";
import { CreationCard } from "./CreationCard";
import PreventDraggable from "./PreventDraggable";

interface Props {
    id: string,
    title: string,
    items: IColumnItem[],
    className: string,
    onCreateNewItem: (columnId: string, title: any) => void
}

export default function Column({
    id,
    title,
    items,
    className,
    onCreateNewItem
}: Props) {
    return (
        <div className={`bg-zinc-600 p-1 grid gap-1 rounded-md ${className}`}>
            <div className="m-1 font-bold uppercase">{title}</div>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {items.map((card) => (
                    <SortableItem key={card.id} id={card.id}>
                        <Card>{card.title}</Card>
                    </SortableItem>
                ))}
            </SortableContext>
            {/* The followign component is neccesary to prevent parent to be draggable when interacting with this component */}
            <PreventDraggable>
                <CreationCard onSubmit={handleSubmit} subject="card" />
            </PreventDraggable>
        </div>
    )

    function handleSubmit(data: any) {
        onCreateNewItem(id, data.title)
    }
}