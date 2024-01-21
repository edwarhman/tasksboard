export default function Column({ title, items, className }: { title: string, items: any[], className?: string }) {
    return (
        <section className={`bg-zinc-600 p-1 grid gap-1 rounded-md ${className}`}>
            <div>{title}</div>
            {items.map((item) => (
                <div className="bg-zinc-900 p-1 rounded-md" key={item.title}>{item.title}</div>
            ))}
        </section>
    )
}