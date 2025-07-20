import { z } from 'zod'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'
import { getUsersQueryOptions, UsersInput } from './get-users'

export const deleteUserSchema = z.object({
  id: z.string(),
})

export type DeleteUserInput = z.infer<typeof deleteUserSchema>

export const deleteUserApi = (input: DeleteUserInput): Promise<void> => {
  return apiClient.delete(`/users/${input.id}`)
}

type UseDeleteUserOptions = {
  inputQuery?: UsersInput
  mutationConfig?: MutationConfig<typeof deleteUserApi>
}

export const useDeleteUser = ({
  inputQuery,
  mutationConfig,
}: UseDeleteUserOptions = {}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions(inputQuery).queryKey,
      })
      toast.success(t('message.success.deleted', { ns: 'users' }))
      onSuccess?.(...args)
    },
    onError: (error: Error, ...args) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : t('message.error.deleteFailed', { ns: 'users' })
      toast.error(errorMessage)
      onError?.(error, ...args)
    },
    ...restConfig,
    mutationFn: deleteUserApi,
  })
}
