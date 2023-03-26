import { Col, Grid, Spacer, Text } from '@nextui-org/react'
import { type LightEvent } from '../../models/LightEvent'
import EventCard from '../card/EventCard'

interface EventContainerProps {
	events: LightEvent[]
}

const EventContainer: React.FC<EventContainerProps> = (props: EventContainerProps) => {
	return (
		<Grid.Container
			gap={2}
			justify="space-around">
			{props.events.map((item) => {
				return (
					<Grid
						key={item.id}
						md={2}>
						<Col>
							<Text
								size="$xl"
								b>
								{item.name}
							</Text>
							<Spacer y={1} />
							<EventCard event={item} />
						</Col>
					</Grid>
				)
			})}
		</Grid.Container>
	)
}

export default EventContainer
