import * as yup from 'yup'
import 'src/i18n'
import { t } from 'i18next'

export const loginSchema = yup.object({
  email: yup
    .string()
    .email(t('auth.errors.email'))
    .required(t('auth.errors.require')),
  password: yup
    .string()
    .min(6, t('auth.errors.min', { value: 'Password', count: 6 }))
    .max(14, t('auth.errors.max', { value: 'Password', count: 14 }))
    .required(t('auth.errors.require')),
})
