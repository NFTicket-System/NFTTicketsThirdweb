import React from 'react';
import Navbar from '../components/navbar/navbar';
import { MediaRenderer, useActiveListings, useContract } from '@thirdweb-dev/react';
import { Link, Loading } from '@nextui-org/react';

const AllNft = () => {
    const { contract: marketplace } = useContract( process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS, "marketplace" );
    /*    const isMismatched = useNetworkMismatch();
        const [ , switchNetwork ] = useNetwork();*/
    const { data: nfts, isLoading: isLoadingNfts } = useActiveListings( marketplace );

    /*    async function buyNft( nftId: BigNumberish ) {
            try {
                // Ensure user is on the correct network
                if ( isMismatched ) {
                    switchNetwork && await switchNetwork( ChainId.Goerli );
                    return;
                }

                // Simple one-liner for buying the NFT
                await marketplace?.buyoutListing( nftId, 1 );
                alert( "NFT bought successfully!" );
            } catch ( error ) {
                console.error( error );
                alert( error );
            }
        }*/

    return (
            <>
                <Navbar></Navbar>

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
