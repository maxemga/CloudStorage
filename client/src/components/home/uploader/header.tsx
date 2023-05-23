import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CrossIcon } from 'src/assets'
import { Statuses } from 'src/enums'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import { selectUploader, setRolled } from 'src/store'
import { colors } from 'src/theme'
import { checkStatus } from 'src/utils'
import styled, { useTheme } from 'styled-components'

interface ProgressProps {
  progress: string
  status: Statuses
}

export const UploaderHeader = () => {
  const { t } = useTranslation()
  const AppTheme: any = useTheme()
  const dispatch = useAppDispatch()

  const [status, setStatus] = useState(Statuses.LOADING)
  const { files, isRolled } = useAppSelector(selectUploader)

  const loaded = files.reduce((acc, el) => acc + el.loaded, 0)
  const total = Math.round(files.reduce((acc, el) => acc + el.total, 0))

  const progress = ((loaded * 100) / total).toFixed(1)

  const onChangeRolled = () => {
    dispatch(setRolled(!isRolled))
  }

  useEffect(() => {
    setStatus(checkStatus(files))
  }, [files])

  return (
    <Header onClick={onChangeRolled}>
      <Content>
        <Info>
          {status === Statuses.ERROR && <Status>Uploaded Stopped</Status>}
          {status === Statuses.SUCCESS && <Status>All files uploaded</Status>}
          {status === Statuses.LOADING && <Status>{progress}%</Status>}
          {status === Statuses.ERROR && <Progress>Upload {progress}%</Progress>}
        </Info>
        <Icon>
          <CrossIcon color={AppTheme.icons.primary} />
        </Icon>
      </Content>
      <Line progress={progress} status={status} />
    </Header>
  )
}

const Info = styled.div`
  z-index: 100;
`

const Progress = styled.p`
  font-family: ${({ theme }) => theme.roboto700};
  margin-top: 2px;
  font-size: 12px;
  color: ${colors.grey[10]};
  opacity: 0.6;
`

const Status = styled.p`
  font-family: ${({ theme }) => theme.roboto700};
  font-size: 14px;
  color: ${({ theme }) => theme.text.white};
`

const Header = styled.div`
  cursor: pointer;
  position: relative;
  background-color: ${({ theme }) => theme.uploader.header.primary};
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
`

const Line = styled.div<ProgressProps>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: ${({ theme, status }) => theme.uploader.header[status]};
`

const Icon = styled.div`
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
`
