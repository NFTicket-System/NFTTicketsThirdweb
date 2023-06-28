import { Card, Collapse, Container, Text } from '@nextui-org/react'
import TicketTypeCollapse from '../collapse/TicketTypeCollapse'
import { type Ticket } from '@/models/Event'

interface TicketTypeContainerProps {
	tickets: Ticket[]
	ticketTypes: string[]
}

const TicketTypeContainer: React.FC<TicketTypeContainerProps> = (props: TicketTypeContainerProps) => {
	const maxContainerSize = 3
	let curentIndex = 0

	/*	useEffect(() => {
		const updateTicketPrices = async () => {
			const updatedTickets = await Promise.all(
				props.tickets.map(async (ticket) => {
					const updatedPrice = await getAmountInEuro(ticket.prix)
					return { ...ticket, prix: updatedPrice }
				})
			)
			console.log(updatedTickets)
		}

		void updateTicketPrices()
	}, [])

	const getAmountInEuro = async (price: number): Promise<number> => {
		try {
			const result = await convertEuroToMATIC(price, ConversionSens.EUR)
			return Number(result)
		} catch (error) {
			console.error(error)
			throw error
		}
	} */

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
									} else {
										return <></>
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

/*

import { Card, Collapse, Container, Text } from '@nextui-org/react'
import TicketTypeCollapse from '../collapse/TicketTypeCollapse'
import { type Ticket } from '@/models/Event'
import { convertEuroToMATIC } from '@/utils/tools'
import { ConversionSens } from '@/models/enum/createNFTInputs'

interface TicketTypeContainerProps {
    tickets: Ticket[]
    ticketTypes: string[]
}

const TicketTypeContainer: React.FC<TicketTypeContainerProps> = (props: TicketTypeContainerProps) => {
    const maxContainerSize = 3
    let curentIndex = 0

    const getTicketsOfType = async (type: string): Ticket[] => {
        const result: Ticket[] = []
        for (const it of props.tickets) {
            if (it.type === type) {
                console.log('IN', it)
                await getAmountInEuro(it.prix).then((result) => {
                    it.prix = result
                })
                result.push(it)
            }
        }
        return result
    }

    const getAmountInEuro = async (price: number): Promise<number> => {
        let convertedPrice = 0
        await convertEuroToMATIC(convertedPrice, ConversionSens.EUR)
                .then((result: string) => {
                    convertedPrice = Number(result)
                })
                .catch((e) => {
                    console.error(e)
                })
        return convertedPrice
    }

    const getLowestPrice = async (tickets: Ticket[]): number => {
        console.log('tickets', tickets)
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
                                        } else {
                                            return <></>
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
*/
