import { getUsersApi } from '@/api/services/user'
import { ChangeBadgeVariantInput } from '@/components/calendar/components/change-badge-variant-input'
import { ClientContainer } from '@/components/calendar/components/client-container'
import { CalendarProvider } from '@/components/calendar/contexts/calendar-context'
import { QUERY_KEYS } from '@/lib/constants/constant'
import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useTasks } from '../hooks/use-tasks-api'
import {
  adaptApiTasksToCalendarTasks,
  adaptApiUsersToCalendarUsers,
} from '../utils/adapters'

const route = getRouteApi('/_authenticated/tasks/')

export default function CalendarView({
  onSwitchToList,
}: { onSwitchToList?: () => void } = {}) {
  const { t } = useTranslation()
  const { page, limit, status, priority, startDate, dueDate } =
    route.useSearch()

  // Fetch users for calendar
  const { data: userData } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: () => getUsersApi(),
    select: (data) => data.data,
  })
  const users = adaptApiUsersToCalendarUsers(userData ?? [])

  // Fetch tasks using the same filters as the table
  const { tasks, isLoading: isTasksLoading } = useTasks({
    page,
    limit,
    status,
    priority,
    startDate,
    dueDate,
  })
  const events = adaptApiTasksToCalendarTasks(tasks, users)

  if (!users.length || isTasksLoading) return <div>Loading...</div>

  return (
    <div className='relative'>
      <div className='mb-2 flex justify-end'>
        <button
          type='button'
          className='border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium shadow-sm transition-colors'
          onClick={onSwitchToList}
        >
          {t('listView', { ns: 'tasks' })}
        </button>
      </div>
      <CalendarProvider events={events} users={users}>
        <ClientContainer view='month' />
        <ChangeBadgeVariantInput />
      </CalendarProvider>
    </div>
  )
}
