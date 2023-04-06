import React, { type ReactNode } from 'react'
import { Container } from '@nextui-org/react'

interface FormWrapperProps {
	title: string
	children: ReactNode
}

function FormWrapper({ title, children }: FormWrapperProps) {
	return (
		<>
			<h2>{title}</h2>
			<Container>{children}</Container>
		</>
	)
}

export default FormWrapper
