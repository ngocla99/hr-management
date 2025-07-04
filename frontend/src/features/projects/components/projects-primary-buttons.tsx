import { IconPlus, IconDatabase } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useProjects } from '../context/projects-context'
import { useCreateProject } from '../hooks/use-projects-api'

// Mock project names with GERP keyword
const mockProjectNames = [
  'GERP E-commerce Platform',
  'GERP Mobile Application',
  'GERP Analytics Dashboard',
  'GERP Customer Portal',
  'GERP Inventory System',
  'GERP Payment Gateway',
  'GERP User Management',
  'GERP Reporting Tool',
  'GERP API Gateway',
  'GERP Cloud Migration',
  'GERP Security Audit',
  'GERP Database Optimization',
  'GERP UI/UX Redesign',
  'GERP Integration Hub',
  'GERP Monitoring System',
]

const mockDescriptions = [
  'A comprehensive solution for modern business needs',
  'Streamlining operations with cutting-edge technology',
  'Enhancing user experience through innovative design',
  'Optimizing performance and scalability',
  'Implementing best practices for security and compliance',
  'Integrating multiple systems for seamless workflow',
  'Providing real-time insights and analytics',
  'Automating manual processes for efficiency',
  'Building robust and maintainable architecture',
  'Delivering high-quality solutions on time',
]

export function ProjectsPrimaryButtons() {
  const { t } = useTranslation(['projects', 'common'])
  const { setOpen } = useProjects()
  const createProjectMutation = useCreateProject()

  const generateMockProjects = async () => {
    toast.info('Generating 10 mock projects...')

    for (let i = 0; i < 10; i++) {
      const randomName =
        mockProjectNames[Math.floor(Math.random() * mockProjectNames.length)]
      const randomDescription =
        mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)]

      // Add a random number to make names unique
      const uniqueName = `${randomName} ${Math.floor(Math.random() * 1000)}`

      try {
        await createProjectMutation.mutateAsync({
          name: uniqueName,
          description: randomDescription,
        })
      } catch (error) {
        console.error(`Failed to create project ${i + 1}:`, error)
      }

      // Small delay to avoid overwhelming the API
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    toast.success('Successfully generated 10 mock projects!')
  }

  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('create')}>
        <span>{t('dialog.create.title', { ns: 'projects' })}</span>{' '}
        <IconPlus size={18} />
      </Button>

      {/* Mock Data Button - Only show in development */}
      {import.meta.env.DEV && (
        <Button
          variant='outline'
          className='space-x-1'
          onClick={generateMockProjects}
          disabled={createProjectMutation.isPending}
        >
          <span>
            {createProjectMutation.isPending
              ? t('loading', { ns: 'common' })
              : t('mockGerpData', { ns: 'projects' })}
          </span>
          <IconDatabase size={18} />
        </Button>
      )}
    </div>
  )
}
