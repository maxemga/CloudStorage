import { AxiosError } from 'axios'
import { noop } from 'lodash'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FilesService } from 'src/api'
import { PlusIcon, UploadIcon } from 'src/assets'
import { Button, ListInputModal, Toaster, notify } from 'src/components'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import { selectFiles } from 'src/store'
import { ErrorResponce } from 'src/types'
import { CreateFilePopup } from './create-popup'
import styled, { useTheme } from 'styled-components'

export const SidebarButtons = () => {
  const dispatch = useAppDispatch()
  const { currentFolder } = useAppSelector(selectFiles)
  const [isShow, setIsShow] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)

  const { t } = useTranslation()
  const AppTheme: any = useTheme()

  const onUploadFile = async (event: any) => {
    const files = [...event.target.files]

    files.forEach(async (file) => {
      try {
        // const { data } = await FilesService.upload([file], currentFolder)
        // dispatch(addFile(data))
      } catch (e) {
        const error = e as AxiosError<ErrorResponce>

        notify(t(`general.errors.${error.response?.data.message}`))
      }
    })
  }

  const onOpen = () => {
    setIsShow(true)
  }

  const onClose = () => {
    setIsShow(false)
  }

  const onCreateFile = () => {
    setIsShowModal(true)
  }

  const onCloseModal = () => {
    setIsShowModal(false)
  }

  return (
    <Buttons>
      {/* <input multiple type={'file'} onChange={(event) => onUploadFile(event)} /> */}
      <Button
        icon={<UploadIcon />}
        background={AppTheme.home.sidebar.uploadButton.background}
        color={AppTheme.home.sidebar.uploadButton.text}
        hover={AppTheme.home.sidebar.uploadButton.hover}
        variant="sidebar"
        title={t('home.button.upload')}
        type="button"
        onClick={noop}
      />
      <Test>
        <Button
          icon={<PlusIcon />}
          background={AppTheme.home.sidebar.createButton.background}
          color={AppTheme.home.sidebar.createButton.text}
          hover={AppTheme.home.sidebar.createButton.hover}
          variant="sidebar"
          title={t('home.button.create')}
          type="button"
          onClick={onOpen}
        />
        <CreateFilePopup
          isShow={isShow}
          onCreateFile={onCreateFile}
          onClose={onClose}
        />
      </Test>
      <ListInputModal
        isShow={isShowModal}
        title={t('home.modal.create')}
        onClose={onCloseModal}
      />
      <Toaster />
    </Buttons>
  )
}

const Test = styled.div`
  position: relative;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`
