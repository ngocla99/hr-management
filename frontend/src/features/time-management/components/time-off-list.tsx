import { format } from 'date-fns'
import { TimeOffStatus, TimeOffType } from '@/types/api'
import { Calendar, Clock, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTimeOff } from '../api/get-time-off'

interface TimeOffListProps {
  employeeId: string
}

export function TimeOffList({ employeeId }: TimeOffListProps) {
  const { t } = useTranslation('time-management')

  const { data: timeOffData, isLoading } = useTimeOff({
    input: {
      userId: employeeId,
    },
  })

  const getStatusBadge = (status: TimeOffStatus) => {
    const variants = {
      [TimeOffStatus.PENDING]: 'secondary',
      [TimeOffStatus.APPROVED]: 'default',
      [TimeOffStatus.REJECTED]: 'destructive',
      [TimeOffStatus.CANCELLED]: 'outline',
    } as const

    return (
      <Badge variant={variants[status]} className='text-xs'>
        {t(`timeOff.status.${status}`)}
      </Badge>
    )
  }

  const getTypeLabel = (type: TimeOffType) => {
    return t(`timeOff.type.${type}`)
  }

  const formatDateRange = (startDate: Date, endDate: Date) => {
    if (startDate.toDateString() === endDate.toDateString()) {
      return format(new Date(startDate), 'MMM dd, yyyy')
    }
    return `${format(new Date(startDate), 'MMM dd')} - ${format(new Date(endDate), 'MMM dd, yyyy')}`
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle>{t('timeOff.title')}</CardTitle>
          <Button size='sm'>
            <Plus className='mr-2 h-4 w-4' />
            {t('timeOff.request')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {timeOffData?.data?.map((timeOff) => (
            <div
              key={timeOff.id}
              className='flex items-center justify-between rounded-lg border p-4'
            >
              <div className='flex items-center space-x-4'>
                <div className='flex-shrink-0'>
                  <Calendar className='text-muted-foreground h-5 w-5' />
                </div>

                <div className='flex-1'>
                  <div className='mb-1 flex items-center space-x-2'>
                    <span className='font-medium'>
                      {getTypeLabel(timeOff.type)}
                    </span>
                    {getStatusBadge(timeOff.status)}
                  </div>

                  <div className='text-muted-foreground text-sm'>
                    {formatDateRange(timeOff.startDate, timeOff.endDate)}
                  </div>

                  <div className='text-muted-foreground mt-1 text-sm'>
                    {timeOff.reason}
                  </div>
                </div>
              </div>

              <div className='flex items-center space-x-2'>
                <div className='text-right'>
                  <div className='text-sm font-medium'>
                    {timeOff.totalDays} days
                  </div>
                  <div className='text-muted-foreground text-xs'>
                    {timeOff.totalHours} hours
                  </div>
                </div>

                <Button variant='ghost' size='sm'>
                  <Clock className='h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className='py-8 text-center'>
              <div className='mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900'></div>
            </div>
          )}

          {!isLoading &&
            (!timeOffData?.data || timeOffData.data.length === 0) && (
              <div className='text-muted-foreground py-8 text-center'>
                {t('timeOff.noData')}
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  )
}
