import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { User } from '@/types/api'
import {
  IconDots,
  IconEdit,
  IconEye,
  IconMail,
  IconTrash,
} from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { VariantProps } from 'class-variance-authority'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { employeeStatusStyles } from '../constants/employee-helpers'
import { useEmployee } from '../context/employee-context'

export const useEmployeeColumns = () => {
  const { t } = useTranslation()
  const { setOpen } = useEmployee()

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
        meta: { className: 'w-12' },
      },
      {
        accessorKey: 'fullName',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('fullName', { ns: 'glossary' })}
          />
        ),
        cell: ({ row }) => {
          const employee = row.original
          return (
            <div className='flex items-center space-x-3'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={employee.avatar} alt={employee.fullName} />
                <AvatarFallback>
                  {employee.firstName.charAt(0)}
                  {employee.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <div className='font-medium text-gray-900'>
                  {employee.fullName}
                </div>
                <div className='text-sm text-gray-500'>{employee.jobRole}</div>
              </div>
            </div>
          )
        },
        enableSorting: true,
        meta: { className: 'min-w-[200px]' },
      },
      {
        accessorKey: 'contact',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('contact', { ns: 'glossary' })}
          />
        ),
        cell: ({ row }) => {
          const employee = row.original
          return (
            <div className='space-y-1'>
              <div className='flex items-center space-x-2 text-sm'>
                <IconMail className='h-4 w-4 text-gray-400' />
                <span>{employee.email}</span>
              </div>
              <div className='text-sm text-gray-500'>{employee.phoneNumber}</div>
            </div>
          )
        },
        enableSorting: false,
        meta: { className: 'min-w-[200px]' },
      },
      {
        accessorKey: 'team',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('team', { ns: 'glossary' })}
          />
        ),
        cell: ({ row }) => (
          <div className='font-medium'>{row.getValue('team')}</div>
        ),
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
        meta: { className: 'w-32' },
      },
      {
        accessorKey: 'dateJoined',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('dateJoined', { ns: 'glossary' })}
          />
        ),
        cell: ({ row }) => (
          <div className='text-sm'>{row.getValue('dateJoined')}</div>
        ),
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
          const { status } = row.original
          const badgeVariant = employeeStatusStyles.get(status) as VariantProps<
            typeof badgeVariants
          >['variant']
          return (
            <Badge variant={badgeVariant} className={cn('capitalize')}>
              {t(('status.' + status) as any, {
                ns: 'users',
              })}
            </Badge>
          )
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
        enableSorting: false,
        meta: { className: 'w-28' },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const employee = row.original
          return (
            <div className='grid place-items-center'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
                  >
                    <IconDots className='h-4 w-4' />
                    <span className='sr-only'>Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-[160px]'>
                  <DropdownMenuItem onClick={() => setOpen('view')}>
                    <IconEye className='mr-2 h-4 w-4' />
                    {t('view', { ns: 'common' })}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOpen('edit')}>
                    <IconEdit className='mr-2 h-4 w-4' />
                    {t('edit', { ns: 'common' })}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOpen('invite')}>
                    <IconMail className='mr-2 h-4 w-4' />
                    {t('inviteEmail', { ns: 'common' })}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setOpen('delete')}
                    className='text-red-600'
                  >
                    <IconTrash className='mr-2 h-4 w-4' />
                    {t('delete', { ns: 'common' })}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        },
        enableSorting: false,
        enableHiding: false,
        meta: { className: 'w-12' },
      },
    ],
    [t, setOpen]
  )

  return columns
}
