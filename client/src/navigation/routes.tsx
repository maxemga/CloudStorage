import { RoutesPaths } from 'src/enums'
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  VerifyScreen,
} from 'src/screens'

import { RouteType } from 'src/types'

export const navigationRoutes: RouteType[] = [
  { path: RoutesPaths.HOME, element: <HomeScreen /> },
  { path: RoutesPaths.LOGIN, element: <LoginScreen /> },
  {
    path: RoutesPaths.REGISTER,
    element: <RegisterScreen />,
  },
  {
    path: RoutesPaths.GOOGLE_REGISTER,
    element: <VerifyScreen />,
  },
  {
    path: RoutesPaths.REGISTER_VERIFY,
    element: <VerifyScreen />,
  },
  { path: RoutesPaths.PASSWORD_FORGOT, element: <VerifyScreen /> },
  { path: RoutesPaths.PASSWORD_FORGOT_VERIFY, element: <VerifyScreen /> },

  { path: RoutesPaths.PASSWORD_FORGOT_RESET, element: <VerifyScreen /> },
]
