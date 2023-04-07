import React, { type ReactNode } from 'react'
import { Container, Grid, Spacer, Text } from '@nextui-org/react'

interface FormWrapperProps {
	title: string
	children: ReactNode
}

function FormWrapper({ title, children }: FormWrapperProps) {
	return (
		<>
			<Container
				direction={'column'}
				alignItems={'center'}
				display={'flex'}>
				<Text h1>{title}</Text>
				<Spacer y={2} />
				<Grid.Container
					key={'first-step'}
					direction={'column'}>
					{children}
				</Grid.Container>
			</Container>
		</>
	)
}

export default FormWrapper
