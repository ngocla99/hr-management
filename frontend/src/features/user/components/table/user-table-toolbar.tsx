import { getRouteApi } from '@tanstack/react-router'
import { Table } from '@tanstack/react-table'
import { Route as UserRoute } from '@/routes/_authenticated/organization/user'
import { UserApi } from '@/types/api'
import { DataTableFilterField } from '@/types/common'
import { TrashIcon } from 'lucide-react'
import { Trans, useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { SingleDayPicker } from '@/components/ui/single-day-picker'
import confirm from '@/components/confirm'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import { useDeleteUsers } from '@/features/user/api/delete-users'
import { UsersInput } from '@/features/user/api/get-users'

interface UsersTableToolbarProps<TData> {
  table: Table<TData>
  filterFields: DataTableFilterField<TData>[]
}

const route = getRouteApi(UserRoute.id)

export function UsersTableToolbar({
  table,
  filterFields,
}: UsersTableToolbarProps<UserApi>) {
  const navigate = route.useNavigate()

  const { t } = useTranslation()
  const selectedRowIds = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original.id)

  const searchParams = route.useSearch() as UsersInput
  const deleteUsersMutation = useDeleteUsers({
    inputQuery: {
      ...searchParams,
    },
    mutationConfig: {
      onSuccess: () => {
        table.resetRowSelection()
      },
    },
  })

  const handleDeleteAll = () => {
    if (selectedRowIds.length === 0 || deleteUsersMutation.isPending) return

    confirm({
      type: 'warning',
      title: t('dialog.delete.title', { ns: 'users' }),
      description: (
        <Trans
          i18nKey='dialog.delete.confirm'
          values={{ count: selectedRowIds.length }}
          ns='users'
        />
      ),
      confirmText: t('delete', { ns: 'common' }),
      cancelText: t('cancel', { ns: 'common' }),
      onConfirm: () => {
        deleteUsersMutation.mutate({ ids: selectedRowIds })
      },
    })
  }

  const handleCreatedAtFromChange = (date: Date | undefined) => {
    navigate({
      search: (prev) => ({ ...prev, createdAtFrom: date }),
    })
  }

  return (
    <DataTableToolbar table={table} filterFields={filterFields}>
      <div className='flex flex-wrap items-center gap-2'>
        <div className='flex items-center gap-2'>
          <SingleDayPicker
            value={searchParams.createdAtFrom}
            onChange={handleCreatedAtFromChange}
            placeholder={t('form.selectCreatedAtFrom', { ns: 'glossary' })}
          />
        </div>
        {selectedRowIds.length > 0 && (
          <Button
            variant='destructive'
            className='h-8'
            onClick={handleDeleteAll}
          >
            <TrashIcon className='mr-2 h-4 w-4' />
            {t('deleteUsers', { count: selectedRowIds.length, ns: 'users' })}
          </Button>
        )}
      </div>
    </DataTableToolbar>
  )
}
