'use client'

import { Card } from '@/components/Card'
import { CreationCard } from '@/components/CreationCard'
import useBoardManager from '@/hooks/useBoardManager'
import { IBoard } from '@/services/boards'
import Image from 'next/image'
import Link from 'next/link'
import dashboardImage from '../assets/taskboard.jpeg'

export default function Home() {
  const { boards, updateBoards, createBoard } = useBoardManager();

  function addNewBoard(fields: IBoard) {
    createBoard(fields)
    updateBoards()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-beteen p-3 pt-24 sm:p-24">
      <header>
        <h1 className='font-bold text-3xl'>TASKSBOARD</h1>
      </header>
      <div className='flex justify-around w-full mt-8'>
        <p>My boards:</p>
      </div>
      <section className='max-w-full cards_container grid grid-flow-col auto-cols-max gap-4 overflow-x-scroll mt-8'>
        {boards?.map(board => (
          <Link key={board.id} href={'/boards/' + board.id}>
            <Card>
              <Image width={280} height={100} src={board.image ?? dashboardImage} alt={'title'}></Image>
              <h3 className="mt-2 text-lg">{board.title}</h3>
            </Card>
          </Link>
        ))}
        <CreationCard subject='table' onSubmit={addNewBoard} />
      </section>
    </main>
  )
}
