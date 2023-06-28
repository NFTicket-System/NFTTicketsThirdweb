import React, { useEffect, useState } from 'react'
import { Card, Col, Grid, Spacer, Text } from '@nextui-org/react'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { type LightEvent } from '@/models/LightEvent'
import axios from 'axios'
import { useRouter } from 'next/router'
import EventSeeMoreContainer from '@/components/container/EventSeeMoreContainer'
import { getCategoryBackground } from '@/utils/tools'
import { EventTypeCategories } from '@/models/enum/createNFTInputs'

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
			<Header />

			<Grid.Container direction="column">
				<Grid css={{ margin: '1%' }}>
					<Text h2>
						{router.query.catLibelle !== 'trendemous'
							? router.query.catLibelle === EventTypeCategories.FOIRE
								? 'Foires & Salons'
								: router.query.catLibelle
							: 'Tendence'}
					</Text>
					<Card>
						<Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
							<Col></Col>
						</Card.Header>
						<Card.Image
							css={{
								borderRadius: '7px',
							}}
							src={getCategoryBackground(String(router.query.catLibelle))}
							objectFit="cover"
							width="100%"
							height={250}
							alt="Card image background"
						/>
					</Card>
				</Grid>
				<Grid css={{ margin: '1%' }}>
					<Text h2>Tous les évènements disponibles :</Text>
					<Spacer y={1} />
					<EventSeeMoreContainer events={eventsCategorie} />
				</Grid>
			</Grid.Container>

			<Footer />
		</>
	)
}

export default CategoryPage
