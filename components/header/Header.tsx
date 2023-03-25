import { Button, Link, Navbar, Spacer, Text, useTheme } from '@nextui-org/react'
import { ConnectWallet } from '@thirdweb-dev/react'
import React from 'react'
import Logo from '../icons/Logo'
import ThemeSwitcher from '../theme/ThemeSwitcher'
import { useRouter } from 'next/router'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Header = () => {
  const { isDark } = useTheme()
  const { asPath } = useRouter()

  return (
            <>
                <Navbar
                        shouldHideOnScroll
                        isBordered={ isDark }
                        variant={ 'sticky' }
                        maxWidth='fluid'>
                    {/* LOGO START */}
                    <Navbar.Brand>
                        <Link href="/">
                            <Logo width={ 34 } height={ 34 } color={ (isDark ?? false) ? '#FFF' : '#000' }/>
                            <Spacer x={ 0.5 }/>
                            <Text b
                                  color={ (isDark ?? false) ? 'white' : 'black' }
                                  hideIn="xs">
                                NFTickets
                            </Text>
                        </Link>
                    </Navbar.Brand>
                    <Button color="gradient"
                            auto>
                        Gradient
                    </Button>
                    <Navbar.Content enableCursorHighlight
                                    activeColor={ 'primary' }
                                    hideIn="xs"
                                    variant={ 'underline-rounded' }>
                        <Navbar.Item isActive={asPath === '/create-drop'}>
                            <Link href="/create-drop">
                                <Text b
                                      color={ (isDark ?? false) ? 'white' : 'black' }>
                                    Créer un évènement
                                </Text>
                            </Link>
                        </Navbar.Item>
                        <Navbar.Item isActive={asPath === '/all-nft'}>
                            <Link href="/all-nft">
                                <Text b
                                      color={ (isDark ?? false) ? 'white' : 'black' }>
                                    All nft
                                </Text>
                            </Link>
                        </Navbar.Item>
                    </Navbar.Content>
                    <Navbar.Content>
                        <ConnectWallet btnTitle="Connectez votre wallet"
                                       colorMode={ (isDark ?? false) ? 'dark' : 'light' }/>
                        <Navbar.Item>
                            <ThemeSwitcher></ThemeSwitcher>
                        </Navbar.Item>
                    </Navbar.Content>
                </Navbar>
                <Spacer y={ 2 }/>
            </>
  )
}

export default Header
