export interface formDataType {
	count: number
	name: string
	description: string
	date: string
	price: string
	hourStart: string
	hourEnd: string
	location: string
	image: string
}

export interface creditCard {
	number: string
	expMonth: string
	expYear: string
	cvc: string
}

export interface maticData {
	market_data: {
		current_price: {
			eur: number
		}
	}
}
