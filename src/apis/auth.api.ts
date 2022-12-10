import {
  CHECK_EXISTING_PHONE_API,
  LOGIN_API,
  LOGOUT_API,
  REGISTER_API,
} from '../constants/api.constant'
import {
  LoginFormData,
  LoginSuccessType,
  RegisterFormData,
} from '../types/auth.type'
import http from '../utils/http.util'

export const login = (data: LoginFormData) => {
  const { phone, password } = data
  return http.post<LoginSuccessType>(LOGIN_API, { phone, password })
}

export const register = (data: RegisterFormData) => {
  const { fullName, phone, password } = data
  return http.post(REGISTER_API, { fullName, phone, password })
}

export const checkExistingPhone = (phone: string) => {
  return http.get(`${CHECK_EXISTING_PHONE_API}${phone}`)
}

export const logout = (id: string) => {
  return http.get(`${LOGOUT_API}${id}`)
}
