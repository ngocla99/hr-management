import React from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { User } from '@/types/api'
import { DataTableFilterField } from '@/types/common'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { useDataTable } from '@/hooks/use-data-table'
import { DataTable } from '@/components/data-table/data-table'
import { EmployeeCardSkeletonGrid } from '@/features/employee/components/table/employee-card-skeleton'
import { EmployeeCardView } from '@/features/employee/components/table/employee-card-view'
import {
  employeeDepartmentOptionsFn,
  employeeRoleOptionsFn,
  employmentTypeOptionsFn,
} from '@/features/employee/constants/employee-options'
import {
  UsersInput,
  useUsers,
  useUsersInfinite,
} from '@/features/user/api/get-users'
import { userStatusOptionsFn } from '@/features/user/constants/user-options'
import { useEmployeeColumns } from './employee-columns'
import { EmployeeTableToolbar } from './employee-table-toolbar'

const route = getRouteApi('/_authenticated/organization/employee')

export function EmployeeTable() {
  const { t } = useTranslation()
  const columns = useEmployeeColumns()
  const [viewMode, setViewMode] = React.useState<'table' | 'card'>('table')
  const searchParams = route.useSearch() as UsersInput
  const { ref, inView } = useInView()

  const { data: usersData, isLoading } = useUsers({
    input: {
      ...searchParams,
    },
    queryConfig: {
      enabled: viewMode === 'table',
    },
  })

  const {
    status: statusInfinite,
    data: usersInfiniteData,
    isFetching: isFetchingInfinite,
    isFetchingNextPage: isFetchingNextPageInfinite,
    fetchNextPage,
  } = useUsersInfinite({
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
  console.log(
    '🚀 ~ EmployeeTable ~ isFetchingNextPageInfinite:',
    isFetchingNextPageInfinite
  )

  const users =
    viewMode === 'table' ? (usersData?.data ?? []) : (usersInfiniteData ?? [])
  const total = usersData?.pagination?.totalRecords ?? 0

  React.useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  const filterFields: DataTableFilterField<User>[] = [
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
      value: 'status',
      options: userStatusOptionsFn(t),
      multiple: false,
    },
  ]

  const { table } = useDataTable({
    isLoading,
    route,
    data: users,
    columns,
    rowCount: total,
    filterFields,
  })

  const onSetViewMode = (mode: 'table' | 'card') => {
    setViewMode(mode)
    table.resetPageIndex()
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
        <DataTable table={table} />
      ) : (
        <>
          <EmployeeCardView table={table} />
          <div ref={ref} />
          {isFetchingNextPageInfinite && <EmployeeCardSkeletonGrid count={4} />}
        </>
      )}
    </div>
  )
}
