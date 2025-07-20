import React from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { User } from '@/types/api'
import { DataTableFilterField } from '@/types/common'
import { useTranslation } from 'react-i18next'
import { useDataTable } from '@/hooks/use-data-table'
import { DataTable } from '@/components/data-table/data-table'
import { userStatusOptionsFn } from '@/features/user/constants/user-options'
import {
  employeeDepartmentOptionsFn,
  employeeRoleOptionsFn,
  employmentTypeOptionsFn,
} from '../constants/employee-options'
import { EmployeeCardView } from './employee-card-view'
import { useEmployeeColumns } from './employee-columns'
import { EmployeeTableToolbar } from './employee-table-toolbar'

interface EmployeeTableProps {
  users: User[]
  total: number
}

const route = getRouteApi('/_authenticated/organization/employee')

export function EmployeeTable({ users, total }: EmployeeTableProps) {
  const { t } = useTranslation()
  const columns = useEmployeeColumns()
  const [viewMode, setViewMode] = React.useState<'table' | 'card'>('table')

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
