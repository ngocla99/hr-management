import { useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import { IconDots, IconEye, IconMail, IconTrash } from '@tabler/icons-react'
import { User, UserStatus } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { employeeStatusStyles } from '@/features/employee/constants/employee-helpers'
import {
  employeeDepartmentOptionsFn,
  employeeRoleOptionsFn,
  employmentTypeOptionsFn,
} from '@/features/employee/constants/employee-options'
import { useEmployee } from '@/features/employee/context/employee-context'
import { checkboxClass } from '@/features/user/components/table/user-columns'

export const useEmployeeColumns = () => {
  const { t } = useTranslation()
  const { setOpen, setCurrentRow } = useEmployee()
  const navigate = useNavigate()

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
        meta: { className: checkboxClass },
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
          const jobRole = employeeRoleOptionsFn(t).find(
            (option) => option.value === employee.jobRole
          )
          return (
            <div className='flex items-center space-x-3'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={employee.avatar} alt={employee.fullName} />
                <AvatarFallback>
                  {employee.firstName?.charAt(0)}
                  {employee.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <div className='font-medium text-gray-900'>
                  {employee.fullName}
                </div>
                <div className='text-sm text-gray-500'>{jobRole?.label}</div>
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
              <div className='text-sm text-gray-500'>
                {employee.phoneNumber}
              </div>
            </div>
          )
        },
        meta: { className: 'min-w-[200px]' },
        enableSorting: false,
      },
      {
        accessorKey: 'status',
        meta: { className: 'w-28', align: 'center' },
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('status', { ns: 'glossary' })}
          />
        ),
        cell: ({ cell }) => {
          const status = cell.getValue() as UserStatus
          const badgeVariant = employeeStatusStyles.get(status)
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
        enableHiding: false,
      },
      {
        accessorKey: 'department',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('team', { ns: 'glossary' })}
          />
        ),
        cell: ({ cell }) => (
          <div className='font-medium'>
            {
              employeeDepartmentOptionsFn(t).find(
                (option) => option.value === cell.getValue()
              )?.label
            }
          </div>
        ),
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
        meta: { className: 'w-32' },
        enableSorting: false,
      },
      {
        accessorKey: 'jobRole',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('jobRole', { ns: 'glossary' })}
          />
        ),
        cell: ({ cell }) => (
          <div className='text-sm'>
            {
              employeeRoleOptionsFn(t).find(
                (option) => option.value === cell.getValue()
              )?.label
            }
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'employmentType',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('employmentType', { ns: 'glossary' })}
          />
        ),
        cell: ({ cell }) => (
          <div className='text-sm'>
            {
              employmentTypeOptionsFn(t).find(
                (option) => option.value === cell.getValue()
              )?.label
            }
          </div>
        ),
        meta: { className: 'w-32' },
      },
      {
        accessorKey: 'dateStarted',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={t('dateStarted', { ns: 'glossary' })}
          />
        ),
        cell: ({ cell }) => (
          <div className='text-sm'>{formatDate(cell.getValue() as Date)}</div>
        ),
        meta: { className: 'w-32' },
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
                  <DropdownMenuItem
                    onClick={() => {
                      navigate({
                        to: '/organization/employee/$employeeId',
                        params: { employeeId: employee.id },
                      })
                    }}
                  >
                    <IconEye className='mr-2 h-4 w-4' />
                    {t('view', { ns: 'common' })}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setCurrentRow(employee)
                      setOpen('invite')
                    }}
                  >
                    <IconMail className='mr-2 h-4 w-4' />
                    {t('inviteEmail', { ns: 'common' })}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setCurrentRow(employee)
                      setOpen('delete')
                    }}
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
    [t, setOpen, setCurrentRow, navigate]
  )

  return columns
}
