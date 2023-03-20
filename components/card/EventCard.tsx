import { Card, Text } from "@nextui-org/react"
import { LightEvent } from "../../models/LightEvent"

interface EventCardProps {
    event: LightEvent,
}

const EventCard: React.FC<EventCardProps> = (props: EventCardProps) => {
    return(
        <Card isPressable isHoverable variant="bordered">
            <Card.Body>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                    { props.event.name }
                </Text>
                <Card.Image
                    width={150}
                    height={150}  
                    src={props.event.imageUrl}
                    alt={props.event.name}
                    objectFit="cover"/>
            </Card.Body>
        </Card>
    )
}

export default EventCard