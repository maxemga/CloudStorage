import { useAppSelector } from 'src/hooks'
import { selectUploader } from 'src/store'
import styled from 'styled-components'
import { UploaderConfirm } from './confirm'
import { UploaderHeader } from './header'
import { UploadedList } from './list'

export const Uploader = () => {
  const { isRolled, errors } = useAppSelector(selectUploader)

  return (
    <Block>
      <UploaderHeader />
      {errors.length !== 0 && !isRolled && <UploaderConfirm />}
      {!isRolled && <UploadedList />}
    </Block>
  )
}

const Block = styled.div`
  overflow: hidden;
  position: fixed;
  right: 30px;
  bottom: 0;
  width: 450px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0px 0px 12px 6px rgba(34, 60, 80, 0.2);
  background-color: ${({ theme }) => theme.background.filesList};
`
