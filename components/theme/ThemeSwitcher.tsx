import React from 'react'
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

const ThemeSwitcher = () => {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()

  return (
            <>
                <div style={ { cursor: 'pointer' } }
                     onClick={ (event) => {
                       event.preventDefault()
                       setTheme((isDark === true) ? 'light' : 'dark')
                     } }>
                    { (isDark === true)
                      ? (<MdLightMode/>)
                      : (<MdDarkMode/>)
                    }
                </div>
            </>
  )
}

export default ThemeSwitcher
