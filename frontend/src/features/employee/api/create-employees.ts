import { z } from 'zod'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EmployeeApi } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'
import { createEmployeeSchema } from './create-employee'
import { EmployeesInput, getEmployeesQueryOptions } from './get-employees'

export const createEmployeesSchema = z.object({
  employees: z.array(createEmployeeSchema),
})

export type CreateEmployeesInput = z.infer<typeof createEmployeesSchema>

export const createEmployeesApi = (
  input: CreateEmployeesInput
): Promise<EmployeeApi[]> => {
  return apiClient.post('/employees/create-many', input)
}

type UseCreateEmployeesOptions = {
  inputQuery?: EmployeesInput
  mutationConfig?: MutationConfig<typeof createEmployeesApi>
}

export const useCreateEmployees = ({
  inputQuery,
  mutationConfig,
}: UseCreateEmployeesOptions = {}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEmployeesQueryOptions(inputQuery).queryKey,
      })
      toast.success(t('messages.employeesCreated', { ns: 'employee' }))
      onSuccess?.(...args)
    },
    onError: (error: Error, ...args) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : t('messages.employeesCreatedFailed', { ns: 'employee' })
      toast.error(errorMessage)
      onError?.(error, ...args)
    },
    ...restConfig,
    mutationFn: createEmployeesApi,
  })
}
