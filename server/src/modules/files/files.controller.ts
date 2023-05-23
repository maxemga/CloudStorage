import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthUser } from 'src/decorators/auth-user.decorator'
import { AuthGuard } from 'src/guards/auth.guard'
import { UserDto } from '../user/dto/user.dto'
import { CreateFileDto } from './dto/req/create-file.dto'
import { DeleteFileDto } from './dto/req/delete-file.dto'
import { RenameFileDto } from './dto/req/rename-file'
import { FilesService } from './files.service'

@Controller('files')
export class FilesController {
  constructor(private fileService: FilesService) {}

  @UseGuards(AuthGuard)
  @Get()
  getFiles(
    @AuthUser() user: UserDto,
    @Query('parentId') parentId: string,
    @Query('name') name: string,
  ) {
    return this.fileService.getFiles(user.id, parentId, name)
  }

  @UseGuards(AuthGuard)
  @Get('deleted')
  getDeletedFiles(@AuthUser() user: UserDto) {
    return this.fileService.getDeletedFiles(user.id)
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@AuthUser() user: UserDto, @Body() fileDto: CreateFileDto) {
    return this.fileService.folder(user.id, fileDto)
  }

  @UseGuards(AuthGuard)
  @Delete()
  moveTrash(@AuthUser() user: UserDto, @Body() fileDto: DeleteFileDto) {
    return this.fileService.moveTrash(user.id, fileDto)
  }

  @UseGuards(AuthGuard)
  @Put()
  rename(@AuthUser() user: UserDto, @Body() fileDto: RenameFileDto) {
    return this.fileService.rename(user.id, fileDto)
  }

  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @AuthUser() user: UserDto,
    @UploadedFile() file: Express.Multer.File,
    @Query('parentId') parentId: string,
  ) {
    return this.fileService.upload(user.id, file, parentId)
  }
}
