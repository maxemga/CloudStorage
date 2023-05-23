import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterComponent } from 'src/components'
import { RoutesPaths } from 'src/enums'
import { useAppSelector } from 'src/hooks'
import { selectAuth } from 'src/store'
import styled from 'styled-components'

export const RegisterScreen = () => {
  const navigate = useNavigate()
  const { user } = useAppSelector(selectAuth)

  useEffect(() => {
    if (!user) return

    navigate(RoutesPaths.HOME)
  })

  return (
    <Wrapper>
      <RegisterComponent />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  witdth: 100vw;
  background-color: ${({ theme }) => theme.background.auth};
`
