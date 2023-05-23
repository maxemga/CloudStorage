import { noop } from 'lodash'
import { useEffect, useState } from 'react'
import { MovIcon } from 'src/assets'
import { ToolButton } from 'src/components'
import { FileExtensions, FilesSource, Statuses } from 'src/enums'
import { useAppSelector } from 'src/hooks'
import { selectAuth, selectFiles } from 'src/store'
import { FileUpload } from 'src/types'
import { formatSize, isMedia } from 'src/utils'
import styled from 'styled-components'
import { UploaderLoader } from './loader'

interface Props {
  file: FileUpload
}

export const UploadedItem = ({ file }: Props) => {
  const { user } = useAppSelector(selectAuth)
  const { source } = useAppSelector(selectFiles)

  const type = file.name.split('.').pop()

  const isLoading = file.status === Statuses.LOADING
  const isError = file.status === Statuses.ERROR
  const isSuccess = file.status === Statuses.SUCCESS

  const progress = Math.round((file.loaded * 100) / file.total)

  const imageUrl = `${process.env.REACT_APP_STATIC_URL}/${user?.id}/${FilesSource.FILES}/${file.path}`
  const icon =
    isMedia(type as FileExtensions) && file.path ? (
      <Media src={imageUrl} alt="picture" />
    ) : (
      <MovIcon size={50} />
    )

  return (
    <Item>
      <Content>
        <Info>
          <Icon>{icon} </Icon>
          <Title>
            <Name>{file.name}</Name>
            <Size>{isLoading && 'LOADING'}</Size>
            <Size>{formatSize(file.size)}</Size>
          </Title>
        </Info>
        <Buttons>
          {isLoading && <UploaderLoader progress={progress} />}
          {isError && <Error>{file.error}</Error>}
          {isSuccess && <ToolButton title="Share" onPress={noop} />}
        </Buttons>
      </Content>
    </Item>
  )
}

const Media = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.home.list.item.mediaBorder};
`

const Error = styled.p`
  color: ${({ theme }) => theme.text.error};
  font-family: ${({ theme }) => theme.roboto500};
  font-size: 14px;
  white-space: nowrap;
`

const Item = styled.div`
  padding: 5px 0;
  &:hover {
    background-color: ${({ theme }) => theme.uploader.item.hover};
  }
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`

const Buttons = styled.div``

const Info = styled.div`
  display: flex;
  align-items: center;
`

const Icon = styled.div`
  width: 50px;
  height: 50px;
`

const Title = styled.div`
  margin-left: 12px;
`

const Name = styled.p`
  font-family: ${({ theme }) => theme.roboto500};
  font-size: 14px;
  word-wrap: break-word;
  white-space: wrap;
  width: 200px;
  overflow: hidden;

  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
`

const Size = styled.p`
  color: ${({ theme }) => theme.text.subtitle};
  font-size: 12px;
`
