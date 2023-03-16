import React from 'react';
import { Button, Grid, Input, Spacer } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useAddress, useConnect, useSDK } from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS, ThirdwebSDK } from '@thirdweb-dev/sdk';


const NftDrop = () => {
    const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm();
    const sdk = useSDK();
    const sdkAdmin = ThirdwebSDK.fromPrivateKey( process.env.NEXT_PUBLIC_SDK_PK!, 'goerli' )
    const [ { data }, connect ] = useConnect();
    const connectedAddress = useAddress();


    async function saveFormData( data: object ) {
        return await fetch( "http://localhost:5000/create-drop", {
            body: JSON.stringify( data ),
            headers: { "Content-Type": "application/json" },
            method: "POST"
        } )
    }


    const onSubmit = async ( formData: any ) => {
        /*const response = await saveFormData( data )

        if ( response.status === 400 ) {
            // Validation error
        } else if ( response.ok ) {
            // successful
        } else {
            // unknown error
        }*/

        if ( data.connected ) {
            const collectionContractAddress = await sdkAdmin?.deployer.deployNFTCollection( {
                name: formData.eventName,
                primary_sale_recipient: connectedAddress || '',
            } );

            const contract = await sdkAdmin?.getContract( collectionContractAddress || '', 'nft-collection' )

            const metaData = {
                name: "My NFT",
                description: "This is my NFT",
                image: "ipfs://example.com/my-nft.png",
            }
            const metaDatas = []

            for ( let i = 0; i < 20; i++ ) {
                metaDatas.push( metaData )
            }

            const mintTransaction = await contract?.mintBatchTo( process.env.NEXT_PUBLIC_MADD || '', metaDatas );

            const nftData = await mintTransaction[ 0 ]?.data();

            console.log( nftData )

            const marketplaceAddress = await process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS;

            const marketplace = await sdkAdmin?.getMarketplace( marketplaceAddress || '' );

            const listing = {
                // address of the contract the asset you want to list is on
                assetContractAddress: collectionContractAddress || '',
                // token ID of the asset you want to list
                tokenId: mintTransaction[ 0 ] ? mintTransaction[ 0 ].id : 0,
                // when should the listing open up for offers
                startTimestamp: new Date(),
                // how long the listing will be open for
                listingDurationInSeconds: 86400,
                // how many of the asset you want to list
                quantity: 25,
                // address of the currency contract that will be used to pay for the listing
                currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                // how much the asset will be sold for
                buyoutPricePerToken: "1",
            }

            marketplace?.direct.createListing( listing );


        } else {
            console.log( 'no connected wallet' )
        }
    }

    return (
            <>
                <Grid.Container justify={ 'center' }>
                    <form onSubmit={ handleSubmit( onSubmit ) }>
                        <Input size={ "md" }
                               clearable
                               bordered
                               color={ "primary" }
                               labelPlaceholder="Nom de l'évènement"
                               { ...register( InputEvent.NAME, { required: true } ) }
                        />
                        <Input size={ "md" }
                               clearable
                               bordered
                               color={ "primary" }
                               labelPlaceholder="Desciption de l'évènement"
                               { ...register( InputEvent.DESCRIPTION, { required: true } ) }
                        />
                        <Input size={ "md" }
                               clearable
                               bordered
                               color={ "primary" }
                               labelPlaceholder="Date"
                               { ...register( InputEvent.DATE, { required: true } ) }
                        />
                        <Input size={ "md" }
                               clearable
                               bordered
                               color={ "primary" }
                               labelPlaceholder="Count"
                               { ...register( InputEvent.COUNT, { required: true } ) }
                        />
                        <Input size={ "md" }
                               clearable
                               bordered
                               color={ "primary" }
                               labelPlaceholder="Price"
                               { ...register( InputEvent.PRICE, { required: true } ) }
                        />
                        <Input size={ "md" }
                               clearable
                               bordered
                               color={ "primary" }
                               labelPlaceholder="Hour start"
                               { ...register( InputEvent.HOUR_START, { required: true } ) }
                        />
                        <Input size={ "md" }
                               clearable
                               bordered
                               color={ "primary" }
                               labelPlaceholder="Hour end"
                               { ...register( InputEvent.HOUR_END, { required: true } ) }
                        />
                        <Input size={ "md" }
                               clearable
                               bordered
                               color={ "primary" }
                               labelPlaceholder="type"
                               { ...register( InputEvent.TYPE, { required: true } ) }
                        />
                        <Spacer y={ 2 }/>
                        <Button type="submit">{ isSubmitting ? 'Loading' : "Submit" }</Button>
                    </form>
                </Grid.Container>
            </>
    );
}

export default NftDrop;

export enum InputEvent {
    NAME = "name",
    DESCRIPTION = "description",
    DATE = "date",
    COUNT = "count",
    PRICE = "price",
    HOUR_START = "hourStart",
    HOUR_END = "hourEnd",
    TYPE = "type"
}
