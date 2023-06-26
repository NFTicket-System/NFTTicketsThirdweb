import React, { useCallback, useState, useEffect } from "react"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import {LightEvent } from "@/models/LightEvent"
import axios from "axios"
import { useRouter } from "next/router"
import {Text} from "@nextui-org/react"
import EventContainer from "@/components/container/EventContainer"

const CategoryPage = () => {
    const router = useRouter()
    const {query: {libelle} } = router
    const [events, setEvents] = useState<LightEvent[]>([])
	const [isEventsAlreadyFetched, setIsEventsAlreadyFetched] = useState(false)
    
    const fetchEvents = useCallback(async () => {
		let tag =''
        switch(libelle){
            case "trendemous":
                tag = "trendemous"
                break
            case "Concert":
                tag = "byCat/Concert"
                break
            case "Foire&Salon":
                tag = "byCat/Salon"
                break
            case "Festival":
                tag = "byCat/Festival"
                break
            case "Theatre":
                tag = "byCat/Theatre"
                break
            case "Humor":
                tag = "byCat/Humor"
                break
        }
        await axios.get(`http://localhost:8080/api/events/all/light/${tag}`).then((response) => {
			const result: LightEvent[] = []
			response.data.map((item: LightEvent) => result.push(item))
			fillEvents(result)
			setEvents(result)
		})
	}, [])
    useEffect(() => {
		if (!isEventsAlreadyFetched) {
			fetchEvents().catch(console.error)

			setIsEventsAlreadyFetched(true)
		}
	}, [fetchEvents, isEventsAlreadyFetched])

    const fillEvents = (events: LightEvent[]) => {
		const initialEventsLength = events.length
		for (let index = 0; index < 5 - initialEventsLength; index++) {
			events.push(new LightEvent(-1, '', ''))
		}
	}

    return (
            <>
                <Header events={[]}/>

                <EventContainer events={events}/>

                <Footer/>
            </>
    )
}

export default CategoryPage
