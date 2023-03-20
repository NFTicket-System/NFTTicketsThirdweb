export class LightEvent {

    constructor(id: number, imageUrl: string, name: string) {
        this.id = id
        this.imageUrl = imageUrl
        this.name = name
    }

    id: number
    imageUrl: string
    name: string
}