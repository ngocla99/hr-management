import { getRouteApi } from '@tanstack/react-router'
import { Route as EmployeeRouteId } from '@/routes/_authenticated/organization/employee/$employeeId'
import { Main } from '@/components/layout/main'
import { EmployeeInfo } from '@/features/employee/components/details/employee-info'

const route = getRouteApi(EmployeeRouteId.id)
export function EmployeeDetailPage() {
  const search = route.useSearch()
  const tab = search?.tab || 'personal'

  const employee = route.useLoaderData()

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
