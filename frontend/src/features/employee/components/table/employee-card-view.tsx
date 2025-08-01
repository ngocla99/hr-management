import { useNavigate } from '@tanstack/react-router'
import { type Table as TanstackTable } from '@tanstack/react-table'
import {
  IconBriefcase,
  IconClock,
  IconDots,
  IconEye,
  IconId,
  IconMail,
  IconPhone,
  IconTrash,
} from '@tabler/icons-react'
import { Route as EmployeeDetailRoute } from '@/routes/_authenticated/organization/employee/$employeeId'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollToTop } from '@/components/scroll-to-top'
import { employeeStatusStyles } from '@/features/employee/constants/employee-helpers'
import { employeeRoleOptionsFn } from '@/features/employee/constants/employee-options'
import { useEmployee } from '@/features/employee/context/employee-context'
import { Employee } from '@/features/employee/type/employee'

interface EmployeeCardProps {
  employee: Employee
}

function EmployeeCard({ employee }: EmployeeCardProps) {
  const { t } = useTranslation()
  const { setOpen, setCurrentRow } = useEmployee()
  const navigate = useNavigate()

  const navigateToDetail = () => {
    navigate({
      to: EmployeeDetailRoute.fullPath,
      params: { employeeId: employee.id },
    })
  }

  return (
    <Card
      className='relative shadow transition-shadow hover:shadow-2xl'
      onClick={navigateToDetail}
    >
      <CardContent className='px-6'>
        <div className='mb-4 flex items-start justify-between'>
          <Badge
            variant={employeeStatusStyles.get(employee.employmentStatus)}
            className={cn('capitalize')}
            hasDot
            size='lg'
          >
            {t(('status.' + employee.status) as any, {
              ns: 'users',
            })}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                <IconDots className='size-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => {
                  navigate({
                    to: EmployeeDetailRoute.fullPath,
                    params: { employeeId: employee.id },
                  })
                }}
              >
                <IconEye className='mr-2 size-4' />
                {t('view', { ns: 'common' })}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setCurrentRow(employee)
                  setOpen('invite')
                }}
              >
                <IconMail className='mr-2 size-4' />
                {t('inviteEmail', { ns: 'common' })}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setCurrentRow(employee)
                  setOpen('delete')
                }}
                className='text-destructive'
              >
                <IconTrash className='mr-2 size-4' />
                {t('delete', { ns: 'common' })}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Profile section */}
        <div className='mb-4 flex flex-col items-center gap-4'>
          <Avatar className='size-20'>
            <AvatarImage src={employee.avatar} alt={employee.fullName} />
            <AvatarFallback className='bg-gradient-to-br from-purple-100 to-green-100'>
              {employee.firstName?.charAt(0)}
              {employee.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-center gap-2'>
            <h3 className='text-lg font-semibold'>{employee.fullName}</h3>
            <p className='text-muted-foreground h-5 text-sm'>
              {employee.jobRole}
            </p>
          </div>
        </div>

        {/* Information box */}
        <div className='bg-accent/50 space-y-3 rounded-lg border p-4 shadow-sm'>
          <div className='flex items-center space-x-2'>
            <IconId className='text-muted-foreground size-4' />
            <span className='text-sm'>#{employee.employeeNumber}</span>
          </div>

          <div className='flex items-center space-x-2'>
            <IconBriefcase className='text-muted-foreground size-4' />
            <span className='text-sm'>
              {
                employeeRoleOptionsFn(t).find(
                  (role) => role.value === employee.jobRole
                )?.label
              }
            </span>
            <span className='text-gray-400'>•</span>
            <IconClock className='text-muted-foreground size-4' />
            <span className='text-sm'>
              {t(('employmentType.' + employee.employmentType) as any, {
                ns: 'employee',
              })}
            </span>
          </div>

          <div className='flex items-center space-x-2'>
            <IconMail className='text-muted-foreground size-4' />
            <span className='text-chart-4 rounded-full border bg-white px-1 py-0.5 text-sm'>
              {employee.email}
            </span>
          </div>

          <div className='flex items-center space-x-2'>
            <IconPhone className='text-muted-foreground size-4' />
            <span className='text-chart-4 rounded-full border bg-white px-1 py-0.5 text-sm'>
              {employee.phoneNumber}
            </span>
          </div>
        </div>

        {/* Footer section */}
        <div className='mt-4 flex items-center justify-between'>
          <div className='text-muted-foreground/50 text-sm'>
            {t('joinAt', { ns: 'glossary' })}{' '}
            <span className='text-foreground'>
              {formatDate(employee.hireDate)}
            </span>
          </div>
          <div className='group/button'>
            <Button
              variant='link'
              className='text-foreground hover:text-primary mr-1.5 h-auto p-0 text-sm'
              onClick={navigateToDetail}
            >
              <span className='underline underline-offset-4'>
                {t('viewDetail', { ns: 'common' })}
              </span>
            </Button>
            <span className='group-hover/button:text-primary'>&gt;</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface EmployeeCardViewProps {
  table: TanstackTable<Employee>
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
        <div className='grid h-[calc(100vh-248px)] place-items-center'>
          <p className='text-muted-foreground'>
            {t('messages.noEmployeesFound', { ns: 'employee' })}
          </p>
        </div>
      )}

      <ScrollToTop />
    </div>
  )
}
