import { type ApiLocationItem } from '@/models/interfaces/locationApi'

export async function getLocationDetails(inputValue: string): Promise<ApiLocationItem[]> {
	let locationData: ApiLocationItem[] = []

	try {
		const encodedQuery = encodeURIComponent(inputValue)
		const url = `https://api-adresse.data.gouv.fr/search/?q=${encodedQuery}`

		const response = await fetch(url)
		const data = await response.json()

		locationData = data.features
	} catch (error) {
		console.error('Error occurred while making the API request:', error)
	}
	return locationData
}
