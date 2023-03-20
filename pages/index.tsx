import type { NextPage } from 'next'
import '@/../styles/Home.module.scss'
import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Caroussel from '../components/caroussel/Caroussel';
import { Container, Spacer } from '@nextui-org/react';
import { LightEvent } from '../models/LightEvent';
import EventContainer from '../components/container/EventContainer';

const Home: NextPage = () => {

    const mockedEvent1 = new LightEvent(1, "https://i0.wp.com/www.kimonosport.com/wp-content/uploads/2018/08/historia-de-jean-claude-van-damme-1024x575.jpg", "JCVD numéro 1")
    const mockedEvent2 = new LightEvent(2, "https://i.topi.to/nJc5NyMtsDYavhDmQzaDvq_6lEOdRd1PfYakt10j_D4=/1200x630/smart/filters:fill(white):format(jpeg):quality(70)/https%3A%2F%2Fmedia.topito.com%2Fwp-content%2Fuploads%2F2018%2F10%2FUNE_TOPITO_punclines-JCVD.jpg", "JCVD numéro 2")
    const mockedEvent3 = new LightEvent(3, "https://www.neozone.org/blog/wp-content/uploads/2020/11/jcvd-prediction-streaming-780x470.jpg", "JCVD numéro 3")

    const mockedEvents = [mockedEvent1, mockedEvent2, mockedEvent3]

    return <>
        <Header/>
        <Container gap={0} css={{ d: 'flex', flexWrap: 'nowrap' }}>
            <Spacer x={4} />
            <Caroussel/>
            <Spacer x={4} />
        </Container>
        <EventContainer events={mockedEvents}/>
        <Spacer x={2} />

        <Footer/>
    </>
}

export default Home
