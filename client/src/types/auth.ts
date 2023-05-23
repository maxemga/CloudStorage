import { FormikConfig } from 'formik'
import { RoutesNames } from 'src/enums'
import { ObjectSchema } from 'yup'
import { UserType } from './user'

export interface LoginType {
  [key: string]: string
  email: string
  password: string
}

export interface RegisterType {
  [key: string]: string
  email: string
  login: string
  password: string
  firstName: string
  lastName: string
}

export interface TokeType {
  token: string
}

export interface AuthResponce {
  token: string
  user: UserType
}

export interface GoogleCheckType {
  email: string
  given_name: string
  family_name: string
}

export interface GoogleCheckReponce {
  email: string
  firstName: string
  lastName: string
}

export interface GoogleRegister {
  email: string
  login: string
  firstName?: string
  lastName?: string
}

export interface RegisterVerifyType {
  [key: string]: string | number
  email: string
  code: number
}

export interface VerifyFormType {
  onSubmit: FormikConfig<{ value: string }>['onSubmit']
  validationSchema: ObjectSchema<{ value: string }>
  email?: string
}

export interface VerifyFormProps {
  [key: RoutesNames | string]: VerifyFormType
}
