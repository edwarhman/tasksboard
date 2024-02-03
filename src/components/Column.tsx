'use client'
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableItem from "./SortableItem";
import { Card } from "./Card";
import { useState } from "react";

export default function Column({
    title,
    items,
    className
}: { title: string, items: any[], className?: string }) {
    return (
        <div className={`bg-zinc-600 p-1 grid gap-1 rounded-md ${className}`}>
            <div>{title}</div>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {items.map((card) => (
                    <SortableItem key={card.id} id={card.id}>
                        <Card>{card.title}</Card>
                    </SortableItem>
                ))}
            </SortableContext>
        </div>
    )
}