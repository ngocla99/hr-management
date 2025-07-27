import { z } from 'zod'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'
import { getUsersQueryOptions, UsersInput } from './get-users'

export const updateUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  gender: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  password: z.string().optional(),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>

export const updateUserApi = (input: UpdateUserInput): Promise<User> => {
  const { id, ...rest } = input
  return apiClient.patch(`/users/${id}`, rest)
}

type UseUpdateUserOptions = {
  inputQuery?: UsersInput
  mutationConfig?: MutationConfig<typeof updateUserApi>
}

export const useUpdateUser = ({
  inputQuery,
  mutationConfig,
}: UseUpdateUserOptions = {}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions(inputQuery).queryKey,
      })
      onSuccess?.(...args)
      toast.success(t('message.success.updated', { ns: 'users' }))
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
    mutationFn: updateUserApi,
  })
}
