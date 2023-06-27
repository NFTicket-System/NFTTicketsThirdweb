import { type Ticket } from '../../models/Event'
import { Button, Collapse, Row, Text } from '@nextui-org/react'
import Image from 'next/image'
import nextIcon from '../../assets/icons/fleche-droite.png'
import { useActiveListings, useContract } from '@thirdweb-dev/react'
import React from 'react'
import router from 'next/router'
import { defaultErrorModal } from '@/utils/errors/defaultErrorAlert'

interface TicketCardProps {
	ticketType: string
	ticketsOfType: Ticket[]
	lowerPrice: number
}

const TicketTypeCollapse: React.FC<TicketCardProps> = (props: TicketCardProps) => {
	const collectionAddress = props.ticketsOfType[0].addressContract
	const { contract } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS, 'marketplace')
	const { data: nfts } = useActiveListings(contract, {
		tokenContract: collectionAddress,
	})

	return (
		<Collapse title={props.ticketType}>
			<Row justify="space-between">
				<Text
					color="grey"
					h6>
					Ticket(s) à partir de {props.lowerPrice} €
				</Text>
				<Button
					onPress={() => {
						console.log(nfts)
						if (nfts !== undefined) {
							void router.push(`/nft/${collectionAddress}/${nfts[0].id}`)
						} else {
							defaultErrorModal()
						}
					}}>
					<Row
						justify={'space-between'}
						align={'center'}>
						<Text
							color="black"
							b>
							Consulter les tickets
						</Text>
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
	)
}

export default TicketTypeCollapse
