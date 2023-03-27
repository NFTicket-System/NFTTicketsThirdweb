import { Card, Col, Text } from '@nextui-org/react'
import { type LightEvent } from '../../models/LightEvent'

interface EventCardProps {
	event: LightEvent
}

const EventCard: React.FC<EventCardProps> = (props: EventCardProps) => {
	return (
		<Card
			isPressable
			isHoverable
			variant="bordered">
			<Card.Body>
				<Card.Image
					width="100%"
					height="100%"
					src={props.event.imageUrl}
					alt={props.event.name}
					objectFit="cover"
				/>
			</Card.Body>
			<Card.Footer
				isBlurred
				css={{
					position: 'absolute',
					bgBlur: '#0f111466',
					borderTop: '$borderWeights$light solid $gray800',
					bottom: 0,
					zIndex: 1,
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
						{props.event.name}
					</Text>
				</Col>
			</Card.Footer>
		</Card>
	)
}

export default EventCard
