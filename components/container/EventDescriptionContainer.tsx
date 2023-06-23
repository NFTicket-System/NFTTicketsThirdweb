import {Event} from "../../models/Event"
import {Button, Card, Col, Container, Grid, Image as RemoteImage, Row, Spacer, Text} from "@nextui-org/react"
import Image from 'next/image'
import yellowCalendar from "../../assets/icons/calendrier-yellow.png"
import yellowLocalisation from "../../assets/icons/localisateur-yellow.png"
import {formatEventDateTime} from "@/utils/errors/tools";
import {Category} from "@/models/Category";
import EventCategoryBadge from "@/components/Badge/EventCategoryBadge";

interface EventDescriptionContainerProps {
    event: Event | null,
    categories: Category[]
}

const EventDescriptionContainer: React.FC<EventDescriptionContainerProps> = (props: EventDescriptionContainerProps) => {
    const formatedTimestampStart = formatEventDateTime(props.event ? props.event.timestampStart : "")
    const formatedTimestampEnd = formatEventDateTime(props.event ? props.event.timestampEnd : "")

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
                                        <Row align={"flex-start"}>
                                            {props.event.isTrendemous ?
                                                    <>
                                                        <Button size="sm" bordered auto rounded
                                                                css={{color: "#DFE73B", borderColor: "#DFE73B"}}>
                                                            Tendance
                                                        </Button>
                                                        <Spacer/>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                            {props.categories.map((category) => {
                                                return (
                                                        <>
                                                            <EventCategoryBadge category={category}/>
                                                            <Spacer/>
                                                        </>
                                                )
                                            })}
                                        </Row>
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
                                        <Col>
                                            <Row align={"center"}>
                                                <Text h6>
                                                    Début :
                                                </Text>
                                                <Spacer/>
                                                <Text h4 b>
                                                    {formatedTimestampStart}
                                                </Text>
                                            </Row>
                                            <Row align={"center"}>
                                                <Text h6>
                                                    Fin :
                                                </Text>
                                                <Spacer/>
                                                <Text h4 b>
                                                    {formatedTimestampEnd}
                                                </Text>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Spacer/>
                                    <Row justify={"flex-start"}>
                                        <Image
                                                alt="Icone de localisation"
                                                src={yellowLocalisation}
                                                width={30}
                                                height={30}/>
                                        <Spacer/>
                                        <Col>
                                            <Text h4 b>
                                                {props.event.city}
                                            </Text>
                                            <Text h6>
                                                {props.event.address}
                                            </Text>
                                        </Col>
                                    </Row>
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
