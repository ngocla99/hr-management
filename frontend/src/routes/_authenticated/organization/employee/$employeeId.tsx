import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { getEmployeeApi } from '@/features/employee/api/get-employee'
import { EmployeeDetailSkeleton } from '@/features/employee/components/details/employee-detail-skeleton'
import { EmployeeDetailPage } from '@/features/employee/pages/employee-detail'
import { transformEmployee } from '@/features/employee/utils/transform-employee'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'

const employeeDetailSearchSchema = z.object({
  tab: z.string().optional().default('personal'),
})

export const Route = createFileRoute(
  '/_authenticated/organization/employee/$employeeId'
)({
  loader: async ({ params: { employeeId } }) => {
    const employee = await getEmployeeApi(employeeId)
    return transformEmployee(employee)
  },
  validateSearch: employeeDetailSearchSchema,
  component: EmployeeDetailPage,
  errorComponent: GeneralError,
  notFoundComponent: NotFoundError,
  pendingComponent: EmployeeDetailSkeleton,
})

export type EmployeeDetailSearch = z.infer<typeof employeeDetailSearchSchema>
