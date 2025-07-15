import { useState } from 'react'
import { IconMailPlus, IconUserPlus } from '@tabler/icons-react'
import { faker } from '@faker-js/faker'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useCreateUser } from '../api/create-user'
import { USER_ROLES } from '../constants/user-constants'
import { useUser } from '../context/user-context'

export function UserPrimaryButtons() {
  const { setOpen } = useUser()
  const { t } = useTranslation()
  const createUserMutation = useCreateUser()
  const [loading, setLoading] = useState(false)

  const handleCreateRandomUsers = async () => {
    setLoading(true)
    const promises = Array.from({ length: 5 }).map(() => {
      const firstName = faker.person.firstName().toLowerCase()
      const lastName = faker.person.lastName().toLowerCase()
      const username = `${firstName}.${lastName}${faker.string.alphanumeric(4)}`
      const email = faker.internet.email({ firstName, lastName })
      const password = 'Qwe123!@#'
      const role = faker.helpers.arrayElement(USER_ROLES)
      return createUserMutation.mutateAsync({ email, username, password, role })
    })
    try {
      await Promise.all(promises)
      toast.success(t('message.success.createdMany', { ns: 'users' }))
    } catch (error) {
      console.error(error)
      toast.error(t('message.error.createManyFailed', { ns: 'users' }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
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
        variant='outline'
        className='space-x-1'
        disabled={loading}
        onClick={handleCreateRandomUsers}
      >
        <span>{t('createRandomUsers', { ns: 'users' })}</span>
      </Button>
    </div>
  )
}
