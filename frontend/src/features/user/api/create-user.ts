import { z } from 'zod'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserApi } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'
import { USER_ROLES } from '@/features/user/constants/user-constants'
import { getUsersQueryOptions, UsersInput } from './get-users'

export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  role: z.enum(USER_ROLES),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export const createUserApi = (input: CreateUserInput): Promise<UserApi> => {
  return apiClient.post('/users', input)
}

type UseCreateUserOptions = {
  inputQuery?: UsersInput
  mutationConfig?: MutationConfig<typeof createUserApi>
}

export const useCreateUser = ({
  inputQuery,
  mutationConfig,
}: UseCreateUserOptions = {}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions(inputQuery).queryKey,
      })
      toast.success(t('message.success.created', { ns: 'users' }))
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
