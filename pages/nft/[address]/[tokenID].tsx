import { Button, Card, Col, Container, Grid, Loading, Row, Spacer, Text } from "@nextui-org/react";
import { RiMapPinLine } from "@react-icons/all-files/ri/RiMapPinLine";
import React from 'react';
import { useRouter } from 'next/router';
import { useContract, useListing, useNetwork, useNetworkMismatch } from '@thirdweb-dev/react';
import { BigNumber, BigNumberish } from 'ethers';
import { ChainId } from '@thirdweb-dev/sdk';
import Header from '../../../components/header/Header';


const NftDetails = () => {
    const router = useRouter();
    const { tokenID } = router.query;
    const { contract: marketplace } = useContract( process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS, "marketplace" );
    const { data: item, isLoading } = useListing( marketplace, tokenID as string );
    const isMismatched = useNetworkMismatch();
    const [ , switchNetwork ] = useNetwork();

    async function buyNft( nftId: BigNumberish ) {
        try {
            // Ensure user is on the correct network
            if ( isMismatched ) {
                switchNetwork && await switchNetwork( ChainId.Goerli );
                return;
            }

            // Simple one-liner for buying the NFT
            await marketplace?.buyoutListing( BigNumber.from( nftId ), 1 );
            alert( "NFT bought successfully!" );
        } catch ( error ) {
            console.error( error );
            alert( error );
        }
    }

    return (
            <>
                <Header></Header>
                <Container>
                    { isLoading ? (
                            <Row justify="center">
                                <Loading type="points" size={ "lg" }/>
                            </Row>
                    ) : (
                            <>
                                <Container css={ { maxWidth: "80%" } }>
                                    <Row justify={ "flex-start" }>
                                        <Text weight={ "bold" } color={ 'white' }
                                              css={ { backgroundColor: 'black', padding: '0 1rem' } }>
                                            { ( item?.asset.properties as { date: string } )?.date ?? 'Date missing' }
                                        </Text>
                                    </Row>
                                    <Spacer y={ 1 }/>
                                    <Text size="$3xl" weight={ "bold" } color={ 'black' }>
                                        { item?.asset.name }
                                    </Text>
                                    <Spacer y={ 2 }/>
                                    <Grid.Container justify="center">
                                        <Grid xs={ 6 }>
                                            <Card>
                                                <Card.Header css={ { position: "absolute", zIndex: 1, top: 5 } }>
                                                    <Col>
                                                        <Text size={ 24 } color="white" weight="bold">
                                                            <RiMapPinLine/>
                                                            { ( item?.asset.properties as { location: string } )?.location ?? 'Location missing' }
                                                        </Text>
                                                    </Col>
                                                </Card.Header>
                                                <Card.Image
                                                        showSkeleton
                                                        src={ item?.asset.image || '' }
                                                        objectFit="cover"
                                                        width="100%"
                                                        maxDelay={ 10000 }
                                                        height={ 400 }
                                                        alt="Card image background"
                                                />
                                            </Card>
                                        </Grid>
                                        <Grid xs={ 6 }>
                                            <Card css={ { marginLeft: "1rem" } }>
                                                <Card.Body>
                                                    <Container fluid css={ { maxWidth: "95%" } }>
                                                        <Text transform={ "uppercase" } size={ 24 } color="black"
                                                              weight="bold">
                                                            { item?.asset.name }
                                                        </Text>
                                                        <Text size={ 18 } color="black" weight="bold">
                                                            Le { ( item?.asset.properties as { date: string } )?.date ?? 'Date missing' }
                                                        </Text>
                                                        <Text size={ 18 } color="black" weight="bold">
                                                            { ( item?.asset.properties as { hourStart: string } )?.hourStart ?? 'Start Hour Missing' } - { ( item?.asset.properties as { hourEnd: string } )?.hourEnd ?? 'End Hour Missing' }
                                                        </Text>
                                                        <Text size={ 18 } color="black" weight="bold">
                                                            { ( item?.asset.properties as { location: string } )?.location ?? 'Location missing' }
                                                        </Text>
                                                    </Container>
                                                </Card.Body>
                                                <Card.Footer css={ { display: "flex", justifyContent: "flex-end" } }>
                                                    <Text weight={ "bold" }>{ item?.buyoutCurrencyValuePerToken.displayValue } { item?.buyoutCurrencyValuePerToken.symbol }</Text>
                                                    <Spacer x={ 1 }></Spacer>
                                                    <Button onPress={ () => buyNft( BigNumber.from( tokenID ) ) }
                                                            size={ "lg" }
                                                            shadow
                                                            color={ "primary" } auto>
                                                        Commander
                                                    </Button>
                                                </Card.Footer>
                                            </Card>
                                        </Grid>
                                    </Grid.Container>
                                </Container>
                            </>
                    ) }

                </Container>
            </>
    );
};

export default NftDetails;
