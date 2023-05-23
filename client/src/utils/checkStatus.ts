import { Statuses } from 'src/enums'
import { FileUpload } from 'src/types'

export const checkStatus = (files: FileUpload[]) => {
  for (let i = 0; i < files.length; i++) {
    if (files[i].status === Statuses.ERROR) {
      return Statuses.ERROR
    } else if (files[i].status === Statuses.LOADING) {
      return Statuses.LOADING
    }
  }

  return Statuses.SUCCESS
}
