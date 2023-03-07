// pages/_document.js

import React from 'react'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { CssBaseline, Spacer } from '@nextui-org/react'
import NavBar from '../components/navbar/navbar';

class MyDocument extends Document {
    static async getInitialProps( ctx: DocumentContext ) {
        const initialProps = await Document.getInitialProps( ctx )
        return {
            ...initialProps,
            styles: React.Children.toArray( [ initialProps.styles ] ),
        }
    }

    render() {
        return (
                <Html lang="fr">
                    <Head>{ CssBaseline.flush() }</Head>
                    <body>
                    <NavBar></NavBar>
                    <Spacer y={ 3 }/>
                    <Main/>
                    <NextScript/>
                    </body>
                </Html>
        )
    }
}

export default MyDocument
