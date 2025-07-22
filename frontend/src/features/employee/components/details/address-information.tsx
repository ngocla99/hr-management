import { IconMapPinFilled, IconPencilMinus } from '@tabler/icons-react'
import { User } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface AddressInformationProps {
  employee: User
}

export function AddressInformation({ employee }: AddressInformationProps) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='flex items-center space-x-2'>
          <IconMapPinFilled className='text-muted-foreground size-5' />
          <span className='font-bold'>
            {t('page.addressInformation', { ns: 'employee' })}
          </span>
        </CardTitle>
        <Button variant='light' size='sm' className='shadow-2xl'>
          <IconPencilMinus className='mr-2 h-4 w-4' />
          {t('edit', { ns: 'common' })}
        </Button>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='mb-3 flex items-center justify-between'>
          <label className='text-muted-foreground text-xs font-medium'>
            {t('page.residentialAddress', { ns: 'employee' })}
          </label>
          <div className='group/button'>
            <Button
              variant='link'
              className='text-foreground hover:text-primary mr-1.5 h-auto p-0 text-xs'
            >
              <span className='underline underline-offset-4'>
                {t('viewOnMap', { ns: 'common' })}
              </span>
            </Button>
            <span className='group-hover/button:text-primary text-sm'>
              &gt;
            </span>
          </div>
        </div>
        <div className='mb-2 text-sm font-medium'>
          {employee.residentialAddress || t('notProvided', { ns: 'glossary' })}
        </div>
        {employee.residentialAddressNotes && (
          <div>
            <label className='text-muted-foreground text-xs'>
              {t('page.notes', { ns: 'employee' })}
            </label>
            <div className='mt-1 text-sm'>
              {employee.residentialAddressNotes}
            </div>
          </div>
        )}

        <Separator />

        <div className='mb-3 flex items-center justify-between'>
          <label className='text-muted-foreground text-xs font-medium'>
            {t('page.citizenIdAddress', { ns: 'employee' })}
          </label>
          <div className='group/button'>
            <Button
              variant='link'
              className='text-foreground hover:text-primary mr-1.5 h-auto p-0 text-xs'
            >
              <span className='underline underline-offset-4'>
                {t('viewOnMap', { ns: 'common' })}
              </span>
            </Button>
            <span className='group-hover/button:text-primary text-sm'>
              &gt;
            </span>
          </div>
        </div>
        <div className='mb-2 text-sm font-medium'>
          {employee.citizenIdAddress || t('notProvided', { ns: 'glossary' })}
        </div>
        {employee.citizenIdAddressNotes && (
          <div>
            <label className='text-muted-foreground text-xs'>
              {t('page.notes', { ns: 'employee' })}
            </label>
            <div className='bg-muted/50 mt-1 w-60/100 rounded-md p-3 text-sm'>
              {employee.citizenIdAddressNotes}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
