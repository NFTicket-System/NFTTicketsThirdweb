import React, { useState } from 'react';
import { Button, Grid, Input, Spacer } from '@nextui-org/react';
import DOMPurify from 'dompurify';

const NftDrop = () => {
    const [ name, setName ] = useState( "" );

    const handleSubmit = async (
            e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const formData = new URLSearchParams();
        formData.append( "name", name );

        fetch( "http://localhost:5000/create-drop", {
            body: formData.toString(),
            method: "post",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        } )


        /*        // 👇 encode the data to application/x-www-form-urlencoded type
                const formData = new URLSearchParams();
                formData.append( "name", name );
                // 👇 call backend endpoint using fetch API
                fetch( "/api/hello", {
                    body: formData.toString(),
                    method: "post",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                    },
                } ).then( async ( result ) => {
                    // 👇 modify the state to show the result
                    setResult( await result.json() );
                } );*/
    };

    return (
            <>
                <form onSubmit={ handleSubmit }>
                    <Grid.Container justify={ "center" } direction={ "column" }>
                        <Input size={ "lg" } clearable bordered labelPlaceholder="Name" name="name" value={ name }
                               onChange={ ( e ) => setName( DOMPurify.sanitize( e.target.value ) ) }/>
                        <Spacer y={ 2 }/>
                        {/*<Input
                                size={ "lg" } clearable bordered labelPlaceholder="Name" name="name" value={ name }
                                onChange={ ( e ) => setName( DOMPurify.sanitize( e.target.value ) ) }/>
                        <Spacer y={ 2 }/>
                        <Input
                                size={ "lg" }
                                clearable
                                bordered
                                labelPlaceholder="Name"
                                name="name"
                                value={ name }
                                onChange={ ( e ) => setName( DOMPurify.sanitize( e.target.value ) ) }/>
                        <Spacer y={ 2 }/>
                        <Input
                                size={ "lg" } clearable bordered labelPlaceholder="Name" name="name" value={ name }
                                onChange={ ( e ) => setName( DOMPurify.sanitize( e.target.value ) ) }/>
                        <Spacer y={ 1 }/>*/}
                        <Button type="submit">Submit</Button>
                    </Grid.Container>
                </form>
            </>
    );
}

export default NftDrop;
