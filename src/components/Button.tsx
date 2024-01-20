export function Button({ className, onClick, children }: any) {
    return <button className={`bg-white text-black p-4 ${className}`} onClick={onClick}>{children}</button>
}