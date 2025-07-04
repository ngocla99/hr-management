import { IconMailPlus, IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useUser } from '../context/user-context'
import { useTranslation } from 'react-i18next'

export function UsersPrimaryButtons() {
  const { setOpen } = useUser()
  const { t } = useTranslation()
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
        <span>{t('addUser', { ns: 'users' })}</span>{' '}
        <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
