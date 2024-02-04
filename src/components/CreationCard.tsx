import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";

interface Props {
    className?: string
    onSubmit: (data: any) => void,
    subject: string
}
export function CreationCard({ className, onSubmit, subject }: Props) {
    const [clicked, updateClicked] = useState(false)

    function handleClick() {
        updateClicked(true)
    }

    function extendSubmit(e: any) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObject = Object.fromEntries(formData.entries())
        onSubmit(formObject)
        updateClicked(false)
    }
    return (
        <Card className={`justify-center ${className}`} >
            {
                !clicked ? <div onClick={handleClick} className="cursor-pointer w-full h-full flex justify-center items-center">
                    <h1 className='text-center text-lg text-gray-500'>Add a new {subject}</h1>
                </div> : <div>
                    <form className="flex flex-col p-2 gap-3" action="" onSubmit={extendSubmit}>
                        <label>
                            <p className="text-gray-200">{subject} name:</p>
                            <input required placeholder={`My ${subject}`} className="bg-zinc-700 py-1 w-full mt-2" type="text" name="title" />
                        </label>
                        <Button type="submit">Create</Button>
                    </form>

                </div>
            }
        </Card>
    )
}