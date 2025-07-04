import React from 'react'
import { endOfMonth, parseISO, startOfMonth } from 'date-fns'
import { getRouteApi } from '@tanstack/react-router'
import { RowData } from '@tanstack/react-table'
import { DataTableFilterField } from '@/types/common'
import { TrashIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatDateMappingBackend } from '@/lib/date'
import { TaskSchema } from '@/lib/validations/task'
import { useDataTable } from '@/hooks/use-data-table'
import { Button } from '@/components/ui/button'
import { SingleDayPicker } from '@/components/ui/single-day-picker'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import { priorityOptions, statusOptions } from '../data/data'
import { useDeleteTask, useTasks } from '../hooks/use-tasks-api'
import { useColumns } from './tasks-columns'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string
  }
}

const route = getRouteApi('/_authenticated/tasks/')

export function TaskTable() {
  const columns = useColumns()
  const { t } = useTranslation()
  const { page, limit, status, priority, startDate, dueDate } =
    route.useSearch()

  const navigate = route.useNavigate()

  // Convert string dates to Date objects for the picker
  const startDateValue = startDate ? parseISO(startDate) : undefined
  const dueDateValue = dueDate ? parseISO(dueDate) : undefined

  // Default values must match those in the route schema
  const defaultStartDate = formatDateMappingBackend(startOfMonth(new Date()))
  const defaultDueDate = formatDateMappingBackend(endOfMonth(new Date()))

  const [openDeleteAll, setOpenDeleteAll] = React.useState(false)

  // Handlers to update the route search params
  const handleStartDateChange = (date: Date | undefined) => {
    navigate({
      search: (prev) => ({
        ...prev,
        startDate: date ? formatDateMappingBackend(date) : defaultStartDate,
        page: 1, // reset to first page on filter change
      }),
      replace: false,
    })
  }

  const handleDueDateChange = (date: Date | undefined) => {
    navigate({
      search: (prev) => ({
        ...prev,
        dueDate: date ? formatDateMappingBackend(date) : defaultDueDate,
        page: 1, // reset to first page on filter change
      }),
      replace: false,
    })
  }

  const { tasks, isLoading, error, total } = useTasks({
    page,
    limit,
    status,
    priority,
    startDate,
    dueDate,
  })

  const filterFields: DataTableFilterField<TaskSchema>[] = [
    {
      label: t('status', { ns: 'glossary' }),
      value: 'status',
      options: statusOptions,
      multiple: false,
    },
    {
      label: t('priority', { ns: 'glossary' }),
      value: 'priority',
      options: priorityOptions,
      multiple: false,
    },
  ]

  const { table } = useDataTable({
    route,
    data: tasks,
    columns,
    rowCount: total,
    filterFields,
  })
  const selectedRowIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id)

  const deleteAllMutation = useDeleteTask({
    onSuccess: () => {
      setOpenDeleteAll(false)
      table.resetRowSelection()
    },
  })

  const handleDeleteAll = () => {
    deleteAllMutation.mutate({ ids: selectedRowIds })
  }

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
      <DataTableToolbar table={table} filterFields={filterFields}>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium'>
              {t('startDate', { ns: 'glossary' })}:
            </span>
            <SingleDayPicker
              value={startDateValue}
              onChange={handleStartDateChange}
              placeholder={t('selectStartDate', { ns: 'glossary' })}
            />
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium'>
              {t('dueDate', { ns: 'glossary' })}:
            </span>
            <SingleDayPicker
              value={dueDateValue}
              onChange={handleDueDateChange}
              placeholder={t('selectDueDate', { ns: 'glossary' })}
            />
          </div>

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
      </DataTableToolbar>
      <DataTable table={table} />
      <ConfirmDialog
        open={openDeleteAll}
        onOpenChange={setOpenDeleteAll}
        title={t('deleteAll', { ns: 'common' })}
        desc={t('dialog.deleteConfirm')}
        confirmText={t('delete')}
        destructive
        handleConfirm={handleDeleteAll}
      />
    </div>
  )
}
