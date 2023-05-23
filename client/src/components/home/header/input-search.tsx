import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CrossIcon, SearchIcon } from 'src/assets'
import styled, { useTheme } from 'styled-components'

interface InputProps {
  isFocus: boolean
}

export const FilesSearchInput = () => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const [isFocus, setIsFocus] = useState(false)

  const AppTheme: any = useTheme()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClose = () => {
    console.log('ds')
    setIsFocus(false)
    setValue('')
  }

  const onFocus = () => {
    setIsFocus(true)
  }
  const onBlur = () => {
    setIsFocus(false)
  }

  const colorIcons = isFocus
    ? AppTheme.home.header.input.icons.active
    : AppTheme.home.header.input.icons.inactive

  return (
    <Block isFocus={isFocus}>
      <Input
        value={value}
        placeholder={t('home.searchPlaceholder')}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        isFocus={isFocus}
      />
      <Icons isFocus={isFocus}>
        {isFocus && (
          <Cross onClick={onClose}>
            <CrossIcon color={colorIcons} />
          </Cross>
        )}
        <Search isFocus={isFocus}>
          <SearchIcon color={colorIcons} />
        </Search>
      </Icons>
    </Block>
  )
}

const Icons = styled.div<InputProps>`
  pointer-events: ${({ isFocus }) => (isFocus ? 'auto' : 'none')};
  display: flex;
  align-items: center;
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
`

const Cross = styled.div`
  cursor: pointer;
  display: flex;
  height: 100%
  align-items: center;
`

const Search = styled.div<InputProps>`
  cursor: pointer;
  padding: 20px 20px;
  display: flex;
  height: 100%
  align-items: center;
  border-left: ${({ isFocus, theme }) =>
    isFocus ? `1px solid ${theme.input.border.primary}` : `none`};
`

const Block = styled.div<InputProps>`
  overflow: hidden;

  position: relative;
  width: ${({ isFocus }) => (isFocus ? '700px' : '300px')};
  transition: 0.3s;
`

const Input = styled.input<InputProps>`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.input.border.primary};
  padding: 10px 20px;
  border-radius: 24px;

  &::placeholder {
    color: ${({ theme }) => theme.home.header.input.placeholder};
    font-size: 16px;
    font-family: ${({ theme }) => theme.roboto500};
  }
`
