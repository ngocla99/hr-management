import { z } from 'zod'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EmployeeApi } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'
import { EmployeesInput, getEmployeesQueryOptions } from './get-employees'

export const updateEmployeeSchema = z.object({
  id: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  gender: z.string().optional(),
  maritalStatus: z.string().optional(),
  religion: z.string().optional(),
  placeOfBirth: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),
  bloodType: z.string().optional(),
  residentialAddress: z.string().optional(),
  residentialAddressNotes: z.string().optional(),
  citizenIdAddress: z.string().optional(),
  citizenIdAddressNotes: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
  employeeId: z.string().optional(),
  dateStarted: z.coerce.date().optional(),
  jobRole: z.string().optional(),
  jobLevel: z.string().optional(),
  employmentType: z.string().optional(),
  department: z.string().optional(),
  contractEndDate: z.coerce.date().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>

export const updateEmployeeApi = (
  input: UpdateEmployeeInput
): Promise<EmployeeApi> => {
  const { id, ...rest } = input
  return apiClient.patch(`/employees/${id}`, rest)
}

type UseUpdateEmployeeOptions = {
  inputQuery?: EmployeesInput
  mutationConfig?: MutationConfig<typeof updateEmployeeApi>
}

export const useUpdateEmployee = ({
  inputQuery,
  mutationConfig,
}: UseUpdateEmployeeOptions = {}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEmployeesQueryOptions(inputQuery).queryKey,
      })
      onSuccess?.(...args)
      toast.success(t('messages.employeeUpdated', { ns: 'employee' }))
    },
    onError: (error: Error, ...args) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : t('messages.employeeUpdatedFailed', { ns: 'employee' })
      toast.error(errorMessage)
      onError?.(error, ...args)
    },
    ...restConfig,
    mutationFn: updateEmployeeApi,
  })
}
