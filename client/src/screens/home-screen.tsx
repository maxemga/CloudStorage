import { HomeComponent } from 'src/components/home'
import styled from 'styled-components'

export const HomeScreen = () => {
  return (
    <Wrapper>
      <HomeComponent />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 0px 20px 30px 20px;
  padding-bottom: 30px;
  background-color: ${({ theme }) => theme.background.home};
`
