import { IconMailPlus, IconUserPlus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useCreateUsers } from '../api/create-users'
import { useUser } from '../context/user-context'
import { generateRandomUsers } from '../utils/ramdom-users'

export function UserPrimaryButtons() {
  const { setOpen } = useUser()
  const { t } = useTranslation()
  const createUsersMutation = useCreateUsers()

  const handleCreateRandomUsers = async () => {
    if (createUsersMutation.isPending) return
    const users = generateRandomUsers(5)
    await createUsersMutation.mutateAsync({ users })
  }

  return (
    <div className='flex gap-2'>
      <Button
        variant='light'
        className='space-x-1'
        disabled
        onClick={() => setOpen('invite')}
      >
        <span>{t('inviteUser', { ns: 'users' })}</span>{' '}
        <IconMailPlus size={18} />
      </Button>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>{t('addUser', { ns: 'users' })}</span> <IconUserPlus size={18} />
      </Button>
      <Button
        variant='light'
        className='space-x-1'
        disabled={createUsersMutation.isPending}
        onClick={handleCreateRandomUsers}
      >
        <span>{t('createRandomUsers', { ns: 'users' })}</span>
      </Button>
    </div>
  )
}
