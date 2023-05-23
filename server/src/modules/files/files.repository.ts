import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { File } from './file.entity'

export class FilesRepository {
  constructor(@InjectModel(File) private fileEntity: typeof File) {}

  async create(data: Partial<File>) {
    return await this.fileEntity.create(data)
  }

  async getFile(userId: string, fileId: string) {
    return await this.fileEntity.findOne({
      where: {
        userId,
        id: fileId,
      },
    })
  }

  async getAll(userId: string, parentId: string, name: string) {
    return await this.fileEntity.findAll({
      where: {
        userId,
        parentId,
        isDeleted: false,
        name: { [Op.iLike]: `${name}%` },
      },
    })
  }

  async getAllByIds(userId: string, ids: string[], isDeleted = false) {
    return await this.fileEntity.findAll({
      where: {
        userId,
        isDeleted,
        id: ids,
      },
    })
  }

  async getDeletedAll(userId: string) {
    return await this.fileEntity.findAll({
      where: {
        userId,
        isDeleted: true,
      },
    })
  }

  async getFolder(id: string) {
    return await this.fileEntity.findOne({
      where: {
        id,
      },
    })
  }

  async moveTrash(userId: string, ids: string[]) {
    const files = await this.fileEntity.update(
      { isDeleted: true },
      {
        where: {
          id: ids,
          userId,
        },
        returning: true,
      },
    )

    return files[1]
  }
}
