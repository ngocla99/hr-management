import { z } from 'zod'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'
import { getUsersQueryOptions, UsersInput } from './get-users'

export const activateUserSchema = z.object({
  id: z.string(),
})

export type ActivateUserInput = z.infer<typeof activateUserSchema>

export const activateUserApi = (input: ActivateUserInput): Promise<void> => {
  return apiClient.patch(`/users/${input.id}/activate`)
}

type UseActivateUserOptions = {
  inputQuery?: UsersInput
  mutationConfig?: MutationConfig<typeof activateUserApi>
}

export const useActivateUser = ({
  inputQuery,
  mutationConfig,
}: UseActivateUserOptions = {}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions(inputQuery).queryKey,
      })
      toast.success(t('message.success.activated', { ns: 'users' }))
      onSuccess?.(...args)
    },
    onError: (error: Error, ...args) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : t('message.error.activateFailed', { ns: 'users' })
      toast.error(errorMessage)
      onError?.(error, ...args)
    },
    ...restConfig,
    mutationFn: activateUserApi,
  })
}
