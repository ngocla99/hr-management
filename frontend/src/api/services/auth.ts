import { AuthRequestSchema, AuthResponseSchema } from '@/lib/validations/auth'
import apiClient from '../api-client'

export const logInApi = (
  user: AuthRequestSchema
): Promise<AuthResponseSchema> => {
  return apiClient.post('/auth/email/login', user)
}

export const registerApi = (user: AuthRequestSchema) => {
  return apiClient.post('/auth/email/register', user)
}

export const logoutApi = () => {
  return apiClient.post('/auth/logout')
}
