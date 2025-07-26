import { queryOptions, useQuery } from '@tanstack/react-query'
import { User } from '@/types/api'
import apiClient from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'

export type UserAdjacentInput = {
  id: string
}


export type UserAdjacent = {
  current: {
    user: User
    position: number
  }
  total: number
  previous: User
  next: User
}

export const getUserAdjacentApi = (
  input: UserAdjacentInput
): Promise<UserAdjacent> => {
  return apiClient.get(`/users/${input.id}/adjacent`)
}

export const getUserAdjacentQueryOptions = (input: UserAdjacentInput) => {
  return queryOptions({
    queryKey: ['users', 'adjacent', input],
    queryFn: () => getUserAdjacentApi(input),
  })
}

type UseUserAdjacentOptions = {
  input: UserAdjacentInput
  queryConfig?: QueryConfig<typeof getUserAdjacentQueryOptions>
}

export const useUserAdjacent = ({
  input,
  queryConfig,
}: UseUserAdjacentOptions) => {
  return useQuery({
    ...getUserAdjacentQueryOptions(input),
    ...queryConfig,
  })
}
