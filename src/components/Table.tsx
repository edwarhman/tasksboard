'use client'

import { DndContext, useSensor, useSensors } from "@dnd-kit/core"
import Column from "./Column"
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { DragOverlay } from '@dnd-kit/core'
import { useEffect, useState } from "react"
import SortableItem from "./SortableItem"
import { Card } from "./Card"
import { IColumn, IColumnItem } from "@/services/boards"
import { CreationCard } from "./CreationCard"
import { MouseSensor, TouchSensor } from "@/services/fixedSensors"
import useBoardDraggeable from "@/hooks/useBoardDraggeable"

interface Props {
    items: IColumn[]
}

export default function Table({ items }: Props) {
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );
    const {
        columns,
        activeColumn,
        activeItem,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        createNewColumn,
        createNewItem
    } = useBoardDraggeable(items)

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
                <div className="flex overflow-x-scroll gap-3 w-full">
                    {columns ? columns.map((column: any) => (
                        <SortableItem key={column.id} id={column.id}>
                            <Column className="min-w-[250px]" id={column.id} key={column.id} title={column.title} items={column.items} onCreateNewItem={handleNewItem}>
                            </Column>
                        </SortableItem>
                    )) : null}
                    <DragOverlay>
                        {
                            activeItem
                                ? <SortableItem id={activeItem.item?.id}>
                                    <Card >{activeItem.item.title}</Card>
                                </SortableItem>
                                : activeColumn
                                    ?
                                    <SortableItem id={activeColumn.id} >
                                        <Column className="min-w-[250px]" id="" title={activeColumn.title} items={activeColumn.items} onCreateNewItem={handleNewItem}></Column>
                                    </SortableItem>
                                    : null
                        }
                    </DragOverlay>
                    <CreationCard className="max-h-40" onSubmit={handleNewColumn} subject="list" />
                </div>
            </SortableContext>
        </DndContext >
    )


    function handleNewColumn(params: any) {
        createNewColumn(params.title)
    }

    function handleNewItem(columnId: string, title: string) {
        createNewItem(columnId, title)
    }
}

