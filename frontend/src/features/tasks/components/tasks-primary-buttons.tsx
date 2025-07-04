import { IconDatabase, IconDownload, IconPlus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { TaskPriority, TaskStatus } from '@/lib/validations/task'
import { Button } from '@/components/ui/button'
import { useTasks } from '../context/tasks-context'
import { useCreateTask } from '../hooks/use-tasks-api'

// Mock task titles with GERP keyword
const mockTaskTitles = [
  'GERP System Integration',
  'GERP Database Migration',
  'GERP UI/UX Improvements',
  'GERP Security Audit',
  'GERP API Development',
  'GERP Performance Optimization',
  'GERP Testing Framework',
  'GERP Documentation Update',
  'GERP User Training',
  'GERP Bug Fixes',
  'GERP Feature Enhancement',
  'GERP Mobile Responsiveness',
  'GERP Dashboard Analytics',
  'GERP Backup System',
  'GERP Cloud Deployment',
]

const mockDescriptions = [
  'Critical system component requiring immediate attention',
  'High priority task for system enhancement',
  'Important feature development milestone',
  'Routine maintenance and optimization task',
  'User experience improvement initiative',
  'Security and compliance requirement',
  'Performance monitoring and analytics',
  'Documentation and knowledge management',
  'Quality assurance and testing',
  'Infrastructure and deployment task',
]

interface TasksPrimaryButtonsProps {
  viewMode: 'list' | 'calendar'
  onToggleView: () => void
}

export function TasksPrimaryButtons({
  viewMode,
  onToggleView,
}: TasksPrimaryButtonsProps) {
  const { setOpen } = useTasks()
  const createTaskMutation = useCreateTask()
  const { t } = useTranslation('common')

  const generateMockTasks = async () => {
    toast.info('Generating 10 mock tasks...')

    for (let i = 0; i < 10; i++) {
      const randomTitle =
        mockTaskTitles[Math.floor(Math.random() * mockTaskTitles.length)]
      const randomDescription =
        mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)]

      // Add a random number to make titles unique
      const uniqueTitle = `${randomTitle} ${Math.floor(Math.random() * 1000)}`

      try {
        await createTaskMutation.mutateAsync({
          title: uniqueTitle,
          description: randomDescription,
          projectId: 'cmbr7cfsr0009h2zudo37e318', // Use a default project ID
          status: ['Open', 'InProgress', 'Resolved', 'Completed'][
            Math.floor(Math.random() * 4)
          ] as TaskStatus,
          priority: ['Low', 'Medium', 'High'][
            Math.floor(Math.random() * 3)
          ] as TaskPriority,
          donePct: Math.floor(Math.random() * 101),
          assigneeId: 'cmbr5vccl0005h2zux5sj30o9',
          startDate: new Date('2025-10-05T17:00:00.000Z'),
          dueDate: new Date('2025-10-05T17:00:00.000Z'),
        })
      } catch (error) {
        console.error(`Failed to create task ${i + 1}:`, error)
      }

      // Small delay to avoid overwhelming the API
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    toast.success('Successfully generated 10 mock tasks!')
  }

  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        disabled={true}
        onClick={() => setOpen('import')}
      >
        <span>{t('import')}</span> <IconDownload size={18} />
      </Button>
      <Button className='space-x-1' onClick={() => setOpen('create')}>
        <span>{t('create')}</span> <IconPlus size={18} />
      </Button>
      <Button variant='outline' className='space-x-1' onClick={onToggleView}>
        <span>
          {viewMode === 'list'
            ? t('calendarView', { ns: 'tasks' })
            : t('listView', { ns: 'tasks' })}
        </span>
      </Button>
      {/* Mock Data Button - Only show in development */}
      {import.meta.env.DEV && (
        <Button
          variant='outline'
          className='space-x-1'
          onClick={generateMockTasks}
          disabled={createTaskMutation.isPending}
        >
          <span>
            {createTaskMutation.isPending
              ? t('message.generating')
              : t('mockGerpTasks', { ns: 'tasks' })}
          </span>
          <IconDatabase size={18} />
        </Button>
      )}
    </div>
  )
}
