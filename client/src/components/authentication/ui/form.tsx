import styled from 'styled-components'
import { Formik } from 'formik'
import { Button, FormRedirect, FormInput } from 'src/components'
import { useTranslation } from 'react-i18next'
import { ObjectSchema } from 'yup'
import {
  LoginSchemaType,
  LoginType,
  RegisterType,
  RegSchemaType,
} from 'src/types'
import { RoutesNames, RoutesPaths } from 'src/enums'
import { ErrorIcon } from 'src/assets'
import { useNavigate } from 'react-router-dom'

interface Props {
  name: string
  errorText: string
  isLoading: boolean
  initialValues: LoginType | RegisterType
  redirectUrl: RoutesPaths
  onSubmit: (values: any, d: any) => void
  validationSchema: ObjectSchema<RegSchemaType | LoginSchemaType>
}

export const AuthForm = ({
  errorText,
  initialValues,
  redirectUrl,
  onSubmit,
  validationSchema,
  name,
  isLoading,
}: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handlePassForgot = () => {
    navigate(RoutesPaths.PASSWORD_FORGOT, {
      state: { name: RoutesNames.PASSWORD_FORGOT },
    })
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({
        errors,
        values,
        isValid,
        touched,
        dirty,
        handleSubmit,
        handleChange,
        handleBlur,
      }) => (
        <Form onSubmit={handleSubmit}>
          {Object.keys(initialValues).map((el) => {
            return (
              <FormInput
                name={el}
                key={el}
                label={t(`auth.values.${el}`)}
                invalid={!!errors[el] && !!touched[el]}
                error={errors[el]}
                value={values[el]}
                onChange={handleChange}
                onBlur={(value) => handleBlur(value)}
              />
            )
          })}
          {errorText !== '' && (
            <Error>
              <ErrorIcon />
              <ErrorTitle>{errorText}</ErrorTitle>
            </Error>
          )}
          {name === 'login' && (
            <ForgotTitle onClick={handlePassForgot}>
              {t('auth.forgotPassword')}
            </ForgotTitle>
          )}
          <Button
            type="submit"
            variant="form"
            styles={{ marginTop: '16px' }}
            disable={!isValid || !dirty}
            isLoading={isLoading}
            onClick={handleSubmit}
            title={t(`auth.${name}.button`)}
          />
          <FormRedirect
            title={t(`auth.${name}.haveAccount`)}
            label={t(`auth.${name}.signUp`)}
            redirectUrl={redirectUrl}
          />
        </Form>
      )}
    </Formik>
  )
}

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

const ForgotTitle = styled.p`
  margin-top: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.auth.forgot};
  font-size: 14px;
  font-family: ${({ theme }) => theme.roboto500};
`

const Error = styled.div`
  display: flex;
  align-items: center;
`

const ErrorTitle = styled.span`
  margin-left: 8px;
  font-size: 12px;
  font-family: ${({ theme }) => theme.roboto500};
  color: ${({ theme }) => theme.input.border.error};
`
