import { z } from 'zod'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'
import { getUsersQueryOptions } from './get-users'

export const deleteUsersSchema = z.object({
  ids: z.array(z.string()),
})

export type DeleteUsersInput = z.infer<typeof deleteUsersSchema>

export const deleteUsersApi = (input: DeleteUsersInput): Promise<void> => {
  return apiClient.delete(`/users/delete-many`, { data: input })
}

type UseDeleteUsersOptions = {
  mutationConfig?: MutationConfig<typeof deleteUsersApi>
}

export const useDeleteUsers = ({
  mutationConfig,
}: UseDeleteUsersOptions = {}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions().queryKey,
      })
      toast.success(t('message.success.deletedMany', { ns: 'users' }))
      onSuccess?.(...args)
    },
    onError: (error: Error, ...args) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : t('message.error.deleteManyFailed', { ns: 'users' })
      toast.error(errorMessage)
      onError?.(error, ...args)
    },
    ...restConfig,
    mutationFn: deleteUsersApi,
  })
}
