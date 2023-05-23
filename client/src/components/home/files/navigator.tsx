import { ArrowIcon } from 'src/assets'
import { useAppSelector } from 'src/hooks'
import { selectFiles } from 'src/store'
import styled, { useTheme } from 'styled-components'

interface TitleProps {
  index: number
}

export const FilesNavigator = () => {
  const AppTheme: any = useTheme()

  return (
    // <List>
    //   {stack.map((el: any, index: number) => {
    //     return (
    //       <Item key={Math.random()}>
    //         <Title index={index} onClick={() => console.log(el)}>
    //           fsf
    //         </Title>
    //         <ArrowIcon color={AppTheme.home.list.header.item} />
    //       </Item>
    //     )
    //   })}
    // </List>
    <></>
  )
}

const List = styled.div`
  display: flex;
`

const Item = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Title = styled.span<TitleProps>`
  padding-left: ${(props) => (props.index === 0 ? '0' : '10')}px;
  padding-right: 10px;

  color: ${({ theme }) => theme.home.list.header.item};
  transition: 0.2s;

  &:hover {
    color: ${({ theme }) => theme.home.list.header.hover};
    transition: 0.2s;
  }
`
