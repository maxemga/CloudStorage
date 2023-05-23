import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserCreateDto } from '../user/dto/req/user-create.dto'
import { UserService } from '../user/user.service'
import { User } from '../user/user.entity'
import { LoginDto } from './dto/req/login.dto'
import { VerifyEnum } from 'src/common/enums/verification-enum'
import { generateCode } from 'src/utils/genereate-code'
import { MailerService } from '@nestjs-modules/mailer'
import { RegCodeDto } from './dto/req/reg-code.dto'
import { InjectModel } from '@nestjs/sequelize'
import { VerifyUser } from './verify/verify.entity'
import { UserDto } from '../user/dto/user.dto'
import { PassForgotDto } from './dto/req/pass-forgot.dto'
import { PassForgoVerifytDto } from './dto/req/pass-forgot-verify.dto'
import { getVerifyTypes } from 'src/constans/veriyfy-object'
import { PassForgotResetDto } from './dto/req/pass-forgot-reset.dto'
import * as bcrypt from 'bcryptjs'
import { AuthGoogleCheckDto } from './dto/req/auth-google-check'
import { FilesService } from '../files/files.service'
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private fileService: FilesService,
    @InjectModel(VerifyUser) private verifyEntity: typeof VerifyUser,
  ) {}

  async authMe(userDto: UserDto) {
    const user = await this.userService.getByEmail(userDto.email)

    return user
  }

  async checkAuthGoogle(authDto: AuthGoogleCheckDto) {
    const user = await this.userService.getByEmail(authDto.email)

    if (user) {
      return this.getAuthorization(user)
    }

    return {
      email: authDto.email,
      firstName: authDto.given_name,
      lastName: authDto.family_name,
    }
  }

  async authGoogle(authDto: UserCreateDto) {
    const candidateLogin = await this.userService.getByLoginNonVerify(
      authDto.login,
    )
    const candidateEmail = await this.userService.getByEmailNonVerify(
      authDto.email,
    )

    if (candidateLogin && candidateLogin.isVerify) {
      throw new HttpException('userExistsLogin', HttpStatus.BAD_REQUEST)
    }

    if (candidateEmail && !candidateEmail.isVerify) {
      const user = await candidateEmail.update({
        login: authDto.login,
        firstName: authDto.firstName ?? null,
        lastName: authDto.lastName ?? null,
        password: null,
        isVerify: true,
      })

      await this.fileService.generateFoldersUsers(user.id)

      return this.getAuthorization(user)
    }

    const user = await this.userService.create({
      ...authDto,
      isVerify: true,
    })

    await this.fileService.generateFoldersUsers(user.id)

    return this.getAuthorization(user)
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto)

    return this.getAuthorization(user)
  }

  async register(dto: UserCreateDto) {
    const candidateEmail = await this.userService.getByEmailNonVerify(dto.email)
    const candidateLogin = await this.userService.getByLoginNonVerify(dto.login)

    if (candidateEmail && candidateEmail.isVerify) {
      throw new HttpException('userExistsEmail', HttpStatus.BAD_REQUEST)
    }

    if (candidateLogin && candidateLogin.isVerify) {
      throw new HttpException('userExistsLogin', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(dto.password, 4)

    if (!candidateEmail && !candidateLogin) {
      await this.userService.create({
        ...dto,
        password: hashPassword,
      })
    } else {
      await this.userService.update({ ...dto, password: hashPassword })
    }

    this.createRequestVerify(dto.email, VerifyEnum.VerifyRegister)

    return {
      message: 'Код отправлен на почту',
    }
  }

  async registerCode(dto: RegCodeDto) {
    const user = await this.userService.getByEmailNonVerify(dto.email)
    const userVerify = await this.verifyCode(dto, VerifyEnum.VerifyRegister)

    user.isVerify = true
    await user.save()
    await userVerify.destroy()

    await this.fileService.generateFoldersUsers(user.id)

    return this.getAuthorization(user)
  }

  async passwordForgot(dto: PassForgotDto) {
    const user = await this.userService.getByEmail(dto.email)

    if (!user) {
      throw new HttpException(
        { message: 'userNotFound' },
        HttpStatus.BAD_REQUEST,
      )
    }

    this.createRequestVerify(dto.email, VerifyEnum.VerifyPassword)
  }

  async passwordVerify(dto: PassForgoVerifytDto) {
    await this.verifyCode(dto, VerifyEnum.VerifyPassword)
    return
  }

  async passwordReset(dto: PassForgotResetDto) {
    const user = await this.userService.changePassword(dto.email, dto.password)

    return this.getAuthorization(user)
  }

  private async getAuthorization(user: User) {
    const token = (await this.generateToken(user)).token

    console.log(token)

    return {
      token,
      user,
    }
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id }

    return {
      token: this.jwtService.sign(payload),
    }
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.getByEmail(dto.email)
    const errorMessage = 'wrongData'

    if (!user) {
      throw new UnauthorizedException({
        message: errorMessage,
      })
    }

    const passwordEquals = bcrypt.compareSync(dto.password, user.password)

    if (!passwordEquals) {
      throw new UnauthorizedException({
        message: errorMessage,
      })
    }

    return user
  }

  private async verifyCode(
    dto: RegCodeDto | PassForgoVerifytDto,
    type: VerifyEnum,
  ) {
    const userVerify = await this.verifyEntity.findOne({
      where: {
        userEmail: dto.email,
        code: dto.code,
        type: type,
      },
    })

    if (!userVerify) {
      throw new HttpException('incorrectCode', HttpStatus.BAD_REQUEST)
    }

    return userVerify
  }

  private async createRequestVerify(userEmail: string, type: VerifyEnum) {
    const userVerify = await this.verifyEntity.findOne({
      where: { userEmail, type },
    })
    const code = generateCode()

    if (!userVerify) {
      await this.verifyEntity.create({
        userEmail,
        type,
        code,
      })
    } else {
      await userVerify.update({ code })
    }

    console.log(code)

    // this.sendEmail(userEmail, getVerifyTypes(code)[type])
  }

  private async sendEmail(email: string, obj: any) {
    this.mailerService.sendMail({
      from: process.env.MAILER_USER,
      to: email,
      subject: obj.subject,
      html: obj.html,
    })
  }
}
