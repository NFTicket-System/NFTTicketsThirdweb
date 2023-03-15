import React from 'react';
import { Grid } from '@nextui-org/react';
import NftDrop from '../components/form/nftDrop';
import Navbar from '../components/navbar/navbar';

const Createdrop = () => {
    return (
            <>
                <Navbar></Navbar>
                <Grid.Container justify={ 'center' }>
                    <NftDrop></NftDrop>
                </Grid.Container>
            </>
    );
};


export default Createdrop;
