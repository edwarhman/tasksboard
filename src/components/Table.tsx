'use client'

export default function Table({ children }: any) {

    return (
        <div className="flex overflow-scroll gap-3 w-full">
            {children}
        </div>
    )
}

