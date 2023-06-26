import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { Event } from '@/models/Event'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import router from 'next/router'
import TicketTypeContainer from '../../components/container/TicketTypeContainer'
import { Spacer } from '@nextui-org/react'
import EventDescriptionContainer from '../../components/container/EventDescriptionContainer'
import { type Category } from '@/models/Category'
import { type LightEvent } from '@/models/LightEvent'

const EventPage = () => {
	const { eventId } = router.query

	const [event, setEvent] = useState<Event>()
	const [eventCategories, setEventCategories] = useState<Category[]>([])
	const [ticketTypes, setTicketTypes] = useState<string[]>([])
	const [events, setEvents] = useState<LightEvent[]>([])
	const fetchEventAllInfos = async () => {
		console.log('categories - eventId')
		console.log(eventId)
		await axios.get(`http://localhost:8080/api/events/all/categoty/event/${eventId}`).then((response) => {
			const result: Category[] = []
			response.data.map((item: Category) => result.push(item))
			setEventCategories(result)
		})
	}

	const fetchAllEvents = useCallback(async () => {
		await axios.get('http://localhost:8080/api/events/all/light').then((response) => {
			const result: LightEvent[] = []
			response.data.map((item: LightEvent) => result.push(item))
			setEvents(result)
		})
	}, [])

	const fetchEventCategories = async () => {
		console.log('event - eventId')
		console.log(eventId)
		await axios.get(`http://localhost:8080/api/events/single/${eventId}`).then((response) => {
			const responseEvent: Event = new Event(response.data)
			setEvent(responseEvent)

			// get all the different types of ticket
			const responseTicketTypes: string[] = []
			responseEvent.tickets.forEach((it: { type: string }) => {
				if (!responseTicketTypes.includes(it.type)) responseTicketTypes.push(it.type)
			})
			setTicketTypes(responseTicketTypes)
		})
	}

	useEffect(() => {
		if (!eventId) {
			return
		}
		// All event infos
		fetchEventAllInfos().catch(console.error)

		// All categories of event
		fetchEventCategories().catch(console.error)

		// All events
		fetchAllEvents().catch(console.error)
	}, [eventId, fetchAllEvents])

	return (
		<>
			<Header events={events} />
			<EventDescriptionContainer
				event={event != null ? event : null}
				categories={eventCategories}
			/>
			<Spacer />
			<TicketTypeContainer
				tickets={event != null ? event.tickets : []}
				ticketTypes={ticketTypes}
			/>
			<Spacer y={2} />
			<Footer />
		</>
	)
}

export default EventPage
