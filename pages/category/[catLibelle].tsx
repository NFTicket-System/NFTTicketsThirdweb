import React, { useEffect, useState } from 'react'
import { Badge, Card, Grid, Spacer, Text } from '@nextui-org/react'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { type LightEvent } from '@/models/LightEvent'
import axios from 'axios'
import { useRouter } from 'next/router'
import EventSeeMoreContainer from '@/components/container/EventSeeMoreContainer'
import { Category } from '@/models/Category'

const CategoryPage = () => {
	const router = useRouter()
	const [eventsCategory, setEventsCategory] = useState<LightEvent[]>([])
	const [category, setCategory] = useState<Category>()

	const fetchEvents = async (libelle: string) => {
		let url = `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/events/all/light/byCat/${libelle}`
		if (libelle === 'trendemous') url = `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/events/all/light/${libelle}`
		await axios.get(url).then((response) => {
			const result: LightEvent[] = []
			response.data.map((item: LightEvent) => result.push(item))
			setEventsCategory(result)
		})
	}

	const fetchCategory = async (libelle: string) => {
		const url = `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/events/single/category/${libelle}`
		await axios.get(url).then((response) => {
			const result: Category = new Category(response.data[0])
			setCategory(result)
		})
	}

	useEffect(() => {
		if (!router.query.events) {
			if (!router.query.catLibelle) {
				return
			}
			fetchEvents(router.query.catLibelle.toString()).catch(console.error)
			fetchCategory(router.query.catLibelle.toString()).catch(console.error)
			return
		}
		const parsedEvents = JSON.parse(router.query.events.toString())
		setEventsCategory(parsedEvents)
		fetchCategory(router.query.catLibelle.toString()).catch(console.error)
	}, [router.query])

	return (
		<>
			<Header />

			<Grid.Container direction="column">
				<Grid css={{ margin: '1%' }}>
					<Card>
						<Card.Body css={{ position: 'absolute', zIndex: 1, top: 5 }}>
							<Badge
								enableShadow
								disableOutline
								size="xl">
								{category != null ? router.query.catLibelle : 'Tendance'}
							</Badge>
						</Card.Body>
						<Card.Image
							css={{
								borderRadius: '7px',
							}}
							src={
								category != null
									? category.urlImage
									: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
							}
							objectFit="cover"
							width="100%"
							height={250}
							alt="Image du thème de la catégorie"
						/>
					</Card>
				</Grid>
				<Grid css={{ margin: '1%' }}>
					<Text h2>Tous les évènements disponibles :</Text>
					<Spacer y={1} />
					<EventSeeMoreContainer events={eventsCategory} />
				</Grid>
			</Grid.Container>

			<Footer />
		</>
	)
}

export default CategoryPage
