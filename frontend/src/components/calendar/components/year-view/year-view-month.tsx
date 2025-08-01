import { useMemo } from 'react'
import {
  format,
  getDaysInMonth,
  isSameDay,
  parseISO,
  startOfMonth,
} from 'date-fns'
// import { useRouter } from '@tanstack/react-router'
import { YearViewDayCell } from '@/components/calendar/components/year-view/year-view-day-cell'
import { useCalendar } from '@/components/calendar/contexts/calendar-context'
import type { IEvent } from '@/components/calendar/interfaces'

interface IProps {
  month: Date
  events: IEvent[]
}

export function YearViewMonth({ month, events }: IProps) {
  // const router = useRouter()
  const { setSelectedDate } = useCalendar()

  const monthName = format(month, 'MMMM')

  const daysInMonth = useMemo(() => {
    const totalDays = getDaysInMonth(month)
    const firstDay = startOfMonth(month).getDay()

    const days = Array.from({ length: totalDays }, (_, i) => i + 1)
    const blanks = Array(firstDay).fill(null)

    return [...blanks, ...days]
  }, [month])

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const handleClick = () => {
    setSelectedDate(new Date(month.getFullYear(), month.getMonth(), 1))
    // TODO: handle navigation
    // router.navigate({
    //   to: '/month-view',
    // })
  }

  return (
    <div className='flex flex-col'>
      <button
        type='button'
        onClick={handleClick}
        className='hover:bg-accent focus-visible:ring-ring w-full rounded-t-lg border px-3 py-2 text-sm font-semibold focus-visible:ring-1 focus-visible:outline-none'
      >
        {monthName}
      </button>

      <div className='flex-1 space-y-2 rounded-b-lg border border-t-0 p-3'>
        <div className='grid grid-cols-7 gap-x-0.5 text-center'>
          {weekDays.map((day, index) => (
            <div
              key={index}
              className='text-muted-foreground text-xs font-medium'
            >
              {day}
            </div>
          ))}
        </div>

        <div className='grid grid-cols-7 gap-x-0.5 gap-y-2'>
          {daysInMonth.map((day, index) => {
            if (day === null)
              return <div key={`blank-${index}`} className='h-10' />

            const date = new Date(month.getFullYear(), month.getMonth(), day)
            const dayEvents = events.filter(
              (event) =>
                isSameDay(parseISO(event.startDate), date) ||
                isSameDay(parseISO(event.endDate), date)
            )

            return (
              <YearViewDayCell
                key={`day-${day}`}
                day={day}
                date={date}
                events={dayEvents}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
