import { FilesSource } from 'src/enums'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import { selectFiles, setFolder, setSource } from 'src/store'
import { filesSources } from 'src/utils'
import styled, { useTheme } from 'styled-components'

interface ItemProps {
  isCurrentPath: boolean
}

interface Props {
  path: FilesSource
}

export const SidebarNavigatorItem = ({ path }: Props) => {
  const dispatch = useAppDispatch()
  const { source } = useAppSelector(selectFiles)
  const AppTheme: any = useTheme()

  const isCurrentPath = source === path
  const sources = filesSources[path]

  const setPath = (currentPath: FilesSource) => {
    dispatch(setSource(currentPath))
    dispatch(setFolder(null))
  }

  return (
    <Item isCurrentPath={isCurrentPath} onClick={() => setPath(path)}>
      {<sources.icon color={AppTheme.home.sidebar.nav.icon} />}
      <Title>{filesSources[path].title}</Title>
    </Item>
  )
}

const Item = styled.div<ItemProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: ${({ isCurrentPath, theme }) =>
    isCurrentPath ? theme.home.sidebar.nav.background : 'none'};

  &:hover {
    background-color: ${({ theme }) => theme.home.sidebar.nav.background};
  }
`

const Title = styled.span`
  font-size: 16px;
  font-family: ${({ theme }) => theme.roboto400};
  color: ${({ theme }) => theme.text.primary};
  margin-left: 5px;
`
