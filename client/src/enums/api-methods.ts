export enum ApiMethods {
  GET_ME = 'auth/me',
  REGISTER = 'auth/register',
  GOOGLE_CHECK = 'auth/google-check',
  GOOGLE_LOGIN = 'auth/google-login',
  LOGIN = 'auth/login',
  REGISTER_VERIFY = 'auth/register-code',
  PASSWORD_FORGOT = 'auth/password-forgot',
  PASSWORD_FORGOT_VERIFY = 'auth/password-forgot/verify',
  PASSWORD_FORGOT_RESET = 'auth/password-forgot/reset',
  FILES = '/files',
  FILES_DELETED = '/files/deleted',
  UPLOAD = '/files/upload',
}
