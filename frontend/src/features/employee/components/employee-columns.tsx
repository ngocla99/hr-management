import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Employee } from '../types/employee.types'
import { employeeStatusStyles } from '../constants/employee-options'
import { cn } from '@/lib/utils'
import { IconDotsVertical, IconEdit, IconEye, IconMail, IconTrash } from '@tabler/icons-react'

interface UseEmployeeColumnsProps {
  onView?: (employee: Employee) => void
  onEdit?: (employee: Employee) => void
  onDelete?: (employee: Employee) => void
  onInvite?: (employee: Employee) => void
}

export const useEmployeeColumns = ({
  onView,
  onEdit,
  onDelete,
  onInvite,
}: UseEmployeeColumnsProps = {}) => {
  const { t } = useTranslation()

  const columns = useMemo<ColumnDef<Employee>[]>(() => [
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
      meta: { className: 'w-12' },
    },
    {
      accessorKey: 'fullName',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('employeeName', { ns: 'glossary' })}
        />
      ),
      cell: ({ row }) => {
        const employee = row.original
        return (
          <div className='flex items-center space-x-3'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={employee.avatar} alt={employee.fullName} />
              <AvatarFallback>
                {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='min-w-0 flex-1'>
              <div className='font-medium text-gray-900'>{employee.fullName}</div>
              <div className='text-sm text-gray-500'>{employee.jobTitle}</div>
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
            <div className='text-sm text-gray-500'>{employee.phone}</div>
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
          title={t('dateHired', { ns: 'glossary' })}
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
        const badgeColor = employeeStatusStyles.get(status)
        return (
          <Badge 
            variant='outline' 
            className={cn('capitalize', badgeColor)}
          >
            {t(('status.' + status.replace('_', '')) as any, {
              ns: 'glossary',
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
              >
                <IconDotsVertical className='h-4 w-4' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[160px]'>
              <DropdownMenuItem onClick={() => onView?.(employee)}>
                <IconEye className='mr-2 h-4 w-4' />
                {t('view', { ns: 'common' })}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(employee)}>
                <IconEdit className='mr-2 h-4 w-4' />
                {t('edit', { ns: 'common' })}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onInvite?.(employee)}>
                <IconMail className='mr-2 h-4 w-4' />
                {t('inviteEmail', { ns: 'common' })}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete?.(employee)}
                className='text-red-600'
              >
                <IconTrash className='mr-2 h-4 w-4' />
                {t('delete', { ns: 'common' })}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      enableSorting: false,
      enableHiding: false,
      meta: { className: 'w-12' },
    },
  ], [t, onView, onEdit, onDelete, onInvite])

  return columns
} 