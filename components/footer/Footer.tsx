import { Col, Link, Row, Text, useTheme } from '@nextui-org/react'
import Logo from '../icons/Logo'
import Git from '../icons/Git'
import React from 'react'

const Footer = () => {
	const { isDark } = useTheme()
	return (
		<Row
			align={'center'}
			css={
				isDark === true
					? { backgroundColor: '$colors$yellow600', padding: '2em 6em 4em 5em' }
					: { backgroundColor: 'black', padding: '2em 6em 4em 5em' }
			}>
			<Col>
				<Link href="https://github.com/NFTicket-System/NFTTicketsThirdweb">
					<Col>
						<Git
							width={40}
							height={40}
							color={isDark === true ? 'black' : 'white'}
						/>
						<Text
							css={{ marginTop: '1em' }}
							color={isDark === true ? 'black' : 'white'}
							h5>
							Copyright © 2022-2023 NFTickets corp.
						</Text>
					</Col>
				</Link>
			</Col>
			<Logo
				width={80}
				height={80}
				color="black"
			/>
		</Row>
	)
}

export default Footer
