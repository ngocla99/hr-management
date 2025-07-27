import { queryOptions, useQuery } from '@tanstack/react-query'
import { User } from '@/types/api'
import apiClient from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'

export const getUserApi = (id: string): Promise<User> => {
  return apiClient.get(`/users/${id}`)
}

export const getUserQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['users', id],
    queryFn: () => getUserApi(id),
  })
}

type UseUserOptions = {
  input: string
  queryConfig?: QueryConfig<typeof getUserQueryOptions>
}

export const useUser = ({ input, queryConfig }: UseUserOptions) => {
  return useQuery({
    ...getUserQueryOptions(input),
    ...queryConfig,
  })
}
