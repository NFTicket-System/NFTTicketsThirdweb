import React from 'react';
import { Button, Grid, Input, Spacer } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useAddress, useConnect, useSDK } from '@thirdweb-dev/react';
import {NATIVE_TOKEN_ADDRESS, ThirdwebSDK} from '@thirdweb-dev/sdk';

type formDataType = {
    name:string,
    description:string,
    date:string,
    hourStart:string,
    hourEnd:string,
    location:string,
    price:string,
    image:string,
    count:number
}

const NftDrop = () => {
    const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm<formDataType>();
    const sdkAdmin = ThirdwebSDK.fromPrivateKey(process.env.NEXT_PUBLIC_SDK_PK!,'goerli')
    const [ { data }, connect ] = useConnect();
    const connectedAddress = useAddress();


    async function saveFormData( data: formDataType ) {
        return await fetch( "http://localhost:5000/create-drop", {
            body: JSON.stringify( data ),
            headers: { "Content-Type": "application/json" },
            method: "POST"
        } )
    }

    const onSubmit = async (formData:formDataType) => {
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
                name: formData.name,
                primary_sale_recipient: connectedAddress || '',
            } );

            const contract = await sdkAdmin?.getContract( collectionContractAddress || '', 'nft-collection' )

            const metaData = {
                name: formData.name,
                description: formData.description,
                image: formData.image,
                hourStart:formData.hourStart,
                hourEnd:formData.hourEnd,
                location:formData.location,
                date:formData.date
            }
            const metaDatas = []

            for(let i = 0;i < formData.count; i++){
                metaDatas.push(metaData)
            }

            const mintTransaction = await contract?.mintBatchTo( process.env.NEXT_PUBLIC_MADD || '', metaDatas );
            for(const nftObject of mintTransaction){

            const marketplaceAddress = await process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS;

                const marketplace = await sdkAdmin?.getContract( marketplaceAddress || '' ,'marketplace');

                const listing = {
                    // address of the contract the asset you want to list is on
                    assetContractAddress: collectionContractAddress || '',
                    // token ID of the asset you want to list
                    tokenId: nftObject ? nftObject.id : 0,
                    // when should the listing open up for offers
                    startTimestamp: new Date(),
                    // how long the listing will be open for
                    listingDurationInSeconds: 86400,
                    // how many of the asset you want to list
                    quantity: 1,
                    // address of the currency contract that will be used to pay for the listing
                    currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                    // how much the asset will be sold for
                    buyoutPricePerToken: formData.price,
                }

                marketplace?.direct.createListing( listing );
            }

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
