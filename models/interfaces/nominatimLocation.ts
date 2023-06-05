export interface NominatimLocation {
	place_id: number
	licence: string
	osm_type: string
	osm_id: number
	boundingbox: string[]
	lat: string
	lon: string
	display_name: string
	class: string
	type: string
	importance: number
	address: {
		house_number: number
		road: string
		hamlet: string
		town: string
		village: string
		city: string
		'ISO3166-2-lvl8': string
		state_district: string
		state: string
		'ISO3166-2-lvl4': string
		postcode: string
		country: string
		country_code: string
	}
	geojson: {
		type: string
		coordinates: [[number[]]]
	}
}
