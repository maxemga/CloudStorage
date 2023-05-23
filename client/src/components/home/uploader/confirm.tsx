import { FileIcon, PdfIcon } from 'src/assets'
import { ToolButton } from 'src/components/button-tool'
import { noop } from 'lodash'
import styled from 'styled-components'
import { colors } from 'src/theme'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import {
  addUploader,
  removeErrorsFile,
  removeUploader,
  selectUploader,
  updateUploader,
  upload,
} from 'src/store'
import { ErrorResponce, FileUpload } from 'src/types'
import { Statuses } from 'src/enums'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'

export const UploaderConfirm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { errors } = useAppSelector(selectUploader)
  //   const file = errors[0]

  const onUpdateUploader = (file: FileUpload) => {
    dispatch(updateUploader(file))
  }

  const onCancel = async () => {
    dispatch(removeErrorsFile())
    dispatch(removeUploader(errors[0].id))
  }

  const onReplace = async () => {
    const file = errors[0]

    dispatch(removeErrorsFile())
    onUpdateUploader({ ...file, status: Statuses.LOADING })
    try {
      const { path } = await dispatch(
        upload({
          file,
          id: file.folder,
          onUpdateUploader,
        }),
      ).unwrap()
      onUpdateUploader({ ...file, status: Statuses.SUCCESS, path })
    } catch (e) {
      const error = e as AxiosError<ErrorResponce>

      onUpdateUploader({
        ...file,
        status: Statuses.ERROR,
        error: t(`general.errors.${error.response?.data.message}`),
      })
    }
  }

  return (
    <Block>
      <Content>
        <Icon>
          <PdfIcon size={50}></PdfIcon>
        </Icon>
        <Info>
          <Title>
            <Name>{errors[0].name}</Name> already exists in this directory.
            Replace it?
          </Title>
          <Buttons>
            <ToolButton title="Don't upload" onPress={onCancel} />
            <ToolButton title="Replace" onPress={onReplace} />
            <ToolButton title="Copy" onPress={onCancel} />
          </Buttons>
        </Info>
      </Content>
    </Block>
  )
}

const Block = styled.div`
  padding: 10px 15px;
`

const Content = styled.div`
  border-radius: 8px;
  display: flex;
  align-items: top;
  background-color: ${({ theme }) => theme.uploader.confirm};
  padding: 10px;
`
const Icon = styled.div`
  width: 50px;
  height: 50px;
`

const Info = styled.div`
  margin-left: 12px;
`

const Buttons = styled.div`
  display: flex;
  column-gap: 10px;
  margin-top: 8px;
`

const Title = styled.p`
  font-family: ${({ theme }) => theme.roboto500};
  text-align: left;
  font-size: 12px;
`

const Name = styled.span`
  font-family: ${({ theme }) => theme.roboto700};
`
