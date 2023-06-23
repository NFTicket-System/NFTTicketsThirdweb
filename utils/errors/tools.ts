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
        const date: Date = new Date(dateTimeString);

        const options: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };

        const formattedDate: string = date.toLocaleDateString('fr-FR', options);
        const formattedTime: string = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

        return `${formattedDate.split(' à')[0]} - ${formattedTime}`;
	} else {
		return dateTimeString
	}
}
