import { queryOptions, useQuery } from '@tanstack/react-query'
import { AttendanceStatsDto } from '@/types/api'
import apiClient from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'

export interface GetAttendanceStatsParams {
  userId: string
  startDate?: string
  endDate?: string
}

export const getAttendanceStatsApi = (
  params: GetAttendanceStatsParams
): Promise<AttendanceStatsDto> => {
  const { userId, ...queryParams } = params
  return apiClient.get(`/time-management/attendance/${userId}/stats`, {
    params: queryParams,
  })
}

export const getAttendanceStatsQueryOptions = (
  params: GetAttendanceStatsParams
) => {
  return queryOptions({
    queryKey: ['attendance-stats', params],
    queryFn: () => getAttendanceStatsApi(params),
  })
}

type UseAttendanceStatsOptions = {
  input: GetAttendanceStatsParams
  queryConfig?: QueryConfig<typeof getAttendanceStatsQueryOptions>
}

export const useAttendanceStats = ({
  input,
  queryConfig,
}: UseAttendanceStatsOptions) => {
  return useQuery({
    ...getAttendanceStatsQueryOptions(input),
    ...queryConfig,
  })
}
