import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { noop } from 'lodash'
import { LanguagesEnum } from 'src/enums'
import i18next from 'i18next'

interface Props {
  children: ReactNode
}

interface Values {
  language: LanguagesEnum | string
  setLanguage: (value: LanguagesEnum) => void
  changeLanguage: (language: LanguagesEnum) => void
}

const injtialValues: Values = {
  language: LanguagesEnum.EN,
  setLanguage: noop,
  changeLanguage: noop,
}

const LanguagesContext = createContext(injtialValues)

export const LanguagesProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState<LanguagesEnum | string>(
    LanguagesEnum.EN,
  )

  const changeLanguage = (language: LanguagesEnum) => {
    localStorage.setItem('language', language)
    i18next.changeLanguage(language)
    setLanguage(language)
  }

  useEffect(() => {
    const language = localStorage.getItem('language') ?? LanguagesEnum.EN
    i18next.changeLanguage(language)
    setLanguage(language)
  }, [])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      changeLanguage,
    }),
    [language],
  )

  return (
    <LanguagesContext.Provider value={value}>
      {children}
    </LanguagesContext.Provider>
  )
}

export const useLanguages = () => useContext(LanguagesContext)
