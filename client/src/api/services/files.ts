import { ApiMethods } from 'src/enums'
import {
  CreateFolderype,
  DeleteFiles,
  FileType,
  FileUpload,
  RenameFile,
} from 'src/types'
import { BaseService } from './base'

export class FilesService extends BaseService {
  public static async getAll(id: string | null = null) {
    return await this.fetch<FileType[]>({
      url: ApiMethods.FILES,
      params: {
        parentId: id,
      },
    })
  }

  public static async getDeletedAll() {
    return await this.fetch<FileType[]>({
      url: ApiMethods.FILES_DELETED,
    })
  }

  public static async create(data: CreateFolderype) {
    return await this.fetch<FileType>({
      url: ApiMethods.FILES,
      method: 'POST',
      data,
    })
  }

  public static async delete(data: DeleteFiles) {
    return await this.fetch({
      url: ApiMethods.FILES,
      method: 'DELETE',
      data,
    })
  }

  public static async rename(data: RenameFile) {
    return await this.fetch({
      url: ApiMethods.FILES,
      method: 'PUT',
      data,
    })
  }

  public static async upload(
    data: FileUpload,
    id: string | null = null,
    onUpdateUploader: (value: FileUpload) => void,
  ) {
    return await this.fetch<FileType>({
      url: ApiMethods.UPLOAD,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        parentId: id,
      },
      data: {
        isJson: false,
        key: 'file',
        data,
      },

      onUploadProgress: (progressEvent: any) => {
        const totalLength = progressEvent.event.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader('content-length') ||
            progressEvent.target.getResponseHeader(
              'x-decompressed-content-length',
            )
        if (totalLength) {
          onUpdateUploader({
            ...data,
            loaded: progressEvent.loaded,
            total: totalLength,
          })
        }
      },
    })
  }
}
