import React from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAttendanceStats } from '@/features/time-management/api/get-attendance-stats'

interface AttendanceSummaryProps {
  employeeId: string
  className?: string
}

export function AttendanceSummary({
  employeeId,
  className,
}: AttendanceSummaryProps) {
  const { t } = useTranslation('time-management')

  // Get current month for date range
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const { data: stats, isLoading } = useAttendanceStats({
    input: {
      userId: employeeId,
      startDate: startOfMonth.toISOString(),
      endDate: endOfMonth.toISOString(),
    },
  })

  const summaryCards = [
    {
      title: t('summary.dayOff'),
      value: stats?.totalDays || 12,
      change: '+ 12',
      changeType: 'positive' as const,
    },
    {
      title: t('summary.lateClockIn'),
      value: stats?.lateDays || 6,
      change: '- 2',
      changeType: 'negative' as const,
    },
    {
      title: t('summary.lateClockOut'),
      value: stats?.earlyLeaveDays || 21,
      change: '- 12',
      changeType: 'negative' as const,
    },
    {
      title: t('summary.noClockOut'),
      value: stats?.noClockOutDays || 2,
      change: '+ 4',
      changeType: 'positive' as const,
    },
    {
      title: t('summary.offTimeQuota'),
      value: 1,
      change: '0',
      changeType: 'neutral' as const,
    },
    {
      title: t('summary.absent'),
      value: 2,
      change: '0',
      changeType: 'neutral' as const,
    },
  ]

  return (
    <Card className={cn('p-0', className)}>
      <CardContent>
        <div className='flex items-center'>
          {summaryCards.map((card, index) => (
            <React.Fragment key={index}>
              <div className='flex-1'>
                <div className='flex flex-col justify-center bg-white px-4 py-6'>
                  <div className='mb-2 text-sm text-gray-600'>{card.title}</div>
                  <div className='mb-1 text-3xl font-bold text-black'>
                    {card.value}
                  </div>
                  <div
                    className={cn(
                      'text-xs font-bold',
                      card.changeType === 'positive' && 'text-blue-500',
                      card.changeType === 'negative' && 'text-orange-500',
                      card.changeType === 'neutral' && 'text-gray-500'
                    )}
                  >
                    {card.change}{' '}
                    <span className='text-muted-foreground font-normal'>
                      vs last month
                    </span>
                  </div>
                </div>
              </div>
              {index < summaryCards.length - 1 && (
                <Separator orientation='vertical' className='mx-18 h-12!' />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
