import {
  CalendarRange,
  Columns,
  Grid2x2,
  Grid3x3,
  List,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddEventDialog } from '@/components/calendar/components/dialogs/add-event-dialog'
import { DateNavigator } from '@/components/calendar/components/header/date-navigator'
import { TodayButton } from '@/components/calendar/components/header/today-button'
import { UserSelect } from '@/components/calendar/components/header/user-select'
import type { IEvent } from '@/components/calendar/interfaces'
import type { TCalendarView } from '@/components/calendar/types'

interface IProps {
  view: TCalendarView
  events: IEvent[]
  setView: (view: TCalendarView) => void
}

export function CalendarHeader({ view, setView, events }: IProps) {
  return (
    <div className='flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between'>
      <div className='flex items-center gap-3'>
        <TodayButton />
        <DateNavigator view={view} events={events} />
      </div>

      <div className='flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between'>
        <div className='flex w-full items-center gap-1.5'>
          <div className='inline-flex first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none'>
            <Button
              aria-label='View by day'
              size='icon'
              variant={view === 'day' ? 'default' : 'outline'}
              className='rounded-r-none [&_svg]:size-5'
              onClick={() => setView('day')}
            >
              <List strokeWidth={1.8} />
            </Button>

            <Button
              aria-label='View by week'
              size='icon'
              variant={view === 'week' ? 'default' : 'outline'}
              className='-ml-px rounded-none [&_svg]:size-5'
              onClick={() => setView('week')}
            >
              <Columns strokeWidth={1.8} />
            </Button>

            <Button
              aria-label='View by month'
              size='icon'
              variant={view === 'month' ? 'default' : 'outline'}
              className='-ml-px rounded-none [&_svg]:size-5'
              onClick={() => setView('month')}
            >
              <Grid2x2 strokeWidth={1.8} />
            </Button>

            <Button
              aria-label='View by year'
              size='icon'
              variant={view === 'year' ? 'default' : 'outline'}
              className='-ml-px rounded-none [&_svg]:size-5'
              onClick={() => setView('year')}
            >
              <Grid3x3 strokeWidth={1.8} />
            </Button>

            <Button
              aria-label='View by agenda'
              size='icon'
              variant={view === 'agenda' ? 'default' : 'outline'}
              className='-ml-px rounded-l-none [&_svg]:size-5'
              onClick={() => setView('agenda')}
            >
              <CalendarRange strokeWidth={1.8} />
            </Button>
          </div>

          <UserSelect />
        </div>

        <AddEventDialog>
          <Button className='w-full sm:w-auto'>
            <Plus />
            Add Event
          </Button>
        </AddEventDialog>
      </div>
    </div>
  )
}
