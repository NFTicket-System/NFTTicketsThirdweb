import { Card, Collapse, Container, Text } from '@nextui-org/react'
import TicketTypeCollapse from '../collapse/TicketTypeCollapse'
import { type Ticket } from '../../models/Event'

interface TicketTypeContainerProps {
	tickets: Ticket[]
	ticketTypes: string[]
}

const TicketTypeContainer: React.FC<TicketTypeContainerProps> = (props: TicketTypeContainerProps) => {
	const maxContainerSize = 3
	let curentIndex = 0

	const getTicketsOfType = (type: string): Ticket[] => {
		const result: Ticket[] = []
		props.tickets.forEach((it) => {
			if (it.type === type) result.push(it)
		})
		return result
	}

	const getLowestPrice = (tickets: Ticket[]): number => {
		const cheapestTicket = tickets.reduce((acc, loc) => (acc.prix < loc.prix ? acc : loc))
		return cheapestTicket.prix
	}

	return (
		<>
			<Container xl>
				<Card>
					<Card.Header>
						<Container xl>
							<Text
								h2
								color="white"
								b>
								Catégorie de ticket
							</Text>
						</Container>
					</Card.Header>
					<Card.Divider />
					<Card.Body>
						<Container xl>
							<Collapse.Group bordered>
								{props.ticketTypes.map((type, index) => {
									if (curentIndex < maxContainerSize) {
										if (type.length > 0) {
											curentIndex++
											const ticketsOfType = getTicketsOfType(type)
											const lowestPriceOfType = getLowestPrice(ticketsOfType)
											return (
												<TicketTypeCollapse
													key={index}
													ticketType={type}
													ticketsOfType={ticketsOfType}
													lowerPrice={lowestPriceOfType}
												/>
											)
										} else {
											return <></>
										}
									}
								})}
							</Collapse.Group>
						</Container>
					</Card.Body>
				</Card>
			</Container>
		</>
	)
}

export default TicketTypeContainer
