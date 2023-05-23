import { DeleteIcon, FileIcon, RuIcon, UsIcon } from 'src/assets'
import { FilesSource, LanguagesEnum } from 'src/enums'
import { FilesNavigationType, LanguagesIterator } from 'src/types'

export const languages: LanguagesIterator = {
  [LanguagesEnum.RU]: {
    id: 1,
    title: 'Russia',
    icon: <RuIcon />,
    value: LanguagesEnum.RU,
  },
  [LanguagesEnum.EN]: {
    id: 2,
    title: 'English',
    icon: <UsIcon />,
    value: LanguagesEnum.EN,
  },
}

export const filesSources: FilesNavigationType = {
  [FilesSource.FILES]: {
    id: 0,
    title: 'Files',
    icon: FileIcon,
  },
  [FilesSource.TRASH]: {
    id: 1,
    title: 'Trash',
    icon: DeleteIcon,
  },
}

export const networkFailed = 'Network Error'
