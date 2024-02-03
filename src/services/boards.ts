export interface IBoard {
    id: string
    image: string
    title: string
    creationDate: Date
    columns: IColumn[]
}

export interface IColumn {
    id: string
    title: string
    items: IColumnItem[]
}
export interface IColumnItem {
    id: string
    title: string
    description: string
}

const boards: IBoard[] = [{
    title: 'Mi tablero',
    creationDate: new Date(),
    image: 'https://expressjs.com/images/express-facebook-share.png',
    id: '1',
    columns: [{
        id: 'asd',
        title: 'Por hacer',
        items: [{
            id: 'xcv',
            title: 'sacar la basura',
            description: 'Tengo que hacer la tarea'
        }, {
            id: 'plk',
            title: 'limpiar el cuarto',
            description: 'Tengo más tarea'
        }]
    }, {
        id: 'qwe',
        title: 'Tareas hechas',
        items: [{
            id: 'tui',
            title: 'comprar queso',
            description: 'Tengo que hacer la tarea'
        }, {
            id: 'kvc',
            title: 'estudiar analisis',
            description: 'Tengo más tarea'
        }]
    }]
}, {
    title: 'Tablero de prueba',
    creationDate: new Date(),
    image: 'https://expressjs.com/images/express-facebook-share.png',
    id: '2',
    columns: []
}, {
    title: 'Esto es un título un poco más largo de lo normal',
    image: 'https://expressjs.com/images/express-facebook-share.png',
    creationDate: new Date(),
    id: '3',
    columns: []
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
            creationDate,
            columns: []
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