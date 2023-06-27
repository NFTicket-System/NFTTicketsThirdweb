import { type Ticket } from '../../models/Event'
import { Button, Collapse, Row, Spacer, Text } from '@nextui-org/react'
import Image from 'next/image'
import nextIcon from '../../assets/icons/fleche-droite.png'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'

interface TicketCardProps {
	ticketType: string
	ticketsOfType: Ticket[]
	lowerPrice: number
}

const TicketTypeCollapse: React.FC<TicketCardProps> = (props: TicketCardProps) => {
	const sdkAdmin = ThirdwebSDK.fromPrivateKey(process.env.NEXT_PUBLIC_SDK_PK ?? '', 'mumbai')

	return (
		<Collapse title={props.ticketType}>
			<Row justify="space-between">
				<Text
					color="grey"
					h6>
					Ticket(s) à partir de {props.lowerPrice} €
				</Text>
				<Button
					onPress={async () => {
						console.log('pressed')

						const collection = await sdkAdmin.getContract(
							props.ticketsOfType[0].addressContract,
							'nft-collection'
						)
						console.log(collection)

						/* if (ticket !== undefined) {
							void router.push(`/event/${ticket.addressContract}/${ticket.tokenId}`)
						} */
					}}>
					<Row
						justify={'space-between'}
						align={'center'}>
						<Text
							color="black"
							b>
							Consulter les tickets
						</Text>
						<Spacer />
						<Image
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
