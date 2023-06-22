import { Card, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'

interface TicketCardProps {
    id: string
    contractAddress: string
    name: string
    image: string
}

const TicketCard: React.FC<TicketCardProps> = (props: TicketCardProps) => {
    const router = useRouter()
    return (
        <Card
            isPressable
			isHoverable
			variant="bordered"
			onClick={() => {
				router.push(`/nft/${props.contractAddress}/${props.id}`)
			}}
            css={{ minHeight: '200px', minWidth: '200px', maxHeight: '200px', maxWidth: '200px'}}
            >
                <Card.Image 
                    src={props.image}
                    height='160px'
	                width='100%'
                    objectFit='cover'
                />
                <Card.Divider />
                <Card.Footer>
                    <Text>{props.name}</Text>
                </Card.Footer>
        </Card>
    )
}

export default TicketCard