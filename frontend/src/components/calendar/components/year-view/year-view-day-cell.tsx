import { isToday } from 'date-fns'
// import { useRouter } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { useCalendar } from '@/components/calendar/contexts/calendar-context'
import type { IEvent } from '@/components/calendar/interfaces'

interface IProps {
  day: number
  date: Date
  events: IEvent[]
}

export function YearViewDayCell({ day, date, events }: IProps) {
  // const router = useRouter()
  const { setSelectedDate } = useCalendar()

  const maxIndicators = 3
  const eventCount = events.length

  const handleClick = () => {
    setSelectedDate(date)
    // TODO: handle navigation
    // router.navigate({
    //   to: '/day-view',
    // })
  }

  return (
    <button
      onClick={handleClick}
      type='button'
      className='hover:bg-accent focus-visible:ring-ring flex h-11 flex-1 flex-col items-center justify-start gap-0.5 rounded-md pt-1 focus-visible:ring-1 focus-visible:outline-none'
    >
      <div
        className={cn(
          'flex size-6 items-center justify-center rounded-full text-xs font-medium',
          isToday(date) && 'bg-primary text-primary-foreground font-semibold'
        )}
      >
        {day}
      </div>

      {eventCount > 0 && (
        <div className='mt-0.5 flex gap-0.5'>
          {eventCount <= maxIndicators ? (
            events.map((event) => (
              <div
                key={event.id}
                className={cn(
                  'size-1.5 rounded-full',
                  event.color === 'blue' && 'bg-blue-600',
                  event.color === 'green' && 'bg-green-600',
                  event.color === 'red' && 'bg-red-600',
                  event.color === 'yellow' && 'bg-yellow-600',
                  event.color === 'purple' && 'bg-purple-600',
                  event.color === 'orange' && 'bg-orange-600',
                  event.color === 'gray' && 'bg-neutral-600'
                )}
              />
            ))
          ) : (
            <>
              <div
                className={cn(
                  'size-1.5 rounded-full',
                  events[0].color === 'blue' && 'bg-blue-600',
                  events[0].color === 'green' && 'bg-green-600',
                  events[0].color === 'red' && 'bg-red-600',
                  events[0].color === 'yellow' && 'bg-yellow-600',
                  events[0].color === 'purple' && 'bg-purple-600',
                  events[0].color === 'orange' && 'bg-orange-600'
                )}
              />
              <span className='text-muted-foreground text-[7px]'>
                +{eventCount - 1}
              </span>
            </>
          )}
        </div>
      )}
    </button>
  )
}
