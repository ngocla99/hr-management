import { queryOptions, useQuery } from '@tanstack/react-query'
import { AttendanceResDto } from '@/types/api'
import apiClient from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'

export interface GetAttendanceParams {
  userId: string
  startDate?: string
  endDate?: string
  limit?: number
  afterCursor?: string
}

export interface GetAttendanceResponse {
  data: AttendanceResDto[]
  cursor?: {
    afterCursor?: string
    beforeCursor?: string
  }
}

export const getAttendanceApi = (
  params: GetAttendanceParams
): Promise<GetAttendanceResponse> => {
  const { userId, ...queryParams } = params
  return apiClient.get(`/time-management/attendance/${userId}`, {
    params: queryParams,
  })
}

export const getAttendanceQueryOptions = (params: GetAttendanceParams) => {
  return queryOptions({
    queryKey: ['attendance', params],
    queryFn: () => getAttendanceApi(params),
  })
}

type UseAttendanceOptions = {
  input: GetAttendanceParams
  queryConfig?: QueryConfig<typeof getAttendanceQueryOptions>
}

export const useAttendance = ({ input, queryConfig }: UseAttendanceOptions) => {
  return useQuery({
    ...getAttendanceQueryOptions(input),
    ...queryConfig,
  })
}
