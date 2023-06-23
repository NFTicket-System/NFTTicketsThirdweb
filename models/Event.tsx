export class Event {
    id: number;
    libelle: string;
    idCity: number;
    timestampStart: string;
    timestampEnd: string;
    idOrganizer: number;
    timestampCreation: string;
    isTrendemous: boolean;
    urlImage: string;
    tickets: Ticket[];

    constructor(data: any) {
        this.id = data.id;
        this.libelle = data.libelle;
        this.idCity = data.idCity;
        this.timestampStart = data.timestampStart;
        this.timestampEnd = data.timestampEnd;
        this.idOrganizer = data.idOrganizer;
        this.timestampCreation = data.timestampCreation;
        this.isTrendemous = data.isTrendemous;
        this.urlImage = data.urlImage;
        this.tickets = data.tickets.map((ticketData: any) => new Ticket(ticketData));
    }
}

export class Ticket {
    id: number;
    addressContract: string;
    prix: number;
    type: string;
    date: string;
    solded: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.addressContract = data.addressContract;
        this.prix = parseFloat(data.prix);;
        this.type = data.type;
        this.date = data.date;
        this.solded = data.solded;
    }
}
