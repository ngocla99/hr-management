import { queryOptions, useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'
import { Employee } from '@/features/employee/type/employee'

export type EmployeeAdjacentInput = {
  id: string
}

export type EmployeeAdjacent = {
  current: {
    employee: Employee
    position: number
  }
  total: number
  previous: Employee
  next: Employee
}

export const getEmployeeAdjacentApi = (
  input: EmployeeAdjacentInput
): Promise<EmployeeAdjacent> => {
  return apiClient.get(`/employees/${input.id}/adjacent`)
}

export const getEmployeeAdjacentQueryOptions = (
  input: EmployeeAdjacentInput
) => {
  return queryOptions({
    queryKey: ['employees', 'adjacent', input],
    queryFn: () => getEmployeeAdjacentApi(input),
  })
}

type UseEmployeeAdjacentOptions = {
  input: EmployeeAdjacentInput
  queryConfig?: QueryConfig<typeof getEmployeeAdjacentQueryOptions>
}

export const useEmployeeAdjacent = ({
  input,
  queryConfig,
}: UseEmployeeAdjacentOptions) => {
  return useQuery({
    ...getEmployeeAdjacentQueryOptions(input),
    ...queryConfig,
  })
}
