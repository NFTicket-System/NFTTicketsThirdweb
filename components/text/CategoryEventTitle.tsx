import {Grid, Link, Spacer, Text} from "@nextui-org/react";
import router from "next/router";
import React from "react";
import {LightEvent} from "@/models/LightEvent";

interface CategoryEventTitleProps {
    events: LightEvent[],
    title: string,
    libelle: string
}

const CategoryEventTitle: React.FC<CategoryEventTitleProps> = (props: CategoryEventTitleProps) => {
    return (
            <>
                <Grid.Container
                        justify="flex-start"
                        alignItems="baseline"
                        gap={2}>
                    <Spacer x={1}/>
                    <Grid>
                        <Text
                                h3
                                css={{wordSpacing: '4px'}}>
                            {props.title}
                        </Text>
                    </Grid>
                    <Grid>
                        <Text
                                size={12}
                                weight="bold"
                                transform="uppercase">
                            <Link
                                    underline
                                    color="secondary"
                                    onClick={() => {
                                        void router.push({
                                            pathname: `/category/${props.libelle}`,
                                            query: {events: JSON.stringify(props.events)}
                                        })
                                    }}>
                                Voir plus
                            </Link>
                        </Text>
                    </Grid>
                </Grid.Container>
            </>
    )
}

export default CategoryEventTitle
