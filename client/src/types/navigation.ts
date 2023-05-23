import { ReactNode } from 'react'
import { FilesSource, RoutesPaths } from 'src/enums'

export interface RouteType {
  path: RoutesPaths
  element: JSX.Element
}

export interface FilesNavigationType {
  [key: string | FilesSource]: {
    id: number
    title: string
    icon: any
  }
}
