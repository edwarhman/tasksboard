'use client'

import { DndContext } from "@dnd-kit/core"
import Column from "./Column"
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { useState } from "react"

export default function Table({ children, items }: any) {
    const [columns, setColumns] = useState(items)


    return (
        <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
                <div className="flex overflow-x-scroll gap-3 w-full">
                    {columns ? columns.map((column: any) => (
                        <Column id={column.id} className="min-w-[250px]" key={column.id} title={column.title} items={column.items}></Column>)
                    ) : null}
                </div>
            </SortableContext>
        </DndContext>
    )

    function handleDragEnd(event: any) {
        const { active, over } = event

        if (active.id !== over.id) {

            setColumns((prevCols: any) => {
                const oldIndex = prevCols.findIndex((el: any) => (
                    el.id === active.id
                ))
                const newIndex = prevCols.findIndex((el: any) => (
                    el.id === over.id
                ))

                return arrayMove(prevCols, oldIndex, newIndex)
            })
        }
    }
}

