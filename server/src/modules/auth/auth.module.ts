import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../user/user.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { SequelizeModule } from '@nestjs/sequelize'
import { VerifyUser } from './verify/verify.entity'
import { FilesModule } from '../files/files.module'

@Module({
  imports: [
    SequelizeModule.forFeature([VerifyUser]),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST || 'smtp.gmail.com',
        port: Number(process.env.MAILER_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.MAILER_USER || 'maxemga22@gmail.com',
          pass: process.env.MAILER_PASS || 'kngyaibvktydzmzp',
        },
      },
    }),
    UserModule,
    FilesModule,
    JwtModule.register({
      secret: 'f4906277c9c7a8f7127be17a6ca350715cad6234',
      signOptions: {
        expiresIn: '24h',
        audience:
          '953290902941-irq9dt3dqgahhmsvhnqda77h13n2tjeg.apps.googleusercontent.com',
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
