import { FileIcon, FolderIcon } from 'src/assets'
import { FileExtensions, FilesSource } from 'src/enums'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import { selectAuth, selectFiles, setFolder } from 'src/store'
import { colors } from 'src/theme'
import { FileType } from 'src/types'
import { FileModel, isMedia } from 'src/utils'
import styled, { useTheme } from 'styled-components'

interface Props {
  file: FileType
}

export const FilesItem = ({ file }: Props) => {
  const AppTheme: any = useTheme()
  const { user } = useAppSelector(selectAuth)
  const { source } = useAppSelector(selectFiles)

  const dispatch = useAppDispatch()

  const changeFolder = () => {
    if (file.type !== FileExtensions.DIR || source === FilesSource.TRASH) return

    dispatch(setFolder(file.id))
  }

  const imageUrl = `${process.env.REACT_APP_STATIC_URL}/${user?.id}/${source}/${file.path}`
  const fileIcon = !FileModel[file.type] ? (
    <FileIcon size={100} color={AppTheme.icons.folder.main} />
  ) : (
    FileModel[file.type].icon
  )

  return (
    <File
      onDoubleClick={changeFolder}
      data-file={JSON.stringify(file)}
      className="el">
      <Icon>
        {!isMedia(file.type) && fileIcon}
        {isMedia(file.type) && <Media src={imageUrl} alt="picture" />}
      </Icon>

      <Title>{file.name}</Title>
    </File>
  )
}

const File = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-radius: 8px;
  height: 150px;
  overflow: hidden;

  &:hover {
    background-color: ${({ theme }) => theme.home.list.item.background};
  }

  &.selected {
    background-color: ${({ theme }) => theme.home.list.item.background};
  }
`

const Media = styled.img`
  max-width: 80%;
  max-height: 100%;
  border: 1px solid ${({ theme }) => theme.home.list.item.mediaBorder};
`

const Icon = styled.div`
  display: flex;
  width: 100%;
  align-items: end;
  justify-content: center;
  height: 70%;
`

const Title = styled.span`
  width: 85%;
  height: 25%;
  font-family: ${({ theme }) => theme.roboto500};
  font-size: 13px;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  word-wrap: break-word;
  white-space: wrap;
  text-overflow: ellipsis;
`
