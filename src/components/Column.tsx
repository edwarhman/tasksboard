'use client'
import { DndContext } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableItem from "./SortableItem";
import { Card } from "./Card";
import { useState } from "react";

export default function Column({
    title,
    items,
    className
}: { title: string, items: any[], className?: string }) {
    const [cards, setCards] = useState(items)

    return (
        <div className={`bg-zinc-600 p-1 grid gap-1 rounded-md ${className}`}>
            <div>{title}</div>
            <DndContext onDragEnd={handleDragEnd} >
                <SortableContext items={cards} strategy={verticalListSortingStrategy}>
                    {cards.map((card) => (
                        <SortableItem key={card.id} id={card.id}>
                            <Card>{card.title}</Card>
                        </SortableItem>
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    )

    function handleDragEnd(event: any) {
        const { active, over } = event

        if (active.id !== over.id) {
            setCards((prevItems: any) => {
                const oldIndex = prevItems.findIndex((el: any) => (
                    el.id === active.id
                ))
                const newIndex = prevItems.findIndex((el: any) => (
                    el.id === over.id
                ))

                return arrayMove(prevItems, oldIndex, newIndex)
            })
        }
    }
}