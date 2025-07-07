import { AxiosError } from 'axios'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { MutationOptions, Pagination, PaginationInput } from '@/types/common'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import {
  createUserApi,
  deleteUserApi,
  getMeApi,
  getUsersApi,
} from '@/api/services/user'
import { QUERY_KEYS } from '@/lib/constants/constant'
import {
  CreateUserSchema,
  DeleteUserSchema,
  MeSchema,
  UserSchema,
} from '@/lib/validations/user'
import { adaptApiUsersToLocalUsers } from '../utils/adapters'

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

export const useUser = (input: PaginationInput) => {
  const { data, isLoading, error } = useQuery<{
    data: UserSchema[]
    pagination: Pagination
  }>({
    queryKey: userKeys.lists(input),
    queryFn: () => getUsersApi(input),
    placeholderData: keepPreviousData,
  })

  const users = adaptApiUsersToLocalUsers(data?.data ?? [])
  const total = data?.pagination?.totalRecords ?? 0
  return {
    users,
    total,
    isLoading,
    error,
  }
}

export const useCreateUser = ({ onSuccess, onError }: MutationOptions) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('users')

  return useMutation({
    mutationFn: (data: CreateUserSchema) => createUserApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists({}) })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD] })
      toast.success(t('message.success.created'))
      onSuccess?.()
    },
    onError: (error: Error) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : t('message.error.createFailed')
      toast.error(errorMessage)
      onError?.(error)
    },
  })
}

export const useDeleteUser = ({ onSuccess, onError }: MutationOptions) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('users')

  return useMutation({
    mutationFn: (data: DeleteUserSchema) => deleteUserApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists({}) })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD] })
      toast.success(t('message.success.deleted'))
      onSuccess?.()
    },
    onError: (error: Error) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : t('message.error.deleteFailed')
      toast.error(errorMessage)
      onError?.(error)
    },
  })
}
