import { ApiMethods } from 'src/enums'
import {
  AuthResponce,
  GoogleCheckReponce,
  GoogleCheckType,
  GoogleRegister,
  LoginType,
  PassForgot,
  PassForgotReset,
  PassForgotVerify,
  RegisterType,
  RegisterVerifyType,
  UserType,
} from 'src/types'
import { BaseService } from './base'

export class AuthService extends BaseService {
  public static async getMe() {
    return await this.fetch<UserType>({
      url: ApiMethods.GET_ME,
      method: 'GET',
    })
  }

  public static async register(data: RegisterType) {
    return await this.fetch({
      url: ApiMethods.REGISTER,
      method: 'POST',
      data,
    })
  }

  public static async login(data: LoginType) {
    return await this.fetch<AuthResponce>({
      url: ApiMethods.LOGIN,
      method: 'POST',
      data,
    })
  }

  public static async googleCheck(data: GoogleCheckType) {
    return await this.fetch<AuthResponce & GoogleCheckReponce>({
      url: ApiMethods.GOOGLE_CHECK,
      method: 'POST',
      data,
    })
  }

  public static async googleLogin(data: GoogleRegister) {
    return await this.fetch<AuthResponce>({
      url: ApiMethods.GOOGLE_LOGIN,
      method: 'POST',
      data,
    })
  }

  public static async registerVerify(data: RegisterVerifyType) {
    return await this.fetch<AuthResponce>({
      url: ApiMethods.REGISTER_VERIFY,
      method: 'POST',
      data,
    })
  }

  public static async passwordForgot(data: PassForgot) {
    return await this.fetch({
      url: ApiMethods.PASSWORD_FORGOT,
      method: 'POST',
      data,
    })
  }

  public static async passwordForgotVerify(data: PassForgotVerify) {
    return await this.fetch({
      url: ApiMethods.PASSWORD_FORGOT_VERIFY,
      method: 'POST',
      data,
    })
  }

  public static async passwordForgotReset(data: PassForgotReset) {
    return await this.fetch<AuthResponce>({
      url: ApiMethods.PASSWORD_FORGOT_RESET,
      method: 'POST',
      data,
    })
  }
}
