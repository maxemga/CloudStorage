import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const AuthSeparate = () => {
  const { t } = useTranslation()

  return (
    <Block>
      <Separate />
      <Title>{t('auth.separate')}</Title>
    </Block>
  )
}

const Block = styled.div`
  width: 100%;
  position: relative;
  margin: 10px 0;
`

const Separate = styled.div`
  background-color: ${({ theme }) => theme.input.border.primary};
  height: 1px;
  width: 100%;
`

const Title = styled.span`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.auth.background};
  padding: 0 10px;
`
