import '@/../styles/globals.scss'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { ChainId } from '@thirdweb-dev/sdk'
import { ThirdwebProvider } from '@thirdweb-dev/react'

/*// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme( {
    type: 'light',
} )

const darkTheme = createTheme( {
    type: 'dark',
} )*/

function MyApp( { Component, pageProps }: AppProps ) {
    return (
            <ThirdwebProvider desiredChainId={ ChainId.Goerli }>
                {/*
                <NextThemesProvider defaultTheme='system' attribute='class' value={ {
                    light: lightTheme.className,
                    dark: darkTheme.className,
                } }>
*/ }
                {/*Make the NextUI component library available app-wild*/ }
                <NextUIProvider>
                    <Component { ...pageProps } />
                </NextUIProvider>
                {/*                </NextThemesProvider>*/ }
            </ThirdwebProvider>
    )
}

export default MyApp
