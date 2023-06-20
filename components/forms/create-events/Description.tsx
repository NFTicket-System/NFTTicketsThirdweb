import React from 'react'
import { Input, Spacer, Text, Textarea } from '@nextui-org/react'
import { InputName } from '@/models/enum/createNFTInputs'

function DescriptionStep() {
	return (
		<>
			<Input
				{...register(InputName.NAME)}
				label={"Nom de l'évènement *"}
				type={'text'}
				required
				clearable
				underlined
				status={isInputValid(inputValue, triedToSubmit)}
				color={isInputValid(inputValue, triedToSubmit)}
				helperText={setHelperText(inputValue, triedToSubmit)}
				helperColor="error"
				onClearClick={() => {
					setTriedToSubmit(false)
				}}
				onChange={(e) => {
					inputValue === '' ? setTriedToSubmit(true) : setTriedToSubmit(false)
					handleInputChange(e)
				}}
			/>
			<Spacer y={4} />
			<Text>Description de l&apos;évènement</Text>
			<Textarea
				bordered
				color="default"
				helperText={'Décrivez votre évènement en quelques mots'}
				{...register(InputName.DESCRIPTION)}
			/>
		</>
	)
}

export default DescriptionStep
