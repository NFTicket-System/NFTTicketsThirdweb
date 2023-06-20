import React from 'react'
import { MediaRenderer, useActiveListings, useContract } from '@thirdweb-dev/react'
import { Link, Loading, Row, Container, Spacer, Grid, Text, Card } from '@nextui-org/react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

const AllNft = () => {
	const { contract: marketplace } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS, 'marketplace')
	const { data: nfts, isLoading: isLoadingNfts } = useActiveListings(marketplace)

	return (
		<>
			<Header></Header>

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
				<>
					<Container css={{ maxWidth: '90%' }}>
						<Row justify={'flex-start'}>
						<Text
						size={32}
						weight={'bold'}
						color={'white'}
						css={{ backgroundColor: 'black', padding: '0 1rem' }}>
							Ticket NTF disponible :
						</Text>
						</Row>
						<Spacer y={2}/>
							<Grid.Container justify="space-evenly">
								{nfts?.map((nft) => (
									<Grid key={nft.id}>
										<Card.Body>
											<MediaRenderer
												src={nft.asset.image}
												height={'200rem'}
												width={'200rem'} />
											<h3>
												<Link href={`/nft/${nft.assetContractAddress}/${nft.id}`}>{nft.asset.name}</Link>
											</h3>
											{/* <Button shadow color="primary" auto onClick={ () => buyNft( nft.id ) }>
																buy
																<b>{ nft.buyoutCurrencyValuePerToken.displayValue }</b>{ " " }
																{ nft.buyoutCurrencyValuePerToken.symbol }
									</Button> */}
										</Card.Body>
									</Grid>
								))}
							</Grid.Container>
					</Container>
				</>
			)}
			<Spacer y={3} />
			<Footer></Footer>
		</>
	)
}

export default AllNft




/*
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
					</Button> }
						</div>
					))}
				</div>
			)}
		</>
	)
}

export default AllNft
*/