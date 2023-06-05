import { type NominatimLocation } from '../models/interfaces/nominatimLocation'
import { defaultErrorModal } from '@/utils/errors/defaultErrorAlert'

const nominatimURL = 'https://nominatim.openstreetmap.org/?'

export async function getLocationDetails(inputValue: string): Promise<NominatimLocation[]> {
	const locationParams = [
		['addressdetails', '1'],
		['q', inputValue.toString()],
		['format', 'json'],
		['limit', '5'],
		['countrycodes', 'fr'],
	]
	const queryString = new URLSearchParams(locationParams).toString()
	let locationData: NominatimLocation[] = []

	try {
		const res = await fetch(`${nominatimURL}${queryString}`, {
			method: 'GET',
			redirect: 'follow',
		})
		locationData = await res.json()
	} catch (err) {
		console.error(err)
		defaultErrorModal()
		locationData = []
	}
	return locationData
}

export function formatLocationString(location: NominatimLocation): string {
	return `${location.address.house_number !== undefined ? location.address.house_number : ''} ${
		location.address.road !== undefined ? location.address.road + ',' : ''
	} ${location.address.state !== undefined ? location.address.state : ''} ${
		location.address.village !== undefined ? location.address.village : ''
	} ${location.address.town !== undefined ? location.address.town : ''} ${
		location.address.postcode !== undefined ? location.address.postcode : ''
	}`
}
