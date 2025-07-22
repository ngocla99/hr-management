import { getRouteApi } from '@tanstack/react-router'
import { Route as UserRoute } from '@/routes/_authenticated/organization/user'
import { User } from '@/types/api'
import { DataTableFilterField } from '@/types/common'
import { useTranslation } from 'react-i18next'
import { useDataTable } from '@/hooks/use-data-table'
import { DataTable } from '@/components/data-table/data-table'
import { UsersInput, useUsers } from '@/features/user/api/get-users'
import {
  userRoleOptionsFn,
  userStatusOptionsFn,
} from '@/features/user/constants/user-options'
import { useUserColumns } from './user-columns'
import { UsersTableToolbar } from './user-table-toolbar'

const route = getRouteApi(UserRoute.id)

export function UserTable() {
  const { t } = useTranslation()
  const columns = useUserColumns()
  const searchParams = route.useSearch() as UsersInput

  const { data, isLoading, error } = useUsers({
    input: {
      ...searchParams,
    },
  })

  const total = data?.pagination?.totalRecords ?? 0

  const filterFields: DataTableFilterField<User>[] = [
    {
      label: t('username', { ns: 'glossary' }),
      value: 'username',
      placeholder: t('filter.username.placeholder', { ns: 'users' }),
    },
    {
      label: t('role', { ns: 'glossary' }),
      value: 'role',
      options: userRoleOptionsFn(t),
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
    data: data?.data ?? [],
    columns,
    rowCount: total,
    filterFields,
  })

  if (error) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-destructive text-lg'>Error: {error.message}</div>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <UsersTableToolbar table={table} filterFields={filterFields} />
      <DataTable table={table} />
    </div>
  )
}
