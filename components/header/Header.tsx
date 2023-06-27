import {
	Card,
	Divider,
	Grid,
	Input,
	Link,
	Loading,
	Modal,
	Navbar,
	Spacer,
	Text,
	useModal,
	useTheme,
} from '@nextui-org/react'
import { ConnectWallet } from '@thirdweb-dev/react'
import React, { useEffect, useState } from 'react'
import Logo from '../icons/Logo'
import ThemeSwitcher from '../theme/ThemeSwitcher'
import router, { useRouter } from 'next/router'
import { IoSearch } from '@react-icons/all-files/io5/IoSearch'
import { type LightEvent } from '@/models/LightEvent'
import axios from 'axios'

const Header = () => {
	const { isDark } = useTheme()
	const { asPath } = useRouter()
	const { setVisible, bindings } = useModal()

	const [lightEvents, setLightEvents] = useState<LightEvent[]>([])
	const [searchTermResults, setSearchTermResults] = useState<LightEvent[]>()

	const fetchAllEvents = async () => {
		await axios.get('http://localhost:8080/api/events/all/light').then((response) => {
			const result: LightEvent[] = []
			response.data.map((item: LightEvent) => result.push(item))
			setLightEvents(result)
		})
	}

	useEffect(() => {
		fetchAllEvents().catch(console.error)
	}, [])

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
					{/*					<Navbar.Item isActive={asPath === '/all-nft'}>
						<Link href="/all-nft">
							<Text
								b
								color={isDark ?? false ? 'white' : 'black'}>
								All nft
							</Text>
						</Link>
					</Navbar.Item> */}
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
								const filteredEvents = lightEvents.filter((event) =>
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
			<div style={{ position: 'relative' }}>
				{searchTermResults !== undefined && searchTermResults.length > 0 && (
					<Card
						isHoverable
						variant={'shadow'}
						css={{
							position: 'absolute',
							top: '0',
							left: '28%',
							margin: 'auto',
							padding: '0 1em',
							maxWidth: '50%',
							marginTop: '1%',
							zIndex: '999',
						}}>
						<Card.Body>
							<Text
								h4
								b>
								Évènements disponibles :
							</Text>
							<Divider />
							{searchTermResults.slice(0, 7).map((searchItem) => (
								<Text
									css={{
										display: 'flex',
										alignItems: 'center',
										padding: '7px',
										position: 'relative',
										'&::before': {
											content: '""',
											position: 'absolute',
											top: 0,
											left: 0,
											right: 0,
											bottom: 0,
											zIndex: -1,
											transition: 'background-color 0.3s ease',
										},
										'&:hover::before': {
											backgroundColor: 'transparent',
										},
										'&:hover': {
											color: 'primary',
											cursor: 'pointer',
											fontSize: '1.2rem',
											fontWeight: 'bold',
										},
									}}
									key={searchItem.id}
									onClick={() => {
										// void router.push(`/event/${searchItem.id}`)
										setSearchTermResults([])
										setVisible(true)
										router
											.push(`/event/${searchItem.id}`)
											.then(() => {
												setVisible(false)
											})
											.catch((e: any) => {
												console.error(e)
											})
									}}>
									{searchItem.libelle}
								</Text>
							))}
						</Card.Body>
					</Card>
				)}

				{/* Rest of the page content */}
				{/* Place your existing page content JSX here */}
			</div>
			<Spacer y={2} />
			{/* eslint-disable-next-line react/jsx-no-undef */}
			<Modal
				scroll
				fullScreen
				closeButton
				aria-labelledby="redirect-modal"
				aria-describedby="redirect-modal"
				{...bindings}>
				<Modal.Body>
					<Grid.Container
						justify={'center'}
						alignItems={'center'}
						direction={'row'}
						css={{ height: '100%' }}>
						<Text size={50}>Chargement</Text>
						<Spacer x={1} />
						<Loading
							type={'points'}
							size={'xl'}
						/>
					</Grid.Container>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default Header
