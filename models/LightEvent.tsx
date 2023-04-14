export class LightEvent {

    constructor(id: number, urlImage: string, libelle: string) {
        this.id = id
        this.urlImage = urlImage
        this.libelle = libelle
    }

    id: number
    urlImage: string
    libelle: string
}