import React from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { Row } from '@tanstack/react-table'
import { Route as EmployeeRoute } from '@/routes/_authenticated/organization/employee'
import { Route as EmployeeDetailRoute } from '@/routes/_authenticated/organization/employee/$employeeId'
import { DataTableFilterField } from '@/types/common'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { useDataTable } from '@/hooks/use-data-table'
import { DataTable } from '@/components/data-table/data-table'
import {
  EmployeesInput,
  useEmployees,
  useEmployeesInfinite,
} from '@/features/employee/api/get-employees'
import { EmployeeCardSkeletonGrid } from '@/features/employee/components/table/employee-card-skeleton'
import { EmployeeCardView } from '@/features/employee/components/table/employee-card-view'
import {
  employeeDepartmentOptionsFn,
  employeeRoleOptionsFn,
  employmentTypeOptionsFn,
} from '@/features/employee/constants/employee-options'
import { Employee } from '@/features/employee/type/employee'
import { userStatusOptionsFn } from '@/features/user/constants/user-options'
import { useEmployeeColumns } from './employee-columns'
import { EmployeeTableToolbar } from './employee-table-toolbar'

const route = getRouteApi(EmployeeRoute.id)
export function EmployeeTable() {
  const { t } = useTranslation()
  const columns = useEmployeeColumns()
  const [viewMode, setViewMode] = React.useState<'table' | 'card'>('table')
  const searchParams = route.useSearch() as EmployeesInput
  const navigate = route.useNavigate()
  const { ref, inView } = useInView()

  const { data: employeesData, isLoading } = useEmployees({
    input: {
      ...searchParams,
    },
    queryConfig: {
      enabled: viewMode === 'table',
    },
  })

  const {
    status: statusInfinite,
    data: employeesInfiniteData,
    isFetchingNextPage: isFetchingNextPageInfinite,
    fetchNextPage,
  } = useEmployeesInfinite({
    input: {
      username: searchParams.username,
      jobRole: searchParams.jobRole,
      employmentType: searchParams.employmentType,
      department: searchParams.department,
      status: searchParams.status,
      sort: searchParams.sort,
      limit: 12,
    },
    queryConfig: {
      enabled: viewMode === 'card',
    },
  })

  const employees =
    viewMode === 'table'
      ? (employeesData?.data ?? [])
      : (employeesInfiniteData ?? [])
  const total = employeesData?.pagination?.totalRecords ?? 0

  React.useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  const filterFields: DataTableFilterField<Employee>[] = [
    {
      label: t('employeeName', { ns: 'glossary' }),
      value: 'fullName',
      placeholder: t('form.searchEmployees', { ns: 'employee' }),
    },
    {
      label: t('type', { ns: 'glossary' }),
      value: 'employmentType',
      options: employmentTypeOptionsFn(t),
    },
    {
      label: t('team', { ns: 'glossary' }),
      value: 'department',
      options: employeeDepartmentOptionsFn(t),
    },
    {
      label: t('role', { ns: 'glossary' }),
      value: 'jobRole',
      options: employeeRoleOptionsFn(t),
    },
    {
      label: t('status', { ns: 'glossary' }),
      value: 'employmentStatus',
      options: userStatusOptionsFn(t),
      multiple: false,
    },
  ]

  const { table } = useDataTable({
    isLoading,
    route,
    data: employees,
    columns,
    rowCount: total,
    filterFields,
  })

  const onSetViewMode = (mode: 'table' | 'card') => {
    setViewMode(mode)
  }

  const navigateToDetail = (row: Row<Employee>) => {
    navigate({
      to: EmployeeDetailRoute.fullPath,
      params: { employeeId: row.original.id },
    })
  }

  return (
    <div className='space-y-4'>
      <EmployeeTableToolbar
        table={table}
        filterFields={filterFields}
        viewMode={viewMode}
        setViewMode={onSetViewMode}
      />
      {viewMode === 'table' ? (
        <DataTable table={table} onRowClick={navigateToDetail} />
      ) : (
        <>
          {statusInfinite === 'pending' ? (
            <EmployeeCardSkeletonGrid count={8} />
          ) : (
            <>
              <EmployeeCardView table={table} />
              <div ref={ref} />
            </>
          )}

          {isFetchingNextPageInfinite && <EmployeeCardSkeletonGrid count={4} />}
        </>
      )}
    </div>
  )
}
