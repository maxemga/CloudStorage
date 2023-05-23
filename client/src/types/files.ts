import { FileExtensions, FilesSource, Statuses } from 'src/enums'
import { BaseType } from './base'

export interface FileType extends BaseType {
  name: string
  access_link: string
  size: string
  path: string
  userId: string
  parentId: string
  parentName: string
  isDeleted: boolean
  child: string[]
  type: FileExtensions
}

export interface FileUpload extends File {
  id: number
  loaded: number
  path: undefined | string
  total: number
  status: Statuses
  error: string
  folder: string | null
}

export interface DeleteFiles {
  ids: string[]
}

export interface RenameFile {
  id: string
  name: string
}

export interface CreateFolderype {
  parentId: string | null
  name: string
}

export interface FileModel {
  icon: JSX.Element
}

export interface FileModelProps {
  [key: FileExtensions | string]: FileModel
}

export interface FileListType {
  [key: FilesSource | string]: {
    data: FileType[]
    status: Statuses
  }
}
