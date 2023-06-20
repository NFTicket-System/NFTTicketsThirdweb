import React, { useState } from 'react'
import { Input, Spacer, Text, Textarea } from '@nextui-org/react'
import { isInputValid, setHelperText } from '@/utils/errors/formCheckValidity'

interface DescriptionStepProps {
	onChange: (eventName: string, eventDescription: string) => void
	triedToSubmit: boolean
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({ onChange, triedToSubmit }) => {
	const [eventName, setEventName] = useState('')
	const [eventDescription, setEventDescription] = useState('')

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = e.target.value
		if (e.target.type === 'text') {
			setEventName(value)
			onChange(value, eventDescription)
		} else {
			setEventDescription(value)
			onChange(eventName, value)
		}
	}

	return (
		<>
			<Input
				label={"Nom de l'évènement *"}
				type={'text'}
				required
				clearable
				underlined
				status={isInputValid(eventName, triedToSubmit)}
				color={isInputValid(eventName, triedToSubmit)}
				helperText={setHelperText(eventName, triedToSubmit)}
				helperColor="error"
				value={eventName}
				onChange={handleInputChange}
				aria-label="Event Name"
			/>
			<Spacer y={4} />
			<Text>Description de l&lsquo;évènement</Text>
			<Textarea
				bordered
				color="default"
				helperText={'Décrivez votre évènement en quelques mots'}
				value={eventDescription}
				onChange={handleInputChange}
				aria-label="Event Desc"
			/>
		</>
	)
}

export default DescriptionStep
