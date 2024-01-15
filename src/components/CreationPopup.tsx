export function CreationPopup({ fallback }: any) {

    function handleSubmit(e: any) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObject = Object.fromEntries(formData.entries())

        fallback(formObject)
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input className="text-black" type="text" name="title" />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}