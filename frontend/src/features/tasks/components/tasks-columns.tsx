import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import { TaskPriority, TaskSchema, TaskStatus } from '@/lib/validations/task'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { useTasks } from '../context/tasks-context'
import { TaskTableRowActions } from './tasks-table-row-actions'

const statusColorMap = {
  Open: 'bg-gray-100 text-gray-800 border-gray-200',
  InProgress: 'bg-blue-100 text-blue-800 border-blue-200',
  Resolved: 'bg-green-100 text-green-800 border-green-200',
  Completed: 'bg-green-100 text-green-800 border-green-200',
}

const priorityColorMap = {
  Low: 'bg-gray-100 text-gray-800 border-gray-200',
  Medium: 'bg-blue-100 text-blue-800 border-blue-200',
  High: 'bg-red-100 text-red-800 border-red-200',
}

export const useColumns = (): ColumnDef<TaskSchema>[] => {
  const { t } = useTranslation()
  const { setOpen, setCurrentRow } = useTasks()

  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='translate-y-[2px]'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='translate-y-[2px]'
        />
      ),
      enableSorting: false,
      enableHiding: false,
      meta: {
        className: cn(
          'sticky md:table-cell left-0 z-10 rounded-tl',
          'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
        ),
      },
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('title', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => (
        <div
          className='max-w-48 cursor-pointer truncate font-medium'
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('update')
          }}
        >
          {row.getValue('title')}
        </div>
      ),
      meta: { className: 'w-48' },
    },
    {
      accessorKey: 'project',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('project', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => {
        const project = row.original.project
        if (!project) return null
        return (
          <div className='max-w-32 truncate font-medium'>{project.name}</div>
        )
      },
      meta: { className: 'w-32' },
    },
    {
      accessorKey: 'assignee',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('assignee', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => {
        const assignee = row.original.assignee
        if (!assignee)
          return <span className='text-muted-foreground'>Unassigned</span>
        return <div className='max-w-32 truncate'>{assignee.name}</div>
      },
      meta: { className: 'w-32' },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('status', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => {
        const status = row.getValue('status') as TaskStatus
        const badgeColor = statusColorMap[status]
        const statusKey = status.toLowerCase().replace('_', '')
        return (
          <div className='flex space-x-2'>
            <Badge variant='outline' className={cn('capitalize', badgeColor)}>
              {t(`status.${statusKey}` as any, { ns: 'glossary' })}
            </Badge>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('priority', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => {
        const priority = row.getValue('priority') as TaskPriority
        const badgeColor = priorityColorMap[priority]
        const priorityKey = priority.toLowerCase()
        return (
          <div className='flex space-x-2'>
            <Badge variant='outline' className={cn('capitalize', badgeColor)}>
              {t(`priority.${priorityKey}` as any, { ns: 'glossary' })}
            </Badge>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'donePct',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('progress', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => {
        const progress = row.getValue('donePct') as number
        return (
          <div className='flex items-center space-x-2'>
            <div className='h-2 w-full rounded-full bg-gray-200'>
              <div
                className='h-2 rounded-full bg-blue-600'
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className='text-muted-foreground text-sm'>{progress}%</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'dueDate',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('date.due', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => {
        const date = row.getValue('dueDate') as string
        if (!date)
          return <span className='text-muted-foreground'>No due date</span>
        return <div className='text-sm'>{formatDate(date)}</div>
      },
      enableColumnFilter: false,
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('actions', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => <TaskTableRowActions row={row} />,
    },
  ]
}
