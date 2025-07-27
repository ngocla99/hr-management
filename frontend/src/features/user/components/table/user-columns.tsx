import { ColumnDef } from '@tanstack/react-table'
import { UserApi } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import LongText from '@/components/long-text'
import { userStatusStyles } from '@/features/user/constants/user-helpers'
import { userRoleOptionsFn } from '@/features/user/constants/user-options'
import { UsersTableRowActions } from './user-table-row-actions'

export const checkboxClass =
  'sticky md:table-cell left-0 z-10 rounded-tl bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted w-12'

export const useUserColumns = (): ColumnDef<UserApi>[] => {
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
      meta: { className: checkboxClass },
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
        <LongText className='max-w-36 capitalize'>
          {row.getValue('fullName')}
        </LongText>
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
      meta: { align: 'center' },
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
          <Badge
            variant={badgeVariant as any}
            className={cn('capitalize')}
            hasDot
          >
            {t(('status.' + status) as any, {
              ns: 'users',
            })}
          </Badge>
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
        const userType = userRoleOptionsFn(t).find(
          ({ value }) => value === role
        )

        if (!userType) {
          return null
        }

        return (
          <div className='flex items-center gap-x-2'>
            {userType.icon && (
              <userType.icon size={16} className='text-muted-foreground' />
            )}
            <span className='text-sm capitalize'>{userType.label}</span>
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
      meta: { className: 'w-12' },
      cell: UsersTableRowActions,
    },
  ]
}
