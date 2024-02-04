// More info about this issue in the next links
// https://github.com/clauderic/dnd-kit/issues/827
// https://github.com/clauderic/dnd-kit/issues/477

export default function PreventDraggable({ children }: any) {
    function stop(event: any) {
        event.stopPropagation()
    }

    return (
        <div onMouseDown={stop}>
            {children}
        </div>
    )
}