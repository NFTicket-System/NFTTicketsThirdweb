import React from 'react';
import NftDrop from '../components/form/nftDrop';
import { Grid } from '@nextui-org/react';

const Createdrop = () => {
    return (
            <>
                <Grid.Container justify={ 'center' }>
                    <NftDrop></NftDrop>
                </Grid.Container>
            </>
    );
};


export default Createdrop;
