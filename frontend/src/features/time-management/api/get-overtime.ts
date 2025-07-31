import { queryOptions, useQuery } from '@tanstack/react-query'
import { OvertimeResDto } from '@/types/api'
import apiClient from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'

export interface GetOvertimeParams {
  userId: string
  startDate?: string
  endDate?: string
  limit?: number
  afterCursor?: string
}

export interface GetOvertimeResponse {
  data: OvertimeResDto[]
  cursor?: {
    afterCursor?: string
    beforeCursor?: string
  }
}

export const getOvertimeApi = (
  params: GetOvertimeParams
): Promise<GetOvertimeResponse> => {
  const { userId, ...queryParams } = params
  return apiClient.get(`/time-management/overtime/${userId}`, {
    params: queryParams,
  })
}

export const getOvertimeQueryOptions = (params: GetOvertimeParams) => {
  return queryOptions({
    queryKey: ['overtime', params],
    queryFn: () => getOvertimeApi(params),
  })
}

type UseOvertimeOptions = {
  input: GetOvertimeParams
  queryConfig?: QueryConfig<typeof getOvertimeQueryOptions>
}

export const useOvertime = ({ input, queryConfig }: UseOvertimeOptions) => {
  return useQuery({
    ...getOvertimeQueryOptions(input),
    ...queryConfig,
  })
}
