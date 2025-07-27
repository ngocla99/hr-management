import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { PAGINATION } from '@/lib/constants/constant'
import {
  DEPARTMENTS,
  EMPLOYMENT_STATUSES,
  EMPLOYMENT_TYPES,
  JOB_ROLES,
} from '@/features/employee/constants/employee-constants'
import EmployeesPage from '@/features/employee/pages/employees'

const employeeSearchSchema = z.object({
  page: z.number().default(PAGINATION.DEFAULT_PAGE),
  limit: z.number().default(PAGINATION.DEFAULT_LIMIT),
  sort: z.string().default('createdAt.desc'),
  employmentStatus: z.enum(EMPLOYMENT_STATUSES).optional(),
  jobRole: z.array(z.enum(JOB_ROLES)).optional(),
  department: z.array(z.enum(DEPARTMENTS)).optional(),
  employmentType: z.array(z.enum(EMPLOYMENT_TYPES)).optional(),
  employeeNumber: z.string().optional(),
})

export type EmployeeSearch = z.infer<typeof employeeSearchSchema>

export const Route = createFileRoute('/_authenticated/organization/employee/')({
  validateSearch: (search) => employeeSearchSchema.parse(search),
  component: EmployeesPage,
})
