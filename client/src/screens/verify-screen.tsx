import { VerifyComponent } from 'src/components/verify'
import styled from 'styled-components'

export const VerifyScreen = () => {
  return (
    <Wrapper>
      <VerifyComponent />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  witdth: 100vw;
  background-color: ${({ theme }) => theme.background.auth};
`
