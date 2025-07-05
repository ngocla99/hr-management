import { Pagination, PaginationInput } from '@/types/common'
import {
  CreateUserSchema,
  DeleteUserSchema,
  MeSchema,
  UserSchema,
} from '@/lib/validations/user'
import apiClient from '../api-client'

export const getMeApi = (): Promise<MeSchema> => {
  return apiClient.get('/users/me')
}

export const getUsersApi = (
  input?: PaginationInput
): Promise<{
  data: UserSchema[]
  pagination: Pagination
}> => {
  return apiClient.get('/users', { params: input })
}

export const createUserApi = (
  input: CreateUserSchema
): Promise<Pick<UserSchema, 'id' | 'email' | 'name'>> => {
  return apiClient.post('/users', input)
}

export const deleteUserApi = (input: DeleteUserSchema) => {
  return apiClient.delete('/users', { data: input })
}
