import { getRouteApi } from '@tanstack/react-router'
import { RowData } from '@tanstack/react-table'
import { User, UserRole, UserStatus } from '@/types/api'
import { DataTableFilterField } from '@/types/common'
import { useTranslation } from 'react-i18next'
import { useDataTable } from '@/hooks/use-data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable } from '@/components/data-table/data-table'
import { useDeleteUsers } from '../api/delete-users'
import { useUsers } from '../api/get-users'
import {
  userRoleOptionsFn,
  userStatusOptionsFn,
} from '../constants/user-options'
import { useUserColumns } from './user-columns'
import { UsersTableToolbar } from './user-table-toolbar'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string
  }
}

const route = getRouteApi('/_authenticated/organization/user')

export function UserTable() {
  const { t } = useTranslation()
  const columns = useUserColumns()
  const { page, limit, status, role } = route.useSearch()

  const { data, isLoading, error } = useUsers({
    input: {
      page,
      limit,
      status: status as UserStatus,
      role: role as UserRole[],
    },
  })

  const users = data?.data ?? []
  const total = data?.pagination?.totalRecords ?? 0

  const filterFields: DataTableFilterField<User>[] = [
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

  const deleteUsersMutation = useDeleteUsers({
    mutationConfig: {
      onSuccess: () => {
        table.resetRowSelection()
      },
    },
  })

  // const selectedRowIds = table
  //   .getFilteredSelectedRowModel()
  //   .rows.map((row) => row.original.id)

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
