export interface PassForgot {
  [key: string]: string
  email: string
}

export interface PassForgotVerify {
  [key: string]: string | number
  email: string
  code: number
}

export interface PassForgotReset {
  [key: string]: string | number
  email: string
  password: string
}
