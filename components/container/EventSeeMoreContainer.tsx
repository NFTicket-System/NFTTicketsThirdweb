import { Grid } from '@nextui-org/react'
import { type LightEvent } from '../../models/LightEvent'
import EventSeeMoreCard from '../card/EventSeeMoreCard'

interface EventSeeMoreContainerProps {
	events: LightEvent[]
}

const EventSeeMoreContainer: React.FC<EventSeeMoreContainerProps> = (props: EventSeeMoreContainerProps) => {
    
	return (
		<>
			<Grid.Container
				gap={3}
				justify="space-evenly">
				{props.events.map((item) => {
                        if (item.id > 0) {
                            return (
                                    <Grid
                                        key={item.id}
                                        xs={4}
                                        >
                                        <EventSeeMoreCard event={item} />
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

export default EventSeeMoreContainer
