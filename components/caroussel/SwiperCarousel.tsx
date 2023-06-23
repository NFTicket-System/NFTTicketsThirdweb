import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styles from 'styles/carousel/SwiperCarousel.module.scss'
import { Autoplay, Navigation } from 'swiper'
import { type LightEvent } from '@/models/LightEvent'
import { Button, Card, Col, Row, Text } from '@nextui-org/react'
import React from 'react'
import router from 'next/router'

interface EventContainerProps {
	events: LightEvent[]
}

const SwiperCarousel = (props: EventContainerProps) => {
	return (
		<Swiper
			spaceBetween={10}
			slidesPerView={3}
			loop
			navigation
			autoplay={{ delay: 2000 }}
			modules={[Autoplay, Navigation]}
			className={styles.carousel}>
			{props.events.map((slide, index) => (
				<SwiperSlide
					className={styles.slide}
					key={index}>
					<Card
						isPressable
						variant={'flat'}
						css={{ w: '100%', h: '100%', boxShadow: 'unset' }}>
						<Card.Header css={{ position: 'absolute', zIndex: 2, top: 5 }}>
							<Col>
								<Text
									h2
									color="white">
									{slide.libelle}
								</Text>
							</Col>
						</Card.Header>
						<Card.Body css={{ p: 0 }}>
							<div className={styles.overlay} />
							<Card.Image
								src={slide.urlImage}
								objectFit="cover"
								width="100%"
								height="100%"
								alt="Relaxing app background"
							/>
						</Card.Body>
						<Card.Footer
							css={{
								position: 'absolute',
								bottom: 0,
								zIndex: 1,
							}}>
							<Row>
								<Col>
									<Row justify="flex-end">
										<Button
											onPress={() => {
												void router.push(`/category/${slide.id}`)
											}}
											flat
											auto
											rounded>
											<Text
												css={{ color: 'inherit' }}
												size={12}
												weight="bold"
												transform="uppercase">
												Participer
											</Text>
										</Button>
									</Row>
								</Col>
							</Row>
						</Card.Footer>
					</Card>
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default SwiperCarousel
