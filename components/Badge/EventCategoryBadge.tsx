import {Category} from "@/models/Category";
import {Button} from "@nextui-org/react";
import router from "next/router";

interface EventCategoryBadgeProps {
    category: Category
}

const EventCategoryBadge: React.FC<EventCategoryBadgeProps> = (props: EventCategoryBadgeProps) => {
    return (
            <Button size="sm"
                    bordered
                    auto
                    rounded
                    css={{ color: props.category.color, borderColor: props.category.color}}
                    onClick={() => {
                        router.push(`/category/${props.category.libelle}`)
                    }}>
                {props.category.libelle}
            </Button>
    )
}

export default EventCategoryBadge
