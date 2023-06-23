import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import {Event} from "../../models/Event"
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import router from "next/router";
import TicketTypeContainer from "../../components/container/TicketTypeContainer";
import {Spacer} from "@nextui-org/react";
import EventDescriptionContainer from "../../components/container/EventDescriptionContainer";
import {Category} from "@/models/Category";

const EventPage = () => {
    const {eventId} = router.query

    const [event, setEvent] = useState<Event>()
    const [eventCategories, setEventCategories] = useState<Category[]>([])
    const [ticketTypes, setTicketTypes] = useState<string[]>([])
    const [isEventAlreadyFetched, setIsEventAlreadyFetched] = useState(false)

    const fetchEventAllInfos = useCallback(async () => {
        await axios.get(`http://localhost:8080/api/events/all/categoty/event/${eventId}`).then((response) => {
            const result: Category[] = []
            response.data.map((item: Category) => result.push(item))
            setEventCategories(result)
        })
    }, [])

    const fetchEventCategories = useCallback(async () => {
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

            // All categories of event
            fetchEventCategories().catch(console.error)

            setIsEventAlreadyFetched(true)
        }
    }, [fetchEventAllInfos, fetchEventCategories])

    return (
            <>
                <Header/>
                <EventDescriptionContainer event={event ? event : null} categories={eventCategories}/>
                <Spacer/>
                <TicketTypeContainer tickets={event ? event.tickets : []} ticketTypes={ticketTypes}/>
                <Spacer y={2}/>
                <Footer/>
            </>
    )
}

export default EventPage
