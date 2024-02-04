import { IColumn, IColumnItem } from "@/services/boards";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";


interface ItemId {
    column: string
    item: IColumnItem
}

export default function useBoardDraggeable(lists: IColumn[]) {
    const [columns, setColumns] = useState<IColumn[] | null>(lists)
    const [activeItem, setActiveItem] = useState<ItemId | null>()
    const [activeColumn, setActiveColumn] = useState<IColumn | null>()

    function findColumnById(id: string): IColumn | undefined {
        return columns?.find(col => col.id === id)
    }

    function findColumnByItemId(itemId: string): IColumn | undefined {
        return columns?.find((col) => col.items.find(item => item.id === itemId))
    }

    function findItemById(id: string): ItemId | undefined {
        const column = findColumnByItemId(id)
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

    function handleDragStart(event: any) {
        const { active } = event
        const activeColumn = findColumnById(active.id)
        setActiveColumn(activeColumn)
        const activeItem = findItemById(active.id)
        setActiveItem(activeItem)
    }

    function handleDragOver(event: any) {
        const { active, over, draggingRect } = event
        const { id } = active
        if (!over) {
            return
        }
        const { id: overId } = over

        const overColumn = findColumnById(overId)
        const activeColumn = findColumnByItemId(active.id)
        const overParentColumn = findColumnByItemId(over.id)
        const activeItem = findItemById(id)

        if (overColumn && overColumn.items.length === 0) {
            if (!activeItem || !activeColumn) {
                return
            }
            setColumns((prev) => {
                if (!prev) {
                    return prev
                }

                const newColumns = prev?.map((col) => {
                    if (col.id === activeColumn.id) {
                        const newActiveColumnItems = col.items.filter(item => item.id !== id)
                        return {
                            ...col,
                            items: newActiveColumnItems
                        }
                    }

                    if (col.id === overId) {
                        const newItems = [activeItem.item]

                        return {
                            ...col,
                            items: newItems
                        }
                    }
                    return col
                })

                console.log({ newColumns })

                return newColumns
            })
        }

        if (
            !activeItem ||
            !activeColumn ||
            !overParentColumn ||
            activeColumn.id === overParentColumn.id
        ) {
            return
        }


        let newItemIdx = 0

        if (overParentColumn) {
            const overItem = findItemById(overId)
            if (!overItem) {
                return
            }
            newItemIdx = overParentColumn.items.indexOf(overItem.item) + 1

        } else {
            newItemIdx = 0
        }

        setColumns((prevColumns) => {
            if (!prevColumns) {
                return prevColumns
            }
            const newTable = prevColumns.map((prevCol, prevColIdx) => {
                if (prevCol.id === overParentColumn.id) {
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

        const item = findItemById(active.id)

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


            return newColumns
        })
    }
    return {
        columns,
        activeColumn,
        activeItem,
        createNewColumn,
        createNewItem,
        findColumnById,
        findColumnByItemId,
        findItemById,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    }
}