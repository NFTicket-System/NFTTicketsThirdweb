import { Card, Col, Container, Link, Row, Spacer, Text } from '@nextui-org/react'
import Logo from '../icons/Logo'
import Git from '../icons/Git'

const Footer = () => {
    return (
        <Container xl>
            <Spacer y={3}/>
            <Card css={ { $$cardColor: '$colors$yellow600' } }>
                <Card.Body>
                        <Row>
                            <Col>
                                <Link href='https://github.com/NFTicket-System/NFTTicketsThirdweb'>
                                    <Git
                                        width={40}
                                        height={40}
                                        color='black'/>
                                        <Spacer x={0.2}/>
                                </Link>
                                <Text
                                    color={'black'}
                                    size={14}>
                                    Copyright © 2022-2023 NFTickets corp.
                                </Text>
                            </Col>
                            <Col span={1}>
                                <Logo
                                    width={80}
                                    height={80}
                                    color='black'
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
