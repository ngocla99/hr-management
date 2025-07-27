import { IconDownload, IconUpload, IconUserPlus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useCreateEmployees } from '@/features/employee/api/create-employees'
import { useEmployee } from '@/features/employee/context/employee-context'
import { generateRandomEmployees } from '@/features/employee/utils/random-employees'

export function EmployeePrimaryButtons() {
  const { t } = useTranslation()
  const { setOpen } = useEmployee()

  const createEmployeesMutation = useCreateEmployees()

  const handleCreateEmployees = () => {
    if (createEmployeesMutation.isPending) return
    const employees = generateRandomEmployees(1)
    createEmployeesMutation.mutate({ employees })
  }

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
      <Button
        variant='light'
        size='sm'
        onClick={handleCreateEmployees}
        disabled={createEmployeesMutation.isPending}
      >
        <IconUserPlus className='mr-2 h-4 w-4' />
        {t('actions.addRandomEmployees', { ns: 'employee' })}
      </Button>
      <Button size='sm' onClick={() => setOpen('add')}>
        <IconUserPlus className='mr-2 h-4 w-4' />
        {t('actions.addEmployee', { ns: 'employee' })}
      </Button>
    </div>
  )
}
