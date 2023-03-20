import { Grid } from "@nextui-org/react"
import { LightEvent } from "../../models/LightEvent"
import EventCard from "../card/EventCard"

interface EventContainerProps {
    events: Array<LightEvent>,
}

const EventContainer: React.FC<EventContainerProps> = ( props: EventContainerProps ) => {
    return (
            <Grid.Container gap={ 2 } justify="center">
                { props.events.map( ( item, index ) => {
                    return (
                            <Grid key={ item.id } xs={ 6 } md={ 6 }>
                                <EventCard event={ item }/>
                            </Grid>
                    )
                } ) }
            </Grid.Container>
    )
}

export default EventContainer
