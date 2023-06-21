import React from 'react'
import { MediaRenderer, useActiveListings, useContract } from '@thirdweb-dev/react'
import { Link, Loading, Row } from '@nextui-org/react'
import Header from '../components/header/Header'
import ScrollToTop from 'react-scroll-to-top'

const AllNft = () => {
	const { contract: marketplace } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS, 'marketplace')
	const { data: nfts, isLoading: isLoadingNfts } = useActiveListings(marketplace)

	return (
		<>
			<Header></Header>
            <ScrollToTop
                    height={'18'}
                    width={'18'}
                    top={50}
                    smooth
            />
			{isLoadingNfts ? (
				<Row
					justify="center"
					align={'center'}
					css={{ height: '50rem' }}>
					<Loading
						type="points"
						size={'lg'}
					/>
				</Row>
			) : (
				<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '15rem' }}>
					{nfts?.map((nft) => (
						<div key={nft.id}>
							<MediaRenderer
								src={nft.asset.image}
								height={'250rem'}></MediaRenderer>
							<h2>
								<Link href={`/nft/${nft.assetContractAddress}/${nft.id}`}>{nft.asset.name}</Link>
							</h2>
							{/* <Button shadow color="primary" auto onClick={ () => buyNft( nft.id ) }>
                                                buy
                                                <b>{ nft.buyoutCurrencyValuePerToken.displayValue }</b>{ " " }
                                                { nft.buyoutCurrencyValuePerToken.symbol }
                                            </Button> */}
						</div>
					))}
				</div>
			)}
		</>
	)
}

export default AllNft
