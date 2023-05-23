import * as yup from 'yup'
import 'src/i18n'
import { t } from 'i18next'

export const registerVerifySchema = yup.object({
  value: yup
    .string()
    .matches(/^(\d{6})$/g, t('verify.validate.code'))
    .required(t('auth.errors.require')),
})

export const passForgotSchema = yup.object({
  value: yup
    .string()
    .email(t('auth.errors.email'))
    .required(t('auth.errors.require')),
})

export const passForgotVerifySchema = yup.object({
  value: yup
    .string()
    .matches(/^(\d{6})$/g, t('verify.validate.code'))
    .required(t('auth.errors.require')),
})

export const passForgotResetSchema = yup.object({
  value: yup
    .string()
    .min(6, t('auth.errors.min', { value: 'Password', count: 6 }))
    .max(14, t('auth.errors.max', { value: 'Password', count: 14 }))
    .required(t('auth.errors.require')),
})

export const googleRegisterSchema = yup.object({
  value: yup
    .string()
    .max(16, t('auth.errors.max', { value: 'Login', count: 16 }))
    .matches(/^[^а-я]+$/gi, t('auth.errors.onlyLatinSings'))
    .required(t('auth.errors.require')),
})
