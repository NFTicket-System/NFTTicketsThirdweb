import React, { useState } from 'react';
import { Button, Grid, Input, Spacer } from '@nextui-org/react';
import { useForm } from 'react-hook-form';


const NftDrop = () => {
    const {register, handleSubmit, setError, formState: {isSubmitting, errors}} = useForm();

    async function saveFormData(data: object) {
        return await fetch("http://localhost:5000/create-drop", {
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"},
            method: "POST"
        })
    }

    const onSubmit = async (data: object) => {
        const response = await saveFormData(data)
        if (response.status === 400) {
            // Validation error
        } else if (response.ok) {
            // successful
        } else {
            // unknown error
        }
    }

    return (
            <>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <Grid.Container justify={ "center" } direction={ "column" }>
                        <Input size={ "lg" }
                               clearable bordered labelPlaceholder="Name"
                               {...register("name", {required: true})}
                               />
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
                        <Button type="submit">{isSubmitting ? 'Loading' : "Submit"}</Button>
                    </Grid.Container>
                </form>
            </>
    );
}

export default NftDrop;
