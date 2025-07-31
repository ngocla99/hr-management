import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { OvertimeResDto, OvertimeStatus, OvertimeType } from '@/types/api'
import { Plus, Clock, DollarSign } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useOvertime } from '../api/get-overtime'

interface OvertimeListProps {
  employeeId: string
}

export function OvertimeList({ employeeId }: OvertimeListProps) {
  const { t } = useTranslation('time-management')

  const { data: overtimeData, isLoading } = useOvertime({
    input: {
      userId: employeeId,
    },
  })

  const getStatusBadge = (status: OvertimeStatus) => {
    const variants = {
      [OvertimeStatus.PENDING]: 'secondary',
      [OvertimeStatus.APPROVED]: 'default',
      [OvertimeStatus.REJECTED]: 'destructive',
      [OvertimeStatus.CANCELLED]: 'outline',
    } as const

    return (
      <Badge variant={variants[status]} className='text-xs'>
        {t(`overtime.status.${status}`)}
      </Badge>
    )
  }

  const getTypeLabel = (type: OvertimeType) => {
    return t(`overtime.type.${type}`)
  }

  const formatTime = (date: Date) => {
    return format(new Date(date), 'hh:mm a')
  }

  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM dd, yyyy')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle>{t('overtime.title')}</CardTitle>
          <Button size='sm'>
            <Plus className='mr-2 h-4 w-4' />
            {t('overtime.request')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {overtimeData?.data?.map((overtime) => (
            <div
              key={overtime.id}
              className='flex items-center justify-between rounded-lg border p-4'
            >
              <div className='flex items-center space-x-4'>
                <div className='flex-shrink-0'>
                  <Clock className='text-muted-foreground h-5 w-5' />
                </div>

                <div className='flex-1'>
                  <div className='mb-1 flex items-center space-x-2'>
                    <span className='font-medium'>
                      {getTypeLabel(overtime.type)}
                    </span>
                    {getStatusBadge(overtime.status)}
                  </div>

                  <div className='text-muted-foreground text-sm'>
                    {formatDate(overtime.overtimeDate)} •{' '}
                    {formatTime(overtime.startTime)} -{' '}
                    {formatTime(overtime.endTime)}
                  </div>

                  <div className='text-muted-foreground mt-1 text-sm'>
                    {overtime.reason}
                  </div>
                </div>
              </div>

              <div className='flex items-center space-x-4'>
                <div className='text-right'>
                  <div className='text-sm font-medium'>
                    {overtime.totalHours} hours
                  </div>
                  {overtime.totalAmount && (
                    <div className='text-muted-foreground text-xs'>
                      {formatCurrency(overtime.totalAmount)}
                    </div>
                  )}
                </div>

                <div className='flex items-center space-x-2'>
                  {overtime.isPaid && (
                    <Badge variant='default' className='text-xs'>
                      {t('overtime.paid')}
                    </Badge>
                  )}

                  <Button variant='ghost' size='sm'>
                    <DollarSign className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className='py-8 text-center'>
              <div className='mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900'></div>
            </div>
          )}

          {!isLoading &&
            (!overtimeData?.data || overtimeData.data.length === 0) && (
              <div className='text-muted-foreground py-8 text-center'>
                {t('overtime.noData')}
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  )
}
