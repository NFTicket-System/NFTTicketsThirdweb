import React, { useCallback, useState, useEffect } from "react"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import {type LightEvent } from "@/models/LightEvent"
import axios from "axios"
import { useRouter } from "next/router"
import EventContainer from "@/components/container/EventContainer"

const CategoryPage = () => {
    const router = useRouter()
    const [ eventsCategorie, setEventsCategorie] = useState<LightEvent[]>([])
    
    const fetchEvents = async (libelle: string) => {
        let url = `http://localhost:8080/api/events/all/light/byCat/${libelle}`
        if(libelle === 'trendemous')
            url = `http://localhost:8080/api/events/all/light/${libelle}`
        await axios.get(url).then((response) => {
			const result: LightEvent[] = []
			response.data.map((item: LightEvent) => result.push(item))
			// fillEvents(result)
			setEventsCategorie(result)
		})
	}
    useEffect(() => {
		if (!router.query.events) {
            if(!router.query.catLibelle){
                return
            }
            fetchEvents(router.query.catLibelle.toString()).catch(console.error)
            return
        }
        const parsedEvents = JSON.parse(router.query.events.toString())
        setEventsCategorie(parsedEvents)
	}, [router.query])

    // const fillEvents = (events: LightEvent[]) => {
	// 	const initialEventsLength = events.length
	// 	for (let index = 0; index < 5 - initialEventsLength; index++) {
	// 		events.push(new LightEvent(-1, '', ''))
	// 	}
	// }

    return (
            <>
                <Header events={[]}/>

                <EventContainer events={eventsCategorie}/>

                <Footer/>
            </>
    )
}

export default CategoryPage
