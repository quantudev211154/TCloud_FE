import { UserType } from './user.type'

export type LoginSuccessType = {
  accessToken: string
  user: UserType
}

export type LoginFormData = {
  phone: string
  password: string
}

export type RegisterFormData = {
  fullName: string
  phone: string
  password: string
}

export type ConfirmOTPFormType = {
  otp: string
}
