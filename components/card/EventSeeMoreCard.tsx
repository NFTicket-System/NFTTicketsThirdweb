import { Card, Col, Text, Grid } from '@nextui-org/react'
import { LightEvent } from '@/models/LightEvent'
import { useRouter } from 'next/router'

interface EventSeeMoreCardProps {
	event: LightEvent
}

const EventSeeMoreCard: React.FC<EventSeeMoreCardProps> = (props: EventSeeMoreCardProps) => {
	const router = useRouter()
	return (
		
        <Card
            isPressable
            isHoverable
            variant="bordered"
            onClick={() => {
                void router.push(`/event/${props.event.id}`)
            }}
            css={{ maxHeight: '200px'}}
            >
            <Grid.Container direction='row'>
                <Grid xs>
                    <Card.Image
                        src={props.event.urlImage}
                        alt={props.event.libelle}
                        objectFit="cover"
                    />
                </Grid>
                <Grid xs={4}>
                    <Card.Body
                        css={{
                            bgBlur: '#0f111466'
                        }}>
                        <Col>
                            <Text
                                size={12}
                                weight="bold"
                                transform="uppercase"
                                color="#ffffffAA">
                                New
                            </Text>
                            <Text
                                h4
                                color="white">
                                {props.event.libelle}
                            </Text>
                        </Col>
                    </Card.Body>
                </Grid>
            </Grid.Container>
        </Card>
	)
}

export default EventSeeMoreCard
