import { DefaultTFuncReturn } from 'i18next'
import { HTMLInputTypeAttribute, useState } from 'react'
import styled from 'styled-components'

interface Props {
  value: string
  label?: DefaultTFuncReturn | string
  invalid?: boolean
  error?: string | undefined
  autoFocus?: boolean
  type?: HTMLInputTypeAttribute
  name: string
  onChange: (e: React.ChangeEvent) => void
  onBlur: (e: any) => void
}

interface LabelProps {
  invalid?: boolean
  isFocus?: boolean
  value?: string
}

interface InputProps {
  invalid?: boolean
  isFocus?: boolean
}

export const FormInput = ({
  value,
  onChange,
  onBlur,
  name,
  type = 'text',
  autoFocus = false,
  error,
  invalid,
  label,
}: Props) => {
  const [isFocus, setIsFocus] = useState(false)
  const [isShow, setIsShow] = useState(false)

  const handlePassword = () => {
    setIsShow(!isShow)
  }

  const handleFocus = () => {
    setIsFocus(true)
  }

  const handleBlur = (e: any) => {
    onBlur(e)
    setIsFocus(false)
  }

  return (
    <Block>
      <Label invalid={invalid} isFocus={isFocus} value={value}>
        {invalid ? error : label}
      </Label>
      <TextField
        type={type}
        autoFocus={autoFocus}
        name={name}
        value={value}
        invalid={invalid}
        isFocus={isFocus}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {/* {name === 'password' && (
        <PasswordShow onClick={handlePassword}>
          {isShow ? <PassHideIcon /> : <PassVisibleIcon />}
        </PasswordShow>
      )} */}
    </Block>
  )
}

const Block = styled.div`
  position: relative;
`

const PasswordShow = styled.span`
  cursor: pointer;
  position: absolute;
  height: 100%;
  padding: 0 5px;
  right: 0;
`

const Label = styled.label<LabelProps>`
  position: absolute;
  transition: 0.2s;

  ${(props) => {
    if (props.isFocus || (props.value !== '' && props.invalid)) {
      return `
        font-family: ${props.theme.roboto500};
        font-size: 12px;
        left: 16px;
        top: 0%;
        color: ${
          props.invalid
            ? props.theme.input.helper.error
            : props.theme.input.helper.focus
        };
      `
    } else if (props.isFocus || (props.value !== '' && !props.invalid)) {
      return `
        font-family: ${props.theme.roboto500};
        font-size: 12px;
        left: 16px;
        top: 0%;
        color: ${props.theme.input.helper.primary};
      `
    } else {
      return `
        font-size: 16px;
        left: 16px;
        top: 50%;
        color: ${
          props.invalid
            ? props.theme.input.helper.error
            : props.theme.input.helper.primary
        };
      `
    }
  }}

  padding: 0 3px;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.auth.background};
`

const TextField = styled.input<InputProps>`
  width: 100%;
  height: 50px;

  ${(props) => {
    if (props.isFocus || (props.value !== '' && props.invalid)) {
      return `
        border: ${props.invalid || props.isFocus ? '2px' : ' 1px'} solid
        ${
          props.invalid
            ? props.theme.input.border.error
            : props.theme.input.border.focus
        };
      `
    } else if (props.isFocus || (props.value !== '' && !props.invalid)) {
      return `
      border: ${props.invalid || props.isFocus ? '2px' : ' 1px'} solid
      ${props.theme.input.border.primary};
      `
    } else {
      return `
        border: ${props.invalid || props.isFocus ? '2px' : ' 1px'} solid
        ${
          props.invalid
            ? props.theme.input.border.error
            : props.theme.input.border.primary
        };
      `
    }
  }}

  padding: 0 16px;
  color: ${({ theme, invalid }) =>
    invalid ? theme.text.error : theme.text.primary};
  font-size: 16px;
  border-radius: 8px;
  transition: 0.2s ease;
`
