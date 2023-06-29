import axios from 'axios'
import { ConversionSens, EventTypeCategories } from '@/models/enum/createNFTInputs'

export const formatEventDate = (dateString: string): string => {
	if (dateString !== '') {
		const dateParts = dateString?.split('-')
		if (dateParts?.length === 3) {
			const year = dateParts[0]
			const day = dateParts[2]
			// Get the month name in French
			const options = { month: 'long' as const }
			const monthName = new Intl.DateTimeFormat('fr-FR', options).format(new Date(dateString))

			return `${day} ${monthName} ${year}`
		} else {
			return dateString
		}
	} else {
		return dateString
	}
}

export const formatEventDateTime = (dateTimeString: string): string => {
	if (dateTimeString !== '') {
		const date: Date = new Date(dateTimeString)

		const options: Intl.DateTimeFormatOptions = {
			hour: '2-digit',
			minute: '2-digit',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		}

		const formattedDate: string = date.toLocaleDateString('fr-FR', options)
		const formattedTime: string = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

		return `${formattedDate.split(' à')[0]} - ${formattedTime}`
	} else {
		return dateTimeString
	}
}

export const convertToTimestamp = (dateString: string, timeString: string): string => {
	const dateParts = dateString.split('-')
	const year = parseInt(dateParts[0], 10)
	const month = parseInt(dateParts[1], 10) - 1 // January is represented as 0
	const day = parseInt(dateParts[2], 10)

	const timeParts = timeString.split(':')
	const hours = parseInt(timeParts[0], 10)
	const minutes = parseInt(timeParts[1], 10)

	return new Date(year, month, day, hours, minutes).toISOString()
}

export async function convertEuroToMATIC(price: number, sens: ConversionSens) {
	console.log('AMOOUNTINEURO  ', price)
	try {
		const response = await axios.get(
			'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=eur'
		)
		if (sens === ConversionSens.MATIC) {
			console.log('IN MATIC')
			return (price / response.data['matic-network'].eur).toFixed(2)
		}
	} catch (error) {
		console.error('Error exchange rate:', error)
		throw error
	}
}

/* export async function convertMaticToEur(price: number) {
	console.log('AMOOUNTINEURO  ', price)
	try {
		const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
			params: {
				ids: 'matic-network',
				vs_currencies: 'eur',
			},
		})

		const maticToEurosRate = response.data['matic-network'].eur
		const priceInEuros = price / maticToEurosRate

		return String(priceInEuros.toFixed(2))
	} catch (error) {
		console.error('Error fetching exchange rate:', error)
		throw error
	}
} */

export const truncateText = (text: string, maxLength: number) => {
	if (text !== undefined) {
		if (text.length > maxLength) {
			return text.slice(0, maxLength - 3) + '...'
		}
		return text
	} else {
		return ''
	}
}
