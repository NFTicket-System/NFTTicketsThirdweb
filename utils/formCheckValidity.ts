export const isInputValid = (inputValue: string, triedToSubmit: boolean): 'error' | 'default' => {
	return (inputValue === '' || inputValue === undefined) && triedToSubmit ? 'error' : 'default'
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

// Is the date choose in the past
export const checkDateValid = (dateInput: string): boolean => {
	const currentDate = new Date()
	const inputDate = new Date(dateInput)
	return inputDate.getTime() >= currentDate.getTime()
}
