import { queryOptions, useQuery } from '@tanstack/react-query'
import {
  Department,
  EmployeeStats,
  EmploymentType,
  JobRole,
  UserRole,
  UserStatus,
} from '@/types/api'
import qs from 'qs'
import apiClient from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'

export type EmployeeStatsInput = {
  username?: string
  jobRole?: JobRole[]
  employmentType?: EmploymentType[]
  department?: Department[]
  role?: UserRole[]
  status?: UserStatus
  createdAtFrom?: string
  createdAtTo?: string
}

export const getEmployeeStatsApi = (
  input?: EmployeeStatsInput
): Promise<EmployeeStats> => {
  return apiClient.get('/employees/stats', {
    params: input,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  })
}

export const getEmployeeStatsQueryOptions = (input: EmployeeStatsInput) => {
  return queryOptions({
    queryKey: ['employees', 'stats', input],
    queryFn: () => getEmployeeStatsApi(input),
  })
}

type UseEmployeeStatsOptions = {
  input?: EmployeeStatsInput
  queryConfig?: QueryConfig<typeof getEmployeeStatsQueryOptions>
}

export const useEmployeeStats = ({
  input,
  queryConfig,
}: UseEmployeeStatsOptions) => {
  return useQuery({
    ...getEmployeeStatsQueryOptions(input ?? {}),
    ...queryConfig,
  })
}
