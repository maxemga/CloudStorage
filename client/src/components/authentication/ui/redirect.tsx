import { useNavigate } from 'react-router-dom'
import { RoutesPaths } from 'src/enums'
import styled from 'styled-components'

interface Props {
  title: string
  label: string
  redirectUrl: RoutesPaths
}

export const FormRedirect = ({ title, label, redirectUrl }: Props) => {
  const navigate = useNavigate()
  const onRedirect = () => {
    navigate(redirectUrl)
  }

  return (
    <Title>
      {title} <Button onClick={onRedirect}>{label}</Button>
    </Title>
  )
}

const Title = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text.primary};
`

const Button = styled.span`
  cursor: pointer;
  font-family: ${({ theme }) => theme.roboto500};
  color: ${({ theme }) => theme.button.text.navigate};
  margin-left: 3px;
`
