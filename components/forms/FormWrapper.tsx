import React, { type ReactNode } from 'react'
import { Container, Text } from '@nextui-org/react'

interface FormWrapperProps {
	title: string
	children: ReactNode
}

function FormWrapper({ title, children }: FormWrapperProps) {
	return (
		<>
			<Container
				direction={'column'}
				display={'flex'}>
				<Text>{title}</Text>
				{children}
			</Container>
		</>
	)
}

export default FormWrapper
