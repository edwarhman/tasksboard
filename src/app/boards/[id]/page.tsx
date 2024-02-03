import Table from "@/components/Table"
import { Boards } from "@/services/boards"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { id: string } }) {
    const board = await Boards.getById(params.id)

    if (!board) {
        notFound()
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-beteen p-3 pt-24 sm:p-24">
            <header>
                <h1 className='font-bold text-3xl'>{board?.title}</h1>
            </header>
            <Table items={board.columns}>
            </Table>
        </main>
    )
}