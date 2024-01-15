'use client'
interface Props {
    children: any
    className?: string
}

export function Card({ children, className }: Props) {
    return (
        <article className={`bg-zinc-900 p-3 rounded-lg shadow-sm w-[300px] flex flex-col ${className}`
        }>
            {children}
        </article >
    )
}