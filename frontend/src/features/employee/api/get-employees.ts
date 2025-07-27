import { queryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import {
  Department,
  EmploymentStatus,
  EmploymentType,
  JobRole,
} from '@/types/api'
import { Pagination, PaginationInput } from '@/types/common'
import qs from 'qs'
import apiClient from '@/lib/api-client'
import { PAGINATION } from '@/lib/constants/constant'
import { QueryConfig } from '@/lib/react-query'
import { Employee } from '@/features/employee/type/employee'
import { transformEmployee } from '@/features/employee/utils/transform-employee'

export type EmployeesInput = PaginationInput & {
  employeeNumber?: string
  jobRole?: JobRole[]
  employmentType?: EmploymentType[]
  department?: Department[]
  employmentStatus?: EmploymentStatus
  createdAtFrom?: string
  createdAtTo?: string
}

export const getEmployeesApi = (
  input?: EmployeesInput
): Promise<{
  data: Employee[]
  pagination: Pagination
}> => {
  return apiClient.get('/employees', {
    params: input,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  })
}

export const getEmployeesQueryOptions = (
  input: EmployeesInput = {
    page: PAGINATION.DEFAULT_PAGE,
    limit: PAGINATION.DEFAULT_LIMIT,
  }
) => {
  return queryOptions({
    queryKey: ['employees', 'list', input],
    queryFn: () => getEmployeesApi(input),
  })
}

type UseEmployeesOptions = {
  input?: EmployeesInput
  queryConfig?: QueryConfig<typeof getEmployeesQueryOptions>
}

export const useEmployees = ({
  input = {
    page: PAGINATION.DEFAULT_PAGE,
    limit: PAGINATION.DEFAULT_LIMIT,
  },
  queryConfig,
}: UseEmployeesOptions = {}) => {
  return useQuery({
    ...getEmployeesQueryOptions(input),
    ...queryConfig,
    select: (data) => {
      return {
        data: data.data.map(transformEmployee),
        pagination: data.pagination,
      }
    },
  })
}

type UseEmployeesInfiniteOptions = {
  input?: EmployeesInput
  queryConfig?: QueryConfig<any>
}

export const useEmployeesInfinite = ({
  input = {
    page: PAGINATION.DEFAULT_PAGE,
    limit: PAGINATION.DEFAULT_PAGE,
  },
  queryConfig,
}: UseEmployeesInfiniteOptions = {}) => {
  return useInfiniteQuery({
    queryKey: ['employees', 'infinite', input],
    queryFn: ({ pageParam = 1 }) =>
      getEmployeesApi({
        ...input,
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
      return data.pages.flatMap((page) => page.data.map(transformEmployee))
    },
    ...queryConfig,
  })
}
