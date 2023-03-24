import React from 'react'
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'
import { GiNightSleep } from '@react-icons/all-files/gi/GiNightSleep'
import { IoIosGlasses } from '@react-icons/all-files/io/IoIosGlasses'

const ThemeSwitcher = () => {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()

  return (
            <>
                <Switch checked={ isDark }
                        color="warning"
                        bordered
                        iconOn={<GiNightSleep />}
                        iconOff={<IoIosGlasses />}
                        onChange={ (e) => { setTheme(e.target.checked ? 'dark' : 'light') } }/>
            </>
  )
}

export default ThemeSwitcher
