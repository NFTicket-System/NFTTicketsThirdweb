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
