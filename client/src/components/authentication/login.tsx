import styled from 'styled-components'
import { ToolsTip, CountriesButton } from 'src/components'
import { AuthForm } from './ui/form'
import { AuthHeader } from './ui/header'
import { PopupPosition, RoutesPaths } from 'src/enums'
import { t } from 'i18next'
import { CountriesList } from '../countries/list'
import { loginSchema } from 'src/schemas'
import { useState } from 'react'
import { ErrorResponce, LoginType } from 'src/types'
import { AuthService } from 'src/api'
import { AxiosError } from 'axios'
import { FormikHelpers } from 'formik'
import { networkFailed } from 'src/utils'
import { useAuth } from 'src/hooks'

const initialValues = {
  email: '',
  password: '',
}

export const LoginComponent = () => {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  const setErrors = (
    error: AxiosError<ErrorResponce>,
    helpers: FormikHelpers<LoginType>,
  ) => {
    if (error.message === networkFailed || error.response?.status == 500) {
      const errorMessage = t(`general.errors.errorRequest`)

      setErrorText(errorMessage)
      helpers.setErrors({
        email: errorMessage,
        password: errorMessage,
      })
    } else {
      const errorMessage = t(`general.errors.${error.response?.data.message}`)

      setErrorText(errorMessage)
      helpers.setErrors({
        email: errorMessage,
        password: errorMessage,
      })
    }
  }

  const onSubmit = async (
    values: LoginType,
    helpers: FormikHelpers<LoginType>,
  ) => {
    setLoading(true)

    try {
      const { data } = await AuthService.login(values)

      login(data)
    } catch (e) {
      const error = e as AxiosError<ErrorResponce>

      setErrors(error, helpers)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Block>
      <Wrapper>
        <AuthHeader description={t('auth.login.title')} />
        <AuthForm
          name={'login'}
          errorText={errorText}
          initialValues={initialValues}
          isLoading={loading}
          redirectUrl={RoutesPaths.REGISTER}
          onSubmit={onSubmit}
          validationSchema={loginSchema}
        />
        <Picker>
          <ToolsTip
            position={PopupPosition.TOP_RIGHT}
            trigger={CountriesButton}
            on={['hover', 'focus']}>
            <CountriesList />
          </ToolsTip>
        </Picker>
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

const Picker = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
`
