import { googleLogout } from '@react-oauth/google'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { PersistData, RoutesPaths } from 'src/enums'
import { setFolder, setUser } from 'src/store'
import { AuthResponce } from 'src/types'
import { useAppDispatch } from './useAppDispatch'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const login = (data: AuthResponce) => {
    Cookies.set(PersistData.Token, data.token, {
      secure: true,
      expires: 24,
    })
    dispatch(setUser(data.user))
    navigate(RoutesPaths.HOME)
  }

  const logout = () => {
    Cookies.remove(PersistData.Token)
    googleLogout()
    dispatch(setUser(undefined))
    dispatch(setFolder(null))
    navigate(RoutesPaths.LOGIN)
  }

  return { login, logout }
}
