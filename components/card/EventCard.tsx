import { Card, Text, Col } from '@nextui-org/react'
import { LightEvent } from '../../models/LightEvent'
import { useRouter } from 'next/router'

interface EventCardProps {
	event: LightEvent
}

const EventCard: React.FC<EventCardProps> = (props: EventCardProps) => {
	const router = useRouter()
	return (
		<Card
			isPressable
			isHoverable
			variant="bordered"
			onClick={() => {
				router.push(`/event/${props.event.id}`)
			}}
            css={{ minHeight: '200px'}}>
			<Card.Image
				width="100%"
				height="100%"
				src={props.event.urlImage}
				alt={props.event.libelle}
				objectFit="cover"
			/>
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
						{props.event.libelle}
					</Text>
				</Col>
			</Card.Footer>
		</Card>
	)
}

export default EventCard
