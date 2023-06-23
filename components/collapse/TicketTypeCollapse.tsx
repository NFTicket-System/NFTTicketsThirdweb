import {Ticket} from "../../models/Event";
import {Button, Card, Col, Collapse, Row, Spacer, Text} from "@nextui-org/react";
import Image from 'next/image'
import nextIcon from "../../assets/icons/fleche-droite.png"

interface TicketCardProps {
    ticketType: string,
    ticketsOfType: Ticket[],
    lowerPrice: number
}

const TicketTypeCollapse: React.FC<TicketCardProps> = (props: TicketCardProps) => {
    // @ts-ignore
    // @ts-ignore
    return (
            <Collapse title={props.ticketType}>
                <Row justify="space-between">
                    <Text color="grey" h6>
                        Ticket(s) à partir de {props.lowerPrice} €
                    </Text>
                    <Button>
                        <Row justify={"space-between"} align={"center"}>
                            <Text color="black" b>
                                Consulter les tickets
                            </Text>
                            <Spacer y={1}/>
                            <Image
                                    width={30}
                                    height={30}
                                    src={nextIcon}
                                    objectFit="cover"/>
                        </Row>
                    </Button>
                </Row>
            </Collapse>
    )
}

export default TicketTypeCollapse
