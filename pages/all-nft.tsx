import React from 'react'
import { useActiveListings, useContract } from '@thirdweb-dev/react'
import { Loading, Row, Container, Spacer, Grid, Text } from '@nextui-org/react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import TicketCard from '../components/card/TicketCard'

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
							<Grid.Container 
							justify="space-evenly"
							alignItems="baseline"
							gap={1.5}>
								{nfts?.map((nft) => (
									<Grid key={nft.id}>
										<TicketCard
											id={nft.id}
											contractAddress={nft.assetContractAddress}
											name={nft.asset.name}
											image={nft.asset.image}
											/>
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