import { queryOptions, useQuery } from '@tanstack/react-query'
import {
  Department,
  EmployeeStats,
  EmploymentStatus,
  EmploymentType,
  JobRole,
} from '@/types/api'
import qs from 'qs'
import apiClient from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'

export type EmployeeStatsInput = {
  employeeNumber?: string
  jobRole?: JobRole[]
  employmentType?: EmploymentType[]
  department?: Department[]
  employmentStatus?: EmploymentStatus[]
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
