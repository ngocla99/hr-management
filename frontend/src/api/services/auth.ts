import {
  LoginReqSchema,
  LoginResSchema,
  RegisterReqSchema,
  RegisterResSchema,
} from '@/lib/validations/auth'
import apiClient from '../api-client'

export const logInApi = (user: LoginReqSchema): Promise<LoginResSchema> => {
  return apiClient.post('/auth/email/login', user)
}

export const registerApi = (
  user: RegisterReqSchema
): Promise<RegisterResSchema> => {
  return apiClient.post('/auth/email/register', user)
}

export const logoutApi = () => {
  return apiClient.post('/auth/logout')
}
