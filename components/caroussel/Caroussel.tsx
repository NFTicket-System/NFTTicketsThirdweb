import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { Text } from '@nextui-org/react'

const Caroussel = () => {
  return (
        <Carousel autoPlay={true} interval={6000} infiniteLoop={true} showThumbs={false} dynamicHeight={true}>
            <div>
                <img src="https://i.topi.to/nJc5NyMtsDYavhDmQzaDvq_6lEOdRd1PfYakt10j_D4=/1200x630/smart/filters:fill(white):format(jpeg):quality(70)/https%3A%2F%2Fmedia.topito.com%2Fwp-content%2Fuploads%2F2018%2F10%2FUNE_TOPITO_punclines-JCVD.jpg" alt={''}/>
                <Text h3>Legende 1</Text>
            </div>
            <div>
                <img src="https://i0.wp.com/www.kimonosport.com/wp-content/uploads/2018/08/historia-de-jean-claude-van-damme-1024x575.jpg" alt={''}/>
                <Text h3>Legende 2</Text>
            </div>
            <div>
                <img src="https://www.neozone.org/blog/wp-content/uploads/2020/11/jcvd-prediction-streaming-780x470.jpg" alt={''}/>
                <Text h3>Legende 3</Text>
            </div>
        </Carousel>
  )
}

export default Caroussel
