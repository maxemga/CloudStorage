import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as fs from 'fs'
import * as path from 'path'
import { where } from 'sequelize'
import { FilesSource } from 'src/common/enums/files'
import { User } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { CreateFileDto } from './dto/req/create-file.dto'
import { DeleteFileDto } from './dto/req/delete-file.dto'
import { RenameFileDto } from './dto/req/rename-file'
import { File } from './file.entity'
import { FilesRepository } from './files.repository'

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File) private fileEntity: typeof File,
    private fileRepository: FilesRepository,
    private userService: UserService,
  ) {}

  async folder(userId: string, fileDto: CreateFileDto) {
    const parentFolder = await this.fileRepository.getFolder(fileDto.parentId)

    if (!parentFolder) {
      const folderPath = fileDto.name

      await this.createFolderDisk(userId, FilesSource.FILES, folderPath)

      const file = await this.fileRepository.create({
        userId,
        name: fileDto.name,
        access_link: 'test',
        type: 'dir',
        size: 0,
        path: folderPath,
      })

      return file
    } else {
      const folderPath = `${parentFolder.path}/${fileDto.name}`

      await this.createFolderDisk(userId, FilesSource.FILES, folderPath)

      const file = await this.fileRepository.create({
        userId,
        name: fileDto.name,
        access_link: 'test',
        type: 'dir',
        size: 0,
        path: folderPath,
        parentId: parentFolder.id,
        parentName: parentFolder.name,
      })

      await parentFolder.update({ childs: [...parentFolder.childs, file.id] })

      return file
    }
  }

  async getFiles(userId: string, parentId: string = null, name = '') {
    const files = await this.fileRepository.getAll(userId, parentId, name)

    return files
  }

  async getDeletedFiles(userId: string) {
    const files = await this.fileRepository.getDeletedAll(userId)

    return files
  }

  async moveTrash(userId: string, fileDto: DeleteFileDto) {
    const user = await this.userService.getById(userId)
    const files = await this.fileRepository.getAllByIds(userId, fileDto.ids)

    await this.moveDisk(userId, files, FilesSource.FILES, FilesSource.TRASH)

    const size = files.reduce((acc, el) => acc + el.size, 0)

    await user.update({ usedStorage: user.usedStorage - size })

    const filesDeleted = await this.fileRepository.moveTrash(
      userId,
      files.map((el) => el.id),
    )

    return filesDeleted
  }

  async rename(userId: string, fileDto: RenameFileDto) {
    const file = await this.fileRepository.getFile(userId, fileDto.id)

    const type = file.name.split('.').pop()
    const newName = `${fileDto.name}.${type}`
    const path = file.path.replace(file.name, newName)

    this.renameDisk(userId, file.path, path)

    await file.update({ name: newName, path })
  }

  async upload(userId: string, fileDto: Express.Multer.File, parentId = null) {
    const parentFile = await this.fileRepository.getFolder(parentId)
    const user = await this.userService.getById(userId)

    const name = (fileDto.originalname = Buffer.from(
      fileDto.originalname,
      'latin1',
    ).toString('utf8'))
    const type = name.split('.').pop()
    const size = fileDto.size

    if (!parentFile) {
      await this.createFileDisk(userId, fileDto, FilesSource.FILES, name)

      const file = this.fileRepository.create({
        userId,
        name,
        access_link: 'test',
        type,
        size,
        path: name,
      })

      await user.update({ usedStorage: user.usedStorage + size })

      return file
    } else {
      const filePath = `${parentFile.path}/${name}`

      await this.createFileDisk(userId, fileDto, FilesSource.FILES, filePath)

      const file = await this.fileRepository.create({
        userId,
        name,
        access_link: 'test',
        type,
        size,
        path: filePath,
        parentId: parentFile.id,
        parentName: parentFile.name,
      })

      await user.update({ usedStorage: user.usedStorage + size })

      await parentFile.update({ childs: [...parentFile.childs, file.id] })

      return file
    }
  }

  async generateFoldersUsers(userId: string) {
    this.createFolderDisk(userId)
    this.createFolderDisk(userId, FilesSource.FILES)
    this.createFolderDisk(userId, FilesSource.TRASH)
  }

  private async createFileDisk(
    userId: string,
    file: Express.Multer.File,
    source: FilesSource | string = '',
    filePath = '',
  ) {
    const url = `${process.env.FILE_PATH}/${userId}/${source}/${filePath}`

    if (fs.existsSync(url)) {
      throw new HttpException('fileExists', HttpStatus.BAD_REQUEST)
    }

    fs.writeFileSync(url, file.buffer)
  }

  private async createFolderDisk(
    userId: string,
    source: FilesSource | string = '',
    filePath = '',
  ) {
    const url = `${process.env.FILE_PATH}/${userId}/${source}/${filePath}`

    if (fs.existsSync(url)) {
      throw new HttpException('fileExists', HttpStatus.BAD_REQUEST)
    }

    fs.mkdirSync(url, {
      recursive: true,
    })
  }

  private renameDisk(userId: string, path: string, newPath: string) {
    const url = `${process.env.FILE_PATH}/${userId}/${FilesSource.FILES}/${path}`
    const newUrl = `${process.env.FILE_PATH}/${userId}/${FilesSource.FILES}/${newPath}`

    fs.renameSync(url, newUrl)
  }

  private async moveDisk(
    userId: string,
    files: File[],
    source: FilesSource,
    newSource: FilesSource,
  ) {
    // for (let i = 0; i < files.length; i++) {
    //   const url = `${process.env.FILE_PATH}/${userId}/${source}/${files[i].path}`
    //   const newUrl = `${process.env.FILE_PATH}/${userId}/${newSource}/${files[i].path}`
    //   if (fs.existsSync(newUrl)) {
    //     const newName = this.incrementName(files[i])
    //     console.log(newName)
    //     fs.renameSync(
    //       url,
    //       `${process.env.FILE_PATH}/${userId}/${newSource}/${newName}`,
    //     )
    //   } else {
    //     fs.renameSync(url, newUrl)
    //   }
    // }
  }

  // private incrementName(file: File) {
  //   if (file.type === 'dir') {
  //     // return path.resolve(file.name, '(0)')
  //     return `${file.name} (8)`
  //   }
  // }
}
