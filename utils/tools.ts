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

export async function convertEuroToMATIC(amountInEuro: number, sens: ConversionSens) {
	try {
		const response = await axios.get(
			'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=eur'
		)
		if (sens === ConversionSens.MATIC) {
			return (amountInEuro * response.data['matic-network'].eur).toFixed(2)
		} else {
			return (amountInEuro / response.data['matic-network'].eur).toFixed(2)
		}
	} catch (error) {
		console.error('Error exchange rate:', error)
		throw error
	}
}

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

export const getCategoryBackground = (catLibelle: string): string => {
	const eventTypeUpperCase = catLibelle
	console.log(eventTypeUpperCase)

	let imgUrl = ''
	switch (eventTypeUpperCase) {
		case EventTypeCategories.CONCERT:
			imgUrl =
				'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
			break
		case EventTypeCategories.CONFERENCE:
			imgUrl =
				'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
			break
		case EventTypeCategories.CULTURE:
			imgUrl =
				'https://images.unsplash.com/photo-1533551268962-824e232f7ee1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'
			break
		case EventTypeCategories.FESTIVAL:
			imgUrl =
				'https://images.unsplash.com/photo-1582711012124-a56cf82307a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1540&q=80'
			break
		case EventTypeCategories.FOIRE:
			imgUrl =
				'https://images.unsplash.com/photo-1664033614806-48afc482ef80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1634&q=80'
			break
		case EventTypeCategories.HUMOUR:
			imgUrl =
				'https://images.unsplash.com/photo-1607805074620-5802aee47bdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80'
			break
		case EventTypeCategories.JAZZ:
			imgUrl =
				'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
			break
		case EventTypeCategories.METAL:
			imgUrl =
				'https://images.unsplash.com/photo-1506091403742-e3aa39518db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
			break
		case EventTypeCategories.POP:
			imgUrl =
				'https://images.unsplash.com/photo-1628573255381-e1b7712b5ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
			break
		case EventTypeCategories.ROCK:
			imgUrl =
				'https://images.unsplash.com/photo-1541660422555-959bdd1499db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
			break
		case EventTypeCategories.SALON:
			imgUrl =
				'https://images.unsplash.com/photo-1664033614806-48afc482ef80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1634&q=80'
			break
		case EventTypeCategories.SPORTIF:
			imgUrl =
				'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
			break
		case EventTypeCategories.THEATRE:
			imgUrl =
				'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80'
			break
		default:
			imgUrl =
				'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
	}
	console.log(imgUrl)

	return imgUrl
}
