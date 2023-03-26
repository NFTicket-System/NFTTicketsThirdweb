import { Avatar, Dropdown, Input, Link, Navbar, Spacer, Text, useTheme } from '@nextui-org/react'
import { ConnectWallet } from '@thirdweb-dev/react'
import React from 'react'
import Logo from '../icons/Logo'
import ThemeSwitcher from '../theme/ThemeSwitcher'
import { useRouter } from 'next/router'
import { IoSearch } from '@react-icons/all-files/io5/IoSearch'

const Header = () => {
	const { isDark } = useTheme()
	const { asPath } = useRouter()

	return (
		<>
			<Navbar
				css={
					isDark === true
						? {
								$$navbarBackgroundColor: 'rgb(31,31,36)',
								$$navbarBlurBackgroundColor:
									'radial-gradient(circle, rgba(31,31,36,1) 0%, rgba(39,39,47,1) 35%, rgba(24,26,27,1) 100%)',
						  }
						: {
								$$navbarBackgroundColor: 'rgb(249,249,249)',
								$$navbarBlurBackgroundColor:
									'radial-gradient(circle, rgba(249,249,249,1) 0%,rgba(244,244,244,1) 46%, rgba(255,255,255,1) 100%)',
						  }
				}
				shouldHideOnScroll
				variant={'sticky'}
				maxWidth="fluid">
				{/*				<Button
					color="gradient"
					auto>
					Gradient
				</Button>
				<Button
					color={'primary'}
					auto
					onPress={async () => {
						await swal('Good job!', 'You clicked the' + ' button!', 'success')
					}}>
					TEST
				</Button>
				<Button
					color={'primary'}
					flat
					auto
					onPress={async () => {
						await swal('Good job!', 'You clicked the' + ' button!', 'success')
					}}>
					TEST
				</Button> */}
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
				</Navbar.Content>
				<Navbar.Content>
					<ConnectWallet
						btnTitle="Connectez votre wallet"
						colorMode={isDark ?? false ? 'dark' : 'light'}
					/>
					<Navbar.Item
						css={{
							'@xsMax': {
								w: '100%',
								jc: 'center',
							},
						}}>
						<Input
							clearable
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
						/>
					</Navbar.Item>
					<Dropdown placement="bottom-right">
						<Navbar.Item>
							<Dropdown.Trigger>
								<Avatar
									bordered
									as="button"
									color="primary"
									size="md"
									src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
								/>
							</Dropdown.Trigger>
						</Navbar.Item>
						<Dropdown.Menu
							aria-label="User menu actions"
							color="secondary"
							onAction={(actionKey) => {
								console.log({ actionKey })
							}}>
							<Dropdown.Item
								key="profile"
								css={{ height: '$18' }}>
								<Text
									b
									color="inherit"
									css={{ d: 'flex' }}>
									Signed in as
								</Text>
								<Text
									b
									color="inherit"
									css={{ d: 'flex' }}>
									zoey@example.com
								</Text>
							</Dropdown.Item>
							<Dropdown.Item
								key="settings"
								withDivider>
								My Settings
							</Dropdown.Item>
							<Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
							<Dropdown.Item
								key="analytics"
								withDivider>
								Analytics
							</Dropdown.Item>
							<Dropdown.Item key="system">System</Dropdown.Item>
							<Dropdown.Item key="configurations">Configurations</Dropdown.Item>
							<Dropdown.Item
								key="help_and_feedback"
								withDivider>
								Help & Feedback
							</Dropdown.Item>
							<Dropdown.Item
								key="logout"
								withDivider
								color="error">
								Log Out
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Navbar.Item>
						<ThemeSwitcher></ThemeSwitcher>
					</Navbar.Item>
				</Navbar.Content>
			</Navbar>
			<Spacer y={2} />
		</>
	)
}

export default Header
