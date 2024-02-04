
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";

interface Props {
    id: string,
    children?: any,
    className?: string
}
export default function SortableItem({ id, children, className }: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={className}>
            {children}
        </div>
    )
}