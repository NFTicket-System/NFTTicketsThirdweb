import {Collapse, Container, Text, Card} from "@nextui-org/react";
import TicketTypeCollapse from "../collapse/TicketTypeCollapse";
import {Ticket} from "../../models/Event";

interface TicketTypeContainerProps {
    tickets: Ticket[],
    ticketTypes: string[]
}

const TicketTypeContainer: React.FC<TicketTypeContainerProps> = (props: TicketTypeContainerProps) => {
    const maxContainerSize: number = 3
    var curentIndex: number = 0

    const getTicketsOfType = (type: string): Ticket[] => {
        const result: Ticket[] = []
        props.tickets.forEach(it => {
            if (it.type == type)
                result.push(it)
        })
        return result
    }

    return (
            <>
                <Container xl>
                    <Card>
                        <Card.Header>
                            <Container xl>
                                <Text h2 color="white" b>
                                    Catégorie de ticket
                                </Text>
                            </Container>
                        </Card.Header>
                        <Card.Divider/>
                        <Card.Body>
                            <Container xl>
                                <Collapse.Group bordered>
                                    {props.ticketTypes.map(type => {
                                        if (curentIndex < maxContainerSize) {
                                            if (type.length > 0) {
                                                curentIndex++
                                                const ticketsOfType = getTicketsOfType(type)

                                                return (
                                                        <TicketTypeCollapse ticketType={type}
                                                                            ticketsOfType={ticketsOfType}
                                                                            lowerPrice={10.0}/>
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
