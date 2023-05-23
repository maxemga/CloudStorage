import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { GoogleIcon } from 'src/assets'
import { AuthService } from 'src/api'
import { useNavigate } from 'react-router-dom'
import { RoutesNames, RoutesPaths } from 'src/enums'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useAuth } from 'src/hooks'

export const GoogleRedirect = () => {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const user = await axios.get(
        process.env.REACT_APP_GOOGLE_DECODE_URL || '',
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        },
      )

      const { data } = await AuthService.googleCheck(user.data)

      if (data.token) {
        login(data)

        return
      }

      navigate(RoutesPaths.GOOGLE_REGISTER, {
        state: {
          name: RoutesNames.GOOGLE_REGISTER,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      })
    },
  })

  return (
    <Button onClick={() => googleLogin()}>
      <GoogleIcon />
      <Title>{t('auth.google')}</Title>
    </Button>
  )
}

const Button = styled.div`
  height: 50px;
  display: flex;
  cursor: pointer;
  align-items: center;
  text-align: left;
  border-radius: 8px;
  padding: 0px 16px;
  border: 1px solid ${({ theme }) => theme.input.border.primary};

  &:hover {
    background-color: ${({ theme }) => theme.button.form.hover};
    transition: 0.2s;
  }
`

const Title = styled.span`
  margin-left: 10px;
  color: ${({ theme }) => theme.text.primary};
`
