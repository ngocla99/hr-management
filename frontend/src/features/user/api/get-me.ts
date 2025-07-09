import { queryOptions, useQuery } from '@tanstack/react-query'
import { User } from '@/types/api'
import apiClient from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'

export const getMeApi = (): Promise<User> => {
  return apiClient.get('/users/me')
}

export const getMeQueryOptions = () => {
  return queryOptions({
    queryKey: ['users', 'me'],
    queryFn: () => getMeApi(),
  })
}

type UseMeOptions = {
  queryConfig?: QueryConfig<typeof getMeQueryOptions>
}

export const useMe = ({ queryConfig }: UseMeOptions = {}) => {
  return useQuery({
    ...getMeQueryOptions(),
    ...queryConfig,
  })
}
