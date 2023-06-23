import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import {Event, Ticket} from "../../models/Event"
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import router from "next/router";
import TicketTypeContainer from "../../components/container/TicketTypeContainer";
import {Spacer} from "@nextui-org/react";
import TicketDescriptionContainer from "../../components/container/EventDescriptionContainer";

const EventPage = () => {
    const {eventId} = router.query

    const [event, setEvent] = useState<Event>()
    const [ticketTypes, setTicketTypes] = useState<string[]>([])
    const [isEventAlreadyFetched, setIsEventAlreadyFetched] = useState(false)

    const fetchEventAllInfos = useCallback(async () => {
        await axios.get(`http://localhost:8080/api/events/single/${eventId}`).then((response) => {
            let responseEvent: Event = new Event(response.data)
            setEvent(responseEvent)

            //get all the different types of ticket
            let responseTicketTypes: string[] = []
            responseEvent.tickets.forEach((it: { type: string }) => {
                if (!responseTicketTypes.includes(it.type))
                    responseTicketTypes.push(it.type)
            })
            setTicketTypes(responseTicketTypes)
        })
    }, [])

    useEffect(() => {
        if (!isEventAlreadyFetched) {
            // All event infos
            fetchEventAllInfos().catch(console.error)

            setIsEventAlreadyFetched(true)
        }
    }, [fetchEventAllInfos])

    return (
            <>
                <Header/>
                <TicketDescriptionContainer event={event ? event : null}/>
                <Spacer/>
                <TicketTypeContainer tickets={event ? event.tickets : []} ticketTypes={ticketTypes}/>
                <Spacer y={2}/>
                <Footer/>
            </>
    )
}

export default EventPage
