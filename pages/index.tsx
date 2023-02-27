import type { NextPage } from 'next'
import { useTheme as useNextTheme } from 'next-themes'
import { Button, Text, Link, Navbar, Switch, useTheme, Container } from '@nextui-org/react'
import '@/../styles/Home.module.scss'
import { useMetamask,useWalletConnect } from '@thirdweb-dev/react';
import React from 'react';
import MetaMaskIcon from '../components/icons/MetaMaskIcon';
import WalletConnectIcon from '../components/icons/WalletConnectIcon';

const Home: NextPage = () => {
    const { setTheme } = useNextTheme()
    const { isDark, type } = useTheme()
    const connectWithMetamask = useMetamask();
    const connectWithWalletConnect = useWalletConnect();

    return (
            <>
                <Navbar isBordered variant='floating'>
                    <Navbar.Brand>
                        <Text b color='inherit' hideIn='xs'>
                            NFTicket
                        </Text>
                    </Navbar.Brand>
                    <Navbar.Content enableCursorHighlight hideIn='xs' variant='highlight-rounded'>
                        <Navbar.Link href='#'>MarketPlace</Navbar.Link>
                        <Navbar.Link isActive href='#'>
                            My Collection
                        </Navbar.Link>
                    </Navbar.Content>
                    <Navbar.Content>
                        <Button icon={ <MetaMaskIcon height={ 20 } width={ 20 }/> } flat color="primary"
                                onPress={ connectWithMetamask }>Metamask</Button>
                        <Button icon={ <WalletConnectIcon height={ 20 } width={ 20 }/> } flat color="primary"
                                onPress={ connectWithWalletConnect }>WalletConnect</Button>
                        <div className='test'>
                            The current theme is: { type }
                            <Switch checked={ isDark }
                                    onChange={ ( e ) => setTheme( e.target.checked ? 'dark' : 'light' ) }/>
                        </div>
                    </Navbar.Content>

                </Navbar>
                <h1>
                    Home Page
                </h1>
            </>
    )
}

export default Home
