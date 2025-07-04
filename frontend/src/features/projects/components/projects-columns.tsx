import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import LongText from '@/components/long-text'
import { Project } from '../data/schema'
import { ProjectsTableRowActions } from './projects-table-row-actions'

const statusColorMap = {
  active: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  paused: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
}

const priorityColorMap = {
  Low: 'bg-gray-100 text-gray-800 border-gray-200',
  Medium: 'bg-blue-100 text-blue-800 border-blue-200',
  High: 'bg-orange-100 text-orange-800 border-orange-200',
}

export const useProjectsColumns = (): ColumnDef<Project>[] => {
  const { t } = useTranslation(['projects', 'glossary'])
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
      meta: {
        className: cn(
          'sticky md:table-cell left-0 z-10 rounded-tl',
          'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
        ),
      },
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
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('name', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-48 font-medium'>
          {row.getValue('name')}
        </LongText>
      ),
      meta: { className: 'w-48' },
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('description', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => (
        <LongText className='text-muted-foreground max-w-64'>
          {row.getValue('description')}
        </LongText>
      ),
      meta: { className: 'w-64' },
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
        const status = row.getValue('status') as Project['status']
        const badgeColor = statusColorMap[status]
        return (
          <div className='flex space-x-2'>
            <Badge variant='outline' className={cn('capitalize', badgeColor)}>
              {t(('status.' + row.getValue('status')) as any, {
                ns: 'glossary',
              })}
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
        const priority = row.getValue('priority') as Project['priority']
        const badgeColor = priorityColorMap[priority]
        const priorityKey = priority.toLowerCase()
        return (
          <div className='flex space-x-2'>
            <Badge variant='outline' className={cn('capitalize', badgeColor)}>
              {t(('priority.' + priorityKey) as any, {
                ns: 'glossary',
              })}
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
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('createdAt', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => (
        <div className='text-sm'>{formatDate(row.getValue('createdAt'))}</div>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('updatedAt', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => (
        <div className='text-sm'>{formatDate(row.getValue('updatedAt'))}</div>
      ),
    },
    {
      id: 'actions',
      cell: ProjectsTableRowActions,
    },
  ]
}
