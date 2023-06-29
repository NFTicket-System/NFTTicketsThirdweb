import { type Ticket } from '@/models/Event'
import { Button, Collapse, Loading, Row, Spacer, Text } from '@nextui-org/react'
import Image from 'next/image'
import nextIcon from '../../assets/icons/fleche-droite.png'
import { useActiveListings, useContract } from '@thirdweb-dev/react'
import React from 'react'
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
						disabled={isLoading}
						onPress={() => {
							if (nfts !== undefined) {
								try {
									router.push({
										pathname: `/nft/${collectionAddress}/${nfts[0].id}`,
										query: {
											price: props.lowerPrice,
										},
									})
								} catch (e) {
									console.error(e)
								}
							}
						}}>
						<Row
							justify={'space-between'}
							align={'center'}>
							<Text
								color="black"
								b>
								Consulter un ticket
							</Text>
							<Spacer x={0.5} />
							{isLoading ? (
								<Loading type="points-opacity" />
							) : (
								<Image
									alt={'right arrow'}
									width={30}
									height={30}
									src={nextIcon}
									objectFit="cover"
								/>
							)}
						</Row>
					</Button>
				</Row>
			</Collapse>
		</>
	)
}

export default TicketTypeCollapse
