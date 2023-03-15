import React from 'react';
import { Button, Grid, Input, Spacer } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useAddress, useConnect, useSDK } from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';


const NftDrop = () => {
    const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm();
    const sdk = useSDK();
    const [ { data }, connect ] = useConnect();
    //const { data: compilerData, isLoading, error } = useCompilerMetadata( contractAddress );
    const address = useAddress();

    const contractAddress = "{{contract_address}}";

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
            const collectionContractAddress = await sdk?.deployer.deployNFTCollection( {
                name: 'my title 2',
                primary_sale_recipient: address!,
            } );

            const contract = await sdk?.getContract( collectionContractAddress!, 'nft-collection' )

            const metaData = {
                name: "My NFT",
                description: "This is my NFT",
                image: "ipfs://example.com/my-nft.png",
            }

            const tx = await contract?.mintTo( address!, metaData );

            const nft = await tx?.data(); // (optional) fetch details of minted NFT

            console.log( nft )

            const marketplaceAddress = await process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS;

            const marketplace = await sdk?.getMarketplace( marketplaceAddress! );

            const listing = {
                // address of the contract the asset you want to list is on
                assetContractAddress: collectionContractAddress ? collectionContractAddress : '',
                // token ID of the asset you want to list
                tokenId: tx!.id,
                // when should the listing open up for offers
                startTimestamp: new Date(),
                // how long the listing will be open for
                listingDurationInSeconds: 86400,
                // how many of the asset you want to list
                quantity: 1,
                // address of the currency contract that will be used to pay for the listing
                currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                // how much the asset will be sold for
                buyoutPricePerToken: "1",
            }

            marketplace!.direct.createListing( listing );
            /*            const receipt = tx2.receipt; // the transaction receipt
                        const id = tx2.id; // the id of the newly created listing*/

            /*           console.log( contractAddress )
                                   const marketplaceAddress = await process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS;

                                   const marketplace = await sdk?.getMarketplace( marketplaceAddress! );

                                   // Data of the listing you want to create
                                   const listing = {
                                       // address of the contract the asset you want to list is on
                                       assetContractAddress: contractAddress,
                                       // token ID of the asset you want to list
                                       tokenId: contractAddress,
                                       // when should the listing open up for offers
                                       startTimestamp: new Date(),
                                       // how long the listing will be open for
                                       listingDurationInSeconds: 86400,
                                       // how many of the asset you want to list
                                       quantity: 2,
                                       // address of the currency contract that will be used to pay for the listing
                                       currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                                       // how much the asset will be sold for
                                       buyoutPricePerToken: "1",
                                   }

                                   const tx = await marketplace.direct.createListing( listing );
                                   const receipt = tx.receipt; // the transaction receipt
                                   const id = tx.id; // the id of the newly created listing*/


        } else {
            console.log( 'no' )
        }
    }

    return (
            <>
                <form onSubmit={ handleSubmit( onSubmit ) }>
                    <Grid.Container justify={ "center" } direction={ "column" }>
                        <Input size={ "lg" }
                               clearable bordered labelPlaceholder="Name"
                               { ...register( "name", { required: true } ) }
                        />
                        <Spacer y={ 2 }/>
                        {/*<Input
                                size={ "lg" } clearable bordered labelPlaceholder="Name" name="name" value={ name }
                                onChange={ ( e ) => setName( DOMPurify.sanitize( e.target.value ) ) }/>
                        <Spacer y={ 2 }/>
                        <Input
                                size={ "lg" }
                                clearable
                                bordered
                                labelPlaceholder="Name"
                                name="name"
                                value={ name }
                                onChange={ ( e ) => setName( DOMPurify.sanitize( e.target.value ) ) }/>
                        <Spacer y={ 2 }/>
                        <Input
                                size={ "lg" } clearable bordered labelPlaceholder="Name" name="name" value={ name }
                                onChange={ ( e ) => setName( DOMPurify.sanitize( e.target.value ) ) }/>
                        <Spacer y={ 1 }/>*/ }
                        <Button type="submit">{ isSubmitting ? 'Loading' : "Submit" }</Button>
                    </Grid.Container>
                </form>

            </>
    );
}

export default NftDrop;
