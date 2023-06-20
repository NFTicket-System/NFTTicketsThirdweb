export const isInputValid = (inputValue: string, triedToSubmit: boolean): 'error' | 'default' => {
	return inputValue === '' && triedToSubmit ? 'error' : 'default'
}

export const setHelperText = (inputValue: string, triedToSubmit: boolean): string => {
	return inputValue === '' && triedToSubmit ? 'Champ requis' : ''
}

export const setDateHelperText = (inputValue: string, triedToSubmit: boolean): string => {
	if (!triedToSubmit) {
		return ''
	}
	if (inputValue === '') {
		return 'Champ requis'
	}
	return checkDateValid(inputValue) ? '' : 'Veuillez choisir une date valide'
}

export const isDateValid2Submit = (inputValue: string, triedToSubmit: boolean): 'error' | 'default' => {
	if (!triedToSubmit) {
		return 'default'
	}
	return checkDateValid(inputValue) ? 'default' : 'error'
}

export const isHoursValid2Submit = (
	startHourValue: string,
	endHourValue: string,
	triedToSubmit: boolean
): 'error' | 'default' => {
	if (!triedToSubmit) {
		return 'default'
	}
	return isLaterTime(startHourValue, endHourValue) ? 'default' : 'error'
}

export const isErrorDateCard2Show = (
	dateValue: string,
	startHourValue: string,
	endHourValue: string,
	triedToSubmit: boolean
): boolean => {
	let dateValid = false
	let hoursValid = false

	if (checkDateValid(dateValue)) {
		dateValid = true
	}

	if (isLaterTime(startHourValue, endHourValue)) {
		hoursValid = true
	}

	if (triedToSubmit) {
		return triedToSubmit && dateValid && hoursValid
	} else {
		return true
	}
}

// Is the date choose in the past
export const checkDateValid = (dateInput: string): boolean => {
	const currentDate = new Date()
	const inputDate = new Date(dateInput)
	return inputDate.getTime() >= currentDate.getTime()
}

export const isLaterTime = (startTime: string, endTime: string): boolean => {
	const [startHour, startMinute] = startTime.split(':').map(Number)
	const [endHour, endMinute] = endTime.split(':').map(Number)

	const startMinutes = startHour * 60 + startMinute
	const endMinutes = endHour * 60 + endMinute

	return endMinutes > startMinutes
}
