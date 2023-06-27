import React, { useState, useEffect } from 'react'
import { Grid, Text } from '@nextui-org/react'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { type LightEvent } from '@/models/LightEvent'
import axios from 'axios'
import { useRouter } from 'next/router'
import EventSeeMoreContainer from '@/components/container/EventSeeMoreContainer'

const CategoryPage = () => {
	const router = useRouter()
	const [eventsCategorie, setEventsCategorie] = useState<LightEvent[]>([])

	const fetchEvents = async (libelle: string) => {
		let url = `${process.env.NEXT_PUBLIC_API_HOSTNAME ?? ''}/api/events/all/light/byCat/${libelle}`
		if (libelle === 'trendemous')
			url = `${process.env.NEXT_PUBLIC_API_HOSTNAME ?? ''}/api/events/all/light/${libelle}`
		await axios.get(url).then((response) => {
			const result: LightEvent[] = []
			response.data.map((item: LightEvent) => result.push(item))
			setEventsCategorie(result)
		})
	}
	useEffect(() => {
		if (!router.query.events) {
			if (!router.query.catLibelle) {
				return
			}
			fetchEvents(router.query.catLibelle.toString()).catch(console.error)
			return
		}
		const parsedEvents = JSON.parse(router.query.events.toString())
		setEventsCategorie(parsedEvents)
	}, [router.query])

	return (
		<>
			<Header events={[]} />

			<Grid.Container direction="column">
                <Grid>
                    <Text
                    h2
                    css={{marginLeft: '1%'}}>
                        {router.query.catLibelle}
                    </Text>
                </Grid>
                <Grid>
                    <EventSeeMoreContainer events={eventsCategorie}/>
                </Grid>
            </Grid.Container>

			<Footer />
		</>
	)
}

export default CategoryPage
