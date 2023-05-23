import { BrowserRouter } from 'react-router-dom'
import { AppNavigator } from './navigation'
import { GlobalStyle, ThemesProvider } from './theme'
import { FilesProvider, LanguagesProvider } from './context'
import { Provider } from 'react-redux'
import { store } from './store'
import { GoogleOAuthProvider } from '@react-oauth/google'
import 'react-toastify/dist/ReactToastify.css'
import './i18n'

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID || ''}>
          <ThemesProvider>
            <LanguagesProvider>
              <FilesProvider>
                <GlobalStyle />
                <AppNavigator />
              </FilesProvider>
            </LanguagesProvider>
          </ThemesProvider>
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  )
}
