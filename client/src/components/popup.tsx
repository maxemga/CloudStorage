import { ReactNode, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CrossIcon } from 'src/assets'
import { useOutsideClick } from 'src/hooks'
import styled from 'styled-components'

interface Props {
  isShow: boolean
  children: ReactNode
  title: string
  onClose: () => void
}

export const Popup = ({ isShow, children, title, onClose }: Props) => {
  const ref = useRef(null)
  const refOverlay = useRef(null)

  useOutsideClick(ref, onClose, isShow)

  return (
    <>
      <CSSTransition
        nodeRef={ref}
        classNames="popup"
        timeout={300}
        in={isShow}
        mountOnEnter
        unmountOnExit>
        <Block ref={ref}>
          <Header>
            <Title>{title}</Title>
            <Close onClick={onClose}>
              <CrossIcon />
            </Close>
          </Header>
          <Content>{children}</Content>
        </Block>
      </CSSTransition>

      <CSSTransition
        nodeRef={refOverlay}
        classNames="overlay"
        timeout={300}
        in={isShow}
        mountOnEnter
        unmountOnExit>
        <Background ref={refOverlay} />
      </CSSTransition>
    </>
  )
}

const Close = styled.div`
  cursor: pointer;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
`

const Content = styled.div``

const Title = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.roboto500};
`

const Block = styled.div`
  z-index: 100;
  padding: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  background-color: ${({ theme }) => theme.background.popup};
  border-radius: 16px;
  min-width: 400px;

  &.popup-enter {
    transform: translate(-50%, -50%) scale(0.6);
  }

  &.popup-enter-active {
    transform: translate(-50%, -50%) scale(1);
    transition: 0.3s;
  }

  &.popup-exit {
    transform: translate(-50%, -50%) scale(0.6);
    transition: 0.3s;
    opacity: 0;
  }

  &.popup-exit-active {
    transform: translate(-50%, -50%) scale(0.6);
    transition: 0.2s;
    opacity: 0;
  }
`

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.background.overlay};
  height: 100%;
  width: 100%;
  opacity: 0.6;

  &.overlay-enter {
    opacity: 0;
  }

  &.overlay-enter-active {
    opacity: 0.6;
    transition: 0.3s;
  }

  &.overlay-exit {
    opacity: 0.6;
    transition: 0.3s;
  }

  &.overlay-exit-active {
    opacity: 0;
  }
`
