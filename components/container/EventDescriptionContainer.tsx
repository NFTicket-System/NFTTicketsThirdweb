import {Event} from "../../models/Event"
import {Card, Col, Container, Grid, Image as RemoteImage, Row, Spacer, Text} from "@nextui-org/react"
import Image from 'next/image'
import yellowCalendar from "../../assets/icons/calendrier-yellow.png"
import blackCalendar from "../../assets/icons/calendrier-black.png"

interface EventDescriptionContainerProps {
    event: Event | null
}

const EventDescriptionContainer: React.FC<EventDescriptionContainerProps> = (props: EventDescriptionContainerProps) => {
    if (props.event)
        return (
                <>
                    <Container xl>
                        <Card css={{p: "$8"}}>
                            <Card.Header>
                                <RemoteImage
                                        alt="Image de l'événement"
                                        src={props.event.urlImage}
                                        width={500}
                                        height={500}
                                        autoResize
                                        objectFit="cover"/>
                                <Grid.Container css={{pl: "$12"}}>
                                    <Grid xs={12}>
                                        <Text h1 css={{lineHeight: "$xs"}}>
                                            {props.event.libelle}
                                        </Text>
                                    </Grid>
                                    <Grid xs={12}>
                                        {/* TODO liste des badges*/}
                                    </Grid>
                                </Grid.Container>
                            </Card.Header>
                            <Spacer/>
                            <Card.Body>
                                <Col>
                                    <Row justify={"flex-start"}>
                                        <Image
                                                alt="Icone de calendrier"
                                                src={yellowCalendar}
                                                width={30}
                                                height={30}/>
                                        <Spacer/>
                                        <Text h4 b>
                                            {props.event.timestampStart} - {props.event.timestampEnd}
                                        </Text>
                                    </Row>
                                    <Text>test</Text>
                                </Col>
                            </Card.Body>
                        </Card>
                    </Container>
                </>
        )
    else return (
            <></>
    )
}

export default EventDescriptionContainer
