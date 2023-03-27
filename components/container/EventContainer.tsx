import { Grid } from '@nextui-org/react'
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
						<EventCard event={item} />
					</Grid>
				)
			})}
		</Grid.Container>
	)
}

export default EventContainer
