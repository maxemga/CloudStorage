import * as yup from 'yup'
import 'src/i18n'
import { t } from 'i18next'

export const regSchema = yup.object({
  email: yup
    .string()
    .email(t('auth.errors.email'))
    .required(t('auth.errors.require')),
  login: yup
    .string()
    .max(16, t('auth.errors.max', { value: 'Login', count: 16 }))
    .matches(/^[^а-я]+$/gi, t('auth.errors.onlyLatinSings'))
    .required(t('auth.errors.require')),

  firstName: yup
    .string()
    .min(3, t('auth.errors.min', { value: 'First name', count: 3 }))
    .max(12, t('auth.errors.max', { value: 'First name', count: 12 }))
    .matches(/^[a-zа-я]+$/gi, t('auth.errors.onlyLetters'))
    .required(t('auth.errors.require')),

  lastName: yup
    .string()
    .min(3, t('auth.errors.min', { value: 'Last name', count: 3 }))
    .max(12, t('auth.errors.max', { value: 'Last name', count: 12 }))
    .matches(/^[a-zа-я]+$/gi, t('auth.errors.onlyLetters'))
    .required(t('auth.errors.require')),

  password: yup
    .string()
    .min(6, t('auth.errors.min', { value: 'Password', count: 6 }))
    .max(14, t('auth.errors.max', { value: 'Password', count: 14 }))
    .required(t('auth.errors.require')),
})
