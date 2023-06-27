import { type Ticket } from '../../models/Event'
import { Button, Collapse, Row, Spacer, Text } from '@nextui-org/react'
import Image from 'next/image'
import nextIcon from '../../assets/icons/fleche-droite.png'

interface TicketCardProps {
	ticketType: string
	ticketsOfType: Ticket[]
	lowerPrice: number
}

const TicketTypeCollapse: React.FC<TicketCardProps> = (props: TicketCardProps) => {
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
						console.log('pressed')
						const ticket = props.ticketsOfType.find((ticket) => !ticket.solded)
						console.log(props.ticketsOfType)

						if (ticket !== null) {
							// void router.push(`/event/${ticket.addressContract}/${ticket.id}`)
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
