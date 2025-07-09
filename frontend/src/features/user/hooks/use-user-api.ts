import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MutationOptions, PaginationInput } from '@/types/common'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { deleteUserApi, getMeApi } from '@/api/services/user'
import { QUERY_KEYS } from '@/lib/constants/constant'
import { MeSchema } from '@/lib/validations/user'

export const userKeys = {
  all: [QUERY_KEYS.USERS] as const,
  lists: (input: PaginationInput) => [...userKeys.all, 'list', input] as const,
  me: () => [...userKeys.all, 'me'] as const,
}

// Get current user (me)
export const useMe = () => {
  return useQuery<MeSchema>({
    queryKey: userKeys.me(),
    queryFn: getMeApi,
  })
}

export const useDeleteUser = ({ onSuccess, onError }: MutationOptions) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('users')

  return useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists({}) })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD] })
      toast.success(t('message.success.deleted'))
      onSuccess?.()
    },
    onError: (error: Error) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : t('message.error.deleteFailed')
      toast.error(errorMessage)
      onError?.(error)
    },
  })
}
