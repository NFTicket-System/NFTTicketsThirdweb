import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Event from "../../models/Event"
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import router from "next/router";

const EventPage = () => {
    const {eventId} = router.query

    const [event, setEvent] = useState<Event>()
    const [ticketTypes, setTicketTypes] = useState<String[]>([])
    const [isEventAlreadyFetched, setIsEventAlreadyFetched] = useState(false)

    const fetchEventAllInfos = useCallback(async () => {
        await axios.get(`http://localhost:8080/api/events/single/${eventId}`).then((response) => {
            let responseEvent: Event = new Event(response.data)
            setEvent(responseEvent)

            //get all the different types of ticket
            let responseTicketTypes: String[] = []
            responseEvent.tickets.forEach(it => {
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
                <Footer/>
            </>
    )
}

export default EventPage
