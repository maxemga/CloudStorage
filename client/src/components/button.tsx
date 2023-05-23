import styled, { CSSProperties } from 'styled-components'
import { Loader } from './loader'

interface Props {
  type?: 'submit' | 'reset' | 'button'
  title: string
  variant: string
  color?: string
  hover?: string
  icon?: JSX.Element
  background?: string
  isLoading?: boolean
  disable?: boolean
  styles?: CSSProperties
  onClick: () => void
}

interface BtnProps {
  variant?: string
  color?: string
  hover?: string
  disabled: boolean
  isLoading: boolean
  background?: string
}

export const Button = ({
  title,
  variant,
  icon,
  color,
  hover,
  background,
  type = 'button',
  isLoading = false,
  disable = false,
  styles,
  onClick,
}: Props) => {
  return (
    <Btn
      type={type}
      style={styles}
      variant={variant}
      color={color}
      hover={hover}
      background={background}
      disabled={disable || isLoading}
      isLoading={isLoading}
      onClick={onClick}>
      {!isLoading ? title : <Loader />}
      {icon && <Icon>{icon}</Icon>}
      <Icon>{icon}</Icon>
    </Btn>
  )
}

const Icon = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 55%;
  left: 10px;
`

const Btn = styled.button<BtnProps>`
  position: relative;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.roboto500};

  ${(props) => {
    switch (props.variant) {
      case 'form':
        return `
        height: 50px;
        background-color: ${
          props.isLoading || props.disabled
            ? props.theme.button.form.disabled
            : props.theme.button.form.primary
        };
        color: ${props.theme.button.text.form};
        font-size: 16px;
  
        border: none;
        border-radius: 8px;`

      case 'sidebar':
        return `
        height: 40px;
        background-color: ${props.background};
        color: ${props.color};
        font-size: 16px;
  
        border: none;
        border-radius: 8px;
        box-shadow: 0px 3px 5px 1px rgba(0,0,0,0.1);
        transition: .3s;

        &:hover {
          background-color: ${props.hover};
          transition: .3s;
        }
        `

      case 'modalCreate':
        return `
        width: auto;
        background-color: ${props.background};
        color: ${props.color};
        padding: 8px 16px;
        border: none;
        border-radius: 8px;
        margin-left: auto;
        transition: .3s;
        margin-top: 24px;

        &:hover {
          background-color: ${props.hover};
          transition: .3s;
        }
        `
    }
  }};
`
