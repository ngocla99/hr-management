import { Link, useNavigate } from '@tanstack/react-router'
import { IconDotsVertical } from '@tabler/icons-react'
import { Route as EmployeeDetailRoute } from '@/routes/_authenticated/organization/employee/$employeeId'
import { User } from '@/types/api'
import { ArrowLeft, ChevronLeft, ChevronRight, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SEARCH_PARAMS } from '@/lib/constants/constant'
import { formatDate } from '@/lib/date'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useUserAdjacent } from '@/features/user/api/get-adjacent-user'
import { employeeStatusStyles } from '../../constants/employee-helpers'

interface EmployeeDetailHeaderProps {
  employee: User
}

export function EmployeeDetailHeader({ employee }: EmployeeDetailHeaderProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: adjacent } = useUserAdjacent({
    input: { id: employee.id },
  })

  const handlePreviousEmployee = () => {
    if (!adjacent?.previous.id) return
    navigate({
      to: EmployeeDetailRoute.fullPath,
      params: { employeeId: adjacent?.previous.id },
    })
  }

  const handleNextEmployee = () => {
    if (!adjacent?.next.id) return
    navigate({
      to: EmployeeDetailRoute.fullPath,
      params: { employeeId: adjacent?.next.id },
    })
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-4'>
        <Link to='/organization/employee' search={SEARCH_PARAMS}>
          <Button variant='light' size='icon' className='size-10 rounded-full'>
            <ArrowLeft className='size-4' />
          </Button>
        </Link>

        <Avatar className='size-16'>
          <AvatarImage src={employee.avatar} alt={employee.fullName} />
          <AvatarFallback className='bg-blue-500 text-white'>
            {employee.firstName?.[0]}
            {employee.lastName?.[0]}
          </AvatarFallback>
        </Avatar>

        <div className='flex items-center'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-lg font-semibold'>{employee.fullName}</h1>
            <Badge variant={employeeStatusStyles.get(employee.status)} hasDot>
              {t(`status.${employee.status}` as any, { ns: 'users' })}
            </Badge>
          </div>

          <Separator orientation='vertical' className='mr-8 ml-16 h-10!' />

          <div className='text-muted-foreground mt-1 flex items-center space-x-6 text-sm'>
            <div className='flex flex-col gap-2'>
              <span className='font-medium'>
                {t('page.lastClockedIn', { ns: 'employee' })}
              </span>
              <span className='text-foreground font-semibold'>
                {employee.lastClockedIn
                  ? formatDate(employee.lastClockedIn)
                  : t('page.aFewSecondsAgo', { ns: 'employee' })}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='font-medium'>
                {t('page.lastMessaged', { ns: 'employee' })}
              </span>
              <span className='text-foreground font-semibold'>
                {employee.lastMessaged
                  ? formatDate(employee.lastMessaged)
                  : t('page.twoDaysAgo', { ns: 'employee' })}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='font-medium'>
                {t('page.employeeId', { ns: 'employee' })}
              </span>
              <span className='text-foreground font-semibold'>
                #{employee.employeeId}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-center space-x-3'>
        <div className='flex items-center space-x-2'>
          <Button
            variant='light'
            size='icon'
            onClick={handlePreviousEmployee}
            className='size-8 rounded-full'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='light'
            size='icon'
            onClick={handleNextEmployee}
            className='size-8 rounded-full'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
          <div className='text-muted-foreground w-20 px-2 text-sm'>
            {adjacent?.current.position} of {adjacent?.total}
          </div>
        </div>

        <Button variant='light' size='icon' className='size-8'>
          <IconDotsVertical className='size-4' />
        </Button>

        <Separator orientation='vertical' className='h-4!' />

        <Button>
          <Mail className='mr-2 h-4 w-4' />
          {t('actions.sendEmail', { ns: 'employee' })}
        </Button>
      </div>
    </div>
  )
}
