import { useLanguages } from 'src/context'
import { languages } from 'src/utils'
import styled from 'styled-components'

export const CountriesButton = () => {
  const { language } = useLanguages()

  return (
    <Button type="submit">
      {languages[language].icon}
      <Title>{languages[language].value.toUpperCase()}</Title>
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  align-items: center;
  column-gap: 6px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.popup.background};
  border: 1px solid ${({ theme }) => theme.popup.border};
  border-radius: 8px;
  padding: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.popup.hover};
    transition: 0.5s;
  }
`

const Title = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.roboto500};
  font-size: 14px;
`
