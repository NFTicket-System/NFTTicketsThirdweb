import type { NextPage } from 'next'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { Card, Col, Container, Divider, Spacer, Text } from '@nextui-org/react'
import { LightEvent } from '@/models/LightEvent'
import axios from 'axios'
import CategoryContainer from '../components/container/CategoryContainer'
import SwiperCarousel from '@/components/caroussel/SwiperCarousel'

const Home: NextPage = () => {
	const [events, setEvents] = useState<LightEvent[]>([])
	const [trendemousEvents, setTrendemousEvents] = useState<LightEvent[]>([])
	const [showEvents, setShowEvents] = useState<LightEvent[]>([])
	const [festivalEvents, setFestivalEvents] = useState<LightEvent[]>([])
	const [concertEvents, setConcertEvents] = useState<LightEvent[]>([])
	const [theatreEvents, setTheatreEvents] = useState<LightEvent[]>([])
	const [humorEvents, setHumorEvents] = useState<LightEvent[]>([])
	const [rockEvents, setRockEvents] = useState<LightEvent[]>([])
	const [popEvents, setPopEvents] = useState<LightEvent[]>([])
	const [isEventsAlreadyFetched, setIsEventsAlreadyFetched] = useState(false)

	const fetchAllEvents = useCallback(async () => {
		await axios.get(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/events/all/light').then((response) => {
			const result: LightEvent[] = []
			response.data.map((item: LightEvent) => result.push(item))
			fillEvents(result)
			setEvents(result)
		})
	}, [])

	const fetchTrendemousEvents = useCallback(async () => {
		await axios.get(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/events/all/light/trendemous').then((response) => {
			const result: LightEvent[] = []
			response.data.map((item: LightEvent) => result.push(item))
			fillEvents(result)
			setTrendemousEvents(result)
		})
	}, [])

	const fetchShowEvents = useCallback(async () => {
		let result: LightEvent[] = []
		await axios.get(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/events/all/light/byCat/Foire').then((response) => {
			response.data.map((item: LightEvent) => result.push(item))
		})
		await axios.get(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/events/all/light/byCat/Salon').then((response) => {
			response.data.map((item: LightEvent) => result.push(item))
			result = supressDuplicateById(result)
			result.sort((a, b) => a.libelle.localeCompare(b.libelle))
			fillEvents(result)
			setShowEvents(result)
		})
	}, [])

	const fetchConcertsEvents = useCallback(async () => {
		await axios
			.get(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/events/all/light/byCat/Concert')
			.then((response) => {
				console.log()
				const result: LightEvent[] = []
				response.data.map((item: LightEvent) => result.push(item))
				fillEvents(result)
				setConcertEvents(result)
			})
	}, [])

	const fetchFestivalEvents = useCallback(async () => {
		await axios
			.get(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/events/all/light/byCat/Festival')
			.then((response) => {
				const result: LightEvent[] = []
				response.data.map((item: LightEvent) => result.push(item))
				fillEvents(result)
				setFestivalEvents(result)
			})
	}, [])

	const fetchTheatreEvents = useCallback(async () => {
		await axios
			.get(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/events/all/light/byCat/Theatre')
			.then((response) => {
				const result: LightEvent[] = []
				response.data.map((item: LightEvent) => result.push(item))
				fillEvents(result)
				setTheatreEvents(result)
			})
	}, [])

	const fetchHumorEvents = useCallback(async () => {
		await axios
			.get(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/events/all/light/byCat/Humour')
			.then((response) => {
				const result: LightEvent[] = []
				response.data.map((item: LightEvent) => result.push(item))
				fillEvents(result)
				setHumorEvents(result)
			})
	}, [])

	const fetchRockEvents = useCallback(async () => {
		await axios.get(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/events/all/light/byCat/Rock').then((response) => {
			console.log()
			const result: LightEvent[] = []
			response.data.map((item: LightEvent) => result.push(item))
			fillEvents(result)
			setRockEvents(result)
		})
	}, [])

	const fetchPopEvents = useCallback(async () => {
		await axios.get(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/events/all/light/byCat/Pop').then((response) => {
			console.log()
			const result: LightEvent[] = []
			response.data.map((item: LightEvent) => result.push(item))
			fillEvents(result)
			setPopEvents(result)
		})
	}, [])

	useEffect(() => {
		if (!isEventsAlreadyFetched) {
			// All events
			fetchAllEvents().catch(console.error)

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

			// All rock events
			fetchRockEvents().catch(console.error)

			// All pop events
			fetchPopEvents().catch(console.error)

			setIsEventsAlreadyFetched(true)
		}
	}, [
		fetchAllEvents,
		fetchTrendemousEvents,
		fetchShowEvents,
		fetchFestivalEvents,
		fetchConcertsEvents,
		fetchTheatreEvents,
		fetchHumorEvents,
		fetchRockEvents,
		fetchPopEvents,
	])

	const fillEvents = (events: LightEvent[]) => {
		const initialEventsLength = events.length
		for (let index = 0; index < 5 - initialEventsLength; index++) {
			events.push(new LightEvent(-1, '', ''))
		}
	}

	const supressDuplicateById = (events: LightEvent[]): LightEvent[] => {
		const ids = new Set<number>()
		const results: LightEvent[] = []

		for (const event of events) {
			if (!ids.has(event.id)) {
				ids.add(event.id)
				results.push(event)
			}
		}

		return results
	}

	return (
		<>
			<Header />
			<Spacer x={4} />
			{/* CAROUSEL */}
			{trendemousEvents.length > 0 ? (
				<Container>
					<Card>
						<Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
							<Col>
								<Text
									h2
									color="white">
									Évènements du moment
								</Text>
							</Col>
						</Card.Header>
						<Card.Image
							css={{
								borderRadius: '7px',
							}}
							src="https://images.unsplash.com/photo-1618176581836-9dcf475e2b4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
							objectFit="cover"
							width="100%"
							height={150}
							alt="Card image background"
						/>
					</Card>
					<Spacer y={0.5} />
					<SwiperCarousel events={trendemousEvents} />
				</Container>
			) : (
				<></>
			)}
			{/* CAROUSEL */}
			<Spacer y={4} />
			{/* concerts */}
			<CategoryContainer
				events={concertEvents}
				title={'Concerts'}
				libelle={'Concert'}
			/>
			<Spacer y={1} />
			<Divider />

			{/* Foire et salon */}
			<CategoryContainer
				events={showEvents}
				title={'Foires & Salons'}
				libelle={'Foire&Salon'}
			/>
			<Spacer y={1} />
			<Divider />

			{/* Festival */}
			<CategoryContainer
				events={festivalEvents}
				title={'Festivals'}
				libelle={'Festival'}
			/>
			<Spacer y={1} />
			<Divider />

			{/* Theatre */}
			<CategoryContainer
				events={theatreEvents}
				title={'Théâtres'}
				libelle={'Theatre'}
			/>
			<Spacer y={1} />
			<Divider />

			{/* Humour */}
			<CategoryContainer
				events={humorEvents}
				title={'Humours'}
				libelle={'Humour'}
			/>
			{/* Rock */}
			<CategoryContainer
				events={rockEvents}
				title={'Rock'}
				libelle={'Rock'}
			/>
			{/* Pop */}
			<CategoryContainer
				events={popEvents}
				title={'Pop'}
				libelle={'Pop'}
			/>
			<Spacer y={1} />
			<Footer />
		</>
	)
}

export default Home
