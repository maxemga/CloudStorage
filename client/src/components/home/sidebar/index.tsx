import styled from 'styled-components'
import { SidebarButtons } from './buttons'
import { SidebarNavigator } from './navigator'
import { SidebarStorage } from './storage'

export const SideBar = () => {
  return (
    <Block>
      <Tools>
        <SidebarButtons />
        <SidebarNavigator />
      </Tools>
      <Info>
        <SidebarStorage />
      </Info>
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 24px;
  oveflow: hidden;
  min-height: 100%;
  width: ${({ theme }) => theme.sideBar.width};
  background-color: ${({ theme }) => theme.background.sidebar};
`

const Tools = styled.div``

const Info = styled.div``
