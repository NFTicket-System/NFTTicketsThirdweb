import type { NextPage } from 'next'
import '@/../styles/Home.module.scss'
import React from 'react';
import { Button, Col, Container, Grid, Image, Row } from '@nextui-org/react';

const Home: NextPage = () => {
    /*    const { setTheme } = useNextTheme()
        const { isDark, type } = useTheme()
        const connectWithMetamask = useMetamask();*/

    /**
     * TESTING MINTING FROM CLIENT
     */

    const postNft = async () => {
        console.log( 'clicked' )
    }
    /*        await fetch( "api/mintTicket", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                }
            } )
        }*/


    /**
     * TESTING MINTING FROM CLIENT
     */
    return (
            <Grid.Container justify="center" css={ { height: '100vh' } }>
                <Grid css={ { border: "1px red solid" } } xs={ 12 } md={ 6 }>
                    <Col>
                        <Image
                                showSkeleton
                                objectFit="fill"
                                width={ '100%' }
                                height={ '200px' }
                                maxDelay={ 10000 }
                                src="/assets/angele_2-photo1-@manuel-obadia-wills-3-1140x570.jpg"
                                alt="Default Image"
                        />
                        <Button onClick={ postNft }>Créer votre ticket</Button>
                    </Col>
                </Grid>
                {/*                <Navbar isBordered variant='floating'>
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
                <Carousel/>
                */ }
            </Grid.Container>
    )
}

export default Home
