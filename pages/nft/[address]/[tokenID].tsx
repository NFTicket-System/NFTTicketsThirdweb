import { Button, Card, Col, Container, Grid, Loading, Row, Spacer, Text } from '@nextui-org/react'
import { RiMapPinLine } from '@react-icons/all-files/ri/RiMapPinLine'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAddress, useContract, useListing, useNetwork, useNetworkMismatch } from '@thirdweb-dev/react'
import { BigNumber } from 'ethers'
import Header from '../../../components/header/Header'
import { buyNft } from '@/services/buyNFTicket'
import { noConnectedWalletErrorAlert } from '@/utils/errors/noConnectedWalletErrorAlert'
import { BuyWithStripe } from '@/services/buyWithStripe'
import { convertEuroToMATIC } from '@/utils/tools'
import { ConversionSens } from '@/models/enum/createNFTInputs'

const NftDetails = () => {
	const connectedAddress = useAddress()
	const router = useRouter()
	const { tokenID } = router.query
	const { contract: marketplace } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS, 'marketplace')
	const { data: item, isLoading } = useListing(marketplace, tokenID as string)
	const isMismatched = useNetworkMismatch()
	const [, switchNetwork] = useNetwork()
	const [convertedAmount, setConvertedAmount] = useState<string | null>(null)

	useEffect(() => {
		async function fetchConvertedAmount() {
			try {
				const amountInEuro = Number(item?.buyoutCurrencyValuePerToken.displayValue)
				const result = await convertEuroToMATIC(amountInEuro, ConversionSens.EUR)
				setConvertedAmount(String(result))
			} catch (error) {
				console.error('Error fetching converted amount:', error)
			}
		}

		console.log(item)
		void fetchConvertedAmount()
	}, [item?.buyoutCurrencyValuePerToken.displayValue])

	return (
		<>
			<Header></Header>
			<Container>
				{isLoading ? (
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
						<Container css={{ maxWidth: '80%' }}>
							<Row justify={'flex-start'}>
								<Text
									weight={'bold'}
									color={'white'}
									css={{ backgroundColor: 'black', padding: '0 1rem' }}>
									{(item?.asset.properties as { date: string })?.date ?? 'Date missing'}
								</Text>
							</Row>
							<Spacer y={1} />
							<Text
								size="$3xl"
								weight={'bold'}
								color={'black'}>
								{item?.asset.name}
							</Text>
							<Spacer y={2} />
							<Grid.Container justify="center">
								<Grid xs={6}>
									<Card>
										<Card.Image
											showSkeleton
											src={item?.asset.image ?? ''}
											objectFit="cover"
											width="100%"
											maxDelay={10000}
											height={400}
											alt="Card image background"
										/>
										<Card.Header css={{ position: 'absolute', zIndex: 2, top: 5 }}>
											<Col>
												<Text
													size={24}
													color="white"
													weight="bold">
													<RiMapPinLine />
													{(item?.asset.properties as { location: string })?.location ??
														'Location missing'}
												</Text>
											</Col>
										</Card.Header>
									</Card>
								</Grid>
								<Grid xs={6}>
									<Card css={{ marginLeft: '1rem' }}>
										<Card.Body>
											<Container
												fluid
												css={{ maxWidth: '95%' }}>
												<Text
													transform={'uppercase'}
													size={24}
													weight="bold">
													{item?.asset.name}
												</Text>
												<Text
													size={18}
													weight="bold">
													Le{' '}
													{(item?.asset.properties as { date: string })?.date ??
														'Date missing'}
												</Text>
												<Text
													size={18}
													weight="bold">
													{(item?.asset.properties as { hourStart: string })?.hourStart ??
														'Start Hour Missing'}{' '}
													-{' '}
													{(item?.asset.properties as { hourEnd: string })?.hourEnd ??
														'End Hour Missing'}
												</Text>
												<Text
													size={18}
													weight="bold">
													<RiMapPinLine />
													{(item?.asset.properties as { location: string })?.location ??
														'Location missing'}
												</Text>
											</Container>
										</Card.Body>
										<Card.Footer
											css={{
												display: 'flex',
												justifyContent: 'flex-end',
												gap: '10px',
											}}>
											<Text weight={'bold'}>
												<>{`${String(convertedAmount)} €`}</>
												{/* {item?.buyoutCurrencyValuePerToken.symbol} */}
											</Text>
											<Spacer x={1}></Spacer>
											<Button
												onPress={async () => {
													connectedAddress === undefined
														? noConnectedWalletErrorAlert()
														: await buyNft({
																nftId: BigNumber.from(tokenID),
																isMismatched,
																switchNetwork,
																marketplace,
														  })
												}}
												size={'lg'}
												shadow
												color={'primary'}
												auto>
												Acheter en crypto
											</Button>
											<Button
												onPress={async () => {
													connectedAddress === undefined
														? noConnectedWalletErrorAlert()
														: await BuyWithStripe({
																nftId: BigNumber.from(tokenID),
																connectedAddress,
																creditCard: {
																	number: '4242424242424242',
																	expMonth: '12',
																	expYear: '25',
																	cvc: '333',
																},
														  })
												}}
												size={'lg'}
												shadow
												color={'primary'}
												auto>
												Acheter en carte bleu
											</Button>
										</Card.Footer>
									</Card>
								</Grid>
							</Grid.Container>
						</Container>
					</>
				)}
			</Container>
		</>
	)
}

export default NftDetails
