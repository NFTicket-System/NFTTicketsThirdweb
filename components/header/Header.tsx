import { Card, Divider, Input, Link, Navbar, Spacer, Text, useTheme } from '@nextui-org/react'
import { ConnectWallet } from '@thirdweb-dev/react'
import React, { useState } from 'react'
import Logo from '../icons/Logo'
import ThemeSwitcher from '../theme/ThemeSwitcher'
import router, { useRouter } from 'next/router'
import { IoSearch } from '@react-icons/all-files/io5/IoSearch'
import { type LightEvent } from '@/models/LightEvent'

interface HeaderProps {
	events: LightEvent[]
}

const Header = (props: HeaderProps) => {
	const { isDark } = useTheme()
	const { asPath } = useRouter()

	console.log(props)

	const [searchTermResults, setSearchTermResults] = useState<LightEvent[]>()

	return (
		<>
			<Navbar
				css={
					isDark === true
						? {
								$$navbarBackgroundColor: '#131313',
								$$navbarBlurBackgroundColor: '#131313',
						  }
						: {
								$$navbarBackgroundColor: 'conic-gradient(from 90deg, #FFFFFF, #F7F7F7)',
								$$navbarBlurBackgroundColor: '#FFF',
						  }
				}
				shouldHideOnScroll
				variant={'sticky'}
				maxWidth="fluid">
				<Navbar.Content
					enableCursorHighlight
					activeColor={'primary'}
					hideIn="xs"
					variant={'underline-rounded'}>
					<Navbar.Brand>
						<Link href="/">
							<Logo
								width={34}
								height={34}
								color={isDark ?? false ? '#FFF' : '#000'}
							/>
							<Spacer x={0.5} />
							<Text
								b
								color={isDark ?? false ? 'white' : 'black'}
								hideIn="xs">
								NFTickets
							</Text>
						</Link>
					</Navbar.Brand>
					<Navbar.Item isActive={asPath === '/create-drop'}>
						<Link href="/create-drop">
							<Text
								b
								color={isDark ?? false ? 'white' : 'black'}>
								Créer un évènement
							</Text>
						</Link>
					</Navbar.Item>
					<Navbar.Item isActive={asPath === '/all-nft'}>
						<Link href="/all-nft">
							<Text
								b
								color={isDark ?? false ? 'white' : 'black'}>
								All nft
							</Text>
						</Link>
					</Navbar.Item>
					<Navbar.Item isActive={asPath === '/my-nft'}>
						<Link href="/my-nft">
							<Text
								b
								color={isDark ?? false ? 'white' : 'black'}>
								My Nfts
							</Text>
						</Link>
					</Navbar.Item>
				</Navbar.Content>
				<Navbar.Content
					css={{
						width: '40%',
					}}>
					<Navbar.Item
						css={{
							width: '100%',
						}}>
						<Input
							clearable
							aria-label="Search bar"
							contentLeft={<IoSearch />}
							contentLeftStyling={false}
							css={{
								w: '100%',
								'@xsMax': {
									mw: '300px',
								},
								'& .nextui-input-content--left': {
									h: '100%',
									ml: '$4',
									dflex: 'center',
								},
							}}
							placeholder="Recherche..."
							onChange={(e) => {
								const filteredEvents = props.events.filter((event) =>
									event.libelle.toLowerCase().includes(e.target.value.toLowerCase())
								)
								e.target.value.length > 0
									? filteredEvents.length > 0
										? setSearchTermResults(filteredEvents)
										: setSearchTermResults([])
									: setSearchTermResults([])
							}}
						/>
					</Navbar.Item>
				</Navbar.Content>
				<Navbar.Content>
					<ConnectWallet
						btnTitle="Connectez votre wallet"
						colorMode={isDark ?? false ? 'dark' : 'light'}
					/>
					<Navbar.Item>
						<ThemeSwitcher></ThemeSwitcher>
					</Navbar.Item>
				</Navbar.Content>
			</Navbar>
			{searchTermResults !== undefined ? (
				<>
					{searchTermResults.length > 0 ? (
						<Card
							css={{
								margin: 'auto',
								padding: '0 1em',
								maxWidth: '50%',
								marginTop: '1%',
							}}>
							<Card.Body>
								<Text
									h4
									b>
									Évènements disponibles :
								</Text>
								<Divider />
								{searchTermResults.map((searchItem) => (
									<Text
										css={{
											display: 'flex',
											alignItems: 'center',
											padding: '7px',

											'&:hover': {
												color: '#4E3104',
												cursor: 'pointer',
												backgroundColor: '$primaryLight',
												borderRadius: '4px',
											},
										}}
										key={searchItem.id}
										onClick={() => {
											void router.push(`/event/${searchItem.id}`)
										}}>
										{searchItem.libelle}
									</Text>
								))}
							</Card.Body>
						</Card>
					) : (
						''
					)}
				</>
			) : (
				<></>
			)}
			<Spacer y={2} />
		</>
	)
}

export default Header
