import { AxiosError } from 'axios'
import { FormikHelpers } from 'formik'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthService } from 'src/api'
import { RoutesNames, RoutesPaths } from 'src/enums'
import {
  googleRegisterSchema,
  passForgotResetSchema,
  passForgotSchema,
  passForgotVerifySchema,
  registerVerifySchema,
} from 'src/schemas'
import { VerifyFormType, VerifyFormProps, ErrorResponce } from 'src/types'
import { networkFailed } from 'src/utils'
import styled from 'styled-components'
import { VerifyForm, VerifyHeader } from './ui'
import { useAuth } from 'src/hooks'

export const VerifyComponent = () => {
  const {
    state: { name, email, firstName, lastName },
  } = useLocation()
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [errorText, setErrorText] = useState('')
  const [loading, setLoading] = useState(false)

  const setErrors = useCallback(
    (
      error: AxiosError<ErrorResponce>,
      helpers: FormikHelpers<{ value: string }>,
    ) => {
      if (error.message === networkFailed || error.response?.status == 500) {
        const errorMessage = t(`general.errors.errorRequest`)

        setErrorText(errorMessage)
        helpers.setErrors({
          value: errorMessage,
        })
      } else {
        const errorMessage = t(`general.errors.${error.response?.data.message}`)

        setErrorText(errorMessage)
        helpers.setErrors({
          value: errorMessage,
        })
      }
    },
    [t],
  )

  const onRegisterVerify: VerifyFormType['onSubmit'] = useCallback(
    async (values, helpers) => {
      if (loading) return
      setLoading(true)

      try {
        const { data } = await AuthService.registerVerify({
          email,
          code: Number(values.value),
        })

        login(data)
      } catch (e) {
        const error = e as AxiosError<ErrorResponce>

        setErrors(error, helpers)
      } finally {
        setLoading(false)
      }
    },
    [email, loading, login, setErrors],
  )

  const onPassForgot: VerifyFormType['onSubmit'] = useCallback(
    async (values, helpers) => {
      if (loading) return
      setLoading(true)

      try {
        await AuthService.passwordForgot({ email: values.value })

        navigate(RoutesPaths.PASSWORD_FORGOT_VERIFY, {
          state: {
            name: RoutesNames.PASSWORD_FORGOT_VERIFY,
            email: values.value,
          },
        })
      } catch (e) {
        const error = e as AxiosError<ErrorResponce>

        setErrors(error, helpers)
      } finally {
        setLoading(false)
      }
    },
    [loading, navigate, setErrors],
  )

  const onPassForgotVerify: VerifyFormType['onSubmit'] = useCallback(
    async (values, helpers) => {
      if (loading) return
      setLoading(true)

      try {
        await AuthService.passwordForgotVerify({
          email,
          code: Number(values.value),
        })

        navigate(RoutesPaths.PASSWORD_FORGOT_RESET, {
          state: {
            name: RoutesNames.PASSWORD_FORGOT_RESET,
            email,
          },
        })
      } catch (e) {
        const error = e as AxiosError<ErrorResponce>

        setErrors(error, helpers)
      } finally {
        setLoading(false)
      }
    },
    [email, loading, navigate, setErrors],
  )

  const onPassForgotReset: VerifyFormType['onSubmit'] = useCallback(
    async (values, helpers) => {
      if (loading) return
      setLoading(true)

      try {
        const { data } = await AuthService.passwordForgotReset({
          email,
          password: values.value,
        })

        login(data)
      } catch (e) {
        const error = e as AxiosError<ErrorResponce>

        setErrors(error, helpers)
      } finally {
        setLoading(false)
      }
    },
    [email, loading, login, setErrors],
  )

  const onGoogleRegister: VerifyFormType['onSubmit'] = useCallback(
    async (values, helpers) => {
      if (loading) return
      setLoading(true)

      try {
        const { data } = await AuthService.googleLogin({
          email,
          login: values.value,
          lastName,
          firstName,
        })

        login(data)
      } catch (e) {
        const error = e as AxiosError<ErrorResponce>

        setErrors(error, helpers)
      } finally {
        setLoading(false)
      }
    },
    [email, firstName, lastName, loading, login, setErrors],
  )

  const obj: VerifyFormProps = useMemo(
    () => ({
      [RoutesNames.REGISTER_VERIFY]: {
        onSubmit: onRegisterVerify,
        validationSchema: registerVerifySchema,
        email,
      },
      [RoutesNames.PASSWORD_FORGOT]: {
        onSubmit: onPassForgot,
        validationSchema: passForgotSchema,
      },
      [RoutesNames.PASSWORD_FORGOT_VERIFY]: {
        onSubmit: onPassForgotVerify,
        validationSchema: passForgotVerifySchema,
        email,
      },
      [RoutesNames.PASSWORD_FORGOT_RESET]: {
        onSubmit: onPassForgotReset,
        validationSchema: passForgotResetSchema,
      },
      [RoutesNames.GOOGLE_REGISTER]: {
        onSubmit: onGoogleRegister,
        validationSchema: googleRegisterSchema,
      },
    }),
    [
      email,
      onPassForgot,
      onPassForgotReset,
      onPassForgotVerify,
      onRegisterVerify,
      onGoogleRegister,
    ],
  )

  return (
    <Block>
      <Wrapper>
        <VerifyHeader name={name} obj={obj} />
        <VerifyForm
          obj={obj}
          name={name}
          errorText={errorText}
          isLoading={loading}
          setLoading={setLoading}
        />
      </Wrapper>
    </Block>
  )
}

const Block = styled.div`
  margin: auto;
  width: 400px;
  background-color: ${({ theme }) => theme.auth.background};
  border-radius: 10px;
`

const Wrapper = styled.div`
  padding: 40px;
`
