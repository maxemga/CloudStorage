import { AxiosError } from 'axios'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { CSSTransition } from 'react-transition-group'
import { FilesService } from 'src/api'
import { CrossIcon, DeleteIcon } from 'src/assets'
import { notify } from 'src/components/toaster'
import { useFiles } from 'src/context'
import { useAppDispatch } from 'src/hooks'
import { deleteFiles, getMe, renameFile } from 'src/store'
import { ErrorResponce } from 'src/types'
import styled, { useTheme } from 'styled-components'

export const FilesPanel = () => {
  const AppTheme: any = useTheme()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { selectedFiles } = useFiles()
  const ref = useRef(null)

  const isNullFiles = selectedFiles.length === 0

  const onDelete = async () => {
    const ids = selectedFiles.map((el) => el.id)
    try {
      await dispatch(deleteFiles({ ids })).unwrap()
      dispatch(getMe())
    } catch (e) {
      const error = e as AxiosError<ErrorResponce>

      notify(t(`general.errors.${error.response?.data.message}`))
    }
  }

  const onRename = async () => {
    const id = selectedFiles[0].id

    try {
      await dispatch(renameFile({ id, name: 'dsds' })).unwrap()
      dispatch(getMe())
    } catch (e) {
      const error = e as AxiosError<ErrorResponce>

      notify(t(`general.errors.${error.response?.data.message}`))
    }
  }

  const tools = [
    { title: 'Rename', onPress: onRename },
    { title: 'Delete', onPress: onDelete },
  ]

  return (
    <CSSTransition
      nodeRef={ref}
      classNames="fade"
      timeout={200}
      in={!isNullFiles}
      mountOnEnter
      unmountOnExit>
      <Panel ref={ref}>
        <Content>
          <Info></Info>
          <Tools>
            {tools.map((el) => {
              return (
                <Tool onClick={el.onPress} key={el.title}>
                  <DeleteIcon />
                  <ToolTitle>{el.title}</ToolTitle>
                </Tool>
              )
            })}
            <Icon>
              <CrossIcon color={AppTheme.home.panel.tool} size={40} />
            </Icon>
          </Tools>
        </Content>
      </Panel>
    </CSSTransition>
  )
}

const Info = styled.div``

const Tools = styled.div`
  display: flex;
  align-items: center;
`

const Tool = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 3px;
  padding: 0 10px;
`

const ToolTitle = styled.p`
  color: ${({ theme }) => theme.home.panel.tool};
  font-family: ${({ theme }) => theme.roboto500};
  font-size: 14px;
`

const Panel = styled.div`
  z-index: 100;
  position: fixed;
  padding: 0 20px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 60px;
  width: 100%;

  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: 0.2s;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: 0.2s;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.home.panel.background};
  width: 100%;
  height: 100%;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 5px;
`
