import { useAppDispatch, useAppSelector, useAuth } from 'src/hooks'
import { selectAuth } from 'src/store'
import { colors } from 'src/theme'
import { formatSize } from 'src/utils'
import styled from 'styled-components'

export const SidebarStorage = () => {
  const { user } = useAppSelector(selectAuth)
  const { logout } = useAuth()

  return (
    <Storage>
      <Line>
        <Line1></Line1>
        <Line2></Line2>
      </Line>
      <Title>{formatSize(user?.usedStorage ?? 0)}</Title>
      <Test onClick={() => logout()}>fdsafsadf</Test>
    </Storage>
  )
}

const Test = styled.button`
  background-color: transparent;
`

const Storage = styled.div`
  background-color: ${colors.violet[0]};
  padding: 20px;
  border-radius: 16px;
  width: 100%;
`

const Line = styled.div`
  position: relative;
  width: 100%;
`

const Line1 = styled.div`
  position: absolute;
  border-radius: 8px;
  overflow: hidden;
  left: 0;
  top: 0;
  width: 100%;
  height: 8px;
  background-color: #8a86ff;
`

const Line2 = styled.div`
  position: absolute;
  border-radius: 8px;

  left: 0;
  top: 0;
  width: 0%;
  height: 8px;
  background-color: white;
`

const Title = styled.p`
  font-family: ${({ theme }) => theme.roboto500};
  text-align: center;
  margin-top: 15px;
  color: white;
`
