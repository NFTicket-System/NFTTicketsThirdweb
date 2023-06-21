export interface ApiLocationItem {
	type: string
	geometry: { type: string; coordinates: number[] }
	properties: ApiLocationItemProperties
}

export interface ApiLocationItemProperties {
	label: string
	score: number
	housenumber: string
	id: string
	name: string
	postcode: string
	citycode: string
	x: number
	y: number
	city: string
	context: string
	type: string
	importance: number
	street: string
}
