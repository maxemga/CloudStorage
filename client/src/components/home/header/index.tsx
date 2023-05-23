import { useAppSelector, useAuth } from 'src/hooks'
import { selectAuth } from 'src/store'
import styled from 'styled-components'
import { FilesSearchInput } from './input-search'
import { HomeLogo } from './logo'

export const HomeHeader = () => {
  const { user } = useAppSelector(selectAuth)
  const { logout } = useAuth()

  const onClick = () => {
    logout()
  }

  return (
    <Block>
      <HomeLogo />
      <FilesSearchInput />
      {/* <button onDoubleClick={onClick}>Logout</button> */}
      {/* <p>{user?.email}</p>
      <p>{user?.id}</p> */}
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
`
