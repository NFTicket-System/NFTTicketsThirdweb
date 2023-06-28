import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styles from 'styles/carousel/SwiperCarousel.module.scss'
import { Autoplay, Navigation } from 'swiper'
import { type LightEvent } from '@/models/LightEvent'
import { Card, Col, Text } from '@nextui-org/react'
import React from 'react'
import router from 'next/router'

interface EventContainerProps {
	events: LightEvent[]
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const swiperStyles = {
	'--swiper-navigation-color': '#fff',
	'--swiper-pagination-color': '#fff',
} as React.CSSProperties

const SwiperCarousel = (props: EventContainerProps) => {
	return (
		<Swiper
			style={swiperStyles}
			spaceBetween={10}
			slidesPerView={3}
			loop
			navigation
			autoplay={{ delay: 2000 }}
			modules={[Autoplay, Navigation]}
			className={styles.carousel}>
			{props.events.map((event, index) => (
				<SwiperSlide
					className={styles.slide}
					key={index}
					onClick={() => {
						void router.push(`/event/${event.id}`)
					}}>
					<Card
						isPressable
						isHoverable
						variant={'flat'}
						css={{ w: '100%', h: '100%', boxShadow: 'unset' }}>
						<Card.Header css={{ position: 'absolute', zIndex: 2, top: 5 }}>
							<Col>
								<Text
									h2
									color="white">
									{event.libelle}
								</Text>
							</Col>
						</Card.Header>
						<Card.Body css={{ p: 0 }}>
							<div className={styles.overlay} />
							<Card.Image
								showSkeleton
								src={event.urlImage}
								objectFit="cover"
								width="100%"
								height="100%"
								alt="Relaxing app background"
							/>
						</Card.Body>
					</Card>
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default SwiperCarousel
