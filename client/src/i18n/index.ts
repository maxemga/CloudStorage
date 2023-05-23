import i18next from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { en } from './locales/en'
import { ru } from './locales/ru'

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    returnNull: false,
    lng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en,
      ru,
    },
  })

export default i18next
