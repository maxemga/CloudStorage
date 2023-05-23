import { LanguagesEnum } from 'src/enums'

export interface LanguagesType {
  id: number
  title: string
  icon: JSX.Element
  value: LanguagesEnum
}

export interface LanguagesIterator {
  [key: string | LanguagesEnum]: LanguagesType
}
