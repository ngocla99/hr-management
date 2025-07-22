import { IconPencilMinus, IconUserFilled } from '@tabler/icons-react'
import { User } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PersonalInformationProps {
  employee: User
}

export function PersonalInformation({ employee }: PersonalInformationProps) {
  const { t } = useTranslation()

  const personalFields = [
    {
      label: t('fullName', { ns: 'glossary' }),
      value: employee.fullName,
      className: 'pt-0',
    },
    {
      label: t('gender', { ns: 'glossary' }),
      value: employee.gender
        ? t(`gender.${employee.gender}`, { ns: 'users' })
        : '-',
      className: 'pt-0 pl-4',
    },
    {
      label: t('maritalStatus', { ns: 'glossary' }),
      value: employee.maritalStatus
        ? t(`maritalStatus.${employee.maritalStatus}`, { ns: 'users' })
        : '-',
      className: '',
    },
    {
      label: t('religion', { ns: 'glossary' }),
      value: employee.religion || '-',
      className: 'pl-4',
    },
    {
      label: t('placeOfBirth', { ns: 'glossary' }),
      value: employee.placeOfBirth || '-',
      className: '',
    },
    {
      label: t('birthdate', { ns: 'glossary' }),
      value: employee.dateOfBirth ? formatDate(employee.dateOfBirth) : '-',
      className: 'pl-4',
    },
    {
      label: t('bloodType', { ns: 'glossary' }),
      value: employee.bloodType || '-',
      className: 'border-none pb-2',
    },
    {
      label: t('age', { ns: 'glossary' }),
      value: employee.dateOfBirth
        ? String(
            new Date().getFullYear() -
              new Date(employee.dateOfBirth).getFullYear()
          )
        : '-',
      className: 'border-none pb-2 pl-4',
    },
  ]

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='flex items-center space-x-2'>
          <IconUserFilled className='text-muted-foreground size-5' />
          <span className='font-bold'>
            {t('page.personalInformation', { ns: 'employee' })}
          </span>
        </CardTitle>
        <Button variant='light' size='sm' className='shadow-2xl'>
          <IconPencilMinus className='mr-2 h-4 w-4' />
          {t('edit', { ns: 'common' })}
        </Button>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2'>
          {personalFields.map((field, index) => (
            <div
              key={index}
              className={cn('col-span-1 border-b py-5', field.className)}
            >
              <div className='grid gap-2'>
                <label className='text-muted-foreground text-xs font-medium'>
                  {field.label}
                </label>
                <div className='text-foreground text-sm font-medium capitalize'>
                  {field.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
