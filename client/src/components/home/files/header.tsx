import { useAppSelector } from 'src/hooks'
import { selectFiles } from 'src/store'
import { filesSources } from 'src/utils'
import styled from 'styled-components'
import { FilesNavigator } from './navigator'

export const FilesHeader = () => {
  const { source } = useAppSelector(selectFiles)

  return (
    <Block>
      <Title>{filesSources[source].title}</Title>
      <FilesNavigator />
    </Block>
  )
}

const Block = styled.div``

const Title = styled.p`
  font-family: ${({ theme }) => theme.roboto500};
  color: ${({ theme }) => theme.text.primary};
  font-size: 28px;
`
