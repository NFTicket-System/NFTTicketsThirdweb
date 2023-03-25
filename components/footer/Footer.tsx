import { Card, Container, Row, Text } from '@nextui-org/react'

const Footer = () => {
  return (
        <Container xl>
            <Card css={{ $$cardColor: '$colors$yellow600' }}>
                <Card.Body>
                    <Row justify="center" align="center">
                        <Text h6 size={15} color="white" css={{ m: 0 }}>
                        Un footer
                        </Text>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
  )
}

export default Footer
