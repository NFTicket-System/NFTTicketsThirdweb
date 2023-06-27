export class FormDataTypeClass {
	count: number
	name: string
	description: string
	date: string
	price: string
	hourStart: string
	hourEnd: string
	location: string
	image: string
	ticketType: string

	constructor(
		count: number,
		name: string,
		description: string,
		date: string,
		price: string,
		hourStart: string,
		hourEnd: string,
		location: string,
		image: string,
		ticketType: string
	) {
		this.count = count
		this.name = name
		this.description = description
		this.date = date
		this.price = price
		this.hourStart = hourStart
		this.hourEnd = hourEnd
		this.location = location
		this.image = image
		this.ticketType = ticketType
	}
}
