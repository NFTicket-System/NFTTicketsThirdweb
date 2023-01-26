import type { NextPage } from 'next'
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'
import '@/../styles/Home.module.scss'

const Home: NextPage = () => {
    const { setTheme } = useNextTheme()
    const { isDark, type } = useTheme()
    return (
            <>
                <div>
                    The current theme is: { type }
                    <Switch checked={ isDark } onChange={ ( e ) => setTheme( e.target.checked ? 'dark' : 'light' ) } />
                </div>
                <h1>HOME</h1>
                <p className='test'>test</p>
            </>

    )
}

export default Home
