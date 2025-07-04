import { useTranslation } from 'react-i18next'
import { Main } from '@/components/layout/main'
import { ProjectsDialogs } from './components/projects-dialogs'
import { ProjectsPrimaryButtons } from './components/projects-primary-buttons'
import { ProjectsTable } from './components/projects-table'
import ProjectsProvider from './context/projects-context'

function ProjectsContent() {
  const { t } = useTranslation(['projects'])
  return (
    <>
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('page.title')}
            </h2>
            <p className='text-muted-foreground'>{t('page.description')}</p>
          </div>
          <ProjectsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <ProjectsTable />
        </div>
      </Main>

      <ProjectsDialogs />
    </>
  )
}

export default function Projects() {
  return (
    <ProjectsProvider>
      <ProjectsContent />
    </ProjectsProvider>
  )
}
