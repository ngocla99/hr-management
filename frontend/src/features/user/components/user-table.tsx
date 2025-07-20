import { getRouteApi } from '@tanstack/react-router'
import { User } from '@/types/api'
import { DataTableFilterField } from '@/types/common'
import { useTranslation } from 'react-i18next'
import { useDataTable } from '@/hooks/use-data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable } from '@/components/data-table/data-table'
import { UsersInput, useUsers } from '../api/get-users'
import {
  userRoleOptionsFn,
  userStatusOptionsFn,
} from '../constants/user-options'
import { useUserColumns } from './user-columns'
import { UsersTableToolbar } from './user-table-toolbar'

const route = getRouteApi('/_authenticated/organization/user')

export function UserTable() {
  const { t } = useTranslation()
  const columns = useUserColumns()
  const searchParams = route.useSearch() as UsersInput

  const { data, isLoading, error } = useUsers({
    input: {
      ...searchParams,
    },
  })

  const users = data?.data ?? []
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
    route,
    data: users,
    columns,
    rowCount: total,
    filterFields,
  })

  if (isLoading) {
    return (
      <div className='space-y-2'>
        <Skeleton className='h-8 w-full' />
        <Skeleton className='h-8 w-full' />
        <Skeleton className='h-8 w-full' />
        <Skeleton className='h-8 w-full' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-red-500'>Error: {error.message}</div>
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
