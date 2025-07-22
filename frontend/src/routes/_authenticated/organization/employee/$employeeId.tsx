import { Main } from '@/components/layout/main'
import { EmployeeInfo } from '@/features/employee/components/details'
import apiClient from '@/lib/api-client'
import { User } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const employeeDetailSearchSchema = z.object({
  tab: z.string().optional().default('personal'),
})

export const Route = createFileRoute(
  '/_authenticated/organization/employee/$employeeId'
)({
  validateSearch: employeeDetailSearchSchema,
  component: EmployeeDetailPage,
})

export type EmployeeDetailSearch = z.infer<typeof employeeDetailSearchSchema>

// Simple API call to get user by ID
const getUserById = (id: string): Promise<User> => {
  return apiClient.get(`/users/${id}`)
}

function EmployeeDetailPage() {
  const { employeeId } = Route.useParams()
  const search = Route.useSearch()
  const tab = search?.tab || 'personal'

  const { data: employee, isLoading } = useQuery({
    queryKey: ['users', employeeId],
    queryFn: () => getUserById(employeeId),
  })

  if (isLoading) {
    return (
      <Main>
        <div className='flex h-96 items-center justify-center'>
          <div className='text-center'>
            <div className='border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2'></div>
            <p className='text-muted-foreground mt-2'>
              Loading employee details...
            </p>
          </div>
        </div>
      </Main>
    )
  }

  if (!employee) {
    return (
      <Main>
        <div className='flex h-96 items-center justify-center'>
          <div className='text-center'>
            <h2 className='text-xl font-semibold'>Employee Not Found</h2>
            <p className='text-muted-foreground'>
              The employee you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </Main>
    )
  }

  return (
    <Main>
      <EmployeeInfo
        employee={employee}
        defaultTab={tab}
        onPrevious={() => {
          // TODO: Implement navigation to previous employee
          console.log('Navigate to previous employee')
        }}
        onNext={() => {
          // TODO: Implement navigation to next employee
          console.log('Navigate to next employee')
        }}
        currentIndex={1}
        totalCount={32}
      />
    </Main>
  )
}
