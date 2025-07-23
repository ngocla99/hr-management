import { queryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import {
  Department,
  EmploymentType,
  JobRole,
  User,
  UserRole,
  UserStatus,
} from '@/types/api'
import { Pagination, PaginationInput } from '@/types/common'
import qs from 'qs'
import apiClient from '@/lib/api-client'
import { PAGINATION } from '@/lib/constants/constant'
import { QueryConfig } from '@/lib/react-query'

export type UsersInput = PaginationInput & {
  username?: string
  jobRole?: JobRole[]
  employmentType?: EmploymentType[]
  department?: Department[]
  role?: UserRole[]
  status?: UserStatus
  createdAtFrom?: string
  createdAtTo?: string
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
  inputQuery?: UsersInput
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>
}

export const useUsers = ({
  inputQuery = {
    page: PAGINATION.DEFAULT_PAGE,
    limit: PAGINATION.DEFAULT_LIMIT,
  },
  queryConfig,
}: UseUsersOptions = {}) => {
  return useQuery({
    ...getUsersQueryOptions(inputQuery),
    ...queryConfig,
  })
}

type UseUsersInfiniteOptions = {
  inputQuery?: UsersInput
  queryConfig?: QueryConfig<any>
}

export const useUsersInfinite = ({
  inputQuery = {
    page: PAGINATION.DEFAULT_PAGE,
    limit: PAGINATION.DEFAULT_PAGE,
  },
  queryConfig,
}: UseUsersInfiniteOptions = {}) => {
  return useInfiniteQuery({
    queryKey: ['users', 'infinite', inputQuery],
    queryFn: ({ pageParam = 1 }) =>
      getUsersApi({
        ...inputQuery,
        page: pageParam,
      }),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.data.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    initialPageParam: 1,
    select: (data) => {
      return data.pages.flatMap((page) => page.data)
    },
    ...queryConfig,
  })
}
