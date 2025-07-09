import { z } from 'zod'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'
import { getUsersQueryOptions } from './get-users'

export const suspendUserSchema = z.object({
  id: z.string(),
})

export type SuspendUserInput = z.infer<typeof suspendUserSchema>

export const suspendUserApi = (input: SuspendUserInput): Promise<void> => {
  return apiClient.patch(`/users/${input.id}/suspend`)
}

type UseSuspendUserOptions = {
  mutationConfig?: MutationConfig<typeof suspendUserApi>
}

export const useSuspendUser = ({
  mutationConfig,
}: UseSuspendUserOptions = {}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions().queryKey,
      })
      toast.success(t('message.success.suspended', { ns: 'users' }))
      onSuccess?.(...args)
    },
    onError: (error: Error, ...args) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : t('message.error.suspendFailed', { ns: 'users' })
      toast.error(errorMessage)
      onError?.(error, ...args)
    },
    ...restConfig,
    mutationFn: suspendUserApi,
  })
}
