import React from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { User } from '@/types/api'
import { DataTableFilterField } from '@/types/common'
import { useTranslation } from 'react-i18next'
import { useDataTable } from '@/hooks/use-data-table'
import { DataTable } from '@/components/data-table/data-table'
import { EmployeeCardView } from '@/features/employee/components/table/employee-card-view'
import {
  employeeDepartmentOptionsFn,
  employeeRoleOptionsFn,
  employmentTypeOptionsFn,
} from '@/features/employee/constants/employee-options'
import { UsersInput, useUsers } from '@/features/user/api/get-users'
import { userStatusOptionsFn } from '@/features/user/constants/user-options'
import { useEmployeeColumns } from './employee-columns'
import { EmployeeTableToolbar } from './employee-table-toolbar'

const route = getRouteApi('/_authenticated/organization/employee')

export function EmployeeTable() {
  const { t } = useTranslation()
  const columns = useEmployeeColumns()
  const [viewMode, setViewMode] = React.useState<'table' | 'card'>('table')
  const searchParams = route.useSearch() as UsersInput

  const { data: usersData, isLoading } = useUsers({
    input: {
      ...searchParams,
    },
  })

  const users = usersData?.data ?? []
  const total = usersData?.pagination?.totalRecords ?? 0

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

  return (
    <div className='space-y-4'>
      <EmployeeTableToolbar
        table={table}
        filterFields={filterFields}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      {viewMode === 'table' ? (
        <DataTable table={table} />
      ) : (
        <EmployeeCardView table={table} />
      )}
    </div>
  )
}
