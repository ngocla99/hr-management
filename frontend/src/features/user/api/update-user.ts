import { z } from 'zod'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@/types/api'
import { PaginationInput } from '@/types/common'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'
import { USER_ROLES } from '@/features/user/constants/user-constants'
import { getUsersQueryOptions } from './get-users'

export const updateUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  role: z.enum(USER_ROLES),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>

export const updateUserApi = (
  input: UpdateUserInput
): Promise<Pick<User, 'id' | 'email' | 'username'>> => {
  return apiClient.patch(`/users/${input.id}`, {
    email: input.email,
    username: input.username,
    password: input.password,
    role: input.role,
  })
}

type UseUpdateUserOptions = {
  inputQuery?: PaginationInput
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
