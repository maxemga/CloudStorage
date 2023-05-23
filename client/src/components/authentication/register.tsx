import styled from 'styled-components'
import { ToolsTip, CountriesButton } from 'src/components'
import { AuthHeader } from './ui/header'
import { PopupPosition, RoutesNames, RoutesPaths } from 'src/enums'
import { CountriesList } from '../countries/list'
import { AuthForm } from './ui'
import { useNavigate } from 'react-router-dom'
import { regSchema } from 'src/schemas'
import { useState } from 'react'
import { ErrorResponce, RegisterType } from 'src/types'
import { AuthService } from 'src/api'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { networkFailed } from 'src/utils'
import { FormikHelpers } from 'formik'

const initialValues = {
  email: '',
  login: '',
  firstName: '',
  lastName: '',
  password: '',
}

export const RegisterComponent = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  const setErrors = (
    error: AxiosError<ErrorResponce>,
    helpers: FormikHelpers<RegisterType>,
  ) => {
    if (error.message === networkFailed || error.response?.status == 500) {
      const errorMessage = t(`general.errors.errorRequest`)

      setErrorText(errorMessage)
      helpers.setErrors({
        email: errorMessage,
        login: errorMessage,
        firstName: errorMessage,
        lastName: errorMessage,
        password: errorMessage,
      })
    } else {
      const errorMessage = t(`general.errors.${error.response?.data.message}`)

      setErrorText(errorMessage)
      helpers.setErrors({
        email: errorMessage,
        login: errorMessage,
        firstName: errorMessage,
        lastName: errorMessage,
        password: errorMessage,
      })
    }
  }

  const onSubmit = async (
    values: RegisterType,
    helpers: FormikHelpers<RegisterType>,
  ) => {
    setLoading(true)
    try {
      await AuthService.register(values)

      navigate(RoutesPaths.REGISTER_VERIFY, {
        state: {
          name: RoutesNames.REGISTER_VERIFY,
          email: values.email,
        },
      })
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
        <AuthHeader description={t('auth.reg.title')} />
        <AuthForm
          name={'reg'}
          errorText={errorText}
          initialValues={initialValues}
          isLoading={loading}
          redirectUrl={RoutesPaths.LOGIN}
          onSubmit={onSubmit}
          validationSchema={regSchema}
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
