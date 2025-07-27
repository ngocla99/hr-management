import { z } from 'zod'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EmployeeApi } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'
import { USER_ROLES } from '@/features/user/constants/user-constants'
import {
  BLOOD_TYPES,
  DEPARTMENTS,
  EMPLOYMENT_TYPES,
  GENDERS,
  JOB_LEVELS,
  JOB_ROLES,
  MARITAL_STATUSES,
} from '../constants/employee-constants'
import { EmployeesInput, getEmployeesQueryOptions } from './get-employees'

export const createEmployeeSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  avatar: z.string().optional(),
  password: z.string(),
  role: z.enum(USER_ROLES),
  gender: z.enum(GENDERS).optional(),
  maritalStatus: z.enum(MARITAL_STATUSES).optional(),
  religion: z.string().optional(),
  placeOfBirth: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),
  bloodType: z.enum(BLOOD_TYPES).optional(),
  residentialAddress: z.string().optional(),
  residentialAddressNotes: z.string().optional(),
  citizenIdAddress: z.string().optional(),
  citizenIdAddressNotes: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
  employeeNumber: z.string().optional(),
  hireDate: z.coerce.date(),
  jobRole: z.enum(JOB_ROLES),
  jobLevel: z.enum(JOB_LEVELS),
  employmentType: z.enum(EMPLOYMENT_TYPES),
  department: z.enum(DEPARTMENTS),
  tags: z.array(z.string()).optional(),
})

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>

export const createEmployeeApi = (
  input: CreateEmployeeInput
): Promise<EmployeeApi> => {
  return apiClient.post('/employees', input)
}

type UseCreateEmployeeOptions = {
  inputQuery?: EmployeesInput
  mutationConfig?: MutationConfig<typeof createEmployeeApi>
}

export const useCreateEmployee = ({
  inputQuery,
  mutationConfig,
}: UseCreateEmployeeOptions = {}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEmployeesQueryOptions(inputQuery).queryKey,
      })
      toast.success(t('messages.employeeCreated', { ns: 'employee' }))
      onSuccess?.(...args)
    },
    onError: (error: Error, ...args) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : t('messages.employeeCreatedFailed', { ns: 'employee' })
      toast.error(errorMessage)
      onError?.(error, ...args)
    },
    ...restConfig,
    mutationFn: createEmployeeApi,
  })
}
