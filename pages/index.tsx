import type { NextPage } from 'next'
import '@/../styles/Home.module.scss'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Caroussel from '../components/caroussel/Caroussel'
import { Container, Divider, Grid, Spacer, Text } from '@nextui-org/react'
import { LightEvent } from '../models/LightEvent'
import EventContainer from '../components/container/EventContainer'
import axios from 'axios'

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

	// const [events, setEvents] = useState<Array<LightEvent>>([])
	const [trendemousEvents, setTrendemousEvents] = useState<Array<LightEvent>>([])
	const [concertEvents, setConcertEvents] = useState<Array<LightEvent>>([])
	const [isEventsAlreadyFetched, setIsEventsAlreadyFetched] = useState(false)

	// const fetchAllEvents = useCallback(async () => {
	// 	await axios
	// 		.get('http://localhost:8080/api/events/all/light')
	// 		.then((response) => {
	// 			var result: Array<LightEvent> = []
	// 			response.data.map((item: LightEvent) => result.push(item))
	// 			setEvents(result)
	// 		})
	// }, [])

	const fetchTrendemousEvents = useCallback(async () => {
		await axios
			.get('http://localhost:8080/api/events/all/light/trendemous')
			.then((response) => {
				var result: Array<LightEvent> = []
				response.data.map((item: LightEvent) => result.push(item))
				setTrendemousEvents(result)
			})
	}, [])

	const fetchConcertsEvents = useCallback(async () => {
		await axios
			.get('http://localhost:8080/api/events/all/light/byCat/Concert')
			.then((response) => {
				var result: Array<LightEvent> = []
				response.data.map((item: LightEvent) => result.push(item))
				setConcertEvents(result)
			})
	}, [])

	useEffect(() => {
		if (!isEventsAlreadyFetched) {
			// All events
			// fetchAllEvents().catch(console.error)

			// All trendemous events
			fetchTrendemousEvents().catch(console.error)

			// All concert events
			fetchConcertsEvents().catch(console.error)

			setIsEventsAlreadyFetched(true)
		}
	}, [fetchTrendemousEvents, fetchConcertsEvents])


	return (
		<>
			<Header />
			<Container css={{ d: 'flex', flexWrap: 'nowrap', height: '200' }}>
				<Spacer x={4} />
				<Caroussel />
				<Spacer x={4} />
			</Container>
			<Spacer y={2} />
			<Grid.Container
				justify="flex-start"
				alignItems="baseline"
				gap={2}>
				<Spacer x={1} />
				<Grid>
					<Text h3>Top évenements</Text>
				</Grid>
				<Grid>
					<Text
						size={12}
						weight="bold"
						transform="uppercase"
						color="$gray800">
						Voir plus
					</Text>
				</Grid>
			</Grid.Container>
			<EventContainer events={trendemousEvents} />
			<Spacer y={1} />
			<Divider />
			<Grid.Container
				justify="flex-start"
				alignItems="baseline"
				gap={2}>
				<Spacer x={1} />
				<Grid>
					<Text h3>Concerts</Text>
				</Grid>
				<Grid>
					<Text
						size={12}
						weight="bold"
						transform="uppercase"
						color="$gray800">
						Voir plus
					</Text>
				</Grid>
			</Grid.Container>
			<EventContainer events={concertEvents} />
			<Spacer y={1} />
			<Divider />
			<Grid.Container
				justify="flex-start"
				alignItems="baseline"
				gap={2}>
				<Spacer x={1} />
				<Grid>
					<Text h3>Test</Text>
				</Grid>
				<Grid>
					<Text
						size={12}
						weight="bold"
						transform="uppercase"
						color="$gray800">
						Voir plus
					</Text>
				</Grid>
			</Grid.Container>
			<EventContainer events={mockedEvents} />
			<Spacer y={2} />

			<Footer />
		</>
	)
}

export default Home
