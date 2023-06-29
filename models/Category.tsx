export class Category {

    constructor(data: any) {
        this.id = data.id
        this.libelle = data.libelle
        this.color = data.color
        this.urlImage = data.urlImage
    }

    id: number
    libelle: string
    color: string
    urlImage: string
}
