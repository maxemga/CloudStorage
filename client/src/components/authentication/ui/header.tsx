import { t } from 'i18next'
import styled from 'styled-components'
import { GoogleRedirect } from './google'
import { AuthSeparate } from './separate'

interface Props {
  description: string
}

export const AuthHeader = ({ description }: Props) => {
  return (
    <Header>
      <Title>{t('auth.welcome')}</Title>
      <Description>{description}</Description>
      <GoogleRedirect />
      <AuthSeparate />
    </Header>
  )
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  text-align: center;
`

const Title = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-size: 24px;
`

const Description = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-size: 14px;
`
