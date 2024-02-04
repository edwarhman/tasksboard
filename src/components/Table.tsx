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

interface Props {
    items: IColumn[]
}

interface ItemId {
    column: string
    item: IColumnItem
}

export default function Table({ items }: Props) {
    const [columns, setColumns] = useState<IColumn[] | null>(items)
    const [activeItem, setActiveItem] = useState<ItemId | null>()
    const [activeColumn, setActiveColumn] = useState<IColumn | null>()

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );

    useEffect(() => {
        console.log('al cambiar columnas', { columns })

    }, [columns])

    return (
        <DndContext
            onDragStart={handleItemDragStart}
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

    function findColumnById(id: string): IColumn | undefined {
        return columns?.find(col => col.id === id)
    }

    function findColumnByItemId(itemId: string): IColumn | undefined {
        return columns?.find((col) => col.items.find(item => item.id === itemId))
    }

    function findItem(id: string): ItemId | undefined {
        const column = findColumnByItemId(id)
        console.log({ column })
        if (!column)
            return
        const item = column?.items.find((item) => item.id === id)

        if (!item)
            return

        return {
            column: column?.id,
            item: item
        }
    }

    function handleItemDragStart(event: any) {
        const { active } = event
        const activeColumn = findColumnById(active.id)
        setActiveColumn(activeColumn)
        const activeItem = findItem(active.id)
        setActiveItem(activeItem)
    }

    function handleDragOver(event: any) {
        const { active, over, draggingRect } = event
        const { id } = active
        if (!over) {
            return
        }
        const { id: overId } = over

        const activeColumn = findColumnByItemId(active.id)
        const overColumn = findColumnByItemId(over.id)
        const activeItem = findItem(id)

        if (
            !activeItem ||
            !activeColumn ||
            !overColumn ||
            activeColumn.id === overColumn.id
        ) {
            return
        }

        console.log({ over })

        console.log('its different')
        let newItemIdx = 0

        if (overColumn) {
            const overItem = findItem(overId)
            if (!overItem) {
                return
            }
            newItemIdx = overColumn.items.indexOf(overItem.item) + 1

        } else {
            newItemIdx = 0
        }

        console.log({ newItemIdx })

        setColumns((prevColumns) => {
            if (!prevColumns) {
                return prevColumns
            }
            console.log({ prevColumns })
            const newTable = prevColumns.map((prevCol, prevColIdx) => {
                if (prevCol.id === overColumn.id) {
                    let newOverColumnItems

                    if (newItemIdx !== 0) {
                        newOverColumnItems = [
                            ...prevCol.items.slice(0, newItemIdx),
                            activeItem?.item,
                            ...prevCol.items.slice(newItemIdx)

                        ]
                    } else {
                        newOverColumnItems = [
                            activeItem.item,
                            ...prevCol.items
                        ]
                    }

                    console.log({ newOverColumnItems })

                    return {
                        ...prevCol,
                        items: newOverColumnItems
                    }

                }
                if (prevCol.id === activeColumn.id) {
                    const newActiveColumnItems = prevCol.items.filter(item => item.id !== id)
                    return {
                        ...prevCol,
                        items: newActiveColumnItems
                    }
                }

                return prevCol
            })
            console.log({ newTable })
            return newTable
        })

    }

    function handleDragEnd(event: any) {
        const { active, over } = event

        const column = findColumnById(active.id)

        if (column) {
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

        const item = findItem(active.id)

        if (item) {
            if (active.id !== over.id) {
                setColumns((prevCols: IColumn[] | null) => {

                    if (!prevCols) {
                        return prevCols
                    }

                    const newColumns = prevCols.map(prevCol => {
                        if (prevCol.id === item.column) {
                            const oldIndex = prevCol.items.findIndex((item: IColumnItem) => (item.id === active.id))
                            const newIndex = prevCol.items.findIndex((item: IColumnItem) => (item.id === over.id))

                            return {
                                ...prevCol,
                                items: arrayMove(prevCol.items, oldIndex, newIndex)
                            }
                        }

                        return prevCol
                    })

                    return newColumns
                })
            }
        }

        setActiveItem(null)
        setActiveColumn(null)
    }

    function createNewColumn(title: string) {
        const newColumn: IColumn = {
            id: new Date().toString(),
            title,
            items: []
        }

        setColumns(prev => {
            if (!prev) {
                return prev
            }

            return [
                ...prev,
                newColumn
            ]
        })
    }

    function createNewItem(columnId: string, title: string) {
        const newItem: IColumnItem = {
            id: new Date().toString(),
            title,
            description: ''
        }

        console.log({ newItem })

        setColumns(prev => {
            if (!prev) {
                return prev
            }
            const newColumns = prev?.map(col => {
                if (col.id === columnId) {
                    const newList = [...col.items, newItem]
                    return {
                        ...col,
                        items: newList
                    }
                }
                return col
            })

            console.log({ newColumns })

            return newColumns
        })
    }

    function handleNewColumn(params: any) {
        createNewColumn(params.title)
    }

    function handleNewItem(columnId: string, title: string) {
        createNewItem(columnId, title)
    }
}

