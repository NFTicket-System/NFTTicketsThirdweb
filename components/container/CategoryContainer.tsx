import {LightEvent} from "../../models/LightEvent";
import {Grid, Link, Spacer, Text} from "@nextui-org/react";
import EventContainer from "./EventContainer";
import React from "react";
import router from "next/router";

interface CategoryContainerProps {
    events: LightEvent[],
    title: string,
    libelle: string
}

const CategoryContainer: React.FC<CategoryContainerProps> = (props: CategoryContainerProps) => {
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
                            {/* <Link
                                    underline
                                    color="secondary"
                                    onClick={() => {
                                        router.push(`/category/${props.libelle}`)
                                    }}>
                                Voir plus
                            </Link> */}
                                <Link
                                    underline
                                    color="secondary"
                                    onClick={() => {
                                        // router.push(`/category/${props.libelle}`)
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
                <EventContainer events={props.events}/>
            </>
    );

}

export default CategoryContainer
