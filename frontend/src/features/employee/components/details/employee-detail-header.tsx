import { Link } from '@tanstack/react-router'
import { IconDots, IconDotsVertical } from '@tabler/icons-react'
import { Route as EmployeeRoute } from '@/routes/_authenticated/organization/employee'
import { User } from '@/types/api'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Mail,
  MoreHorizontal,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SEARCH_PARAMS } from '@/lib/constants/constant'
import { formatDate } from '@/lib/date'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface EmployeeDetailHeaderProps {
  employee: User
  onPrevious?: () => void
  onNext?: () => void
  currentIndex?: number
  totalCount?: number
}

export function EmployeeDetailHeader({
  employee,
  onPrevious,
  onNext,
  currentIndex = 1,
  totalCount = 32,
}: EmployeeDetailHeaderProps) {
  const { t } = useTranslation()

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
            <Badge variant='success' hasDot>
              {t(`status.${employee.status}` as any, { ns: 'users' })}
            </Badge>
          </div>

          <Separator orientation='vertical' className='mr-8 ml-16 h-10!' />

          <div className='text-muted-foreground mt-1 flex items-center space-x-6 text-sm'>
            <div className='flex flex-col gap-2'>
              <span className='font-medium'>Last Clocked In</span>
              <span className='text-foreground font-semibold'>
                {employee.lastClockedIn
                  ? formatDate(employee.lastClockedIn)
                  : 'A few seconds ago'}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='font-medium'>Last Messaged</span>
              <span className='text-foreground font-semibold'>
                {employee.lastMessaged
                  ? formatDate(employee.lastMessaged)
                  : '2 Days ago'}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='font-medium'>Employee ID</span>
              <span className='text-foreground font-semibold'>
                #{employee.employeeId}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-center space-x-3'>
        <div className='flex items-center space-x-1'>
          <Button
            variant='light'
            size='icon'
            onClick={onPrevious}
            className='size-8 rounded-full'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='light'
            size='icon'
            onClick={onNext}
            className='size-8 rounded-full'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
          <span className='text-muted-foreground px-2 text-sm'>
            {currentIndex} of {totalCount}
          </span>
        </div>

        <Button variant='light' size='icon' className='size-8'>
          <IconDotsVertical className='size-4' />
        </Button>

        <Separator orientation='vertical' className='h-4!' />

        <Button>
          <Mail className='mr-2 h-4 w-4' />
          Send Email
        </Button>
      </div>
    </div>
  )
}
