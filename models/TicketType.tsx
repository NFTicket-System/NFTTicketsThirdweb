export class TicketType {
	constructor(libelle: string, prix: string, nbticket: string) {
		this.libelle = libelle
		this.prix = prix
		this.nbticket = nbticket
	}
	libelle: string
	prix: string
	nbticket: string
}
