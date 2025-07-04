import { useTranslation } from 'react-i18next'
import { Main } from '@/components/layout/main'
import { UsersDialogs } from './components/user-dialogs'
import { UsersPrimaryButtons } from './components/user-primary-buttons'
import { UsersTable } from './components/user-table'
import UserProvider from './context/user-context'

function UserContent() {
  const { t } = useTranslation()
  return (
    <>
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('page.title', { ns: 'users' })}
            </h2>
            <p className='text-muted-foreground'>
              {t('page.description', { ns: 'users' })}
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <UsersTable />
        </div>
      </Main>

      <UsersDialogs />
    </>
  )
}

export default function Users() {
  return (
    <UserProvider>
      <UserContent />
    </UserProvider>
  )
}
