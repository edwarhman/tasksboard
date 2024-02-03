import { Boards, IBoard } from "@/services/boards"
import { useEffect, useState } from "react"

export default function useBoardManager() {
    const [boards, setBoards] = useState<IBoard[]>()

    useEffect(() => {
        setBoards(Boards.getAll())
    }, [])

    function updateBoards() {
        setBoards(Boards.getAll().slice())
    }

    function createBoard(fields: IBoard) {
        Boards.create(fields.title, fields.image)
    }

    return {
        boards,
        createBoard,
        updateBoards,
    }
}