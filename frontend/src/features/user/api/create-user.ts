import { z } from 'zod'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'
import { USER_ROLES } from '@/features/user/constants/constants'
import { getUsersQueryOptions } from './get-users'

export const createUserSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  role: z.enum(USER_ROLES),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export const createUserApi = (
  input: CreateUserInput
): Promise<Pick<User, 'id' | 'email' | 'username'>> => {
  return apiClient.post('/users', input)
}

type UseCreateUserOptions = {
  mutationConfig?: MutationConfig<typeof createUserApi>
}

export const useCreateUser = ({
  mutationConfig,
}: UseCreateUserOptions = {}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions().queryKey,
      })
      onSuccess?.(...args)
    },
    onError: (error: Error, ...args) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : t('message.error.createFailed', { ns: 'users' })
      toast.error(errorMessage)
      onError?.(error, ...args)
    },
    ...restConfig,
    mutationFn: createUserApi,
  })
}
