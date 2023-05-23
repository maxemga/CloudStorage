import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ErrorIcon } from 'src/assets'
import { Button, FormInput } from 'src/components'
import { RoutesNames } from 'src/enums'
import { VerifyFormProps } from 'src/types'
import styled from 'styled-components'

const initialValues = {
  value: '',
}

interface Props {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  obj: VerifyFormProps
  name: RoutesNames
  errorText: string
}

export const VerifyForm = ({ isLoading, obj, name, errorText }: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={obj[name].onSubmit}
      validationSchema={obj[name].validationSchema}>
      {({
        errors,
        values,
        isValid,
        dirty,
        handleSubmit,
        handleChange,
        handleBlur,
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormInput
            key="value"
            name="value"
            autoFocus={true}
            label={t(`verify.${name}.label`)}
            invalid={!!errors.value}
            error={errors.value}
            value={values.value}
            onChange={handleChange}
            onBlur={(value) => handleBlur(value)}
          />
          {errorText !== '' && (
            <Error>
              <ErrorIcon />
              <ErrorTitle>{errorText}</ErrorTitle>
            </Error>
          )}

          <Button
            type="submit"
            variant="form"
            styles={{ marginTop: '24px' }}
            disable={!isValid || !dirty}
            isLoading={isLoading}
            onClick={handleSubmit}
            title={t(`verify.${name}.button`)}
          />
          <Back onClick={handleBack}>Back</Back>
        </Form>
      )}
    </Formik>
  )
}

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`

const Back = styled.span`
  margin: 0 auto;
  margin-top: 15px;
  padding: 5px;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.button.text.navigate};
  font-family: ${({ theme }) => theme.roboto500};
`
const Error = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`

const ErrorTitle = styled.span`
  margin-left: 8px;
  font-size: 12px;
  font-family: ${({ theme }) => theme.roboto500};
  color: ${({ theme }) => theme.input.border.error};
`
