import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from '../auth/auth.module'
import { User } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { File } from './file.entity'
import { FilesController } from './files.controller'
import { FilesRepository } from './files.repository'
import { FilesService } from './files.service'

@Module({
  imports: [
    SequelizeModule.forFeature([User, File]),
    forwardRef(() => AuthModule),
  ],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository, UserService],
  exports: [FilesService],
})
export class FilesModule {}
