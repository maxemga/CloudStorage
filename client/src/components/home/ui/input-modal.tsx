import { AxiosError } from 'axios'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Popup, InputListModal, Button } from 'src/components'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import { createFolder, selectFiles } from 'src/store'
import { ErrorResponce } from 'src/types'
import { useTheme } from 'styled-components'
import styled from 'styled-components'
import { networkFailed } from 'src/utils'

interface Props {
  isShow: boolean
  title: string
  onClose: () => void
}

export const ListInputModal = ({ isShow, title, onClose }: Props) => {
  const AppTheme: any = useTheme()
  const dispatch = useAppDispatch()
  const { currentFolder } = useAppSelector(selectFiles)
  const { t } = useTranslation()

  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onCreateile = async () => {
    if (loading) return
    setLoading(true)

    try {
      await dispatch(
        createFolder({ parentId: currentFolder, name: text }),
      ).unwrap()

      onClose()
      setError('')
    } catch (e) {
      const error = e as AxiosError<ErrorResponce>

      if (error.message === networkFailed || error.response?.status == 500) {
        setError(t('general.errors.errorRequest'))
      } else {
        setError(t(`general.errors.${error.response?.data.message}`))
      }
    } finally {
      setLoading(false)
    }
  }

  const onChange = (value: string) => {
    setText(value)
  }

  return (
    <Popup isShow={isShow} title={title} onClose={onClose}>
      <InputListModal value={text} onChange={onChange} loading={loading} />
      {error !== '' && <Error>{error}</Error>}
      <Button
        disable={loading}
        background={AppTheme.home.sidebar.uploadButton.background}
        color={AppTheme.home.sidebar.uploadButton.text}
        hover={AppTheme.home.sidebar.uploadButton.hover}
        title={t('home.save')}
        variant="modalCreate"
        onClick={onCreateile}
      />
    </Popup>
  )
}

const Error = styled.span`
  font-size: 12px;
  font-family: ${({ theme }) => theme.roboto500};
  color: ${({ theme }) => theme.text.error};
`
