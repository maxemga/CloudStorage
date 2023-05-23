import { useEffect, useMemo } from 'react'
import { FilesSource, Statuses } from 'src/enums'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import { getDeletedFiles, getFiles, selectFiles } from 'src/store'
import styled from 'styled-components'
import { FilesItem } from './item'

interface FilesLoads {
  [key: FilesSource | string]: {
    onLoad: any
  }
}

export const FilesList = () => {
  const dispatch = useAppDispatch()
  const { files, currentFolder, source } = useAppSelector(selectFiles)

  const obj: FilesLoads = useMemo(
    () => ({
      [FilesSource.FILES]: {
        onLoad: getFiles(currentFolder),
      },
      [FilesSource.TRASH]: {
        onLoad: getDeletedFiles(),
      },
    }),
    [currentFolder],
  )

  useEffect(() => {
    if (files[source].status === Statuses.SUCCESS && currentFolder === null)
      return

    dispatch(obj[source].onLoad)
  }, [source, currentFolder]) // eslint-disable-line

  if (files[source].status === Statuses.LOADING) {
    return <p>Loading....</p>
  }

  return (
    <List>
      {files[source].data.map((el) => {
        return <FilesItem file={el} key={el.id} />
      })}
    </List>
  )
}

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 5px;
`
