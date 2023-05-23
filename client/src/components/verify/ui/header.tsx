import { useTranslation } from 'react-i18next'
import { RoutesNames } from 'src/enums'
import { VerifyFormProps } from 'src/types'
import styled from 'styled-components'

interface Props {
  name: RoutesNames
  obj: VerifyFormProps
}

export const VerifyHeader = ({ name, obj }: Props) => {
  const { t } = useTranslation()

  return (
    <Header>
      <Title>{t(`verify.${name}.title`)}</Title>
      <Info>
        <Description>{t(`verify.${name}.description`)}</Description>
        {obj[name].email && <Email>{obj[name].email}</Email>}
      </Info>
    </Header>
  )
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  text-align: center;
`

const Info = styled.div`
  text-align: left;
`

const Title = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-size: 24px;
  margin-bottom: 12px;
`

const Email = styled.p`
  color: ${({ theme }) => theme.button.text.navigate};
  font-family: ${({ theme }) => theme.roboto500};
  font-size: 14px;
`

const Description = styled.p`
  color: ${({ theme }) => theme.text.primary};
  text-align: left;
  font-size: 14px;
`
