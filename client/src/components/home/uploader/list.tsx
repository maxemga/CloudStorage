import { useAppSelector } from 'src/hooks'
import { selectUploader } from 'src/store'
import styled from 'styled-components'
import { UploadedItem } from './item'

export const UploadedList = () => {
  const { files } = useAppSelector(selectUploader)

  return (
    <List>
      {files.map((file) => {
        return <UploadedItem file={file} key={file.id} />
      })}
    </List>
  )
}

const List = styled.div`
  overflow: auto;
  padding-top: 5px;
  height: 300px;
`
