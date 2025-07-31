import {
  format,
  isThisWeek,
  isToday,
  isYesterday,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns'
import { AttendanceResDto } from '@/types/api'
import { Clock, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/lib/date'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { mockAttendanceResponse } from './mock-attendance-data'
import { TimelineBar } from './time-line-bar'

interface AttendanceLogProps {
  employeeId: string
}

export function AttendanceLog({ employeeId }: AttendanceLogProps) {
  const { t } = useTranslation('time-management')

  // Mock data instead of API call
  const attendanceData = mockAttendanceResponse
  const isLoading = false

  const formatDuration = (hours: number) => {
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    return `${h}h ${m}m`
  }

  const calculateHoursFromDates = (startDate: Date, endDate: Date) => {
    return (
      differenceInHours(endDate, startDate) +
      (differenceInMinutes(endDate, startDate) % 60) / 60
    )
  }

  const getTimelineSegments = (attendance: AttendanceResDto) => {
    const segments = []

    if (attendance.clockInTime) {
      const start = new Date(attendance.clockInTime)
      const end = attendance.breakStartTime
        ? new Date(attendance.breakStartTime)
        : attendance.clockOutTime
          ? new Date(attendance.clockOutTime)
          : new Date()

      segments.push({
        type: 'working',
        start,
        end,
        color: 'bg-blue-500',
        label: t('timeline.workingTime'),
      })
    }

    if (attendance.breakStartTime && attendance.breakEndTime) {
      segments.push({
        type: 'break',
        start: new Date(attendance.breakStartTime),
        end: new Date(attendance.breakEndTime),
        color: 'bg-green-500',
        label: t('timeline.break'),
      })
    }

    if (attendance.breakEndTime && attendance.clockOutTime) {
      segments.push({
        type: 'working',
        start: new Date(attendance.breakEndTime),
        end: new Date(attendance.clockOutTime),
        color: 'bg-blue-500',
        label: t('timeline.workingTime'),
      })
    }

    if (attendance.overtimeStartTime && attendance.overtimeEndTime) {
      segments.push({
        type: 'overtime',
        start: new Date(attendance.overtimeStartTime),
        end: new Date(attendance.overtimeEndTime),
        color: 'bg-orange-500',
        label: t('timeline.overtime'),
      })
    }

    return segments
  }

  const getDateLabel = (date: Date) => {
    if (isToday(new Date(date))) {
      return t('date.today')
    } else if (isYesterday(new Date(date))) {
      return t('date.yesterday')
    } else if (isThisWeek(new Date(date))) {
      return format(new Date(date), 'EEEE')
    } else {
      return format(new Date(date), 'EEEE, dd')
    }
  }

  const getStatusBadge = (attendance: AttendanceResDto) => {
    if (attendance.isLate) {
      return (
        <Badge variant='destructive' className='text-xs'>
          {t('status.late')}
        </Badge>
      )
    }
    if (attendance.isEarlyLeave) {
      return (
        <Badge variant='destructive' className='text-xs'>
          {t('status.earlyLeave')}
        </Badge>
      )
    }
    if (!attendance.clockOutTime) {
      return (
        <Badge variant='secondary' className='text-xs'>
          {t('status.noClockOut')}
        </Badge>
      )
    }
    return (
      <Badge variant='default' className='text-xs'>
        {t('status.complete')}
      </Badge>
    )
  }

  return (
    <>
      {attendanceData?.data?.map((attendance) => (
        <Card key={attendance.id} className='gap-4'>
          <CardHeader>
            <CardTitle>{getDateLabel(attendance.date)}</CardTitle>
          </CardHeader>
          <CardContent className='flex items-end rounded-lg'>
            {/* Clock In */}
            <div className='grid w-20 gap-4'>
              <div className='text-muted-foreground text-sm'>
                {t('log.clockIn')}
              </div>
              <div className='font-medium'>
                {attendance.clockInTime
                  ? formatDate(attendance.clockInTime, {
                      period: 'time',
                    })
                  : '-'}
              </div>
            </div>
            <Separator
              orientation='vertical'
              className='mx-8 mr-10 h-10! self-center'
            />

            <div className='flex-1'>
              <TimelineBar
                segments={getTimelineSegments(attendance).map((segment) => ({
                  type: segment.type,
                  hours: calculateHoursFromDates(segment.start, segment.end),
                  label: segment.label,
                }))}
              />
            </div>

            <Separator
              orientation='vertical'
              className='mx-8 ml-10 h-10! self-center'
            />

            {/* Clock Out */}
            <div className='grid w-20 gap-4'>
              <div className='text-muted-foreground text-sm'>
                {t('log.clockOut')}
              </div>
              <div className='font-medium'>
                {attendance.clockOutTime
                  ? formatDate(attendance.clockOutTime, {
                      period: 'time',
                    })
                  : '-'}
              </div>
            </div>

            <Separator
              orientation='vertical'
              className='mx-8 h-10! self-center'
            />

            {/* Duration */}
            <div className='grid w-20 gap-4'>
              <div className='text-muted-foreground text-sm'>
                {t('log.duration')}
              </div>
              <div className='font-medium'>
                {attendance.totalWorkHours
                  ? formatDuration(attendance.totalWorkHours)
                  : '-'}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {isLoading && (
        <div className='py-8 text-center'>
          <div className='mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900'></div>
        </div>
      )}

      {!isLoading &&
        (!attendanceData?.data || attendanceData.data.length === 0) && (
          <div className='text-muted-foreground py-8 text-center'>
            {t('log.noData')}
          </div>
        )}
    </>
  )
}
