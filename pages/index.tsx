import type { NextPage } from 'next'
import { useTheme as useNextTheme } from 'next-themes'
import { Button, Text, Link, Navbar, Switch, useTheme, Container } from '@nextui-org/react'
import '@/../styles/Home.module.scss'
import { useMetamask } from '@thirdweb-dev/react';
import React from 'react';
import MetaMaskIcon from '../components/icons/MetaMaskIcon';

const Home: NextPage = () => {
    const { setTheme } = useNextTheme()
    const { isDark, type } = useTheme()
    const connectWithMetamask = useMetamask();

    return (
            <>
                <Navbar isBordered variant='floating'>
                    <Navbar.Brand>
                        <Text b color='inherit' hideIn='xs'>
                            ACME
                        </Text>
                    </Navbar.Brand>
                    <Navbar.Content enableCursorHighlight hideIn='xs' variant='highlight-rounded'>
                        <Navbar.Link href='#'>Features</Navbar.Link>
                        <Navbar.Link isActive href='#'>
                            Customers
                        </Navbar.Link>
                        <Navbar.Link href='#'>Pricing</Navbar.Link>
                        <Navbar.Link href='#'>Company</Navbar.Link>
                    </Navbar.Content>
                    <Navbar.Content>
                        <Navbar.Link color='inherit' href='#'>
                            Login
                        </Navbar.Link>
                        <Navbar.Item>
                            <Button auto flat as={ Link } href='#'>
                                Sign Up
                            </Button>
                        </Navbar.Item>
                    </Navbar.Content>
                </Navbar>


                <div>
                    The current theme is: { type }
                    <Switch checked={ isDark }
                            onChange={ ( e ) => setTheme( e.target.checked ? 'dark' : 'light' ) }/>
                </div>
                <h1>
                    Home Page
                </h1>
                <Button icon={ <MetaMaskIcon height={ 20 } width={ 20 }/> } flat color="primary"
                        onPress={ connectWithMetamask }>Metamask</Button>

            </>
    )
}

export default Home
