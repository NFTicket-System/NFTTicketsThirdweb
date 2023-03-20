import React from 'react';
import { MediaRenderer, useActiveListings, useContract } from '@thirdweb-dev/react';
import { Link, Loading } from '@nextui-org/react';
import Header from '../components/header/Header';

const AllNft = () => {
    const { contract: marketplace } = useContract( process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS, "marketplace" );
    const { data: nfts, isLoading: isLoadingNfts } = useActiveListings( marketplace );

    return (
            <>
                <Header></Header>

                { isLoadingNfts ? (
                        <Loading type="points" size={ "lg" }/>
                ) : (
                        <div>
                            {
                                nfts?.map( ( nft ) => (
                                        <div key={ nft.id }
                                        >
                                            <MediaRenderer src={ nft.asset.image }></MediaRenderer>
                                            <h2>
                                                <Link href={ `/nft/${ nft.assetContractAddress }/${ nft.id }` }>
                                                    { nft.asset.name }
                                                </Link>
                                            </h2>
                                            {/*<Button shadow color="primary" auto onClick={ () => buyNft( nft.id ) }>
                                                buy
                                                <b>{ nft.buyoutCurrencyValuePerToken.displayValue }</b>{ " " }
                                                { nft.buyoutCurrencyValuePerToken.symbol }
                                            </Button>*/ }
                                        </div>
                                ) )
                            }
                        </div>
                ) }
            </>
    );
};


export default AllNft;
