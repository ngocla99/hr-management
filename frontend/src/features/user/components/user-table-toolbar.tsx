import React from 'react'
import { Cross2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
import { userTypesFn } from '../data/data'
import { User } from '../data/schema'

interface UsersTableToolbarProps<TData> {
  table: Table<TData>
  onDeleteAll: (onSuccess: () => void) => void
}

export function UsersTableToolbar({
  table,
  onDeleteAll,
}: UsersTableToolbarProps<User>) {
  const { t } = useTranslation()
  const isFiltered = table.getState().columnFilters.length > 0
  const [openDeleteAll, setOpenDeleteAll] = React.useState(false)

  const selectedRowIds = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original.id)

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder={t('filter.placeholder', { ns: 'users' })}
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title={t('status', { ns: 'glossary' })}
              options={[
                {
                  label: t('status.active', { ns: 'glossary' }),
                  value: 'active',
                },
                {
                  label: t('status.inactive', { ns: 'glossary' }),
                  value: 'inactive',
                },
                {
                  label: t('status.suspended', { ns: 'glossary' }),
                  value: 'suspended',
                },
              ]}
            />
          )}
          {table.getColumn('role') && (
            <DataTableFacetedFilter
              column={table.getColumn('role')}
              title={t('role', { ns: 'glossary' })}
              options={userTypesFn(t).map((t) => ({ ...t }))}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            {t('reset', { ns: 'common' })}
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
        {selectedRowIds.length > 0 && (
          <Button
            variant='destructive'
            className='h-8'
            onClick={() => setOpenDeleteAll(true)}
          >
            <TrashIcon className='mr-2 h-4 w-4' />
            {t('deleteAll', { ns: 'common' })}
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
      <ConfirmDialog
        open={openDeleteAll}
        onOpenChange={setOpenDeleteAll}
        title={t('deleteAll', { ns: 'common' })}
        desc={t('dialog.deleteConfirm')}
        confirmText={t('delete')}
        destructive
        handleConfirm={() => onDeleteAll(() => setOpenDeleteAll(false))}
      />
    </div>
  )
}
