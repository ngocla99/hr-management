import { queryOptions, useQuery } from '@tanstack/react-query'
import { User } from '@/types/api'
import { UserRole } from '@/types/api'
import { UserStatus } from '@/types/api'
import { Pagination, PaginationInput } from '@/types/common'
import qs from 'qs'
import apiClient from '@/lib/api-client'
import { PAGINATION } from '@/lib/constants/constant'
import { QueryConfig } from '@/lib/react-query'

type UsersInput = PaginationInput & {
  role?: UserRole[]
  status?: UserStatus
  q?: string
}

export const getUsersApi = (
  input?: UsersInput
): Promise<{
  data: User[]
  pagination: Pagination
}> => {
  return apiClient.get('/users', {
    params: input,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  })
}

export const getUsersQueryOptions = (
  input: UsersInput = {
    page: PAGINATION.DEFAULT_PAGE,
    limit: PAGINATION.DEFAULT_LIMIT,
  }
) => {
  return queryOptions({
    queryKey: ['users', 'list', input],
    queryFn: () => getUsersApi(input),
  })
}

type UseUsersOptions = {
  input?: UsersInput
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>
}

export const useUsers = ({
  input = {
    page: PAGINATION.DEFAULT_PAGE,
    limit: PAGINATION.DEFAULT_LIMIT,
  },
  queryConfig,
}: UseUsersOptions = {}) => {
  return useQuery({
    ...getUsersQueryOptions(input),
    ...queryConfig,
  })
}
