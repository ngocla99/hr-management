import { queryOptions, useQuery } from '@tanstack/react-query'
import { User } from '@/types/api'
import { Pagination, PaginationInput } from '@/types/common'
import apiClient from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'

export const getUsersApi = (
  input?: PaginationInput
): Promise<{
  data: User[]
  pagination: Pagination
}> => {
  return apiClient.get('/users', { params: input })
}

export const getUsersQueryOptions = (input?: PaginationInput) => {
  return queryOptions({
    queryKey: ['users', 'list', input],
    queryFn: () => getUsersApi(input),
  })
}

type UseUsersOptions = {
  input?: PaginationInput
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>
}

export const useUsers = ({ input, queryConfig }: UseUsersOptions) => {
  return useQuery({
    ...getUsersQueryOptions(input),
    ...queryConfig,
  })
}
