import { getRouteApi } from '@tanstack/react-router'
import { Route as EmployeeRoute } from '@/routes/_authenticated/organization/employee'
import { useTranslation } from 'react-i18next'
import { Main } from '@/components/layout/main'
import { EmployeePrimaryButtons } from '@/features/employee/components/employee-primary-buttons'
import { EmployeeTable } from '@/features/employee/components/table/employee-table'
import EmployeeProvider from '@/features/employee/context/employee-context'
import { EmployeeStatsInput, useEmployeeStats } from '../api/get-employee-stats'

const route = getRouteApi(EmployeeRoute.id)
function EmployeeContent() {
  const { t } = useTranslation()
  const searchParams = route.useSearch() as EmployeeStatsInput
  const { data: statsData } = useEmployeeStats({
    input: {
      employmentStatus: searchParams.employmentStatus,
      jobRole: searchParams.jobRole,
      department: searchParams.department,
      employmentType: searchParams.employmentType,
      employeeNumber: searchParams.employeeNumber,
    },
  })

  return (
    <>
      <Main>
        <div className='space-y-6'>
          {/* Header */}
          <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
            <div>
              <div className='flex items-center space-x-2'>
                <h1 className='text-2xl font-bold tracking-tight'>
                  {t('employees', { ns: 'glossary' })}
                </h1>
              </div>
              <div className='mt-2 flex items-center space-x-4'>
                <div className='flex items-center space-x-1.5 text-xs'>
                  <div className='size-1.5 rounded-full bg-[#9dc082]' />
                  <span>
                    {t('status.active', { ns: 'users' })}{' '}
                    {statsData?.active ?? 0}
                  </span>
                </div>
                <div className='flex items-center space-x-1.5 text-xs'>
                  <div className='size-1.5 rounded-full bg-[#1d212c]' />
                  <span>
                    {t('status.inactive', { ns: 'users' })}{' '}
                    {statsData?.inactive ?? 0}
                  </span>
                </div>
              </div>
            </div>

            <EmployeePrimaryButtons />
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1'>
            <EmployeeTable />
          </div>
        </div>
      </Main>
    </>
  )
}

export default function EmployeesPage() {
  return (
    <EmployeeProvider>
      <EmployeeContent />
    </EmployeeProvider>
  )
}
