import { BaseType } from './base'

export interface UserType extends BaseType {
  email: string
  password: string
  login: string
  firstName: string
  lastName: string
  usedStorage: number
  isVerify: boolean
}
