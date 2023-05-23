import { useLanguages } from 'src/context'
import { languages } from 'src/utils'
import styled from 'styled-components'

interface TitleProps {
  equal: boolean
}

export const CountriesList = () => {
  const { changeLanguage, language } = useLanguages()

  return (
    <List>
      {Object.values(languages).map((el) => {
        return (
          <Container key={el.id} onClick={() => changeLanguage(el.value)}>
            <>
              {el.icon}
              <Title equal={el.value === language}>
                {el.title.toUpperCase()}
              </Title>
            </>
          </Container>
        )
      })}
    </List>
  )
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.popup.background};
  border: 1px solid ${({ theme }) => theme.popup.border};
  border-radius: 8px;
`

const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  column-gap: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.popup.hover};
  }
`

const Title = styled.p<TitleProps>`
  text-align: center;
  font-family: ${({ theme, equal }) =>
    equal ? theme.roboto700 : theme.roboto400};
  color: ${({ theme }) => theme.text.primary};
  font-size: 12px;
`
