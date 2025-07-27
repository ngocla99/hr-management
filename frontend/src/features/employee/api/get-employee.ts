import { queryOptions, useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'
import { Employee } from '@/features/employee/type/employee'
import { transformEmployee } from '@/features/employee/utils/transform-employee'

export const getEmployeeApi = (id: string): Promise<Employee> => {
  return apiClient.get(`/employees/${id}`)
}

export const getEmployeeQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['employees', id],
    queryFn: () => getEmployeeApi(id),
  })
}

type UseEmployeeOptions = {
  input: string
  queryConfig?: QueryConfig<typeof getEmployeeQueryOptions>
}

export const useEmployee = ({ input, queryConfig }: UseEmployeeOptions) => {
  return useQuery({
    ...getEmployeeQueryOptions(input),
    ...queryConfig,
    select: (data) => transformEmployee(data),
  })
}
