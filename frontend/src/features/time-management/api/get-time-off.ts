import { queryOptions, useQuery } from '@tanstack/react-query'
import { TimeOffResDto } from '@/types/api'
import apiClient from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'

export interface GetTimeOffParams {
  userId: string
  startDate?: string
  endDate?: string
  limit?: number
  afterCursor?: string
}

export interface GetTimeOffResponse {
  data: TimeOffResDto[]
  cursor?: {
    afterCursor?: string
    beforeCursor?: string
  }
}

export const getTimeOffApi = (
  params: GetTimeOffParams
): Promise<GetTimeOffResponse> => {
  const { userId, ...queryParams } = params
  return apiClient.get(`/time-management/time-off/${userId}`, {
    params: queryParams,
  })
}

export const getTimeOffQueryOptions = (params: GetTimeOffParams) => {
  return queryOptions({
    queryKey: ['time-off', params],
    queryFn: () => getTimeOffApi(params),
  })
}

type UseTimeOffOptions = {
  input: GetTimeOffParams
  queryConfig?: QueryConfig<typeof getTimeOffQueryOptions>
}

export const useTimeOff = ({ input, queryConfig }: UseTimeOffOptions) => {
  return useQuery({
    ...getTimeOffQueryOptions(input),
    ...queryConfig,
  })
}
