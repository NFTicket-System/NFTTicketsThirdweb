import type { NextPage } from 'next'
import '@/../styles/Home.module.scss'
import React from 'react';
import { Button, Col, Container, Grid, Image, Row } from '@nextui-org/react';
import { ThirdwebSDK, TransactionResult } from '@thirdweb-dev/sdk';
import { BigNumber, ethers } from "ethers";
import { useSDK } from '@thirdweb-dev/react';

const Home: NextPage = () => {
    /*    const { setTheme } = useNextTheme()
        const { isDark, type } = useTheme()
        const connectWithMetamask = useMetamask();*/

    /**
     * TESTING MINTING FROM CLIENT
     */

    const privateKey = process.env.NEXT_PUBLIC_MMPK as string;
    const thirdwebSDK = useSDK();

    let collectionAddress: any;
    let mintTxnHash: TransactionResult;

    async function createCollection() {
        collectionAddress = await thirdwebSDK?.deployer.deployNFTCollection( {
            name: "Rihanna Bercy",
            symbol: "TEST",
            primary_sale_recipient: "0x97974328a92232f22A1802Ecff33f0ADE3A7BA74",
            image: "https://bafkreie4zdcentifeqoukitd32lvd3k3kr3y5va7kqfdewd7budjkoanui.ipfs.nftstorage.link/",
            description: "A fruit basket that lives on the Rinkeby blockchain! 🍎🧺",
            /* Optional fields below */
            //platform_fee_recipient: "0x00000",
            //platform_fee_basis_points: "5",
            //fee_recipient: "0x00000",
            //seller_fee_basis_points: "10",
            //external_link: "YOUR_HTTP_URL",
            //Descriptions for the fields above can be found here: https://portal.thirdweb.com/typescript/sdk.nftcontractdeploymetadata
        } )
        console.log( "NFT Collection Address: ", collectionAddress )
    }

    async function mint() {
        const nftCollection = await thirdwebSDK?.getContract( collectionAddress );

        const metadata = {
            name: "Cool NFT",
            description: "This is a cool NFT",
            image: "https://bafkreidxzweunukaruhyfvepkjrep76vi75y6yl5fq3pqedallz6nwoori.ipfs.nftstorage.link/",// This can be an image url or file
        };

        const transaction = await nftCollection.mintTo()
        console.log( "Minted NFT Transaction Hash: ", mintTxnHash.receipt.transactionHash )
    }

    const postNft = async () => {
        console.log( 'clicked' )
        createCollection().then(
                () => mint()
        )
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
