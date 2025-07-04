import React from 'react'
import { useTranslation } from 'react-i18next'
import { Main } from '@/components/layout/main'
import CalendarView from './components/calendar-view'
import { TasksDialogs } from './components/tasks-dialogs'
import { TasksPrimaryButtons } from './components/tasks-primary-buttons'
import { TaskTable } from './components/tasks-table'
import TasksProvider from './context/tasks-context'

function TasksContent() {
  const { t } = useTranslation('tasks')
  const [viewMode, setViewMode] = React.useState<'list' | 'calendar'>('list')

  const handleToggleView = () => {
    setViewMode((prev) => (prev === 'list' ? 'calendar' : 'list'))
  }

  return (
    <Main>
      {viewMode === 'list' ? (
        <>
          <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                {t('page.title', { ns: 'tasks' })}
              </h2>
              <p className='text-muted-foreground'>
                {t('page.description', { ns: 'tasks' })}
              </p>
            </div>
            <TasksPrimaryButtons
              viewMode={viewMode}
              onToggleView={handleToggleView}
            />
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
            <TaskTable />
          </div>
        </>
      ) : (
        <CalendarView onSwitchToList={() => setViewMode('list')} />
      )}
      <TasksDialogs />
    </Main>
  )
}

export default function Tasks() {
  return (
    <TasksProvider>
      <TasksContent />
    </TasksProvider>
  )
}
