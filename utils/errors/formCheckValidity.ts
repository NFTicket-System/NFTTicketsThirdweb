export const isInputValid = (inputValue: string, triedToSubmit: boolean): 'error' | 'default' => {
	return inputValue === '' && triedToSubmit ? 'error' : 'default'
}

export const setHelperText = (inputValue: string, triedToSubmit: boolean): string => {
	return inputValue === '' && triedToSubmit ? 'Champ requis' : ''
}

export const setDateHelperText = (inputValue: string, triedToSubmit: boolean): string => {
	if (!checkDateValid(inputValue)) {
		return 'Veuillez choisir une date valide'
	} else {
		return inputValue === '' && triedToSubmit ? 'Champ requis' : ''
	}
}

// Is the date choose in the past
export const checkDateValid = (dateInput: string): boolean => {
	const formattedDateInput = new Date(
		Number(dateInput.split('-')[2]),
		Number(dateInput.split('-')[1]) - 1,
		Number(dateInput.split('-')[0])
	)
	const now = new Date()
	now.setHours(0, 0, 0, 0)
	formattedDateInput.setHours(0, 0, 0, 0)
	return formattedDateInput >= now
}
