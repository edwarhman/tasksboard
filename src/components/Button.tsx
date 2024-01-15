export function Button({ onClick, children }: any) {
    return <button className="bg-white text-black p-4 " onClick={onClick}>{children}</button>
}