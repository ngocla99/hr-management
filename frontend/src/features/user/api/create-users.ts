import { z } from 'zod'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'
import { createUserSchema } from './create-user'
import { getUsersQueryOptions, UsersInput } from './get-users'

export const createUsersSchema = z.object({
  users: z.array(createUserSchema),
})

export type CreateUsersInput = z.infer<typeof createUsersSchema>

export const createUsersApi = (input: CreateUsersInput): Promise<User[]> => {
  return apiClient.post('/users/create-many', input)
}

type UseCreateUsersOptions = {
  inputQuery?: UsersInput
  mutationConfig?: MutationConfig<typeof createUsersApi>
}

export const useCreateUsers = ({
  inputQuery,
  mutationConfig,
}: UseCreateUsersOptions = {}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions(inputQuery).queryKey,
      })
      toast.success(t('message.success.createdMany', { ns: 'users' }))
      onSuccess?.(...args)
    },
    onError: (error: Error, ...args) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : t('message.error.createManyFailed', { ns: 'users' })
      toast.error(errorMessage)
      onError?.(error, ...args)
    },
    ...restConfig,
    mutationFn: createUsersApi,
  })
}
