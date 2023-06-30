import {Button, Card, Col, Container, Grid, Loading, Row, Spacer, Text, useTheme} from '@nextui-org/react'
import { RiMapPinLine } from '@react-icons/all-files/ri/RiMapPinLine'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAddress, useContract, useListing, useNetwork, useNetworkMismatch } from '@thirdweb-dev/react'
import { BigNumber } from 'ethers'
import Header from '../../../components/header/Header'
import { buyNft } from '@/services/buyNFTicket'
import { noConnectedWalletErrorAlert } from '@/utils/errors/noConnectedWalletErrorAlert'
import axios from 'axios'
import CreditCardModal from '@/components/forms/CreditCardModal'
import Footer from "@/components/footer/Footer";

const NftDetails = () => {
	const connectedAddress = useAddress()
	const router = useRouter()
	const { tokenID } = router.query
	const { contract: marketplace } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS, 'marketplace')
	const { data: item, isLoading } = useListing(marketplace, tokenID as string)
	const isMismatched = useNetworkMismatch()
	const [, switchNetwork] = useNetwork()
	const [isAllTicketsLoaded, setIsAllTicketsLoaded] = useState(isLoading)
	const [formatedLocation, setformatedLocation] = useState<string>('')
	const [convertedPrice, setConvertedPrice] = useState<string>('0')
	const [modalIsOpen, setModalIsOpen] = useState(false)
    const { isDark } = useTheme()

	const getEventLocation = async (label: string) => {
		await axios
			.get(
				`${process.env.NEXT_PUBLIC_API_HOSTNAME ?? 'http://localhost:8080'}/api/events/single/location/${label}`
			)
			.then((response: { data: Array<{ address: string; city: string }> }) => {
				setformatedLocation(`${response.data[0].address}, ${response.data[0].city}`)
			})
			.catch(() => {
				setformatedLocation('')
			})
	}

	useEffect(() => {
        console.log(item)
		if (isAllTicketsLoaded !== isLoading) {
			if (item != null) {
				void getEventLocation(String(item.asset.name))
			}
		}
		setIsAllTicketsLoaded(isLoading)
	}, [isLoading])

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
						<Spacer x={4} />
						<Container css={{ maxWidth: '80%' }}>
							<Row justify={'flex-start'}>
								<Text
									weight={'bold'}
									color={isDark ? 'black': 'white'}
									css={{ backgroundColor: isDark ? 'white': 'black', padding: '0 1rem' }}>
									{(item?.asset.properties as { date: string })?.date ?? 'Date missing'}
								</Text>
							</Row>
							<Spacer y={1} />
							<Text
								size="$3xl"
								weight={'bold'}
								color={isDark ? 'white': 'black'}>
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
										{formatedLocation !== '' ? (
											<Card.Header css={{ position: 'absolute', zIndex: 2, top: 5 }}>
												<Text
													size={24}
													color="white"
													weight="bold">
													<Row align={'center'}>
														<RiMapPinLine />
														&nbsp;
														{(item?.asset.properties as { location: string })?.location ??
															'Location missing'}
													</Row>
												</Text>
											</Card.Header>
										) : (
											<></>
										)}
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
													<Row align={'center'}>
														<RiMapPinLine />
														&nbsp;
														{formatedLocation}
													</Row>
												</Text>
											</Container>
										</Card.Body>
										<Card.Footer
											css={{
												display: 'flex',
												justifyContent: 'flex-end',
												gap: '10px',
											}}>
                                            <Col>
                                                <Row justify={"flex-end"}>
                                                    <Text weight={'bold'}>{`${router.query.price} €`}</Text>
                                                    <Spacer x={0.5}/>
                                                </Row>
                                                <Spacer/>
                                                <Row justify={"flex-end"}>
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
                                                            color={'primary'}
                                                            auto>
                                                        <Text
                                                                color="black"
                                                                b>
                                                            Acheter en crypto
                                                        </Text>
                                                    </Button>
                                                    <Spacer x={1}/>
                                                    <Button
                                                            onPress={async () => {
                                                                setModalIsOpen(true)
                                                            }}
                                                            size={'lg'}
                                                            color={'primary'}
                                                            auto>
                                                        <Text
                                                                color="black"
                                                                b>
                                                            Acheter en carte bleu
                                                        </Text>
                                                    </Button>
                                                </Row>
                                            </Col>
										</Card.Footer>
									</Card>
								</Grid>
							</Grid.Container>
						</Container>
						<CreditCardModal
							isOpen={modalIsOpen}
							onClose={() => {
								setModalIsOpen(false)
							}}
							connectedAddress={connectedAddress ?? ''}
							nftId={BigNumber.from(tokenID)}
							price={router.query.price}
						/>
					</>
				)}
			</Container>
            <Spacer y={7}/>
            <Footer/>
		</>
	)
}

export default NftDetails
