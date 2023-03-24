import '@/../styles/globals.scss'
import type { AppProps } from 'next/app'
import { NextUIProvider, useSSR } from '@nextui-org/react'
import { ChainId } from '@thirdweb-dev/sdk'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { LightTheme } from '../styles/theme/lightTheme'
import { DarkTheme } from '../styles/theme/darkTheme'

function MyApp ({ Component, pageProps }: AppProps) {
  const { isBrowser } = useSSR()

  return (
    isBrowser && (
                    <ThirdwebProvider desiredChainId={ ChainId.Goerli }>
                        <NextThemesProvider defaultTheme='system' attribute='class' value={ {
                          light: LightTheme.className,
                          dark: DarkTheme.className
                        } }>
                            <NextUIProvider>
                                <Component { ...pageProps } />
                            </NextUIProvider>
                        </NextThemesProvider>
                    </ThirdwebProvider>
    )
  )
}

export default MyApp
