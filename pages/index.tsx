import type {NextPage} from 'next'
import React, {useCallback, useEffect, useState} from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Caroussel from '../components/caroussel/Caroussel'
import {Container, Divider, Grid, Spacer, Text} from '@nextui-org/react'
import {LightEvent} from '../models/LightEvent'
import EventContainer from '../components/container/EventContainer'
import axios from 'axios'
import CategoryContainer from "../components/container/CategoryContainer";

const Home: NextPage = () => {
    const mockedEvent1 = new LightEvent(
            1,
            'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/91mjhjhxhVL._SL1500_.jpg',
            'Red Hot Chili Peppers'
    )
    const mockedEvent2 = new LightEvent(
            2,
            'https://www.rollingstone.fr/wp-content/uploads/2022/04/solidays-home.jpg',
            'Solidays 2023'
    )
    const mockedEvent3 = new LightEvent(
            3,
            'https://www.thenewshouse.com/wp-content/uploads/Entertainment/2022/Arctic-Monkeys-The-Car/Untitled-design-1-900x600.png',
            'Arctic Monkeys'
    )
    const mockedEvent4 = new LightEvent(
            4,
            'https://api-cdn.arte.tv/img/v2/image/ksN5Q9drCGcBFB8u3o63MC/1920x1080',
            'Hellfest 2023'
    )
    const mockedEvent5 = new LightEvent(
            5,
            'https://cdn.vieillescharrues.asso.fr/wp-content/uploads/2022/12/visuel_OG_VieillesCharrues23_V2.jpg',
            'Vielles charrues 2023'
    )

    const mockedEvents = [mockedEvent1, mockedEvent2, mockedEvent3, mockedEvent4, mockedEvent5]

    //const [events, setEvents] = useState<Array<LightEvent>>([])
    const [trendemousEvents, setTrendemousEvents] = useState<Array<LightEvent>>([])
    const [showEvents, setShowEvents] = useState<Array<LightEvent>>([])
    const [festivalEvents, setFestivalEvents] = useState<Array<LightEvent>>([])
    const [concertEvents, setConcertEvents] = useState<Array<LightEvent>>([])
    const [theatreEvents, setTheatreEvents] = useState<Array<LightEvent>>([])
    const [humorEvents, setHumorEvents] = useState<Array<LightEvent>>([])
    const [isEventsAlreadyFetched, setIsEventsAlreadyFetched] = useState(false)

    // const fetchAllEvents = useCallback(async () => {
    // 	await axios.get('http://localhost:8080/api/events/all/light').then((response) => {
    // 		var result: Array<LightEvent> = []
    // 		response.data.map((item: LightEvent) => result.push(item))
    //      fillEvents(result)
    // 		setEvents(result)
    // 	})
    // }, [])

    const fetchTrendemousEvents = useCallback(async () => {
        await axios.get('http://localhost:8080/api/events/all/light/trendemous').then((response) => {
            var result: Array<LightEvent> = []
            response.data.map((item: LightEvent) => result.push(item))
            fillEvents(result)
            setTrendemousEvents(result)
        })
    }, [])

    const fetchShowEvents = useCallback(async () => {
        var result: Array<LightEvent> = []
        await axios.get('http://localhost:8080/api/events/all/light/byCat/Foire').then((response) => {
            response.data.map((item: LightEvent) => result.push(item))
        })
        await axios.get('http://localhost:8080/api/events/all/light/byCat/Salon').then((response) => {
            response.data.map((item: LightEvent) => result.push(item))
            result = supressDuplicateById(result)
            result.sort((a, b) => a.libelle.localeCompare(b.libelle))
            fillEvents(result)
            setShowEvents(result)
        })
    }, [])

    const fetchConcertsEvents = useCallback(async () => {
        await axios.get('http://localhost:8080/api/events/all/light/byCat/Concert').then((response) => {
            var result: Array<LightEvent> = []
            response.data.map((item: LightEvent) => result.push(item))
            fillEvents(result)
            setConcertEvents(result)
        })
    }, [])

    const fetchFestivalEvents = useCallback(async () => {
        await axios.get('http://localhost:8080/api/events/all/light/byCat/Festival').then((response) => {
            var result: Array<LightEvent> = []
            response.data.map((item: LightEvent) => result.push(item))
            fillEvents(result)
            setFestivalEvents(result)
        })
    }, [])

    const fetchTheatreEvents = useCallback(async () => {
        await axios.get('http://localhost:8080/api/events/all/light/byCat/Theatre').then((response) => {
            var result: Array<LightEvent> = []
            response.data.map((item: LightEvent) => result.push(item))
            fillEvents(result)
            setTheatreEvents(result)
        })
    }, [])

    const fetchHumorEvents = useCallback(async () => {
        await axios.get('http://localhost:8080/api/events/all/light/byCat/Humor').then((response) => {
            var result: Array<LightEvent> = []
            response.data.map((item: LightEvent) => result.push(item))
            fillEvents(result)
            setHumorEvents(result)
        })
    }, [])

    useEffect(() => {
        if (!isEventsAlreadyFetched) {
            // All events
            //fetchAllEvents().catch(console.error)

            // All trendemous events
            fetchTrendemousEvents().catch(console.error)

            // All salon and foire events
            fetchShowEvents().catch(console.error)

            // All Festival events
            fetchFestivalEvents().catch(console.error)

            // All concert events
            fetchConcertsEvents().catch(console.error)

            // All theatre events
            fetchTheatreEvents().catch(console.error)

            // All humor events
            fetchHumorEvents().catch(console.error)

            setIsEventsAlreadyFetched(true)
        }
    }, [fetchTrendemousEvents, fetchShowEvents, fetchFestivalEvents, fetchConcertsEvents, fetchTheatreEvents, fetchHumorEvents])

    const fillEvents = (events: LightEvent[]) => {
        const initialEventsLength = events.length
        for (let index = 0; index < (5 - initialEventsLength); index++) {
            events.push(new LightEvent(-1, '', ''))
        }
    }

    const supressDuplicateById = (events: LightEvent[]): LightEvent[] => {
        const ids = new Set<number>();
        const results: LightEvent[] = [];

        for (const event of events) {
            if (!ids.has(event.id)) {
                ids.add(event.id);
                results.push(event);
            }
        }

        return results;
    }

    return (
            <>
                <Header/>
                <Container css={{d: 'flex', flexWrap: 'nowrap', height: '200'}}>
                    <Spacer x={4}/>
                    <Caroussel/>
                    <Spacer x={4}/>
                </Container>
                <Spacer y={2}/>

                {/* poopular */}
                <CategoryContainer events={trendemousEvents} title={"Évenements populaires"} libelle={"trendemous"}/>
                <Spacer y={1}/>
                <Divider/>

                {/* concerts */}
                <CategoryContainer events={concertEvents} title={"Concerts"} libelle={"Concert"}/>
                <Spacer y={1}/>
                <Divider/>

                {/* Foire et salon */}
                <CategoryContainer events={showEvents} title={"Foires & Salons"} libelle={"Foire&Salon"}/>
                <Spacer y={1}/>
                <Divider/>

                {/* Festival */}
                <CategoryContainer events={festivalEvents} title={"Festivals"} libelle={"Festival"}/>
                <Spacer y={1}/>
                <Divider/>

                {/* Theatre */}
                <CategoryContainer events={theatreEvents} title={"Théâtres"} libelle={"Theatre"}/>
                <Spacer y={1}/>
                <Divider/>

                {/* Theatre */}
                <CategoryContainer events={humorEvents} title={"Humours"} libelle={"Humor"}/>
                <Spacer y={1}/>
                <Divider/>

                {/* mocked */}
                <CategoryContainer events={mockedEvents} title={"Tests avec events mockés"} libelle={"mocked"}/>
                <Spacer y={2}/>

                <Footer/>
            </>
    )
}

export default Home
