import { useTranslation } from 'react-i18next'
import { Main } from '@/components/layout/main'
import { UserDialogs } from './components/dialog/user-dialogs'
import { UserPrimaryButtons } from './components/user-primary-buttons'
import { UserTable } from './components/table/user-table'
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
          <UserPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <UserTable />
        </div>
      </Main>

      <UserDialogs />
    </>
  )
}

export default function User() {
  return (
    <UserProvider>
      <UserContent />
    </UserProvider>
  )
}
