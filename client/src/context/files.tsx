import { noop } from 'lodash'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'
import { FileType } from 'src/types'

interface Props {
  children: ReactNode
}

interface Values {
  selectedFiles: FileType[]
  setSelectedFiles: Dispatch<SetStateAction<never[]>>
  onAdd: (el: HTMLElement) => void
  onRemove: (el: HTMLElement) => void
}

const injtialValues: Values = {
  selectedFiles: [],
  setSelectedFiles: noop,
  onAdd: noop,
  onRemove: noop,
}

const FilesContext = createContext(injtialValues)

export const FilesProvider = ({ children }: Props) => {
  const [selectedFiles, setSelectedFiles] = useState([])

  const onAdd = (el: HTMLElement) => {
    setSelectedFiles((prev) => [
      ...prev,
      JSON.parse(el.dataset['file'] ?? '') as never,
    ])
  }

  const onRemove = (el: HTMLElement | undefined = undefined) => {
    if (el === undefined) setSelectedFiles([])

    setSelectedFiles((prev) =>
      prev.filter(
        (file: FileType) =>
          file.id !== JSON.parse(el?.dataset['file'] ?? '').id,
      ),
    )
  }

  const value = useMemo(
    () => ({
      selectedFiles,
      setSelectedFiles,
      onAdd,
      onRemove,
    }),
    [selectedFiles],
  )

  return <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
}

export const useFiles = () => useContext(FilesContext)
