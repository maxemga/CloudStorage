import styled from 'styled-components'

export const HomeLogo = () => {
  return (
    <Logo>
      <Title>CloudStorage</Title>
    </Logo>
  )
}

const Logo = styled.div`
  width: ${({ theme }) => theme.sideBar.width};
`

const Title = styled.h1`
  cursor: pointer;
  color: white;
`
