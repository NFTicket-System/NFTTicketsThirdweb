import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import DOMPurify from 'dompurify';

const NftDrop = () => {
    const [ name, setName ] = useState( "" );
    const [ result, setResult ] = useState<any>();

    const handleSubmit = async (
            e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        console.log( "CLICKED", name )


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
                    <Input size={ "lg" } clearable bordered labelPlaceholder="Name" name="name" value={ name }
                           onChange={ ( e ) => setName( DOMPurify.sanitize( e.target.value ) ) }/>
                    <Button type="submit">Submit</Button>
                </form>
                Result
                <pre>{ JSON.stringify( result, null, 4 ) }</pre>
            </>
    );
}

export default NftDrop;
