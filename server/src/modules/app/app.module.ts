import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from '../auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { User } from '../user/user.entity'
import { UserModule } from '../user/user.module'
import { VerifyUser } from '../auth/verify/verify.entity'
import { File } from '../files/file.entity'
import { FilesModule } from '../files/files.module'

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'cloud_storage',
      models: [File, User, VerifyUser],
      autoLoadModels: true,
    }),

    AuthModule,
    UserModule,
    FilesModule,
  ],
})
export class AppModule {}
