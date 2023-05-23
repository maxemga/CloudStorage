import { AxiosError } from 'axios'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Uploader } from 'src/components'
import { PersistData, Statuses } from 'src/enums'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import {
  addErrorsFile,
  addUploader,
  getMe,
  selectFiles,
  selectUploader,
  updateUploader,
  upload,
} from 'src/store'
import { ErrorResponce, FileUpload } from 'src/types'
import styled from 'styled-components'
import { FilesHeader } from './header'
import { FilesList } from './list'
import { FilesSelecter } from './selecter'
import { UploadPreview } from './upload-preview'

export const HomeFiles = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { files } = useAppSelector(selectUploader)
  const { currentFolder } = useAppSelector(selectFiles)
  const [isDrag, setIsDrag] = useState(false)

  const onDragEnter = (event: Event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDrag(true)
  }

  const onDragLeave = (event: Event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDrag(false)
  }

  const onAddUploader = (files: FileUpload[]) => {
    dispatch(addUploader(files))
  }

  const onUpdateUploader = (file: FileUpload) => {
    dispatch(updateUploader(file))
  }

  const onDrop = async (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    const files = [...event.dataTransfer.files].map((file: File) =>
      Object.assign(file, {
        id: Math.random(),
        loaded: 0,
        total: file.size,
        status: Statuses.INIT,
        error: '',
        path: undefined,
        folder: currentFolder,
      }),
    )

    onAddUploader(files)
    for (let i = 0; i < files.length; i++) {
      onUpdateUploader({ ...files[i], status: Statuses.LOADING })
      try {
        const { path } = await dispatch(
          upload({
            file: files[i],
            id: currentFolder,
            onUpdateUploader,
          }),
        ).unwrap()
        onUpdateUploader({ ...files[i], status: Statuses.SUCCESS, path })
      } catch (e) {
        const error = e as AxiosError<ErrorResponce>

        onUpdateUploader({
          ...files[i],
          status: Statuses.ERROR,
          error: t(`general.errors.${error.response?.data.message}`),
        })
        dispatch(addErrorsFile(files[i]))
      }
    }

    setIsDrag(false)
  }

  return (
    <Wrapper drag={isDrag}>
      <Block
        drag={isDrag}
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragEnter}
        className="block">
        <FilesHeader />
        <FilesList />
      </Block>

      {isDrag && <UploadPreview />}
      <FilesSelecter />
      {files.length && <Uploader />}
    </Wrapper>
  )
}

const Wrapper = styled.div<any>`
  position: relative;
  min-height: 100%;
  width: ${({ theme }) => `calc(100% - ${theme.sideBar.width})`};
  border: ${({ drag }) => (drag ? `5px solid #635DFF` : 'none')};
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
`

const Block = styled.div<any>`
  padding: 30px 40px;
  width: 100%;
  min-height: 100%;
  background-color: ${({ theme }) => theme.background.filesList};
  transition: 0.2s;
  filter: ${({ drag }) => (drag ? 'blur(8px)' : 'none')};
`
