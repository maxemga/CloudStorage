import { ReactNode } from 'react'
import { Themes } from 'src/enums'
import { ThemeProvider } from 'styled-components'
import { DarkTheme, LightTheme } from './themes'

interface Props {
  children: ReactNode
}

export const ThemesProvider = ({ children }: Props) => {
  const theme = Themes.LIGHT

  const themes = {
    [Themes.LIGHT]: LightTheme,
    [Themes.DARK]: DarkTheme,
  }

  return <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
}
