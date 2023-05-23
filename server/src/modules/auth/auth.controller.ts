import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'
import { ApiTags } from '@nestjs/swagger'
import { UserCreateDto } from '../user/dto/req/user-create.dto'
import { LoginResponceDto } from './dto/res/login-responce.dto'
import { LoginDto } from './dto/req/login.dto'
import { RegResponceDto } from './dto/res/reg-responce.dto'
import { RegCodeDto } from './dto/req/reg-code.dto'
import { UserDto } from '../user/dto/user.dto'
import { AuthUser } from 'src/decorators/auth-user.decorator'
import { AuthGuard } from 'src/guards/auth.guard'
import { PassForgotDto } from './dto/req/pass-forgot.dto'
import { PassForgoVerifytDto } from './dto/req/pass-forgot-verify.dto'
import { PassForgotResetDto } from './dto/req/pass-forgot-reset.dto'
import { AuthGoogleCheckDto } from './dto/req/auth-google-check'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/me')
  @ApiOperation({
    summary: 'Получить информациб об авторизованном пользователе',
  })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiBadRequestResponse({ status: 400 })
  @UseGuards(AuthGuard)
  authMe(@AuthUser() user: UserDto) {
    return this.authService.authMe(user)
  }

  @Post('/login')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: LoginResponceDto })
  @ApiBadRequestResponse({ status: 400 })
  login(@Body() authDto: LoginDto) {
    return this.authService.login(authDto)
  }

  @Post('/register')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200, type: RegResponceDto })
  @ApiBadRequestResponse({ status: 400 })
  register(@Body() authDto: UserCreateDto) {
    return this.authService.register(authDto)
  }

  @Post('/google-check')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: LoginResponceDto })
  @ApiBadRequestResponse({ status: 400 })
  checkAuthGoogle(@Body() authDto: AuthGoogleCheckDto) {
    return this.authService.checkAuthGoogle(authDto)
  }

  @Post('/google-login')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: LoginResponceDto })
  @ApiBadRequestResponse({ status: 400 })
  authGoogle(@Body() authDto: UserCreateDto) {
    return this.authService.authGoogle(authDto)
  }

  @Post('/register-code')
  @ApiOperation({ summary: 'Подтверждение кода регистрации аккаунта' })
  @ApiResponse({ status: 200, type: LoginResponceDto })
  @ApiBadRequestResponse({ status: 400 })
  registerCode(@Body() authDto: RegCodeDto) {
    return this.authService.registerCode(authDto)
  }

  @Post('/password-forgot')
  @ApiOperation({ summary: 'Запрос на сброс пароля' })
  @ApiResponse({ status: 200 })
  @ApiBadRequestResponse({ status: 400 })
  passwordForgot(@Body() dto: PassForgotDto) {
    return this.authService.passwordForgot(dto)
  }

  @Post('/password-forgot/verify')
  @ApiOperation({ summary: 'Верификация кода на сброс пароля' })
  @ApiResponse({ status: 200 })
  @ApiBadRequestResponse({ status: 400 })
  passwordVerify(@Body() dto: PassForgoVerifytDto) {
    return this.authService.passwordVerify(dto)
  }

  @Post('/password-forgot/reset')
  @ApiOperation({ summary: 'Изменение пароля' })
  @ApiResponse({ status: 200, type: LoginResponceDto })
  @ApiBadRequestResponse({ status: 400 })
  passwordReset(@Body() dto: PassForgotResetDto) {
    return this.authService.passwordReset(dto)
  }
}
