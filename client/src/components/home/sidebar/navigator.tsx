import { SidebarNavigatorItem } from './navigator-item'
import styled from 'styled-components'
import { filesSources } from 'src/utils'

export const SidebarNavigator = () => {
  return (
    <Navigator>
      {Object.keys(filesSources).map((path: any) => {
        return <SidebarNavigatorItem key={path} path={path} />
      })}
    </Navigator>
  )
}

const Navigator = styled.div`
  display: flex;
  flex-direction: column;
`
