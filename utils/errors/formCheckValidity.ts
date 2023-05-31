export const isInputValid = (inputValue: string, triedToSubmit: boolean): 'error' | 'default' => {
	return inputValue === '' && triedToSubmit ? 'error' : 'default'
}

export const setHelperText = (inputValue: string, triedToSubmit: boolean): string => {
	return inputValue === '' && triedToSubmit ? 'Champ requis' : ''
}
