import type { NextPage } from 'next'
import { useTheme as useNextTheme } from 'next-themes'
import { Button, Text, Link, Navbar, Switch, useTheme } from '@nextui-org/react'
import '@/../styles/Home.module.scss'
import { useEffect } from 'react'
import { useMetamask } from '@thirdweb-dev/react';

const Home: NextPage = () => {
    const { setTheme } = useNextTheme()
    const { isDark, type } = useTheme()
    const connectWithMetamask = useMetamask();

    useEffect( () => {
        // Check the browser's user theme on mount
        const userTheme = window.matchMedia( '(prefers-color-scheme: dark)' ).matches ? 'dark' : 'light';
        setTheme( userTheme );

        // Register a listener for the 'change' event
        const mediaQuery = window.matchMedia( '(prefers-color-scheme: dark)' );
        mediaQuery.addEventListener( 'change', ( event ) => {
            setTheme( event.matches ? 'dark' : 'light' );
        } );

        // Cleanup function
        return () => {
            mediaQuery.removeEventListener( 'change', ( event ) => {
                setTheme( event.matches ? 'dark' : 'light' );
            } );
        }
    }, [] );

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

                <div className='mt-2'>
                    The current theme is: { type }
                    <Switch checked={ isDark } onChange={ ( e ) => setTheme( e.target.checked ? 'dark' : 'light' ) }/>
                </div>
                <h1 className='text-3xl font-bold underline'>
                    Home Page
                </h1>
                <p className='test'>test</p>
                <Button bordered color="primary" onClick={ connectWithMetamask }>Connectez vous</Button>
            </>
    )
}

export default Home
