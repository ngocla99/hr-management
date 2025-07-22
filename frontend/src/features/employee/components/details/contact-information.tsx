import { IconAddressBook, IconPencilMinus } from '@tabler/icons-react'
import { User } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface ContactInformationProps {
  employee: User
}

export function ContactInformation({ employee }: ContactInformationProps) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='flex items-center space-x-2'>
          <IconAddressBook className='text-muted-foreground size-5' />
          <span className='font-bold'>
            {t('card.contactInformation', { ns: 'employee' })}
          </span>
        </CardTitle>
        <Button variant='light' size='sm' className='shadow-2xl'>
          <IconPencilMinus className='mr-2 h-4 w-4' />
          {t('edit', { ns: 'common' })}
        </Button>
      </CardHeader>
      <CardContent className='space-y-6 pb-2'>
        {/* Personal Contact */}
        <div>
          <h4 className='mb-3 text-sm font-medium'>
            {t('card.personalContact', { ns: 'employee' })}
          </h4>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-muted-foreground text-xs'>
                {t('phoneNumber', { ns: 'glossary' })}
              </label>
              {employee.phoneNumber ? (
                <div className='text-chart-4 w-fit rounded-full border bg-white px-2 py-0.5 text-sm'>
                  {employee.phoneNumber}
                </div>
              ) : (
                <>{t('notProvided', { ns: 'glossary' })}</>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-muted-foreground text-xs'>
                {t('email', { ns: 'glossary' })}
              </label>
              {employee.email ? (
                <div className='text-chart-4 w-fit rounded-full border bg-white px-2 py-0.5 text-sm'>
                  {employee.email}
                </div>
              ) : (
                <>{t('notProvided', { ns: 'glossary' })}</>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Emergency Contact */}
        <div>
          <h4 className='mb-3 text-sm font-medium'>
            {t('card.otherContact', { ns: 'employee' })}
          </h4>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-muted-foreground text-xs'>
                {t('emergencyContact', { ns: 'glossary' })}
              </label>
              <div className='text-sm'>
                {employee.emergencyContactName ||
                  t('notProvided', { ns: 'glossary' })}
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-muted-foreground text-xs'>
                {t('emergencyPhone', { ns: 'glossary' })}
              </label>
              <div className='text-sm'>
                {employee.emergencyContactPhone ||
                  t('notProvided', { ns: 'glossary' })}
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-muted-foreground text-xs'>
                {t('relationship', { ns: 'glossary' })}
              </label>
              <div className='text-sm'>
                {employee.emergencyContactRelationship ||
                  t('notProvided', { ns: 'glossary' })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
