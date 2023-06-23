import { Card, Col, Container, Link, Row, Spacer, Text } from '@nextui-org/react'
import Logo from '../icons/Logo'
import Git from '../icons/Git'

const Footer = () => {
    return (
        <Container fluid>
            <Spacer y={3}/>
            <Card css={ { $$cardColor: '$colors$yellow600' } }>
                <Card.Body>
                    <Row>
                        <Col span={10} css={{marginTop:'2%', marginLeft:'2%'}}>
                            <Link href='https://github.com/orgs/NFTicket-System/repositories'>
                                <Git
                                    width={20}
                                    height={20}
                                    color='white'/>
                                    <Spacer x={0.2}/>
                                <Text 
                                    color={'white'}
                                    size={16}>
                                    Notre Github
                                </Text>
                            </Link>
                            <Text 
                                color={'white'}
                                size={14}>
                                Copyright © 2022-2023 NFTickets corp.
                            </Text>
                        </Col>
                        <Col span={1}>
                            <Logo
                                width={100}
                                height={100}
                                color='white'
                                />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Spacer y={1}/>
        </Container>         
  )
}

export default Footer