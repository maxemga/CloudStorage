import styled from 'styled-components'
import { SideBar } from './sidebar'
import { HomeHeader } from './header'
import { HomeFiles } from './files'
import { FilesPanel } from './ui'

export const HomeComponent = () => {
  return (
    <>
      <FilesPanel />
      <HomeHeader />
      <Block>
        <SideBar />
        <HomeFiles />
      </Block>
    </>
  )
}

const Block = styled.div`
  overflow: hidden;
  display: flex;
  min-height: calc(100vh - 70px - 30px);
  border-radius: 16px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.1);
`
