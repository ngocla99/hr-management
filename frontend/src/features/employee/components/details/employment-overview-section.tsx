import { IconPencilMinus } from '@tabler/icons-react'
import { User } from '@/types/api'
import { Briefcase } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface EmploymentOverviewProps {
  employee: User
}

export function EmploymentOverview({ employee }: EmploymentOverviewProps) {
  const { t } = useTranslation()

  const formatEmploymentDuration = (startDate: Date) => {
    const start = new Date(startDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - start.getTime())
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365))
    return `${start.getFullYear()}-Current (${diffYears} Years)`
  }

  const employmentFields = [
    {
      label: t('dateStarted', { ns: 'glossary' }),
      value: employee.dateStarted
        ? formatEmploymentDuration(employee.dateStarted)
        : '-',
      className: 'pt-0 pb-2',
    },
    {
      label: t('jobRole', { ns: 'glossary' }),
      value: employee.jobRole
        ? t(`role.${employee.jobRole}`, { ns: 'employee' })
        : '-',
      className: 'pt-0 pb-2 pl-4',
    },
    {
      label: t('jobLevel', { ns: 'glossary' }),
      value: employee.jobLevel
        ? t(`level.${employee.jobLevel}`, { ns: 'employee' })
        : '-',
      className: 'border-none pb-2',
    },
    {
      label: t('employmentStatus', { ns: 'glossary' }),
      value: employee.employmentType
        ? t(`employmentType.${employee.employmentType}`, { ns: 'employee' })
        : '-',
      className: 'border-none pb-2 pl-4',
    },
  ]

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='flex items-center space-x-2'>
          <Briefcase className='text-muted-foreground size-5' />
          <span className='font-bold'>
            {t('page.employmentOverview', { ns: 'employee' })}
          </span>
        </CardTitle>
        <Button variant='light' size='sm' className='shadow-2xl'>
          <IconPencilMinus className='mr-2 h-4 w-4' />
          {t('edit', { ns: 'common' })}
        </Button>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2'>
          {employmentFields.map((field, index) => (
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

        <div className='pt-4'>
          <div className='group/button'>
            <Button
              variant='link'
              className='text-foreground hover:text-primary mr-1.5 h-auto p-0 text-xs'
            >
              <span className='underline underline-offset-4'>
                {t('viewContract', { ns: 'common' })}
              </span>
            </Button>
            <span className='group-hover/button:text-primary text-sm'>
              &gt;
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
