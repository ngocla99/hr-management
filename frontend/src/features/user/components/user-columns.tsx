import { ColumnDef } from '@tanstack/react-table'
import { User } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import LongText from '@/components/long-text'
import { userStatusStyles } from '../constants/user-helpers'
import { userRoleOptions } from '../constants/user-options'
import { UsersTableRowActions } from './user-table-row-actions'

export const useUserColumns = (): ColumnDef<User>[] => {
  const { t } = useTranslation()
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
      accessorKey: 'username',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('username', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-36'>{row.getValue('username')}</LongText>
      ),
      meta: { className: 'w-36' },
    },
    {
      accessorKey: 'fullName',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('fullName', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-36'>{row.getValue('fullName')}</LongText>
      ),
      meta: { className: 'w-36' },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('email', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => (
        <div className='w-fit text-nowrap'>{row.getValue('email')}</div>
      ),
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
        const { status } = row.original
        const badgeVariant = userStatusStyles.get(status)
        return (
          <div className='flex space-x-2'>
            <Badge variant={badgeVariant as any} className={cn('capitalize')}>
              {t(('status.' + status) as any, {
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
      accessorKey: 'role',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('role', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => {
        const { role } = row.original
        const userType = userRoleOptions.find(({ value }) => value === role)

        if (!userType) {
          return null
        }

        return (
          <div className='flex items-center gap-x-2'>
            {userType.icon && (
              <userType.icon size={16} className='text-muted-foreground' />
            )}
            <span className='text-sm capitalize'>
              {t(userType.labelKey as any, { ns: 'glossary' })}
            </span>
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
      cell: ({ row }) => <div>{formatDate(row.getValue('createdAt'))}</div>,
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('updatedAt', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => <div>{formatDate(row.getValue('updatedAt'))}</div>,
    },
    {
      id: 'actions',
      cell: UsersTableRowActions,
    },
  ]
}
