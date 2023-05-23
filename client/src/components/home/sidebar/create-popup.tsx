import { useRef } from 'react'
import { FolderIcon } from 'src/assets'
import { useOutsideClick } from 'src/hooks'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import { useTranslation } from 'react-i18next'

interface Props {
  isShow: boolean
  onClose: () => void
  onCreateFile: () => void
}

export const CreateFilePopup = ({ isShow, onClose, onCreateFile }: Props) => {
  const { t } = useTranslation()
  const arr = [{}, {}, {}]
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, onClose, isShow)

  return (
    <CSSTransition
      nodeRef={ref}
      classNames="fade"
      timeout={300}
      in={isShow}
      mountOnEnter
      unmountOnExit>
      <Block ref={ref}>
        <Header>{t('home.button.create')}</Header>
        <List>
          {arr.map(() => {
            return (
              <Item key={Math.random()} onClick={() => onCreateFile()}>
                <FolderIcon />
                <Title>{t('home.file.folder')}</Title>
              </Item>
            )
          })}
        </List>
      </Block>
    </CSSTransition>
  )
}

const Block = styled.div`
  position: absolute;
  box-shadow: 0px 3px 5px 3px rgba(0, 0, 0, 0.1);
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.background.filesList};
  left: 0;
  top: 0;
  border-radius: 8px;
  transform-origin: 0 0;

  &.fade-enter {
    transform: scale(0);
  }

  &.fade-enter-active {
    transform: scale(1);
    transition: 0.3s;
  }

  &.fade-exit {
    transform: scale(1);
    transition: 0.3s;
  }

  &.fade-exit-active {
    transform: scale(0);
    transition: 0.3s;
  }
`

const List = styled.div`
  display: flex;
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.roboto500};
  font-size: 20px;
`

const Item = styled.div`
  cursor: pointer;
  border-radius: 8px;
  padding: 20px 10px;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.home.list.item.background};
  }
`

const Title = styled.p``

const Header = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.roboto500};
  padding-bottom: 10px;
  font-size: 20px;
`
