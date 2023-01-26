import '@/../styles/globals.scss'
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme( {
    type: 'light',
} )

const darkTheme = createTheme( {
    type: 'dark',
} )

function MyApp( { Component, pageProps }: AppProps ) {
    return (
            <NextThemesProvider defaultTheme='system' attribute='class' value={ {
                light: lightTheme.className,
                dark: darkTheme.className,
            } }>
                {/*Make the NextUI component library available app-wild*/ }
                <NextUIProvider>
                    <Component { ...pageProps } />
                </NextUIProvider>
            </NextThemesProvider>
    )
}

export default MyApp
