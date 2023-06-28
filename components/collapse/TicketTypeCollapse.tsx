import { type Ticket } from '@/models/Event'
import { Button, Collapse, Grid, Loading, Modal, Row, Spacer, Text, useModal } from '@nextui-org/react'
import Image from 'next/image'
import nextIcon from '../../assets/icons/fleche-droite.png'
import { useActiveListings, useContract } from '@thirdweb-dev/react'
import React, { useEffect, useState } from 'react'
import router from 'next/router'

interface TicketCardProps {
	ticketType: string
	ticketsOfType: Ticket[]
	lowerPrice: number
}

const TicketTypeCollapse: React.FC<TicketCardProps> = (props: TicketCardProps) => {
	const collectionAddress = props.ticketsOfType[0].addressContract
	const { contract } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS, 'marketplace')
	const { data: nfts, isLoading } = useActiveListings(contract, {
		tokenContract: collectionAddress,
	})
	const { setVisible, bindings } = useModal()
	const [isAllTicketsLoaded, setIsAllTicketsLoaded] = useState(isLoading)

	useEffect(() => {
		if (isAllTicketsLoaded !== isLoading) {
			if (nfts !== undefined) {
				if (bindings.open) {
					router
						.push(`/nft/${collectionAddress}/${nfts[0].id}`)
						.then(() => {
							setVisible(false)
						})
						.catch((e: any) => {
							console.error(e)
						})
				}
			}
		}
		setIsAllTicketsLoaded(isLoading)
	}, [isLoading])

	return (
		<>
			<Collapse title={props.ticketType}>
				<Row justify="space-between">
					<Text
						color="grey"
						h6>
						Ticket(s) à partir de {props.lowerPrice} €
					</Text>
					<Button
						onPress={() => {
							setVisible(true)
						}}>
						<Row
							justify={'space-between'}
							align={'center'}>
							<Text
								color="black"
								b>
								Consulter les tickets
							</Text>
							<Spacer x={0.5} />
							<Image
								alt={'right arrow'}
								width={30}
								height={30}
								src={nextIcon}
								objectFit="cover"
							/>
						</Row>
					</Button>
				</Row>
			</Collapse>
			<Modal
				scroll
				fullScreen
				closeButton
				aria-labelledby="redirect-modal"
				aria-describedby="redirect-modal"
				{...bindings}>
				<Modal.Body>
					<Grid.Container
						justify={'center'}
						alignItems={'center'}
						direction={'row'}
						css={{ height: '100%' }}>
						<Text size={50}>Chargement</Text>
						<Spacer x={1} />
						<Loading
							type={'points'}
							size={'xl'}
						/>
					</Grid.Container>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default TicketTypeCollapse
