import { type Table as TanstackTable } from '@tanstack/react-table'
import {
  IconCheck,
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconMail,
  IconPhone,
  IconTrash,
} from '@tabler/icons-react'
import { User, UserStatus } from '@/types/api'
import { VariantProps } from 'class-variance-authority'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { employeeStatusStyles } from '../constants/employee-helpers'
import { useEmployee } from '../context/employee-context'

interface EmployeeCardProps {
  employee: User
}

function EmployeeCard({ employee }: EmployeeCardProps) {
  const { t } = useTranslation()
  const { setOpen } = useEmployee()
  const badgeColor = employeeStatusStyles.get(employee.status)

  const getStatusIcon = (status: UserStatus) => {
    switch (status) {
      case UserStatus.ACTIVE:
        return <div className='h-2 w-2 rounded-full bg-green-500' />
      case UserStatus.NOT_VERIFIED:
        return <IconCheck className='h-4 w-4 text-green-500' />
      case UserStatus.INACTIVE:
        return (
          <div className='flex h-4 w-4 items-center justify-center'>
            <div className='h-3 w-0.5 bg-gray-400' />
            <div className='ml-0.5 h-3 w-0.5 bg-gray-400' />
          </div>
        )
      case UserStatus.SUSPENDED:
        return <div className='h-2 w-2 rounded-full bg-red-500' />
      default:
        return null
    }
  }

  return (
    <Card className='relative transition-shadow hover:shadow-md'>
      <CardContent className='p-6'>
        {/* Header with status and options */}
        <div className='mb-4 flex items-start justify-between'>
          <Badge
            variant={employeeStatusStyles.get(employee.status)}
            className={cn('capitalize')}
          >
            {t(('status.' + employee.status) as any, {
              ns: 'users',
            })}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                <IconDotsVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
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

        {/* Profile section */}
        <div className='mb-4 flex items-center space-x-3'>
          <Avatar className='h-16 w-16'>
            <AvatarImage src={employee.avatar} alt={employee.fullName} />
            <AvatarFallback className='bg-gradient-to-br from-purple-100 to-green-100 text-gray-700'>
              {employee.firstName.charAt(0)}
              {employee.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold text-gray-900'>
              {employee.fullName}
            </h3>
            <p className='text-sm text-gray-600'>{employee.jobRole}</p>
          </div>
        </div>

        {/* Information box */}
        <div className='space-y-3 rounded-lg bg-gray-50 p-4'>
          <div className='flex items-center justify-between'>
            <span className='text-xs text-gray-500'>Employee ID</span>
            <span className='text-sm font-medium'>
              #
              {employee.employeeId ||
                employee.id?.toString().padStart(2, '0') ||
                'EMP01'}
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-xs text-gray-500'>Department</span>
            <span className='text-sm font-medium'>{employee.department}</span>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-xs text-gray-500'>Employment Type</span>
            <span className='text-sm font-medium'>
              {employee.employmentType}
            </span>
          </div>

          <div className='flex items-center space-x-2 text-sm'>
            <IconMail className='h-4 w-4 text-gray-400' />
            <span className='text-gray-600'>{employee.email}</span>
          </div>

          <div className='flex items-center space-x-2 text-sm'>
            <IconPhone className='h-4 w-4 text-gray-400' />
            <span className='text-gray-600'>{employee.phoneNumber}</span>
          </div>
        </div>

        {/* Footer section */}
        <div className='mt-4 flex items-center justify-between'>
          <div className='text-sm text-gray-500'>
            Joined at {formatDate(employee.dateStarted)}
          </div>
          <Button
            variant='link'
            className='h-auto p-0 text-sm text-blue-600 hover:text-blue-800'
            onClick={() => setOpen('view')}
          >
            View details &gt;
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface EmployeeCardViewProps {
  table: TanstackTable<User>
}

export function EmployeeCardView({ table }: EmployeeCardViewProps) {
  const { t } = useTranslation()

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {table.getRowModel().rows.map((row) => (
          <EmployeeCard key={row.id} employee={row.original} />
        ))}
      </div>

      {table.getRowModel().rows.length === 0 && (
        <div className='py-12 text-center'>
          <p className='text-gray-500'>
            No employees found matching your criteria.
          </p>
        </div>
      )}
    </div>
  )
}
