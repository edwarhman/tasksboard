export interface IBoard {
    id: string
    image: string
    title: string
    creationDate: Date
    columns?: any[]
}

const boards: IBoard[] = [{
    title: 'Mi tablero',
    creationDate: new Date(),
    image: 'https://expressjs.com/images/express-facebook-share.png',
    id: '1',
    columns: [{
        title: 'Columna 1',
        items: [{
            title: 'tarea 1',
            description: 'Tengo que hacer la tarea'
        }, {
            title: 'Tarea 2',
            description: 'Tengo más tarea'
        }]
    }]
}, {
    title: 'Tablero de prueba',
    creationDate: new Date(),
    image: 'https://expressjs.com/images/express-facebook-share.png',
    id: '2'
}, {
    title: 'Esto es un título un poco más largo de lo normal',
    image: 'https://expressjs.com/images/express-facebook-share.png',
    creationDate: new Date(),
    id: '3'
}]

export class Boards {

    constructor() {
    }

    static create(title: string, image?: string): IBoard {
        const creationDate = new Date()
        const board: IBoard = {
            id: creationDate.toISOString(),
            image: image ?? 'https://expressjs.com/images/express-facebook-share.png',
            title,
            creationDate
        }

        boards.push(board)
        return board
    }

    static getAll(): IBoard[] {
        return boards
    }

    static async getById(id: string): Promise<IBoard | undefined> {
        return boards.find((el) => el.id === id)
    }
}