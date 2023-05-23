import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import { getFiles, getMe, selectAuth, selectFiles } from 'src/store'
import { navigationRoutes } from './routes'

export const AppNavigator = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(selectAuth)
  const { currentFolder } = useAppSelector(selectFiles)

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  // useEffect(() => {
  //   if (!user) return

  //   dispatch(getFiles(currentFolder))
  // }, [dispatch, user, currentFolder])

  return (
    <Routes>
      {navigationRoutes.map(({ path, element }) => {
        return <Route path={path} key={path} element={element} />
      })}
    </Routes>
  )
}
