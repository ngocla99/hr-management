import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { PAGINATION } from '@/lib/constants/constant'
import Employee from '@/features/employee'
import { EMPLOYMENT_TYPES } from '@/features/employee/constants/employee-constants'
import {
  USER_ROLES,
  USER_STATUSES,
} from '@/features/user/constants/user-constants'

const employeeSearchSchema = z.object({
  page: z.number().optional().default(PAGINATION.DEFAULT_PAGE),
  limit: z.number().optional().default(PAGINATION.DEFAULT_LIMIT),
  sort: z.string().optional().default('createdAt.desc'),
  status: z.enum(USER_STATUSES).optional(),
  role: z.array(z.enum(USER_ROLES)).optional(),
  jobRole: z.string().optional(),
  employmentType: z.enum(EMPLOYMENT_TYPES).optional(),
  username: z.string().optional(),
})

export type EmployeeSearch = z.infer<typeof employeeSearchSchema>

export const Route = createFileRoute('/_authenticated/organization/employee')({
  validateSearch: (search) => employeeSearchSchema.parse(search),
  component: Employee,
})
