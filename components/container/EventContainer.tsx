import { Grid } from '@nextui-org/react'
import { LightEvent } from '../../models/LightEvent'
import EventCard from '../card/EventCard'

interface EventContainerProps {
	events: LightEvent[]
}

const EventContainer: React.FC<EventContainerProps> = (props: EventContainerProps) => {
	return (
		<>
			<Grid.Container
				gap={2}
				justify="space-evenly">
				{props.events.map((item) => {
					if (item.id > 0) {
						return (
							<Grid
								key={item.id}
								md={2}>
								<EventCard event={item} />
							</Grid>
						)
					} else {
						return <Grid md={2} />
					}
				})}
			</Grid.Container>
		</>
	)
}

export default EventContainer
