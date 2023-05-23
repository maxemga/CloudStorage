import styled from 'styled-components'
import ToolTip from 'reactjs-popup'
import { PopupPosition } from 'src/enums'
import { ReactNode } from 'react'
import { EventType } from 'reactjs-popup/dist/types'

interface Props {
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element)
  position: PopupPosition | PopupPosition[]
  children: ReactNode
  on: EventType[]
}

export const ToolsTip = ({ trigger, position, children, on }: Props) => {
  return (
    <Block>
      <ToolTip
        trigger={trigger}
        position={position}
        on={on}
        arrow={false}
        offsetY={5}
        closeOnDocumentClick>
        {children}
      </ToolTip>
    </Block>
  )
}

const Block = styled.div``
