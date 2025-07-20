import {
  IconDownload,
  IconUpload,
  IconUserPlus,
  IconList,
  IconLayoutGrid,
} from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useEmployee } from '../context/employee-context'

export function EmployeePrimaryButtons() {
  const { t } = useTranslation()
  const { setOpen } = useEmployee()

  return (
    <div className='flex items-center space-x-3'>
      <Button variant='light' size='sm'>
        <IconDownload className='mr-2 h-4 w-4' />
        {t('export', { ns: 'common' })}
      </Button>
      <Button variant='light' size='sm'>
        <IconUpload className='mr-2 h-4 w-4' />
        {t('import', { ns: 'common' })}
      </Button>
      <Button size='sm' onClick={() => setOpen('add')}>
        <IconUserPlus className='mr-2 h-4 w-4' />
        Add Employee
      </Button>
    </div>
  )
}
