import {Category} from "@/models/Category";
import {Button, Card, Container, Text} from "@nextui-org/react";

interface EventCategoryBadgeProps {
    category: Category
}

const EventCategoryBadge: React.FC<EventCategoryBadgeProps> = (props: EventCategoryBadgeProps) => {
    return (
            <Button size="sm" bordered auto rounded css={{ color: props.category.color, borderColor: props.category.color}}>
                {props.category.libelle}
            </Button>
    )
}

export default EventCategoryBadge
